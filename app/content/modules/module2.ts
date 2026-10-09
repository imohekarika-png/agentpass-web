// app/content/modules/module2.ts
import { FullLesson } from '../types';

export const MODULE_2_LESSONS: Record<string, FullLesson> = {
  'm2-l1': {
    id: 'm2-l1',
    moduleId: 'module-2',
    moduleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    moduleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    titleZh: '2.1 法律三大來源與代理人權限 (O-A-C-I 合約要件)',
    titleEn: '2.1 Sources of Law & Contract Formation (O-A-C-I)',
    capRef: 'Common Law Principles',
    memoryHookZh: {
      title: '合約成立 O-A-C-I 四大要件',
      imageConcept: '四根大柱子支撐著「合約」屋頂，草地上躺著一根沒用的第五根柱子 (爭議解決條款)。',
      desc: 'Offer (要約) + Acceptance (承諾) + Consideration (對價) + Intention (法律意圖)。 dispute resolution 條款不是成立要件！'
    },
    memoryHookEn: {
      title: 'Contract Formation O-A-C-I Pillars',
      imageConcept: 'Four main pillars holding up a contract roof, with dispute resolution lying unused on the lawn.',
      desc: 'Offer, Acceptance, Consideration, Intention. A dispute resolution clause is NOT a formation requirement.'
    },
    scenarioZh: '買賣雙方擬訂立臨時買賣合約，代理需確認合約成立的法定要件，並了解爭議解決條款是否為強制性成立要件。',
    scenarioEn: 'Vendor and purchaser agree on PASP terms. Agent must verify essential contract formation elements.',
    verifiedNotesZh: [
      '✓ 合約成立四大要件 (O-A-C-I)：要約 (Offer)、承諾 (Acceptance)、對價/代價 (Consideration)、建立法律關係的意圖 (Intention)。',
      '✓ 「如何解決合約爭議的協議」(Dispute resolution clause) 並非合約成立的要件。',
      '✓ 代理權限分為明示權限 (Express authority) 及隱含權限 (Implied authority)。'
    ],
    verifiedNotesEn: [
      '✓ 4 Contract formation elements: Offer, Acceptance, Consideration, Intention to create legal relations.',
      '✓ An agreement on how contractual disputes are to be resolved is NOT required to form a contract.',
      '✓ Agency authority comprises express authority and implied authority.'
    ],
    detailedLawNotesZh: [
      '1. 普通法 (Common Law)、衡平法 (Equity) 與制定法 (Statute Law) 構成香港法律制度三大來源。',
      '2. 在地產代理情境中，明示權限來自簽署的法定地產代理協議 (Forms 3-6)；隱含權限則包括執行常規代理工作所需的合理權限。'
    ],
    detailedLawNotesEn: [
      '1. Three sources of law: Common Law, Equity, and Statute Law form Hong Kong\'s legal framework.',
      '2. Express authority derives from signed statutory forms (Forms 3-6); implied authority covers reasonable customary actions.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「合約必須包含如何解決爭議的條款方可生效」— 錯誤！爭議解決條款非成立要件。'
    ],
    trapsEn: [
      '⚠ Trap: Claims an agreement on dispute resolution is required to form a valid contract — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請不看講義默寫合約成立四大要件 (O-A-C-I)，並指出哪一個常見干擾項不屬於成立要件。',
      '□ 請舉例說明地產代理的明示權限與隱含權限。'
    ],
    retrievalQuestionsEn: [
      '□ Name the four contract formation requirements and the false fifth element.',
      '□ Give an example of express authority and implied authority in real estate practice.'
    ],
    quiz: {
      questionZh: '根據普通法，下列哪項「不是」成立有效買賣合約的必要條件？',
      questionEn: 'Under common law, which of the following is NOT required to form a valid contract?',
      optionsZh: ['要約 (Offer)', '對價 (Consideration)', '爭議解決機制的協議', '建立法律關係的意圖'],
      optionsEn: ['Offer', 'Consideration', 'Agreement on dispute resolution', 'Intention to create legal relations'],
      correctIndex: 2,
      explanationZh: '正確答案為 C。爭議解決機制協議並非合約成立要素。',
      explanationEn: 'Correct answer is C. A dispute resolution clause is not required for contract formation.'
    }
  },

  'm2-l2': {
    id: 'm2-l2',
    moduleId: 'module-2',
    moduleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    moduleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    titleZh: '2.2 合約、失實陳述與疏忽 (「現狀 As Is」條款真義)',
    titleEn: '2.2 Misrepresentation & "As Is" Clause Scope',
    capRef: 'Misrepresentation Ordinance (Cap. 284)',
    memoryHookZh: {
      title: '現狀條款 = 簽約當日之物理照片',
      imageConcept: '一張帶日期的相片貼在臨約上，買家接受物理狀況，但相片不保證違建合法或免除現有租款。',
      desc: '「現狀 (As Is)」僅代表買家接受簽約時的物理狀況，不等於賣方保證改建符合建築物條例，亦不代表買家受現有租約約束！'
    },
    memoryHookEn: {
      title: '"As Is" = Physical Dated Photo',
      desc: '"As is" means accepts physical state on signing date only. Does NOT warrant Building Ordinance compliance or bind to existing tenancy.'
    },
    scenarioZh: '臨約中訂明「現狀 (As Is)」購入物業，賣方否認違建責任，或宣稱買家必須承擔現有租約，這是否符合法律解釋？',
    scenarioEn: 'A PASP contains an "as is" clause. Vendor claims all alterations comply with Buildings Ordinance and buyer takes subject to tenancy.',
    verifiedNotesZh: [
      '✓ 「現狀 (As Is)」條款指買家接受物業於簽臨約時之物理狀況 (Physical state and condition)。',
      '✓ 現狀條款「不代表」賣方保證所有改建符合《建築物條例》(Cap. 123)。',
      '✓ 現狀條款「不代表」買家接受或受限於現有的租賃協議 (Subsisting tenancy)。',
      '✓ 代理為誘使買家簽約而虛構有其他買家出更高價，屬失實陳述 (Misrepresentation) 並違反操守。'
    ],
    verifiedNotesEn: [
      '✓ "As is" clause means purchaser accepts physical state and condition at the time of agreement.',
      '✓ "As is" DOES NOT warrant that property alterations comply with the Buildings Ordinance.',
      '✓ "As is" DOES NOT mean purchaser accepts to be bound by an existing tenancy agreement.',
      '✓ Falsely claiming higher competing offers to induce signing constitutes misrepresentation and ethics breach.'
    ],
    detailedLawNotesZh: [
      '1. 依據《失實陳述條例》(Cap. 284)，因依賴失實陳述而簽合約的一方可要求撤銷合約 (Rescission) 及索償。',
      '2. 「現狀」買賣不能免除賣方及代理隱瞞重大業權瑕疵或做欺詐性陳述的法律責任。'
    ],
    detailedLawNotesEn: [
      '1. Under Cap. 284 Misrepresentation Ordinance, induced parties may seek contract rescission and damages.',
      '2. "As is" terms do not shield vendors or agents from liability for fraudulent non-disclosure.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「以現狀買賣即代表賣方保證物業無任何違例建築物」— 錯誤！現狀條款不作此項保證。',
      '⚠ 考官陷阱：宣稱「現狀買賣會自動使買家受現有租約約束」— 錯誤！租約必須於合約明文訂明。'
    ],
    trapsEn: [
      '⚠ Trap: Claims "as is" warrants that all property alterations comply with Buildings Ordinance — FALSE!',
      '⚠ Trap: Claims "as is" automatically binds buyer to existing tenancies — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫「現狀 (As Is)」條款的一個真實法律效果，以及兩個常考的錯誤效果。'
    ],
    retrievalQuestionsEn: [
      '□ State the 1 true effect of an "as is" clause and 2 false effects often assumed by candidates.'
    ],
    quiz: {
      questionZh: '買賣合約中包含「現狀 (As Is)」條款，下列哪項是該條款的真正法律效果？',
      questionEn: 'Which is the true legal effect of an "as is" clause in a sales agreement?',
      optionsZh: [
        '賣方保證所有改建均符合《建築物條例》',
        '買方接受物業在簽立合約時的物理狀況',
        '買方自動受物業現有的租約約束',
        '賣方免除所有隱瞞業權瑕疵的法律責任'
      ],
      optionsEn: [
        'Vendor warrants that all alterations comply with the Buildings Ordinance',
        'Purchaser accepts the property in such physical state as at the date of agreement',
        'Purchaser is automatically bound by any subsisting tenancy agreement',
        'Vendor is shielded from all title defect liabilities'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。「現狀」僅指簽約當時的物理狀態。',
      explanationEn: 'Correct answer is B. "As is" pertains strictly to the physical state on the signing date.'
    }
  },

  'm2-l3': {
    id: 'm2-l3',
    moduleId: 'module-2',
    moduleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    moduleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    titleZh: '2.3 相關條例三大家族 (交易、房屋及行為守則)',
    titleEn: '2.3 Ordinance Families (Deal, Home, Behavior)',
    capRef: 'Cap. 201, 283, 486, 621',
    memoryHookZh: {
      title: '三大家族 (交易契據、房屋資助、行為法規)',
      desc: '家族1【交易】: Cap. 219物業轉讓, Cap. 128土地註冊, Cap. 621一手樓。家族2【房屋】: Cap. 283居屋。家族3【行為】: Cap. 201防貪, Cap. 284失實陳述, Cap. 486私隱。'
    },
    memoryHookEn: {
      title: 'Three Ordinance Families',
      desc: 'Family 1 (Deal): Cap. 219, Cap. 128, Cap. 621. Family 2 (Home): Cap. 283 Housing. Family 3 (Behavior): Cap. 201, Cap. 284, Cap. 486.'
    },
    scenarioZh: '代理應如何歸類物業交易法規？一手住宅的實用面積計算標準為何？',
    scenarioEn: 'How to classify property ordinances and determine saleable area under Cap. 621 First-hand Sales Ordinance?',
    verifiedNotesZh: [
      '✓ 一手住宅 Cap. 621「實用面積」(Saleable Area) 包含露台 (Balcony) 及工作平台 (Utility Platform)，排除窗台 (Bay Window) 及閣樓 (Cockloft)。',
      '✓ 毗鄰未開發土地的許可用途：應查閱 Outline Zoning Plan (分區計劃大綱圖) 或 Government Lease，而非毗鄰物業的土地查冊。',
      '✓ 個人資料私隱 (Cap. 486)：影印客戶身份證副本給保險經紀朋友或遺失副本，均違反私隱條例保障原則。'
    ],
    verifiedNotesEn: [
      '✓ Saleable area under Cap. 621 includes balconies and utility platforms; EXCLUDES bay windows and cocklofts.',
      '✓ Permitted user of adjacent vacant land: Check Outline Zoning Plan or Government Lease, NOT property land search.',
      '✓ Privacy Ordinance (Cap. 486): Sharing ID card copies with insurance brokers or losing copies breaches data principles.'
    ],
    detailedLawNotesZh: [
      '1. 防貪條例 (Cap. 201) 第9條禁止代理未經主事人同意私下收取第三者的佣金或利益。',
      '2. 一手住宅銷售條例 (Cap. 621) 嚴格規範宣傳單張及實用面積計算方法。'
    ],
    detailedLawNotesEn: [
      '1. Prevention of Bribery Ordinance Section 9 forbids secret commissions without principal consent.',
      '2. Cap. 621 enforces strict standards on sales brochures and saleable area calculations.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「一手樓實用面積包含窗台及閣樓面積」— 錯誤！窗台及閣樓均排除在實用面積外。'
    ],
    trapsEn: [
      '⚠ Trap: Claims saleable area includes floor area of bay windows and cocklofts — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請指出 Cap. 621 下實用面積包含哪兩個部分，排除哪兩個部分？'
    ],
    retrievalQuestionsEn: [
      '□ State the 2 features included and 2 features excluded from saleable area under Cap. 621.'
    ],
    quiz: {
      questionZh: '根據《一手住宅物業銷售條例》(Cap. 621)，下列哪項包含在「實用面積」內？',
      questionEn: 'Under Cap. 621, which of the following is INCLUDED in the Saleable Area?',
      optionsZh: ['窗台 (Bay window)', '閣樓 (Cockloft)', '露台 (Balcony)', '空調機房'],
      optionsEn: ['Bay window', 'Cockloft', 'Balcony', 'Air-conditioning plant room'],
      correctIndex: 2,
      explanationZh: '正確答案為 C。實用面積包含露台及工作平台，排除窗台及閣樓。',
      explanationEn: 'Correct answer is C. Saleable area includes balconies and utility platforms.'
    }
  },

  'm2-l4': {
    id: 'm2-l4',
    moduleId: 'module-2',
    moduleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    moduleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    titleZh: '2.4 業權證明 (15 年業權鏈) 與訂金託管 (NEG-CHG-CONF)',
    titleEn: '2.4 Title Proof (15-Yr Chain) & Stakeholding (NEG-CHG-CONF)',
    capRef: 'Cap. 219 Conveyancing Ordinance',
    memoryHookZh: {
      title: '15 年業權鏈 + NEG - CHG - CONF 託管法則',
      imageConcept: '業權契據上插著三面紅旗：NEGative equity, CHarGing order, CONFirmor sale。',
      desc: '業權證明：政府地契 + 15 年業權鏈 (由 Assignment 等為起點)。託管三情況：NEGative equity, CHarGing order, CONFirmor 必須交律師樓託管 (Stakeholder)！'
    },
    memoryHookEn: {
      title: '15-Year Chain & NEG - CHG - CONF Stakeholding',
      desc: 'Proof of Title: Gov lease + 15 years title chain starting from Assignment. Stakeholder deposit triggers: NEGative equity, CHarGing order, CONFirmor sale.'
    },
    scenarioZh: '賣方物業存在負資產按揭、押記令 (Charging Order) 或屬確認人 (Confirmor) 轉售。代理應如何指引買家處置訂金？',
    scenarioEn: 'Property is in negative equity, subject to a charging order, or sold by a confirmor. How should the agent advise deposit handling?',
    verifiedNotesZh: [
      '✓ 證明良好業權 (Good Title)：賣方須提供政府地契及至少 15 年前的業權契據 (以 Assignment、Mortgage by Assignment 或 Legal Charge 為起點)。',
      '✓ 訂金託管三大觸發條件 (NEG-CHG-CONF)：負資產按揭、存在押記令 (Charging Order)、確認人 (Confirmor) 轉售。',
      '✓ 買方違約時，賣方可沒收訂金及解約重售，但「不得」向土地註冊處登記押記備忘錄 (Memorandum of Charge)。'
    ],
    verifiedNotesEn: [
      '✓ Proof of Title: Gov lease + title root commencing at least 15 years back starting with an Assignment or Legal Charge.',
      '✓ Stakeholding deposit triggers (NEG-CHG-CONF): Negative equity mortgage, Charging Order, Confirmor sub-sale.',
      '✓ If purchaser defaults, vendor may forfeit deposit and resell; vendor CANNOT register a Memorandum of Charge.'
    ],
    detailedLawNotesZh: [
      '1. 依據《物業轉讓及物業條例》(Cap. 219) 第13條，業權證明追溯期為 15 年。起點文書必須處理該物業的全部權益。',
      '2. 遇 NEG-CHG-CONF 狀況，將訂金交由律師樓作為託管人 (Stakeholder) 能防止賣方捲款離場。'
    ],
    detailedLawNotesEn: [
      '1. Cap. 219 Section 13 mandates a 15-year title chain starting with an instrument dealing with the whole estate.',
      '2. Stakeholding deposit by solicitors under NEG-CHG-CONF protects buyer funds from insolvent vendors.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「業權證明須追溯 10 年或 20 年」或「以入伙紙為起點」— 錯誤！標準為 15 年並以 Assignment 為起點。',
      '⚠ 考官陷阱：宣稱「買方違約時，賣方可在土地註冊處登記押記備忘錄」— 錯誤！賣方無權登記此備忘錄。'
    ],
    trapsEn: [
      '⚠ Trap: Claims title proof requires 10 or 20 years, or starts at Occupation Permit — FALSE!',
      '⚠ Trap: Claims vendor can register a Memorandum of Charge on buyer default — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫業權證明的完整句型：「政府地契 + 不少於 ___ 年前的業權證明，以 ___ 為起點」。',
      '□ 哪三種情況下應建議買家將訂金交律師樓作為託管人 (NEG-CHG-CONF)？'
    ],
    retrievalQuestionsEn: [
      '□ Complete sentence: Gov lease + title proof extending not less than ___ years back starting with an ___.',
      '□ Name the 3 stakeholder triggers (NEG-CHG-CONF).'
    ],
    quiz: {
      questionZh: '下列哪種情況下，地產代理「無須」建議買家將訂金交予律師樓作為託管人 (Stakeholder)？',
      questionEn: 'In which scenario is an agent NOT required to advise paying the deposit to solicitors as stakeholders?',
      optionsZh: [
        '物業設有按揭且處於負資產 (Negative Equity)',
        '物業已被土地註冊處登記押記令 (Charging Order)',
        '物業由確認人 (Confirmor) 以轉售合約形式出售',
        '物業連同現有租約 (Existing Tenancy) 一同出售'
      ],
      optionsEn: [
        'Property is under mortgage and in negative equity',
        'Property is subject to a registered Charging Order',
        'Property is sold by a confirmor via sub-sale agreement',
        'Property is sold subject to an existing tenancy'
      ],
      correctIndex: 3,
      explanationZh: '正確答案為 D。連同現有租約出售不屬於 NEG-CHG-CONF 法定三種託管情況之一。',
      explanationEn: 'Correct answer is D. Existing tenancy is not one of the 3 stakeholder trigger conditions.'
    }
  },

  'm2-l5': {
    id: 'm2-l5',
    moduleId: 'module-2',
    moduleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    moduleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    titleZh: '2.5 物業相關稅項 (印花稅計算與五大稅種)',
    titleEn: '2.5 Property Taxes & Stamp Duty Calculation',
    capRef: 'Cap. 117 Stamp Duty Ordinance',
    memoryHookZh: {
      title: '五隻手指五大稅 + 租約印花稅三步曲',
      desc: '五稅：印花稅 (Stamp)、物業稅 (Property)、地租 (Gov Rent)、差餉 (Rates)、利得稅 (Profits)。租約計算：計算平均年租 -> 向上取整至百位 -> 套用稅率。'
    },
    memoryHookEn: {
      title: 'Five Taxes on Five Fingers & Tenancy Recipe',
      desc: '5 Taxes: Stamp Duty, Property Tax, Gov Rent, Rates, Profits Tax. Calculation: Average yearly rent -> Round UP to $100 -> Apply rate.'
    },
    scenarioZh: '租約期為 5 年，月租 $100,000，首 2 個月免租，如何計算應繳納的印花稅金額？',
    scenarioEn: 'A 5-year lease at $100,000/month with 2 months rent-free. How is stamp duty calculated?',
    verifiedNotesZh: [
      '✓ 五大物業稅項：印花稅、物業稅、地租、差餉、利得稅。',
      '✓ 租約印花稅率：不超 1 年 0.25%；1 至 3 年 0.5%；超 3 年 1%。(以年租或平均年租計算，向上取整至百位)。',
      '✓ 免租期 (Rent-free period) 會拉低平均年租；續租權條款 (Option to renew) 需留意是否影響適用稅率期。'
    ],
    verifiedNotesEn: [
      '✓ 5 Property Taxes: Stamp Duty, Property Tax, Government Rent, Rates, Profits Tax.',
      '✓ Tenancy stamp duty rates: <=1 yr 0.25%; >1-3 yrs 0.5%; >3 yrs 1% of yearly/average yearly rent (rounded up to $100).',
      '✓ Rent-free periods reduce average yearly rent.'
    ],
    detailedLawNotesZh: [
      '1. 依據《印花稅條例》(Cap. 117)，租約及臨約須於簽立後 30 天內完成蓋印。',
      '2. 逾期繳納印花稅面臨最高可達印花稅款 10 倍的罰款。'
    ],
    detailedLawNotesEn: [
      '1. Under Cap. 117 Stamp Duty Ordinance, instruments must be stamped within 30 days.',
      '2. Late stamping incurs maximum penalties up to 10 times the duty.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「租約印花稅以最高月租乘以 12 個月計算，不考慮免租期」— 錯誤！必須計算整個租期內的平均年租。'
    ],
    trapsEn: [
      '⚠ Trap: Claims tenancy stamp duty ignores rent-free periods — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫物業相關的五大稅種名稱。'
    ],
    retrievalQuestionsEn: [
      '□ Name the five property-related taxes.'
    ],
    quiz: {
      questionZh: '買賣住宅物業之臨時協議送交印花稅署蓋印之法定期限為簽立後多少天內？',
      questionEn: 'What is the statutory deadline for stamping a residential PASP after execution?',
      optionsZh: ['7 天內', '14 天內', '30 天內', '60 天內'],
      optionsEn: ['Within 7 days', 'Within 14 days', 'Within 30 days', 'Within 60 days'],
      correctIndex: 2,
      explanationZh: '正確答案為 C。簽立後法定期限為 30 天內。',
      explanationEn: 'Correct answer is C. Statutory limit is within 30 days.'
    }
  }
};