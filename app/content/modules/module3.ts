// app/content/modules/module3.ts
import { FullLesson } from '../types';

export const MODULE_3_LESSONS: Record<string, FullLesson> = {
  'm3-l1': {
    id: 'm3-l1',
    moduleId: 'module-3',
    moduleZh: 'Module 3：閱讀物業 (Reading the Property)',
    moduleEn: 'Module 3: Land Search, Buildings & Valuation',
    titleZh: '3.1 土地查冊四抽屜 (P-O-I-M) 與公司賣方雙重查冊',
    titleEn: '3.1 Land Search Structure (P-O-I-M) & Corporate Vendor',
    capRef: 'Cap. 128 Land Registration Ordinance',
    memoryHookZh: {
      title: 'P - O - I - M 四個抽屜與公司賣方雙重查冊',
      imageConcept: '四個抽屜的檔案櫃 (P-O-I-M)，旁邊放著第二個小檔案櫃標註着「若賣方為公司，請同時打開這一個」。',
      desc: 'P (Property 物業資料) -> O (Owner 業主資料) -> I (Incumbrances 負擔欄) -> M (Memorial 擬註冊契據)。公司賣方：土地註冊處 + 公司註冊處雙重查冊！'
    },
    memoryHookEn: {
      title: 'P-O-I-M Drawers & Two-Search Corporate Rule',
      desc: 'P (Property), O (Owner), I (Incumbrances), M (Memorial). Corporate vendor: Land Registry AND Companies Registry search!'
    },
    scenarioZh: '賣方為私人有限公司。代理僅於土地註冊處查冊，是否足夠確認該公司物業所有的按揭負擔？',
    scenarioEn: 'Vendor is a private limited company. Is a Land Registry search alone sufficient to verify all charges on the property?',
    verifiedNotesZh: [
      '✓ 土地登記冊四抽屜 (P-O-I-M)：物業資料 (Property)、業主資料 (Owner)、物業負擔欄 (Incumbrances)、等待註冊契據 (Memorial)。',
      '✓ 公司賣方 (Corporate Vendor)：查核按揭或押記，必須做土地註冊處 AND 公司註冊處 (Companies Registry) 雙重查冊！公司章程 (M&A) 或商業登記 (BR) 均不會顯示按揭。',
      '✓ 入伙紙 (Occupation Permit) 記載單位的「擬定用途」(Permitted User)，「不記載」實用面積或總樓面面積。',
      '✓ 大廈公契 (DMC) 記載不可分割份數 (Undivided Shares)、公用地方 (Common Areas) 及管理費分攤比例。'
    ],
    verifiedNotesEn: [
      '✓ Land Register 4 drawers (P-O-I-M): Property, Owner, Incumbrances, Memorials pending registration.',
      '✓ Corporate Vendor: MUST search Land Registry AND Companies Registry to verify charges. M&A or BR will NOT show charges.',
      '✓ Occupation Permit gives "Permitted User" of units; DOES NOT give saleable area or gross floor area.',
      '✓ DMC sets out undivided shares, common areas, and management fee liabilities.'
    ],
    detailedLawNotesZh: [
      '1. 依據《土地註冊條例》(Cap. 128)，香港實行契據註冊制度，土地登記冊不保證業權無瑕疵。',
      '2. 若業主為有限公司，公司的浮動押記 (Floating Charge) 或固定押記須於公司註冊處查閱 Statement of Particulars of Charge 方可確認。'
    ],
    detailedLawNotesEn: [
      '1. Under Cap. 128 deeds registration system, land registers do not guarantee clear title.',
      '2. Charges over company vendors require searching the Companies Registry for Statement of Particulars of Charge.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「公司賣方的商業登記證或公司章程會顯示其物業按揭負擔」— 錯誤！必須做公司註冊處押記查冊。',
      '⚠ 考官陷阱：宣稱「入伙紙會列出物業的實用面積或總樓面面積」— 錯誤！實用面積須由差餉物業估價署獲取。'
    ],
    trapsEn: [
      '⚠ Trap: Claims Business Registration or M&A reveals company mortgages — FALSE!',
      '⚠ Trap: Claims Occupation Permit shows saleable area — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫土地查冊四抽屜 (P-O-I-M) 分別代表什麼。',
      '□ 公司賣方需進行哪兩個查冊？'
    ],
    retrievalQuestionsEn: [
      '□ Name the 4 drawers of a land search (P-O-I-M).',
      '□ Name the 2 searches required for a company vendor.'
    ],
    quiz: {
      questionZh: '若需要獲取住宅物業的官方「實用面積」(Saleable Area) 以填寫 Form 1，正確的資料來源為何？',
      questionEn: 'Which is the correct official source to obtain the Saleable Area of a property for Form 1?',
      optionsZh: [
        '建築物入伙紙 (Occupation Permit)',
        '大廈公契 (Deed of Mutual Covenant)',
        '差餉物業估價署的「物業資訊網」(Property Information Online)',
        '業權轉讓契 (Assignment)'
      ],
      optionsEn: [
        'Occupation Permit',
        'Deed of Mutual Covenant (DMC)',
        'Rating and Valuation Department\'s "Property Information Online"',
        'Assignment Deed'
      ],
      correctIndex: 2,
      explanationZh: '正確答案為 C。實用面積官方法定來源為差餉物業估價署之物業資訊網 (RVD Property Information Online)。',
      explanationEn: 'Correct answer is C. Official saleable area data is obtained via RVD Property Information Online.'
    }
  },

  'm3-l2': {
    id: 'm3-l2',
    moduleId: 'module-3',
    moduleZh: 'Module 3：閱讀物業 (Reading the Property)',
    moduleEn: 'Module 3: Land Search, Buildings & Valuation',
    titleZh: '3.2 建築物條例、拆改結構牆規範與大廈公契 (DMC)',
    titleEn: '3.2 Buildings Ordinance, Structural Alterations & DMC',
    capRef: 'Cap. 123 Buildings Ordinance & Cap. 344',
    memoryHookZh: {
      title: '拆結構牆 = 委任認可人士 (AP) 向屋宇署 (BA) 呈交圖則',
      desc: '結構牆改動：委任 Authorized Person (AP) 依 Cap. 123 呈交圖則，由 Building Authority (BA) 批准。切勿聯絡地政總署或房屋署！'
    },
    memoryHookEn: {
      title: 'Structural Wall = AP Submits to Building Authority',
      desc: 'Structural work: Appoint Authorized Person (AP) under Cap. 123 to submit plans for Building Authority (BA) approval.'
    },
    scenarioZh: '業主擬拆除私人物業內的一面結構牆 (Structural Wall)，正確的法定程序為何？',
    scenarioEn: 'An owner plans to demolish a structural wall inside a private flat. What is the proper statutory procedure?',
    verifiedNotesZh: [
      '✓ 拆除結構牆程序：委任《建築物條例》(Cap. 123) 下的「認可人士」(Authorised Person) 繪製及呈交圖則，由「屋宇署署長」(Building Authority) 批准。',
      '✓ 車庫 (Garage) 擅自改作商店用途：屋宇署可發出命令要求中止用途，且該未經批准的用途改動會導致物業業權出現瑕疵 (Defective Title)。',
      '✓ 租客代理面對有多重押記及建築令的物業，應要求業主取得第一按揭銀行及第二押記人的同意書方可簽租約。'
    ],
    verifiedNotesEn: [
      '✓ Demolishing structural wall: Appoint Authorised Person (AP) under Cap. 123 to submit plans for Building Authority approval.',
      '✓ Unauthorized change from garage to shop: Building Authority may order discontinuation, rendering title defective.',
      '✓ Tenant\'s agent handling encumbered flat should insist on landlord obtaining consent from 1st mortgagee & 2nd charge holder.'
    ],
    detailedLawNotesZh: [
      '1. Cap. 123 規範建築物安全。未經批准改動結構牆屬違法，屋宇署可發出 S.24 命令要求還原。',
      '2. 大廈公契 (DMC) 規範不可分割份數及管理費責任。'
    ],
    detailedLawNotesEn: [
      '1. Cap. 123 governs structural safety. Unauthorized works trigger Section 24 removal orders by Building Authority.',
      '2. DMC governs undivided shares and management fee obligations.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「拆除結構牆只需向地政總署書面備案」— 錯誤！必須委任 AP 呈交屋宇署審批。'
    ],
    trapsEn: [
      '⚠ Trap: Claims demolishing structural wall requires written notification to Lands Dept only — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 業主擬拆除結構牆，須委任誰？向哪一個部門呈交圖則？'
    ],
    retrievalQuestionsEn: [
      '□ Who must be appointed to demolish a structural wall, and to which department are plans submitted?'
    ],
    quiz: {
      questionZh: '私人物業業主擬拆除室內結構牆，下列哪項是法律規定的正確步驟？',
      questionEn: 'Which is the correct statutory step for an owner intending to demolish a structural wall in a private flat?',
      optionsZh: [
        '向地政總署發出書面通知即可',
        '委任《建築物條例》下的認可人士呈交圖則供屋宇署審批',
        '取得房屋署署長的事先書面批准',
        '只要聘請合格裝修工人即可施工'
      ],
      optionsEn: [
        'Notify Lands Department in writing',
        'Appoint an Authorised Person under Buildings Ordinance to submit plans for Building Authority approval',
        'Obtain prior written permission from Housing Department',
        'Hire qualified decoration workers directly'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。必須委任認可人士 (AP) 呈交屋宇署 (BA) 審批。',
      explanationEn: 'Correct answer is B. Must appoint an Authorised Person to submit plans to the Building Authority.'
    }
  },

  'm3-l3': {
    id: 'm3-l3',
    moduleId: 'module-3',
    moduleZh: 'Module 3：閱讀物業 (Reading the Property)',
    moduleEn: 'Module 3: Land Search, Buildings & Valuation',
    titleZh: '3.3 物業估值四大方法 (CIRP) 與地盤估值 (CRD)',
    titleEn: '3.3 Property Valuation (CIRP) & Site Methods (CRD)',
    capRef: 'Level 1 Valuation Principles',
    memoryHookZh: {
      title: 'CIRP 四大物業估值 + CRD 三大地盤估值',
      desc: 'CIRP: Comparison (普通住宅), Investment (出租物業), Profits (酒店/戲院), Replacement (教堂/特殊物業)。地盤 CRD: Comparative, Residual, DCF。'
    },
    memoryHookEn: {
      title: 'CIRP Property Methods & CRD Site Methods',
      desc: 'CIRP: Comparison (flats), Investment (let property), Profits (hotels/cinemas), Replacement (churches/schools). Site CRD: Comparative, Residual, DCF.'
    },
    scenarioZh: '估值四大方法 (CIRP) 分別適用於什麼物業？估值報告通常包含哪些內容？',
    scenarioEn: 'What are the 4 property valuation methods (CIRP) and what does a valuation report usually contain?',
    verifiedNotesZh: [
      '✓ 四大估值法 (CIRP)：比較法 (Comparison - 普通住宅)、投資法 (Investment - 出租物業)、利潤法 (Profits - 酒店/戲院)、重置成本法 (Replacement - 教堂/特殊物業)。',
      '✓ 市場比較法最可靠條件：市場有持續及大量同類物業成交，且物業具高度物理相似性。',
      '✓ 估值報告通常包含：估值日期 (Date of Valuation) 及物業估值金額。不包含按揭利率水平或估值師收費。'
    ],
    verifiedNotesEn: [
      '✓ 4 Valuation methods (CIRP): Comparison (flats), Investment (let property), Profits (hotels/cinemas), Replacement (special purpose).',
      '✓ Market Comparison is most reliable with steady, substantial transactions of highly similar properties.',
      '✓ Valuation report contains: Valuation Date and Valuation Amount. Excludes mortgage rates and valuer\'s fee.'
    ],
    detailedLawNotesZh: [
      '1. Part 6 為 Level 1 概念 (EAQE 專有)。掌握 CIRP 匹配物業類型即可輕鬆取分。'
    ],
    detailedLawNotesEn: [
      '1. Part 6 is Level 1 Awareness (EAQE only). Match CIRP method to property type.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「估值報告一般會註明適用的按揭利率及估值師費用」— 錯誤！報告不包含此兩項。'
    ],
    trapsEn: [
      '⚠ Trap: Claims valuation reports state mortgage interest rates and valuation fees — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫 CIRP 四大估值方法各自適用的物業類型。'
    ],
    retrievalQuestionsEn: [
      '□ Name the four valuation methods (CIRP) and property types each suits.'
    ],
    quiz: {
      questionZh: '教堂 (Church) 或學校 (School) 等無公開成交且不具營利性質的物業，最適合使用哪種估值方法？',
      questionEn: 'Which valuation method is best suited for non-profit properties with no market transactions, such as a church or school?',
      optionsZh: ['市場比較法 (Direct Comparison)', '利潤法 (Profits Approach)', '重置成本法 (Replacement Costs Approach)', '投資法 (Investment Approach)'],
      optionsEn: ['Direct Comparison Method', 'Profits Approach', 'Replacement Costs Approach', 'Investment Approach'],
      correctIndex: 2,
      explanationZh: '正確答案為 C。特殊物業無成交紀錄，適用重置成本法。',
      explanationEn: 'Correct answer is C. Special purpose properties apply Replacement Costs Approach.'
    }
  },

  'm3-l4': {
    id: 'm3-l4',
    moduleId: 'module-3',
    moduleZh: 'Module 3：閱讀物業 (Reading the Property)',
    moduleEn: 'Module 3: Land Search, Buildings & Valuation',
    titleZh: '3.4 統計數據與官方資訊系統 (差餉物業估價署 RVD)',
    titleEn: '3.4 Housing Statistics & Official RVD Information',
    capRef: 'Rating & Valuation Department (RVD)',
    memoryHookZh: {
      title: '四大部門四本帳簿 (差餉署 RVD 專管實用面積)',
      desc: '房屋署 (人口/公屋), 地政總署 (地契), 差餉物業估價署 RVD (實用面積/租金數據), 土地註冊處 (業權/登記檔案)。'
    },
    memoryHookEn: {
      title: '4 Departments, 4 Ledgers (RVD = Saleable Area)',
      desc: 'Housing Dept (population), Lands Dept (lease), RVD (saleable area & rental statistics), Land Registry (title & charges).'
    },
    scenarioZh: '填寫物業資料表 (Form 1) 中的「實用面積」(Saleable Area) 時，官方正確查詢管道為何？',
    scenarioEn: 'When completing Form 1 for Saleable Area, what is the correct official online service to consult?',
    verifiedNotesZh: [
      '✓ 查核 Form 1 實用面積 (Saleable Area) 的官方法定來源：差餉物業估價署的「物業資訊網」(Property Information Online)。',
      '✓ 入伙紙、大廈公契、轉讓契均「不是」獲取實用面積的正確官方途徑。',
      '✓ 土地註冊處提供買賣合約紀錄、物業平面圖及登記契約。'
    ],
    verifiedNotesEn: [
      '✓ Official source for Form 1 Saleable Area: Rating and Valuation Department\'s "Property Information Online".',
      '✓ Occupation Permit, DMC, and Assignment deeds are NOT correct official sources for saleable area.',
      '✓ Land Registry provides S&P records, building plans, and registered instruments.'
    ],
    detailedLawNotesZh: [
      '1. 利用官方資訊系統獲取準確數據。RVD 提供權威實用面積及租金統計。'
    ],
    detailedLawNotesEn: [
      '1. RVD provides authorized saleable area data and market statistics.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「大廈公契或轉讓契是獲取官方實用面積的正確途徑」— 錯誤！官方管道為 RVD 物業資訊網。'
    ],
    trapsEn: [
      '⚠ Trap: Claims DMC or Assignment is the official source for Saleable Area — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請指出獲取 Form 1 實用面積的官方網上服務名稱。'
    ],
    retrievalQuestionsEn: [
      '□ Name the official online service used to find Saleable Area for Form 1.'
    ],
    quiz: {
      questionZh: '填寫物業資料表 (Form 1) 時，獲取住宅物業「實用面積」的官方法定來源為何？',
      questionEn: 'Which is the official source to obtain Saleable Area when completing Form 1?',
      optionsZh: [
        '差餉物業估價署「物業資訊網」(Property Information Online)',
        '建築物入伙紙 (Occupation Permit)',
        '大廈公契 (Deed of Mutual Covenant)',
        '地政總署地契 (Government Lease)'
      ],
      optionsEn: [
        'Rating and Valuation Department\'s "Property Information Online"',
        'Occupation Permit',
        'Deed of Mutual Covenant',
        'Lands Department Government Lease'
      ],
      correctIndex: 0,
      explanationZh: '正確答案為 A。差餉物業估價署物業資訊網為官方來源。',
      explanationEn: 'Correct answer is A. RVD Property Information Online is the official source.'
    }
  }
};