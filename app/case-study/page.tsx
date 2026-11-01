// app/case-study/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  Award,
  FileText,
  Building2,
  Key,
  Home,
  Scale,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Lock,
  ChevronRight,
  ShieldCheck,
  Search
} from 'lucide-react';

interface CaseStudyQuestion {
  id: number;
  questionZh: string;
  questionEn: string;
  optionsZh: string[];
  optionsEn: string[];
  answerIndex: number;
  explanationZh: string;
  explanationEn: string;
  statuteRefZh: string;
  statuteRefEn: string;
}

interface CaseStudyScenario {
  id: string;
  titleZh: string;
  titleEn: string;
  badgeZh: string;
  badgeEn: string;
  track: 'SQE_EAQE' | 'EAQE_ONLY';
  icon: any;
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
  questions: CaseStudyQuestion[];
}

const CASE_STUDY_SCENARIOS: CaseStudyScenario[] = [
  // 1. Sole Executor & UBW Removal Order
  {
    id: 'case-1',
    titleZh: '遺囑執行人與違建清拆令',
    titleEn: 'Sole Executor & UBW Removal Order',
    badgeZh: '遺產物業 / 屋宇署釘契',
    badgeEn: 'Probate Property / Buildings Dept Order',
    track: 'SQE_EAQE',
    icon: FileText,
    narrativeZh: 'Mr. Wan 作為 Smart Mansion 單位之單獨遺囑執行人，委託 Smart Agency 地產代理 Sunny 以 $8,000,000 出售物業。買家 Polly 經 Sunny 視察單位。Sunny 知悉陽台設有未經批准之違例建築工程 (UBW) 及屋宇署 Cap. 123 s.24 清拆令，但未向 Polly 警示按揭批核風險。',
    narrativeEn: 'Mr. Wan acts as the sole executor for Smart Mansion. Vendor instructed agent Sunny of Smart Agency to market the unit at $8,000,000. Purchaser Polly inspected the flat via Sunny. Sunny was aware of an unauthorized building work (UBW) on the balcony and a Cap. 123 s.24 removal order, but failed to warn Polly regarding potential mortgage restrictions.',
    landSearch: {
      propertyZh: [
        '地段編號：九龍內地段第 8842 號',
        '物業地址：旺角聰明大廈 12 樓 B 室',
        '批約年期：自 1978 年起計 75 年可續期'
      ],
      propertyEn: [
        'Lot No.: Kowloon Inland Lot No. 8842',
        'Address: Flat B, 12/F, Smart Mansion, Mong Kok',
        'Lease Term: 75 years renewable from 1978'
      ],
      ownerZh: [
        '登記業主：溫國強 (單獨遺囑執行人)',
        '代價：遺囑認證註冊 (註冊摘要編號 UB99201)'
      ],
      ownerEn: [
        'Registered Owner: Wan Kwok Keung (Sole Executor)',
        'Consideration: Probate Registration (Memorial No. UB99201)'
      ],
      incumbrancesZh: [
        '1. 法定押記/按揭：滙豐銀行有限公司 (摘要編號 UB44012)',
        '2. 建築物令：屋宇署 s.24 清拆令 (露台違例建築物 UBW)'
      ],
      incumbrancesEn: [
        '1. Legal Charge: HSBC Bank Ltd (Memorial No. UB44012)',
        '2. Building Order: Buildings Dept s.24 Removal Order (UBW on Balcony)'
      ]
    },
    questions: [
      {
        id: 101,
        questionZh: '根據土地查冊 (Annex)，本物業現時之法定登記業主為何人？',
        questionEn: 'According to the Land Search (Annex), who is the current registered owner of the property?',
        optionsZh: [
          'A. Smart Agency Limited',
          'B. Mr. Wan (溫先生) 與已故胞弟以聯名均等持有 (Joint Tenants)',
          'C. Mr. Wan (溫先生) 作為遺囑執行人 (Sole Executor)',
          'D. Sunshine Development Ltd'
        ],
        optionsEn: [
          'A. Smart Agency Limited',
          'B. Mr. Wan as Joint Tenant with his deceased brother',
          'C. Mr. Wan as Sole Executor under Letters of Probate',
          'D. Sunshine Development Ltd'
        ],
        answerIndex: 2,
        explanationZh: '✓ 根據查冊 Owner Particulars 欄位，原業主去世後已辦理遺囑認證，現由 Mr. Wan 以遺囑執行人身分登記。',
        explanationEn: '✓ Under Owner Particulars, probate has been registered following the co-owner’s death, making Mr. Wan the sole executor.',
        statuteRefZh: '土地查冊附件 - 業主紀錄欄',
        statuteRefEn: 'Land Search Annex - Owner Section'
      },
      {
        id: 102,
        questionZh: '查冊 Incumbrances 欄顯示屋宇署 s.24 清拆令，代理應如何向買方履行披露責任？',
        questionEn: 'The Incumbrances section shows a Buildings Dept s.24 removal order. How must the agent disclose this to buyer Polly?',
        optionsZh: [
          'A. 無需披露，因清拆違建屬業主與屋宇署之間的事宜',
          'B. 必須在物業資料表格清楚註明，並警告買方該清拆令可能影響銀行按揭批核',
          'C. 只要買方簽署「按現狀 (As-is)」條款即免除代理責任',
          'D. 口頭通知買方即可，無需提供土地查冊副本'
        ],
        optionsEn: [
          'A. No disclosure required as UBW is between landlord and Buildings Dept',
          'B. Must state clearly in property information form and warn buyer that it may jeopardize mortgage approval',
          'C. Signing an "As-is" clause automatically absolves agent liability',
          'D. Verbal notice is sufficient without delivering land search copy'
        ],
        answerIndex: 1,
        explanationZh: '✓ 代理必須進行盡職審查 (Due Diligence)，於表格中披露現存命令並警示買方銀行按揭風險。',
        explanationEn: '✓ Agents must exercise due diligence, record subsisting orders, and advise buyers on mortgage risks.',
        statuteRefZh: '《屋宇條例》第 123 章 24 條與《操守守則》',
        statuteRefEn: 'Cap. 123 s.24 & Practice Regulation'
      }
    ]
  },

  // 2. Company Vendor (Two Searches)
  {
    id: 'case-2',
    titleZh: '有限公司賣家與雙重查冊法則',
    titleEn: 'Company Vendor & Two-Search Rule',
    badgeZh: '公司業主 / 浮動押記',
    badgeEn: 'Corporate Vendor / Floating Charge',
    track: 'EAQE_ONLY',
    icon: Building2,
    narrativeZh: '賣方為「Apex Profits Limited」，委託代理 Ken 出售商業單位。土地查冊顯示物業登記於 Apex Profits 名下且無押記。代理 Ken 僅提供了土地查冊副本，未進行公司註冊處 (Companies Registry) 查冊。買方簽約後發現該公司已向另一財務公司發行包含浮動押記 (Floating Charge) 的債權證。',
    narrativeEn: 'Vendor is "Apex Profits Limited", instructing agent Ken to sell a commercial unit. Land search shows property registered under Apex Profits with no incumbrances. Ken supplied only the Land Registry search without conducting a Companies Registry charge search. Buyer later discovered an active Floating Charge debenture filed at Companies Registry.',
    landSearch: {
      propertyZh: [
        '地段編號：海旁地段第 102 號',
        '物業地址：中環商業大廈 20 樓 01 室',
        '批約年期：999 年 (自 1865 年起算)'
      ],
      propertyEn: [
        'Lot No.: Marine Lot No. 102',
        'Address: Suite 01, 20/F, Central Commercial Tower',
        'Lease Term: 999 years from 1865'
      ],
      ownerZh: [
        '登記業主：Apex Profits Limited',
        '代價：$38,000,000 (摘要編號 UB88102)'
      ],
      ownerEn: [
        'Registered Owner: Apex Profits Limited',
        'Consideration: $38,000,000 (Memorial No. UB88102)'
      ],
      incumbrancesZh: [
        '【土地註冊處無登記浮動押記】(無紀錄)'
      ],
      incumbrancesEn: [
        '[No Floating Charge registered at Land Registry]'
      ]
    },
    questions: [
      {
        id: 201,
        questionZh: '當賣方為有限公司時，地產代理除了進行土地查冊外，法定金科玉律還必須進行甚麼查冊？',
        questionEn: 'When the vendor is a limited company, what second search MUST the agent conduct in addition to a Land Search?',
        optionsZh: [
          'A. 商業登記處 (BR) 查冊',
          'B. 公司註冊處 (Companies Registry) 公司押記查冊',
          'C. 破產管理署查冊',
          'D. 破產及高等法院查冊'
        ],
        optionsEn: [
          'A. Business Registration (BR) Search',
          'B. Companies Registry Search for Corporate Charges/Debentures',
          'C. Official Receiver Bankruptcy Search',
          'D. High Court Writ Search'
        ],
        answerIndex: 1,
        explanationZh: '✓ 根據《公司條例》(Cap. 622)，公司浮動押記或公司押記可能僅登記於公司註冊處，土地查冊無法顯示，因此必須進行「雙重查冊」(Two Searches)。',
        explanationEn: '✓ Under Cap. 622, corporate floating charges may only be registered at Companies Registry and omitted from Land Registry. Two Searches are mandatory.',
        statuteRefZh: '《公司條例》Cap. 622 與 EAA 操守指引',
        statuteRefEn: 'Companies Ordinance Cap. 622 & EAA Guidelines'
      },
      {
        id: 202,
        questionZh: '若代理僅向買家提供土地查冊而疏忽未做公司註冊處查冊，代理需承擔何種法律責任？',
        questionEn: 'If an agent fails to conduct a Companies Registry search for a corporate vendor, what liability does the agent face?',
        optionsZh: [
          'A. 無需負責，因土地註冊處已足夠',
          'B. 構成疏忽 (Negligence) 及違反《操守規約》，可能面臨紀律處分及民事索償',
          'C. 買方只能向政府索償',
          'D. 買方無權取消合約'
        ],
        optionsEn: [
          'A. No liability as Land Search is legally conclusive',
          'B. Constitutes Negligence and breach of Code of Ethics, subject to disciplinary action and civil claims',
          'C. Buyer can only claim against HKSAR Government',
          'D. Buyer has no right to rescind the contract'
        ],
        answerIndex: 1,
        explanationZh: '✓ 未為公司賣家進行公司註冊處查冊屬於嚴重職業疏忽，違背 EAA 盡職審查 (Due Diligence) 要求。',
        explanationEn: '✓ Omission of Companies Registry search for corporate vendors constitutes severe negligence and breach of EAA due diligence rules.',
        statuteRefZh: '地產代理條例 Cap. 511 s.36',
        statuteRefEn: 'Estate Agents Ordinance Cap. 511 s.36'
      }
    ]
  },

  // 3. Power of Attorney Verification
  {
    id: 'case-3',
    titleZh: '授權書 (Power of Attorney) 交易驗證',
    titleEn: 'Power of Attorney Verification',
    badgeZh: '授權書 / 撤銷風險',
    badgeEn: 'Power of Attorney / Revocation Risk',
    track: 'SQE_EAQE',
    icon: Key,
    narrativeZh: '賣方業主移民海外，授權其表弟 David 以授權書 (POA) 代表簽署臨約。查冊顯示該授權書於 18 個月前於土地註冊處註冊。代理 May 安排買方簽署合約並將訂金抬頭直接開給受托人 David。',
    narrativeEn: 'Vendor emigrated overseas and granted a Power of Attorney (POA) to cousin David. Land search shows POA registered 18 months ago. Agent May arranged buyer to sign PASP and issue deposit cheque made payable directly to attorney David.',
    landSearch: {
      propertyZh: [
        '地段編號：沙田市地段第 301 號',
        '物業地址：沙田第一城 8 座 15 樓 A 室',
        '批約年期：自 1898 年起計 99 年加續期 50 年'
      ],
      propertyEn: [
        'Lot No.: Sha Tin Town Lot No. 301',
        'Address: Flat A, 15/F, City One Sha Tin',
        'Lease Term: 99 years from 1898 + 50 yrs renewal'
      ],
      ownerZh: [
        '登記業主：陳大文 (Chan Tai Man)',
        '業權負擔欄：授權書 (Power of Attorney) 給予 David (摘要 UB66100，日期 18 個月前)'
      ],
      ownerEn: [
        'Registered Owner: Chan Tai Man',
        'Incumbrances: Power of Attorney in favour of David (Mem UB66100, dated 18 mos ago)'
      ],
      incumbrancesZh: [
        '1. 授權書 (Power of Attorney) - 摘要編號 UB66100',
        '2. 按揭：中國銀行 (香港) 有限公司'
      ],
      incumbrancesEn: [
        '1. Power of Attorney - Memorial No. UB66100',
        '2. Mortgage: Bank of China (Hong Kong) Ltd'
      ]
    },
    questions: [
      {
        id: 301,
        questionZh: '面對註冊超過 12 個月之授權書 (POA)，代理在簽署臨約前必須採取甚麼程序？',
        questionEn: 'When encountering a Power of Attorney (POA) registered over 12 months ago, what procedure must the agent complete before PASP signing?',
        optionsZh: [
          'A. 無需任何額外程序，只要查冊有紀錄即可',
          'B. 必須取得授權人 (業主) 未撤銷該授權書之法定聲明 (Statutory Declaration) 或直接確認',
          'C. 要求受託人提供身份證副本即可',
          'D. 將訂金直接交予受託人即可'
        ],
        optionsEn: [
          'A. No extra steps needed as long as POA is registered',
          'B. Obtain confirmation/Statutory Declaration that POA has not been revoked by the donor',
          'C. Obtain attorney HKID copy only',
          'D. Pay deposit directly to attorney'
        ],
        answerIndex: 1,
        explanationZh: '✓ 根據《授權書條例》(Cap. 31)，超過 12 個月之授權書必須確認授權人未撤銷授權或去世/破產。',
        explanationEn: '✓ Under Powers of Attorney Ordinance (Cap. 31), POAs older than 12 months require confirmation of non-revocation.',
        statuteRefZh: '《授權書條例》Cap. 31 s.5',
        statuteRefEn: 'Powers of Attorney Ordinance Cap. 31 s.5'
      },
      {
        id: 302,
        questionZh: '交易訂金支票之抬頭，代理應建議買方如何開立？',
        questionEn: 'How should the agent instruct the buyer to make out the deposit cheque?',
        optionsZh: [
          'A. 抬頭開給受託人 David 個人帳戶',
          'B. 抬頭開給業主 (Chan Tai Man) 個人帳戶或賣方律師樓託管 (as stakeholder)',
          'C. 抬頭開給地產代理公司個人戶口',
          'D. 以現金直接支付給 David'
        ],
        optionsEn: [
          'A. Payable directly to attorney David personal account',
          'B. Payable to Vendor (Chan Tai Man) or Vendor’s Solicitor as stakeholder',
          'C. Payable to agent personal bank account',
          'D. Pay cash directly to David'
        ],
        answerIndex: 1,
        explanationZh: '✓ 除非授權書明確授予代收訂金權力，否則訂金支票必須開給業主本人或賣方律師樓託管 (Stakeholder)。',
        explanationEn: '✓ Deposit cheques must be issued in the name of the Vendor or Vendor Solicitor as stakeholder, unless POA explicitly authorizes receipt.',
        statuteRefZh: '地產代理操守指引 - 訂金託管規範',
        statuteRefEn: 'EAA Code of Ethics - Stakeholder Deposit Rules'
      }
    ]
  },

  // 4. Sub-divided Unit & Part IVA
  {
    id: 'case-4',
    titleZh: '劏房租務管制與 Form CR109 申報',
    titleEn: 'Sub-divided Unit Rent Control & Form CR109',
    badgeZh: '劏房管制 / Cap. 7 Part IVA',
    badgeEn: 'Part IVA Tenancy / RVD CR109 Notice',
    track: 'SQE_EAQE',
    icon: Home,
    narrativeZh: '業主張先生將深水埗住宅單位改建為 3 個劏房 (Sub-divided Units)。租客 Lee 擬承租其中 1 個劏房。代理 Tim 協助擬定租約，但未提醒業主提交差餉物業估價署 Form CR109，亦未說明 Cap. 7 Part IVA 規定的「2+2」四年租務保障期。',
    narrativeEn: 'Landlord Mr. Cheung partitioned a Sham Shui Po residential flat into 3 sub-divided units. Tenant Lee intends to lease 1 unit. Agent Tim prepared the tenancy agreement but failed to remind landlord to submit Form CR109 to RVD within 1 month and omitted explaining the 2+2 (4-year) tenure protection under Cap. 7 Part IVA.',
    landSearch: {
      propertyZh: [
        '地段編號：新九龍內地段第 1102 號',
        '物業地址：深水埗福榮街 88 號 3 樓 A 室 (劏房 1)',
        '批約年期：75 年可續期'
      ],
      propertyEn: [
        'Lot No.: New Kowloon Inland Lot No. 1102',
        'Address: Flat A, 3/F, 88 Fuk Wing St (Unit 1)',
        'Lease Term: 75 years renewable'
      ],
      ownerZh: [
        '登記業主：張大明 (Cheung Tai Ming)',
        '代價：$4,200,000 (摘要編號 UB50201)'
      ],
      ownerEn: [
        'Registered Owner: Cheung Tai Ming',
        'Consideration: $4,200,000 (Memorial No. UB50201)'
      ],
      incumbrancesZh: [
        '【無按揭 / 無屋宇署令】'
      ],
      incumbrancesEn: [
        '[No Mortgages / No Building Orders]'
      ]
    },
    questions: [
      {
        id: 401,
        questionZh: '根據《業主與租客 (綜合) 條例》第 IVA 部 (Part IVA)，劏房租客享有何種法定租期保障？',
        questionEn: 'Under Cap. 7 Part IVA for sub-divided units, what statutory security of tenure is granted to tenants?',
        optionsZh: [
          'A. 僅有 1 年固定租期，無續租權',
          'B. 首期租賃 2 年 + 次期租賃 2 年 (共 4 年租務保障期 "2+2")',
          'C. 永久自動續期權',
          'D. 業主可隨時給予 7 天通知期解約'
        ],
        optionsEn: [
          'A. 1 year fixed term with no renewal right',
          'B. 2-year first term + 2-year second term (4-year "2+2" security of tenure)',
          'C. Perpetual automatic renewal',
          'D. Landlord can terminate anytime on 7 days notice'
        ],
        answerIndex: 1,
        explanationZh: '✓ Cap. 7 Part IVA 規定規管租賃租客享有 4 年 (2+2) 租務保障期，且次期租務續租加幅設有上限 (最高 10%)。',
        explanationEn: '✓ Cap. 7 Part IVA provides a 4-year (2+2) tenure protection for regulated tenancies with rent increase capped at 10% for the second term.',
        statuteRefZh: '《業主與租客 (綜合) 條例》第 IVA 部',
        statuteRefEn: 'Landlord & Tenant Ordinance Cap. 7 Part IVA'
      },
      {
        id: 402,
        questionZh: '住宅租約簽署後，業主必須於多久內向差餉物業估價署 (RVD) 提交 Form CR109？',
        questionEn: 'Within what period after signing a domestic lease must the landlord submit Form CR109 to RVD?',
        optionsZh: [
          'A. 7 天內',
          'B. 1 個月內 (Within 1 Month)',
          'C. 3 個月內',
          'D. 租約期滿時'
        ],
        optionsEn: [
          'A. Within 7 days',
          'B. Within 1 Month',
          'C. Within 3 months',
          'D. Upon lease expiry'
        ],
        answerIndex: 1,
        explanationZh: '✓ 住宅物業新租或續租均須於 1 個月內向差餉物業估價署提交 Form CR109。未按時提交將無法在法庭行使收樓追租權利。',
        explanationEn: '✓ Form CR109 must be submitted to RVD within 1 month. Failure to file bars enforcing rent recovery in court.',
        statuteRefZh: 'Cap. 7 Part IV & Form CR109 規定',
        statuteRefEn: 'Cap. 7 Part IV & Form CR109 Rules'
      }
    ]
  },

  // 5. Charging Orders & Judgment Debts
  {
    id: 'case-5',
    titleZh: '法庭押記令與破產清盤呈請',
    titleEn: 'Charging Order Nisi vs Absolute & Winding-Up',
    badgeZh: '高等法院判令 / 釘契查冊',
    badgeEn: 'High Court Judgments / Incumbrances',
    track: 'EAQE_ONLY',
    icon: Scale,
    narrativeZh: '賣方持有灣仔商住物業。土地查冊 Incumbrances 欄出現兩筆法庭文書：一筆為高等法院發出之「Charging Order Nisi」（暫准押記令），另一筆為債權人入稟之「Winding-Up Petition」（清盤呈請）。買家有意購入，代理告知買家「只要成交前還清款項，押記 Nisi 便不算正式釘契」。',
    narrativeEn: 'Vendor owns a Wan Chai commercial-residential property. Land search Incumbrances shows two court entries: a High Court "Charging Order Nisi" and a creditor "Winding-Up Petition". Buyer is eager to purchase. Agent advised buyer that "as long as debt is paid before completion, Order Nisi is not a formal encumbrance".',
    landSearch: {
      propertyZh: [
        '地段編號：內地段第 3400 號',
        '物業地址：灣仔告士打道 168 號 海星大廈 18 樓 A 室',
        '批約年期：99 年可續期'
      ],
      propertyEn: [
        'Lot No.: Inland Lot No. 3400',
        'Address: Flat A, 18/F, Star Ocean Building, Wan Chai',
        'Lease Term: 99 years renewable'
      ],
      ownerZh: [
        '登記業主：Glorious Star Holdings Limited',
        '代價：$22,000,000 (摘要編號 UB77011)'
      ],
      ownerEn: [
        'Registered Owner: Glorious Star Holdings Limited',
        'Consideration: $22,000,000 (Memorial No. UB77011)'
      ],
      incumbrancesZh: [
        '1. 暫准押記令：高等法院訴訟第 2024/991 號 (Charging Order Nisi)',
        '2. 清盤呈請：香港高等法院呈請書 (Winding-Up Petition No. 2024/11)'
      ],
      incumbrancesEn: [
        '1. Charging Order Nisi: High Court Action No. 2024/991',
        '2. Winding-Up Petition: High Court Companies Winding-Up No. 2024/11'
      ]
    },
    questions: [
      {
        id: 501,
        questionZh: '若公司已被呈請清盤（Winding-up Petition 已登記），在此之後簽立之物業轉讓合約法律效力為何？',
        questionEn: 'If a winding-up petition has been presented against the vendor company, what is the legal effect of property dispositions made thereafter?',
        optionsZh: [
          'A. 只要買方不知情即完全有效',
          'B. 除非獲法院認可令 (Validation Order)，否則在法律上一律無效 (Void)',
          'C. 自動由破產管理官代為完成交易',
          'D. 買方可直接沒收物業訂金'
        ],
        optionsEn: [
          'A. Completely valid as long as buyer had no actual notice',
          'B. Wholly void by law unless validated by court order (Validation Order)',
          'C. Automatically completed by the Official Receiver',
          'D. Buyer may forfeit the deposit directly'
        ],
        answerIndex: 1,
        explanationZh: '✓ 依據《公司(清盤及雜項條文)條例》(Cap. 32) 第 182 條，在清盤呈請開始後對公司財產的任何處置，除非獲法院命令認可，否則一律無效。',
        explanationEn: '✓ Under s.182 of Cap. 32, any disposition of company property made after the commencement of winding-up is void unless validated by the court.',
        statuteRefZh: '《公司(清盤及雜項條文)條例》Cap. 32 s.182',
        statuteRefEn: 'Companies (Winding Up) Ordinance Cap. 32 s.182'
      },
      {
        id: 502,
        questionZh: '關於「Charging Order Nisi」（暫准押記令），下列哪項敘述完全正確？',
        questionEn: 'Regarding a "Charging Order Nisi", which statement is legally accurate?',
        optionsZh: [
          'A. 代表物業已可直接由執達主任安排拍賣',
          'B. 屬法庭發出的臨時押記，於聆訊確認為 Charging Order Absolute 前，債務人仍可清償或抗辯',
          'C. 該押記不屬於可註冊之土地負擔',
          'D. 買家可完全忽視該令並要求銀行如常批出按揭'
        ],
        optionsEn: [
          'A. Means the bailiff can auction the property immediately',
          'B. It is a provisional court order; debtor may discharge or contest before Order Absolute',
          'C. It is an unregistrable instrument at the Land Registry',
          'D. Buyer may ignore the order and obtain mortgages without issue'
        ],
        answerIndex: 1,
        explanationZh: '✓ Order Nisi 為暫准押記令，債務人有權在指定聆訊中抗辯或清償欠款；確認後法庭才蓋印為 Charging Order Absolute。',
        explanationEn: '✓ An Order Nisi is provisional. The debtor can contest or settle the judgment debt prior to the court granting a Charging Order Absolute.',
        statuteRefZh: '《高等法院規則》第 50 號命令',
        statuteRefEn: 'Rules of the High Court Order 50'
      }
    ]
  },

  // 6. DMC Breach & Building Management
  {
    id: 'case-6',
    titleZh: '大廈公契 (DMC) 違契加建與欠繳管理費',
    titleEn: 'DMC Breach, Roof Exclusive Possession & Charge',
    badgeZh: '大廈管理條例 / 押記備忘錄',
    badgeEn: 'Cap. 344 / Memorial of Charge',
    track: 'SQE_EAQE',
    icon: Building2,
    narrativeZh: '賣方為北角翠華大廈頂層單位業主，擁有天台之專用使用權 (Exclusive Possession)。賣方於天台建造了一間有冷氣及浴室之玻璃屋。土地查冊顯示：業主立案法團依 Cap. 344 第 19 條註冊了一項「押記備忘錄」(Memorial of Charge)，原因是原業主拖欠過去 1 年之大維修集資款及管理費共港幣 $120,000。',
    narrativeEn: 'Vendor owns the top-floor flat of Tsui Wah Building with exclusive possession of the roof. Vendor built an air-conditioned glasshouse on the roof. Land search shows: Incorporated Owners registered a Memorial of Charge under Cap. 344 s.19 for unpaid renovation contributions and management fees totaling HK$120,000.',
    landSearch: {
      propertyZh: [
        '地段編號：內地段第 7120 號',
        '物業地址：北角英皇道 450 號 翠華大廈 24 樓頂層及天台',
        '批約年期：75 年可續期'
      ],
      propertyEn: [
        'Lot No.: Inland Lot No. 7120',
        'Address: Flat 24/F and Roof, Tsui Wah Building, North Point',
        'Lease Term: 75 years renewable'
      ],
      ownerZh: [
        '登記業主：李志明 (Lee Chi Ming)',
        '代價：$11,500,000 (摘要編號 UB61022)'
      ],
      ownerEn: [
        'Registered Owner: Lee Chi Ming',
        'Consideration: $11,500,000 (Memorial No. UB61022)'
      ],
      incumbrancesZh: [
        '1. 押記備忘錄：翠華大廈業主立案法團 (摘要編號 UB99881 - 欠繳管理費及維修費)',
        '2. 按揭：恒生銀行有限公司'
      ],
      incumbrancesEn: [
        '1. Memorial of Charge: The Incorporated Owners of Tsui Wah Building (Mem UB99881)',
        '2. Mortgage: Hang Seng Bank Limited'
      ]
    },
    questions: [
      {
        id: 601,
        questionZh: '頂層業主雖擁有天台之專用權 (Exclusive Possession)，在天台加建玻璃屋之法律地位為何？',
        questionEn: 'Although the top floor owner has exclusive possession of the roof, what is the legal status of building a glasshouse on the roof?',
        optionsZh: [
          'A. 完全合法，因專用權包含永久加建權',
          'B. 構成違反大廈公契 (DMC) 及《建築物條例》之違例建築工程 (UBW)',
          'C. 只要不遮擋走火通道即屬合法',
          'D. 只要向差估署申報即可免拆'
        ],
        optionsEn: [
          'A. Fully lawful as exclusive possession confers unlimited building rights',
          'B. Constitutes a breach of DMC and unauthorized building works (UBW) under Cap. 123',
          'C. Lawful provided fire escape routes are not obstructed',
          'D. Immune from demolition once notified to RVD'
        ],
        answerIndex: 1,
        explanationZh: '✓ 專用使用權受公契及建築物條例雙重約束。未經屋宇署批准加建結構物屬 UBW，法團及屋宇署均可依公契及法例強制拆除。',
        explanationEn: '✓ Exclusive possession is subject to DMC covenants and Cap. 123. Rooftop structures without BD approval are illegal UBWs.',
        statuteRefZh: '《建築物管理條例》Cap. 344 與《建築物條例》Cap. 123',
        statuteRefEn: 'Cap. 344 & Buildings Ordinance Cap. 123'
      },
      {
        id: 602,
        questionZh: '關於法團註冊之「押記備忘錄」(Memorial of Charge)，新買家若成交將面臨甚麼後果？',
        questionEn: 'What is the legal consequence to a purchaser if completing with the registered Memorial of Charge outstanding?',
        optionsZh: [
          'A. 該筆債務自動註銷，法團不能向新買家追討',
          'B. 押記對物業具有約束力，法團有權向法庭申請出售命令拍賣該物業以抵償欠款',
          'C. 只有前業主會被通緝，與物業無關',
          'D. 買家只需繳交一半金額'
        ],
        optionsEn: [
          'A. Debt automatically extinguished; corporation cannot enforce against buyer',
          'B. Charge binds the property; corporation may apply for order for sale to auction the unit',
          'C. Personal remedy only against former owner; flat is unencumbered',
          'D. Purchaser only liable for 50% of the arrears'
        ],
        answerIndex: 1,
        explanationZh: '✓ 依 Cap. 344 第 19 條，押記備忘錄隨土地轉移。若賣方在成交日前未清償並解除註冊，法團可向法庭申請拍賣該物業抵債。',
        explanationEn: '✓ Under Cap. 344 s.19, the charge attaches to the flat. If not discharged, the corporation can seek a court order to sell the property.',
        statuteRefZh: '《建築物管理條例》第 344 章第 19 條',
        statuteRefEn: 'Building Management Ordinance Cap. 344 s.19'
      }
    ]
  },

  // 7. Joint Tenancy Severance & Bankruptcy
  {
    id: 'case-7',
    titleZh: '聯權共有中斷 (Severance) 與破產受託人',
    titleEn: 'Joint Tenancy Severance & Bankruptcy Trustee',
    badgeZh: '長命契中斷 / 分權共有',
    badgeEn: 'Severance / Tenancy in Common',
    track: 'SQE_EAQE',
    icon: FileText,
    narrativeZh: '陳先生與弟弟以聯權共有（Joint Tenancy / 長命契）共同持有荃灣愉景新城住宅。弟弟因生意失敗於 6 個月前被頒布破產令。陳先生其後獨自委託代理出售整套物業，宣稱「長命契物業只要其中一個業主簽約，買家就可順利成交」。',
    narrativeEn: 'Mr. Chan and his brother held a Discovery Park flat as Joint Tenants. Brother was adjudicated bankrupt 6 months ago. Mr. Chan instructed an agent to sell the whole flat, claiming "in joint tenancy, one living brother’s signature is sufficient to pass title".',
    landSearch: {
      propertyZh: [
        '地段編號：荃灣市地段第 350 號',
        '物業地址：荃灣愉景新城 3 座 22 樓 C 室',
        '批約年期：自 1990 年起計至 2047 年'
      ],
      propertyEn: [
        'Lot No.: Tsuen Wan Town Lot No. 350',
        'Address: Flat C, 22/F, Tower 3, Discovery Park, Tsuen Wan',
        'Lease Term: From 1990 until 2047'
      ],
      ownerZh: [
        '登記業主：陳大文 及 陳小武 (以聯權共有方式持有)',
        '代價：$6,800,000 (摘要編號 UB40192)'
      ],
      ownerEn: [
        'Registered Owner: Chan Tai Man & Chan Siu Mo (as Joint Tenants)',
        'Consideration: $6,800,000 (Memorial No. UB40192)'
      ],
      incumbrancesZh: [
        '1. 破產令：香港高等法院破產案第 2024/501 號 (針對陳小武)',
        '2. 按揭：中信銀行 (國際) 有限公司'
      ],
      incumbrancesEn: [
        '1. Bankruptcy Order: High Court Bankruptcy Case No. 2024/501 (re: Chan Siu Mo)',
        '2. Mortgage: China CITIC Bank International Ltd'
      ]
    },
    questions: [
      {
        id: 701,
        questionZh: '當其中一名聯權共有人（Joint Tenant）破產，其共有產權形式產生何種法律轉變？',
        questionEn: 'When one of the Joint Tenants is declared bankrupt, what legal conversion occurs to the co-ownership?',
        optionsZh: [
          'A. 毫無影響，長存權（Survivorship）仍然維持',
          'B. 聯權共有自動中斷（Severance），轉化為分權共有（Tenants in Common），破產者之 50% 份額歸破產受託人',
          'C. 破產人的份額自動贈予健在的共有人',
          'D. 物業由政府即時無償沒收'
        ],
        optionsEn: [
          'A. No change; right of survivorship remains intact',
          'B. Joint tenancy is automatically severed into a tenancy in common; 50% share vests in Trustee',
          'C. Bankrupt share is gifted automatically to the co-owner',
          'D. Property is immediately confiscated by the Government'
        ],
        answerIndex: 1,
        explanationZh: '✓ 破產破壞了四同原則（Four Unities），聯權共有自動被切斷（Severance），破產人之半數份額歸破產管理官／破產受託人處置。',
        explanationEn: '✓ Bankruptcy severs the joint tenancy by operation of law. The bankrupt’s undivided 50% share vests in the Trustee in Bankruptcy.',
        statuteRefZh: '《物業轉易及物業條例》Cap. 219 s.24 及《破產條例》Cap. 6',
        statuteRefEn: 'Cap. 219 s.24 & Bankruptcy Ordinance Cap. 6'
      },
      {
        id: 702,
        questionZh: '陳先生能否獨自簽約將「整套物業」合法出售予買家？',
        questionEn: 'Can Mr. Chan sign alone to validly assign the entire property to a purchaser?',
        optionsZh: [
          'A. 可以，只要合約列明是長命契即可',
          'B. 絕對不能。出售整個物業必須由陳先生及破產受託人（Trustee in Bankruptcy）共同簽署轉讓契',
          'C. 只要買家全數付清現金即可',
          'D. 經地產代理見證簽署即可'
        ],
        optionsEn: [
          'A. Yes, provided contract indicates joint tenancy',
          'B. Absolutely NO. Conveying the whole title requires both Mr. Chan and the Trustee in Bankruptcy to execute',
          'C. Yes, if purchaser pays fully in cash',
          'D. Yes, with estate agent attestation'
        ],
        answerIndex: 1,
        explanationZh: '✓ 陳先生只能獨立處置其個人 50% 不可分割份數。若要出售整套物業，必須取得破產受託人之書面同意並共同簽立契約。',
        explanationEn: '✓ Mr. Chan can only convey his undivided half share. Selling the entire flat requires joinder of the Trustee in Bankruptcy.',
        statuteRefZh: '《物業轉易及物業條例》Cap. 219',
        statuteRefEn: 'Conveyancing and Property Ordinance Cap. 219'
      }
    ]
  },

  // 8. Industrial Lease User Covenants
  {
    id: 'case-8',
    titleZh: '工廈地契用戶條款限制與整幢活化豁免',
    titleEn: 'Industrial Lease User Clause & Revitalization Waiver',
    badgeZh: '工廈違契 / 地政總署收地權',
    badgeEn: 'User Covenants / Lands Dept Re-Entry',
    track: 'EAQE_ONLY',
    icon: AlertTriangle,
    narrativeZh: '賣方持有觀塘開源道工廈 5 樓單位。政府租契（Government Lease）用戶限制載明為「Industrial and/or Godown purposes only」（工業及/或貨倉用途）。賣方將單位分間成多間精緻工作室，租予客戶作音樂教室及精品零售店。代理推介買家購入作商業出租收租，宣稱「工廈活化政策下所有非工業用途都已被政府默認合法」。',
    narrativeEn: 'Vendor owns a 5th floor unit in an industrial building in Kwun Tong. Government lease user clause specifies: "Industrial and/or Godown purposes only". Vendor partitioned the floor into studio units leased for music classes and retail boutiques. Agent marketed the property as a commercial investment, claiming non-industrial uses are automatically legalized under revitalization policies.',
    landSearch: {
      propertyZh: [
        '地段編號：觀塘內地段第 220 號',
        '物業地址：觀塘開源道 72 號 豐利工業大廈 5 樓',
        '批約年期：75 年自 1960 年起計可續期'
      ],
      propertyEn: [
        'Lot No.: Kwun Tong Inland Lot No. 220',
        'Address: 5/F, Enterprise Industrial Building, 72 Hoi Yuen Rd, Kwun Tong',
        'Lease Term: 75 years from 1960 renewable'
      ],
      ownerZh: [
        '登記業主：Top Industrial Investment Ltd',
        '代價：$18,000,000 (摘要編號 UB33190)'
      ],
      ownerEn: [
        'Registered Owner: Top Industrial Investment Ltd',
        'Consideration: $18,000,000 (Memorial No. UB33190)'
      ],
      incumbrancesZh: [
        '1. 警告信：地政總署警告信 (違反地契工業用途限制 - 零售與教室)',
        '2. 按揭：東亞銀行有限公司'
      ],
      incumbrancesEn: [
        '1. Warning Letter: Lands Department Warning Letter (Breach of User Covenant)',
        '2. Mortgage: The Bank of East Asia, Limited'
      ]
    },
    questions: [
      {
        id: 801,
        questionZh: '工廈單位在未獲地政總署批准豁免前，擅自作零售商店或音樂教室，地政總署有權採取甚麼最嚴厲執法手段？',
        questionEn: 'Without a waiver from the Lands Department, what is the most severe enforcement action Lands Dept can take for unauthorized retail/music use?',
        optionsZh: [
          'A. 只能處以罰款 $5,000',
          'B. 有權收回土地（Re-entry），將該物業所有權充公沒收轉歸政府',
          'C. 無權採取任何實質執法行動',
          'D. 只能命令電力公司停止供電'
        ],
        optionsEn: [
          'A. Issue a nominal fine of HK$5,000 only',
          'B. Exercise statutory Right of Re-entry, forfeiting and vesting title in the Government',
          'C. No legal power to take enforcement action',
          'D. Order power companies to terminate electricity supply only'
        ],
        answerIndex: 1,
        explanationZh: '✓ 違反地契用戶條款（User Restrictions）屬違反租契契約，地政總署除發警告信釘契外，情節嚴重可直接行使重收土地權（Re-entry）沒收物業。',
        explanationEn: '✓ Breaching lease covenants allows Lands Department to register warning letters and exercise the statutory Right of Re-entry, forfeiting the leasehold.',
        statuteRefZh: '《政府租契條例》與地契契約普通法',
        statuteRefEn: 'Government Rights of Re-entry Ordinance'
      },
      {
        id: 802,
        questionZh: '關於政府推行之「工廈活化計劃」（免收豁免地價整幢改裝），申請者必須具備何種法定業權條件？',
        questionEn: 'Under the Government Revitalization Scheme for nil-waiver industrial conversion, what mandatory ownership threshold must the applicant satisfy?',
        optionsZh: [
          'A. 持有該工廈 50% 不可分割份數即可',
          'B. 持有 80% 業權份數即可申請',
          'C. 必須為單一業權人擁有整幢工廈 100% 的不可分割份數',
          'D. 任何單一分層單位業主均可單獨提出申請'
        ],
        optionsEn: [
          'A. 50% undivided shares is sufficient',
          'B. 80% shares is sufficient',
          'C. Must be unified 100% single ownership of the entire industrial building',
          'D. Any individual floor owner can apply separately'
        ],
        answerIndex: 2,
        explanationZh: '✓ 工廈整幢改裝活化計劃規定申請人必須擁有該整幢工廈之 100% 單一完整業權，個別分層業主無權單獨提出申請。',
        explanationEn: '✓ The nil-waiver fee wholesale conversion scheme strictly requires 100% unified single ownership of the whole industrial building.',
        statuteRefZh: '發展局工廈活化政策法定指引',
        statuteRefEn: 'Development Bureau Revitalization Policy Guidelines'
      }
    ]
  }
];

export default function CaseStudyPage() {
  const { language, locale } = useLanguage();
  const { isPaidUser } = useAuth();
  
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [activeScenarioId, setActiveScenarioId] = useState<string>('case-1');
  const [activeTab, setActiveTab] = useState<'search' | 'facts'>('search');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentScenario = CASE_STUDY_SCENARIOS.find((s) => s.id === activeScenarioId) || CASE_STUDY_SCENARIOS[0];
  const currentQ = currentScenario.questions[currentQIndex];

  const handleScenarioChange = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setActiveTab('search');
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentQIndex((prev) => (prev + 1) % currentScenario.questions.length);
  };

  const handleResetScore = () => {
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentQIndex(0);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-blue-200 bg-blue-50 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                <Award className="h-4 w-4" />
                <span>
                  {isZh ? '8 大官方全真查冊題庫 • Part II 核心考點' : '8 Master Land Search Cases • Part II Core Syllabus'}
                </span>
              </span>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                isPaidUser
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}>
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isPaidUser ? 'PRO ACCESS (UNLOCKED)' : 'FREE PREVIEW MODE'}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              {isZh ? 'Part II 土地查冊與個案實務 (Land Search P-O-I-M)' : 'Part II Case Studies & IRIS Land Search Engine'}
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              {isZh 
                ? '涵蓋遺產物業、屋宇署清拆令、公司浮動押記、授權書託管、劏房租管、法院暫准押記令與工廈地契用戶限制。完整掌握 Property、Owner、Incumbrances 四大抽屜解讀訣竅。'
                : 'Master authentic Land Search extraction across Probate, UBW Orders, Corporate Charges, Powers of Attorney, Subdivided Tenancies, Charging Orders, and Industrial Covenants.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <Link
              href="/course"
              className="px-4 py-2.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-100 font-bold text-xs text-slate-700 transition flex items-center gap-2 shadow-sm"
            >
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span>{isZh ? '返回課程大綱' : 'Back to Syllabus'}</span>
            </Link>

            <Link
              href="/mock-exam"
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <Award className="h-4 w-4" />
              <span>{isZh ? '全真模擬考' : 'Mock Exam'}</span>
            </Link>
          </div>
        </div>

        {/* 8-Case Scenario Selector Grid */}
        <div className="p-4 sm:p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              {isZh ? '選擇考官精選個案 (Select Exam Scenario):' : 'Select Exam Case Study Scenario:'}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {CASE_STUDY_SCENARIOS.length} {isZh ? '個完整個案' : 'Scenarios Available'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CASE_STUDY_SCENARIOS.map((sc, idx) => {
              const IconComp = sc.icon;
              const isActive = sc.id === activeScenarioId;
              const isLocked = !isPaidUser && idx >= 2;

              return (
                <button
                  key={sc.id}
                  onClick={() => handleScenarioChange(sc.id)}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? 'border-2 border-amber-500 bg-amber-50/70 shadow-sm text-slate-950 font-black'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700'}`}>
                    <IconComp className="h-4 w-4" />
                  </div>

                  <div className="space-y-1 overflow-hidden flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold truncate block">
                        {isZh ? `個案 ${idx + 1}` : `Case ${idx + 1}`}
                      </span>
                      {sc.track === 'EAQE_ONLY' && (
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                          EAQE
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 flex items-center gap-0.5">
                          <Lock className="h-2.5 w-2.5" /> PRO
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-900 truncate block">
                      {isZh ? sc.titleZh : sc.titleEn}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate block">
                      {isZh ? sc.badgeZh : sc.badgeEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Split Screen Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Panel: Land Search POIM Document Viewer (5 Columns) */}
          <div className="lg:col-span-5 p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('search')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeTab === 'search' 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isZh ? '土地查冊 (Annex)' : 'Land Search Annex'}
                  </button>
                  <button
                    onClick={() => setActiveTab('facts')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeTab === 'facts' 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isZh ? '個案背景情境' : 'Case Scenario Narrative'}
                  </button>
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {isZh ? 'IRIS 官方查冊格式' : 'IRIS Standard Template'}
                </span>
              </div>

              {activeTab === 'search' ? (
                <div className="space-y-3.5 text-xs font-mono">
                  {/* Property Section (Blue) */}
                  <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5">
                    <span className="text-[10px] font-black font-mono text-blue-800 flex items-center gap-1.5 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      {isZh ? '(P) 物業資料 (PROPERTY PARTICULARS)' : '(P) PROPERTY PARTICULARS'}
                    </span>
                    {(isZh ? currentScenario.landSearch.propertyZh : currentScenario.landSearch.propertyEn).map((line, i) => (
                      <p key={i} className="text-xs text-blue-950 font-medium pl-3 border-l border-blue-300">{line}</p>
                    ))}
                  </div>

                  {/* Owner Section (Amber) */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
                    <span className="text-[10px] font-black font-mono text-amber-800 flex items-center gap-1.5 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      {isZh ? '(O) 業主資料 (OWNER PARTICULARS)' : '(O) OWNER PARTICULARS'}
                    </span>
                    {(isZh ? currentScenario.landSearch.ownerZh : currentScenario.landSearch.ownerEn).map((line, i) => (
                      <p key={i} className="text-xs text-amber-950 font-medium pl-3 border-l border-amber-300">{line}</p>
                    ))}
                  </div>

                  {/* Incumbrances Section (Rose) */}
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
                    <span className="text-[10px] font-black font-mono text-rose-800 flex items-center gap-1.5 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                      {isZh ? '(I) 業權負擔 (INCUMBRANCES)' : '(I) INCUMBRANCES'}
                    </span>
                    {(isZh ? currentScenario.landSearch.incumbrancesZh : currentScenario.landSearch.incumbrancesEn).map((line, i) => (
                      <p key={i} className="text-xs text-rose-950 font-bold pl-3 border-l-2 border-rose-400">{line}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p className="font-bold text-slate-900 text-sm">
                    {isZh ? `【個案：${currentScenario.titleZh}】` : `[ Scenario: ${currentScenario.titleEn} ]`}
                  </p>
                  <p className="leading-relaxed">{isZh ? currentScenario.narrativeZh : currentScenario.narrativeEn}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>{isZh ? `查冊案號：CS-2026-${activeScenarioId.toUpperCase()}` : `Case Ref: CS-2026-${activeScenarioId.toUpperCase()}`}</span>
              <span>{isZh ? '共 8 個全真查冊個案' : '8 Complete Scenarios'}</span>
            </div>
          </div>

          {/* Right Panel: Interactive Question Engine (7 Columns) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Question Header Meta */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold">
                    {isZh ? `第 ${currentQIndex + 1} 題 (共 ${currentScenario.questions.length} 題)` : `Question ${currentQIndex + 1} of ${currentScenario.questions.length}`}
                  </span>
                  {currentScenario.track === 'EAQE_ONLY' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800">
                      EAQE EXCLUSIVE
                    </span>
                  )}
                </div>

                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  {isZh ? currentQ.statuteRefZh : currentQ.statuteRefEn}
                </span>
              </div>

              {/* Question Stem */}
              <div className="space-y-4">
                <h2 className="text-base sm:text-lg font-bold text-slate-950 leading-relaxed">
                  {isZh ? currentQ.questionZh : currentQ.questionEn}
                </h2>

                {/* Option Buttons */}
                <div className="space-y-3">
                  {(isZh ? currentQ.optionsZh : currentQ.optionsEn).map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQ.answerIndex;

                    let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span className="leading-snug">{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 ml-2" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-600 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legal Explanation Box (Emerald Theme from Traps) */}
              {isAnswered && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1.5 animate-in fade-in duration-200">
                  <span className="text-[10px] font-black font-mono text-emerald-800 uppercase flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> [ TRUE / 官方解題法理解析 ]
                  </span>
                  <p className="text-xs font-semibold text-emerald-950 leading-relaxed">
                    {isZh ? currentQ.explanationZh : currentQ.explanationEn}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions and Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-500">
                  {isZh ? `累積答對：${score} 題` : `Score: ${score}`}
                </span>
                {score > 0 && (
                  <button
                    onClick={handleResetScore}
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>{isZh ? '重設計分' : 'Reset'}</span>
                  </button>
                )}
              </div>

              {isAnswered && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <span>{isZh ? '下一題' : 'Next Question'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}