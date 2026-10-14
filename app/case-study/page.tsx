// app/case-study/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  Award,
  FileText,
  Building2,
  Key,
  Home
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
  // Case 1: Probate & UBW
  {
    id: 'case-1',
    titleZh: '遺囑執行人與違建清拆令',
    titleEn: 'Sole Executor & UBW Removal Order',
    badgeZh: '遺產物業 / 屋宇署釘牌',
    badgeEn: 'Probate Property / Buildings Dept Order',
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
          'B. 必須在 Form 1 清楚註明，並警告買方該清拆令可能影響銀行按揭批核',
          'C. 只要買方簽署「按現狀 (As-is)」條款即免除代理責任',
          'D. 口頭通知買方即可，無需提供土地查冊副本'
        ],
        optionsEn: [
          'A. No disclosure required as UBW is between landlord and Buildings Dept',
          'B. Must state clearly in Form 1 and warn buyer that it may jeopardize mortgage approval',
          'C. Signing an "As-is" clause automatically absolves agent liability',
          'D. Verbal notice is sufficient without delivering land search copy'
        ],
        answerIndex: 1,
        explanationZh: '✓ 代理必須進行盡職審查 (Due Diligence)，於 Form 1 披露 subsisting orders 並警示買方銀行按揭風險。',
        explanationEn: '✓ Agents must exercise due diligence, record subsisting orders on Form 1, and advise buyers on mortgage risks.',
        statuteRefZh: '《屋宇條例》第 123 章 24 條與《操守指引》第 3 條',
        statuteRefEn: 'Cap. 123 s.24 & Practice Regulation s.3'
      }
    ]
  },

  // Case 2: Company Vendor (Two Searches)
  {
    id: 'case-2',
    titleZh: '有限公司賣家與雙重查冊法則',
    titleEn: 'Company Vendor & Two-Search Rule',
    badgeZh: '公司業主 / 商業登記與公司註冊處',
    badgeEn: 'Company Vendor / Companies Registry Search',
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

  // Case 3: Power of Attorney
  {
    id: 'case-3',
    titleZh: '授權書 (Power of Attorney) 交易驗證',
    titleEn: 'Power of Attorney Verification',
    badgeZh: '授權書 / 註冊摘要與撤銷風險',
    badgeEn: 'Power of Attorney / Revocation Risk',
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

  // Case 4: Sub-divided Unit (Cap. 7 Part IVA)
  {
    id: 'case-4',
    titleZh: '劏房租務管制與 Form CR109 申報',
    titleEn: 'Sub-divided Unit Rent Control & Form CR109',
    badgeZh: '劏房管制 / Cap. 7 Part IVA / CR109',
    badgeEn: 'Part IVA Tenancy / RVD CR109 Notice',
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
  }
];

export default function CaseStudyPage() {
  const { language, locale } = useLanguage();
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

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header Banner */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          className="p-6 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500">
              <Award className="h-3.5 w-3.5" />
              <span>
                {isZh ? 'EAQE 卷二個案 (20 題) / SQE 卷二個案 (10 題)' : 'EAQE Part II (20 Questions) / SQE Part II (10 Questions)'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isZh ? 'Part II 個案實務與土地查冊 (Land Search P-O-I-M)' : 'Part II Case Study & Land Search POIM Engine'}
            </h1>
          </div>

          <Link
            href="/course"
            className="px-4 py-2.5 rounded-2xl border border-slate-700 hover:border-indigo-500 font-bold text-xs transition flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span>{isZh ? '返回課程大綱' : 'Back to Syllabus'}</span>
          </Link>
        </div>

        {/* Multi-Case Scenario Selector Bar */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          className="p-4 rounded-3xl border shadow-lg space-y-2"
        >
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-1">
            {isZh ? '選擇考官精選個案 (Select Exam Scenario):' : 'Select Exam Case Study Scenario:'}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {CASE_STUDY_SCENARIOS.map((sc, idx) => {
              const IconComp = sc.icon;
              const isActive = sc.id === activeScenarioId;

              return (
                <button
                  key={sc.id}
                  onClick={() => handleScenarioChange(sc.id)}
                  className={`p-3 rounded-2xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <IconComp className={`h-4 w-4 shrink-0 mt-0.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <div className="space-y-0.5 overflow-hidden">
                    <span className="text-xs font-bold truncate block">
                      {isZh ? `個案 ${idx + 1}: ${sc.titleZh}` : `Case ${idx + 1}: ${sc.titleEn}`}
                    </span>
                    <span className={`text-[10px] block truncate ${isActive ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
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
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className="lg:col-span-5 p-6 rounded-3xl border shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('search')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeTab === 'search' ? 'bg-amber-500 text-slate-950' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {isZh ? '土地查冊 (Annex PDF)' : 'Land Search Annex'}
                  </button>
                  <button
                    onClick={() => setActiveTab('facts')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeTab === 'facts' ? 'bg-amber-500 text-slate-950' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {isZh ? '個案背景故事' : 'Case Study Narrative'}
                  </button>
                </div>

                <span className="text-[10px] font-mono font-bold opacity-60">
                  {isZh ? 'IRIS 官方查冊範本' : 'IRIS Official Template'}
                </span>
              </div>

              {activeTab === 'search' ? (
                <div className="space-y-4 text-xs font-mono">
                  {/* Property Section */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold block">
                      {isZh ? '(P) 物業資料 (PROPERTY PARTICULARS)' : '(P) PROPERTY PARTICULARS'}
                    </span>
                    {(isZh ? currentScenario.landSearch.propertyZh : currentScenario.landSearch.propertyEn).map((line, i) => (
                      <p key={i} className="opacity-80">{line}</p>
                    ))}
                  </div>

                  {/* Owner Section */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold block">
                      {isZh ? '(O) 業主資料 (OWNER PARTICULARS)' : '(O) OWNER PARTICULARS'}
                    </span>
                    {(isZh ? currentScenario.landSearch.ownerZh : currentScenario.landSearch.ownerEn).map((line, i) => (
                      <p key={i} className="opacity-80">{line}</p>
                    ))}
                  </div>

                  {/* Incumbrances Section */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold block">
                      {isZh ? '(I) 業權負擔 (INCUMBRANCES)' : '(I) INCUMBRANCES'}
                    </span>
                    {(isZh ? currentScenario.landSearch.incumbrancesZh : currentScenario.landSearch.incumbrancesEn).map((line, i) => (
                      <p key={i} className="text-rose-400 font-bold">{line}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs leading-relaxed opacity-85">
                  <p className="font-bold text-amber-400">
                    {isZh ? `【個案 ${CASE_STUDY_SCENARIOS.findIndex(s => s.id === activeScenarioId) + 1}: ${currentScenario.titleZh}】` : `[ Case ${CASE_STUDY_SCENARIOS.findIndex(s => s.id === activeScenarioId) + 1}: ${currentScenario.titleEn} ]`}
                  </p>
                  <p>{isZh ? currentScenario.narrativeZh : currentScenario.narrativeEn}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t text-[10px] font-mono opacity-50 flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
              <span>{isZh ? `個案編號：CS-2026-${activeScenarioId.toUpperCase()}` : `Case Reference: CS-2026-${activeScenarioId.toUpperCase()}`}</span>
              <span>{isZh ? '第 1 頁 / 共 1 頁' : 'Page 1 of 1'}</span>
            </div>
          </div>

          {/* Right Panel: Interactive Question Engine (7 Columns) */}
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-color)' }}>
                <span className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono font-bold text-indigo-400">
                  {isZh ? `第 ${currentQIndex + 1} 題 (共 ${currentScenario.questions.length} 題)` : `Question ${currentQIndex + 1} of ${currentScenario.questions.length}`}
                </span>

                <span className="text-xs font-mono opacity-60">
                  {isZh ? currentQ.statuteRefZh : currentQ.statuteRefEn}
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-base sm:text-lg font-bold leading-relaxed">
                  {isZh ? currentQ.questionZh : currentQ.questionEn}
                </h2>

                <div className="space-y-3">
                  {(isZh ? currentQ.optionsZh : currentQ.optionsEn).map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQ.answerIndex;

                    let btnStyle = 'border-slate-800 bg-slate-900/60 hover:border-indigo-500/60';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-600/20 border-rose-500 text-rose-300 font-bold';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {isAnswered && (
                <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1 animate-in fade-in duration-200">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase block">
                    {isZh ? '【 官方解題分析 】' : '[ Official Statutory Analysis ]'}
                  </span>
                  <p className="text-xs font-semibold text-indigo-200 leading-relaxed">
                    {isZh ? currentQ.explanationZh : currentQ.explanationEn}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-xs font-mono font-bold opacity-60">
                {isZh ? `得分：${score} 分` : `Total Score: ${score}`}
              </span>

              {isAnswered && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer"
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