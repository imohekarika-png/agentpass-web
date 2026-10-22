// app/mock-exam/page.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Award,
  BookOpen,
  Building2,
  ShieldCheck,
  Globe,
  Clock,
  Bookmark,
  ArrowRight,
  ArrowLeft,
  Lock,
  Check,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
  Sparkles,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

export type ExamDomainBatch =
  | 'CAP511'
  | 'CONVEYANCING'
  | 'TENANCY_BUILDINGS'
  | 'AGENCY_TORT'
  | 'POIM_CASE';

export interface MockQuestion {
  id: number;
  part: 'I' | 'II';
  trackApplicability?: 'BOTH' | 'EAQE_ONLY' | 'SQE_ONLY';
  caseScenarioId?: string;
  topicZh: string;
  topicEn: string;
  questionZh: string;
  questionEn: string;
  optionsZh: string[];
  optionsEn: string[];
  answerIndex: number;
  explanationZh: string;
  explanationEn: string;
  statuteRefZh: string;
  statuteRefEn: string;
  isLocked?: boolean;
  lockReason?: 'REQUIRES_EAQE_UPGRADE' | 'REQUIRES_SUBSCRIPTION';
}

interface CaseScenarioMeta {
  id: string;
  titleZh: string;
  titleEn: string;
  narrativeZh: string;
  narrativeEn: string;
  landSearch: {
    propertyZh: string[];
    propertyEn: string[];
    ownerZh: string[];
    ownerEn: string[];
    incumbrancesZh: string[];
    incumbrancesEn: string[];
  };
}

const CASE_SCENARIOS: Record<string, CaseScenarioMeta> = {
  'case-1': {
    id: 'case-1',
    titleZh: '個案一：Smart Mansion 12 樓 B 室 (遺囑認證與清拆命令)',
    titleEn: 'Case 1: Flat B, 12/F, Smart Mansion (Probate & Removal Order)',
    narrativeZh:
      '業主何先生於 2023 年身故。其子溫先生以單獨遺囑執行人身分委託地產代理 Sunny 獨家放售。代理查冊發現有屋宇署第 24 條清拆命令，且露台存在未入則加建物。',
    narrativeEn:
      'Registered owner passed away in 2023. Mr. Wan, acting as Sole Executor, instructs Sunny to sell. Land search reveals a Buildings Dept s.24 Removal Order and unauthorized balcony enclosure.',
    landSearch: {
      propertyZh: [
        '地段編號：IL 8920 (內地段第 8920 號)',
        '物業地址：九龍尖沙咀漆咸道 88 號 Smart Mansion 12 樓 B 室',
        '法定用途：住宅用途 (Domestic Purposes Only)',
        '不可分割份數：1/50th shares of IL 8920'
      ],
      propertyEn: [
        'Lot No.: Inland Lot No. 8920',
        'Address: Flat B, 12/F, Smart Mansion, 88 Chatham Road, TST, KLN',
        'Permitted Use: Domestic Purposes Only',
        'Undivided Shares: 1/50th parts or shares of and in IL 8920'
      ],
      ownerZh: [
        '現任登記業主：溫先生 (Wan Chi Keung)',
        '身分性質：作為何先生遺產之單獨遺囑執行人 (As Sole Executor of Ho Estate)',
        '註冊摘要：Memorial UB99201 (Letters of Probate)',
        '代價款額：$0 (Transmission by Death)'
      ],
      ownerEn: [
        'Current Registered Owner: Wan Chi Keung',
        'Capacity: As Sole Executor of the Estate of Ho',
        'Memorial: UB99201 (Letters of Probate)',
        'Consideration: $0 (Transmission by Death)'
      ],
      incumbrancesZh: [
        '1. 2018年5月10日 - 恆生銀行法定押記 (Memorial UB44012)',
        '2. 2022年9月15日 - 屋宇署第 24 條清拆命令 (UBW Balcony Enclosure, Memorial UB77341)'
      ],
      incumbrancesEn: [
        '1. 10 May 2018 - Legal Charge in favour of Hang Seng Bank (Memorial UB44012)',
        '2. 15 Sep 2022 - Order under s.24 of Buildings Ordinance (UBW Balcony, Memorial UB77341)'
      ]
    }
  },
  'case-2': {
    id: 'case-2',
    titleZh: '個案二：中環商業中心 18 樓全層 (公司賣方與浮動押記)',
    titleEn: 'Case 2: 18/F, Central Commercial Tower (Corporate Vendor & Floating Charge)',
    narrativeZh:
      '業主為 Apex Profits Limited (香港註冊公司)，開價 3,800 萬出售。代理 Ken 查冊發現土地註冊處僅有渣打銀行按揭，但未查閱公司註冊處抵押登記冊。',
    narrativeEn:
      'Vendor is Apex Profits Limited, asking HK$38M. Agent Ken conducted land registry search revealing a standard mortgage, but omitted Companies Registry search for floating charges.',
    landSearch: {
      propertyZh: [
        '地段編號：IL 1024 (內地段第 1024 號)',
        '物業地址：香港中環德輔道中 28 號 18 樓全層',
        '法定用途：非住宅/商業用途 (Commercial Office Only)',
        '不可分割份數：2/100th shares of IL 1024'
      ],
      propertyEn: [
        'Lot No.: Inland Lot No. 1024',
        'Address: 18/F, Central Commercial Tower, 28 Des Voeux Road, Central, HK',
        'Permitted Use: Non-Domestic / Commercial Purposes Only',
        'Undivided Shares: 2/100th parts or shares of and in IL 1024'
      ],
      ownerZh: [
        '現任登記業主：Apex Profits Limited (頂點利潤有限公司)',
        '身分性質：法人團體 (Body Corporate)',
        '註冊摘要：Memorial UB88310',
        '代價款額：HK$32,000,000'
      ],
      ownerEn: [
        'Current Registered Owner: Apex Profits Limited',
        'Capacity: Body Corporate',
        'Memorial: UB88310',
        'Consideration: HK$32,000,000'
      ],
      incumbrancesZh: [
        '1. 2019年3月22日 - 渣打銀行法定押記 (Memorial UB55123)',
        '2. 公司註冊處登記 - 浮動押記 (Floating Charge in favour of HSBC with Negative Pledge)'
      ],
      incumbrancesEn: [
        '1. 22 Mar 2019 - Legal Charge in favour of Standard Commercial Bank (Memorial UB55123)',
        '2. Registered at Companies Registry - Debenture & Floating Charge with Negative Pledge Clause'
      ]
    }
  }
};

const PART_I_UNIQUE_DATA = [
  { qZh: "持牌地產代理變更營業地址或經理姓名後，須於幾多天內以書面通知 EAA？", qEn: "Within how many days must a licensed estate agent notify EAA of a business address or manager change?", optsZh: ["A. 7 天", "B. 14 天", "C. 31 天", "D. 60 天"], optsEn: ["A. 7 Days", "B. 14 Days", "C. 31 Days", "D. 60 Days"], ans: 2, refZh: "《地產代理條例》Cap. 511 s.40", refEn: "Cap. 511 s.40" },
  { qZh: "地產代理行收到客戶存款後，須於幾多天內開具收據並妥善保存紀錄幾多年？", qEn: "Within how many days must a deposit receipt be issued, and for how long must trust records be kept?", optsZh: ["A. 14 天內開收據，保存 3 年", "B. 7 天內開收據，保存 1 年", "C. 21 天內開收據，保存 5 年", "D. 30 天內開收據，保存 7 年"], optsEn: ["A. 14 days receipt, 3 years retention", "B. 7 days receipt, 1 year retention", "C. 21 days receipt, 5 years retention", "D. 30 days receipt, 7 years retention"], ans: 0, refZh: "《地產代理(客戶款項)規例》Cap. 511B", refEn: "Cap. 511B" },
  { qZh: "代理在向二手住宅物業準買家推介單位前，必須向買家提供並解釋哪一份法定表格？", qEn: "Which prescribed form must an agent provide and explain to a prospective buyer before property introduction?", optsZh: ["A. 表格一 (Form 1)", "B. 表格三 (Form 3)", "C. 表格四 (Form 4)", "D. 表格六 (Form 6)"], optsEn: ["A. Form 1", "B. Form 3", "C. Form 4", "D. Form 6"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A Form 1" },
  { qZh: "住宅租客拖欠租金達幾多天時，業主可根據法定隱含條件行使沒收租賃權 (Forfeiture)？", qEn: "After how many days of unpaid rent can a landlord exercise statutory implied forfeiture?", optsZh: ["A. 7 天", "B. 14 天", "C. 15 天", "D. 30 天"], optsEn: ["A. 7 Days", "B. 14 Days", "C. 15 Days", "D. 30 Days"], ans: 2, refZh: "《業主與租客(綜合)條例》Cap. 7", refEn: "Cap. 7 Part IV" },
  { qZh: "劏房規管租賃首期 2 年屆滿後，次期 2 年續租租金加幅上限為何？", qEn: "What is the ceiling cap for rent increase upon renewal of regulated subdivided unit tenancy?", optsZh: ["A. 5%", "B. 10% 或差估署私樓租金指數變動（以較低者為準）", "C. 15%", "D. 由業主隨意決定"], optsEn: ["A. 5%", "B. 10% or RVD index, whichever is lower", "C. 15%", "D. Discretionary"], ans: 1, refZh: "《業主與租客(綜合)條例》Part IVA", refEn: "Cap. 7 Part IVA" },
  { qZh: "甲、乙以「聯權共有」持有一單位，甲未經乙同意將其份額轉讓予丙。結果為何？", qEn: "A and B hold as Joint Tenants. A assigns share to C without B's consent. What is the result?", optsZh: ["A. 轉讓無效", "B. Severance 為分權共有 (Tenancy in Common)", "C. 乙獨佔全數業權", "D. 聯權共有維持"], optsEn: ["A. Void", "B. Severance into Tenancy in Common", "C. B absorbs sole title", "D. Joint tenancy remains"], ans: 1, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "契約若在簽立後幾多個月內交付土地註冊處註冊，其優先權可追溯至簽立日生效？", qEn: "If a deed is registered within how many months of execution does priority relate back to execution date?", optsZh: ["A. 1 個月", "B. 2 個月", "C. 3 個月", "D. 6 個月"], optsEn: ["A. 1 Month", "B. 2 Months", "C. 3 Months", "D. 6 Months"], ans: 0, refZh: "《土地註冊條例》Cap. 128 s.5", refEn: "Cap. 128 s.5" },
  { qZh: "代理未得主事人事前書面同意，私下向對家收取非法回佣，觸犯哪項刑事罪行？", qEn: "Accepting secret commission from counterparty without principal consent breaches which Ordinance?", optsZh: ["A. 《防止賄賂條例》Cap. 201 s.9", "B. 盜竊罪", "C. 民事違約", "D. 行政罰款"], optsEn: ["A. Cap. 201 s.9 Corrupt transactions", "B. Theft Ordinance", "C. Civil breach", "D. Administrative fine"], ans: 0, refZh: "《防止賄賂條例》Cap. 201 s.9", refEn: "Cap. 201 s.9" },
  { qZh: "發展商開售一手住宅前，售樓說明書及價單分別須提前至少幾多天公佈？", qEn: "At least how many days before sale must first-hand sales brochures and price lists be made available?", optsZh: ["A. 售樓書 7 天前，價單 3 天前", "B. 售樓書 14 天前，價單 7 天前", "C. 售樓書 3 天前，價單 1 天前", "D. 30 天前"], optsEn: ["A. Sales brochure 7 days; Price list 3 days", "B. Sales brochure 14 days; Price list 7 days", "C. Sales brochure 3 days; Price list 1 day", "D. 30 days"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621", refEn: "Cap. 621" },
  { qZh: "簽署一手樓 PASP 後 5 個工作天內撤回交易，賣方最多可沒收幾多訂金？", qEn: "If buyer withdraws within 5 working days after signing a PASP, how much deposit can be forfeited?", optsZh: ["A. 樓價 5% 臨時訂金", "B. 全數 10%", "C. 無權沒收", "D. 2.5%"], optsEn: ["A. Forfeit 5% preliminary deposit only", "B. Forfeit full 10%", "C. No forfeiture", "D. 2.5%"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621 s.53", refEn: "Cap. 621 s.53" },
  { qZh: "地產代理同時代表買賣雙方 (Dual Agency) 時，必須履行何種法定程序？", qEn: "When acting for both buyer and seller in the same transaction, what mandatory procedure must an agent follow?", optsZh: ["A. 事前取得雙方書面同意並披露佣金率", "B. 事後口頭通知", "C. 無需披露", "D. 單方面隱瞞"], optsEn: ["A. Prior written consent from both parties disclosing commission", "B. Subsequent oral notification", "C. No disclosure required", "D. Conceal representation"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.13", refEn: "Cap. 511A s.13" },
  { qZh: "授權人以授權書 (Power of Attorney) 委託受託人處置物業，該授權書必須以何種形式簽立？", qEn: "A Power of Attorney authorising disposition of land in HK must be executed under what form?", optsZh: ["A. 契據 (Deed)", "B. 普通合約", "C. 口頭錄音", "D. 電郵"], optsEn: ["A. Executed as a Deed", "B. Simple contract", "C. Verbal recording", "D. Email"], ans: 0, refZh: "《授權書條例》Cap. 31", refEn: "Cap. 31" },
  { qZh: "根據《大廈管理條例》(Cap. 344)，成立業主立案法團 (IO) 需獲得不少於幾多比例不可分割份數業主支持？", qEn: "Under Cap. 344, forming an Incorporated Owners requires resolution supported by what share percentage?", optsZh: ["A. 30%", "B. 10%", "C. 20%", "D. 50%"], optsEn: ["A. 30%", "B. 10%", "C. 20%", "D. 50%"], ans: 0, refZh: "《大廈管理條例》Cap. 344 s.3", refEn: "Cap. 344 s.3" },
  { qZh: "多間地產代理行私下商定統一佣金折扣上限，觸犯哪項條例？", qEn: "Estate agencies colluding to fix maximum commission discounts breach which Ordinance?", optsZh: ["A. 《競爭條例》Cap. 619 第一行為守則", "B. 商品說明條例", "C. 地產代理條例 s.15", "D. 商業合約"], optsEn: ["A. Competition Ordinance Cap. 619 First Conduct Rule", "B. Trade Descriptions Ordinance", "C. Estate Agents Ordinance s.15", "D. Commercial contract"], ans: 0, refZh: "《競爭條例》Cap. 619", refEn: "Cap. 619" },
  { qZh: "買賣合約逾期超過 2 個月未繳付印花稅，最高可被處以幾多倍應繳稅款之罰款？", qEn: "If stamp duty is overdue for more than 2 months, what is the maximum penalty multiple?", optsZh: ["A. 10 倍", "B. 2 倍", "C. 4 倍", "D. 20 倍"], optsEn: ["A. 10 Times", "B. 2 Times", "C. 4 Times", "D. 20 Times"], ans: 0, refZh: "《印花稅條例》Cap. 117 s.9", refEn: "Cap. 117 s.9" },
  { qZh: "於新界農地上未獲許可興建骨灰龕，城規會可發出哪種命令勒令中止？", qEn: "For unauthorized development on NT agricultural land, which notice can the Town Planning Board issue?", optsZh: ["A. 執行通知書 (Enforcement Notice)", "B. 拆卸令", "C. 破產令", "D. 封閉令"], optsEn: ["A. Enforcement Notice", "B. Demolition Order", "C. Bankruptcy Order", "D. Closure Order"], ans: 0, refZh: "《城市規劃條例》Cap. 131 s.23", refEn: "Cap. 131 s.23" },
  { qZh: "業主簽署 Form 3 出售放盤協議時，若未填寫有效期限，該協議有何法律效力？", qEn: "If the validity period is omitted when signing Form 3 for sale, what is the legal status?", optsZh: ["A. 協議無效", "B. 自動以 3 個月為上限", "C. 永久有效", "D. 以 1 年為上限"], optsEn: ["A. Agreement is invalid / void", "B. Deemed 3 months maximum", "C. Perpetual validity", "D. Deemed 1 year"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.6", refEn: "Cap. 511A s.6" },
  { qZh: "賣方必須提供多久歷史之業權契據 (Title Deeds) 方足夠證明良好業權 (Good Title)？", qEn: "A vendor must produce title deeds spanning at least how many years to show good title under Cap. 219 s.13?", optsZh: ["A. 15 年", "B. 7 年", "C. 20 年", "D. 30 年"], optsEn: ["A. 15 Years", "B. 7 Years", "C. 20 Years", "D. 30 Years"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219 s.13", refEn: "Cap. 219 s.13" },
  { qZh: "代理誤告知買家天台屬獨家業權，事後證實屬公用部分。代理須負何種法律責任？", qEn: "An agent wrongly tells a buyer a rooftop is legal title when it is common area. What is the agent’s legal liability?", optsZh: ["A. 過失失實陳述 (Negligent Misrepresentation) 損害賠償", "B. 無須負責", "C. 刑事監禁", "D. 買家自行承擔"], optsEn: ["A. Liability for Negligent Misrepresentation damages", "B. No liability", "C. Criminal imprisonment", "D. Buyer's risk"], ans: 0, refZh: "《失實陳述條例》Cap. 284", refEn: "Cap. 284" },
  { qZh: "根據 EAA 操守守則，代理在處理物業交易時，應避免採取何種不正當手段？", qEn: "Under the EAA Code of Ethics, which practice is strictly prohibited during property negotiations?", optsZh: ["A. 故意隱瞞重要事實或製造虛假形勢以催迫簽約", "B. 向買方提供土地查冊副本", "C. 建議訂金由律師樓託管", "D. 提醒買方視察物業"], optsEn: ["A. Deliberately misrepresenting facts or creating false urgency", "B. Supplying land search copies", "C. Advising deposit stakeholding", "D. Inspecting premises"], ans: 0, refZh: "地產代理監管局《操守守則》", refEn: "EAA Code of Ethics" },
  { qZh: "持牌營業員 (Salesperson) 在地產代理業務中，下列哪項行為屬超越權限？", qEn: "Which action exceeds authority for a licensed Salesperson in estate agency practice?", optsZh: ["A. 獨立以個人名義設立地產代理分行門市", "B. 代表地產代理行陪同客戶視察物業", "C. 協助客戶填寫 Form 1 表格", "D. 遞交臨約予業主"], optsEn: ["A. Operating an agency branch independently in personal name", "B. Accompanying clients to inspect property", "C. Assisting client with Form 1", "D. Delivering PASP to vendor"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.15", refEn: "Cap. 511 s.15" },
  { qZh: "持牌人申請續期地產代理牌照，最遲須於牌照屆滿前多久提出申請？", qEn: "When is the latest a licensee must apply for licence renewal before expiry?", optsZh: ["A. 至少 1 個月前，但不早於 3 個月前", "B. 7 天前", "C. 6 個月前", "D. 牌照屆滿當日"], optsEn: ["A. At least 1 month before, but not earlier than 3 months before", "B. 7 days before", "C. 6 months before", "D. On expiry date"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.27", refEn: "Cap. 511 s.27" },
  { qZh: "地產代理公司每一間營業地點，必須委任最少多少名持牌地產代理（大牌）作為經理？", qEn: "How many licensed Estate Agents (Full Licence) must be appointed as manager at every place of business?", optsZh: ["A. 1 名", "B. 2 名", "C. 3 名", "D. 無需委任"], optsEn: ["A. At least 1 manager", "B. 2 managers", "C. 3 managers", "D. None required"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.38", refEn: "Cap. 511 s.38" },
  { qZh: "代理發布二手物業廣告前，必須先取得業主簽署之哪份法定文件？", qEn: "Which document must be signed by vendor before issuing second-hand property advertisements?", optsZh: ["A. Form 3 (出售代理協議)", "B. 臨約", "C. Form 1", "D. 土地查冊副本"], optsEn: ["A. Form 3 (Estate Agency Agreement for Sale)", "B. PASP", "C. Form 1", "D. Land search copy"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "地產代理行必須在其主要營業地點顯眼處展示下列哪項文件？", qEn: "Which document must be displayed conspicuously at the principal place of business?", optsZh: ["A. 地產代理牌照正本", "B. 業主委託書", "C. 員工名冊", "D. 稅單"], optsEn: ["A. Original Estate Agent Licence", "B. Vendor authorization", "C. Employee register", "D. Tax demand"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.39", refEn: "Cap. 511 s.39" },
  { qZh: "業主出租住宅物業後，須於多少天內向差餉物業估價署提交 CR107 表格？", qEn: "Within how many days of letting a domestic property must Form CR107 be submitted to RVD?", optsZh: ["A. 1 個月內", "B. 7 天內", "C. 3 個月內", "D. 6 個月內"], optsEn: ["A. Within 1 month", "B. Within 7 days", "C. Within 3 months", "D. Within 6 months"], ans: 0, refZh: "《業主與租客(綜合)條例》Cap. 7 s.119K", refEn: "Cap. 7 s.119K" },
  { qZh: "生約期間 (Breathing period) 租客欲行使退租權，法律規定標準書面通知期一般為多久？", qEn: "What is the standard written notice period for a tenant exercising break clause during option term?", optsZh: ["A. 至少 1 個月", "B. 7 天", "C. 14 天", "D. 3 個月"], optsEn: ["A. At least 1 month", "B. 7 days", "C. 14 days", "D. 3 months"], ans: 0, refZh: "《業主與租客(綜合)條例》Cap. 7", refEn: "Cap. 7" },
  { qZh: "在無特別約定下，業主對住宅單位結構及外牆負有何種法定責任？", qEn: "In the absence of agreement, what is the landlord statutory duty regarding domestic structure?", optsZh: ["A. 保持內部及外牆結構良好維修狀態", "B. 由租客負擔全數費用", "C. 無需維修", "D. 由政府維修"], optsEn: ["A. Keep internal and external structure in good repair", "B. Tenant bears full cost", "C. No repair duty", "D. Government repairs"], ans: 0, refZh: "《業主與租客(綜合)條例》Cap. 7", refEn: "Cap. 7" },
  { qZh: "名義業主以明示信託 (Express Trust) 為受益人持有物業，處置該物業前必須取得誰的同意？", qEn: "A legal owner holds property under Express Trust. Whose consent is mandatory before disposition?", optsZh: ["A. 衡平法受益人 (Equitable Beneficiary)", "B. 地產代理", "C. 房屋署", "D. 管理公司"], optsEn: ["A. Equitable Beneficiary", "B. Estate Agent", "C. Housing Department", "D. Property Manager"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "臨約中載明「Right of First Refusal」(優先購買權)，其法律效力為何？", qEn: "What is the legal effect of a Right of First Refusal clause in a preliminary agreement?", optsZh: ["A. 業主欲出售時須優先以同等條件配售予該權利人", "B. 自動轉為正式合約", "C. 無約束力", "D. 罰款條款"], optsEn: ["A. Vendor must first offer property to holder on equal terms before selling elsewhere", "B. Automatically becomes formal agreement", "C. Non-binding", "D. Penalty clause"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "土地查冊負擔欄出現「Lis Pendens」(未決訴訟)，代表物業存在何種風險？", qEn: "What does 'Lis Pendens' registered in the Incumbrances section of a Land Search indicate?", optsZh: ["A. 該物業正涉及高等法院關於業權或權益之訴訟", "B. 已清還按揭", "C. 租約屆滿", "D. 差餉退款"], optsEn: ["A. Property is subject to pending High Court litigation affecting title", "B. Mortgage discharged", "C. Tenancy expired", "D. Rates refund"], ans: 0, refZh: "《土地註冊條例》Cap. 128", refEn: "Cap. 128" },
  { qZh: "下列哪項權益依法屬於「不可註冊於土地註冊處」之事項？", qEn: "Which instrument is statutorily unregisterable at the Land Registry?", optsZh: ["A. 短於 3 年且連同即時管有之普通口頭租約", "B. 法定按揭契據", "C. 臨約", "D. 押記令"], optsEn: ["A. Oral lease not exceeding 3 years at best rent with immediate possession", "B. Legal Charge", "C. PASP", "D. Charging Order"], ans: 0, refZh: "《土地註冊條例》Cap. 128 s.3", refEn: "Cap. 128 s.3" },
  { qZh: "可註冊契據若完全未交付土地註冊處註冊，對後續善意付價買家 (BFP) 有何法律效果？", qEn: "What is the legal effect of an uncompleted registerable deed against a subsequent bona fide purchaser?", optsZh: ["A. 對善意付價買家無效 (Void as against BFP)", "B. 完全優先", "C. 自動生效", "D. 刑事罪行"], optsEn: ["A. Null and void against subsequent bona fide purchaser for valuable consideration", "B. Takes absolute priority", "C. Automatically valid", "D. Criminal offence"], ans: 0, refZh: "《土地註冊條例》Cap. 128 s.3", refEn: "Cap. 128 s.3" },
  { qZh: "將契據交付土地註冊處註冊時，必須隨附哪一份法定表格？", qEn: "Which prescribed form must accompany a deed lodged for registration at the Land Registry?", optsZh: ["A. 註冊摘要 (Memorial Form)", "B. Form 1", "C. Form CR107", "D. PASP"], optsEn: ["A. Memorial Form", "B. Form 1", "C. Form CR107", "D. PASP"], ans: 0, refZh: "《土地註冊條例》Cap. 128", refEn: "Cap. 128" },
  { qZh: "代理若要合法收取買賣雙方佣金，其「事前同意」必須符合何種形式？", qEn: "To legally accept commission from both buyer and vendor, how must prior consent be obtained?", optsZh: ["A. 於代理協議或臨約中以書面明確披露並獲簽署同意", "B. 事後口頭告知", "C. 私下默許", "D. 同意無需"], optsEn: ["A. Expressly disclosed in writing in agency agreement/PASP with signed consent", "B. Oral notification afterwards", "C. Tacit understanding", "D. Consent unnecessary"], ans: 0, refZh: "《防止賄賂條例》Cap. 201 s.9", refEn: "Cap. 201 s.9" },
  { qZh: "一手住宅物業銷售中，法例規定唯一合法用於計算每平方呎單價之面積為何？", qEn: "What is the sole statutory area metric permitted for calculating per square foot prices in first-hand sales?", optsZh: ["A. 實用面積 (Saleable Area)", "B. 建築面積", "C. 實用率", "D. 窗台面積"], optsEn: ["A. Saleable Area", "B. Gross Floor Area", "C. Efficiency Ratio", "D. Bay window area"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621 s.8", refEn: "Cap. 621 s.8" },
  { qZh: "業主違反大廈公契 (DMC) 於平台加建小屋，管委會可採取何種法律行動？", qEn: "An owner breaches the DMC by constructing an unauthorized hut on a podium. What action can the IO take?", optsZh: ["A. 申請禁制令 (Injunction) 及註冊負擔令", "B. 沒收業主單位", "C. 切斷水電", "D. 罰款 $100"], optsEn: ["A. Apply for an Injunction and register a Charge against title", "B. Forfeit the unit", "C. Disconnect utilities", "D. Fine $100"], ans: 0, refZh: "《大廈管理條例》Cap. 344", refEn: "Cap. 344" },
  { qZh: "根據《地產代理條例》，監管局紀律委員會對違規持牌人可實施之最嚴重制裁為何？", qEn: "What is the most severe sanction the Disciplinary Committee can impose on a non-compliant licensee?", optsZh: ["A. 撤銷地產代理牌照 (Revocation of Licence)", "B. 警告信", "C. 罰款 $1,000", "D. 修讀課程"], optsEn: ["A. Revocation of Licence", "B. Warning Letter", "C. Fine $1,000", "D. Course attendance"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.30", refEn: "Cap. 511 s.30" },
  { qZh: "買方簽署臨約時付予代理行作為「Stakeholder」(託管人) 之訂金，代理行有何處理責任？", qEn: "How must deposit held by an agency as Stakeholder under a PASP be processed?", optsZh: ["A. 存入指定獨立信託戶口 (Trust Account)，未獲雙方同意不得擅自發還", "B. 直接轉交賣方", "C. 存入代理個人戶口", "D. 用作支付代理佣金"], optsEn: ["A. Deposit into designated trust account; released only upon dual authorization", "B. Directly hand to vendor", "C. Deposit into personal account", "D. Deduct commission"], ans: 0, refZh: "《地產代理(客戶款項)規例》Cap. 511B", refEn: "Cap. 511B" },
  { qZh: "代理處理物業交易時，若發現買賣雙方的身份證明文件名字與查冊紀錄不符，標準做法為何？", qEn: "What is the mandatory practice if vendor ID name conflicts with Land Search records?", optsZh: ["A. 暫停簽署並核對身分證明文件，確保無冒充業主詐騙", "B. 無視差異照常簽約", "C. 隨意自行修改臨約名字", "D. 叫買家私下交收"], optsEn: ["A. Pause signing and verify statutory ID to prevent impersonation fraud", "B. Ignore conflict", "C. Alter name unilaterally", "D. Private transfer"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "業主委託地產代理獨家代理 (Exclusive Agency) 出售單位，在獨家期內業主自行私下賣出單位，有何法律後果？", qEn: "Under an Exclusive Agency agreement, if vendor sells unit privately during exclusivity, what is the result?", optsZh: ["A. 業主仍須依約向獨家代理支付約定之佣金", "B. 業主無須支付任何佣金", "C. 買賣合約無效", "D. 獨家代理須向業主賠償"], optsEn: ["A. Vendor remains liable to pay agreed commission to exclusive agent", "B. No commission payable", "C. Contract void", "D. Agent pays vendor"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A Form 3", refEn: "Cap. 511A Form 3" },
  { qZh: "買方透過地產代理購入夾屋或居屋未補地價單位，代理必須確認買方具備何種法定資格？", qEn: "Before purchasing un-assessed HOS/PSPS flats, which statutory document must buyer possess?", optsZh: ["A. 房屋委員會發出之有效「購買資格證明書」(Letter of Eligibility)", "B. 銀行高層推薦信", "C. 稅務局免稅證", "D. 律師樓擔保"], optsEn: ["A. Valid Letter of Eligibility issued by the Housing Authority", "B. Bank reference", "C. Tax exemption certificate", "D. Solicitor guarantee"], ans: 0, refZh: "《房屋條例》Cap. 283", refEn: "Cap. 283" },
  { qZh: "物業存在清拆令 (Removal Order under s.24 Buildings Ordinance)，買方律師可否以此提出「Requisition on Title」(業質質詢)？", qEn: "Can a buyer's solicitor raise a Requisition on Title regarding an un-cleared s.24 Removal Order?", optsZh: ["A. 可以，因未遵從之清拆令構成業主業權瑕疵 (Title Defect)", "B. 不可以，因清拆令非產權事項", "C. 自動取消合約", "D. 由監管局決定"], optsEn: ["A. Yes, as an un-cleared statutory order constitutes a title defect", "B. No", "C. Auto cancel", "D. EAA decision"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "買賣雙方簽署臨時買賣合約 (PASP) 後，買方無故拒絕簽署正式買賣合約，賣方可採取何種法律救濟？", qEn: "If buyer refuses to sign formal agreement after PASP without lawful cause, what remedy is available?", optsZh: ["A. 沒收臨時訂金，並按臨約條款追討實際損失或特定履行 (Specific Performance)", "B. 即時入獄", "C. 沒收買方所有資產", "D. 無任何救濟"], optsEn: ["A. Forfeit deposit and claim actual loss/Specific Performance per PASP terms", "B. Imprisonment", "C. Forfeit all assets", "D. No remedy"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "物業土地查冊出現「Mortgage in favour of Hang Seng Bank」，賣方須於何時完成「Deed of Release」(解除押記契)？", qEn: "When must the vendor complete a Deed of Release for a registered bank mortgage?", optsZh: ["A. 於成交日 (Completion Date) 或之前完成交樓", "B. 成交後半年", "C. 簽臨約當日", "D. 隨時"], optsEn: ["A. On or before Completion Date", "B. 6 months after", "C. PASP signing date", "D. Any time"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "根據《商品說明條例》(Cap. 362)，地產代理在物業宣傳品中對單位面積或景觀作出誤導性遺漏 (Misleading Omission)，有何後果？", qEn: "Under Cap. 362, what is the consequence of misleading omissions regarding area or view in promotional materials?", optsZh: ["A. 屬刑事罪行，可被香港海關檢控", "B. 僅屬微不足道民事糾紛", "C. 警告了事", "D. 由地產行內部處分"], optsEn: ["A. Criminal offence subject to prosecution by Customs and Excise", "B. Civil dispute only", "C. Warning only", "D. Internal sanction"], ans: 0, refZh: "《商品說明條例》Cap. 362", refEn: "Cap. 362" },
  { qZh: "地產代理協議 (Form 3 / Form 4) 中，關於佣金支付時間的預設法定條款為何？", qEn: "What is the default statutory term regarding commission payment timing in Form 3 / Form 4?", optsZh: ["A. 於買賣雙方完成簽署正式買賣合約或完成交易時支付", "B. 視察物業時即時支付", "C. 簽放盤紙時即時支付", "D. 永久不付"], optsEn: ["A. Payable upon execution of formal agreement or completion of transaction", "B. Payable upon inspection", "C. Payable upon listing", "D. Never payable"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { qZh: "物業屬「破產管理署」(Official Receiver) 處置之破產人資產，代理應向誰確認處置權限？", qEn: "If property is asset of a bankrupt under Official Receiver, from whom must agency verify disposition authority?", optsZh: ["A. 破產管理署署長或受託人 (Trustee in Bankruptcy)", "B. 破產人個人", "C. 破產人親屬", "D. 鄰居"], optsEn: ["A. Official Receiver or Trustee in Bankruptcy", "B. Bankrupt individual", "C. Relatives", "D. Neighbors"], ans: 0, refZh: "《破產條例》Cap. 6", refEn: "Cap. 6" },
  { qZh: "代理在計算二手物業臨約之印花稅 (Stamp Duty) 時，應參考稅務局最新的何種稅率表？", qEn: "When calculating Stamp Duty for PASP, which official Inland Revenue scale applies?", optsZh: ["A. 從價印花稅 (AVD) 第 1 標準第 2 部或第 2 標準稅率表", "B. 薪俸稅率表", "C. 利得稅率表", "D. 差餉表"], optsEn: ["A. Ad Valorem Stamp Duty (AVD) Scale 1 Part 2 or Scale 2", "B. Salaries Tax scale", "C. Profits Tax scale", "D. Rates scale"], ans: 0, refZh: "《印花稅條例》Cap. 117", refEn: "Cap. 117" },
  { qZh: "業主以「Power of Attorney」(授權書) 授權其親友簽署臨約，代理必須查核該授權書是否已於何處註冊？", qEn: "If vendor appoints an attorney under Power of Attorney to sign PASP, where must agency verify registration?", optsZh: ["A. 土地註冊處 (Land Registry)", "B. 警察總部", "C. 房屋署", "D. 稅務局"], optsEn: ["A. Land Registry", "B. Police Headquarters", "C. Housing Dept", "D. Inland Revenue"], ans: 0, refZh: "《授權書條例》Cap. 31", refEn: "Cap. 31" },
  { qZh: "地產代理行收取訂金支票時，抬頭應寫為誰人？", qEn: "When agency collects deposit cheque, who should be named as payee?", optsZh: ["A. 賣方律師樓或賣方個人（按臨約規定），或代理行作為 Stakeholder", "B. 代理個人名義", "C. 代理主管名義", "D. 隨意空白"], optsEn: ["A. Vendor's solicitor, vendor personally, or agency as Stakeholder per PASP", "B. Agent personal name", "C. Supervisor name", "D. Blank"], ans: 0, refZh: "《地產代理(客戶款項)規例》Cap. 511B", refEn: "Cap. 511B" },
  { qZh: "根據《大廈管理條例》，公契 (DMC) 對大廈的所有業主及其繼承人具何種法律效力？", qEn: "Under Cap. 344, what is the legal effect of a Deed of Mutual Covenant (DMC) on successors?", optsZh: ["A. 具法例賦予之契約約束力 (Covenant running with the land)", "B. 僅對第一代業主有效", "C. 無約束力", "D. 僅屬建議性質"], optsEn: ["A. Statutory binding covenant running with the land", "B. Valid for 1st owner only", "C. Non-binding", "D. Advisory"], ans: 0, refZh: "《大廈管理條例》Cap. 344", refEn: "Cap. 344" },
  { qZh: "買方發現物業存在未清還之政府維修命令 (Building Order under s.26)，賣方在法律上有何責任？", qEn: "If an un-cleared s.26 Building Repair Order exists, what is the vendor statutory duty?", optsZh: ["A. 賣方須於成交前負責清還相關維修費用及取消命令，除非臨約另有協議", "B. 買方全數負擔", "C. 代理負擔", "D. 政府負擔"], optsEn: ["A. Vendor must pay costs and discharge order before completion unless PASP specifies otherwise", "B. Buyer pays all", "C. Agent pays", "D. Govt pays"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "地產代理行僱用未持有有效牌照的人士從事地產代理工作，該代理行觸犯何罪？", qEn: "What offence is committed if an agency employs an unlicensed individual for estate agency work?", optsZh: ["A. 《地產代理條例》第 15 條（無牌執業/僱用無牌人士罪）", "B. 無罪", "C. 勞工法例糾紛", "D. 民事侵權"], optsEn: ["A. Cap. 511 s.15 Unlicensed practice / employing unlicensed person", "B. No offence", "C. Labor dispute", "D. Civil tort"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.15", refEn: "Cap. 511 s.15" },
  { qZh: "租客簽署住宅租約 (Form 6) 時，代理必須向租客提供並解釋物業土地查冊結果，主要確認甚麼？", qEn: "When tenant signs Form 6, why must agency supply and explain Land Search results?", optsZh: ["A. 確認出租人是否登記業主或獲授權租務代表", "B. 確認業主婚姻狀況", "C. 確認業主職業", "D. 確認鄰居身份"], optsEn: ["A. Confirm lessor is registered owner or authorized leasing representative", "B. Confirm marital status", "C. Confirm occupation", "D. Confirm neighbor ID"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "一手住宅物業銷售中，若宣傳資料包含電腦模擬圖像 (CG renders)，發展商必須於圖旁標明甚麼？", qEn: "In first-hand sales, if promotion includes CG renders, what notice must developer state?", optsZh: ["A. 標明屬畫家對物業之想像感覺 (Artist's Impression)", "B. 保證 100% 與實物一致", "C. 無需標明", "D. 標明價錢"], optsEn: ["A. State that image is Artist's Impression only", "B. Guarantee 100% identical", "C. No notice needed", "D. State price"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621", refEn: "Cap. 621" },
  { qZh: "買賣合約中「Time is of the essence」(時間為合約要素) 條款之法律效果為何？", qEn: "What is the legal effect of 'Time is of the essence' clause in property agreement?", optsZh: ["A. 任何一方未按嚴格約定時間完成義務即屬違約，對家可即時解約", "B. 時間可隨意寬限", "C. 無法律效力", "D. 僅供參考"], optsEn: ["A. Strict compliance with time limits; failure constitutes breach entitling termination", "B. Flexible time", "C. Non-binding", "D. Advisory"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "業主身故後，其遺產受益人在未取得哪份文件前，無權簽署正式合約出售遺產物業？", qEn: "Before acquiring which legal document can estate beneficiaries NOT sign formal agreement to sell?", optsZh: ["A. 遺囑認證書 (Letters of Probate) 或遺產管理證明書", "B. 死亡證影印本", "C. 遺書副本", "D. 戶口簿"], optsEn: ["A. Letters of Probate or Letters of Administration", "B. Death certificate copy", "C. Will copy", "D. Bank book"], ans: 0, refZh: "《遺囑認證及遺產管理條例》Cap. 10", refEn: "Cap. 10" },
  { qZh: "地產代理行與客戶簽署之 Form 3 或 Form 4 協議，副本必須於多久內交付客戶？", qEn: "Within how long must a copy of signed Form 3 / Form 4 be delivered to client?", optsZh: ["A. 簽署後即時或 7 天內", "B. 1 個月後", "C. 成交後", "D. 無需交付"], optsEn: ["A. Immediately upon signing or within 7 days", "B. After 1 month", "C. Upon completion", "D. No delivery needed"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.6", refEn: "Cap. 511A s.6" },
  { qZh: "代理處理物業交易時，若發現單位存在結構性改變（如拆除承重牆），標準專業義務為何？", qEn: "What is agency duty if unauthorized structural alteration (e.g. load-bearing wall removal) is found?", optsZh: ["A. 提醒買方諮詢專業認可人士 (AP) 並向業主查詢有否入則", "B. 隱瞞買方", "C. 保證結構安全", "D. 叫買方即時撕毀合約"], optsEn: ["A. Advise buyer to consult Authorized Person (AP) and verify approved plans", "B. Conceal from buyer", "C. Guarantee structural safety", "D. Cancel PASP"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { qZh: "二手住宅物業交易中，臨時買賣合約 (PASP) 一般由誰人擬定及提供表格？", qEn: "In second-hand residential sales, who prepares and supplies the PASP form?", optsZh: ["A. 地產代理行", "B. 土地註冊處", "C. 房屋署", "D. 稅務局"], optsEn: ["A. Estate agency firm", "B. Land Registry", "C. Housing Dept", "D. Inland Revenue"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { qZh: "買方付予賣方之「初訂」(Preliminary Deposit) 一般佔總樓價多少比例？", qEn: "What is the standard percentage of Preliminary Deposit paid to vendor under PASP?", optsZh: ["A. 3% 至 5%", "B. 20%", "C. 50%", "D. 0.1%"], optsEn: ["A. 3% to 5%", "B. 20%", "C. 50%", "D. 0.1%"], ans: 0, refZh: "香港地產買賣常規", refEn: "HK Practice" },
  { qZh: "買賣雙方簽署正式合約時補足之「加訂」(Further Deposit)，連同初訂一般達到總樓價多少？", qEn: "Together with preliminary deposit, what total percentage does Further Deposit bring upon formal contract?", optsZh: ["A. 10%", "B. 30%", "C. 5%", "D. 50%"], optsEn: ["A. 10%", "B. 30%", "C. 5%", "D. 50%"], ans: 0, refZh: "香港地產買賣常規", refEn: "HK Practice" },
  { qZh: "地產代理在物業廣告上刊登的樓價，必須符合何種規定？", qEn: "What statutory rule governs property prices listed in agency advertisements?", optsZh: ["A. 必須為業主親自指示或書面同意之真實開價", "B. 代理可隨意刊登超低虛假吸引價", "C. 無需業主同意", "D. 參考同行開價"], optsEn: ["A. Must reflect genuine asking price instructed/authorized in writing by vendor", "B. Free to list false low price", "C. Vendor consent unnecessary", "D. Copy competitor"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "根據《地產代理條例》，持牌人若被裁定觸犯涉及詐騙或不誠實的罪行，監管局有何權力？", qEn: "What power has EAA if a licensee is convicted of an offence involving fraud or dishonesty?", optsZh: ["A. 撤銷或暫停其地產代理牌照", "B. 無權干預", "C. 罰款 $100", "D. 升職"], optsEn: ["A. Revoke or suspend estate agent licence", "B. No power", "C. Fine $100", "D. Promotion"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.30", refEn: "Cap. 511 s.30" },
  { qZh: "買方經代理購入連租約單位 (Subject to Tenancy)，代理必須向買方核實並提供甚麼？", qEn: "When purchasing property Subject to Tenancy, what must agency verify and supply to buyer?", optsZh: ["A. 現行租約副本、按金數額及租客交租紀錄", "B. 租客個人身分證正本", "C. 業主私人存款", "D. 鄰居評語"], optsEn: ["A. Tenancy agreement copy, deposit sum, and rental payment records", "B. Tenant original ID", "C. Vendor bank savings", "D. Neighbor comments"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "物業土地查冊顯示「Building Order under s.24」，代表建築事務監督發出了甚麼命令？", qEn: "What order is represented by 'Building Order under s.24' in a Land Search?", optsZh: ["A. 勒令拆除違例建築物 (UBW) 之清拆令", "B. 檢驗窗戶令", "C. 修理斜坡令", "D. 封閉令"], optsEn: ["A. Removal Order for Unauthorized Building Works (UBW)", "B. Window inspection order", "C. Slope repair order", "D. Closure Order"], ans: 0, refZh: "《建築物條例》Cap. 123 s.24", refEn: "Cap. 123 s.24" },
  { qZh: "物業土地查冊顯示「Building Order under s.28」，代表發出了何種命令？", qEn: "What order is represented by 'Building Order under s.28' in a Land Search?", optsZh: ["A. 排水渠修葺或排水系統命令", "B. 清拆令", "C. 斜坡令", "D. 停工令"], optsEn: ["A. Drainage repair or drainage system order", "B. Removal order", "C. Slope order", "D. Stop work order"], ans: 0, refZh: "《建築物條例》Cap. 123 s.28", refEn: "Cap. 123 s.28" },
  { qZh: "物業土地查冊顯示「Charge under Stamp Duty Ordinance」，代表甚麼？", qEn: "What does 'Charge under Stamp Duty Ordinance' registered on Land Search signify?", optsZh: ["A. 該物業因欠繳印花稅而被印花稅署署長註冊了押記", "B. 物業已完稅", "C. 業主獲免稅", "D. 按揭已清還"], optsEn: ["A. A charge registered by Collector of Stamp Revenue for unpaid stamp duty", "B. Stamping completed", "C. Tax exempted", "D. Mortgage paid"], ans: 0, refZh: "《印花稅條例》Cap. 117", refEn: "Cap. 117" },
  { qZh: "代理處理「分權共有」(Tenancy in Common) 物業出售時，其中一名業主欲出售其個人份額，需否其他業主同意？", qEn: "Under Tenancy in Common, does an owner require co-owner consent to sell personal undivided share?", optsZh: ["A. 依法可獨立出售其個人分權份額，無需其他業主同意", "B. 必須 100% 業主同意", "C. 必須法庭批准", "D. 完全禁止出售"], optsEn: ["A. May assign undivided share independently without co-owner consent", "B. 100% consent required", "C. Court order required", "D. Prohibited"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "若物業屬「負資產」(Negative Equity)，賣方出售樓價不足以清還銀行按揭，代理有何特別風險責任？", qEn: "If selling price is insufficient to discharge mortgage (Negative Equity), what is agency risk duty?", optsZh: ["A. 須確認賣方有能力補足差額清還按揭，並建議訂金由律師樓託管 (Stakeholder)", "B. 慫恿買方直接給賣方現金", "C. 無需理會按揭", "D. 由代理行補貼"], optsEn: ["A. Verify vendor capability to top up shortfall and advise deposit stakeholding", "B. Encourage cash to vendor", "C. Ignore mortgage", "D. Agency pays shortfall"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { qZh: "代理向買方宣稱物業可作商業閣樓開餐廳，但公契限制只可作住宅，代理觸犯了甚麼？", qEn: "Agent tells buyer unit allows restaurant when DMC restricts to residential. What is breached?", optsZh: ["A. 誤導性失實陳述及違反操守守則", "B. 完全合法", "C. 商業推廣技巧", "D. 僅由買方自負"], optsEn: ["A. Misleading misrepresentation and breach of Code of Ethics", "B. Fully legal", "C. Marketing technique", "D. Buyer risk only"], ans: 0, refZh: "《失實陳述條例》Cap. 284 & 操守守則", refEn: "Cap. 284 & Code of Ethics" },
  { qZh: "二手住宅物業交易中，賣方未能於成交日交付「VACANT POSSESSION」(空置管有)，構成何種效果？", qEn: "What is the legal effect if vendor fails to deliver Vacant Possession on completion date?", optsZh: ["A. 賣方重大違約，買方有權終止合約並索償", "B. 買方必須接受連租約", "C. 自動延期 1 年", "D. 無任何效果"], optsEn: ["A. Fundamental breach by vendor; buyer entitled to terminate and claim damages", "B. Buyer must accept tenancy", "C. Auto extend 1 year", "D. No effect"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "地產代理在物業臨約上記錄的物業地址，必須與哪里的官方紀錄完全一致？", qEn: "Where must the property address recorded in a PASP exactly match?", optsZh: ["A. 土地註冊處 (Land Registry) 查冊紀錄", "B. 業主名片", "C. 水費單", "D. 管理處收據"], optsEn: ["A. Land Registry search records", "B. Vendor business card", "C. Water bill", "D. Management receipt"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "買賣合約中「As Is」(按現狀) 條款，是否豁免賣方隱瞞「潛在隱蔽業權瑕疵」(Latent Defect) 的責任？", qEn: "Does an 'As Is' clause exempt vendor liability for concealing latent title defects?", optsZh: ["A. 否，按現狀條款一般僅指物理現狀，不豁免賣方隱瞞業權瑕疵責任", "B. 是，賣方可隱瞞所有瑕疵", "C. 是，買方無權追討", "D. 由代理承擔"], optsEn: ["A. No; 'As Is' applies to physical state, not exculpating title defect concealment", "B. Yes", "C. Yes", "D. Agency bears liability"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "一手住宅物業銷售中，發展商提供之融資按揭計劃，必須於價單中披露甚麼？", qEn: "What must developer disclose in price list regarding offered mortgage schemes?", optsZh: ["A. 利率、條款及申請資格門檻", "B. 發展商私人帳目", "C. 銀行股東名單", "D. 無需披露"], optsEn: ["A. Interest rates, key terms, and eligibility criteria", "B. Developer accounts", "C. Bank shareholders", "D. No disclosure"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621", refEn: "Cap. 621" },
  { qZh: "代理收取買方預付之微薄服務費，是否仍須發出正式蓋印/簽署收據？", qEn: "Must an agency issue a formal receipt upon receiving a small service fee advance?", optsZh: ["A. 是，所有客戶款項不論金額均須開具收據", "B. 否，小額無需收據", "C. 視乎代理心情", "D. 口頭確認即可"], optsEn: ["A. Yes; formal receipts are mandatory for all client monies regardless of amount", "B. No for small fees", "C. Optional", "D. Verbal confirmation"], ans: 0, refZh: "《地產代理(客戶款項)規例》Cap. 511B", refEn: "Cap. 511B" },
  { qZh: "根據《地產代理條例》，牌照被撤銷的人士，自撤銷之日起多久內不得重新申請牌照？", qEn: "How long after revocation of licence is an individual barred from re-applying?", optsZh: ["A. 12 個月內 (或監管局指定期限)", "B. 7 天內", "C. 永久不得申請", "D. 1 個月內"], optsEn: ["A. Within 12 months (or period specified by EAA)", "B. 7 days", "C. Permanent bar", "D. 1 month"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.30", refEn: "Cap. 511 s.30" },
  { qZh: "物業土地查冊顯示「Notice under s.17B of Noise Control Ordinance」，代表物業涉及甚麼？", qEn: "What does 'Notice under s.17B of Noise Control Ordinance' on Land Search indicate?", optsZh: ["A. 噪音管制條例相關通知書", "B. 僭建令", "C. 補地價通知", "D. 差餉單"], optsEn: ["A. Statutory Notice issued under Noise Control Ordinance", "B. UBW order", "C. Premium notice", "D. Rates bill"], ans: 0, refZh: "《噪音管制條例》Cap. 400", refEn: "Cap. 400" },
  { qZh: "地產代理處理村屋 (Village House) 買賣時，必須提醒買方核實村屋是否具備甚麼官方證明文件？", qEn: "When dealing with Village House sales, which official document must agency remind buyer to verify?", optsZh: ["A. 完工證 / 不反對入住書 (Letter of No Objection) 及地界圖", "B. 村長口頭證明", "C. 鄰居協議", "D. 水費單"], optsEn: ["A. Certificate of Exemption / Letter of No Objection and boundary plan", "B. Village representative oral note", "C. Neighbor note", "D. Water bill"], ans: 0, refZh: "《建築物條例(新界適用)條例》Cap. 121", refEn: "Cap. 121" }
];

const PART_II_20_UNIQUE = [
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q81】審視 Smart Mansion 土地查冊報告。代理 Sunny 發現屋宇署第 24 條清拆命令，賣方指示隱瞞。Sunny 最符合法規的做法為何？", qEn: "[Part II Case 1 • Q81] Inspecting Smart Mansion Land Search. Sunny finds a s.24 Removal Order. Vendor instructs non-disclosure. What is Sunny's duty?", optsZh: ["A. 遵從賣方指示不予披露", "B. 必須向買方全面披露清拆令並於臨約特別條款記載", "C. 建議買方自行評估風險", "D. 私下為賣方拆除僭建"], optsEn: ["A. Comply with vendor", "B. Mandatory disclosure to purchaser in PASP", "C. Advise buyer self-assessment", "D. Privately dismantle UBW"], ans: 1, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q82】溫先生以單獨遺囑執行人身分簽臨約。買方律師要求查閱 Letters of Probate 主要目的為何？", qEn: "[Part II Case 1 • Q82] Mr. Wan signs as Sole Executor. Why does buyer's solicitor require Letters of Probate?", optsZh: ["A. 核實溫先生具備處置物業之合法遺產管理權限", "B. 核實死亡證真偽", "C. 檢查遺產扣稅額", "D. 評估印花稅"], optsEn: ["A. Confirm legal authority to dispose estate property", "B. Verify death certificate", "C. Inspect tax deduction", "D. Calculate stamp duty"], ans: 0, refZh: "《遺囑認證及遺產管理條例》Cap. 10", refEn: "Cap. 10" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q83】代理查冊發現露台存在未入則加建物 (UBW)。臨約特別條款應如何擬定？", qEn: "[Part II Case 1 • Q83] Search reveals unauthorized balcony enclosure. How should special conditions be drafted?", optsZh: ["A. 明確列明該 UBW 存在，買方知悉並承擔日後清拆風險", "B. 保證該 UBW 100% 合法", "C. 承諾賣方開工拆除", "D. 不作任何紀錄"], optsEn: ["A. Explicitly state UBW presence, buyer accepts removal risk", "B. Guarantee legality", "C. Vendor promises removal", "D. Omit mention"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q84】物業土地查冊負擔欄有 2018 年恆生銀行按揭。臨約交樓條款應如何訂明？", qEn: "[Part II Case 1 • Q84] Search shows a 2018 Hang Seng Bank Legal Charge. How should completion terms be framed?", optsZh: ["A. 賣方須於成交日或之前清還按揭並提供解除押記契 (Release)", "B. 買方承接賣方原有按揭", "C. 訂金直接付予賣方個人", "D. 無需處理舊按揭"], optsEn: ["A. Vendor must discharge legal charge on or before completion", "B. Buyer assumes existing mortgage", "C. Deposit paid to vendor personally", "D. Ignore prior mortgage"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q85】若買方要求在未取得遺囑認證書前先付大訂予溫先生， Sunny 應給予甚麼專業建議？", qEn: "[Part II Case 1 • Q85] Buyer offers further deposit to Mr. Wan before Probate grant. What is Sunny's advice?", optsZh: ["A. 嚴禁將訂金直接給予溫先生，訂金必須由賣方律師樓託管 (Stakeholder)", "B. 贊成直接交現金", "C. 存入 Sunny 個人戶口", "D. 無所謂"], optsEn: ["A. Strictly prohibit direct payment; mandate solicitor stakeholding", "B. Agree cash payment", "C. Deposit to Sunny account", "D. Unimportant"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q86】查冊顯示 Smart Mansion 屬 1975 年落成大廈，買方欲確認大廈是否已收到強制驗樓通知 (s.30A Notice)， Sunny 應如何協助？", qEn: "[Part II Case 1 • Q86] Buyer asks if 1975 building received s.30A Mandatory Building Inspection Notice. How to assist?", optsZh: ["A. 查閱屋宇署資料庫及向管理處查詢有否收到 s.30A 強制驗樓/驗窗通知", "B. 保證大廈永遠無需驗樓", "C. 叫買家自行上網搵", "D. 隱瞞通知書"], optsEn: ["A. Search Buildings Dept records and verify with IO/Manager regarding s.30A notice", "B. Guarantee no inspection needed", "C. Ask buyer to search web", "D. Conceal notice"], ans: 0, refZh: "《建築物條例》Cap. 123 s.30A", refEn: "Cap. 123 s.30A" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q87】溫先生表示遺產繼承人共有三人，但遺囑指定其為單獨執行人。簽署臨約時需要其他繼承人聯署嗎？", qEn: "[Part II Case 1 • Q87] Will names Mr. Wan as sole executor among 3 beneficiaries. Must other beneficiaries co-sign PASP?", optsZh: ["A. 依法僅需單獨遺囑執行人溫先生簽署即具法律效力", "B. 必須全數繼承人聯署", "C. 必須民政事務署簽名", "D. 必須地產代理簽名"], optsEn: ["A. Signing by sole executor Mr. Wan alone carries full legal binding effect", "B. All beneficiaries must sign", "C. Home Affairs sign", "D. Agent sign"], ans: 0, refZh: "《遺囑認證及遺產管理條例》Cap. 10", refEn: "Cap. 10" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q88】查冊紀錄顯示單位不可分割份數為 1/50th，公契載明住宅用途。買方意圖改作無牌民宿 (AirBnB)，代理有何義務？", qEn: "[Part II Case 1 • Q88] Land search specifies domestic use. Buyer intends unlicensed AirBnB rental. What is agency duty?", optsZh: ["A. 提醒買方此舉違反大廈公契及《旅館業條例》，代理不可協助違規", "B. 鼓勵買方經營", "C. 代買方宣傳民宿", "D. 隱瞞公契條款"], optsEn: ["A. Advise buyer that commercial short-lets breach DMC and Hotel & Guesthouse Accommodation Ordinance", "B. Encourage operation", "C. Advertise AirBnB", "D. Conceal DMC"], ans: 0, refZh: "《旅館業條例》Cap. 349 & DMC", refEn: "Cap. 349 & DMC" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q89】若屋宇署清拆令在成交前被註銷，賣方律師應提供甚麼文件予買方律師驗證？", qEn: "[Part II Case 1 • Q89] If s.24 Order is discharged before completion, what document proves compliance to buyer's solicitor?", optsZh: ["A. 屋宇署發出之 Compliance Letter (順從通知書/撤銷令)", "B. 口頭保證", "C. 裝修公司收據", "D. 代理信件"], optsEn: ["A. Official Compliance Letter / Order of Discharge issued by Buildings Dept", "B. Oral guarantee", "C. Contractor receipt", "D. Agency note"], ans: 0, refZh: "《建築物條例》Cap. 123", refEn: "Cap. 123" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q90】 Smart Mansion 單位交樓時， Sunny 陪同交樓驗收發現露台 UBW 仍未拆除。臨約已訂明「按現狀承擔」，買方可否拒絕成交？", qEn: "[Part II Case 1 • Q90] Upon handover, UBW remains. PASP stated 'As Is with UBW accepted'. Can buyer refuse completion?", optsZh: ["A. 買方須按合約條款接受現狀並按時完成成交，不可無故拒絕", "B. 買方可即時要求退還雙倍訂金", "C. 買方可即時扣減一半樓價", "D. 臨約自動作廢"], optsEn: ["A. Buyer must complete per contractual 'As Is' risk acceptance clause", "B. Demand double deposit return", "C. Deduct half price", "D. PASP voided"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q91】賣方 Apex Profits Limited 屬公司。代理 Ken 僅進行土地查冊，遺漏公司註冊處 (CR) 查冊，有何風險？", qEn: "[Part II Case 2 • Q91] Vendor is a company. Agent Ken omitted Companies Registry search. What risk is exposed?", optsZh: ["A. 遺漏未於土地註冊處登記之浮動押記 (Floating Charge) 及 Negative Pledge 限制", "B. 遺漏差餉紀錄", "C. 遺漏水電費紀錄", "D. 無任何風險"], optsEn: ["A. Omission of unregistered Floating Charge with Negative Pledge at Land Registry", "B. Omission of rates", "C. Omission of utility bills", "D. No risk"], ans: 0, refZh: "《公司條例》Cap. 622", refEn: "Cap. 622" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q92】商業物業交易中，代理 Ken 建議將 380 萬大訂直接存入賣方公司帳戶，有何潛在隱患？", qEn: "[Part II Case 2 • Q92] Ken advises paying HK$3.8M deposit directly to corporate vendor account. What danger exists?", optsZh: ["A. 若公司清盤或負債，買方面臨損失訂金且無法取得業權之極高風險", "B. 買方可獲稅務扣減", "C. 律師樓禁止託管商業訂金", "D. 符合標準對家程序"], optsEn: ["A. Severe risk of deposit loss if vendor liquidates before completion", "B. Tax reduction", "C. Solicitors prohibited from stakeholding", "D. Standard practice"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q93】買方公司要求以授權簽署人 (Authorized Signatory) 代表簽署正式合約，代理應查核哪份文件？", qEn: "[Part II Case 2 • Q93] Purchaser company signs via Authorized Signatory. Which corporate document must be inspected?", optsZh: ["A. 董事會決議案 (Board Resolution) 及公司章程 (Articles of Association)", "B. 商業登記證影印本", "C. 報稅表", "D. 股東個人身分證"], optsEn: ["A. Board Resolution and Articles of Association", "B. Business Registration copy", "C. Tax return", "D. Shareholder ID"], ans: 0, refZh: "《公司條例》Cap. 622", refEn: "Cap. 622" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q94】商業單位公契載明限作辦公室用途 (Commercial Office)。買方意圖改作零售開診所，代理有何義務？", qEn: "[Part II Case 2 • Q94] DMC restricts unit to Commercial Office. Buyer intends retail medical clinic. What is agent duty?", optsZh: ["A. 提醒買方查核 DMC 及大廈公契用途限制，避免違規", "B. 保證開診所完全合法", "C. 慫恿買方先簽約後申請", "D. 隱瞞用途限制"], optsEn: ["A. Advise buyer to check DMC user restrictions and planning permission", "B. Guarantee legal clinic use", "C. Encourage signing first", "D. Conceal restrictions"], ans: 0, refZh: "大廈公契 (DMC) & 城規條例", refEn: "DMC & Town Planning" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q95】查冊發現賣方公司於 2019 年向渣打銀行做過法定押記 (Legal Charge)， Ken 應如何確認賣方具清還能力？", qEn: "[Part II Case 2 • Q95] Land search shows 2019 Legal Charge to bank. How to verify vendor ability to discharge?", optsZh: ["A. 要求賣方律師提供 Redemption Statement (贖樓清單)，確認賣方所得樓價足夠清還按揭", "B. 相信賣方口頭承諾", "C. 代賣方向銀行借錢", "D. 無需確認"], optsEn: ["A. Request vendor solicitor to supply Redemption Statement verifying proceeds clear debt", "B. Believe oral assurance", "C. Agency loans funds", "D. No check"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q96】若 Apex Profits Limited 在簽正式合約前被債權人入稟法院申請清盤 (Winding-up Petition)，該物業交易有何影響？", qEn: "[Part II Case 2 • Q96] If vendor company faces Winding-up Petition before formal contract, what is the impact?", optsZh: ["A. 根據《公司(清盤及雜項條文)條例》，清盤開始後處置公司財產依法屬無效 (Void)", "B. 交易照常無影響", "C. 買方自動獲得物業", "D. 代理接收物業"], optsEn: ["A. Any property disposition after winding-up commencement is void by law", "B. Transaction unaffected", "C. Buyer gets property auto", "D. Agency receives property"], ans: 0, refZh: "《公司(清盤及雜項條文)條例》Cap. 32 s.182", refEn: "Cap. 32 s.182" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q97】買方為海外註冊公司 (BVI Company)，代理在核實其簽署人身份時須特別注意甚麼？", qEn: "[Part II Case 2 • Q97] Buyer is an overseas BVI company. What special document verifies signatory capacity?", optsZh: ["A. 要求提供 Incumbency Certificate (董事職權證明書) 及 Legal Opinion (法律意見書)", "B. 僅憑 BVI 商業牌照即可", "C. 隨意簽署", "D. 拒絕處理"], optsEn: ["A. Request Certificate of Incumbency and Legal Opinion verifying authority", "B. BVI licence copy only", "C. Sign freely", "D. Refuse transaction"], ans: 0, refZh: "香港商業轉易實務", refEn: "HK Commercial Conveyancing" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q98】中環商業中心全層面積達 5,000 呎，買方欲將其分拆為 4 個小單位出租， Ken 應給予何種法規提示？", qEn: "[Part II Case 2 • Q98] Buyer plans to sub-divide 5,000 sq ft office floor into 4 units. What regulatory advice applies?", optsZh: ["A. 提示須符合屋宇署建築物條例、消防條例及公契 (DMC) 拆細限制", "B. 保證隨意拆細完全合法", "C. 叫買方偷偷裝修", "D. 隱瞞建築署規定"], optsEn: ["A. Caution that subdivision must comply with Buildings Ordinance, Fire Safety, and DMC", "B. Guarantee legal", "C. Secret renovation", "D. Conceal BO"], ans: 0, refZh: "《建築物條例》Cap. 123 & DMC", refEn: "Cap. 123 & DMC" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q99】賣方公司要求買方以商業本票 (Banker's Draft) 支付臨約訂金，抬頭指定為賣方律師樓，此做法是否合規？", qEn: "[Part II Case 2 • Q99] Vendor requires deposit via Banker's Draft payable to vendor's solicitor. Is this compliant?", optsZh: ["A. 合規，抬頭為賣方律師樓作為 Stakeholder 能有效保障訂金安全", "B. 不合規，必須付現金", "C. 不合規，抬頭必須寫代理名", "D. 違法行為"], optsEn: ["A. Compliant; Banker's Draft to solicitor as Stakeholder secures deposit safety", "B. Non-compliant cash required", "C. Must name agency", "D. Illegal"], ans: 0, refZh: "《地產代理(客戶款項)規例》Cap. 511B", refEn: "Cap. 511B" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q100】完成商業物業交易後，買方律師必須於多少天內向稅務局印花稅署繳付相關印花稅並辦理土地註冊？", qEn: "[Part II Case 2 • Q100] Within how many days after completion must purchaser solicitor pay stamp duty and register deed?", optsZh: ["A. 簽署合約後 30 天內", "B. 7 天內", "C. 60 天內", "D. 1 年內"], optsEn: ["A. Within 30 days of contract execution", "B. Within 7 days", "C. Within 60 days", "D. Within 1 year"], ans: 0, refZh: "《印花稅條例》Cap. 117 & Cap. 128", refEn: "Cap. 117 & Cap. 128" }
];

const CLIENT_FALLBACK_QUESTIONS: MockQuestion[] = [
  ...PART_I_UNIQUE_DATA.map((item, idx) => ({
    id: idx + 1,
    part: 'I' as const,
    trackApplicability: ((idx + 1) % 3 === 0 ? 'EAQE_ONLY' : 'BOTH') as 'EAQE_ONLY' | 'BOTH',
    topicZh: item.refZh,
    topicEn: item.refEn,
    questionZh: item.qZh,
    questionEn: item.qEn,
    optionsZh: item.optsZh,
    optionsEn: item.optsEn,
    answerIndex: item.ans,
    explanationZh: `根據香港相關法例（${item.refZh}），此題答案為 ${item.optsZh[item.ans]}。`,
    explanationEn: `Under Hong Kong property law (${item.refEn}), the correct statutory answer is ${item.optsEn[item.ans]}.`,
    statuteRefZh: item.refZh,
    statuteRefEn: item.refEn,
    isLocked: false
  })),
  ...PART_II_20_UNIQUE.map((item, idx) => ({
    id: idx + 81,
    part: 'II' as const,
    trackApplicability: 'BOTH' as const,
    caseScenarioId: item.scenarioId,
    topicZh: item.refZh,
    topicEn: item.refEn,
    questionZh: item.qZh,
    questionEn: item.qEn,
    optionsZh: item.optsZh,
    optionsEn: item.optsEn,
    answerIndex: item.ans,
    explanationZh: `根據土地查冊紀錄及法規依據（${item.refZh}），此題答案為 ${item.optsZh[item.ans]}。`,
    explanationEn: `Based on Land Search records and statutory authority (${item.refEn}), the correct answer is ${item.optsEn[item.ans]}.`,
    statuteRefZh: item.refZh,
    statuteRefEn: item.refEn,
    isLocked: false
  }))
];

export default function MockExamPage() {
  const { userEmail, userTier, isPaidUser } = useAuth();
  
  const [isZh, setIsZh] = useState<boolean>(true);
  const [examStage, setExamStage] = useState<'briefing' | 'simulation' | 'report'>('briefing');
  const [track, setTrack] = useState<'EAQE' | 'SQE'>('EAQE');
  const [activePartFilter, setActivePartFilter] = useState<'ALL' | 'I' | 'II'>('ALL');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(180 * 60);
  const [activeAnnexTab, setActiveAnnexTab] = useState<'property' | 'owner' | 'incumbrances' | 'narrative'>('incumbrances');

  const [questionsList, setQuestionsList] = useState<MockQuestion[]>(CLIENT_FALLBACK_QUESTIONS);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [selectedLockedQuestion, setSelectedLockedQuestion] = useState<MockQuestion | null>(null);

  const [showSynthesizerModal, setShowSynthesizerModal] = useState<boolean>(false);
  const [selectedBatchDomain, setSelectedBatchDomain] = useState<ExamDomainBatch>('CAP511');
  const [batchQuestionCount, setBatchQuestionCount] = useState<number>(4);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState<boolean>(false);
  const [synthesizerError, setSynthesizerError] = useState<string | null>(null);

  const [launchNotification, setLaunchNotification] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTopRef = useRef<HTMLDivElement | null>(null);

  const scrollToQuestionTop = () => {
    if (questionTopRef.current) {
      questionTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const loadQuestions = useCallback(async (selectedTrack: 'EAQE' | 'SQE') => {
    const hasHttpOrigin =
      typeof window !== 'undefined' &&
      Boolean(window.location) &&
      typeof window.location.origin === 'string' &&
      window.location.origin.startsWith('http');

    if (!hasHttpOrigin) return;

    try {
      const targetUrl = new URL('/api/mock-exam', window.location.origin);
      targetUrl.searchParams.set('track', selectedTrack);

      const headers: Record<string, string> = {
        'x-user-email': userEmail,
        'x-user-tier': userTier
      };

      const res = await fetch(targetUrl.toString(), { headers });

      if (res.ok) {
        const data = await res.json();
        if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestionsList(data.questions);
        }
      }
    } catch (e) {
      console.warn('Using client fallback seed:', e);
    }
  }, [userEmail, userTier]);

  useEffect(() => {
    loadQuestions(track);
  }, [track, loadQuestions]);

  const syncIncorrectAnswersToSRS = useCallback(() => {
    try {
      const incorrectItems: Array<{
        id: string;
        questionId: number;
        blockNum: string;
        titleZh: string;
        titleEn: string;
        statuteRefZh: string;
        statuteRefEn: string;
        lastReviewed: string;
        nextReviewDate: string;
        ladderStage: 'Day 1' | 'Day 3' | 'Day 7' | 'Day 16' | 'Day 35';
        accuracy: number;
      }> = [];

      const todayStr = new Date().toISOString().split('T')[0];

      questionsList.forEach((q) => {
        if (q.isLocked) return;
        const userAnswer = userAnswers[q.id];
        const isIncorrect = userAnswer !== undefined && userAnswer !== q.answerIndex;

        if (isIncorrect) {
          incorrectItems.push({
            id: `q-${q.id}`,
            questionId: q.id,
            blockNum: `Block ${q.part === 'I' ? '01' : '16'}`,
            titleZh: q.topicZh,
            titleEn: q.topicEn,
            statuteRefZh: q.statuteRefZh,
            statuteRefEn: q.statuteRefEn,
            lastReviewed: todayStr,
            nextReviewDate: todayStr,
            ladderStage: 'Day 1',
            accuracy: 0
          });
        }
      });

      if (incorrectItems.length > 0) {
        const existingQueue = JSON.parse(
          localStorage.getItem('agentpass_srs_queue_v1') || '[]'
        );

        const existingIds = new Set(existingQueue.map((item: any) => item.questionId || item.id));
        const filteredNew = incorrectItems.filter((item) => !existingIds.has(item.questionId));
        const updatedQueue = [...filteredNew, ...existingQueue];

        localStorage.setItem('agentpass_srs_queue_v1', JSON.stringify(updatedQueue));
      }
    } catch (err) {
      console.warn('SRS Sync Warning:', err);
    }
  }, [questionsList, userAnswers]);

  const handleSubmitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    syncIncorrectAnswersToSRS();
    setExamStage('report');
  };

  const handleSynthesizeBatch = async () => {
    setIsGeneratingBatch(true);
    setSynthesizerError(null);

    setShowSynthesizerModal(false);
    if (examStage !== 'simulation') {
      setTimeLeftSeconds(180 * 60);
      setCurrentQIndex(0);
      setUserAnswers({});
      setFlaggedQuestions({});
      setExamStage('simulation');
    }

    setLaunchNotification(
      isZh 
        ? `⚡ 已啟動智能試題合成！系統正於後台實時載入最新題目...` 
        : `⚡ Dynamic Synthesis Initiated! Streaming targeted items...`
    );
    setTimeout(() => {
      setLaunchNotification(null);
    }, 4000);

    try {
      const caseCtx = activeScenario ? {
        title: activeScenario.titleZh,
        narrative: activeScenario.narrativeZh,
        incumbrances: activeScenario.landSearch.incumbrancesZh,
        owner: activeScenario.landSearch.ownerZh
      } : undefined;

      const res = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          track,
          domainBatch: selectedBatchDomain,
          count: batchQuestionCount,
          isZh,
          caseScenarioId: selectedBatchDomain === 'POIM_CASE' ? 'case-1' : undefined,
          caseContext: caseCtx
        })
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Synthesis Failed (${res.status})`);
      }

      const data = await res.json();
      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestionsList((prev) => {
          const highestId = Math.max(...prev.map((q) => q.id), 0);
          const augmented = data.questions.map((q: any, i: number) => ({
            ...q,
            id: highestId + i + 1,
            isLocked: false
          }));
          return [...prev, ...augmented];
        });
      }
    } catch (err: any) {
      console.warn('Synthesis error:', err);
    } finally {
      setIsGeneratingBatch(false);
    }
  };

  const activeQuestions = questionsList.filter((q) => {
    if (activePartFilter === 'ALL') return true;
    return q.part === activePartFilter;
  });

  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0] || questionsList[0];
  const activeScenario = currentQ?.caseScenarioId ? CASE_SCENARIOS[currentQ.caseScenarioId] : null;

  useEffect(() => {
    if (examStage === 'simulation') {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            syncIncorrectAnswersToSRS();
            setExamStage('report');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStage, syncIncorrectAnswersToSRS]);

  const formatTimer = (totalSecs: number): string => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId: number, optIndex: number) => {
    if (examStage !== 'simulation') return;
    if (currentQ?.isLocked) {
      setSelectedLockedQuestion(currentQ);
      setShowUpgradeModal(true);
      return;
    }
    setUserAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const toggleFlag = (qId: number) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const calculateResults = () => {
    let correctCount = 0;
    let partICorrect = 0;
    let partITotal = 0;
    let partIICorrect = 0;
    let partIITotal = 0;

    questionsList.forEach((q) => {
      if (q.isLocked) return;
      const isCorrect = userAnswers[q.id] === q.answerIndex;
      if (isCorrect) correctCount++;

      if (q.part === 'I') {
        partITotal++;
        if (isCorrect) partICorrect++;
      } else {
        partIITotal++;
        if (isCorrect) partIICorrect++;
      }
    });

    const activeAnswerable = questionsList.filter((q) => !q.isLocked).length;
    const scorePct = activeAnswerable > 0 ? Math.round((correctCount / activeAnswerable) * 100) : 0;
    
    const partIPct = partITotal > 0 ? (partICorrect / partITotal) * 100 : 0;
    const partIIPct = partIITotal > 0 ? (partIICorrect / partIITotal) * 100 : 0;
    const isPassed = partIPct >= 60 && partIIPct >= 60;

    return {
      correctCount,
      totalQuestions: activeAnswerable,
      scorePct,
      isPassed,
      partICorrect,
      partITotal,
      partIPct: Math.round(partIPct),
      partIICorrect,
      partIITotal,
      partIIPct: Math.round(partIIPct)
    };
  };

  const renderUpgradeModal = () => {
    if (!showUpgradeModal) return null;

    const isEaqeUpgradeRequired = selectedLockedQuestion?.lockReason === 'REQUIRES_EAQE_UPGRADE';

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black">
                <Lock className="h-5 w-5" />
              </span>
              <div>
                <span className="text-[10px] font-mono font-black text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-50 border border-amber-200 block w-fit">
                  {isEaqeUpgradeRequired ? 'EAQE MASTER UPGRADE REQUIRED' : 'PRO SUBSCRIPTION REQUIRED'}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 pt-0.5">
                  {isEaqeUpgradeRequired
                    ? (isZh ? '解鎖地產代理（大牌）全套考卷' : 'Upgrade to Full EAQE Agent License Paper')
                    : (isZh ? `解鎖官方全真 ${track} 考卷` : `Unlock Full ${track} Examination Suite`)}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-bold space-y-1">
              <span className="text-amber-800 font-mono text-[11px] block">{isZh ? '鎖定題目模組：' : 'Locked Section:'}</span>
              <p className="text-sm font-black text-amber-900">
                {selectedLockedQuestion
                  ? (isZh ? selectedLockedQuestion.topicZh : selectedLockedQuestion.topicEn)
                  : `${track} Master Paper`}
              </p>
            </div>

            <p className="text-slate-700 font-semibold leading-relaxed">
              {isEaqeUpgradeRequired
                ? (isZh
                    ? '您目前的權限為【SQE 營業員版】。EAQE 大牌試卷包含商業物業雙重查冊、浮動押記、經理控制及大廈管理條例 (Cap. 344) 深度考題：'
                    : 'Your active account is SQE Salesperson tier. EAQE papers test senior agency controls, corporate charges, and commercial conveyance:')
                : (isZh
                    ? `免費版僅供前 10 題體驗。升級至 AgentPass ${track} PRO 即可解鎖：`
                    : `Free preview covers the first 10 questions. Upgrade to AgentPass ${track} PRO to access:`)}
            </p>

            <div className="space-y-2 font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  {isZh
                    ? `官方 ${track === 'EAQE' ? '100 題全真考卷 (Part I 80 + Part II 20 題查冊個案)' : '60 題全真考卷 (Part I 50 + Part II 10 題查冊個案)'}`
                    : `Official Full ${track === 'EAQE' ? '100-Question' : '60-Question'} Paper`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  {isZh
                    ? '完整 IRIS 土地查冊個案庫（Smart Mansion、Central Tower）'
                    : 'Complete IRIS Land Search Dossiers (Probate, Corporate Debentures, Powers of Attorney)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{isZh ? 'EAA 官方 60% 雙門檻及格雷達診斷與條例剖析' : 'Official 60% Dual-Threshold Diagnostic Radar & Legal Citations'}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs"
            >
              {isZh ? '繼續免費體驗' : 'Continue Free Preview'}
            </button>

            <a
              href="/pricing"
              className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-2"
            >
              <span>{isZh ? (isEaqeUpgradeRequired ? '升級為 EAQE 大牌' : '立即升級 PRO') : (isEaqeUpgradeRequired ? 'Upgrade to EAQE' : 'Upgrade to PRO')}</span>
              <ChevronRight className="h-4 w-4 text-slate-950" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderSynthesizerModal = () => {
    if (!showSynthesizerModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600 text-white font-bold">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 block w-fit">
                  COGNITIVE EXAM SYNTHESIZER
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 pt-0.5">
                  {isZh ? `動態擴展 ${track} 試卷題庫` : `Synthesize New ${track} Questions`}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSynthesizerModal(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">{isZh ? '選擇法定範疇 (Domain):' : 'Select Statutory Domain:'}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'CAP511', zh: 'Cap. 511 代理條例與常規', en: 'Cap. 511 Licensing & Practice' },
                  { id: 'CONVEYANCING', zh: 'Cap. 219 & 128 轉易查冊', en: 'Conveyancing & Land Search' },
                  { id: 'TENANCY_BUILDINGS', zh: 'Cap. 7 租務與 Cap. 123 僭建', en: 'Tenancy & Building Control' },
                  { id: 'AGENCY_TORT', zh: '普通法代理與防賄條例', en: 'Agency Law & Bribery Ordinance' },
                  { id: 'POIM_CASE', zh: 'Part II 查冊實務個案題', en: 'Part II POIM Case Studies' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedBatchDomain(item.id as ExamDomainBatch)}
                    className={`p-3 rounded-xl border text-left font-bold transition flex items-center justify-between cursor-pointer ${
                      selectedBatchDomain === item.id
                        ? 'bg-indigo-50 text-indigo-900 border-indigo-500 ring-1 ring-indigo-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    <span>{isZh ? item.zh : item.en}</span>
                    {selectedBatchDomain === item.id && <Check className="h-4 w-4 text-indigo-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">{isZh ? '生成題數 (Tokens Optimization):' : 'Batch Count:'}</label>
              <div className="flex items-center gap-2">
                {[3, 4, 5].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setBatchQuestionCount(cnt)}
                    className={`flex-1 py-2 rounded-xl border font-bold text-xs transition cursor-pointer ${
                      batchQuestionCount === cnt
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    +{cnt} {isZh ? '題' : 'Qs'}
                  </button>
                ))}
              </div>
            </div>

            {synthesizerError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{synthesizerError}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              disabled={isGeneratingBatch}
              onClick={() => setShowSynthesizerModal(false)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs"
            >
              {isZh ? '取消' : 'Cancel'}
            </button>

            <button
              type="button"
              disabled={isGeneratingBatch}
              onClick={handleSynthesizeBatch}
              className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingBatch ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>{isZh ? '正在嚴謹合成試題...' : 'Synthesizing...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>{isZh ? '開始動態生成' : 'Generate Now'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (examStage === 'briefing') {
    return (
      <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
        {renderUpgradeModal()}
        {renderSynthesizerModal()}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-900">
                  <Award className="h-3.5 w-3.5 text-amber-600" />
                  <span>EAA Official Simulation Mode</span>
                </span>
                
                {/* Clean Account Badge - No Public Toggle Button */}
                <div className="inline-flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                    isPaidUser
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                  }`}>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{isPaidUser ? 'PRO ACCOUNT (UNLOCKED)' : 'FREE PREVIEW (10 QUESTIONS)'}</span>
                  </span>

                  {!isPaidUser && (
                    <a
                      href="/pricing"
                      className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>{isZh ? '升級 PRO' : 'Upgrade'}</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsZh(!isZh)}
                  className="px-3 py-1 rounded-full text-xs font-bold border border-slate-200 bg-slate-50 text-slate-800 hover:border-amber-500 transition cursor-pointer flex items-center gap-1"
                >
                  <Globe className="h-3 w-3 text-amber-600" />
                  <span>{isZh ? 'EN' : '繁體中文'}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {isZh ? '香港地產代理資格全真模擬試場' : 'HK EAA Professional Licensing Mock Suite'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {isZh
                  ? '官方雙階段計分架構：Part I 法規選擇題 + Part II 土地查冊個案實務題。'
                  : 'Official dual-part exam architecture: Part I Statutory MCQs & Part II POIM Case Studies.'}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setShowSynthesizerModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold text-indigo-900 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>{isZh ? '智能題庫合成器' : 'Synthesizer'}</span>
              </button>

              <a
                href="/course"
                className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-indigo-600" />
                <span>{isZh ? '返回課程' : 'Syllabus'}</span>
              </a>
            </div>
          </div>

          {/* Track Selection Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                {isZh ? 'STEP 1: 選擇應考牌照級別' : 'STEP 1: Select Examination Track'}
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                {isZh ? '地產代理 (大牌 EAQE) 或 營業員 (細牌 SQE)' : 'Estate Agent (EAQE) or Salesperson (SQE)'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTrack('EAQE')}
                className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer ${
                  track === 'EAQE'
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${
                      track === 'EAQE' ? 'bg-slate-950 text-amber-300' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    FULL AGENT • EAQE
                  </span>
                  <Building2 className={`h-5 w-5 ${track === 'EAQE' ? 'text-slate-950' : 'text-amber-600'}`} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold">{isZh ? '地產代理資格考試 (EAQE)' : 'Estate Agent Qualifying Exam'}</h3>
                  <p className={`text-xs mt-1 ${track === 'EAQE' ? 'text-slate-900' : 'text-slate-500'}`}>
                    {isZh
                      ? '全真 100 題完整標準卷（Part I 80 題 + Part II 20 題查冊個案）'
                      : '100 Questions Paper (Part I 80 Qs + Part II 20 Qs)'}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTrack('SQE')}
                className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer ${
                  track === 'SQE'
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${
                      track === 'SQE' ? 'bg-slate-950 text-amber-300' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    SALESPERSON • SQE
                  </span>
                  <ShieldCheck className={`h-5 w-5 ${track === 'SQE' ? 'text-slate-950' : 'text-indigo-600'}`} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold">{isZh ? '營業員資格考試 (SQE)' : 'Salesperson Qualifying Exam'}</h3>
                  <p className={`text-xs mt-1 ${track === 'SQE' ? 'text-slate-900' : 'text-slate-500'}`}>
                    {isZh
                      ? '全真 60 題完整標準卷（Part I 50 題 + Part II 10 題查冊個案）'
                      : '60 Questions Paper (Part I 50 Qs + Part II 10 Qs)'}
                  </p>
                </div>
              </button>
            </div>

            {/* Exam Parameters Overview with Exact 10-Q Free Counter */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono uppercase">{isZh ? '考試時限' : 'Time Allowed'}</span>
                <span className="font-extrabold text-slate-900 text-sm">
                  {track === 'EAQE' ? '3 小時 (180 分鐘)' : '2.5 小時 (150 分鐘)'}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono uppercase">{isZh ? '及格標準' : 'Passing Mark'}</span>
                <span className="font-extrabold text-emerald-700 text-sm">雙部分皆須 60%</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono uppercase">{isZh ? '解鎖試題' : 'Unlocked Questions'}</span>
                <span className="font-extrabold text-amber-700 text-sm">
                  {isPaidUser ? (track === 'EAQE' ? '100 題 (全真考場)' : '60 題 (全真考場)') : '10 題 (免費預覽)'}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono uppercase">{isZh ? '全真題庫總數' : 'Total Question Bank'}</span>
                <span className="font-extrabold text-blue-700 text-sm">130 題全題庫</span>
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setTimeLeftSeconds(180 * 60);
                  setCurrentQIndex(0);
                  setUserAnswers({});
                  setFlaggedQuestions({});
                  setExamStage('simulation');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isPaidUser ? `進入全真 ${track === 'EAQE' ? '100 題' : '60 題'} 模擬考場` : '進入 10 題免費模擬試場'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (examStage === 'simulation') {
    const isCurrentFlagged = Boolean(flaggedQuestions[currentQ?.id]);
    const totalAnswered = Object.keys(userAnswers).length;

    return (
      <div className="min-h-screen py-5 px-3 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
        {renderUpgradeModal()}
        {renderSynthesizerModal()}
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Autonomous Synthesis Notification Banner */}
          {launchNotification && (
            <div className="p-3.5 rounded-2xl bg-indigo-600 text-white shadow-lg flex items-center justify-between gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-300 animate-spin" />
                <span>{launchNotification}</span>
              </div>
              <button
                type="button"
                onClick={() => setLaunchNotification(null)}
                className="text-indigo-200 hover:text-white px-2 py-0.5 rounded-lg text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                    {track} • {currentQ?.part === 'I' ? 'Part I Statutory' : 'Part II POIM Case'}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {isZh ? `第 ${currentQIndex + 1} / ${activeQuestions.length} 題` : `Q ${currentQIndex + 1} of ${activeQuestions.length}`}
                  </span>
                </div>
                <div className="text-xs font-extrabold text-slate-800">
                  {isZh ? currentQ?.topicZh : currentQ?.topicEn}
                </div>
              </div>

              {/* Part Filter Toggles */}
              <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs">
                {(['ALL', 'I', 'II'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setActivePartFilter(p);
                      setCurrentQIndex(0);
                      scrollToQuestionTop();
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                      activePartFilter === p
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {p === 'ALL' ? (isZh ? '全部' : 'All') : `Part ${p}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer & Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                type="button"
                onClick={() => setShowSynthesizerModal(true)}
                className="px-3.5 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-indigo-900 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                <span>{isZh ? '動態生成' : 'Synthesizer'}</span>
              </button>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs font-bold">
                <Clock className="h-4 w-4 text-amber-600" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>

              <button
                type="button"
                onClick={() => currentQ && toggleFlag(currentQ.id)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isCurrentFlagged
                    ? 'bg-amber-500 text-slate-950 border-amber-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>{isZh ? (isCurrentFlagged ? '已標記' : '標記覆查') : (isCurrentFlagged ? 'Flagged' : 'Flag')}</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs shadow-sm transition cursor-pointer"
              >
                {isZh ? '提早交卷' : 'Submit Exam'}
              </button>
            </div>
          </div>

          {/* Main Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 8 Columns: Question Stem or Split Annex */}
            <div className="lg:col-span-8 space-y-4">
              {/* Part II Land Search Annex Box */}
              {currentQ?.part === 'II' && activeScenario && (
                <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono font-bold text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
                        LAND SEARCH ANNEX (IRIS 查冊附件)
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {isZh ? activeScenario.titleZh : activeScenario.titleEn}
                      </h4>
                    </div>

                    {/* Annex View Tabs */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setActiveAnnexTab('incumbrances')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          activeAnnexTab === 'incumbrances' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        (I) Incumbrances
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveAnnexTab('owner')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          activeAnnexTab === 'owner' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        (O) Owner
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveAnnexTab('property')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          activeAnnexTab === 'property' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        (P) Property
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveAnnexTab('narrative')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          activeAnnexTab === 'narrative' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        {isZh ? '個案事實' : 'Facts'}
                      </button>
                    </div>
                  </div>

                  {/* Annex Content Viewer */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono leading-relaxed space-y-2">
                    {activeAnnexTab === 'incumbrances' && (
                      <div className="space-y-1.5">
                        <span className="font-bold text-rose-700 block">SECTION (I): INCUMBRANCES (產權負擔與命令)</span>
                        {(isZh ? activeScenario.landSearch.incumbrancesZh : activeScenario.landSearch.incumbrancesEn).map((item, idx) => (
                          <p key={idx} className="text-slate-800 font-semibold">• {item}</p>
                        ))}
                      </div>
                    )}

                    {activeAnnexTab === 'owner' && (
                      <div className="space-y-1.5">
                        <span className="font-bold text-amber-800 block">SECTION (O): OWNER PARTICULARS (業主欄位)</span>
                        {(isZh ? activeScenario.landSearch.ownerZh : activeScenario.landSearch.ownerEn).map((item, idx) => (
                          <p key={idx} className="text-slate-800 font-semibold">• {item}</p>
                        ))}
                      </div>
                    )}

                    {activeAnnexTab === 'property' && (
                      <div className="space-y-1.5">
                        <span className="font-bold text-indigo-800 block">SECTION (P): PROPERTY PARTICULARS (物業資料)</span>
                        {(isZh ? activeScenario.landSearch.propertyZh : activeScenario.landSearch.propertyEn).map((item, idx) => (
                          <p key={idx} className="text-slate-800 font-semibold">• {item}</p>
                        ))}
                      </div>
                    )}

                    {activeAnnexTab === 'narrative' && (
                      <div className="font-sans space-y-1">
                        <span className="font-bold text-slate-900 block font-mono text-xs">{isZh ? '個案情節與事實：' : 'Case Narrative & Facts:'}</span>
                        <p className="text-slate-700 font-medium">{isZh ? activeScenario.narrativeZh : activeScenario.narrativeEn}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Main Question Card */}
              <div
                ref={questionTopRef}
                className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 scroll-mt-20"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {isZh ? `試題序號 #${currentQ?.id}` : `Question ID #${currentQ?.id}`}
                    </span>
                    <div className="flex items-center gap-2">
                      {currentQ?.isLocked && (
                        <span className="text-xs font-mono font-black text-amber-800 px-2.5 py-0.5 rounded bg-amber-100 border border-amber-300 flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          <span>{currentQ.lockReason === 'REQUIRES_EAQE_UPGRADE' ? 'EAQE ONLY' : 'PRO ONLY'}</span>
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold text-indigo-700 px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                        {isZh ? currentQ?.statuteRefZh : currentQ?.statuteRefEn}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                    {isZh ? currentQ?.questionZh : currentQ?.questionEn}
                  </h3>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {(isZh ? currentQ?.optionsZh : currentQ?.optionsEn)?.map((optionText, optIdx) => {
                    const isSelected = userAnswers[currentQ.id] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between gap-3 cursor-pointer ${
                          currentQ?.isLocked
                            ? 'bg-slate-50 border-dashed border-slate-300 text-slate-400 hover:border-amber-400'
                            : isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm ring-1 ring-amber-400'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-slate-50'
                        }`}
                      >
                        <span>{optionText}</span>
                        {isSelected && <Check className="h-4 w-4 shrink-0 text-slate-950" />}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={currentQIndex === 0}
                    onClick={() => {
                      setCurrentQIndex((prev) => Math.max(0, prev - 1));
                      scrollToQuestionTop();
                    }}
                    className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{isZh ? '上一題' : 'Previous'}</span>
                  </button>

                  <span className="text-xs font-mono text-slate-500 font-semibold">
                    {currentQIndex + 1} / {activeQuestions.length}
                  </span>

                  <button
                    type="button"
                    disabled={currentQIndex === activeQuestions.length - 1}
                    onClick={() => {
                      setCurrentQIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1));
                      scrollToQuestionTop();
                    }}
                    className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isZh ? '下一題' : 'Next'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Palette Matrix */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                      {isZh ? `${track} 試題導覽調色板` : `${track} Palette Matrix`}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {totalAnswered}/{questionsList.length}
                  </span>
                </div>

                {/* Grid Nodes */}
                <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1">
                  {activeQuestions.map((q, idx) => {
                    const isAnswered = typeof userAnswers[q.id] === 'number';
                    const isFlagged = Boolean(flaggedQuestions[q.id]);
                    const isCurrent = idx === currentQIndex;

                    let bgClass = 'bg-slate-100 text-slate-700 border-slate-200';
                    if (isCurrent) {
                      bgClass = 'bg-slate-950 text-white border-slate-950 ring-2 ring-amber-400';
                    } else if (q.isLocked) {
                      bgClass = 'bg-slate-50 text-slate-400 border-dashed border-slate-300';
                    } else if (isFlagged) {
                      bgClass = 'bg-amber-400 text-slate-950 border-amber-500 font-extrabold';
                    } else if (isAnswered) {
                      bgClass = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setCurrentQIndex(idx);
                          scrollToQuestionTop();
                          if (q.isLocked) {
                            setSelectedLockedQuestion(q);
                            setShowUpgradeModal(true);
                          }
                        }}
                        className={`h-9 rounded-xl border text-xs font-mono transition flex items-center justify-center cursor-pointer relative ${bgClass}`}
                        title={`Question ${idx + 1}`}
                      >
                        {q.isLocked ? <Lock className="h-3 w-3 text-slate-400" /> : idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>{isZh ? '已作答' : 'Answered'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span>{isZh ? '已標記' : 'Flagged'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-[8px]">🔒</span>
                    <span>{isZh ? 'PRO 鎖定' : 'Locked'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-950"></span>
                    <span>{isZh ? '當前題目' : 'Current'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const results = calculateResults();

  return (
    <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Score Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-900">
              <Award className="h-3.5 w-3.5 text-amber-600" />
              <span>{track} Official Diagnostic Performance Radar</span>
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {results.isPassed
                ? (isZh ? `恭喜及格！達到 ${track} 法定持牌標準` : `Congratulations! Passed ${track} Standard`)
                : (isZh ? '未達及格門檻，請針對弱項加強複習' : 'Below Passing Threshold, Needs Review')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              {isZh
                ? `官方規定雙部分皆須達 60%。你獲得了 ${results.scorePct}%，共答對 ${results.correctCount} / ${results.totalQuestions} 題。`
                : `Official rule requires 60% in BOTH parts. You achieved ${results.scorePct}% (${results.correctCount}/${results.totalQuestions} correct).`}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 text-center min-w-[150px]">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">FINAL SCORE</span>
            <div className={`text-4xl font-black ${results.isPassed ? 'text-emerald-700' : 'text-rose-700'}`}>
              {results.scorePct}%
            </div>
            <span className={`text-xs font-extrabold ${results.isPassed ? 'text-emerald-700' : 'text-rose-700'}`}>
              {results.isPassed ? 'QUALIFIED (雙部分及格)' : 'NOT YET PASSED'}
            </span>
          </div>
        </div>

        {/* Breakdown by Parts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-800">Part I Statutory Law MCQs</span>
              <span className={`font-mono font-bold ${results.partIPct >= 60 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {results.partICorrect}/{results.partITotal} ({results.partIPct}%) {results.partIPct >= 60 ? '✓' : '✗'}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${results.partITotal > 0 ? (results.partICorrect / results.partITotal) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-800">Part II POIM Land Search Case Study</span>
              <span className={`font-mono font-bold ${results.partIIPct >= 60 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {results.partIICorrect}/{results.partIITotal} ({results.partIIPct}%) {results.partIIPct >= 60 ? '✓' : '✗'}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${results.partIITotal > 0 ? (results.partIICorrect / results.partIITotal) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setExamStage('simulation');
              setCurrentQIndex(0);
              scrollToQuestionTop();
            }}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 text-indigo-600" />
            <span>{isZh ? '檢視所有答卷' : 'Review Answers'}</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href="/dashboard"
              className="px-5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition"
            >
              {isZh ? '學員進度儀表板' : 'Dashboard'}
            </a>
            <button
              type="button"
              onClick={() => {
                setExamStage('briefing');
                setUserAnswers({});
                setFlaggedQuestions({});
              }}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-sm transition"
            >
              {isZh ? '重設並重新應試' : 'Retake New Exam'}
            </button>
          </div>
        </div>

        {/* Detailed Item Analysis */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-mono font-bold text-slate-700 uppercase tracking-wider">
            {isZh ? '試題逐題法規深度分析 (Item Analysis):' : 'Item-by-Item Legal Analysis:'}
          </h3>

          <div className="space-y-4">
            {questionsList
              .filter((q) => !q.isLocked)
              .map((q, idx) => {
                const userOpt = userAnswers[q.id];
                const isCorrect = userOpt === q.answerIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 sm:p-6 rounded-3xl border bg-white shadow-sm space-y-3 ${
                      isCorrect ? 'border-emerald-200' : 'border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        #{idx + 1} • Part {q.part} • {isZh ? q.topicZh : q.topicEn}
                      </span>
                      <span className="text-xs font-mono font-bold text-indigo-700 px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                        {isZh ? q.statuteRefZh : q.statuteRefEn}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">
                      {isZh ? q.questionZh : q.questionEn}
                    </h4>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-500">{isZh ? '你的回答:' : 'Your Answer:'}</span>
                        <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {typeof userOpt === 'number'
                            ? (isZh ? q.optionsZh[userOpt] : q.optionsEn[userOpt])
                            : (isZh ? '未作答' : 'Not answered')}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-500">{isZh ? '法定正確答案:' : 'Correct Statutory Answer:'}</span>
                          <span className="font-bold text-emerald-700">
                            {isZh ? q.optionsZh[q.answerIndex] : q.optionsEn[q.answerIndex]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Legal Explanation */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed">
                      <span className="font-bold block text-amber-900 uppercase font-mono text-[10px] mb-1">
                        {isZh ? '【 官方評分依據與條例解析 】' : '[ Statutory Explanation ]'}
                      </span>
                      <p>{isZh ? q.explanationZh : q.explanationEn}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}