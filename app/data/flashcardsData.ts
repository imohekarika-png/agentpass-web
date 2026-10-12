// app/data/flashcardsData.ts

export interface Flashcard {
  id: number;
  category: 'Cap. 511' | 'Cap. 7' | 'Forms 1-6' | 'Land Search' | 'Code of Ethics';
  topicZh: string;
  topicEn: string;
  frontZh: string;
  frontEn: string;
  backZh: string;
  backEn: string;
  statuteRef?: string;
}

export const FLASHCARDS_DATA: Flashcard[] = [
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
    id: 4,
    category: 'Forms 1-6',
    topicZh: '表格 3 及 表格 5',
    topicEn: 'Form 3 vs Form 5',
    frontZh: '表格 3 (Form 3) 與 表格 5 (Form 5) 有何本質分別？',
    frontEn: 'What is the primary difference between Form 3 and Form 5?',
    backZh: '• 表格 3：出售住宅物業地產代理協議（賣方代理）\n• 表格 5：購買住宅物業地產代理協議（買方代理）',
    backEn: '• Form 3: Estate Agency Agreement for Sale of Residential Property (Vendor)\n• Form 5: Estate Agency Agreement for Purchase (Purchaser)',
    statuteRef: 'Cap. 511A Forms 3 & 5'
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
    category: 'Code of Ethics',
    topicZh: '雙重代理披露 (Dual Agency)',
    topicEn: 'Dual Agency Disclosure',
    frontZh: '地產代理同時代表買賣雙方 (Dual Agency) 時，必須履行什麼手續？',
    frontEn: 'When an agent acts for both vendor and purchaser (Dual Agency), what mandatory step is required?',
    backZh: '必須事先取得雙方書面同意並在代理協議 (Form 3/5) 中明確披露佣金比例。隱瞞雙重代理屬違反受託責任 (Fiduciary Duty)。',
    backEn: 'Must obtain prior written consent from both parties and disclose commission on Form 3/5. Concealment breaches fiduciary duty.',
    statuteRef: 'EAA Code of Ethics s.3'
  }
];