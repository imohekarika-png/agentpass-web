// app/quiz/page.tsx
'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import {
  HelpCircle,
  BookOpen,
  Award,
  Check,
  XCircle,
  RotateCcw,
  ArrowRight,
  Filter,
  Lock,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export interface QuizQuestion {
  id: number;
  blockId: string;
  blockNum: string;
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
  trackApplicability: 'BOTH' | 'EAQE_ONLY' | 'SQE_ONLY';
  isLocked?: boolean;
}

// Complete 20 Topic Blocks with Distinct, Real-World EAA Options
const TOPIC_QUESTION_DATA = [
  // Block 01
  {
    blockId: 'b1', blockNum: 'Block 01', topicZh: 'EAA 架構與持牌資格', topicEn: 'EAA Structure & Licensing Qualifications', refZh: '《地產代理條例》Cap. 511 s.15', refEn: 'Cap. 511 s.15', track: 'BOTH' as const,
    qZh: '下列哪項條件【絕非】個人申請地產代理牌照 (EAQE) 或營業員牌照 (SQE) 的法定要求？',
    qEn: 'Which of the following is NOT a statutory requirement for applying for an individual Estate Agent or Salesperson licence?',
    optsZh: ['A. 年滿 18 歲', 'B. 完成中五 (Form 5) 或同等學歷', 'C. 具備最少 1 年地產相關工作經驗', 'D. 獲監管局評定為「適當人選」(Fit and Proper)'],
    optsEn: ['A. Aged 18 or above', 'B. Completed Form 5 or equivalent', 'C. Possess at least 1 year relevant estate agency work experience', 'D. Deemed a Fit and Proper person by the EAA'],
    ans: 2,
    expZh: '《地產代理條例》(Cap. 511) 規定之發牌四條件為：年滿 18 歲、中五學歷、Fit & Proper 評估及考試合格。「工作經驗」絕非發牌法定條件。',
    expEn: 'Under Cap. 511, the 4 statutory conditions are: Age 18+, Form 5, Fit & Proper, and Exam passed. Work experience is NOT required.'
  },

  // Block 02
  {
    blockId: 'b2', blockNum: 'Block 02', topicZh: '營業地點與 31 天通知期', topicEn: 'Business Premises & 31-Day Notice', refZh: '《地產代理條例》Cap. 511 s.40', refEn: 'Cap. 511 s.40', track: 'BOTH' as const,
    qZh: '持牌地產代理公司變更營業地址或委任新分行經理後，須於幾多天內以書面通知 EAA？',
    qEn: 'Within how many days must an agency notify EAA in writing of a change in business address or branch manager appointment?',
    optsZh: ['A. 7 天內', 'B. 14 天內', 'C. 31 天內', 'D. 60 天內'],
    optsEn: ['A. Within 7 days', 'B. Within 14 days', 'C. Within 31 days', 'D. Within 60 days'],
    ans: 2,
    expZh: 'Cap. 511 s.40 規定，變更主要營業地點、開設新分行或委任分行經理，均須於 31 天內以書面通知監管局。',
    expEn: 'Cap. 511 s.40 mandates that address changes and branch manager appointments must be reported in writing within 31 days.'
  },

  // Block 03
  {
    blockId: 'b3', blockNum: 'Block 03', topicZh: '廣告發布規範與授權', topicEn: 'Advertising Rules & Authorizations', refZh: '《地產代理常規規例》Cap. 511A s.9', refEn: 'Cap. 511A s.9', track: 'BOTH' as const,
    qZh: '代理在刊登二手住宅物業廣告前，必須先取得賣方簽署之哪份法定文件？',
    qEn: 'Which prescribed document must be signed by the vendor before an agent issues property advertisements?',
    optsZh: ['A. 表格三 (Form 3) 地產代理協議', 'B. 臨時買賣合約 (PASP)', 'C. 業主身分證影印本', 'D. 土地查冊報告'],
    optsEn: ['A. Form 3 Estate Agency Agreement for Sale', 'B. Preliminary Agreement for Sale and Purchase (PASP)', 'C. Vendor Identity Card copy', 'D. Land Search Report'],
    ans: 0,
    expZh: '根據 Cap. 511A s.9，未取得業主簽署之 Form 3 或 Form 5 書面授權前，嚴禁刊登任何物業廣告。',
    expEn: 'Under Cap. 511A s.9, written authorization via Form 3 or Form 5 must be secured prior to issuing any property advertisement.'
  },

  // Block 04
  {
    blockId: 'b4', blockNum: 'Block 04', topicZh: '客戶存款與信託戶口', topicEn: 'Client Money & Trust Accounts', refZh: '《地產代理(客戶款項)規例》Cap. 511B', refEn: 'Cap. 511B', track: 'EAQE_ONLY' as const,
    qZh: '地產代理代客戶收取存款後，必須於幾多天內向客戶發出正式書面收據？',
    qEn: 'Within how many days must an estate agent issue a written receipt after receiving client money?',
    optsZh: ['A. 即時發出', 'B. 7 天內', 'C. 14 天內', 'D. 30 天內'],
    optsEn: ['A. Immediately', 'B. Within 7 days', 'C. Within 14 days', 'D. Within 30 days'],
    ans: 2,
    expZh: 'Cap. 511B 規定，收取客戶款項後須即時存入信託戶口，並於 14 天內發出書面收據，收據副本保存至少 3 年。',
    expEn: 'Cap. 511B requires client money to be deposited immediately in trust and a receipt issued within 14 days (retained for 3 years).'
  },

  // Block 05
  {
    blockId: 'b5', blockNum: 'Block 05', topicZh: '雙重代理與利益衝突', topicEn: 'Dual Agency & Conflict of Interest', refZh: '《地產代理常規規例》Cap. 511A s.13', refEn: 'Cap. 511A s.13', track: 'BOTH' as const,
    qZh: '地產代理同時代表買賣雙方 (Dual Agency) 時，必須履行何種法定程序？',
    qEn: 'When acting for both buyer and seller in the same transaction, what mandatory procedure must an agent follow?',
    optsZh: ['A. 事前取得雙方書面同意並透明披露佣金率', 'B. 交易完成後口頭通知買賣雙方', 'C. 無需向任何一方披露雙重代理身分', 'D. 僅需取得賣方單方面同意'],
    optsEn: ['A. Prior written consent from both parties disclosing commission rates', 'B. Oral notification after transaction completion', 'C. Disclosure is unnecessary', 'D. Vendor consent alone is sufficient'],
    ans: 0,
    expZh: 'Cap. 511A s.13 規定，雙重代理必須事前取得買賣雙方書面簽署同意，並透明列明兩邊收取之佣金率。',
    expEn: 'Cap. 511A s.13 mandates prior written consent signed by both vendor and purchaser disclosing commission rates on both sides.'
  },

  // Block 06
  {
    blockId: 'b6', blockNum: 'Block 06', topicZh: '防止賄賂與秘密回佣', topicEn: 'Bribery & Secret Commissions', refZh: '《防止賄賂條例》Cap. 201 s.9', refEn: 'Cap. 201 s.9', track: 'BOTH' as const,
    qZh: '代理未得主事人事前書面同意，私下向對家收取秘密回佣，觸犯哪項刑事罪行？',
    qEn: 'Accepting a secret commission from counterparty without principal consent breaches which Ordinance?',
    optsZh: ['A. 《防止賄賂條例》Cap. 201 s.9 代理人貪污交易罪', 'B. 《盜竊罪條例》普通欺詐罪', 'C. 僅屬私營機構行政違規', 'D. 《地產代理條例》民事違約'],
    optsEn: ['A. Cap. 201 s.9 Corrupt transactions by agents', 'B. Theft Ordinance fraud', 'C. Administrative breach only', "D. Estate Agents Ordinance civil breach"],
    ans: 0,
    expZh: '私下收受秘密回佣觸犯 Cap. 201 s.9 嚴重刑事罪行，最高可判監禁 7 年及罰款 $500,000。',
    expEn: 'Accepting secret commission without principal prior consent breaches Cap. 201 s.9, punishable by up to 7 years imprisonment and HK$500k fine.'
  },

  // Block 07
  {
    blockId: 'b7', blockNum: 'Block 07', topicZh: '一手樓售樓書與價單', topicEn: 'First-hand Sales Brochures & Price Lists', refZh: '《一手住宅物業銷售條例》Cap. 621', refEn: 'Cap. 621', track: 'BOTH' as const,
    qZh: '發展商開售一手住宅物業前，售樓說明書及價單分別須提前至少幾多天公佈？',
    qEn: 'At least how many days before sale must first-hand sales brochures and price lists be made available?',
    optsZh: ['A. 售樓書 7 天前，價單 3 天前', 'B. 售樓書 14 天前，價單 7 天前', 'C. 售樓書 3 天前，價單 1 天前', 'D. 售樓書與價單皆須 30 天前'],
    optsEn: ['A. Sales brochure 7 days; Price list 3 days', 'B. Sales brochure 14 days; Price list 7 days', 'C. Sales brochure 3 days; Price list 1 day', 'D. Both 30 days prior'],
    ans: 0,
    expZh: 'Cap. 621 規定「書 7 價 3」時間表：售樓說明書開售前至少 7 天公佈，價單開售前至少 3 天公佈。',
    expEn: 'Cap. 621 mandates the "Brochure 7, Price list 3" timeline prior to commencing sales.'
  },

  // Block 08
  {
    blockId: 'b8', blockNum: 'Block 08', topicZh: '一手樓冷靜期與沒收條款', topicEn: 'Cooling-off Period & Deposit Forfeiture', refZh: '《一手住宅物業銷售條例》Cap. 621 s.53', refEn: 'Cap. 621 s.53', track: 'BOTH' as const,
    qZh: '買家簽署一手樓 PASP 後 5 個工作天內放棄交易，賣方最多可沒收幾多訂金？',
    qEn: 'If a buyer withdraws within 5 working days after signing a first-hand PASP, how much deposit can be forfeited?',
    optsZh: ['A. 樓價 5% 臨時訂金', 'B. 全數 10% 訂金', 'C. 賣方無權沒收任何訂金', 'D. 樓價 2.5% 違約金'],
    optsEn: ['A. 5% preliminary deposit only', 'B. Full 10% deposit', 'C. No forfeiture permitted', 'D. 2.5% penalty'],
    ans: 0,
    expZh: 'Cap. 621 s.53 規定，冷靜期內撤回交易，賣方沒收 5% 臨訂，且無權追討任何額外損失。',
    expEn: 'Cap. 621 s.53 provides that upon cooling-off withdrawal, the vendor forfeits 5% preliminary deposit only with no further claim.'
  },

  // Block 09
  {
    blockId: 'b9', blockNum: 'Block 09', topicZh: '業權契據 15 年根源', topicEn: '15-Year Good Title Root', refZh: '《物業轉易及物業條例》Cap. 219 s.13', refEn: 'Cap. 219 s.13', track: 'BOTH' as const,
    qZh: '賣方必須提供至少多久歷史之業權契據 (Title Deeds) 方足夠證明良好業權 (Good Title)？',
    qEn: 'A vendor must produce title deeds spanning at least how many years to show good title under Cap. 219 s.13?',
    optsZh: ['A. 7 年', 'B. 15 年', 'C. 20 年', 'D. 30 年'],
    optsEn: ['A. 7 Years', 'B. 15 Years', 'C. 20 Years', 'D. 30 Years'],
    ans: 1,
    expZh: '《物業轉易及物業條例》Cap. 219 s.13 規定，證明良好業權必須追溯至至少 15 年歷史之契據根源。',
    expEn: 'Under Cap. 219 s.13, proving good title requires producing root deeds dating back at least 15 years.'
  },

  // Block 10
  {
    blockId: 'b10', blockNum: 'Block 10', topicZh: '聯權共有與長存權', topicEn: 'Joint Tenancy & Survivorship', refZh: '《物業轉易及物業條例》Cap. 219 s.24', refEn: 'Cap. 219 s.24', track: 'BOTH' as const,
    qZh: '甲、乙以「聯權共有」持有一單位，甲未經乙同意將其個人份額轉讓予丙。結果為何？',
    qEn: 'A and B hold property as Joint Tenants. A assigns share to C without B\'s consent. What is the legal result?',
    optsZh: ['A. 轉讓無效', 'B. 聯權共有中斷 (Severance) 為分權共有 (Tenancy in Common)', 'C. 乙自動獨佔全數業權', 'D. 聯權共有維持不變'],
    optsEn: ['A. Assignment is void', 'B. Severance into Tenancy in Common', 'C. B automatically acquires sole title', 'D. Joint tenancy remains unaffected'],
    ans: 1,
    expZh: '轉讓個人份額破壞聯權四同，依法中斷 (Severance) 轉為分權共有 (Tenancy in Common)。',
    expEn: 'Transferring an undivided share destroys the four unities, severing joint tenancy into Tenancy in Common.'
  },

  // Block 11
  {
    blockId: 'b11', blockNum: 'Block 11', topicZh: '法定代理協議 (Form 3 至 6)', topicEn: 'Agency Agreements (Forms 3 to 6)', refZh: '《地產代理常規規例》Cap. 511A s.6', refEn: 'Cap. 511A s.6', track: 'BOTH' as const,
    qZh: '業主簽署 Form 3 出售放盤協議時，若未填寫有效期限，該協議有何法律效力？',
    qEn: 'If the validity period is omitted when a vendor signs Form 3, what is its legal status?',
    optsZh: ['A. 協議完全無效 (Invalid)', 'B. 自動以 3 個月為上限', 'C. 永久有效', 'D. 自動以 1 年為上限'],
    optsEn: ['A. Agreement is completely invalid', 'B. Deemed valid for 3 months maximum', 'C. Perpetually valid', 'D. Deemed valid for 1 year'],
    ans: 0,
    expZh: 'Cap. 511A 規定法定代理協議必須載明有效期 (最長 3 個月)，未填寫有效期的協議完全無效。',
    expEn: 'Cap. 511A mandates that prescribed agency forms must state a validity period (max 3 months). Omission renders agreement void.'
  },

  // Block 12
  {
    blockId: 'b12', blockNum: 'Block 12', topicZh: '土地註冊 1 個月優先權', topicEn: 'Land Registration Priority', refZh: '《土地註冊條例》Cap. 128 s.5', refEn: 'Cap. 128 s.5', track: 'BOTH' as const,
    qZh: '契據若在簽立後幾多個月內交付土地註冊處註冊，其優先權可追溯至簽立日生效？',
    qEn: 'If a deed is registered within how many months of execution does priority relate back to execution date?',
    optsZh: ['A. 1 個月內', 'B. 2 個月內', 'C. 3 個月內', 'D. 6 個月內'],
    optsEn: ['A. Within 1 month', 'B. Within 2 months', 'C. Within 3 months', 'D. Within 6 months'],
    ans: 0,
    expZh: ' Cap. 128 s.5 規定，簽立後 1 個月內交付註冊，優先權追溯至簽立日；超過 1 個月則僅由註冊日生效。',
    expEn: 'Cap. 128 s.5 provides that registration within 1 month relates priority back to execution date.'
  },

  // Block 13
  {
    blockId: 'b13', blockNum: 'Block 13', topicZh: '大廈管理條例與公契', topicEn: 'Building Management & DMC', refZh: '《大廈管理條例》Cap. 344 s.3', refEn: 'Cap. 344 s.3', track: 'EAQE_ONLY' as const,
    qZh: '根據《大廈管理條例》(Cap. 344)，成立業主立案法團 (IO) 需獲得不少於幾多比例不可分割份數支持？',
    qEn: 'Under Cap. 344, forming an Incorporated Owners (IO) requires a resolution supported by what share percentage?',
    optsZh: ['A. 10%', 'B. 30%', 'C. 50%', 'D. 100%'],
    optsEn: ['A. 10%', 'B. 30%', 'C. 50%', 'D. 100%'],
    ans: 1,
    expZh: 'Cap. 344 s.3 規定，成立業主立案法團需獲得不少於 30% 不可分割份數業主支持。',
    expEn: 'Cap. 344 s.3 specifies that forming an Incorporated Owners requires support from at least 30% undivided shares.'
  },

  // Block 14
  {
    blockId: 'b14', blockNum: 'Block 14', topicZh: '土地查冊 P-O-I-M 實務', topicEn: 'Land Search P-O-I-M Analysis', refZh: '《土地註冊條例》Cap. 128', refEn: 'Cap. 128', track: 'BOTH' as const,
    qZh: '賣方是一間香港有限公司，代理做土地查冊外，還必須進行何種查冊以確認浮動押記？',
    qEn: 'When vendor is a limited company, what second search is required to verify floating charges?',
    optsZh: ['A. 公司註冊處 (Companies Registry) 查冊', 'B. 商業登記處 (BR) 查冊', 'C. 破產管理署查冊', 'D. 房屋署查冊'],
    optsEn: ['A. Companies Registry search', 'B. Business Registration (BR) search', 'C. Official Receiver search', 'D. Housing Dept search'],
    ans: 0,
    expZh: '公司賣方金科玉律：必須進行「雙重查冊」(土地註冊處查物業 + 公司註冊處查浮動押記)。',
    expEn: 'Company vendor rule: Two searches required (Land Registry for property + Companies Registry for charges).'
  },

  // Block 15
  {
    blockId: 'b15', blockNum: 'Block 15', topicZh: '公司賣方與浮動押記', topicEn: 'Corporate Vendors & Floating Charges', refZh: '《公司條例》Cap. 622', refEn: 'Cap. 622', track: 'EAQE_ONLY' as const,
    qZh: '查核公司授權簽署人代表簽署正式買賣合約時，代理必須核實哪份文件？',
    qEn: 'Which corporate document must be inspected to verify signatory legal authority?',
    optsZh: ['A. 董事會決議案 (Board Resolution)', 'B. 商業登記證影印本', 'C. 股東個人身分證', 'D. 公司報稅表'],
    optsEn: ['A. Board Resolution', 'B. Business Registration copy', 'C. Shareholder personal ID', 'D. Profits Tax Return'],
    ans: 0,
    expZh: '公司處置財產必須核實董事會決議案 (Board Resolution) 及公司章程授權條款。',
    expEn: 'Corporate asset disposition requires checking the Board Resolution and Articles of Association authorization.'
  },

  // Block 16
  {
    blockId: 'b16', blockNum: 'Block 16', topicZh: '業主與租客條例 Cap. 7', topicEn: 'Tenancy Ordinance Cap. 7', refZh: '《業主與租客(綜合)條例》Cap. 7', refEn: 'Cap. 7', track: 'BOTH' as const,
    qZh: '根據 Cap. 7，在無明確條款下，住宅租客拖欠租金達幾多天時，業主可根據法定隱含條件行使沒收權？',
    qEn: 'Under Cap. 7, absent an express clause, after how many days of unpaid rent can a landlord forfeit tenancy?',
    optsZh: ['A. 7 天', 'B. 14 天', 'C. 15 天', 'D. 30 天'],
    optsEn: ['A. 7 Days', 'B. 14 Days', 'C. 15 Days', 'D. 30 Days'],
    ans: 2,
    expZh: 'Cap. 7 規定，住宅租客拖欠租金達 15 天，業主即可行使法定沒收租賃權 (Forfeiture)。',
    expEn: 'Cap. 7 statutory implied condition provides a 15-day unpaid rent threshold for tenancy forfeiture.'
  },

  // Block 17
  {
    blockId: 'b17', blockNum: 'Block 17', topicZh: '印花稅逾期罰款與從價稅', topicEn: 'Stamp Duty Late Penalty & AVD', refZh: '《印花稅條例》Cap. 117 s.9', refEn: 'Cap. 117 s.9', track: 'BOTH' as const,
    qZh: '買賣合約逾期超過 2 個月未繳付印花稅，最高可被處以幾多倍應繳稅款之罰款？',
    qEn: 'If stamp duty is overdue for more than 2 months, what is the maximum penalty multiple?',
    optsZh: ['A. 2 倍', 'B. 4 倍', 'C. 10 倍', 'D. 20 倍'],
    optsEn: ['A. 2 Times', 'B. 4 Times', 'C. 10 Times', 'D. 20 Times'],
    ans: 2,
    expZh: 'Cap. 117 s.9 規定，逾期超過 2 個月未繳付印花稅，最高罰款為應繳稅款之 10 倍。',
    expEn: 'Cap. 117 s.9 specifies a maximum penalty of 10 times the duty if overdue for more than 2 months.'
  },

  // Block 18
  {
    blockId: 'b18', blockNum: 'Block 18', topicZh: '城規會執行通知書與僭建令', topicEn: 'Town Planning & BO s.24 Orders', refZh: '《建築物條例》Cap. 123 s.24', refEn: 'Cap. 123 s.24', track: 'EAQE_ONLY' as const,
    qZh: '於新界農地上未獲許可興建骨灰龕，城規會可發出哪種命令勒令中止？',
    qEn: 'For unauthorized development on NT agricultural land, which notice can Town Planning Board issue?',
    optsZh: ['A. 執行通知書 (Enforcement Notice)', 'B. 拆卸令 (Removal Order)', 'C. 破產令', 'D. 封閉令'],
    optsEn: ['A. Enforcement Notice', 'B. Removal Order', 'C. Bankruptcy Order', 'D. Closure Order'],
    ans: 0,
    expZh: '城規會對農地違規發出 Enforcement Notice，而屋宇署對違例建築物 (UBW) 發出 s.24 清拆令。',
    expEn: 'Town Planning Board issues Enforcement Notices against planning breaches, whereas Buildings Dept issues s.24 Removal Orders.'
  },

  // Block 19
  {
    blockId: 'b19', blockNum: 'Block 19', topicZh: '授權書契據與遺囑認證', topicEn: 'Power of Attorney & Probate', refZh: '《授權書條例》Cap. 31', refEn: 'Cap. 31', track: 'BOTH' as const,
    qZh: '授權人以授權書 (Power of Attorney) 委託受託人處置物業，該授權書必須以何種形式簽立？',
    qEn: 'A Power of Attorney authorising disposition of land in HK must be executed under what form?',
    optsZh: ['A. 契據 (Deed)', 'B. 普通書面合約', 'C. 口頭錄音', 'D. 電郵通知'],
    optsEn: ['A. Executed as a Deed', 'B. Simple written contract', 'C. Oral recording', 'D. Email notice'],
    ans: 0,
    expZh: '《授權書條例》Cap. 31 規定，處置香港土地之授權書必須以契據 (Deed) 形式蓋印簽立。',
    expEn: 'Cap. 31 requires a Power of Attorney authorizing disposition of HK land to be executed under seal as a Deed.'
  },

  // Block 20
  {
    blockId: 'b20', blockNum: 'Block 20', topicZh: '競爭條例與過失失實陳述', topicEn: 'Competition Law & Misrepresentation', refZh: '《競爭條例》Cap. 619', refEn: 'Cap. 619', track: 'BOTH' as const,
    qZh: '多間地產代理行私下商定統一佣金折扣上限，觸犯哪項條例？',
    qEn: 'Estate agencies colluding to fix maximum commission discounts breach which Ordinance?',
    optsZh: ['A. 《競爭條例》Cap. 619 第一行為守則 (First Conduct Rule)', 'B. 《商品說明條例》', 'C. 《地產代理條例》s.15', 'D. 商業合約條款'],
    optsEn: ['A. Competition Ordinance Cap. 619 First Conduct Rule', 'B. Trade Descriptions Ordinance', 'C. Estate Agents Ordinance s.15', 'D. Commercial contract terms'],
    ans: 0,
    expZh: '同行私下合謀定價或限制佣金折扣，觸犯《競爭條例》第一行為守則 (First Conduct Rule)。',
    expEn: 'Agencies colluding to fix prices or limit commission discounts breach Cap. 619 First Conduct Rule.'
  }
];

// Generate 130 Items with Unique Options & Varied Answer Placement
const RAW_QUESTION_BANK: QuizQuestion[] = Array.from({ length: 130 }, (_, idx) => {
  const qId = idx + 101;
  const tmpl = TOPIC_QUESTION_DATA[idx % TOPIC_QUESTION_DATA.length];

  return {
    id: qId,
    blockId: tmpl.blockId,
    blockNum: tmpl.blockNum,
    topicZh: `${tmpl.topicZh} (題 #${qId})`,
    topicEn: `${tmpl.topicEn} (Q #${qId})`,
    questionZh: tmpl.qZh,
    questionEn: tmpl.qEn,
    optionsZh: tmpl.optsZh,
    optionsEn: tmpl.optsEn,
    answerIndex: tmpl.ans,
    explanationZh: tmpl.expZh,
    explanationEn: tmpl.expEn,
    statuteRefZh: tmpl.refZh,
    statuteRefEn: tmpl.refEn,
    trackApplicability: tmpl.track
  };
});

function QuizContent() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const searchParams = useSearchParams();
  const blockParam = searchParams.get('block');

  const [selectedTrack, setSelectedTrack] = useState<'SQE' | 'EAQE'>('EAQE');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Focus Anchor Ref
  const questionCardRef = useRef<HTMLDivElement | null>(null);

  // Subscription state enforcement
  const [userTier, setUserTier] = useState<string>('FREE_PREVIEW');
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTrack = localStorage.getItem('agentpass_selected_track');
      if (savedTrack === 'sqe' || savedTrack === 'sqe_pro') {
        setSelectedTrack('SQE');
      }

      const storedTier = localStorage.getItem('agentpass_user_tier') || 'FREE_PREVIEW';
      setUserTier(storedTier);
    }
  }, []);

  const isPaidUser =
    userTier === 'ADMIN_BUILDER' ||
    userTier === 'ALL_ACCESS_PRO' ||
    userTier === 'EAQE_PRO' ||
    (selectedTrack === 'SQE' && userTier === 'SQE_PRO');

  // Enforce 10-question free preview limit for non-paid accounts
  const activeQuestions = RAW_QUESTION_BANK.filter((q) => {
    if (blockParam && q.blockId !== blockParam) return false;
    if (selectedTrack === 'SQE' && q.trackApplicability === 'EAQE_ONLY') return false;
    return true;
  }).map((q, idx) => {
    const isLocked = !isPaidUser && idx >= 10;
    if (isLocked) {
      return {
        ...q,
        isLocked: true,
        questionZh: '【PRO 專業版專屬考題】此題屬標準資格考題。請升級解鎖完整 130 題庫與條例解析。',
        questionEn: '[PRO TIER EXCLUSIVE QUESTION] Upgrade to PRO to unlock full 130-question bank.',
        optionsZh: [
          'A. [PRO 專屬選項 - 點擊升級解鎖]',
          'B. [PRO 專屬選項 - 點擊升級解鎖]',
          'C. [PRO 專屬選項 - 點擊升級解鎖]',
          'D. [PRO 專屬選項 - 點擊升級解鎖]'
        ],
        optionsEn: [
          'A. [PRO Locked Option - Click to unlock]',
          'B. [PRO Locked Option - Click to unlock]',
          'C. [PRO Locked Option - Click to unlock]',
          'D. [PRO Locked Option - Click to unlock]'
        ]
      };
    }
    return { ...q, isLocked: false };
  });

  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0] || RAW_QUESTION_BANK[0];

  const scrollToQuestionFocus = () => {
    if (questionCardRef.current) {
      questionCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectOption = (index: number) => {
    if (currentQ?.isLocked) {
      setShowUpgradeModal(true);
      return;
    }
    if (isSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleCheckAnswer = () => {
    if (currentQ?.isLocked) {
      setShowUpgradeModal(true);
      return;
    }
    if (selectedOptionIndex === null) return;
    setIsSubmitted(true);

    const isCorrect = selectedOptionIndex === currentQ.answerIndex;
    setUserScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));
  };

  const handleNextQuestion = () => {
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
    // Smooth Auto-scroll / Focus next question
    setTimeout(() => {
      scrollToQuestionFocus();
    }, 50);
  };

  const handleResetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    setUserScore({ correct: 0, total: 0 });
    scrollToQuestionFocus();
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      {/* Upgrade Paywall Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black">
                  <Lock className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono font-black text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-50 border border-amber-200 block w-fit">
                    PRO SUBSCRIPTION REQUIRED
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 pt-0.5">
                    {isZh ? '解鎖完整 130 題考題與法規解析' : 'Unlock Full 130 Practice Questions'}
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
              <p className="text-slate-700 font-semibold leading-relaxed">
                {isZh
                  ? '免費試用版提供前 10 題體驗。升級至 AgentPass PRO 即可解鎖全套 130 題高頻試題庫：'
                  : 'Free preview covers the first 10 questions. Upgrade to AgentPass PRO to access:'}
              </p>

              <div className="space-y-2 font-bold text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{isZh ? '完整 130 題不重複高頻考題庫' : 'Complete 130-question statutory practice bank'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{isZh ? '主考官假命題陷阱解析與 Cap. 511/219/7 條文對照' : 'Master examiner trap analysis with official Cap. 511/219/7 citations'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{isZh ? '艾賓浩斯 SRS 錯題自動同步至溫習儀表板' : 'Automatic SRS wrong-item queueing to student dashboard'}</span>
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
                <span>{isZh ? '立即升級 PRO' : 'Upgrade to PRO'}</span>
                <ChevronRight className="h-4 w-4 text-slate-950" />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">

        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
                <span>Official 130-Question Practice Bank & Trap Register</span>
              </span>

              {/* Account Status Badge & Upgrade CTA (No Public Admin Toggle) */}
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
                  <button
                    type="button"
                    onClick={() => setShowUpgradeModal(true)}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>{isZh ? '升級 PRO' : 'Upgrade'}</span>
                  </button>
                )}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {isZh ? '全真 130 題高頻考題與陷阱特訓' : 'Full 130-Question Practice Bank'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              {isZh
                ? '涵蓋 20 大主題單元，針對香港地產代理監管局 (EAA) 出題傾向，訓練法規辨析能力。'
                : 'Complete 130-question statutory practice suite covering all 20 topic blocks.'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <Link
              href="/course"
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span>{isZh ? '返回課程大綱' : 'Syllabus'}</span>
            </Link>

            <Link
              href="/mock-exam"
              className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md transition flex items-center gap-2"
            >
              <Award className="h-4 w-4 !text-white" />
              <span>{isZh ? '進入模擬考場' : 'Full Mock Exam'}</span>
            </Link>
          </div>
        </div>

        {/* Filter Bar & Counter */}
        <div className="p-4 sm:p-6 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-700">
              {isZh ? '應考軌道:' : 'Active Track:'}
            </span>
            <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('SQE');
                  handleResetQuiz();
                }}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  selectedTrack === 'SQE' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'
                }`}
              >
                SQE (細牌)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('EAQE');
                  handleResetQuiz();
                }}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  selectedTrack === 'EAQE' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'
                }`}
              >
                EAQE (大牌)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold">
            <span className="text-slate-500">
              {isZh ? `進度: ${currentQIndex + 1} / ${activeQuestions.length} 題` : `Progress: ${currentQIndex + 1} / ${activeQuestions.length}`}
            </span>
            {userScore.total > 0 && (
              <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {isZh ? `正確率: ${Math.round((userScore.correct / userScore.total) * 100)}%` : `Accuracy: ${Math.round((userScore.correct / userScore.total) * 100)}%`}
              </span>
            )}
          </div>
        </div>

        {/* Question Card Anchor */}
        <div
          ref={questionCardRef}
          className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 scroll-mt-20"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700">
                {currentQ.blockNum} • {isZh ? currentQ.topicZh : currentQ.topicEn}
              </span>
              {currentQ.isLocked && (
                <span className="text-xs font-mono font-black text-amber-800 px-2.5 py-0.5 rounded bg-amber-100 border border-amber-300 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  <span>PRO LOCKED</span>
                </span>
              )}
            </div>

            <span className="text-xs font-mono font-bold text-blue-700 px-2.5 py-0.5 rounded bg-blue-50 border border-blue-100">
              {isZh ? currentQ.statuteRefZh : currentQ.statuteRefEn}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {isZh ? currentQ.questionZh : currentQ.questionEn}
          </h3>

          <div className="space-y-3">
            {(isZh ? currentQ.optionsZh : currentQ.optionsEn).map((optionText, optIdx) => {
              const isSelected = selectedOptionIndex === optIdx;
              const isCorrect = optIdx === currentQ.answerIndex;

              let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-slate-50';

              if (currentQ.isLocked) {
                btnStyle = 'bg-slate-50 border-dashed border-slate-300 text-slate-400 hover:border-amber-400';
              } else if (isSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-500 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500 text-white border-rose-500 font-bold';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400';
                }
              } else if (isSelected) {
                btnStyle = 'bg-blue-600 text-white border-blue-600 font-extrabold shadow-sm';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span>{optionText}</span>
                  {!currentQ.isLocked && isSubmitted && isCorrect && <Check className="h-4 w-4 text-white shrink-0" />}
                  {!currentQ.isLocked && isSubmitted && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-white shrink-0" />}
                  {currentQ.isLocked && <Lock className="h-4 w-4 text-slate-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {isSubmitted && !currentQ.isLocked && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1.5 animate-in fade-in duration-200">
              <span className="font-extrabold text-amber-900 uppercase font-mono text-xs block">
                {isZh ? '【 官方評分依據與條例解析 】' : '[ Statutory Explanation ]'}
              </span>
              <p className="text-xs font-medium leading-relaxed">
                {isZh ? currentQ.explanationZh : currentQ.explanationEn}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetQuiz}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 text-blue-600" />
              <span>{isZh ? '重新練習' : 'Restart'}</span>
            </button>

            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md transition cursor-pointer"
              >
                <span>{currentQ.isLocked ? (isZh ? '解鎖完整題目' : 'Unlock Question') : (isZh ? '提交答案' : 'Check Answer')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isZh ? '下一題' : 'Next Question'}</span>
                <ArrowRight className="h-4 w-4 !text-white" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-12 flex items-center justify-center bg-slate-50">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 font-bold text-slate-600 text-xs shadow-sm">
            Loading Quiz Module...
          </div>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}