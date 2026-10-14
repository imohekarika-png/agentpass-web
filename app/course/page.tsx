// app/course/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Compass,
  Filter,
  Sparkles,
  Target,
  Award,
  X,
  Lightbulb,
  HelpCircle,
  AlertTriangle,
  ChevronRight,
  Scale,
  Zap,
  Layers
} from 'lucide-react';

interface DoNotConfusePair {
  topicZh: string;
  topicEn: string;
  correctZh: string;
  correctEn: string;
  wrongTurnZh: string;
  wrongTurnEn: string;
}

interface TopicBlock {
  id: string;
  num: string;
  part: 'I' | 'II';
  scope: 'SQE_EAQE' | 'EAQE_ONLY';
  level: 'Level 1 - Awareness' | 'Level 2 - Basic Knowledge' | 'Level 3 - Basic + Apply' | 'Level 4 - Understand + Apply';
  categoryZh: string;
  categoryEn: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  keyStatutes: string[];
  suggestedDay30: number;
  lesson: {
    overviewZh: string;
    overviewEn: string;
    verifiedNotesZh: string[];
    verifiedNotesEn: string[];
    memoryHookZh: string;
    memoryHookEn: string;
    retrievalQuestionsZh: string[];
    retrievalQuestionsEn: string[];
    doNotConfusePairs: DoNotConfusePair[];
    examTrapsZh: string[];
    examTrapsEn: string[];
  };
}

const TOPIC_BLOCKS: TopicBlock[] = [
  // Block 01
  { 
    id: 'b1', 
    num: 'Block 01', 
    part: 'I', 
    scope: 'SQE_EAQE', 
    level: 'Level 2 - Basic Knowledge',
    categoryZh: '發牌與資格', 
    categoryEn: 'Licensing & Qualifications', 
    titleZh: '地產代理監管局 (EAA) 架構與持牌資格', 
    titleEn: 'EAA Structure & Licensing Qualifications', 
    summaryZh: 'Cap. 511 規定的代理 (EAQE) 與營業員 (SQE) 發牌條件、適當人選測試 (Fit & Proper) 及四層監管架構。', 
    summaryEn: 'Licensing conditions under Cap. 511 for EAQE/SQE, Fit & Proper criteria, and 4-floor EAA structure.', 
    keyStatutes: ['Cap. 511 s.15', 'Cap. 511 s.19'], 
    suggestedDay30: 1,
    lesson: {
      overviewZh: '本單元為香港地產代理法規之基石 (Part 1 & 2.1)。掌握 EAA 四大職能與持牌四大法定門檻，為 Level 2 基礎考核重點。',
      overviewEn: 'Foundation of HK agency law (Part 1 & 2.1). Covers 4 EAA functions and 4 statutory eligibility pillars (Level 2).',
      verifiedNotesZh: [
        '✓ 三類牌照：地產代理牌照 (個人)、地產代理牌照 (公司)、營業員牌照。營業員不得經營代理業務或擔任分行經理。',
        '✓ 法定發牌四大條件：年滿 18 歲、完成中五 (Form 5) 或同等學歷、獲評為「適當人選」(Fit and Proper)、於指定期限內考試合格。',
        '✓ 考試成績有效期限：代理牌照 (EAQE) 為 12 個月；營業員牌照 (SQE) 為 6 個月。',
        '✓ 相關工作經驗 (Work Experience) 絕非法定發牌條件，亦非 EAA 評定「適當人選」之考慮因素。',
        '✓ 破產未解除、受《精神健康條例》監護、或涉及欺詐/不誠實罪行被判監者，均不合乎 Fit & Proper 資格。',
        '✓ 續牌申請窗口：屆滿前不早於 3 個月且不遲於 1 個月提交申請。'
      ],
      verifiedNotesEn: [
        '✓ Three license types: Estate Agent (Individual), Estate Agent (Company), Salesperson. Salesperson cannot run business or manage branch.',
        '✓ Four statutory requirements: Age 18+, Form 5 completed, Fit & Proper person, and Examination passed within prescribed period.',
        '✓ Exam validity window: 12 months for Estate Agent license (EAQE); 6 months for Salesperson license (SQE).',
        '✓ "Relevant work experience" is NOT a licensing requirement and NOT a factor for Fit & Proper assessment.',
        '✓ Undischarged bankrupts, mental disorder subjects, or convictions involving fraud/dishonesty fail Fit & Proper criteria.',
        '✓ License renewal window: Not earlier than 3 months before expiry and not later than 1 month before expiry.'
      ],
      memoryHookZh: '【18 - 5 - 12 - F&P】口訣：18 歲🎂、中五學歷📜、12 個月考試合格 (SQE 為 6 個月)⌛、Fit & Proper 審查🛡️。EAA 建築物分為四層：發牌、規管、紀律、教育。',
      memoryHookEn: 'Mnemonic: 18 (Age) - 5 (Form 5) - 12 (Months validity, 6 for SQE) - Fit & Proper. Visualize EAA as a 4-floor building: Licence, Regulate, Discipline, Educate.',
      retrievalQuestionsZh: [
        '1. 請不看筆記列出個人申請牌照的四大法定條件？哪一項常被誤認為條件但實際不是？',
        '2. 營業員牌照 (SQE) 與代理牌照 (EAQE) 的考試合格有效期限分別為多久？',
        '3. 續牌申請窗口的「3 至 1」規則是指甚麼日期範圍？'
      ],
      retrievalQuestionsEn: [
        '1. Without looking, name the 4 statutory eligibility requirements. Which common factor is NOT required?',
        '2. What are the exam validity windows for SQE vs EAQE applications?',
        '3. What does the "3 to 1" rule mean regarding license renewal timelines?'
      ],
      doNotConfusePairs: [
        {
          topicZh: '考試合格有效期限',
          topicEn: 'Exam Validity Window',
          correctZh: '代理牌照 (EAQE) 為 12 個月',
          correctEn: '12 months for Estate Agent License (EAQE)',
          wrongTurnZh: '營業員牌照 (SQE) 為 6 個月 (切勿混淆兩者時間！)',
          wrongTurnEn: '6 months for Salesperson License (SQE)'
        },
        {
          topicZh: '分行經理任職資格',
          topicEn: 'Branch Manager Qualification',
          correctZh: '必須持有「地產代理牌照 (個人)」',
          correctEn: 'Must hold an Individual Estate Agent License',
          wrongTurnZh: '營業員牌照 (SQE) 無論從業多少年均無權擔任經理',
          wrongTurnEn: 'Salesperson license holder cannot manage an office regardless of years of experience'
        }
      ],
      examTrapsZh: [
        ' Trap: 主考官常宣稱「具備 3 年行業經驗的 22 歲營業員可擔任分行經理」——錯誤！原因是他未持有「代理牌照」，與年齡或經驗無關。',
        ' Trap: 宣稱「相關工作經驗為發牌與 Fit & Proper 評估之法定條件」——錯誤！EAA 完全不考慮工作經驗。'
      ],
      examTrapsEn: [
        ' Trap: "A 22-year-old salesperson with 3 years experience can manage a branch" — FALSE. Cause: Lacks Estate Agent License.',
        ' Trap: "Relevant work experience is a licensing requirement or fit-and-proper factor" — FALSE.'
      ]
    }
  },

  // Block 02
  { 
    id: 'b2', 
    num: 'Block 02', 
    part: 'I', 
    scope: 'SQE_EAQE', 
    level: 'Level 4 - Understand + Apply',
    categoryZh: '營業地點規管', 
    categoryEn: 'Business Premises', 
    titleZh: '營業地點展示牌照與 31 天法定通知期', 
    titleEn: 'License Display & 31-Day Address Change Notice', 
    summaryZh: '每個營業地點必須展示牌照正本。變更營業地點後必須於 31 天內以書面通知 EAA，違反屬刑事罪行。', 
    summaryEn: 'Mandatory display of license. Address changes require written notice within 31 days.', 
    keyStatutes: ['Cap. 511 s.36', 'Cap. 511 s.40'], 
    suggestedDay30: 2,
    lesson: {
      overviewZh: '本單元屬於 Level 4 高分核心。涵蓋分支機構 (SPOB) 設立、分行經理獨立有效控制及營業地點變更之 31 天法定限期。',
      overviewEn: 'Level 4 high-demand topic. Covers branch SPOB registration, manager effective control, and mandatory 31-day address change notice.',
      verifiedNotesZh: [
        '✓ 每個營業地點 (Place of Business) 必須於顯眼處展示地產代理牌照正本或營業詳情說明書 (SPOB)。',
        '✓ 營業地點或公司註冊地址如有任何變更，持牌人必須於 31 天內以書面通知 EAA。',
        '✓ 設立新分行時，必須於 31 天內通知 EAA 關於「分行經理之委任」，而非僅通知開張日期。',
        '✓ 每一營業地點必須由一名持有「地產代理牌照 (個人)」之經理進行獨立及有效之控制 (Effective & Separate Control)。'
      ],
      verifiedNotesEn: [
        '✓ Original license or Statement of Particulars of Business (SPOB) must be conspicuously displayed at every branch.',
        '✓ Any change of business address must be notified to EAA in writing within 31 days. Failure is an offense.',
        '✓ Opening a new branch requires notifying EAA of the "Manager Appointment" within 31 days.',
        '✓ Each branch office must be under the effective and separate control of an individual Estate Agent License holder.'
      ],
      memoryHookZh: '【31 天郵筒 📬】口訣：搬遷地址、委任分行經理，均需在 31 天內投信通知 EAA！',
      memoryHookEn: 'Mnemonic: The 31-Day Mailbox 📬. Address change and manager appointments must be reported within 31 days.',
      retrievalQuestionsZh: [
        '1. 分行開張時，必須於 31 天內向 EAA 申報甚麼事項？',
        '2. 分行經理必須具備甚麼牌照資格？營業員牌照加 10 年經驗可以嗎？'
      ],
      retrievalQuestionsEn: [
        '1. What specific event must be reported to EAA within 31 days of opening a new branch?',
        '2. What license qualification must a branch manager hold? Is SQE + 10 years experience sufficient?'
      ],
      doNotConfusePairs: [
        {
          topicZh: '開張與變更通知',
          topicEn: 'Branch Opening vs Change Notice',
          correctZh: '於 31 天內通知 EAA「分行經理之委任」',
          correctEn: 'Notify EAA of Manager Appointment within 31 days',
          wrongTurnZh: '誤以為需於 31 天內通知「分行開張」本身',
          wrongTurnEn: 'Mistakenly notifying branch opening date instead of manager appointment'
        }
      ],
      examTrapsZh: [
        ' Trap: 宣稱「分行開張只需通知 EAA 營業地址，無需指定代理牌照持有人管理」——錯誤！必須由代理牌照持有人有效控制。'
      ],
      examTrapsEn: [
        ' Trap: "Branch opening only requires notifying address, no licensed agent manager needed" — FALSE.'
      ]
    }
  },

  // Block 04
  { 
    id: 'b4', 
    num: 'Block 04', 
    part: 'I', 
    scope: 'EAQE_ONLY', 
    level: 'Level 4 - Understand + Apply',
    categoryZh: '客戶帳戶管理', 
    categoryEn: 'Client Account Trust', 
    titleZh: '客戶存款 (Client Money) 託管與獨立信託帳戶', 
    titleEn: 'Client Money Custody & Independent Trust Accounts', 
    summaryZh: '代理收取之訂金與客戶款項必須存入指定客戶信託戶口，發出收據與紀錄保存之嚴格規範。', 
    summaryEn: 'All client deposits must be held in designated bank trust accounts.', 
    keyStatutes: ['Cap. 511 s.43', 'Client Money Rules'], 
    suggestedDay30: 5,
    lesson: {
      overviewZh: 'EAQE 專屬 Level 4 靈魂考點！規管客戶訂金 (Client Money) 託管、銀行信託戶口 (Trust Account) 及防範洗黑錢紀錄。',
      overviewEn: 'EAQE-only Level 4 statutory core! Governs client money trust deposits, bank trust accounts, and AML record retention.',
      verifiedNotesZh: [
        '✓ 代理代客戶收取之訂金或款項，必須即時存入於持牌銀行開立之「客戶信託帳戶」(Client Trust Account)。',
        '✓ 嚴禁將客戶款項存入代理行之營業戶口、個人戶口、或律師樓戶口 (除非客戶書面指示)。',
        '✓ 收取客戶款項後，必須於 14 天內 向客戶發出書面收據 (Written Receipt)。',
        '✓ 款項收據副本必須妥善保存不少於 3 年；反洗黑錢 (AMLO) 之代理協議紀錄則需保存不少於 5 年。',
        '✓ 款項使用三條件：(1) 代客戶託管 (2) 支付予客戶 (3) 依據客戶事先書面指示支付。'
      ],
      verifiedNotesEn: [
        '✓ Client money received must be immediately deposited into a designated Client Trust Account at an authorized bank.',
        '✓ Strictly forbidden to deposit client money into agency office accounts or personal accounts.',
        '✓ A written receipt must be issued to the client within 14 days of receiving funds.',
        '✓ Receipt copies must be retained for at least 3 years; AML agency agreement records for at least 5 years.',
        '✓ Three permitted money uses: (1) Hold in trust, (2) Pay to client, (3) Pay per client prior written instructions.'
      ],
      memoryHookZh: '【3 - 2 - 14 - 3】口訣：3 種法定用途、2 個可支付對象、14 天內發收據、收據保存 3 年 (AML 協議存 5 年)！',
      memoryHookEn: 'Mnemonic: 3 - 2 - 14 - 3. 3 permitted uses, 2 payment recipients, 14 days receipt window, 3 years receipt retention (5 yrs for AML).',
      retrievalQuestionsZh: [
        '1. 營業員代業主收取買家 $40,000 訂金時，應存入哪裡的戶口？',
        '2. 收取款項後發出收據的法定時限是多少天？收據副本需保存多久？'
      ],
      retrievalQuestionsEn: [
        '1. A salesperson receives $40,000 cash deposit for a vendor. Where must it be deposited?',
        '2. What is the deadline to issue a receipt, and how long must its carbon copy be kept?'
      ],
      doNotConfusePairs: [
        {
          topicZh: '客戶款項存放地點',
          topicEn: 'Client Money Destination',
          correctZh: '代理行於持牌銀行開立之客戶信託戶口',
          correctEn: 'Agency designated bank Client Trust Account',
          wrongTurnZh: '不得直接存入業主律師樓或營業戶口 (除非有書面指示)',
          wrongTurnEn: 'Cannot deposit directly into solicitor or office operating account'
        }
      ],
      examTrapsZh: [
        ' Trap: 宣稱「代理可將客戶訂金直接存入買方律師樓戶口」——錯誤！除非取得客戶事先書面指示，否則必須存入代理行信託戶口。'
      ],
      examTrapsEn: [
        ' Trap: "Agent can directly deposit client deposit into buyer solicitor account" — FALSE unless prior written instruction exists.'
      ]
    }
  },

  // Block 11
  { 
    id: 'b11', 
    num: 'Block 11', 
    part: 'II', 
    scope: 'SQE_EAQE', 
    level: 'Level 4 - Understand + Apply',
    categoryZh: '地產代理協議', 
    categoryEn: 'Agency Agreements', 
    titleZh: '法定地產代理協議表格 Form 3 至 Form 6 詳解', 
    titleEn: 'Statutory Agency Agreements (Forms 3 to 6) Mastery', 
    summaryZh: 'Form 3 (賣方)、Form 4 (買方)、Form 5 (出租人) 及 Form 6 (承租人) 之法定條款與最長 3 個月有效期限制。', 
    summaryEn: 'Statutory terms, max 3-month validity, and commission clauses for Forms 3 to 6.', 
    keyStatutes: ['Form 3', 'Form 4', 'Form 5', 'Form 6'], 
    suggestedDay30: 15,
    lesson: {
      overviewZh: 'Level 4 必考地頭！單數表屬賣方/業主端，雙數表屬買方/租客端。掌握 Form 3–6 的法定約束力與豁免範圍。',
      overviewEn: 'Level 4 flagship topic! Odd forms are seller-side, Even forms are buyer-side. Master Form 3-6 rules and non-prescribed exceptions.',
      verifiedNotesZh: [
        '✓ 單數賣方/業主：Form 3 (住宅出售賣方)、Form 5 (住宅出租業主)。',
        '✓ 雙數買方/租客：Form 4 (住宅購買買方)、Form 6 (住宅承租租客)。',
        '✓ 地產代理協議的最長有效期限為 3 個月 (除非雙方書面同意續期)。',
        '✓ 豁免情況 (無指定法定表格)：店舖 (Shop) 出售、辦公室 (Office) 租賃、非獨立住宅單位 (無獨立廚廁房間) 租賃。',
        '✓ Form 3 代理法定職能：推廣物業、獲取物業資料、與買家談判。不包括：查核買家背景、買家破產查冊、物業估價。'
      ],
      verifiedNotesEn: [
        '✓ Odd numbers = Seller/Landlord: Form 3 (Vendor), Form 5 (Landlord).',
        '✓ Even numbers = Buyer/Tenant: Form 4 (Purchaser), Form 6 (Tenant).',
        '✓ Maximum statutory validity for agency agreement is 3 months unless renewed in writing.',
        '✓ No prescribed statutory form exists for: Shop sales, Office leases, or Non-self-contained residential leases.',
        '✓ Form 3 Agent duties: Market property, obtain property info, negotiate. EXCLUDES buyer bankruptcy search or valuation.'
      ],
      memoryHookZh: '【單數賣 🏷️、雙數買 🛒】蹺蹺板口訣：Form 1/2 是資料單 (Information)，Form 3-6 是協議 (Agreements)！',
      memoryHookEn: 'Mnemonic: Odd Sells 🏷️, Even Buys 🛒. Forms 1 & 2 are Info forms, Forms 3 to 6 are Binding Agreements.',
      retrievalQuestionsZh: [
        '1. 業主出租住宅單位應簽署哪一張表格？買家購買住宅應簽署哪一張？',
        '2. 哪三種物業交易不需要簽署 Form 3 至 6 的法定代理協議？'
      ],
      retrievalQuestionsEn: [
        '1. Which form does a landlord sign? Which form does a residential purchaser sign?',
        '2. Name three property transaction scenarios where NO statutory agency agreement form exists.'
      ],
      doNotConfusePairs: [
        {
          topicZh: '表格單雙數區分',
          topicEn: 'Odd vs Even Forms',
          correctZh: '單數屬賣方/業主端 (Form 3, Form 5)',
          correctEn: 'Odd numbers belong to Seller/Landlord (Form 3, Form 5)',
          wrongTurnZh: '雙數屬買方/租客端 (Form 4, Form 6)',
          wrongTurnEn: 'Even numbers belong to Buyer/Tenant (Form 4, Form 6)'
        }
      ],
      examTrapsZh: [
        ' Trap: 宣稱「出租商業寫字樓必須簽署 Form 5」——錯誤！法定表格僅適用於住宅物業，寫字樓不適用。'
      ],
      examTrapsEn: [
        ' Trap: "Leasing a commercial office requires Form 5" — FALSE. Prescribed forms only apply to residential properties.'
      ]
    }
  },

  // Block 14
  { 
    id: 'b14', 
    num: 'Block 14', 
    part: 'II', 
    scope: 'SQE_EAQE', 
    level: 'Level 4 - Understand + Apply',
    categoryZh: '土地查冊 P-O-I-M', 
    categoryEn: 'Land Search P-O-I-M', 
    titleZh: '土地查冊 P-O-I-M 四大核心章節深度解析', 
    titleEn: 'Land Search P-O-I-M (Property, Owner, Incumbrances, Memorials)', 
    summaryZh: 'Property, Owner, Incumbrances (釘牌/押記) 及 Memorials 四大抽屜解析技巧，為 Part II 個案題勝負關鍵。', 
    summaryEn: 'Analysis of Property Details, Ownership, Incumbrances, and Memorials. Dominates Part II Case Study.', 
    keyStatutes: ['Land Registration Ordinance Cap. 128'], 
    suggestedDay30: 20,
    lesson: {
      overviewZh: 'Level 4 個案題 (Part II) 核心！佔 EAQE Part II 30% 分數。必須學會閱讀 P-O-I-M 四大欄位及公司查冊技巧。',
      overviewEn: 'Level 4 Case Study core! Accounts for ~30% of Part II. Requires mastery of P-O-I-M fields and company searches.',
      verifiedNotesZh: [
        '✓ P-O-I-M 四大抽屜：(P) Property 物業資料、(O) Owner 業主紀錄、(I) Incumbrances 業權負擔/釘牌、(M) Memorials 備忘錄。',
        '✓ 公司業主 (Company Vendor) 金科玉律：必須做「雙重查冊」(Two Searches)！(1) 土地註冊處查物業 (2) 公司註冊處查抵押 (Charges)。',
        '✓ 業權負擔欄 (Incumbrances) 常見項目：按揭 (Mortgage)、屋宇署清拆令 (Cap. 123 Order)、法庭押記令 (Charging Order)。',
        '✓ 佔用許可證 (Occupation Permit / OP) 只提供：物業單位之「法定許可用途」(Permitted User)。不提供實用面積！'
      ],
      verifiedNotesEn: [
        '✓ P-O-I-M Drawers: (P) Property, (O) Owner, (I) Incumbrances/Orders, (M) Memorials.',
        '✓ Company Vendor Golden Rule: TWO SEARCHES required! (1) Land Registry for property, (2) Companies Registry for charges.',
        '✓ Incumbrances Section entries: Bank Mortgages, Buildings Dept Orders (Cap. 123), Court Charging Orders.',
        '✓ Occupation Permit (OP) reveals ONLY the "Permitted User" of units. It does NOT state saleable area.'
      ],
      memoryHookZh: '【P-O-I-M 四大抽屜🗄️】公司賣家一定要開啟「第二個櫃桶」(公司註冊處查冊)！',
      memoryHookEn: 'Mnemonic: P-O-I-M 4-Drawer Cabinet🗄️. For company vendors, open the second cabinet (Companies Registry).',
      retrievalQuestionsZh: [
        '1. 土地查冊 P-O-I-M 代表哪四個欄位？',
        '2. 賣家是一家有限公司時，除了土地查冊外，還必須進行甚麼查冊？',
        '3. 佔用許可證 (OP) 可以查到甚麼資料？查不到甚麼資料？'
      ],
      retrievalQuestionsEn: [
        '1. What do the 4 letters P-O-I-M stand for in a Land Search document?',
        '2. When the vendor is a limited company, what second search must be conducted?',
        '3. What item of information does an Occupation Permit provide, and what does it NOT provide?'
      ],
      doNotConfusePairs: [
        {
          topicZh: '公司賣方查冊地點',
          topicEn: 'Company Vendor Search Locations',
          correctZh: '土地註冊處查物業 + 公司註冊處查抵押 (Two Searches)',
          correctEn: 'Land Registry for Property + Companies Registry for Charges (Two Searches)',
          wrongTurnZh: '商業登記證 (BR) 或公司組織章程絕不可查出按揭押記',
          wrongTurnEn: 'Business Registration Certificate or Memorandum of Association will NOT reveal mortgages'
        }
      ],
      examTrapsZh: [
        ' Trap: 宣稱「公司的商業登記證 (BR) 可查出物業是否設有按揭押記」——錯誤！必須進行公司註冊處 (Companies Registry) 查冊。'
      ],
      examTrapsEn: [
        ' Trap: "Business Registration Certificate (BR) reveals mortgages on company property" — FALSE. Requires Companies Registry search.'
      ]
    }
  },

  // Block 16
  { 
    id: 'b16', 
    num: 'Block 16', 
    part: 'II', 
    scope: 'SQE_EAQE', 
    level: 'Level 4 - Understand + Apply',
    categoryZh: '業主與租客條例', 
    categoryEn: 'Tenancy Ordinance Cap. 7', 
    titleZh: '業主與租客 (綜合) 條例 Cap. 7 與租務管制', 
    titleEn: 'Landlord & Tenant (Consolidation) Ordinance Cap. 7', 
    summaryZh: '住宅租約法定終止通知期 (Notice to Quit)、15天沒收租賃權、CR109 差餉物業估價署申報表與劏房管制。', 
    summaryEn: 'Statutory Notice to Quit periods, 15-day forfeiture, CR109 notice, and Part IVA sub-divided units.', 
    keyStatutes: ['Cap. 7 Part IV', 'Cap. 7 Part IVA', 'Form CR109'], 
    suggestedDay30: 24,
    lesson: {
      overviewZh: '佔 EAQE 卷一高達 22% 題量！Level 4 重磅單元。熟記 2-2-2 鏡像規則、15 天欠租沒收權及 CR109 申報。',
      overviewEn: 'Accounts for ~22% of EAQE Part I! Level 4 heavy-hitter. Master the 2-2-2 Mirror, 15-day forfeiture, and CR109 filing.',
      verifiedNotesZh: [
        '✓ 2-2-2 鏡像對稱：租客有 2 項權利 (專有佔用、平靜享用) 及 2 項義務 (交租、期滿交吉)；業主有 2 項權利 (收租、收樓) 及 1 項義務 (結構及外牆維修)。',
        '✓ 沒收租賃權 (Forfeiture for Non-payment)：無明確條款下，租客欠租達 15 天，業主即可行使沒收權。',
        '✓ CR109 申報表：住宅物業在「新出租」或「續租」時，必須於 1 個月內向差餉物業估價署 (RVD) 提交 CR109。',
        '✓ 釐印與註冊：2 年租約附 2 年續租權，代理應建議租客加蓋印花 (Stamp Duty) 並向土地註冊處註冊 (Land Registry)。'
      ],
      verifiedNotesEn: [
        '✓ 2-2-2 Mirror: Tenant has 2 Rights (Exclusive possession, quiet enjoyment) & 2 Duties (Pay rent, deliver up possession). Landlord has 2 Rights (Receive rent, re-possess) & 1 Duty (Structural & exterior repairs).',
        '✓ Forfeiture for Non-payment: Absent express clause, landlord may forfeit after 15 DAYS of unpaid rent.',
        '✓ Form CR109: Mandatory filing with Rating & Valuation Dept (RVD) within 1 month for NEW RESIDENTIAL lettings or RENEWALS.',
        '✓ Lease Protection: For 2-yr lease with 2-yr option, advise tenant to STAMP and REGISTER at Land Registry.'
      ],
      memoryHookZh: '【2-2-2 鏡像 🪞 與 15 天】口訣：業主保養「外牆結構」，租客保養「內部」；欠租 15 天可收樓；住宅新租續租交 CR109！',
      memoryHookEn: 'Mnemonic: 2-2-2 Mirror 🪞 & 15 Days. Landlord repairs exterior/structure, Tenant maintains interior. 15 days unpaid rent forfeits.',
      retrievalQuestionsZh: [
        '1. 住宅租約中，誰負責結構與外牆維修？誰負責內部維修？',
        '2. 無沒收條款下，租客欠租多少天業主可沒收租賃權？',
        '3. Form CR109 在甚麼情況下需要提交？商業寫字樓需要嗎？'
      ],
      retrievalQuestionsEn: [
        '1. Under a domestic lease, who repairs structure and exterior vs interior?',
        '2. Absent a forfeiture clause, after how many days of unpaid rent can a landlord forfeit?',
        '3. When must Form CR109 be lodged? Does it apply to commercial offices?'
      ],
      doNotConfusePairs: [
        {
          topicZh: '維修責任劃分',
          topicEn: 'Repair Responsibility Split',
          correctZh: '業主負責結構與外牆 (Structure & Exterior)',
          correctEn: 'Landlord repairs structure & exterior',
          wrongTurnZh: '租客僅負責內部維修 (Interior, fair wear & tear excepted)',
          wrongTurnEn: 'Tenant maintains interior only'
        },
        {
          topicZh: '欠租沒收門檻',
          topicEn: 'Unpaid Rent Forfeiture Window',
          correctZh: '欠租達 15 天 (15 Days)',
          correctEn: '15 Days unpaid rent',
          wrongTurnZh: '14 天是常見干擾選項 (14 days is a false distractor)',
          wrongTurnEn: '14 days is FALSE'
        }
      ],
      examTrapsZh: [
        ' Trap: 宣稱「住宅租客欠租 14 天業主即可沒收租賃權」——錯誤！法定門檻為 15 天 (15 Days)。',
        ' Trap: 宣稱「租客退租 (Surrender) 或出租商業寫字樓時需提交 CR109」——錯誤！僅適用於住宅之新租與續租。'
      ],
      examTrapsEn: [
        ' Trap: "Landlord can forfeit for unpaid rent after 14 days" — FALSE. Mandatory threshold is 15 Days.',
        ' Trap: "Form CR109 required on lease surrender or commercial letting" — FALSE. Only for residential new/renewals.'
      ]
    }
  }
];

export default function CoursePage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [selectedTrack, setSelectedTrack] = useState<'sqe' | 'eaqe'>('sqe');
  const [examDate, setExamDate] = useState<string>('2026-11-18');
  const [activeLessonBlock, setActiveLessonBlock] = useState<TopicBlock | null>(null);
  const [modalTab, setModalTab] = useState<'notes' | 'mnemonic' | 'confuse' | 'traps'>('notes');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTrack = localStorage.getItem('agentpass_selected_track');
      if (savedTrack === 'eaqe' || savedTrack === 'sqe') {
        setSelectedTrack(savedTrack);
      }
    }
  }, []);

  const handleTrackSwitch = (track: 'sqe' | 'eaqe') => {
    setSelectedTrack(track);
    if (typeof window !== 'undefined') {
      localStorage.setItem('agentpass_selected_track', track);
    }
  };

  const activeBlocks = TOPIC_BLOCKS.filter((b) => {
    if (selectedTrack === 'sqe') return b.scope === 'SQE_EAQE';
    return true;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Top Header Banner */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          className="p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Official HK EAA Licensing Syllabi & Memory Engineering</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {isZh ? '20 大主題單元與精讀課程' : '20 Topic Block Lessons'}
            </h1>
            <p className="text-xs sm:text-sm font-medium opacity-80 max-w-2xl leading-relaxed">
              {isZh 
                ? '點擊任何單元即可開啟「驗證筆記、記憶口訣、易混淆辨析對照表與主考官陷阱登錄」。'
                : 'Click any block card to open statutory notes, memory hooks, Do Not Confuse pairs, and trap registers.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/memory-palace"
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
            >
              <Compass className="h-4 w-4" />
              <span>{isZh ? '進入記憶宮殿' : 'Memory Palace'}</span>
            </Link>

            <Link
              href="/quiz"
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/25 transition flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isZh ? '全真試題庫' : 'Quiz Bank'}</span>
            </Link>
          </div>
        </div>

        {/* Track Switcher Bar */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          className="p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Filter className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold">
                  {isZh ? '選擇您的專屬備考軌道 (Dedicated Study Track)' : 'Select Dedicated Study Track'}
                </h3>
                <p className="text-xs opacity-70">
                  {isZh ? '自動隱除不合考科之單元，提升 30% 溫習效率' : 'Streamline your syllabus with 100% exam-relevant content'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => handleTrackSwitch('sqe')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                  selectedTrack === 'sqe'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Award className="h-3.5 w-3.5" />
                <span>{isZh ? 'SQE 營業員軌道 (16 Blocks)' : 'SQE Salesperson (16 Blocks)'}</span>
              </button>

              <button
                onClick={() => handleTrackSwitch('eaqe')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                  selectedTrack === 'eaqe'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>{isZh ? 'EAQE 地產代理軌道 (20 Blocks)' : 'EAQE Master Pass (20 Blocks)'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold uppercase mb-1 opacity-70">
                {isZh ? '選擇目標考試日期' : 'Target Exam Date'}
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border text-xs font-bold focus:outline-none focus:border-indigo-500 transition"
                style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
              />
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase opacity-70 block">
                {isZh ? '每日完成目標' : 'Daily Pace Requirement'}
              </span>
              <span className="text-lg font-black text-indigo-400">
                {selectedTrack === 'sqe' ? '0.5 - 1 Block / Day' : '1 - 1.5 Blocks / Day'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase opacity-70 block">
                {isZh ? '目前軌道涵蓋單元' : 'Active Track Coverage'}
              </span>
              <span className="text-lg font-black text-emerald-400">
                {activeBlocks.length} / 20 Topic Blocks
              </span>
            </div>
          </div>
        </div>

        {/* Topic Block Lesson Cards Grid with Dual Practice Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeBlocks.map((block) => (
            <div
              key={block.num}
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
              className="p-6 rounded-3xl border shadow-xl space-y-4 flex flex-col justify-between hover:border-indigo-500/60 transition group relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono font-bold text-indigo-400">
                    {block.num} • Part {block.part}
                  </span>

                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-400">
                    {block.level}
                  </span>
                </div>

                <div 
                  onClick={() => {
                    setActiveLessonBlock(block);
                    setModalTab('notes');
                  }}
                  className="cursor-pointer space-y-2 group-hover:text-indigo-400 transition"
                >
                  <h3 className="text-lg font-bold flex items-center justify-between">
                    <span>{isZh ? block.titleZh : block.titleEn}</span>
                    <ChevronRight className="h-5 w-5 opacity-40 group-hover:opacity-100 transition" />
                  </h3>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {isZh ? block.summaryZh : block.summaryEn}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t space-y-3" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {block.keyStatutes.map((st, i) => (
                      <span key={i} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 opacity-80">
                        {st}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setActiveLessonBlock(block);
                      setModalTab('notes');
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 transition flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{isZh ? '精讀課文' : 'Lesson'}</span>
                  </button>
                </div>

                {/* Dual Practice Action Bar */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <Link
                    href={`/quiz?block=${block.id}`}
                    className="px-3 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-600/30 transition"
                  >
                    <Target className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{isZh ? '專屬刷題' : 'Quiz'}</span>
                  </Link>

                  <Link
                    href={`/flashcards?block=${block.id}`}
                    className="px-3 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-indigo-600/30 transition"
                  >
                    <Zap className="h-3.5 w-3.5 text-indigo-400" />
                    <span>{isZh ? '速記閃卡' : 'Flashcards'}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Interactive Lesson Modal */}
      {activeLessonBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 relative scrollbar-thin"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono font-bold text-indigo-400">
                    {activeLessonBlock.num} • Part {activeLessonBlock.part}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {activeLessonBlock.level}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black">
                  {isZh ? activeLessonBlock.titleZh : activeLessonBlock.titleEn}
                </h2>
              </div>

              <button
                onClick={() => setActiveLessonBlock(null)}
                className="p-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Navigation Sub-Tabs */}
            <div className="flex items-center gap-2 border-b pb-3 overflow-x-auto scrollbar-none" style={{ borderColor: 'var(--border-color)' }}>
              <button
                onClick={() => setModalTab('notes')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'notes'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{isZh ? '📖 驗證筆記 (Verified Notes)' : '📖 Verified Notes'}</span>
              </button>

              <button
                onClick={() => setModalTab('mnemonic')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'mnemonic'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <Lightbulb className="h-3.5 w-3.5" />
                <span>{isZh ? '🧠 記憶圖像 (Mnemonic & Loci)' : '🧠 Mnemonic & Loci'}</span>
              </button>

              <button
                onClick={() => setModalTab('confuse')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'confuse'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50'
                }`}
              >
                <Scale className="h-3.5 w-3.5" />
                <span>{isZh ? '⚔️ 易混淆辨析 (Do Not Confuse)' : '⚔️ Do Not Confuse'}</span>
              </button>

              <button
                onClick={() => setModalTab('traps')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'traps'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-rose-500/50'
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>{isZh ? '🎯 考官陷阱 (Trap Register)' : '🎯 Trap Register'}</span>
              </button>
            </div>

            {/* Modal Body Tab Content */}
            <div className="space-y-6 text-xs sm:text-sm">

              {/* Tab 1: Verified Notes */}
              {modalTab === 'notes' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                    <span className="font-bold text-indigo-400 uppercase font-mono block">
                      {isZh ? '【 官方考綱要求 】' : '[ Syllabus Requirement ]'}
                    </span>
                    <p className="opacity-90 leading-relaxed font-medium">
                      {isZh ? activeLessonBlock.lesson.overviewZh : activeLessonBlock.lesson.overviewEn}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-base flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{isZh ? '官方驗證真題筆記 (Exhaustive Verified Notes)' : 'Exhaustive Verified Notes'}</span>
                    </h3>

                    <ul className="space-y-2.5">
                      {(isZh ? activeLessonBlock.lesson.verifiedNotesZh : activeLessonBlock.lesson.verifiedNotesEn).map((note, idx) => (
                        <li key={idx} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 leading-relaxed font-medium">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Mnemonic & Loci */}
              {modalTab === 'mnemonic' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-extrabold text-base">
                      <Lightbulb className="h-5 w-5" />
                      <span>{isZh ? '記憶工程圖像口訣 (Dual Coding Mnemonic)' : 'Dual Coding Mnemonic'}</span>
                    </div>
                    <p className="font-bold text-amber-200 text-sm leading-relaxed">
                      {isZh ? activeLessonBlock.lesson.memoryHookZh : activeLessonBlock.lesson.memoryHookEn}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="font-extrabold text-base flex items-center gap-2 text-indigo-400">
                      <HelpCircle className="h-4 w-4" />
                      <span>{isZh ? '主動檢索測試 (Active Retrieval Questions)' : 'Active Retrieval Questions'}</span>
                    </h3>

                    <div className="p-4 rounded-2xl border border-indigo-500/20 space-y-3 bg-indigo-950/20">
                      {(isZh ? activeLessonBlock.lesson.retrievalQuestionsZh : activeLessonBlock.lesson.retrievalQuestionsEn).map((q, idx) => (
                        <p key={idx} className="font-semibold leading-relaxed">
                          {q}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Do Not Confuse */}
              {modalTab === 'confuse' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base flex items-center gap-2 text-indigo-400">
                      <Scale className="h-4 w-4" />
                      <span>{isZh ? '易混淆對照表 (Do Not Confuse Pair Tables)' : 'Do Not Confuse Pair Tables'}</span>
                    </h3>
                    <p className="text-xs opacity-75">
                      {isZh ? '90% 的失分來自概念混淆而非盲區。請務必成對對照記憶：' : 'Most marks are lost through confusing two similar rules. Learn them as pairs:'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {activeLessonBlock.lesson.doNotConfusePairs.map((pair, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-3">
                        <span className="text-xs font-mono font-bold text-amber-400 block">
                          Topic: {isZh ? pair.topicZh : pair.topicEn}
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold space-y-1">
                            <span className="font-mono font-bold block text-emerald-400">✓ 正確條文 (Correct Rule)</span>
                            <p>{isZh ? pair.correctZh : pair.correctEn}</p>
                          </div>

                          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-semibold space-y-1">
                            <span className="font-mono font-bold block text-rose-400">✗ 常犯陷阱 (Wrong Turn)</span>
                            <p>{isZh ? pair.wrongTurnZh : pair.wrongTurnEn}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Trap Register */}
              {modalTab === 'traps' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base flex items-center gap-2 text-rose-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{isZh ? '主考官假命題陷阱登錄 (Master Exam Trap Register)' : 'Master Exam Trap Register'}</span>
                    </h3>
                    <p className="text-xs opacity-75">
                      {isZh ? '下列選項均為地產代理監管局 (EAA) 試題庫中出現過的錯誤命題 (FALSE)：' : 'The following are false statements directly marked incorrect in official EAA exam papers:'}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {(isZh ? activeLessonBlock.lesson.examTrapsZh : activeLessonBlock.lesson.examTrapsEn).map((trap, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 font-bold leading-relaxed flex items-start gap-2.5">
                        <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{trap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Control Footer */}
            <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-xs font-mono font-bold opacity-60">
                {isZh ? '閱讀完成？選擇練習模式：' : 'Lesson complete? Select practice mode:'}
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href={`/flashcards?block=${activeLessonBlock.id}`}
                  className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl border border-indigo-500/40 bg-indigo-600/20 text-indigo-300 font-bold text-xs hover:bg-indigo-600/30 transition flex items-center justify-center gap-2"
                >
                  <Zap className="h-4 w-4 text-indigo-400" />
                  <span>{isZh ? '翻閱專屬閃卡' : 'Flip Flashcards'}</span>
                </Link>

                <Link
                  href={`/quiz?block=${activeLessonBlock.id}`}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold text-xs shadow-xl transition flex items-center justify-center gap-2"
                >
                  <Target className="h-4 w-4" />
                  <span>{isZh ? '進入專屬題庫' : 'Practice Quiz'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}