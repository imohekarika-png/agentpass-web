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
      imageConcept: '想像四根大柱子支撐著「合約」的屋頂，草地上躺著一根沒用的第五根柱子。',
      desc: 'Offer (要約) + Acceptance (承諾) + Consideration (對價) + Intention (法律意圖)。 dispute resolution 條款不是成立要件！'
    },
    memoryHookEn: {
      title: 'Contract Formation O-A-C-I Pillars',
      imageConcept: 'Four main pillars holding up a contract roof, with dispute resolution lying unused.',
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
  'm2-l4': {
    id: 'm2-l4',
    moduleId: 'module-2',
    moduleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    moduleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    titleZh: '2.4 業權證明 (15 年業權鏈) 與訂金託管 (NEG-CHG-CONF)',
    titleEn: '2.4 Title Proof (15-Yr Chain) & Stakeholding (NEG-CHG-CONF)',
    capRef: 'Cap. 219 Conveyancing and Property Ordinance',
    scenarioZh: '賣方物業存在負資產按揭、押記令 (Charging Order) 或屬確認人 (Confirmor) 轉售。代理應如何指引買家處置訂金？',
    scenarioEn: 'Property is in negative equity, subject to a charging order, or sold by a confirmor. How should the agent advise deposit handling?',
    memoryHookZh: {
      title: '15 年業權鏈 + NEG - CHG - CONF 託管法則',
      imageConcept: '業權契據上插著三面紅旗：NEGative equity, CHarGing order, CONFirmor sale。',
      desc: '業權證明：政府地契 + 15 年業權鏈 (以 Assignment 等為起點)。託管三情況：NEGative equity, CHarGing order, CONFirmor 必須交律師樓託管 (Stakeholder)！'
    },
    memoryHookEn: {
      title: '15-Year Chain & NEG - CHG - CONF Stakeholding',
      desc: 'Proof of Title: Gov lease + 15 years title chain starting from Assignment. Stakeholder deposit triggers: NEGative equity, CHarGing order, CONFirmor sale.'
    },
    keyTakeawaysZh: [
      '✓ 證明良好業權 (Good Title)：賣方須提供政府地契及至少 15 年前的業權契據 (以 Assignment、Mortgage by Assignment 或 Legal Charge 為起點)。',
      '✓ 訂金託管三大觸發條件 (NEG-CHG-CONF)：負資產按揭、存在押記令 (Charging Order)、確認人 (Confirmor) 轉售。',
      '✓ 「現狀 (As Is)」條款：買家僅接受簽臨約當日之物理狀況，不代表認可違建或承擔現有租約。',
      '✓ 買方違約時，賣方可沒收訂金及解約重售，但「不得」向土地註冊處登記押記備忘錄 (Memorandum of Charge)。'
    ],
    verifiedNotesEn: [
      '✓ Proof of Title: Gov lease + title root commencing at least 15 years back starting with an Assignment or Legal Charge.',
      '✓ Stakeholding deposit triggers (NEG-CHG-CONF): Negative equity mortgage, Charging Order, Confirmor sub-sale.',
      '✓ "As is" clause: Buyer accepts physical state on signing date; does NOT warrant Building Ordinance compliance.',
      '✓ If purchaser defaults, vendor may forfeit deposit and resell; vendor CANNOT register a Memorandum of Charge.'
    ],
    detailedLawNotesZh: [
      '1. 依據《物業轉讓及物業條例》(Cap. 219) 第13條，業權證明追溯期為 15 年。起點文書必須處理該物業的全部權益 (Whole estate and interest)。',
      '2. 遇 NEG-CHG-CONF 狀況，將訂金交由律師樓作為託管人 (Stakeholder) 能防止賣方捲款離場。',
      '3. 未補地價居屋 (HOS) 於公開市場出售，必須於買賣合約 (ASP) 中訂明須於 28 天內向房屋署補地價。'
    ],
    detailedLawNotesEn: [
      '1. Cap. 219 Section 13 mandates a 15-year title chain starting with an instrument dealing with the whole estate.',
      '2. Stakeholding deposit by solicitors under NEG-CHG-CONF protects buyer funds from insolvent vendors.',
      '3. Unpaid HOS flats require the ASP to stipulate premium payment within 28 days.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「業權證明須追溯 10 年或 20 年」或「以入伙紙為起點」— 錯誤！標準為 15 年並以 Assignment 為起點。',
      '⚠ 考官陷阱：宣稱「買方違約時，賣方可在土地註冊處登記押記備忘錄」— 錯誤！賣方無權登記此備忘錄。'
    ],
    trapsEn: [
      '⚠ Trap: Claims title proof requires 10 or 20 years, or starts at Occupation Permit — FALSE! Strictly 15 years at Assignment.',
      '⚠ Trap: Claims vendor can register a Memorandum of Charge on buyer default — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫業權證明的完整句型：「政府地契 + 不少於 ___ 年前的業權證明，以 ___ 為起點」。',
      '□ 哪三種情況下應建議買家將訂金交律師樓作為託管人 (NEG-CHG-CONF)？哪兩種常考情況不屬於此列？'
    ],
    retrievalQuestionsEn: [
      '□ Complete sentence: Gov lease + title proof extending not less than ___ years back starting with an ___.',
      '□ Name the 3 stakeholder triggers (NEG-CHG-CONF) and 2 situations that are not triggers.'
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
  }
};