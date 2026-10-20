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

const STATUTORY_FRAMEWORK = [
  {
    topicZh: '牌照變更通知 (Cap. 511 s.40)', topicEn: 'Notice of Change of Particulars (Cap. 511 s.40)',
    qZh: '持牌地產代理變更營業地址或經理姓名後，須於幾多天內以書面通知 EAA？',
    qEn: 'Within how many days must a licensed estate agent notify EAA of a business address or manager change?',
    optsZh: ['A. 7 天', 'B. 14 天', 'C. 31 天', 'D. 60 天'], optsEn: ['A. 7 Days', 'B. 14 Days', 'C. 31 Days', 'D. 60 Days'],
    ans: 2, expZh: 'Cap. 511 s.40 規定須於 31 天內以書面通知監管局。', expEn: 'Cap. 511 s.40 mandates written notice within 31 days.',
    refZh: '《地產代理條例》Cap. 511 s.40', refEn: 'Estate Agents Ordinance Cap. 511 s.40'
  },
  {
    topicZh: '客戶存款收據與紀錄 (Cap. 511B)', topicEn: 'Client Money Receipts & Records (Cap. 511B)',
    qZh: '地產代理收取客戶存款後，須於幾多天內發出收據？相關紀錄須保存幾多年？',
    qEn: 'Within how many days must a deposit receipt be issued, and for how long must trust records be kept?',
    optsZh: ['A. 7 天發收據，保存 1 年', 'B. 14 天發收據，保存 3 年', 'C. 21 天發收據，保存 5 年', 'D. 30 天發收據，保存 7 年'],
    optsEn: ['A. 7 days receipt, 1 year retention', 'B. 14 days receipt, 3 years retention', 'C. 21 days receipt, 5 years retention', 'D. 30 days receipt, 7 years retention'],
    ans: 1, expZh: '存款收據須於 14 天內開具，紀錄保存至少 3 年。', expEn: 'Deposit receipt issued within 14 days; records kept for 3 years.',
    refZh: '《地產代理(客戶款項)規例》Cap. 511B', refEn: 'Estate Agents (Client Money) Rules Cap. 511B'
  },
  {
    topicZh: '二手住宅物業資料單 (Form 1)', topicEn: 'Property Information Form (Form 1)',
    qZh: '代理在向二手住宅物業買家推介單位前，必須向買家提供並解釋哪一份法定表格？',
    qEn: 'Which prescribed form must an agent provide and explain to a prospective buyer before property introduction?',
    optsZh: ['A. 表格一 (Form 1)', 'B. 表格三 (Form 3)', 'C. 表格四 (Form 4)', 'D. 表格六 (Form 6)'],
    optsEn: ['A. Form 1', 'B. Form 3', 'C. Form 4', 'D. Form 6'],
    ans: 0, expZh: '推介二手住宅前必須提供 Form 1 物業資料單。', expEn: 'Form 1 must be supplied prior to introducing a property.',
    refZh: '《地產代理常規規例》Cap. 511A 表格一', refEn: 'Estate Agents Practice Regulations Form 1'
  },
  {
    topicZh: '住宅租約沒收權 (Cap. 7)', topicEn: 'Forfeiture for Non-Payment of Rent (Cap. 7)',
    qZh: '住宅租客拖欠租金達幾多天時，業主可根據法定隱含條件行使沒收租賃權？',
    qEn: 'After how many days of unpaid rent can a landlord exercise statutory implied forfeiture?',
    optsZh: ['A. 7 天', 'B. 14 天', 'C. 15 天', 'D. 30 天'], optsEn: ['A. 7 Days', 'B. 14 Days', 'C. 15 Days', 'D. 30 Days'],
    ans: 2, expZh: 'Cap. 7 規定拖欠租金 15 天可觸發沒收租賃權。', expEn: 'Cap. 7 provides a statutory implied forfeiture after 15 days.',
    refZh: '《業主與租客(綜合)條例》Cap. 7', refEn: 'Landlord and Tenant Ordinance Cap. 7'
  },
  {
    topicZh: '劏房規管租賃續租 (Cap. 7 Part IVA)', topicEn: 'Subdivided Unit Renewal Cap (Cap. 7 Part IVA)',
    qZh: '劏房規管租賃首期 2 年屆滿後，次期 2 年續租租金加幅上限為何？',
    qEn: 'What is the ceiling cap for rent increase upon renewal of regulated subdivided unit tenancy?',
    optsZh: ['A. 5%', 'B. 10% 或差估署指數（以較低者為準）', 'C. 15%', 'D. 由業主隨意決定'],
    optsEn: ['A. 5%', 'B. 10% or RVD index, whichever is lower', 'C. 15%', 'D. Discretionary'],
    ans: 1, expZh: '續租加幅按差估署指數計算，封頂 10%。', expEn: 'Rent increase capped at RVD index change, maximum 10%.',
    refZh: '《業主與租客(綜合)條例》第 IVA 部', refEn: 'Landlord and Tenant Ordinance Part IVA'
  },
  {
    topicZh: '聯權共有中斷 (Cap. 219)', topicEn: 'Joint Tenancy Severance (Cap. 219)',
    qZh: '甲、乙以「聯權共有」持有一單位，甲將其權益轉讓予丙。乙與丙之持股關係為何？',
    qEn: 'A and B hold as Joint Tenants. A assigns share to C. What is the ownership relationship between B and C?',
    optsZh: ['A. 無效轉讓', 'B. 分權共有 (Tenancy in Common)', 'C. 聯權共有', 'D. 乙獨佔全數業權'],
    optsEn: ['A. Void', 'B. Tenancy in Common', 'C. Joint Tenancy', 'D. B absorbs sole title'],
    ans: 1, expZh: '轉讓聯權共有份額會破壞四同原則，導致中斷 (Severance) 為分權共有。', expEn: 'Conveyance severs joint tenancy into tenancy in common.',
    refZh: '《物業轉易及物業條例》Cap. 219', refEn: 'Conveyancing and Property Ordinance Cap. 219'
  },
  {
    topicZh: '土地註冊優先權 (Cap. 128)', topicEn: 'Land Registration Priority (Cap. 128)',
    qZh: '契約若在簽立後幾多個月內交付土地註冊處註冊，其優先權可追溯至簽立日？',
    qEn: 'If a deed is registered within how many months of execution does priority relate back to execution date?',
    optsZh: ['A. 1 個月', 'B. 2 個月', 'C. 3 個月', 'D. 6 個月'], optsEn: ['A. 1 Month', 'B. 2 Months', 'C. 3 Months', 'D. 6 Months'],
    ans: 0, expZh: '簽立後 1 個月內交付註冊者，優先權回溯至簽立日。', expEn: 'Registration within 1 month relates back to execution date.',
    refZh: '《土地註冊條例》Cap. 128 s.5', refEn: 'Land Registration Ordinance Cap. 128 s.5'
  },
  {
    topicZh: '秘密回佣與防賄條例 (Cap. 201)', topicEn: 'Secret Commissions (Cap. 201 s.9)',
    qZh: '代理未得主事人同意私下收取對家佣金，觸犯哪項刑事罪行？',
    qEn: 'Accepting secret commission from counterparty without principal consent breaches which Ordinance?',
    optsZh: ['A. Cap. 201 第 9 條 (代理人貪污交易罪)', 'B. 盜竊罪條例', 'C. 純屬民事違約', 'D. 罰款 $500'],
    optsEn: ['A. Cap. 201 s.9 Corrupt transactions', 'B. Theft Ordinance', 'C. Civil breach only', 'D. $500 Fine'],
    ans: 0, expZh: '未經授權收取利益屬 Cap. 201 s.9 刑事罪行。', expEn: 'Secret commissions violate Cap. 201 s.9.',
    refZh: '《防止賄賂條例》Cap. 201 s.9', refEn: 'Prevention of Bribery Ordinance Cap. 201 s.9'
  },
  {
    topicZh: '一手樓售樓書與價單 (Cap. 621)', topicEn: 'First-hand Sales Brochure & Price List (Cap. 621)',
    qZh: '發展商開售一手住宅前，售樓書及價單分別須提前幾多天公佈？',
    qEn: 'At least how many days before sale must first-hand sales brochures and price lists be made available?',
    optsZh: ['A. 售樓書 7 天前，價單 3 天前', 'B. 售樓書 14 天前，價單 7 天前', 'C. 售樓書 3 天前，價單 24 小時前', 'D. 售樓書 30 天前，價單 14 天前'],
    optsEn: ['A. Sales brochure 7 days; Price list 3 days', 'B. Sales brochure 14 days; Price list 7 days', 'C. Sales brochure 3 days; Price list 24 hours', 'D. Sales brochure 30 days; Price list 14 days'],
    ans: 0, expZh: '【書 7 價 3】：售樓書至少 7 天前，價單至少 3 天前。', expEn: 'Brochure at least 7 days before; Price list at least 3 days.',
    refZh: '《一手住宅物業銷售條例》Cap. 621', refEn: 'First-hand Residential Properties Ordinance Cap. 621'
  },
  {
    topicZh: '一手樓冷靜期 (Cap. 621 s.53)', topicEn: 'Cooling-off Deposit Forfeiture (Cap. 621 s.53)',
    qZh: '簽署一手樓 PASP 後 5 個工作天內撤回交易，賣方可沒收幾多訂金？',
    qEn: 'If buyer withdraws within 5 working days after signing a PASP, how much deposit can be forfeited?',
    optsZh: ['A. 沒收全數 10%', 'B. 沒收 5% 臨時訂金，賣方無權追討進一步賠償', 'C. 全數退還', 'D. 沒收 2.5%'],
    optsEn: ['A. Forfeit full 10%', 'B. Forfeit 5% preliminary deposit with no further claims', 'C. Full refund', 'D. Forfeit 2.5%'],
    ans: 1, expZh: '5 個工作天內撤回，沒收 5% 臨時訂金且不得追討殘餘損失。', expEn: '5% preliminary deposit forfeited with no further liability.',
    refZh: '《一手住宅物業銷售條例》Cap. 621 s.53', refEn: 'First-hand Residential Properties Ordinance Cap. 621 s.53'
  },
  {
    topicZh: '雙重代理與披露 (Cap. 511A)', topicEn: 'Dual Agency & Disclosure (Cap. 511A)',
    qZh: '地產代理同時代表買賣雙方 (Dual Agency) 時，必須履行何種法定程序？',
    qEn: 'When acting for both buyer and seller in the same transaction, what mandatory procedure must an agent follow?',
    optsZh: ['A. 事前取得雙方書面同意並披露佣金率', 'B. 事後補辦口頭通知', 'C. 無需披露，只須向監管局備案', 'D. 向買方單方面隱瞞代表賣方的事實'],
    optsEn: ['A. Obtain prior written consent from both parties disclosing commission rates', 'B. Subsequent oral notification', 'C. No disclosure required', 'D. Conceal vendor representation from buyer'],
    ans: 0, expZh: 'Cap. 511A 規定雙重代理必須事前取得雙方書面同意並透明披露佣金。', expEn: 'Dual agency requires prior written consent and commission disclosure from both parties.',
    refZh: '《地產代理常規規例》Cap. 511A s.13', refEn: 'Estate Agents Practice Regulations s.13'
  },
  {
    topicZh: '授權書簽立與驗證 (Cap. 31)', topicEn: 'Power of Attorney (Cap. 31)',
    qZh: '授權人以授權書 (Power of Attorney) 委託受託人出售物業，該授權書必須以何種形式簽立？',
    qEn: 'A Power of Attorney authorising disposition of land in HK must be executed under what form?',
    optsZh: ['A. 普通書面合約', 'B. 契據 (Deed)', 'C. 口頭承諾並錄音', 'D. 電子郵件確認'],
    optsEn: ['A. Simple written contract', 'B. Executed as a Deed', 'C. Verbal recording', 'D. Email confirmation'],
    ans: 1, expZh: '處置土地之授權書必須以契據 (Deed) 形式簽立。', expEn: 'Power of attorney disposing land must be executed under seal as a deed.',
    refZh: '《授權書條例》Cap. 31', refEn: 'Powers of Attorney Ordinance Cap. 31'
  },
  {
    topicZh: '大廈公契與業主立案法團 (Cap. 344)', topicEn: 'DMC & Incorporating Owners (Cap. 344)',
    qZh: '根據《大廈管理條例》(Cap. 344)，成立業主立案法團 (IO) 需獲得不少於幾多比例的不可分割份數業主支持？',
    qEn: 'Under Cap. 344, forming an Incorporated Owners requires resolution supported by what share percentage?',
    optsZh: ['A. 10%', 'B. 20%', 'C. 30%', 'D. 50%'],
    optsEn: ['A. 10%', 'B. 20%', 'C. 30%', 'D. 50%'],
    ans: 2, expZh: '成立業主立案法團門檻為不少於 30% 不可分割份數業主決議通過。', expEn: 'Cap. 344 requires at least 30% undivided shares to form an IO.',
    refZh: '《大廈管理條例》Cap. 344 s.3', refEn: 'Building Management Ordinance Cap. 344 s.3'
  },
  {
    topicZh: '競爭條例合謀定價 (Cap. 619)', topicEn: 'Competition Ordinance Anti-Collusion (Cap. 619)',
    qZh: '多間地產代理行私下商定統一佣金折扣上限，觸犯哪項條例？',
    qEn: 'Estate agencies colluding to fix maximum commission discounts breach which Ordinance?',
    optsZh: ['A. 《競爭條例》(Cap. 619) 第一行為守則', 'B. 《商品說明條例》', 'C. 《地產代理條例》第 15 條', 'D. 純屬正常商業協議'],
    optsEn: ['A. Competition Ordinance Cap. 619 First Conduct Rule', 'B. Trade Descriptions Ordinance', 'C. Estate Agents Ordinance s.15', 'D. Normal commercial practice'],
    ans: 0, expZh: '代理同業合謀定價觸犯 Cap. 619 第一行為守則 (First Conduct Rule)。', expEn: 'Price fixing or commission collusions violate Cap. 619 First Conduct Rule.',
    refZh: '《競爭條例》Cap. 619 第一行為守則', refEn: 'Competition Ordinance Cap. 619 First Conduct Rule'
  },
  {
    topicZh: '印花稅逾期罰款 (Cap. 117)', topicEn: 'Stamp Duty Late Penalty (Cap. 117)',
    qZh: '買賣合約逾期超過 2 個月未繳付印花稅，最高可被處以幾多倍應繳稅款之罰款？',
    qEn: 'If stamp duty is overdue for more than 2 months, what is the maximum penalty multiple?',
    optsZh: ['A. 2 倍', 'B. 4 倍', 'C. 10 倍', 'D. 20 倍'],
    optsEn: ['A. 2 Times', 'B. 4 Times', 'C. 10 Times', 'D. 20 Times'],
    ans: 2, expZh: '逾期超過 2 個月繳付印花稅，最高罰款為應繳稅款之 10 倍。', expEn: 'Late stamping exceeding 2 months attracts a maximum penalty of 10 times duty.',
    refZh: '《印花稅條例》Cap. 117 s.9', refEn: 'Stamp Duty Ordinance Cap. 117 s.9'
  },
  {
    topicZh: '城市規劃條例違例發展 (Cap. 131)', topicEn: 'Town Planning Unauthorized Development (Cap. 131)',
    qZh: '於新界農地上未獲許可興建骨灰龕或貨櫃場，城規會可發出哪種法定命令？',
    qEn: 'For unauthorized development on NT agricultural land, which notice can the Town Planning Board issue?',
    optsZh: ['A. 執行通知書 (Enforcement Notice)', 'B. 拆卸令', 'C. 查封令', 'D. 破產令'],
    optsEn: ['A. Enforcement Notice', 'B. Demolition Order', 'C. Closure Order', 'D. Bankruptcy Order'],
    ans: 0, expZh: '規劃監督可根據 Cap. 131 發出 Enforcement Notice 勒令中止違例發展。', expEn: 'Planning Authority issues Enforcement Notices under Cap. 131.',
    refZh: '《城市規劃條例》Cap. 131 s.23', refEn: 'Town Planning Ordinance Cap. 131 s.23'
  },
  {
    topicZh: '放盤協議有效期限 (Form 3)', topicEn: 'Form 3 Validity Period (Form 3)',
    qZh: '業主簽署 Form 3 出售放盤協議時，若未填寫有效期限，該協議有何法律效力？',
    qEn: 'If the validity period is omitted when signing Form 3 for sale, what is the legal status?',
    optsZh: ['A. 協議無效', 'B. 自動以 3 個月為上限', 'C. 永久有效', 'D. 以 1 年為上限'],
    optsEn: ['A. Agreement is invalid / void', 'B. Deemed 3 months maximum', 'C. Perpetual validity', 'D. Deemed 1 year'],
    ans: 0, expZh: '未列明有效期的地產代理協議無效。', expEn: 'Omission of a specified validity period renders the agreement invalid.',
    refZh: '《地產代理常規規例》Cap. 511A s.6', refEn: 'Practice Regulations Cap. 511A s.6'
  },
  {
    topicZh: '賣方提供良好業權責任 (Cap. 219 s.13)', topicEn: 'Vendor Duty to Give Good Title (Cap. 219 s.13)',
    qZh: '賣方必須提供多久歷史之業權契據 (Title Deeds) 方足夠證明良好業權？',
    qEn: 'A vendor must produce title deeds spanning at least how many years to show good title under Cap. 219 s.13?',
    optsZh: ['A. 7 年', 'B. 15 年', 'C. 20 年', 'D. 30 年'],
    optsEn: ['A. 7 Years', 'B. 15 Years', 'C. 20 Years', 'D. 30 Years'],
    ans: 1, expZh: 'Cap. 219 s.13 規定賣方須查冊並提供至少 15 年業權契據。', expEn: 'Cap. 219 s.13 requires production of title root deeds spanning at least 15 years.',
    refZh: '《物業轉易及物業條例》Cap. 219 s.13', refEn: 'Conveyancing and Property Ordinance s.13'
  },
  {
    topicZh: '失實陳述與過失 (Misrepresentation)', topicEn: 'Misrepresentation Liability',
    qZh: '代理向買家宣稱單位附連合法天台，事後證實天台屬公用部分。代理應負何種法律責任？',
    qEn: 'An agent wrongly tells a buyer a rooftop is legal title when it is common area. What is the agent’s legal liability?',
    optsZh: ['A. 過失失實陳述 (Negligent Misrepresentation) 損害賠償責任', 'B. 無須負責', 'C. 僅由業主承擔', 'D. 買方自行承受'],
    optsEn: ['A. Liability for Negligent Misrepresentation damages', 'B. No liability', 'C. Sole vendor liability', 'D. Caveat emptor'],
    ans: 0, expZh: '代理未經核實作出錯誤陳述須負過失失實陳述賠償責任。', expEn: 'Agents are liable for damages under negligent misrepresentation for unverified facts.',
    refZh: '《失實陳述條例》Cap. 284', refEn: 'Misrepresentation Ordinance Cap. 284'
  },
  {
    topicZh: '地產代理操守守則 (EAA Code of Ethics)', topicEn: 'EAA Code of Ethics Compliance',
    qZh: '根據 EAA 操守守則，代理在處理物業交易時，應避免採取何種不正當手段？',
    qEn: 'Under the EAA Code of Ethics, which practice is strictly prohibited during property negotiations?',
    optsZh: ['A. 故意隱瞞重要事實或製造虛假形勢以催迫簽約', 'B. 向買方提供土地查冊副本', 'C. 建議訂金由律師樓託管', 'D. 提醒買方視察物業'],
    optsEn: ['A. Deliberately misrepresenting facts or creating false urgency to force signing', 'B. Supplying land search copies', 'C. Advising deposit stakeholding', 'D. Inspecting premises'],
    ans: 0, expZh: '操守守則禁止代理誤導、隱瞞重大事實或逼使任何人士簽署合約。', expEn: 'The Code of Ethics explicitly forbids misleading practices or pressure tactics.',
    refZh: '地產代理監管局《操守守則》第 3.4 條', refEn: 'EAA Code of Ethics s.3.4'
  }
];

const PART_II_VARIANTS = [
  {
    scenarioId: 'case-1',
    topicZh: '個案一：Smart Mansion 12 樓 B 室 (遺囑認證與清拆命令)',
    topicEn: 'Case 1: Flat B, 12/F, Smart Mansion (Probate & Removal Order)',
    refZh: '《建築物條例》Cap. 123 s.24 & 《遺囑認證條例》',
    refEn: 'Buildings Ordinance s.24 & Probate Ordinance',
    items: [
      ("審視 Smart Mansion 查冊報告負擔欄。代理 Sunny 發現屋宇署第 24 條清拆命令，賣方指示隱瞞。Sunny 最符合法規的做法為何？",
       "Inspecting Smart Mansion Land Search. Sunny finds a s.24 Removal Order. Vendor instructs non-disclosure. What is Sunny's duty?",
       ["A. 遵從賣方指示不予披露", "B. 必須向買方全面披露並於臨約記載", "C. 建議買方自行評估", "D. 私下為賣方拆除僭建"],
       ["A. Comply with vendor", "B. Mandatory disclosure to purchaser in PASP", "C. Advise buyer self-assessment", "D. Privately dismantle UBW"], 1,
       "代理對買方負有盡職審查責任 (Cap. 511A)，必須披露清拆命令。", "Agents bear statutory duty under Cap. 511A to disclose orders."),
      ("溫先生以單獨遺囑執行人身分簽臨約。買方律師要求查閱 Letters of Probate 主要目的為何？",
       "Mr. Wan signs as Sole Executor. Why does buyer's solicitor require Letters of Probate?",
       ["A. 核實溫先生具備處置物業之合法遺產管理權限", "B. 核實死亡證真偽", "C. 檢查遺產扣稅額", "D. 評估印花稅"],
       ["A. Confirm legal authority to dispose estate property", "B. Verify death certificate", "C. Inspect tax deduction", "D. Calculate stamp duty"], 0,
       "遺囑認證書為證明執行人具處置權限之法定文書。", "Letters of Probate establish executor legal assignment capacity."),
      ("代理查冊發現露台存在未入則建築物 (UBW)。臨約特別條款應如何擬定？",
       "Search reveals unauthorized balcony enclosure. How should special conditions be drafted?",
       ["A. 明確列明該 UBW 存在，買方知悉並承擔日後清拆風險", "B. 保證該 UBW 100% 合法", "C. 承諾賣方開工拆除", "D. 不作任何紀錄"],
       ["A. Explicitly state UBW presence, buyer accepts removal risk", "B. Guarantee legality", "C. Vendor promises removal", "D. Omit mention"], 0,
       "應明確記載 UBW 現狀並由買方確認承擔風險。", "State existing UBW status with buyer risk acceptance."),
      ("物業土地查冊有 2018 年恆生銀行按揭。臨約交樓條款應如何訂明？",
       "Search shows a 2018 Hang Seng Bank Legal Charge. How should completion terms be framed?",
       ["A. 賣方須於成交日或之前清還按揭並提供解除押記契 (Reassignment/Release)", "B. 買方承接賣方原有按揭", "C. 訂金直接付予賣方個人", "D. 無需處理舊按揭"],
       ["A. Vendor must discharge legal charge on or before completion", "B. Buyer assumes existing mortgage", "C. Deposit paid to vendor personally", "D. Ignore prior mortgage"], 0,
       "賣方有責任向買方交付無瑕疵良好業權 (Good Title)。", "Vendor is obligated to assign free from encumbrances (Good Title).")
    ]
  },
  {
    scenarioId: 'case-2',
    topicZh: '個案二：中環商業中心 18 樓全層 (公司賣方與浮動押記)',
    topicEn: 'Case 2: 18/F, Central Commercial Tower (Corporate Vendor & Floating Charge)',
    refZh: '《公司條例》Cap. 622 & 《地產代理常規規例》',
    refEn: 'Companies Ordinance Cap. 622 & Practice Regulations',
    items: [
      ("賣方 Apex Profits Limited 屬公司。代理 Ken 僅進行土地查冊，遺漏公司註冊處 (CR) 查冊，有何風險？",
       "Vendor is a corporate entity. Agent Ken omitted Companies Registry search. What risk is exposed?",
       ["A. 遺漏未於土地註冊處登記之浮動押記 (Floating Charge) 及 Negative Pledge 限制", "B. 遺漏差餉紀錄", "C. 遺漏水電費紀錄", "D. 無任何風險"],
       ["A. Omission of unregistered Floating Charge with Negative Pledge", "B. Omission of rates", "C. Omission of utility bills", "D. No risk"], 0,
       "公司賣方於 CR 登記之浮動押記可限制其未得銀行同意出售資產。", "CR registered debentures with negative pledges restrict asset sales."),
      ("商業物業交易中，代理 Ken 建議將 380 萬大訂直接存入賣方公司帳戶，有何潛在隱患？",
       "Ken advises paying HK$3.8M deposit directly to corporate vendor account. What danger exists?",
       ["A. 若公司清盤或負債，買方面臨損失訂金且無法取得業權之極高風險", "B. 買方可獲稅務扣減", "C. 律師樓禁止託管商業訂金", "D. 符合標準對家程序"],
       ["A. Severe risk of deposit loss if vendor liquidates before completion", "B. Tax reduction for buyer", "C. Solicitors prohibited from stakeholding", "D. Standard practice"], 0,
       "有按揭或負擔物業之訂金應由律師樓以保證金 (Stakeholder) 託管。", "Encumbered properties mandate deposit stakeholding by solicitors."),
      ("買方公司要求以授權簽署人 (Authorized Signatory) 代表簽署正式合約，代理應查核哪份文件？",
       "Purchaser company signs via Authorized Signatory. Which corporate document must be inspected?",
       ["A. 董事會決議案 (Board Resolution) 及公司章程 (Articles of Association)", "B. 商業登記證影印本", "C. 報稅表", "D. 股東個人身分證"],
       ["A. Board Resolution and Articles of Association", "B. Business Registration copy", "C. Tax return", "D. Shareholder ID"], 0,
       "須查核 Board Resolution 確認授權人具備代表公司簽署之合法權力。", "Board resolutions verify corporate signing authority."),
      ("商業單位公契載明限作辦公室用途 (Commercial Office)。買方意圖改作零售開診所，代理有何義務？",
       "DMC restricts unit to Commercial Office. Buyer intends retail medical clinic. What is agent duty?",
       ["A. 提醒買方查核 DMC 及大廈公契用途限制，避免違規", "B. 保證開診所完全合法", "C. 慫恿買方先簽約後申請", "D. 隱瞞用途限制"],
       ["A. Advise buyer to check DMC user restrictions and planning permission", "B. Guarantee legal clinic use", "C. Encourage signing first", "D. Conceal restrictions"], 0,
       "代理須提醒買家注意公契 (DMC) 及城規 (Town Planning) 用途限制。", "Agents must caution buyers on DMC user covenants.")
    ]
  }
];

const CLIENT_FALLBACK_QUESTIONS: MockQuestion[] = Array.from({ length: 100 }, (_, idx) => {
  const qId = idx + 1;
  const isPartII = qId > 80;

  if (isPartII) {
    const caseIdx = (qId - 81) % PART_II_VARIANTS.length;
    const c = PART_II_VARIANTS[caseIdx];
    const itemIdx = (Math.floor((qId - 81) / PART_II_VARIANTS.length)) % c.items.length;
    const item = c.items[itemIdx];

    return {
      id: qId,
      part: 'II',
      trackApplicability: 'BOTH',
      caseScenarioId: c.scenarioId,
      topicZh: `${c.topicZh} (題 #${qId})`,
      topicEn: `${c.topicEn} (Q #${qId})`,
      questionZh: `【Part II 個案題 - #${qId}】${item[0]}`,
      questionEn: `[Part II Case Study - #${qId}] ${item[1]}`,
      optionsZh: item[2],
      optionsEn: item[3],
      answerIndex: item[4],
      explanationZh: item[5],
      explanationEn: item[6],
      statuteRefZh: c.refZh,
      statuteRefEn: c.refEn,
      isLocked: false
    };
  }

  const tmpl = STATUTORY_FRAMEWORK[(qId - 1) % STATUTORY_FRAMEWORK.length];
  return {
    id: qId,
    part: 'I',
    trackApplicability: qId % 3 === 0 ? 'EAQE_ONLY' : 'BOTH',
    topicZh: `${tmpl.topicZh}`,
    topicEn: `${tmpl.topicEn}`,
    questionZh: `【Part I 條例題 - #${qId}】${tmpl.qZh}`,
    questionEn: `[Part I MCQ - #${qId}] ${tmpl.qEn}`,
    optionsZh: tmpl.optsZh,
    optionsEn: tmpl.optsEn,
    answerIndex: tmpl.ans,
    explanationZh: tmpl.expZh,
    explanationEn: tmpl.expEn,
    statuteRefZh: tmpl.refZh,
    statuteRefEn: tmpl.refEn,
    isLocked: false
  };
});

export default function MockExamPage() {
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
  const [userTier, setUserTier] = useState<string>('ADMIN_BUILDER');
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [selectedLockedQuestion, setSelectedLockedQuestion] = useState<MockQuestion | null>(null);

  const [showSynthesizerModal, setShowSynthesizerModal] = useState<boolean>(false);
  const [selectedBatchDomain, setSelectedBatchDomain] = useState<ExamDomainBatch>('CAP511');
  const [batchQuestionCount, setBatchQuestionCount] = useState<number>(4);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState<boolean>(false);
  const [synthesizerError, setSynthesizerError] = useState<string | null>(null);

  const [isBackgroundStreaming, setIsBackgroundStreaming] = useState<boolean>(false);
  const [targetExamSize, setTargetExamSize] = useState<number>(100);
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

      let dynamicEmail = localStorage.getItem('agentpass_user_email') || 'imoh.ekarika@savantnex.com';
      let dynamicTier = localStorage.getItem('agentpass_user_tier') || 'ADMIN_BUILDER';

      const headers: Record<string, string> = {
        'x-user-email': dynamicEmail,
        'x-user-tier': dynamicTier
      };

      const res = await fetch(targetUrl.toString(), { headers });

      if (res.ok) {
        const data = await res.json();
        if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestionsList(data.questions);
          setUserTier(data.userTier || 'ADMIN_BUILDER');
        }
      }
    } catch (e) {
      console.warn('Using client fallback seed:', e);
    }
  }, []);

  const handleToggleAdminMode = () => {
    if (typeof window === 'undefined') return;

    if (userTier === 'ADMIN_BUILDER') {
      localStorage.setItem('agentpass_user_email', 'guest@agentpass.hk');
      localStorage.setItem('agentpass_user_tier', 'FREE_PREVIEW');
      setUserTier('FREE_PREVIEW');
    } else {
      localStorage.setItem('agentpass_user_email', 'imoh.ekarika@savantnex.com');
      localStorage.setItem('agentpass_user_tier', 'ADMIN_BUILDER');
      setUserTier('ADMIN_BUILDER');
    }

    setTimeout(() => {
      loadQuestions(track);
    }, 50);
  };

  useEffect(() => {
    loadQuestions(track);
  }, [track, loadQuestions]);

  // --- Task 1.2.1: Spaced Repetition Queue Sync ---
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
                
                {/* Status & 1-Click Pro/Admin Toggle */}
                <button
                  type="button"
                  onClick={handleToggleAdminMode}
                  title="Click to toggle Admin Builder / Free Preview mode for testing"
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition cursor-pointer border ${
                    userTier === 'ADMIN_BUILDER'
                      ? 'bg-purple-50 border-purple-300 text-purple-900 hover:bg-purple-100'
                      : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300'
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{userTier === 'ADMIN_BUILDER' ? 'ADMIN ACCESS (BUILDER)' : 'FREE PREVIEW'}</span>
                  <span className="text-[10px] opacity-60 underline ml-0.5">
                    {userTier === 'ADMIN_BUILDER' ? '(Revoke)' : '(Enable Pro)'}
                  </span>
                </button>

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

            {/* Exam Parameters Overview */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono">{isZh ? '考試時限' : 'Time Allowed'}</span>
                <span className="font-extrabold text-slate-900 text-sm">3 小時 (180 分鐘)</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono">{isZh ? '及格標準' : 'Passing Mark'}</span>
                <span className="font-extrabold text-emerald-700 text-sm">雙部分皆須 60%</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono">{isZh ? '即時就緒' : 'Immediate Questions'}</span>
                <span className="font-extrabold text-slate-900 text-sm">{questionsList.length} 題</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono">{isZh ? '全真模擬目標' : 'Full Sim Target'}</span>
                <span className="font-extrabold text-amber-800 text-sm">
                  {track === 'EAQE' ? '100 題全真卷' : '60 題全真卷'}
                </span>
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
                <span>{isZh ? `進入全真 ${track === 'EAQE' ? '100 題' : '60 題'} 模擬考場` : `Start Full ${track === 'EAQE' ? '100-Q' : '60-Q'} Simulation`}</span>
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
                  {isBackgroundStreaming && (
                    <span className="text-[10px] font-mono font-bold text-indigo-700 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center gap-1 animate-pulse">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span>{questionsList.length}/{targetExamSize} Assembling...</span>
                    </span>
                  )}
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