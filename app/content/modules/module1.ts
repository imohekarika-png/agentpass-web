// app/content/modules/module1.ts
import { FullLesson } from '../types';

export const MODULE_1_LESSONS: Record<string, FullLesson> = {
  'm1-l1': {
    id: 'm1-l1',
    moduleId: 'module-1',
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.1 EAO 立法原意與 EAA 四層監管架構',
    titleEn: '1.1 Why EAO Exists & EAA 4-Floor Regulatory Model',
    capRef: 'Cap. 511 Section 3 & 4',
    memoryHookZh: {
      title: 'EAA 四層大樓 (LICENCE / REGULATE / DISCIPLINE / EDUCATE)',
      imageConcept: '想像 EAA 總部大樓有四層樓：1樓發牌、2樓監管、3樓懲處、4樓教育。',
      desc: '1樓 LICENCE (發牌) -> 2樓 REGULATE (執業規例) -> 3樓 DISCIPLINE (紀律研訊) -> 4樓 EDUCATE (持續進修與考試)。注意：考試由考評局 (HKEAA) 託管，PEAK 負責報名。'
    },
    memoryHookEn: {
      title: 'EAA Four-Floor Building Model',
      imageConcept: 'Picture EAA headquarters with 4 distinct floors.',
      desc: '1F LICENCE -> 2F REGULATE -> 3F DISCIPLINE -> 4F EDUCATE. Note: Exams administered by HKEAA, registration via PEAK VTC.'
    },
    scenarioZh: '陳先生擬查詢地產代理監管局 (EAA) 的法定職能，以及資格考試與註冊程序的權責劃分。',
    scenarioEn: 'Mr. Chan wants to clarify the statutory functions of the EAA and which authorities conduct the qualifying exams and registration.',
    verifiedNotesZh: [
      '✓ 地產代理監管局 (EAA) 是根據《地產代理條例》(Cap. 511) 成立的法定機構，負責發牌及規管行業。',
      '✓ 資格考試本身由「香港考試及評核局 (HKEAA)」代為舉行；考試報名由 Peak Exam Centre (VTC) 處理。',
      '✓ 監管局行政總裁 (CEO) 負責處理投訴及進行調查；紀律處分由「紀律委員會 (Disciplinary Committee)」進行研訊。',
      '✓ 監管局四大主職：審批牌照、制定執業守則、調查及懲處違規、推動持續專業進修 (CPD)。'
    ],
    verifiedNotesEn: [
      '✓ EAA is a statutory body established under Cap. 511 to grant licences and regulate practice.',
      '✓ Qualifying exams are administered by HKEAA on EAA\'s behalf; registration via PEAK VTC.',
      '✓ CEO handles complaints and investigations; Disciplinary Committee conducts inquiries.',
      '✓ 4 core duties: Granting licences, setting practice rules, disciplinary inquiries, and CPD.'
    ],
    detailedLawNotesZh: [
      '1. 立法背景：《地產代理條例》(第511章) 旨在建立發牌制度、提升地產代理從業員的專業操守，並保障物業買賣及租賃雙方的消費權益。',
      '2. 權力架構：監管局設有不同常設委員會 (Standing Committees)。行政總裁 (CEO) 擁有調配調查人員及發出第28條調查通知書之權利。',
      '3. 執業常規發布：監管局透過發出《執業通告》(Practice Circulars) 向持牌人發布最新監管要求及法定提示。'
    ],
    detailedLawNotesEn: [
      '1. Statutory Purpose: Cap. 511 establishes a licensing system to elevate professionalism and safeguard consumers.',
      '2. Authority Structure: EAA comprises standing committees. The CEO exercises powers to appoint investigators under Section 28.',
      '3. Practice Circulars: EAA issues Practice Circulars to update licensees on regulatory standards and compliance.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「資格考試由地產代理監管局直接親自監考及舉辦」— 錯誤！考試是由考評局 (HKEAA) 託管代辦。',
      '⚠ 考官陷阱：宣稱「監管局可以對違規從業員處以港幣 10 萬元的刑事罰款」— 錯誤！EAA 紀律處分權不包括直接處以罰款。'
    ],
    trapsEn: [
      '⚠ Trap: Claims EAA directly holds and invigilates exams — FALSE! HKEAA administers exams on EAA\'s behalf.',
      '⚠ Trap: Claims EAA can directly impose a $100,000 fine on licensees — FALSE! Disciplinary powers do not include fines.'
    ],
    retrievalQuestionsZh: [
      '□ 請不看講義默寫 EAA 四層大樓模型的四大主職，並將「常設委員會」、「發放執業通告」、「CEO 調查」分類至正確層數。',
      '□ 資格考試由哪一個機構代為舉行？報名由哪一個機構處理？'
    ],
    retrievalQuestionsEn: [
      '□ Name the four floors of the EAA building and sort these: Standing committees, Practice Circulars, CEO investigations.',
      '□ Which authority administers the qualifying exams? Which centre handles registration?'
    ],
    quiz: {
      questionZh: '下列關於地產代理監管局 (EAA) 職能的表述，哪項是完全正確的？',
      questionEn: 'Which statement regarding the functions of the EAA is correct?',
      optionsZh: [
        'EAA 是直接負責舉行資格考試的政府部門',
        'EAA 是根據 Cap. 511 成立的法定機構，負責發牌與行業監管',
        'EAA 可以對違規從業員處以港幣 10 萬元的刑事罰款',
        'EAA 負責為所有二手住宅交易提供免費物業估值'
      ],
      optionsEn: [
        'EAA is a government department that directly holds exams',
        'EAA is a statutory body under Cap. 511 responsible for licensing and regulation',
        'EAA can directly impose a $100,000 criminal fine on licensees',
        'EAA provides free valuation services for secondary properties'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。EAA 是 Cap. 511 設立的法定機構。考試由考評局代辦，EAA 無處以刑事罰款權利。',
      explanationEn: 'Correct answer is B. EAA is a statutory body under Cap. 511. Exams are held by HKEAA, and EAA cannot impose fines.'
    }
  },

  'm1-l2': {
    id: 'm1-l2',
    moduleId: 'module-1',
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.2 牌照類別與申請資格 (18-5-12-F&P 及 3到1續期)',
    titleEn: '1.2 License Types & Eligibility (18-5-12-F&P & 3-to-1 Renewal)',
    capRef: 'Cap. 511 Section 15 & 16',
    memoryHookZh: {
      title: '18 - 5 - 12 - F&P 及「3 到 1」續期法則',
      imageConcept: '生日蛋糕上插著 18 支蠟燭放在中五成績表上，蓋著 12 個月前的考試合格章；續期窗口為屆滿前 3 個月至 1 個月。',
      desc: '資格：18 歲、中五學歷、12 個月內考獲合格 (SQE 為 6 個月)、Fit and Proper。續期窗口：屆滿前 3 個月內至 1 個月前申請。'
    },
    memoryHookEn: {
      title: '18 - 5 - 12 - F&P and 3-to-1 Renewal Rule',
      imageConcept: 'Birthday cake with 18 candles sitting on a Form 5 report card, stamped with an exam pass date.',
      desc: 'Eligibility: 18 yrs, Form 5, Exam passed within 12 mos (6 mos for SQE), Fit & Proper. Renewal: 3 mos to 1 mo before expiry.'
    },
    scenarioZh: '一位 22 歲並持有 SQE 營業員牌照 3 年的持牌人，擬被委任為地產代理分行的管轄主管 (Manager)。這是否符合法例規定？',
    scenarioEn: 'A 22-year-old holding an SQE license for 3 years is nominated to be appointed as a Branch Manager. Is this compliant with EAA regulations?',
    verifiedNotesZh: [
      '✓ 三種牌照：地產代理個人牌照 (EAQE)、地產代理公司牌照、營業員牌照 (SQE)。',
      '✓ SQE 持有者嚴禁獨立經營業務，亦不得被委任為分行管轄主管 (Manager)。',
      '✓ 考試合格有效期：EAQE 為 12 個月，SQE 為 6 個月。「相關工作經驗」非發牌要件。',
      '✓ 未解除破產人或 18 個月前曾因欺詐罪被判監者均屬非「適當人選」(Fit and Proper)。普通交通罰款不影響。'
    ],
    verifiedNotesEn: [
      '✓ 3 licence types: Estate Agent (Individual), Estate Agent (Company), Salesperson (SQE).',
      '✓ SQE holders cannot carry on business and CANNOT be appointed branch managers.',
      '✓ Exam window: 12 months for EAQE, 6 months for SQE. Relevant work experience is NOT required.',
      '✓ Undischarged bankrupts and fraud convicts fail Fit & Proper; minor traffic fines do not disqualify.'
    ],
    detailedLawNotesZh: [
      '1. 依據 Cap. 511 第15及16條，獨資經營者或合夥人必須持有 EAQE 地產代理個人牌照。',
      '2. 依第38條，分行主管必須持有 EAQE 牌照並獲監管局批准。年齡與年資均不能替代 EAQE 牌照要件。',
      '3. 續期規定：牌照屆滿前不早於 3 個月及不遲於 1 個月提出申請。'
    ],
    detailedLawNotesEn: [
      '1. Under Cap. 511 Sections 15 & 16, sole proprietors/partners MUST hold an EAQE individual licence.',
      '2. Under Section 38, branch managers must hold EAQE. Experience cannot substitute for the licence type.',
      '3. Renewal applies between 3 months and 1 month prior to expiry date.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「具備 3 年經驗的 22 歲 SQE 持有人可擔任分行主管」— 錯誤！無 EAQE 牌照絕不能擔任。',
      '⚠ 考官陷阱：宣稱「相關工作經驗是申請地產代理牌照的必要條件」— 錯誤！工作經驗並非發牌條件。'
    ],
    trapsEn: [
      '⚠ Trap: Claims SQE holder with 3 years experience can manage a branch — FALSE! Must hold EAQE.',
      '⚠ Trap: Claims relevant work experience is required for licensing — FALSE! Not a requirement.'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫申請牌照四大資格 (18-5-12-F&P)，並指出哪一項不是發牌條件。',
      '□ 營業員牌照於 3 月 21 日屆滿，最早及最遲應於何時提交續期申請？'
    ],
    retrievalQuestionsEn: [
      '□ Name the four eligibility requirements and identify which candidate factor is NOT required.',
      '□ A salesperson licence expires on 21 March. What are the earliest and latest dates to apply for renewal?'
    ],
    quiz: {
      questionZh: '營業員牌照 (SQE) 於 3 月 21 日屆滿，持牌人提交續期申請的法定時間窗口 Saturn 為何？',
      questionEn: 'A salesperson licence (SQE) expires on 21 March. What is the statutory renewal application window?',
      optionsZh: [
        '屆滿前 6 個月內至 3 個月前',
        '最早為 12 月 22 日，最遲為 2 月 21 日 (屆滿前 3 個月至 1 個月)',
        '屆滿前 30 天內至屆滿當天',
        '隨時提交，無時間限制'
      ],
      optionsEn: [
        'Between 6 months and 3 months prior to expiry',
        'Earliest 22 December, latest 21 February (3 months to 1 month prior)',
        'Within 30 days prior to expiry',
        'Anytime without restriction'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。續期窗口為屆滿前「不早於 3 個月，不遲於 1 個月」(3 to 1 window)。',
      explanationEn: 'Correct answer is B. Renewal applications must be lodged no earlier than 3 months and no later than 1 month before expiry.'
    }
  },

  'm1-l3': {
    id: 'm1-l3',
    moduleId: 'module-1',
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.3 法定表格 Forms 1 至 6 (單數賣、雙數買)',
    titleEn: '1.3 Prescribed Forms 1-6 (Odd Sells, Even Buys)',
    capRef: 'Cap. 511 Section 36 & Form Rules',
    memoryHookZh: {
      title: '單數賣、雙數買 (ODD SELLS, EVEN BUYS)',
      imageConcept: '翹翹板左邊是賣方 (單數 3, 5)，右邊是買方 (雙數 4, 6)，中間支點放著資料表 Form 1 & 2。',
      desc: 'Form 1 (物業資料表) & Form 2 (租賃資料表)。Form 3 (賣方) & Form 5 (業主) 為單數；Form 4 (買方) & Form 6 (租客) 為雙數。'
    },
    memoryHookEn: {
      title: 'Odd Sells, Even Buys',
      imageConcept: 'Seesaw with odd numbers on seller side, even numbers on buyer side, Forms 1 and 2 balanced in the middle.',
      desc: 'Form 1 (Property Info), Form 2 (Leasing Info). Form 3 & 5: Vendor/Landlord (Odd). Form 4 & 6: Purchaser/Tenant (Even).'
    },
    scenarioZh: '代理處理店舖 (Shop) 買賣、寫字樓租務或連同車位一同出售的住宅物業，哪些情況必須使用法定表格 Forms 1-6？',
    scenarioEn: 'Handling shop sales, office leases, or residential flats with a car park—which scenarios require prescribed Forms 1-6?',
    verifiedNotesZh: [
      '✓ Form 1 為物業資料表，Form 2 為租賃資料表。',
      '✓ Form 3 (賣方) 及 Form 5 (業主) 為單數；Form 4 (買方) 及 Form 6 (租客) 為雙數。',
      '✓ 表格 1 至 6 適用於住宅物業（包括連車位之住宅）；「不適用」於舖位買賣、寫字樓租務或非獨立住宅單位（無獨立廚廁）。',
      '✓ Form 3 代理職責：推廣、獲取物業資料、議價。不包括買家背景調查、破產查冊或物業估值。'
    ],
    verifiedNotesEn: [
      '✓ Form 1 Property Info, Form 2 Leasing Info.',
      '✓ Form 3 (Vendor) & Form 5 (Landlord) are odd; Form 4 (Purchaser) & Form 6 (Tenant) are even.',
      '✓ Prescribed forms apply to residential property (including car parks); EXCLUDE shops, offices, non-self-contained flats.',
      '✓ Form 3 duties: Market, obtain info, negotiate. EXCLUDE purchaser background search, bankruptcy search, valuation.'
    ],
    detailedLawNotesZh: [
      '1. 《地產代理條例》第36條強制規定住宅代理須簽署預設協議。未填妥必填事項 (Mandatory Particulars) 會導致協議無效並喪失佣金追討權。',
      '2. 代理收到買方初始現金訂金而賣方不在香港時，必須即時存入代理公司銀行開設的客戶信託戶口 (Trust Account)。'
    ],
    detailedLawNotesEn: [
      '1. Cap. 511 Section 36 mandates prescribed agreements for residential properties.',
      '2. Cash deposits received when vendor is away must be deposited into the agency firm\'s bank Client Trust Account immediately.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「店舖買賣或寫字樓出租須使用 Form 3 或 Form 5」— 錯誤！法定預設表格僅適用於住宅物業。',
      '⚠ 考官陷阱：宣稱「Form 3 下代理有責任調查買家的背景及破產紀錄」— 錯誤！代理無此項法定調查責任。'
    ],
    trapsEn: [
      '⚠ Trap: Claims shop sales or office leases require Form 3 or 5 — FALSE! Prescribed forms apply to residential only.',
      '⚠ Trap: Claims Form 3 requires investigating purchaser bankruptcy — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 業主簽哪一份表格？買家簽哪一份表格？',
      '□ 請列舉三種不適用法定表格 Forms 1-6 的交易情況。'
    ],
    retrievalQuestionsEn: [
      '□ Which form does a landlord sign? Which form does a purchaser sign?',
      '□ Name 3 transaction situations where prescribed forms (Forms 1-6) DO NOT apply.'
    ],
    quiz: {
      questionZh: '下列哪種物業交易情況「不適用」法定預設地產代理協議表格 (Forms 1-6)？',
      questionEn: 'For which of the following property transactions are prescribed forms (Forms 1-6) NOT required?',
      optionsZh: [
        '連同車位一同出售之住宅物業',
        '獨立住宅單位之租賃',
        '店舖 (Shop) 之買賣或寫字樓 (Office) 之租賃',
        '連同車位一同出租之住宅物業'
      ],
      optionsEn: [
        'Sale of residential property together with a car park',
        'Leasing of a self-contained residential unit',
        'Sale of a shop or leasing of an office',
        'Leasing of residential property together with a car park'
      ],
      correctIndex: 2,
      explanationZh: '正確答案為 C。法定表格僅適用於住宅物業。店舖買賣及寫字樓租賃均不適用 Forms 1-6。',
      explanationEn: 'Correct answer is C. Prescribed forms apply strictly to residential properties, not commercial shops or offices.'
    }
  },

  'm1-l4': {
    id: 'm1-l4',
    moduleId: 'module-1',
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.4 執業規例與客戶資金託管 (3-2-14-3 法則)',
    titleEn: '1.4 Practice Regulation & Client Money (3-2-14-3 Rule)',
    capRef: 'Cap. 511B Practice Regulation',
    memoryHookZh: {
      title: '3 - 2 - 14 - 3 資金法則',
      imageConcept: '一台收據打印機，必須打印出 carbon copy 並存放在檔案櫃內保留至少 3 年。',
      desc: '3 項許可用途 (信託/付客戶/依書面指示)、2 個收受方、14 天內開立書面收據、收據副本保存 3 年。'
    },
    memoryHookEn: {
      title: '3 - 2 - 14 - 3 Money Rule',
      imageConcept: 'Receipt printer keeping carbon copies filed safely for three years.',
      desc: '3 permitted uses (trust account/pay client/written instruction), 2 parties, written receipt within 14 days, keep copy 3 years.'
    },
    scenarioZh: '代理收到買方交付的 $40,000 初始現金訂金，當時賣方不在香港。代理應如何存置該筆款項？',
    scenarioEn: 'An agent receives $40,000 cash initial deposit for a vendor who is out of Hong Kong. How must the money be deposited?',
    verifiedNotesZh: [
      '✓ 客戶款項必須即時存入代理公司於銀行開設的「客戶信託戶口」(Trust Account)。',
      '✓ 廣告規範：必須取得賣方事前書面同意，列明牌照號碼/營業詳情說明書號碼，並按賣方指示列明售價（無須是「市場價」）。',
      '✓ 進行工作前，須告知客戶自己是持牌人及牌照號碼 (無須告知 SPOB 號碼、領牌年份或過去成交量)。',
      '✓ 睇樓物業檢視：買方代理須陪同睇樓並取得業主同意，無須於睇樓前編製傢俬清單。'
    ],
    verifiedNotesEn: [
      '✓ Client money must go into agency firm\'s bank Client Trust Account without delay.',
      '✓ Advertising: Prior written consent required; state licence/SPOB number; asking price per instruction (not "market price").',
      '✓ Prior to work: State licence status and licence number (NOT SPOB number, year licensed, or transaction count).',
      '✓ Inspections: Purchaser agent must accompany and get vendor consent; compiling furniture inventory is NOT required.'
    ],
    detailedLawNotesZh: [
      '1. 依據《執業規例》，客戶款項嚴禁存入代理個人戶口或律師樓戶口。',
      '2. 刊登住宅廣告前必須取得業主書面同意。廣告售價須符合業主指示，無須核實是否屬於「市場價」。'
    ],
    detailedLawNotesEn: [
      '1. Under Practice Regulation, client money must never be deposited into personal or solicitor accounts.',
      '2. Prior written consent required for ads. Asking price must follow vendor instruction, not market price checking.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「買方訂金應存入賣方律師樓的信託戶口」— 錯誤！必須存入代理公司本身的銀行信託戶口。',
      '⚠ 考官陷阱：宣稱「代理有責任確保廣告宣傳的售價屬於市場價」— 錯誤！只需確保符合業主指示。'
    ],
    trapsEn: [
      '⚠ Trap: Claims cash deposit should go to seller\'s solicitor trust account — FALSE! Must enter agency\'s bank trust account.',
      '⚠ Trap: Claims agent must check if advertised price is market price — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫資金處理的 3-2-14-3 數字密碼。',
      '□ 刊登廣告前的四大檢查為何？哪一個常考第五項檢查是不需要的？'
    ],
    retrievalQuestionsEn: [
      '□ State the 3-2-14-3 money rule from memory.',
      '□ Name the 4 checks before advertising. Which commonly assumed 5th check is NOT required?'
    ],
    quiz: {
      questionZh: '代理收到買方交付的初始現金訂金，當時賣方不在香港。代理依法應如何處理該筆現金？',
      questionEn: 'An agent receives initial cash deposit from purchaser while vendor is out of HK. What must the agent do?',
      optionsZh: [
        '即時存入代理公司於銀行維持的客戶信託戶口',
        '存入賣方律師樓的信託戶口',
        '存入代理公司的日常營運戶口',
        '存入主管的個人銀行戶口代為保管'
      ],
      optionsEn: [
        'Deposit immediately into agency\'s bank Client Trust Account',
        'Deposit into vendor\'s solicitor trust account',
        'Deposit into agency office operational account',
        'Deposit into supervisor\'s personal account'
      ],
      correctIndex: 0,
      explanationZh: '正確答案為 A。必須即時存入地產代理公司於銀行開立的客戶信託戶口。',
      explanationEn: 'Correct answer is A. Must deposit immediately into the agency firm\'s bank Client Trust Account.'
    }
  },

  'm1-l5': {
    id: 'm1-l5',
    moduleId: 'module-1',
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.5 操守守則 (3H 原則、利益申報與公平對待)',
    titleEn: '1.5 Code of Ethics (3 H\'s & Disclosure Duties)',
    capRef: 'Code of Ethics 3.4.1',
    memoryHookZh: {
      title: '3H 原則 + 利益申報 + 公平對待',
      desc: 'Honesty (誠實忠誠)、Harm (避免損害行業聲譽)、Haste (盡責謹慎 Care & Diligence)。利益必須 Disclose，態度必須 Impartial。'
    },
    memoryHookEn: {
      title: 'Three H\'s + Disclosure + Impartiality',
      desc: 'Honesty, Harm (avoid disrepute), Haste (exercise due care). MUST Disclose beneficial interest and remain Impartial.'
    },
    scenarioZh: '代理勸誘買家購買自己作為大股東的公司名下的物業，並故意隱瞞身份；或承諾 2% 回贈但未作書面紀錄。這違反了哪些操守？',
    scenarioEn: 'An agent induces a buyer to buy a flat owned by a company where the agent is a major shareholder, concealing this fact. What duties are breached?',
    verifiedNotesZh: [
      '✓ 隱瞞自己為賣方公司大股東違反：申報金錢/金益興趣之責任，以及公平公正對待各方之責任。',
      '✓ 申報權益責任同時訂明於《操守守則》及《地產代理條例》(非物業轉讓條例)。',
      '✓ 一手樓盤回贈承諾務必於簽臨約前以書面形式確認並由雙方簽署。',
      '✓ 應客戶要求推薦律師樓「不違反」操守；未經同意向兄弟的裝修公司提供客戶電話「違反」私隱及操守。'
    ],
    verifiedNotesEn: [
      '✓ Concealing shareholder interest breaches duty to disclose pecuniary interest AND duty to act impartially.',
      '✓ Duty to disclose interest is stipulated in BOTH Code of Ethics AND Estate Agents Ordinance.',
      '✓ Primary market rebate promises must be in writing signed by both parties prior to PASP.',
      '✓ Recommending a solicitor at client\'s request is NOT a breach; sharing client phone with brother\'s firm IS a breach.'
    ],
    detailedLawNotesZh: [
      '1. 《操守守則》強制要求誠實、忠誠及謹慎。',
      '2. 未獲同意下不得向第三方轉交客戶個人資料以推廣其他服務。向買家作虛假陳述或毀謗競爭對手均屬嚴重違例。'
    ],
    detailedLawNotesEn: [
      '1. Code of Ethics enforces honesty, fidelity, and due care.',
      '2. Never transfer client personal data to third parties without consent. Making false statements breaches ethics.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「申報個人金益興趣的責任僅載於《物業轉讓及物業條例》」— 錯誤！載於 Code of Ethics 及 EAO。',
      '⚠ 考官陷阱：宣稱「應客戶主動要求推薦律師樓屬於違反操守行為」— 錯誤！客戶主動要求推薦並不違規。'
    ],
    trapsEn: [
      '⚠ Trap: Claims duty to disclose interest is in Conveyancing Ordinance only — FALSE! In Code of Ethics & EAO.',
      '⚠ Trap: Claims recommending solicitors at client request is an ethics breach — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫 3H 原則分別代表什麼。',
      '□ 代理隱瞞自己為賣方公司大股東，違反了哪兩項操守責任？'
    ],
    retrievalQuestionsEn: [
      '□ Name the 3 H\'s and what each requires.',
      '□ An agent conceals major shareholder interest in vendor company. Which TWO Code duties are breached?'
    ],
    quiz: {
      questionZh: '地產代理向客戶申報其於交易物業中的金錢或其他利益興趣的法定責任，訂明於下列哪些規範中？',
      questionEn: 'Where is the duty to disclose pecuniary or beneficial interest in a transacted property stipulated?',
      optionsZh: [
        '僅訂明於《操守守則》中',
        '同時訂明於《操守守則》及《地產代理條例》中',
        '訂明於《物業轉讓及物業條例》中',
        '訂明於《未受懲罰合約條例》中'
      ],
      optionsEn: [
        'Code of Ethics only',
        'BOTH Code of Ethics AND Estate Agents Ordinance',
        'Conveyancing and Property Ordinance',
        'Unconscionable Contracts Ordinance'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。同時訂明於《操守守則》與《地產代理條例》中。',
      explanationEn: 'Correct answer is B. Stipulated in BOTH Code of Ethics AND Estate Agents Ordinance.'
    }
  },

  'm1-l6': {
    id: 'm1-l6',
    moduleId: 'module-1',
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.6 調查、紀律處分 (ARSC)、上訴與佣金爭議',
    titleEn: '1.6 Investigations, Discipline (ARSC) & Appeals',
    capRef: 'Cap. 511 Section 28 & 44',
    memoryHookZh: {
      title: 'ARSC 懲處權利及 PRODUCE & EXPLAIN 調查義務',
      desc: '紀律處分：Admonish (告誡), Reprimand (譴責), Suspend (吊銷), Condition/Revoke (附條件/撤銷)。注意：EAA 無權處以罰款！調查義務：提供檔案及解釋，無須搜查住宅或支付調查費。'
    },
    memoryHookEn: {
      title: 'ARSC Disciplinary Powers & Produce & Explain',
      desc: 'ARSC: Admonish, Reprimand, Suspend, Condition/Revoke. (No $100k fine!). Investigation: Produce records & Explain (No home search).'
    },
    scenarioZh: '當針對持牌人的投訴成立時，EAA 擁有什麼懲處權力？調查員依第28條調查時，持牌人有何義務？',
    scenarioEn: 'When a complaint is established, what disciplinary powers does the EAA have? What are the licensee\'s duties under s.28 investigation?',
    verifiedNotesZh: [
      '✓ EAA 紀律處分權 (ARSC)：告誡 (Admonish)、譴責 (Reprimand)、暫吊牌照 (Suspend)、附條件或撤銷牌照 (Condition/Revoke)。「處以 10 萬罰款」為標準干擾項！',
      '✓ 第28條調查義務：按要求提供相關紀錄 (Produce) 並作出解釋 (Explain)。無義務讓調查員搜查住宅或支付調查費用。',
      '✓ 未經賣方事前書面同意刊登廣告、使用未經登記的名銜、或提供虛假資料予調查員均屬刑事罪行。',
      '✓ 向賣方追討臨約約定的佣金前，代理公司必須已與賣方簽訂 Form 3 地產代理協議。'
    ],
    verifiedNotesEn: [
      '✓ EAA Disciplinary Powers (ARSC): Admonish, Reprimand, Suspend, Condition/Revoke. ($100k fine is a distractor!).',
      '✓ Section 28 duties: Produce records and Explain. NO duty to allow residence search or pay investigation costs.',
      '✓ Advertising without written consent, using unrecorded names, or giving false info to investigators are criminal offences.',
      '✓ Before suing vendor for commission under PASP clause, agency must have entered into Form 3 with vendor.'
    ],
    detailedLawNotesZh: [
      '1. 依據 Cap. 511，EAA 可依法懲處違規持牌人，但無刑事罰款權。',
      '2. 僱用無牌人士進行地產代理工作可面臨紀律處分、民事索償及刑事追究。'
    ],
    detailedLawNotesEn: [
      '1. Under Cap. 511, EAA exercises administrative discipline but no direct fines.',
      '2. Employing unlicensed staff triggers disciplinary, civil, and criminal liability.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「投訴成立時，監管局可對持牌人處以港幣 10 萬元的罰款」— 錯誤！EAA 無權處以罰款。',
      '⚠ 考官陷阱：宣稱「持牌人受調查時必須允許調查員搜查其私人住宅」— 錯誤！無此項義務。'
    ],
    trapsEn: [
      '⚠ Trap: Claims EAA can impose a $100,000 fine on licensees — FALSE! Standard distractor.',
      '⚠ Trap: Claims s.28 investigator can search licensee\'s residence — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫 EAA 紀律處分的四大權力 (ARSC)，並指出哪一項不在清單內。',
      '□ 依第28條受調查時，持牌人的兩項責任為何？哪兩項要求的拒絕不屬違規？'
    ],
    retrievalQuestionsEn: [
      '□ Name the 4 things EAA may do where a complaint is well-founded (ARSC). Name the 5th thing it CANNOT do.',
      '□ An s.28 investigator asks to search your flat and asks you to fund the investigation. Must you comply?'
    ],
    quiz: {
      questionZh: '當針對持牌地產代理的投訴經研訊後證實成立，下列哪項「不屬於」監管局可以裁決執行的懲處措施？',
      questionEn: 'When a complaint against a licensee is established, which of the following is NOT a disciplinary power of the EAA?',
      optionsZh: [
        '發出警告或警告信告誡持牌人',
        '暫時吊銷或撤銷其地產代理牌照',
        '對持牌人處以港幣 10 萬元的刑事罰款',
        '在牌照上附加特定執業條件'
      ],
      optionsEn: [
        'Issue an admonition or reprimand',
        'Suspend or revoke the licence',
        'Impose a criminal fine of $100,000',
        'Attach conditions to the licence'
      ],
      correctIndex: 2,
      explanationZh: '正確答案為 C。EAA 紀律處分權不包括處以罰款。',
      explanationEn: 'Correct answer is C. EAA disciplinary powers do not include fines.'
    }
  }
};