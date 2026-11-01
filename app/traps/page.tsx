// app/traps/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import {
  AlertTriangle,
  Scale,
  Search,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Target
} from 'lucide-react';

interface TrapEntry {
  id: string;
  capRef: string;
  topicZh: string;
  topicEn: string;
  trapZh: string;
  truthZh: string;
  trapEn: string;
  truthEn: string;
  track: 'SQE_EAQE' | 'EAQE_ONLY';
}

// Extracted from the 20 EAA Syllabus Blocks
const MASTER_TRAP_REGISTER: TrapEntry[] = [
  {
    id: 't1', capRef: 'Cap. 511', track: 'SQE_EAQE',
    topicZh: '分行經理委任', topicEn: 'Branch Manager Appointment',
    trapZh: '具備 3 年行業經驗的營業員可自動擔任分行經理並獨立看管分行。',
    trapEn: 'A Salesperson with 3 years of experience can manage a branch.',
    truthZh: '絕對不行。每間持牌營業處所必須由一名具備 5 年經驗的持牌地產代理（大牌）出任經理人監督管理。',
    truthEn: 'FALSE. Every branch must be under the effective control of a licensed Estate Agent (Individual) with 5 years experience.'
  },
  {
    id: 't2', capRef: 'Cap. 511A', track: 'SQE_EAQE',
    topicZh: '發布物業廣告同意', topicEn: 'Advertising Consent',
    trapZh: '業主口頭答應代理放盤，代理即可在社交媒體刊登宣傳圖文。',
    trapEn: 'Agent can advertise on social media based on a verbal promise from the vendor.',
    truthZh: '違法。Cap. 511A 規定廣告必須獲得業主「事先書面同意」，口頭同意無效，且必須是真實開價。',
    truthEn: 'ILLEGAL. Advertising requires prior written consent from the vendor stating the genuine price.'
  },
  {
    id: 't3', capRef: 'Cap. 511 (Form)', track: 'SQE_EAQE',
    topicZh: '配偶代簽委託書效力', topicEn: 'Spouse Signing Agency Agreement',
    trapZh: '表格 1（出售委託）由業主配偶代簽，該委託書自動具備完全法律拘束力。',
    trapEn: 'Form 1 signed by the vendor’s spouse is automatically binding on the vendor.',
    truthZh: '錯誤。若無業主之正式書面授權書（Power of Attorney），配偶代簽屬無權代理，無法強制向業主追討佣金。',
    truthEn: 'FALSE. Without a formal Power of Attorney, spouse signature does not bind the vendor for commission.'
  },
  {
    id: 't4', capRef: 'Cap. 219', track: 'SQE_EAQE',
    topicZh: '法定租賃形式', topicEn: 'Legal Lease Execution',
    trapZh: '一紙 5 年期的手寫租約只要雙方簽名按指模，即構成具完全效力的法定租賃。',
    trapEn: 'A 5-year handwritten tenancy with signatures and thumbprints constitutes a valid Legal Lease.',
    truthZh: '錯誤。超過 3 年之租約必須以正式契據（Deed）簽立；僅有書面簽名只構成衡平法租約（Equitable Lease），保障較弱。',
    truthEn: 'FALSE. Leases exceeding 3 years must be executed as a Deed. Simple writing creates only an Equitable Lease.'
  },
  {
    id: 't5', capRef: 'Cap. 128', track: 'SQE_EAQE',
    topicZh: '土地註冊證明效力', topicEn: 'Land Registry Title Guarantee',
    trapZh: '於土地註冊處成功註冊一份樓契，即代表政府保證該樓契產權百分之百優良合法。',
    trapEn: 'Successful registration of a deed guarantees 100% good title by the Government.',
    truthZh: '重大陷阱！香港契約註冊只證明該文件已送交登記並確立優先次序，土地註冊處不負責審核契據內容之法律有效性。',
    truthEn: 'FALSE. HK operates a Deeds Registration system, not Torrens. Registry does not guarantee legal validity.'
  },
  {
    id: 't6', capRef: 'IRIS 查冊', track: 'SQE_EAQE',
    topicZh: '押記令 Nisi 效力', topicEn: 'Charging Order Nisi',
    trapZh: '查冊負擔欄看見「Charging Order Nisi」（暫准押記令），表示物業已被法院正式釘契強制拍賣。',
    trapEn: 'A Charging Order Nisi indicates the property is finalized for forced auction.',
    truthZh: '不正確。Nisi 僅為臨時暫准命令，債務人仍可抗辯。必須待法庭蓋印確認為「Absolute」才構成最終生效押記。',
    truthEn: 'FALSE. Nisi is a temporary order. Only a Charging Order Absolute constitutes a finalized encumbrance.'
  },
  {
    id: 't7', capRef: 'Cap. 123', track: 'SQE_EAQE',
    topicZh: '屋宇署 s.24 清拆令', topicEn: 'BO s.24 Removal Order',
    trapZh: '買家簽署「買家自願承擔一切物業修葺及清拆命令責任」條款，銀行就會正常批出最高成數按揭。',
    trapEn: 'If a buyer signs an "As Is with UBW accepted" clause, banks will approve max LTV mortgages normally.',
    truthZh: '極大誤解。銀行極可能拒絕按揭或大幅削減成數，因為有 s.24 清拆令的物業存在被政府收回或追討清拆費用的風險。',
    truthEn: 'FALSE. Banks will likely reject or severely reduce the mortgage due to risk of government re-entry.'
  },
  {
    id: 't8', capRef: 'Cap. 344', track: 'EAQE_ONLY',
    topicZh: '專用使用權與僭建', topicEn: 'Exclusive Possession & UBW',
    trapZh: '頂層業主擁有天台的專用使用權（Exclusive Possession），因此有權在天台上興建花園木屋。',
    trapEn: 'Exclusive possession of a roof grants the right to build a garden house.',
    truthZh: '錯誤。專用權受大廈公契及建築物條例雙重限制，未經法團及屋宇署批准在專用天台加建結構物仍屬違法僭建。',
    truthEn: 'FALSE. Building structures requires both Owners\' Corporation and Buildings Department prior approval.'
  },
  {
    id: 't9', capRef: 'Cap. 117', track: 'SQE_EAQE',
    topicZh: '印花稅退稅與公司提名', topicEn: 'Stamp Duty Nominations',
    trapZh: '買家以個人名義簽立臨約，簽正式合約前將買方更改為自己全資擁有的私人公司，無需支付額外印花稅。',
    trapEn: 'Nominating a wholly-owned private company from a personal PASP avoids double stamp duty.',
    truthZh: '重大陷阱！自然人提名至法人公司不屬於法定「近親提名」，稅務局會將其視為獨立的轉售，衍生雙重印花稅！',
    truthEn: 'FALSE! Nominating a company is not a "close relative nomination" and triggers double stamp duty.'
  },
  {
    id: 't10', capRef: 'Cap. 32 / 622', track: 'EAQE_ONLY',
    topicZh: '公司賣方簽署權限', topicEn: 'Corporate Vendor Signatures',
    trapZh: '向持有物業的有限公司買樓時，只要大股東個人在買賣合約簽名，交易即完全生效。',
    trapEn: 'A majority shareholder signing personally binds a limited company to sell a property.',
    truthZh: '重大產權缺陷！公司乃獨立法人，物業處置必須嚴格依照章程由董事簽署並出具董事會決議案（Board Resolution）。',
    truthEn: 'FALSE! A company is a separate legal entity. Requires a Board Resolution and proper execution under Articles.'
  },
  {
    id: 't11', capRef: 'Cap. 615', track: 'SQE_EAQE',
    topicZh: '洗錢通風報信罪', topicEn: 'AML Tipping-off Offence',
    trapZh: '代理提交 STR 舉報客戶大額不明現金後，應好心提醒客戶暫緩交易以免被警方調查。',
    trapEn: 'After filing an STR, an agent should warn the client to pause transactions to avoid police investigation.',
    truthZh: '嚴重刑事犯罪！向受懷疑者透露即觸犯「通風報信罪」（Tipping-off），最高可被判監禁 3 年。',
    truthEn: 'ILLEGAL! Tipping-off a suspect is a criminal offence punishable by up to 3 years imprisonment.'
  },
  {
    id: 't12', capRef: '普通法合約', track: 'SQE_EAQE',
    topicZh: '臨時買賣合約拘束力', topicEn: 'PASP Binding Effect',
    trapZh: '買賣雙方簽了臨時買賣合約後，只要尚未去律師樓簽正式合約，任何一方隨時可以無條件取消合約而不承擔責任。',
    trapEn: 'PASP can be canceled unconditionally by either party before signing the Formal Agreement.',
    truthZh: '極大誤解！臨時合約簽妥即具有完全法律約束力。除非合約包含特定的「賠定離場」條款，否則違約方面臨強制履行令。',
    truthEn: 'FALSE! A PASP is fully legally binding. Breaching it can lead to orders for Specific Performance.'
  }
];

export default function TrapsPage() {
  const { language, locale } = useLanguage();
  const { isPaidUser } = useAuth();
  
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<'ALL' | 'SQE_EAQE' | 'EAQE_ONLY'>('ALL');

  const filteredTraps = useMemo(() => {
    return MASTER_TRAP_REGISTER.filter((t) => {
      if (selectedTrack !== 'ALL' && t.track !== selectedTrack) return false;
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        return (
          t.topicZh.toLowerCase().includes(q) ||
          t.topicEn.toLowerCase().includes(q) ||
          t.capRef.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedTrack]);

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-3xl border border-rose-200 bg-rose-50 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
                <ShieldAlert className="h-4 w-4" />
                <span>{isZh ? '官方考試陷阱登錄' : 'Official Exam Trap Register'}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-rose-950">
              {isZh ? '常規陷阱與易混淆概念 (Do Not Confuse)' : 'Master Exam Trap Register'}
            </h1>
            <p className="text-sm text-rose-900/80 max-w-2xl leading-relaxed">
              {isZh 
                ? '超過 70% 的考生失分來自於概念混淆與主考官刻意設計的假命題。以下為 EAA 試題庫中出現過的高頻錯誤選項（FALSE statements）及其背後的正確法理。'
                : 'Over 70% of marks are lost to designed false propositions. Review these high-frequency incorrect statements and their legal truths.'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/mock-exam"
              className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              <span>{isZh ? '立即實戰測驗' : 'Take Mock Exam'}</span>
            </Link>
          </div>
        </div>

        {/* Controller */}
        <div className="p-4 sm:p-6 rounded-3xl border border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setSelectedTrack('ALL')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition ${selectedTrack === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {isZh ? '全部陷阱' : 'All Traps'}
            </button>
            <button
              onClick={() => setSelectedTrack('SQE_EAQE')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition ${selectedTrack === 'SQE_EAQE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              SQE + EAQE
            </button>
            <button
              onClick={() => setSelectedTrack('EAQE_ONLY')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition ${selectedTrack === 'EAQE_ONLY' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {isZh ? '大牌 EAQE 專屬' : 'EAQE Only'}
            </button>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isZh ? '搜尋法例 (Cap.) 或關鍵字...' : 'Search Cap. or topic...'}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Traps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTraps.map((trap, idx) => {
            const isLocked = !isPaidUser && idx > 3;

            if (isLocked) {
              return (
                <div key={trap.id} className="p-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 opacity-80 flex flex-col justify-center items-center text-center space-y-3 min-h-[220px]">
                  <ShieldAlert className="h-8 w-8 text-slate-400" />
                  <div>
                    <span className="text-[10px] font-mono font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded">PRO REQUIRED</span>
                    <h3 className="text-sm font-bold text-slate-700 mt-2">{isZh ? '解鎖完整陷阱題庫' : 'Unlock Trap Register'}</h3>
                  </div>
                  <Link href="/pricing" className="px-5 py-2 mt-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm">
                    {isZh ? '升級 PRO 帳號' : 'Upgrade to PRO'} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            }

            return (
              <div key={trap.id} className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {trap.capRef}
                  </span>
                  {trap.track === 'EAQE_ONLY' && (
                    <span className="text-[10px] font-black text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                      EAQE EXCLUSIVE
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Scale className="h-4 w-4 text-blue-600" />
                    <span>{isZh ? trap.topicZh : trap.topicEn}</span>
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* The Trap */}
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
                    <span className="text-[10px] font-black font-mono text-rose-800 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> [FALSE / 錯誤命題]
                    </span>
                    <p className="text-xs font-semibold text-rose-950 leading-relaxed">
                      {isZh ? trap.trapZh : trap.trapEn}
                    </p>
                  </div>

                  {/* The Truth */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                    <span className="text-[10px] font-black font-mono text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> [TRUE / 正確法理]
                    </span>
                    <p className="text-xs font-medium text-emerald-950 leading-relaxed">
                      {isZh ? trap.truthZh : trap.truthEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
