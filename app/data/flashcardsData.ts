// app/data/flashcardsData.ts

export interface Flashcard {
  id: number;
  category: 'Cap. 511' | 'Cap. 7' | 'Forms 1-6' | 'Land Search' | 'Code of Ethics' | 'Stamp Duty & Law';
  topicZh: string;
  topicEn: string;
  frontZh: string;
  frontEn: string;
  backZh: string;
  backEn: string;
  statuteRef?: string;
}

export const FLASHCARDS_DATA: Flashcard[] = [
  // Cap. 511 Licensing Rules
  {
    id: 1,
    category: 'Cap. 511',
    topicZh: '營業地址變更通知',
    topicEn: 'Change of Business Address',
    frontZh: '持牌地產代理/營業員更換主要營業地址後，須於多少天內書面通知監管局 (EAA)？',
    frontEn: 'Within how many days must a licensee notify EAA in writing after changing principal place of business?',
    backZh: '30 天內 (Cap. 511 s.40)。未有通知屬違法行為，可被處以罰款或紀律處分。',
    backEn: 'Within 30 days (Cap. 511 s.40). Failure to comply is an offense subject to fine/disciplinary action.',
    statuteRef: 'Cap. 511 s.40'
  },
  {
    id: 2,
    category: 'Cap. 511',
    topicZh: '牌照展示規定',
    topicEn: 'Display of Licence',
    frontZh: '持牌地產代理公司必須在每個營業地點的顯眼位置展示甚麼？',
    frontEn: 'What must a licensed estate agency exhibit prominently at every place of business?',
    backZh: '地產代理牌照 (Estate Agent Licence) 正本及主管牌照。牌照副本不具備法定效力。',
    backEn: 'Original Estate Agent Licence and Statement of Particulars of Manager. Copies are invalid.',
    statuteRef: 'Cap. 511A s.12'
  },
  {
    id: 3,
    category: 'Cap. 511',
    topicZh: '營業員獨立簽署限制',
    topicEn: 'Salesperson Signing Authority',
    frontZh: '營業員牌照 (Salesperson Licence) 持有人可否以獨立承辦商身份單獨簽署地產代理協議？',
    frontEn: 'Can a Salesperson License holder independently sign an estate agency agreement?',
    backZh: '不可以。營業員必須在持牌地產代理 (Estate Agent) 的直接管理與監督下行事。',
    backEn: 'No. Salespersons must act under direct management and supervision of a licensed Estate Agent.',
    statuteRef: 'Cap. 511 s.15'
  },
  {
    id: 4,
    category: 'Cap. 511',
    topicZh: '牌照續期申請時限',
    topicEn: 'Licence Renewal Application Period',
    frontZh: '持牌人應於牌照屆滿日前多久向 EAA 提出續期申請？',
    frontEn: 'How long prior to licence expiry should a renewal application be submitted to EAA?',
    backZh: '屆滿日前 1 個月至 3 個月內。少於 1 個月申請可能需繳交額外附加費。',
    backEn: 'Between 1 to 3 months prior to expiry date. Submissions under 1 month incur surcharge fees.',
    statuteRef: 'Cap. 511 s.18'
  },

  // Statutory Forms 1-6
  {
    id: 5,
    category: 'Forms 1-6',
    topicZh: '表格 1 (Form 1)',
    topicEn: 'Form 1 (Property Information Form)',
    frontZh: '表格 1 (Form 1) 的法定名稱及用途是什麼？由誰填寫？',
    frontEn: 'What is the official title and purpose of Form 1? Who completes it?',
    backZh: '《物業資料表格》(Property Information Form)。由代理填寫，專用於住宅物業出售，向買家披露業權及違建等負擔。',
    backEn: 'Property Information Form for residential sale. Completed by agent to disclose encumbrances/UBW to buyers.',
    statuteRef: 'Cap. 511A Form 1'
  },
  {
    id: 6,
    category: 'Forms 1-6',
    topicZh: '表格 3 及 表格 5',
    topicEn: 'Form 3 vs Form 5',
    frontZh: '表格 3 (Form 3) 與 表格 5 (Form 5) 有何本質分別？',
    frontEn: 'What is the primary difference between Form 3 and Form 5?',
    backZh: '• 表格 3：出售住宅物業地產代理協議（賣方代理）\n• 表格 5：購買住宅物業地產代理協議（買方代理）',
    backEn: '• Form 3: Agency Agreement for Sale of Residential Property (Vendor)\n• Form 5: Agency Agreement for Purchase (Purchaser)',
    statuteRef: 'Cap. 511A Forms 3 & 5'
  },
  {
    id: 7,
    category: 'Forms 1-6',
    topicZh: '表格 4 及 表格 6',
    topicEn: 'Form 4 vs Form 6',
    frontZh: '租務交易中，業主與租客分別使用哪張 EAA 法定表格？',
    frontEn: 'In tenancies, which official forms apply to Landlord and Tenant respectively?',
    backZh: '• 表格 4 (Form 4)：出租住宅物業地產代理協議（業主）\n• 表格 6 (Form 6)：承租住宅物業地產代理協議（租客）',
    backEn: '• Form 4: Agency Agreement for Leasing (Landlord)\n• Form 6: Agency Agreement for Renting (Tenant)',
    statuteRef: 'Cap. 511A Forms 4 & 6'
  },
  {
    id: 8,
    category: 'Forms 1-6',
    topicZh: '表格 2 (Form 2)',
    topicEn: 'Form 2 (Leasing Information Form)',
    frontZh: '表格 2 (Form 2) 適用於什麼交易類型？',
    frontEn: 'What transaction type requires Form 2?',
    backZh: '住宅物業出租 (Leasing of Residential Property)。用於向租客披露出租物業細節及租務條款。',
    backEn: 'Residential property tenancies. Discloses leasing particulars and terms to tenants.',
    statuteRef: 'Cap. 511A Form 2'
  },
  {
    id: 9,
    category: 'Forms 1-6',
    topicZh: '代理協議效期上限',
    topicEn: 'Maximum Validity of Agency Agreement',
    frontZh: '表格 3 至 6 地產代理協議的法定有效期上限為多久？',
    frontEn: 'What is the maximum statutory validity period for Forms 3 to 6 agency agreements?',
    backZh: '協議中必須明確訂明有效期。若未有訂明，協議可能因未具備必要條款而失效。常見為 3-6 個月。',
    backEn: 'A specific validity duration must be stated. Omission renders the agreement void/breached.',
    statuteRef: 'Cap. 511A s.6'
  },

  // Cap. 7 Landlord & Tenant
  {
    id: 10,
    category: 'Cap. 7',
    topicZh: '規管租賃保障期 (Part IVA)',
    topicEn: 'Regulated Tenancy Tenure (Part IVA)',
    frontZh: '根據 Cap. 7 第 IVA 部（分租房/規管租賃），租客享有長達多久的租務保障？',
    frontEn: 'Under Cap. 7 Part IVA for regulated tenancies, what is the total security of tenure period?',
    backZh: '4 年保障期 (首期 2 年 + 次期 2 年優先續租權)。次期租金調整受上限 10% 封頂規管。',
    backEn: '4 Years total (2-year first term + 2-year mandatory renewal). Second-term rent capped at max 10% increase.',
    statuteRef: 'Cap. 7 Part IVA'
  },
  {
    id: 11,
    category: 'Cap. 7',
    topicZh: '租賃按金上限 (Part IVA)',
    topicEn: 'Security Deposit Cap (Part IVA)',
    frontZh: '在規管租賃中，業主向租客收取的按金上限為多少？',
    frontEn: 'Under Part IVA regulated tenancies, what is the maximum security deposit allowed?',
    backZh: '不得超過 2 個月租金。任何超過 2 個月租金的按金均屬違法。',
    backEn: 'Must not exceed 2 months rent. Excessive deposit collection constitutes an offense.',
    statuteRef: 'Cap. 7 s.120AA'
  },
  {
    id: 12,
    category: 'Cap. 7',
    topicZh: '表格 CR109 申報時限',
    topicEn: 'Form CR109 Filing Deadline',
    frontZh: '簽署住宅租約後，業主須於多少天內向差餉物業估價署提交表格 CR109？',
    frontEn: 'Within how many days after signing a tenancy must Landlord submit Form CR109 to RVD?',
    backZh: '1 個月內。若逾期提交，業主須繳交 HK$310 費用，否則無權提出訴訟追討欠租。',
    backEn: 'Within 1 month. Late filing incurs HK$310 fee and bars landlord from legal recovery of rent.',
    statuteRef: 'Cap. 7 s.119L'
  },

  // Land Search & Conveyancing
  {
    id: 13,
    category: 'Land Search',
    topicZh: '屋宇署 s.24 命令',
    topicEn: 'Buildings Ordinance s.24 Order',
    frontZh: '土地註冊處查冊出現「Section 24 Order」對物業業權有何影響？',
    frontEn: 'How does a "Section 24 Order" in Land Registry records affect property title?',
    backZh: '屬於建築物違例/僭建清拆令 (UBW Demolition Order)。若業主未有遵從，可能構成業權瑕疵並導致買家拒絕完成交易。',
    backEn: 'Order for mandatory demolition of Unauthorized Building Works (UBW). Non-compliance creates title defect.',
    statuteRef: 'Cap. 123 s.24'
  },
  {
    id: 14,
    category: 'Land Search',
    topicZh: '查冊有效日期規定',
    topicEn: 'Valid Land Search Date Requirement',
    frontZh: '代理向買家/租客提供土地查冊紀錄時，查冊日期有何嚴格規定？',
    frontEn: 'When providing a Land Search to clients, what is the required search date currency?',
    backZh: '必須為簽署臨約當日或前一個工作日之最新紀錄。過期查冊屬嚴重專業疏忽。',
    backEn: 'Must be conducted on the day of signing or immediate prior working day. Outdated searches constitute negligence.',
    statuteRef: 'EAA Practice Direction'
  },
  {
    id: 15,
    category: 'Land Search',
    topicZh: '法院押記令 (Charging Order)',
    topicEn: 'Charging Order Absolute',
    frontZh: '查冊出現「Charging Order Absolute」代表什麼？',
    frontEn: 'What does a "Charging Order Absolute" in a Land Search indicate?',
    backZh: '代表業主因欠債被債權人取得法院強制執行押記令，物業被查封扣押。出售必須先清還債項。',
    backEn: 'Indicates property is legal security for judgment debt. Must be discharged prior to completion.',
    statuteRef: 'Cap. 10 High Court Rules'
  },
  {
    id: 16,
    category: 'Land Search',
    topicZh: '業權託管人 (Stakeholder)',
    topicEn: 'Stakeholder Deposit Holding',
    frontZh: '臨約註明「訂金由業主律師以 Stakeholder 身份持有」有何法律保障？',
    frontEn: 'What protection does holding deposits as a "Stakeholder" by vendor solicitor provide?',
    backZh: '律師不得在業權爭議未解決前將訂金發放予業主。若物業出現業權瑕疵，可保障買家安全退款。',
    backEn: 'Solicitor cannot release deposit to vendor until title is clear. Protects purchaser if title defect arises.',
    statuteRef: 'Conveyancing Practice'
  },

  // Code of Ethics & Misrepresentation
  {
    id: 17,
    category: 'Code of Ethics',
    topicZh: '雙重代理披露 (Dual Agency)',
    topicEn: 'Dual Agency Disclosure',
    frontZh: '地產代理同時代表買賣雙方 (Dual Agency) 時，必須履行什麼手續？',
    frontEn: 'When an agent acts for both vendor and purchaser (Dual Agency), what mandatory step is required?',
    backZh: '必須事先取得雙方書面同意並在代理協議 (Form 3/5) 中明確披露佣金比例。隱瞞雙重代理屬違反受託責任 (Fiduciary Duty)。',
    backEn: 'Must obtain prior written consent from both parties and disclose commission on Form 3/5. Concealment breaches fiduciary duty.',
    statuteRef: 'EAA Code of Ethics s.3'
  },
  {
    id: 18,
    category: 'Code of Ethics',
    topicZh: '廣告用途失實陳述',
    topicEn: 'Misrepresentation in Advertisement',
    frontZh: '代理在單張宣稱物業「保證可作商業用途」，但該物業實為純住宅。代理需負何法律責任？',
    frontEn: 'Agent advertises property as "Guaranteed Commercial" but is residential. What is the agent liability?',
    backZh: '構成失實陳述 (Misrepresentation) 民事賠償責任，同時違反 EAA 操守守則，面臨紀律處分及停牌。',
    backEn: 'Creates civil liability for misrepresentation and constitutes a breach of EAA Code of Ethics subject to suspension.',
    statuteRef: 'Cap. 284 Misrepresentation'
  },
  {
    id: 19,
    category: 'Code of Ethics',
    topicZh: '訂金處理收據規定',
    topicEn: 'Deposit Handling & Receipt',
    frontZh: '代理收取買方或租客訂金時，必須在多久內發出正式收據？',
    frontEn: 'When receiving deposit funds from purchasers/tenants, when must an official receipt be issued?',
    backZh: '必須即時 (Immediately) 發出正式收據，並將款項存入地產代理公司的客戶帳戶 (Client Account)。',
    backEn: 'Must issue an official receipt immediately and deposit funds into agency Client Account.',
    statuteRef: 'Cap. 511A s.13'
  },

  // Stamp Duty & Law
  {
    id: 20,
    category: 'Stamp Duty & Law',
    topicZh: '印花稅繳付時限 (Ad Valorem Stamp Duty)',
    topicEn: 'Stamp Duty Payment Deadline',
    frontZh: '買賣合約簽署後，買家必須在多少天內為臨約/正約繳付印花稅？',
    frontEn: 'Within how many days after agreement execution must Stamp Duty be paid?',
    backZh: '30 天內。逾期繳付可被處以最高 10 倍印花稅金額之罰款。',
    backEn: 'Within 30 days. Late payment incurs penalty up to 10 times the unpaid duty amount.',
    statuteRef: 'Cap. 117 Stamp Duty'
  },
  {
    id: 21,
    category: 'Stamp Duty & Law',
    topicZh: '租約印花稅打打稅 (Stamping)',
    topicEn: 'Tenancy Agreement Stamping',
    frontZh: '住宅租約未有打印花稅 (Stamping) 對訴訟有何影響？',
    frontEn: 'How does an unstamped tenancy agreement affect court enforcement?',
    backZh: '未打印花稅之租約不可在法院作為訴訟證據使用。業主將無法經法院追討欠租或收樓。',
    backEn: 'Unstamped tenancy is inadmissible in court proceedings for rent recovery or repossession.',
    statuteRef: 'Cap. 117 s.15'
  },
  {
    id: 22,
    category: 'Stamp Duty & Law',
    topicZh: '必買必賣條款 (Specific Performance)',
    topicEn: 'Specific Performance Clause',
    frontZh: '正約中「Specific Performance」條款代表什麼意思？',
    frontEn: 'What does "Specific Performance" mean in a formal sale and purchase agreement?',
    backZh: '強制履行合約。若任何一方違約，受害方可申請法庭命令強制違約方完成物業交易，而非單純沒收訂金。',
    backEn: 'Court order compelling breaching party to complete transaction rather than merely forfeiting deposit.',
    statuteRef: 'Common Law Remedies'
  },
  {
    id: 23,
    category: 'Stamp Duty & Law',
    topicZh: '買家印花稅 (BSD) & 住宅稅項',
    topicEn: 'Buyer Stamp Duty (BSD)',
    frontZh: '非香港永久性居民或公司名義購入住宅物業時的印花稅規定？',
    frontEn: 'What is the Stamp Duty rule when non-HKPRs or companies purchase residential property?',
    backZh: '須注意最新特區政府印花稅撤辣/調整政策（依據最新印花稅條例修正案執行）。',
    backEn: 'Subject to relevant Stamp Duty Ordinance amendments and current government measures.',
    statuteRef: 'Cap. 117'
  },
  {
    id: 24,
    category: 'Cap. 511',
    topicZh: '牌照被撤銷之重考限制',
    topicEn: 'Licence Revocation Re-application Restriction',
    frontZh: '若牌照被 EAA 撤銷 (Revoked)，持牌人需要等待多久才能重新申請？',
    frontEn: 'If a licence is revoked by EAA, how long must the individual wait before re-applying?',
    backZh: '自撤銷日起計 12 個月內不得獲發牌照。',
    backEn: 'Disqualified from holding a licence for 12 months from revocation date.',
    statuteRef: 'Cap. 511 s.30'
  },
  {
    id: 25,
    category: 'Forms 1-6',
    topicZh: '表格 6 獨家代理 (Exclusive Agency)',
    topicEn: 'Form 6 Exclusive Agency Clause',
    frontZh: '若租客簽署獨家承租協議 (Form 6)，經其他代理租入物業需負何責任？',
    frontEn: 'If a tenant signs an Exclusive Renting Agreement (Form 6) but rents via another agent, what liability arises?',
    backZh: '租客仍須向原獨家代理支付約定之地產代理佣金。',
    backEn: 'Tenant remains legally liable to pay commission to the exclusive agent as agreed.',
    statuteRef: 'Cap. 511A Form 6 Clause 4'
  }
];