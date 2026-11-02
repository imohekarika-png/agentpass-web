// app/data/quizQuestions.ts

export interface QuizQuestion {
  id: string | number;
  blockId: string;
  blockNum: string;
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
  ordinance_tag?: string;
  trackApplicability: 'SQE_EAQE' | 'EAQE_ONLY' | 'BOTH';
  isLocked?: boolean;
}

export const RAW_QUESTION_BANK: QuizQuestion[] = [
  // ==========================================
  // BLOCK 01: EAA 架構與持牌資格 (Cap. 511 s.15, s.19)
  // ==========================================
  {
    id: 'q-101',
    blockId: 'b1',
    blockNum: 'Block 01',
    topicZh: 'EAA 架構與持牌資格',
    topicEn: 'EAA Structure & Licensing Qualifications',
    statuteRefZh: 'Cap. 511 s.19',
    statuteRefEn: 'Cap. 511 s.19',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '下列哪一項「不是」個人申請地產代理（個人）牌照或營業員牌照的法定發牌條件？',
    questionEn: 'Which of the following is NOT a statutory requirement for applying for an individual Estate Agent or Salesperson licence?',
    optionsZh: [
      'A. 年滿 18 歲',
      'B. 完成中五課程或具備同等學歷',
      'C. 具備至少 1 年相關地產代理全職執業經驗',
      'D. 獲地產代理監管局評定為「適當人選」(Fit and Proper)'
    ],
    optionsEn: [
      'A. Aged 18 or above',
      'B. Completed Form 5 education or equivalent',
      'C. Possess at least 1 year relevant estate agency work experience',
      'D. Deemed a Fit and Proper person by the EAA'
    ],
    answerIndex: 2,
    explanationZh: '正確答案為 C。根據 Cap. 511 第 19 條，法定發牌四大條件為：年滿 18 歲、完成中五或同等學歷、獲評定為適當人選、及於限期內考試合格。「相關工作經驗」絕非法定條件。',
    explanationEn: 'Correct answer is C. Under Cap. 511 s.19, the 4 statutory requirements are: Age 18+, Form 5, Fit & Proper person, and exam pass. Relevant work experience is NOT required.'
  },
  {
    id: 'q-102',
    blockId: 'b1',
    blockNum: 'Block 01',
    topicZh: '考試合格成績有效期限',
    topicEn: 'Exam Result Validity Window',
    statuteRefZh: 'Cap. 511 s.19(1)',
    statuteRefEn: 'Cap. 511 s.19(1)',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '考生通過資格考試後，申請「地產代理牌照 (個人)」與「營業員牌照」的考試合格成績有效期限分別為多久？',
    questionEn: 'After passing the qualifying examinations, what are the respective validity periods of the exam results for Estate Agent (Individual) vs Salesperson licence applications?',
    optionsZh: [
      'A. 代理牌照 6 個月；營業員牌照 12 個月',
      'B. 代理牌照 12 個月；營業員牌照 6 個月',
      'C. 兩者均為 12 個月',
      'D. 兩者均為 24 個月'
    ],
    optionsEn: [
      'A. Estate Agent 6 months; Salesperson 12 months',
      'B. Estate Agent 12 months; Salesperson 6 months',
      'C. Both are 12 months',
      'D. Both are 24 months'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。EAQE 地產代理資格考試成績之申請牌照有效期為 12 個月；SQE 營業員資格考試成績之申請牌照有效期為 6 個月。',
    explanationEn: 'Correct answer is B. Exam result validity is 12 months for an Estate Agent licence (EAQE) and 6 months for a Salesperson licence (SQE).'
  },
  {
    id: 'q-103',
    blockId: 'b1',
    blockNum: 'Block 01',
    topicZh: '適當人選測試 (Fit and Proper)',
    topicEn: 'Fit and Proper Disqualifications',
    statuteRefZh: 'Cap. 511 s.19(2)',
    statuteRefEn: 'Cap. 511 s.19(2)',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '根據《地產代理條例》，下列哪類人士會被法定視為「非適當人選」(Not a Fit and Proper Person)，因而不能獲發牌照？',
    questionEn: 'Under the Estate Agents Ordinance, which of the following persons is statutorily disqualified as NOT a Fit and Proper Person?',
    optionsZh: [
      'A. 過去 3 年內曾轉換超過 3 間地產代理行的從業員',
      'B. 未獲解除破產的破產人 (Undischarged Bankrupt)',
      'C. 未持有香港永久性居民身分證之人仕',
      'D. 未曾修讀過認可法律文憑的人仕'
    ],
    optionsEn: [
      'A. An agent who changed agencies more than 3 times in 3 years',
      'B. An undischarged bankrupt',
      'C. A person who is not a Hong Kong Permanent Resident',
      'D. A person who has not completed an accredited law diploma'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。Cap. 511 第 19(2) 條規定，未解除破產的破產人、受《精神健康條例》監護者、或因欺詐/不誠實罪行被判監禁者，均不符合 Fit & Proper 資格。',
    explanationEn: 'Correct answer is B. Under s.19(2), undischarged bankrupts, persons under Mental Health Ordinance guardianship, or persons convicted of fraud/dishonesty fail the Fit and Proper criteria.'
  },
  {
    id: 'q-104',
    blockId: 'b1',
    blockNum: 'Block 01',
    topicZh: '分行經理法定委任資格',
    topicEn: 'Branch Manager Appointment Criteria',
    statuteRefZh: 'Cap. 511 s.39',
    statuteRefEn: 'Cap. 511 s.39',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '地產代理行委任一間分行的經理人（Manager）時，該名經理人必須符合下列哪項法定資格？',
    questionEn: 'When an estate agency appoints a branch manager, what statutory qualification must the manager possess?',
    optionsZh: [
      'A. 只要持有營業員牌照並具備 3 年行業經驗即可',
      'B. 必須持有個人地產代理牌照，且在緊接委任前的 5 年內具備至少 5 年全職持牌執業經驗',
      'C. 必須為該地產代理公司的註冊董事之一',
      'D. 必須持有認可大學之房地產管理學士學位'
    ],
    optionsEn: [
      'A. Holding a Salesperson licence with 3 years industry experience is sufficient',
      'B. Must hold an individual Estate Agent licence with at least 5 years full-time experience in the preceding 5 years',
      'C. Must be a registered director of the agency company',
      'D. Must possess an accredited university real estate degree'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。每間營業處所經理人必須持有個人地產代理牌照（大牌），且在委任前 5 年內擁有至少 5 年全職持牌地產代理執業經驗。營業員不得出任經理人。',
    explanationEn: 'Correct answer is B. A branch manager must hold an individual Estate Agent licence and have at least 5 years full-time licensed agent experience within the preceding 5 years.'
  },
  {
    id: 'q-105',
    blockId: 'b1',
    blockNum: 'Block 01',
    topicZh: '公司地產代理牌照要求',
    topicEn: 'Corporate Estate Agent Licence Criteria',
    statuteRefZh: 'Cap. 511 s.20',
    statuteRefEn: 'Cap. 511 s.20',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '一間有限公司若要獲發「公司地產代理牌照」(Company Licence)，下列哪一項是必備的法定條件？',
    questionEn: 'In order for a limited company to be granted an Estate Agent (Company) Licence, which of the following is a mandatory statutory requirement?',
    optionsZh: [
      'A. 公司的所有股東必須全部持有地產代理牌照',
      'B. 公司董事中必須至少有一名持有個人的地產代理牌照',
      'C. 公司的繳足股本必須不少於港幣 500 萬元',
      'D. 公司必須於香港聯交所主板或創業板上市'
    ],
    optionsEn: [
      'A. All shareholders of the company must hold estate agent licences',
      'B. At least one director of the company must hold an individual Estate Agent licence',
      'C. The paid-up capital of the company must be not less than HK$5,000,000',
      'D. The company must be publicly listed on the HKEX'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。根據 Cap. 511 第 20 條，公司牌照要求至少有一名董事持有個人地產代理牌照，且所有實際掌控地產代理業務的董事均須持牌。',
    explanationEn: 'Correct answer is B. Under Cap. 511 s.20, at least one director must hold an individual Estate Agent licence, and directors controlling estate agency work must be licensed.'
  },
  {
    id: 'q-106',
    blockId: 'b1',
    blockNum: 'Block 01',
    topicZh: '牌照續期申請時間窗口',
    topicEn: 'Licence Renewal Statutory Window',
    statuteRefZh: 'Cap. 511 s.23',
    statuteRefEn: 'Cap. 511 s.23',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '持牌人若要向監管局申請牌照續期（Renewal），法定申請時間窗口為何？',
    questionEn: 'What is the statutory application window for a licensee to apply to the EAA for licence renewal?',
    optionsZh: [
      'A. 牌照屆滿前 6 個月至 3 個月內',
      'B. 牌照屆滿前不早於 3 個月，且不遲於 1 個月提交申請',
      'C. 牌照屆滿後 14 天內仍可免罰款續期',
      'D. 牌照屆滿當日或之前隨時提交即可'
    ],
    optionsEn: [
      'A. 6 months to 3 months prior to expiry',
      'B. Not earlier than 3 months and not later than 1 month before expiry',
      'C. Within 14 days after expiry with no penalty',
      'D. Anytime on or before the day of expiry'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。牌照續期申請窗口為屆滿前「不早於 3 個月且不遲於 1 個月」。逾期申請會被視為逾期新辦，且在舊牌屆滿至新牌批出期間不得執業。',
    explanationEn: 'Correct answer is B. Renewal applications must be submitted not earlier than 3 months and not later than 1 month before the expiry date.'
  },
  {
    id: 'q-107',
    blockId: 'b1',
    blockNum: 'Block 01',
    topicZh: 'EAA 紀律委員會罰款上限',
    topicEn: 'EAA Disciplinary Fine Cap',
    statuteRefZh: 'Cap. 511 s.30',
    statuteRefEn: 'Cap. 511 s.30',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '地產代理監管局（EAA）紀律委員會在研訊判定持牌人違規後，有權判處的最高法定行政罰款金額是多少？',
    questionEn: 'Following a disciplinary hearing finding a licensee in breach, what is the maximum statutory fine the EAA Disciplinary Committee may impose?',
    optionsZh: [
      'A. 港幣 $50,000',
      'B. 港幣 $100,000',
      'C. 港幣 $300,000',
      'D. 港幣 $1,000,000'
    ],
    optionsEn: [
      'A. HK$50,000',
      'B. HK$100,000',
      'C. HK$300,000',
      'D. HK$1,000,000'
    ],
    answerIndex: 2,
    explanationZh: '正確答案為 C。EAA 紀律委員會的法定處分權力包括：訓誡、譴責、附加持牌條件、暫時吊銷/撤銷牌照，及判處最高每宗個案港幣 $300,000 之行政罰款。',
    explanationEn: 'Correct answer is C. The EAA Disciplinary Committee may admonish, reprimand, attach conditions, suspend/revoke licences, and impose a fine of up to HK$300,000.'
  },

  // ==========================================
  // BLOCK 02: 營業地點規管與通知期 (Cap. 511 s.36, s.40)
  // ==========================================
  {
    id: 'q-201',
    blockId: 'b2',
    blockNum: 'Block 02',
    topicZh: '營業地點展示牌照規範',
    topicEn: 'Display of Licence at Place of Business',
    statuteRefZh: 'Cap. 511 s.36',
    statuteRefEn: 'Cap. 511 s.36',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '根據《地產代理條例》第 36 條，地產代理在每個營業地點（分行）必須於顯眼處展示甚麼文件？',
    questionEn: 'Under Section 36 of Cap. 511, what document must an estate agent conspicuously display at every place of business?',
    optionsZh: [
      'A. 商業登記證 (BR) 正本及地產代理牌照正本或營業詳情說明書 (SPOB)',
      'B. 該分行經理的個人身分證副本',
      'C. 最近 3 年之經審計財務報表',
      'D. 全體從業員之考試合格證書'
    ],
    optionsEn: [
      'A. Original Business Registration (BR) & Estate Agent Licence or Statement of Particulars of Business (SPOB)',
      'B. Branch manager HKID card copy',
      'C. Last 3 years audited financial accounts',
      'D. Examination certificates of all employees'
    ],
    answerIndex: 0,
    explanationZh: '正確答案為 A。依據第 36 條，每個持牌營業地點必須在顯眼處展示牌照正本或營業詳情說明書 (SPOB) 以及商業登記證。',
    explanationEn: 'Correct answer is A. Under s.36, the original licence or SPOB and Business Registration must be conspicuously displayed at each branch.'
  },
  {
    id: 'q-202',
    blockId: 'b2',
    blockNum: 'Block 02',
    topicZh: '營業地址變更法定通知期',
    topicEn: '31-Day Address Change Notice',
    statuteRefZh: 'Cap. 511 s.40',
    statuteRefEn: 'Cap. 511 s.40',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '持牌地產代理行若遷址或更改營業地點，必須在變更發生後幾多天內以書面通知監管局？',
    questionEn: 'If a licensed estate agency changes its place of business or address, within how many days must written notice be given to the EAA?',
    optionsZh: [
      'A. 7 天內',
      'B. 14 天內',
      'C. 31 天內',
      'D. 60 天內'
    ],
    optionsEn: [
      'A. Within 7 days',
      'B. Within 14 days',
      'C. Within 31 days',
      'D. Within 60 days'
    ],
    answerIndex: 2,
    explanationZh: '正確答案為 C。Cap. 511 第 40 條明訂，營業地點變更、董事或合夥人變更，均必須於 31 天內以書面通知 EAA。',
    explanationEn: 'Correct answer is C. Under Cap. 511 s.40, written notice of any address or business premise change must be given within 31 days.'
  },
  {
    id: 'q-203',
    blockId: 'b2',
    blockNum: 'Block 02',
    topicZh: '分行經理委任申報期',
    topicEn: 'Manager Appointment Reporting Window',
    statuteRefZh: 'Cap. 511 s.39(2)',
    statuteRefEn: 'Cap. 511 s.39(2)',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '地產代理設立新分行並委任一名合資格經理人時，必須於幾多天內向 EAA 呈交經理人委任通知書？',
    questionEn: 'When an agency establishes a new branch and appoints a manager, within what statutory timeframe must this appointment be reported to EAA?',
    optionsZh: [
      'A. 開張前 7 天',
      'B. 委任後 31 天內',
      'C. 委任後 3 個月內',
      'D. 下一年度續牌時一併申報'
    ],
    optionsEn: [
      'A. 7 days prior to opening',
      'B. Within 31 days of appointment',
      'C. Within 3 months of appointment',
      'D. Upon annual licence renewal'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。委任營業處所經理人必須於委任後 31 天內向監管局提交法定委任通知申報。',
    explanationEn: 'Correct answer is B. Manager appointments must be reported to the EAA in writing within 31 days under s.39.'
  },
  {
    id: 'q-204',
    blockId: 'b2',
    blockNum: 'Block 02',
    topicZh: '終止營業處所通知',
    topicEn: 'Cessation of Business Premises Notice',
    statuteRefZh: 'Cap. 511 s.40',
    statuteRefEn: 'Cap. 511 s.40',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '地產代理結業或停止使用某一營業地點，必須在終止營業後多久內通知 EAA 並交還該地點的營業詳情說明書 (SPOB)？',
    questionEn: 'When an agent ceases to operate at a place of business, within what timeframe must EAA be notified and the SPOB surrendered?',
    optionsZh: [
      'A. 31 天內',
      'B. 14 天內',
      'C. 7 天內',
      'D. 48 小時內'
    ],
    optionsEn: [
      'A. Within 31 days',
      'B. Within 14 days',
      'C. Within 7 days',
      'D. Within 48 hours'
    ],
    answerIndex: 0,
    explanationZh: '正確答案為 A。終止營業地點亦屬於地址變更範疇，持牌人必須於 31 天內書面呈報 EAA 並交回相應處所之 SPOB 正本。',
    explanationEn: 'Correct answer is A. Under s.40, cessation of a place of business must be reported within 31 days and the SPOB returned.'
  },
  {
    id: 'q-205',
    blockId: 'b2',
    blockNum: 'Block 02',
    topicZh: '經理人獨立有效控制',
    topicEn: 'Manager Effective Control & Single Branch Rule',
    statuteRefZh: 'Cap. 511 s.39',
    statuteRefEn: 'Cap. 511 s.39',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '同一位具備 5 年經驗的持牌地產代理，能否同時出任兩間不同分行的常駐經理人？',
    questionEn: 'Can the same licensed estate agent with 5 years experience serve as the resident manager of two separate branches simultaneously?',
    optionsZh: [
      'A. 可以，只要兩間分行位於同一行政區即可',
      'B. 可以，只要該代理每周在每間分行輪流工作一半時間即可',
      'C. 絕對不行。法律要求經理人對營業處所進行實質及有效控制 (Effective Control)，不可一人兼管兩間分行',
      'D. 只要經董事會書面批准即可'
    ],
    optionsEn: [
      'A. Yes, provided both branches are located in the same district',
      'B. Yes, provided the agent spends 50% time at each branch',
      'C. Absolutely NO. The law requires effective control, barring one manager from controlling two branches concurrently',
      'D. Yes, if approved in writing by the Board of Directors'
    ],
    answerIndex: 2,
    explanationZh: '正確答案為 C。EAA 執業通告明令經理人必須對所屬分行實施直接及有效控制 (Effective Control)，同一人絕對不可同時被委任為兩間分行的經理人。',
    explanationEn: 'Correct answer is C. A manager must exercise direct and effective control. Concurrently managing two separate branches is strictly prohibited.'
  },
  {
    id: 'q-206',
    blockId: 'b2',
    blockNum: 'Block 02',
    topicZh: '無牌從事代理業務刑事罰則',
    topicEn: 'Unlicensed Agency Criminal Penalties',
    statuteRefZh: 'Cap. 511 s.55',
    statuteRefEn: 'Cap. 511 s.55',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '任何未持有有效牌照之人仕從事地產代理業務，最高可面臨甚麼法定刑事處分？',
    questionEn: 'Any unlicensed person who carries on estate agency work commits an offence and is liable to what maximum statutory penalty?',
    optionsZh: [
      'A. 罰款港幣 $50,000',
      'B. 罰款港幣 $100,000 及監禁 6 個月',
      'C. 罰款港幣 $500,000 及監禁 2 年',
      'D. 罰款港幣 $1,000,000 及監禁 5 年'
    ],
    optionsEn: [
      'A. Fine of HK$50,000',
      'B. Fine of HK$100,000 and 6 months imprisonment',
      'C. Fine of HK$500,000 and 2 years imprisonment',
      'D. Fine of HK$1,000,000 and 5 years imprisonment'
    ],
    answerIndex: 2,
    explanationZh: '正確答案為 C。依據 Cap. 511 第 55 條，無牌執業屬嚴重刑事罪行，循公訴程序定罪最高可處罰款 HK$500,000 及監禁 2 年。',
    explanationEn: 'Correct answer is C. Under s.55, practicing without a licence is a crime carrying a maximum fine of HK$500,000 and 2 years imprisonment.'
  },
  {
    id: 'q-207',
    blockId: 'b2',
    blockNum: 'Block 02',
    topicZh: '公司董事變更通知期',
    topicEn: 'Notification of Change in Corporate Directors',
    statuteRefZh: 'Cap. 511 s.40',
    statuteRefEn: 'Cap. 511 s.40',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'SQE_EAQE',
    questionZh: '持牌公司地產代理之合夥人、董事或主管人員若發生任何變更，必須於幾多天內通知 EAA？',
    questionEn: 'If any change occurs in the partners, directors, or officers of a licensed corporate estate agent, within how many days must EAA be notified?',
    optionsZh: [
      'A. 14 天內',
      'B. 31 天內',
      'C. 60 天內',
      'D. 90 天內'
    ],
    optionsEn: [
      'A. Within 14 days',
      'B. Within 31 days',
      'C. Within 60 days',
      'D. Within 90 days'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。Cap. 511 第 40 條規定，公司董事或合夥人之委任或離任，必須於 31 天內向監管局書面申報。',
    explanationEn: 'Correct answer is B. Any change of directors or partners in a licensed company must be notified to EAA in writing within 31 days.'
  },

  // ==========================================
  // BLOCK 03: 廣告發布規範與業主書面同意 (Cap. 511A s.9)
  // ==========================================
  {
    id: 'q-301',
    blockId: 'b3',
    blockNum: 'Block 03',
    topicZh: '廣告前置書面授權',
    topicEn: 'Prior Written Authorization for Advertising',
    statuteRefZh: 'Cap. 511A s.9(1)',
    statuteRefEn: 'Cap. 511A s.9(1)',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '地產代理刊登物業廣告前，必須取得業主簽立下列哪份文件？',
    questionEn: 'Before issuing any advertisement regarding a residential property, what document must an agent obtain signed by the vendor?',
    optionsZh: [
      'A. 臨時買賣合約 (PASP)',
      'B. 地產代理協議 (表格 3 或表格 5) 書面授權',
      'C. 業主之香港身分證全彩副本',
      'D. 銀行按揭批准信'
    ],
    optionsEn: [
      'A. Preliminary Agreement for Sale and Purchase (PASP)',
      'B. Written authorization via Estate Agency Agreement (Form 3 or Form 5)',
      'C. Full colour copy of vendor HKID card',
      'D. Bank mortgage approval letter'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。Cap. 511A 第 9(1) 條嚴格規定，未取得業主以表格 3 或 5 事先書面授權前，絕不可刊登任何形式之宣傳廣告。',
    explanationEn: 'Correct answer is B. Section 9(1) of Cap. 511A mandates that agents obtain prior written authorization (Form 3 or Form 5) before publishing ads.'
  },
  {
    id: 'q-302',
    blockId: 'b3',
    blockNum: 'Block 03',
    topicZh: '廣告價格真實性指示',
    topicEn: 'Genuine Instructed Price Rule',
    statuteRefZh: 'Cap. 511A s.9(2)',
    statuteRefEn: 'Cap. 511A s.9(2)',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '物業廣告上所載的物業售價或租金，必須符合下列哪項法律標準？',
    questionEn: 'The sale price or rent stated in a property advertisement must satisfy which legal requirement?',
    optionsZh: [
      'A. 代理行自行評估之合理市值開價',
      'B. 業主最新書面指示或確認之真實要約價格',
      'C. 同屋苑最近一期土地註冊處成交均價',
      'D. 銀行線上即時估價之 90% 折扣價'
    ],
    optionsEn: [
      'A. Reasonable market valuation estimated by the agent',
      'B. Genuine price currently instructed or agreed in writing by the vendor',
      'C. Average historical transaction price in the Land Registry',
      'D. 90% of the latest online bank valuation'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。Cap. 511A 第 9(2) 條規定，廣告價格必須嚴格為業主書面指示之真實價格，嚴禁擅自以虛假低價（釣魚盤）招徠客戶。',
    explanationEn: 'Correct answer is B. Section 9(2) requires advertised prices to reflect genuine written vendor instructions. False low-price bait ads are unlawful.'
  },
  {
    id: 'q-303',
    blockId: 'b3',
    blockNum: 'Block 03',
    topicZh: '廣告牌照號碼標示',
    topicEn: 'Mandatory Display of Licence Number',
    statuteRefZh: 'Cap. 511A s.9(3)',
    statuteRefEn: 'Cap. 511A s.9(3)',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '刊登二手住宅物業廣告時，廣告版面上必須清晰載明下列哪項資訊？',
    questionEn: 'When publishing residential property advertisements, which information must be clearly stated on the advertisement?',
    optionsZh: [
      'A. 地產代理行之持牌商號名稱及地產代理牌照號碼',
      'B. 負責代理個人的銀行私人戶口號碼',
      'C. 該物業現有按揭銀行之名稱',
      'D. 業主之聯絡電話與身分證號碼'
    ],
    optionsEn: [
      'A. Licensed business name and estate agent licence number of the agency',
      'B. Personal bank account details of the handling agent',
      'C. Name of the vendor mortgagee bank',
      'D. Vendor private phone number and HKID'
    ],
    answerIndex: 0,
    explanationZh: '正確答案為 A。Cap. 511A 規例明訂，任何線上或實體廣告均必須顯著標明代理行的營業名稱及其有效牌照號碼。',
    explanationEn: 'Correct answer is A. Under Cap. 511A, the licensed business name and license number of the agency must be conspicuously shown on all ads.'
  },
  {
    id: 'q-304',
    blockId: 'b3',
    blockNum: 'Block 03',
    topicZh: '廣告有效期限與下架責任',
    topicEn: 'Ad Validity & Removal Mandate',
    statuteRefZh: 'Cap. 511A s.9',
    statuteRefEn: 'Cap. 511A s.9',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '當業主終止委託放盤或物業已經成功售出後，代理行對相關刊登廣告應採取甚麼行動？',
    questionEn: 'When a vendor withdraws instructions or the property is sold, what must the agency do regarding its advertisements?',
    optionsZh: [
      'A. 只要加註「已售」字眼，廣告可永久保留於網頁作公司業績宣傳',
      'B. 必須在合理可行範圍內盡快將所有線上線下廣告即時下架移除',
      'C. 可保留該廣告至原本放盤協議之 3 個月期限屆滿為止',
      'D. 只要業主未提出書面投訴便無需理會'
    ],
    optionsEn: [
      'A. May keep the ad online indefinitely as promotional track record with a Sold tag',
      'B. Must remove all online and physical advertisements as soon as practicable',
      'C. May keep the ad active until the original 3-month agency agreement expires',
      'D. No action required unless the owner formally complains in writing'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。EAA 執業通告明令，委託協議終止或物業售出後，代理有法定責任盡快撤銷及下架所有宣傳廣告，否則構成虛假或具誤導性陳述。',
    explanationEn: 'Correct answer is B. Licensees must withdraw all advertisements as soon as practicable once instructions are terminated or property is disposed of.'
  },
  {
    id: 'q-305',
    blockId: 'b3',
    blockNum: 'Block 03',
    topicZh: '分判代理廣告權限',
    topicEn: 'Sub-agency Advertising Authorization',
    statuteRefZh: 'Cap. 511A s.9',
    statuteRefEn: 'Cap. 511A s.9',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '代理行 A 接獲業主獨家放盤委託，若同行代理 B 想協助宣傳刊登廣告，代理 B 必須滿足何項條件？',
    questionEn: 'Agency A has an exclusive listing from a vendor. If collaborating Agency B wishes to advertise the flat, what is required?',
    optionsZh: [
      'A. 代理 B 只要獲得代理 A 的口頭轉告即可自由登廣告',
      'B. 代理 B 必須取得業主事先書面同意，或放盤協議明確授權代理 A 可分判並簽訂書面分判協議',
      'C. 同業合作在行內屬普遍慣例，無需任何書面文件',
      'D. 代理 B 只要在廣告上註明「轉介盤」即完全合規'
    ],
    optionsEn: [
      'A. Verbal confirmation from Agency A is sufficient for Agency B to advertise',
      'B. Agency B must have vendor prior written consent, or valid written sub-agency agreement authorized under the head listing',
      'C. Co-broking is standard custom requiring no documentation',
      'D. Agency B merely needs to state Referral Listing on the ad'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。未經業主書面明示授權或無有效書面分判代理協議，任何第三方代理刊登廣告均屬違法無權廣告。',
    explanationEn: 'Correct answer is B. Sub-agents cannot advertise without vendor written consent or properly authorized written sub-agency agreements.'
  },
  {
    id: 'q-306',
    blockId: 'b3',
    blockNum: 'Block 03',
    topicZh: '社交媒體廣告合規要求',
    topicEn: 'Social Media Advertising Compliance',
    statuteRefZh: 'Cap. 511A s.9',
    statuteRefEn: 'Cap. 511A s.9',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '代理於個人的 Instagram、Facebook 或微信發布物業短片或放盤貼文，是否受《地產代理常規(一般職責及香港住宅物業)規例》規管？',
    questionEn: 'Do property promotional videos or posts on an agent personal social media fall under the Cap. 511A advertising regulations?',
    optionsZh: [
      'A. 不受規管，因社交媒體屬於個人私人言論空間',
      'B. 完全受規管。所有電子或社交平台發布的物業推廣一律視為廣告，必須有書面授權及標明牌照號碼',
      'C. 只要貼文未載有具體叫價即不受規管',
      'D. 只有由公司官方帳號發布的貼文才受規管'
    ],
    optionsEn: [
      'A. No, as personal social media accounts are private expressions',
      'B. Fully regulated. Any digital or social media listing promotion constitutes advertising, requiring written consent and licence display',
      'C. Exempt as long as the post does not state an asking price',
      'D. Only posts on official company accounts are regulated'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。EAA 執業通告明訂，從業員利用任何網上平台或社交媒體發布之樓盤資訊均屬廣告，必須持有有效放盤紙並遵守所有廣告法規。',
    explanationEn: 'Correct answer is B. Social media posts promoting listings constitute advertisements and must fully comply with all advertising statutory rules.'
  },
  {
    id: 'q-307',
    blockId: 'b3',
    blockNum: 'Block 03',
    topicZh: '虛假物業特徵陳述',
    topicEn: 'False Property Representation on Advertisements',
    statuteRefZh: 'Cap. 511A s.9',
    statuteRefEn: 'Cap. 511A s.9',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '物業廣告將原本不可作住宅之平台描述為「私人空中花園連合法住宅套房」，代理可能面臨何種法律責任？',
    questionEn: 'If an ad describes an unauthorized podium as a Legal Private Sky Garden Suite, what legal liability does the agent face?',
    optionsZh: [
      'A. 只需向買家口頭道歉即可免責',
      'B. 構成失實陳述、違反《操守守則》及可能觸犯《商品說明條例》，面臨停牌及刑事檢控',
      'C. 只要合約附帶按現狀 (As-Is) 條款便無需承擔責任',
      'D. 責任全在業主，代理作為中介無任何法律責任'
    ],
    optionsEn: [
      'A. Verbal apology to buyer is sufficient',
      'B. Constitutes misrepresentation, breach of Code of Ethics, and offence under Trade Descriptions Ordinance, risking suspension and prosecution',
      'C. As-Is clause in contract fully protects the agent',
      'D. Vendor bears sole liability; agent has no responsibility'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。發布虛假或具誤導性之物業陳述嚴重違背盡職審查責任，除面臨 EAA 紀律處分外，亦可能觸犯商品說明條例刑事責任。',
    explanationEn: 'Correct answer is B. Misleading representations breach EAA Practice Rules and may trigger criminal prosecution under the Trade Descriptions Ordinance.'
  },

  // ==========================================
  // BLOCK 04: 客戶存款託管與獨立信託戶口 (Cap. 511 s.43) [EAQE_ONLY]
  // ==========================================
  {
    id: 'q-401',
    blockId: 'b4',
    blockNum: 'Block 04',
    topicZh: '客戶存款存入法定期限',
    topicEn: 'Mandatory Prompt Deposit into Client Account',
    statuteRefZh: 'Cap. 511 s.43',
    statuteRefEn: 'Cap. 511 s.43',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'EAQE_ONLY',
    questionZh: '根據《地產代理條例》第 43 條，地產代理代客戶收取訂金或信託款項後，必須於何時存入客戶帳戶？',
    questionEn: 'Under Section 43 of Cap. 511, when must an estate agent deposit client money into a designated Client Account?',
    optionsZh: [
      'A. 於收取款項後的第一個工作天內，即時存入持牌銀行的獨立客戶信託帳戶',
      'B. 於該筆物業交易正式完成交吉當日',
      'C. 於每月最後一個營業日統一存入',
      'D. 存入代理公司的日常營運周轉戶口即可'
    ],
    optionsEn: [
      'A. Promptly / within the next working day into an independent Client Account at a licensed bank',
      'B. On the formal transaction completion day',
      'C. At the end of the calendar month',
      'D. Into the agency general operational account'
    ],
    answerIndex: 0,
    explanationZh: '正確答案為 A。Cap. 511 第 43 條規定，代理代收的客戶款項必須即時存入於持牌銀行開立之「客戶帳戶」（Client Account），嚴禁與公司營運資金混合。',
    explanationEn: 'Correct answer is A. Section 43 mandates that client money must be paid promptly into a designated bank Client Account and never mixed with company funds.'
  },
  {
    id: 'q-402',
    blockId: 'b4',
    blockNum: 'Block 04',
    topicZh: '客戶存款收據發出限期',
    topicEn: '14-Day Client Money Receipt Deadline',
    statuteRefZh: 'Cap. 511B s.3',
    statuteRefEn: 'Cap. 511B s.3',
    ordinance_tag: 'Cap. 511B',
    trackApplicability: 'EAQE_ONLY',
    questionZh: '代理行收取客戶交付之訂金或款項後，法定必須於幾多天內向付款人發出書面收據？',
    questionEn: 'After receiving client money, within how many days must an estate agent issue a written receipt to the payer?',
    optionsZh: [
      'A. 即時（收取當刻）',
      'B. 7 天內',
      'C. 14 天內',
      'D. 30 天內'
    ],
    optionsEn: [
      'A. Immediately at the moment of payment',
      'B. Within 7 days',
      'C. Within 14 days',
      'D. Within 30 days'
    ],
    answerIndex: 2,
    explanationZh: '正確答案為 C。根據《地產代理(客戶存款規範)規例》，代理行收取客戶存款後，必須於「14 天內」向客戶發出載有法定詳情的正式收據。',
    explanationEn: 'Correct answer is C. Under the Client Money Rules, an agent must issue a formal written receipt within 14 days of receiving client money.'
  },
  {
    id: 'q-403',
    blockId: 'b4',
    blockNum: 'Block 04',
    topicZh: '客戶收據文件保存年期',
    topicEn: '3-Year Retention for Client Money Receipts',
    statuteRefZh: 'Cap. 511B s.5',
    statuteRefEn: 'Cap. 511B s.5',
    ordinance_tag: 'Cap. 511B',
    trackApplicability: 'EAQE_ONLY',
    questionZh: '代理行發出的所有客戶存款收據副本及銀行進支紀錄，法定必須妥善保存至少多少年？',
    questionEn: 'For how many years must an estate agency retain copies of client money receipts and bank transaction records?',
    optionsZh: [
      'A. 至少 1 年',
      'B. 至少 3 年',
      'C. 至少 5 年',
      'D. 至少 7 年'
    ],
    optionsEn: [
      'A. At least 1 year',
      'B. At least 3 years',
      'C. At least 5 years',
      'D. At least 7 years'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。Cap. 511B 規定客戶存款收據副本及帳簿必須保存「至少 3 年」以備 EAA 查核（注意：打擊洗錢 AML 盡職審查紀錄為 5 年）。',
    explanationEn: 'Correct answer is B. Client money receipts and accounts must be retained for at least 3 years under Cap. 511B (AML records require 5 years).'
  },
  {
    id: 'q-404',
    blockId: 'b4',
    blockNum: 'Block 04',
    topicZh: '客戶存款利息歸屬權',
    topicEn: 'Ownership of Interest Earned on Client Money',
    statuteRefZh: 'Cap. 511B s.4',
    statuteRefEn: 'Cap. 511B s.4',
    ordinance_tag: 'Cap. 511B',
    trackApplicability: 'EAQE_ONLY',
    questionZh: '存於代理行客戶信託戶口內之大額訂金所衍生之銀行利息，在法律上應歸屬於誰？',
    questionEn: 'To whom does bank interest earned on client money deposited in an agency Client Account legally belong?',
    optionsZh: [
      'A. 自動全數歸地產代理公司作為行政管理費收入',
      'B. 除非雙方另有事先書面協議，否則利息在法律上屬於該客戶（物業買方或賣方主事人）所有',
      'C. 歸香港政府庫房所有',
      'D. 歸地產代理監管局專項基金'
    ],
    optionsEn: [
      'A. Automatically belongs to the agency as administration revenue',
      'B. Belongs legally to the client, unless otherwise agreed in writing in advance',
      'C. Belongs to the HKSAR Treasury',
      'D. Belongs to the EAA General Fund'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。客戶存款屬於信託資產，衍生利息屬客戶所有，代理行未獲書面同意擅自扣留利息構成收受秘密利潤及侵吞信託財產。',
    explanationEn: 'Correct answer is B. Client money is held on trust. Interest earned belongs to the client unless otherwise expressly agreed in writing.'
  },
  {
    id: 'q-405',
    blockId: 'b4',
    blockNum: 'Block 04',
    topicZh: '代管人 (Stakeholder) 託管責任',
    topicEn: 'Agent Holding Deposit as Stakeholder',
    statuteRefZh: 'Cap. 511A s.12',
    statuteRefEn: 'Cap. 511A s.12',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'EAQE_ONLY',
    questionZh: '若臨約約定臨時訂金由代理行作為「代管人」(Stakeholder) 持有，賣方能否在成交日前單方面要求代理行將訂金放款給他？',
    questionEn: 'If PASP specifies that the deposit is held by the agency as Stakeholder, can the vendor demand early release before completion?',
    optionsZh: [
      'A. 可以，因業主為物業擁有人有權隨時提取',
      'B. 絕對不能。作為代管人，代理行對買賣雙方均負有信託責任，未獲雙方共同書面指示前不得單方面釋放款項',
      'C. 只要買方律師口頭同意即可放款',
      'D. 只要賣方簽署賠償保證書即可放款'
    ],
    optionsEn: [
      'A. Yes, as the owner of the property the vendor has unlimited rights',
      'B. Absolutely NO. As stakeholder, the agent holds funds for both parties and cannot release money without joint written instructions',
      'C. Yes, upon verbal consent of buyer solicitor',
      'D. Yes, if vendor provides an indemnity bond'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。作為代管人 (Stakeholder)，代理行中立託管款項，未得買賣雙方共同書面指示或法院判令前，嚴禁單方面向任何一方放款。',
    explanationEn: 'Correct answer is B. A stakeholder holds deposit for both parties in escrow; funds cannot be released without mutual written agreement or court order.'
  },
  {
    id: 'q-406',
    blockId: 'b4',
    blockNum: 'Block 04',
    topicZh: '客戶帳戶獨立審計報告',
    topicEn: 'Annual Auditor Report for Client Accounts',
    statuteRefZh: 'Cap. 511B s.7',
    statuteRefEn: 'Cap. 511B s.7',
    ordinance_tag: 'Cap. 511B',
    trackApplicability: 'EAQE_ONLY',
    questionZh: '持有公司地產代理牌照的機構，法定每年向 EAA 提交執業報告時，必須夾附甚麼財務文件？',
    questionEn: 'What accounting document must a corporate agency submit annually to EAA regarding its client accounts?',
    optionsZh: [
      'A. 經認可執業會計師審計之客戶帳戶獨立查核審計報告 (Auditor Report)',
      'B. 代理行所有高級經理之個人報稅表',
      'C. 公司所有銀行存摺之正本',
      'D. 客戶親筆簽署的滿意度問卷調查表'
    ],
    optionsEn: [
      'A. An independent Auditor Report on client accounts certified by a practicing CPA',
      'B. Personal tax returns of all senior managers',
      'C. Original bank passbooks of all accounts',
      'D. Client satisfaction feedback questionnaires'
    ],
    answerIndex: 0,
    explanationZh: '正確答案為 A。Cap. 511B 規定，經管客戶帳戶的持牌人必須於每個財政年度結束後指定期限內，向 EAA 呈交合格審計師出具之客戶帳戶合規審計報告。',
    explanationEn: 'Correct answer is A. Licensees maintaining client accounts must lodge an auditor report certified by a qualified CPA annually.'
  },
  {
    id: 'q-407',
    blockId: 'b4',
    blockNum: 'Block 04',
    topicZh: '客戶信託存款挪用刑事罪',
    topicEn: 'Misappropriation of Client Money Penalties',
    statuteRefZh: 'Cap. 511 s.55',
    statuteRefEn: 'Cap. 511 s.55',
    ordinance_tag: 'Cap. 511',
    trackApplicability: 'EAQE_ONLY',
    questionZh: '代理行若擅自將客戶信託帳戶內的訂金調撥挪用於支付公司分行租金或員工薪金，將招致何種法律後果？',
    questionEn: 'If an agency misappropriates client money from a trust account to pay branch rent or staff salaries, what consequences follow?',
    optionsZh: [
      'A. 只要於 30 天內補回款項便不屬違法',
      'B. 觸犯 Cap. 511 第 43 條及盜竊罪條例，面臨吊銷牌照、巨額罰款及長期監禁之刑事處分',
      'C. 僅需向 EAA 繳交行政罰款 HK$5,000',
      'D. 屬於一般民事商業借貸，不涉及刑事犯罪'
    ],
    optionsEn: [
      'A. Lawful provided the funds are reimbursed within 30 days',
      'B. Breaches s.43 and Theft Ordinance, leading to licence revocation, heavy fines, and severe imprisonment',
      'C. Only subject to a nominal EAA administrative fine of HK$5,000',
      'D. Constitutes ordinary commercial civil borrowing without criminal liability'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。挪用信託帳戶客戶款項屬嚴重刑事罪行（盜竊罪及破壞信託），除被即時撤銷牌照外，從業員及董事將面臨嚴重刑事起訴及監禁。',
    explanationEn: 'Correct answer is B. Misappropriating trust funds breaches Cap. 511 and constitutes criminal theft, resulting in revocation and imprisonment.'
  },

  // ==========================================
  // BLOCK 05: 雙重代理與利益衝突披露 (Cap. 511A s.13, s.14)
  // ==========================================
  {
    id: 'q-501',
    blockId: 'b5',
    blockNum: 'Block 05',
    topicZh: '雙重代理法定披露時機',
    topicEn: 'Dual Agency Written Disclosure Timing',
    statuteRefZh: 'Cap. 511A s.13',
    statuteRefEn: 'Cap. 511A s.13',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '地產代理同時代表買賣雙方（雙重代理）時，必須在何時向雙方作出書面披露並取得簽署同意？',
    questionEn: 'When acting as a dual agent for both vendor and purchaser, at what point must the agent disclose this in writing and secure consent?',
    optionsZh: [
      'A. 於安排買家第一次睇樓之前',
      'B. 於簽立臨時買賣協議 (PASP) 或租約之前',
      'C. 於買賣雙方前往律師樓簽署正式買賣合約當日',
      'D. 於交易完成交吉當日'
    ],
    optionsEn: [
      'A. Before arranging the first property viewing for the buyer',
      'B. Prior to the execution of the Preliminary Agreement (PASP) or tenancy agreement',
      'C. On the date of signing the formal agreement at solicitors firm',
      'D. On the date of final transaction completion'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。Cap. 511A 第 13 條規定，雙重代理關係必須於買賣雙方「簽訂具約束力協議 (PASP) 之前」以書面披露並獲得雙方簽字同意。',
    explanationEn: 'Correct answer is B. Section 13 mandates written dual agency disclosure and signed consent prior to signing a binding agreement.'
  },
  {
    id: 'q-502',
    blockId: 'b5',
    blockNum: 'Block 05',
    topicZh: '雙重代理佣金率全面披露',
    topicEn: 'Full Disclosure of Commission Rates',
    statuteRefZh: 'Cap. 511A s.13(2)',
    statuteRefEn: 'Cap. 511A s.13(2)',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '在雙重代理安排下，代理協議內關於佣金條款之填寫有何法定要求？',
    questionEn: 'Under dual agency representation, what is the statutory requirement regarding commission terms in the agency agreements?',
    optionsZh: [
      'A. 只需填寫該名客戶自身應付之佣金金額，無需向其透露對家所付金額',
      'B. 必須在各自的委託協議中向買方及賣方披露代理行從「買賣雙方各自收取」的具體佣金金額或百分比',
      'C. 佣金率屬於商業機密，法律禁止向對家披露',
      'D. 只要總佣金不超過樓價 2% 即可不作披露'
    ],
    optionsEn: [
      'A. Only state the commission payable by that client, concealing the counterparty commission',
      'B. Must disclose to both vendor and purchaser the respective commission rates/amounts charged to BOTH sides',
      'C. Commission rates are confidential commercial secrets barred from disclosure',
      'D. No disclosure needed if total commission is under 2%'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。雙重代理時，代理必須在表格 1 及表格 2 中分別向買賣雙方如實披露向另一方收取的佣金金額或折讓，確保利益完全透明。',
    explanationEn: 'Correct answer is B. Section 13(2) mandates disclosing the commissions charged to both vendor and purchaser to ensure absolute transparency.'
  },
  {
    id: 'q-503',
    blockId: 'b5',
    blockNum: 'Block 05',
    topicZh: '代理個人金錢利益申報',
    topicEn: 'Disclosure of Agent Pecuniary Interest',
    statuteRefZh: 'Cap. 511A s.14',
    statuteRefEn: 'Cap. 511A s.14',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '持牌代理若將客戶委託出售的住宅單位賣給自己的親配偶或直系親屬，法定程序為何？',
    questionEn: 'If a licensed agent arranges to sell a client property to the agent spouse or immediate family, what is the mandatory procedure?',
    optionsZh: [
      'A. 只要出價達到業主底價便無需披露任何私人關係',
      'B. 必須於簽立買賣協議前向業主書面披露其個人金錢或親屬利益，並取得業主明示書面同意',
      'C. 代理只需私下借用朋友名義購入即可避開申報',
      'D. 法律絕對禁止代理親屬購買放盤物業'
    ],
    optionsEn: [
      'A. No disclosure needed provided the offer satisfies the vendor reserve price',
      'B. Must disclose personal or family interest in writing to the vendor and obtain written consent before contract',
      'C. Agent may purchase under a nominee friend name to bypass disclosure',
      'D. The law strictly prohibits agent relatives from buying listings'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。Cap. 511A 第 14 條規定，代理若在交易中擁有實質個人利益（包括親屬關係），必須在簽約前向客戶作全面書面披露。',
    explanationEn: 'Correct answer is B. Section 14 mandates written disclosure of any direct or family interest in the transaction prior to agreement execution.'
  },
  {
    id: 'q-504',
    blockId: 'b5',
    blockNum: 'Block 05',
    topicZh: '底價保密受託責任',
    topicEn: 'Fiduciary Duty of Confidentiality & Reserve Price',
    statuteRefZh: 'Cap. 511A s.11',
    statuteRefEn: 'Cap. 511A s.11',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '賣方在簽署表格 1 時向代理透露其最低心理底價為 $600 萬，但廣告叫價為 $650 萬。代理在雙重代理下能否將此底價告訴準買家？',
    questionEn: 'Vendor reveals a reserve price of $6M to the agent, while advertising at $6.5M. In dual agency, can the agent tell the buyer this reserve price?',
    optionsZh: [
      'A. 可以，因為代理對買家亦負有促成最低買入價之責任',
      'B. 絕對不能。代理對主事人負有嚴格保密受託責任 (Fiduciary Duty)，未獲業主明示許可透露底價屬嚴重違規',
      'C. 只要買家出票下訂即可透露',
      'D. 只要代理不收買方佣金即可透露'
    ],
    optionsEn: [
      'A. Yes, because agent also owes buyer a duty to achieve the lowest price',
      'B. Absolutely NO. Agent owes strict fiduciary confidentiality and cannot disclose reserve price without written authority',
      'C. Yes, once the buyer issues a deposit cheque',
      'D. Yes, if the agent charges no commission to the buyer'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。代理對客戶負有受信責任（Fiduciary Duty），客戶指示之底價或財務緊急狀況屬最高機密，未經業主書面授權向買方透露底價屬嚴重違規失職。',
    explanationEn: 'Correct answer is B. Licensees owe a strict duty of confidentiality. Unauthorized disclosure of vendor reserve price breaches fiduciary duties.'
  },
  {
    id: 'q-505',
    blockId: 'b5',
    blockNum: 'Block 05',
    topicZh: '按揭轉介回贈利益披露',
    topicEn: 'Mortgage Referral Benefit Disclosure',
    statuteRefZh: 'Cap. 511A s.13',
    statuteRefEn: 'Cap. 511A s.13',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '代理在促成買賣後推薦買家向特定銀行申請按揭，並從按揭轉介公司收取介紹回贈款項，合規做法為何？',
    questionEn: 'An agent refers a buyer to a mortgage broker and receives a referral commission. What is the compliant procedure?',
    optionsZh: [
      'A. 私下收取即可，因該款項由銀行或中介支付而非由買家支付',
      'B. 必須在提供轉介前向買家書面披露該筆介紹費利益的存在及金額，並取得買家書面同意',
      'C. 只要買家成功獲批按揭便無需披露',
      'D. 只要將一半回贈折現分給買家即合法'
    ],
    optionsEn: [
      'A. Keep it secretly as the fee is paid by the broker rather than the buyer',
      'B. Must disclose the nature and amount of referral benefit in writing to buyer and obtain written consent beforehand',
      'C. No disclosure needed if mortgage is approved successfully',
      'D. Lawful provided half of the kickback is shared with the buyer'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。代理因主事人業務收受任何第三方法定利益，必須事前向客戶書面披露並獲同意，否則觸犯收受秘密利潤及防止賄賂條例。',
    explanationEn: 'Correct answer is B. Receiving any financial benefit from third parties requires prior written disclosure and consent from the principal.'
  },
  {
    id: 'q-506',
    blockId: 'b5',
    blockNum: 'Block 05',
    topicZh: '代理自行購入放盤物業處分',
    topicEn: 'Agent Purchasing Client Listing for Self',
    statuteRefZh: 'Cap. 511A s.14',
    statuteRefEn: 'Cap. 511A s.14',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '代理若發現業主放盤價遠低於市場估值，並打算自己出資購入短炒獲利，下列何者正確？',
    questionEn: 'An agent discovers an underpriced listing and intends to buy it personally for resale profit. Which statement is legally correct?',
    optionsZh: [
      'A. 代理享有普通公民之自由買賣權利，無需向業主交代自身身分',
      'B. 代理存在嚴重利益衝突，必須書面披露自己為買方，並放棄向業主索取佣金，且必須提供客觀真實估值',
      'C. 代理只要請親戚出面簽署合約便完全合規',
      'D. 法律完全豁免從業員的個人投資行為'
    ],
    optionsEn: [
      'A. Agents enjoy normal citizen rights and need not disclose their identity to vendor',
      'B. Severe conflict of interest exists: agent must disclose purchaser identity in writing, waive commission, and give true market valuation',
      'C. Fully compliant if agent arranges a relative to sign the purchase',
      'D. Personal investment activities are fully exempt from regulation'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。從業員購入委託物業有嚴重利益衝突，必須書面揭露身分、放棄代理身分及佣金，並提供客觀市場估價，否則面臨撤銷牌照處分。',
    explanationEn: 'Correct answer is B. Severe conflict of interest requires written identity disclosure, renunciation of agency commission, and providing objective valuation.'
  },
  {
    id: 'q-507',
    blockId: 'b5',
    blockNum: 'Block 05',
    topicZh: '未披露雙重代理合約效力',
    topicEn: 'Legal Status of Contract with Undisclosed Dual Agency',
    statuteRefZh: 'Common Law',
    statuteRefEn: 'Common Law',
    ordinance_tag: 'Cap. 511A',
    trackApplicability: 'SQE_EAQE',
    questionZh: '若代理在買賣過程中故意隱瞞雙重代理身分，客戶在法律上享有何種民事救濟權利？',
    questionEn: 'If an agent conceals dual agency representation, what civil remedies are available to the affected principal?',
    optionsZh: [
      'A. 客戶只能在社交媒體發文投訴，合約及佣金不得推翻',
      'B. 客戶有權撤銷已簽署之代理協議、拒絕支付佣金、追討已付佣金，並向法院索償代理所賺取的秘密利潤',
      'C. 代理只需退還對家的一半佣金即可',
      'D. 買賣合約自動轉化為政府拍賣物業'
    ],
    optionsEn: [
      'A. Client can only complain online; contract and commission remain unaffected',
      'B. Client may rescind agency agreement, forfeit commission, recover fees paid, and claim account of secret profits in court',
      'C. Agent only needs to refund 50% of the counterparty commission',
      'D. The sale contract automatically converts to a government auction'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。在普通法及代理法下，未經授權之雙重代理構成重大違背誠信，主事人有權沒收代理之佣金請求權並追討所有秘密利益。',
    explanationEn: 'Correct answer is B. Undisclosed dual agency breaches fiduciary duty; principal can rescind agreement, forfeit commission, and recover secret profits.'
  },

  // ==========================================
  // BLOCK 06: 物業轉易及物業條例 15年業權根源 (Cap. 219 s.13)
  // ==========================================
  {
    id: 'q-601',
    blockId: 'b6',
    blockNum: 'Block 06',
    topicZh: '15年法定業權根源契據',
    topicEn: '15-Year Good Root of Title Requirement',
    statuteRefZh: 'Cap. 219 s.13',
    statuteRefEn: 'Cap. 219 s.13',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '根據《物業轉易及物業條例》第 13 條，賣方證明良好業權 (Good Title) 時，契據歷史追溯期至少須達多少年？',
    questionEn: 'Under Section 13 of the Conveyancing and Property Ordinance (Cap. 219), a good root of title must trace back for at least how many years?',
    optionsZh: [
      'A. 7 年',
      'B. 12 年',
      'C. 15 年',
      'D. 20 年'
    ],
    optionsEn: [
      'A. 7 years',
      'B. 12 years',
      'C. 15 years',
      'D. 20 years'
    ],
    answerIndex: 2,
    explanationZh: '正確答案為 C。Cap. 219 第 13 條規定，物業轉易產權證明之法定追溯期底線為「不少於 15 年」，該良好根源契據必須妥善處置整項法定權益。',
    explanationEn: 'Correct answer is C. Under Cap. 219 s.13, title deeds must trace back for at least 15 years to establish a good root of title.'
  },
  {
    id: 'q-602',
    blockId: 'b6',
    blockNum: 'Block 06',
    topicZh: '法定產業權之契約形式',
    topicEn: 'Creation of Legal Estate via Deed',
    statuteRefZh: 'Cap. 219 s.4',
    statuteRefEn: 'Cap. 219 s.4',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '根據 Cap. 219 第 4 條，香港土地的法定產業權（Legal Estate）之設定或轉讓，必須具備何種法定形式？',
    questionEn: 'Under Section 4 of Cap. 219, what legal form is mandatory for the creation or conveyance of a legal estate in land?',
    optionsZh: [
      'A. 普通書面合約並由兩名見證人簽名',
      'B. 必須以正式契約／契據 (Deed) 形式蓋印簽立',
      'C. 土地註冊處之官方口頭確認',
      'D. 銀行律師之電郵承諾書'
    ],
    optionsEn: [
      'A. Simple written contract signed by two witnesses',
      'B. Must be executed as a formal Deed under seal',
      'C. Oral confirmation by the Land Registry',
      'D. Email undertaking from bank solicitors'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。Cap. 219 第 4 條明文規定，除法律特別豁免者外，所有土地法定產業權的設定與處置必須以「契約／契據」(Deed) 形式蓋印簽立方具法律效力。',
    explanationEn: 'Correct answer is B. Section 4 mandates that all conveyances of legal estates in land must be created or disposed of by Deed under seal.'
  },
  {
    id: 'q-603',
    blockId: 'b6',
    blockNum: 'Block 06',
    topicZh: '口頭租約法定豁免契約條件',
    topicEn: 'Parol Lease Deed Exemption Criteria',
    statuteRefZh: 'Cap. 219 s.6(2)',
    statuteRefEn: 'Cap. 219 s.6(2)',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: 'Cap. 219 第 6(2) 條規定口頭租約（Parol Lease）可免除以契約形式簽立，必須同時符合下列哪組條件？',
    questionEn: 'Under Cap. 219 s.6(2), a parol lease is exempt from deed requirements only if it satisfies which set of criteria?',
    optionsZh: [
      'A. 租期不超過 3 年、收取合理最佳市值租金、即時生效且無收取溢價 (Fine/Premium)',
      'B. 租期不超過 5 年且租客繳交 2 個月按金',
      'C. 租金每月低於港幣 $10,000 之所有租賃',
      'D. 任何由持牌代理促成之住宅租約均可豁免'
    ],
    optionsEn: [
      'A. Term not exceeding 3 years, taking effect in possession, at best reasonable market rent, without fine/premium',
      'B. Term not exceeding 5 years with 2 months deposit',
      'C. All tenancies with monthly rent below HK$10,000',
      'D. Any residential lease arranged by a licensed agent'
    ],
    answerIndex: 0,
    explanationZh: '正確答案為 A。豁免契約形式之口頭租約法定嚴格限制為：租期不超逾 3 年、即時交付管有、付合理市值全租且無收取頂手費或溢價。',
    explanationEn: 'Correct answer is A. Under s.6(2), the lease must not exceed 3 years, take effect in possession, at the best rent reasonably obtainable, without taking a fine.'
  },
  {
    id: 'q-604',
    blockId: 'b6',
    blockNum: 'Block 06',
    topicZh: '土地合約書面簽署原則',
    topicEn: 'Requirement of Writing for Land Contracts',
    statuteRefZh: 'Cap. 219 s.3',
    statuteRefEn: 'Cap. 219 s.3',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '根據 Cap. 219 第 3 條，任何處置土地或其權益之合約，若要在法庭強制執行，必須符合甚麼前提？',
    questionEn: 'Under Section 3 of Cap. 219, in order for an agreement for the disposition of an interest in land to be enforceable in court, what is required?',
    optionsZh: [
      'A. 必須具備書面形式或有其備忘錄，並由被追究責任之一方（或其合法授權人）簽署',
      'B. 必須在香港高等法院登記註冊',
      'C. 必須由香港特區行政長官親自蓋印',
      'D. 必須經民政事務總署宣誓官認證'
    ],
    optionsEn: [
      'A. Must be in writing or evidenced by memorandum, signed by the party to be charged (or authorized agent)',
      'B. Must be registered at the High Court of Hong Kong',
      'C. Must be sealed by the Chief Executive of the HKSAR',
      'D. Must be certified by a Home Affairs Department oath officer'
    ],
    answerIndex: 0,
    explanationZh: '正確答案為 A。Cap. 219 第 3 條繼承了普通法防欺詐法規，土地合約必須有書面文件並由被控方簽署方可強制執行（衡平法部分履行法理除外）。',
    explanationEn: 'Correct answer is A. Section 3 requires land contracts to be in writing and signed by the party to be charged in order to be enforceable.'
  },
  {
    id: 'q-605',
    blockId: 'b6',
    blockNum: 'Block 06',
    topicZh: '賣方出示良好業權義務',
    topicEn: 'Vendor Duty to Deliver Good Title',
    statuteRefZh: 'Common Law',
    statuteRefEn: 'Common Law',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '在物業買賣普通法原則下，賣方對買方承擔的默示核心義務是甚麼？',
    questionEn: 'Under common law property conveyancing rules, what is the core implied obligation owed by the vendor to the purchaser?',
    optionsZh: [
      'A. 賣方必須保證物業在成交後 10 年內絕不漏水',
      'B. 賣方有責任證明並向買方交付無瑕疵之良好業權 (Good Title)，不受任何未披露之產權負擔污染',
      'C. 賣方有責任替買方安排最優惠利率按揭',
      'D. 賣方必須贈送全屋全新電器家具'
    ],
    optionsEn: [
      'A. Vendor warrants that the property will not leak for 10 years',
      'B. Vendor is obligated to show and deliver Good Title free from undisclosed encumbrances',
      'C. Vendor must arrange the most competitive mortgage rates for buyer',
      'D. Vendor must gift brand new appliances and furniture'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。物業轉易金科玉律：賣方必須依約向買方出示及交付良好業權 (Good Title)，若產權存在未獲補救之重大瑕疵，買方有權踢契解除合約。',
    explanationEn: 'Correct answer is B. The fundamental vendor obligation is to deduce and assign Good Title free from encumbrances.'
  },
  {
    id: 'q-606',
    blockId: 'b6',
    blockNum: 'Block 06',
    topicZh: '業權質詢時限與效力',
    topicEn: 'Requisitions on Title Procedure',
    statuteRefZh: 'Conveyancing Practice',
    statuteRefEn: 'Conveyancing Practice',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '買方律師在收悉賣方送交的業權契據後，若發現有缺契或簽名瑕疵，必須在幾多天內提出業權質詢 (Requisitions on Title)？',
    questionEn: 'Upon receiving title deeds, within what timeframe must the purchaser solicitor raise requisitions on title under standard conditions of sale?',
    optionsZh: [
      'A. 依合約特定條款通常為收契後 7 至 14 天內提出，逾期未提出可能被視為接納業權',
      'B. 成交日後 3 個月內隨時可提出',
      'C. 只要買方尚未搬入該物業隨時均可提出',
      'D. 法律禁止買方律師對契據提出任何質詢'
    ],
    optionsEn: [
      'A. Usually within 7 to 14 days of deeds receipt as stipulated, or risk waiver of objections',
      'B. Anytime within 3 months after completion',
      'C. Anytime prior to buyer taking actual physical occupancy',
      'D. Requisitions on title are barred by law'
    ],
    answerIndex: 0,
    explanationZh: '正確答案為 A。標準買賣協議通常約定買方必須在收到契約後指定時限（通常 7 至 14 天）內提出書面質詢，逾期則被推定為接受既有產權狀態。',
    explanationEn: 'Correct answer is A. Standard sale terms stipulate requisitions must be raised within a strict window (typically 7-14 days), failing which title objections are deemed waived.'
  },
  {
    id: 'q-607',
    blockId: 'b6',
    blockNum: 'Block 06',
    topicZh: '衡平法租約與善意買家',
    topicEn: 'Equitable Lease vs Bona Fide Purchaser',
    statuteRefZh: 'Common Law',
    statuteRefEn: 'Common Law',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '一紙超過 3 年但未以契約形式蓋印之書面租約，在法律上屬於甚麼性質？對後續善意買家有何影響？',
    questionEn: 'What is the legal status of an unsealed written lease exceeding 3 years, and how does it affect a subsequent bona fide purchaser?',
    optionsZh: [
      'A. 完全等同法定租賃 (Legal Lease)，具完全對抗力',
      'B. 僅構成衡平法租約 (Equitable Lease)，若未在土地註冊處登記，對後續善意有償取得法定產權之買家無法律效力',
      'C. 屬刑事無效文件，租客須即時搬離',
      'D. 自動轉為 999 年永久租契'
    ],
    optionsEn: [
      'A. Equivalent to a Legal Lease with full enforceability',
      'B. Constitutes an Equitable Lease only; if unregistered, it is void against a subsequent bona fide purchaser for value',
      'C. Criminal void document requiring instant tenant eviction',
      'D. Automatically converts into a 999-year Crown lease'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。超過 3 年無蓋印之租約僅屬衡平法租約，依土地註冊條例若未及時註冊，對於後續善意付價買家（BFP）依法無效。',
    explanationEn: 'Correct answer is B. An unsealed lease over 3 years creates an equitable lease only, unenforceable against a registered bona fide purchaser if unregistered.'
  },

  // ==========================================
  // BLOCK 07: 聯權共有長存權與中斷 (Cap. 219 s.24)
  // ==========================================
  {
    id: 'q-701',
    blockId: 'b7',
    blockNum: 'Block 07',
    topicZh: '聯權共有四同原則',
    topicEn: 'Four Unities of Joint Tenancy',
    statuteRefZh: 'Cap. 219 s.24',
    statuteRefEn: 'Cap. 219 s.24',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '聯權共有（Joint Tenancy / 俗稱長命契）在法律上必須同時具備哪四項不可分割的「四同原則」(Four Unities)？',
    questionEn: 'Under property law, which Four Unities must exist concurrently to constitute a valid Joint Tenancy?',
    optionsZh: [
      'A. 身份相同、血緣相同、年齡相同、住址相同',
      'B. 時間相同 (Time)、業權契據相同 (Title)、權益份額相同 (Interest) 及 管有權相同 (Possession)',
      'C. 按揭銀行相同、律師樓相同、印花稅率相同、差餉金額相同',
      'D. 買入年份相同、結婚年份相同、居港年期相同、職業相同'
    ],
    optionsEn: [
      'A. Identity, Bloodline, Age, and Residential Address',
      'B. Unity of Time, Unity of Title, Unity of Interest, and Unity of Possession',
      'C. Same Mortgagee, Same Solicitor, Same Stamp Duty, and Same Rates',
      'D. Same Purchase Year, Marriage Year, Residency Years, and Occupation'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。聯權共有必須具備四大同一性：時間同一 (Time)、契據同一 (Title)、權益相等同一 (Interest) 及 共同管有同一 (Possession)。',
    explanationEn: 'Correct answer is B. The four unities essential for joint tenancy are: Time, Title, Interest, and Possession.'
  },
  {
    id: 'q-702',
    blockId: 'b7',
    blockNum: 'Block 07',
    topicZh: '長存權 (Survivorship) 法定效力',
    topicEn: 'Right of Survivorship (Jus Accrescendi)',
    statuteRefZh: 'Cap. 219 s.24',
    statuteRefEn: 'Cap. 219 s.24',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '兩位業主以聯權共有形式持有物業，其中一位業主立下遺囑將該物業贈予親生兒子。該名業主去世後，物業業權依法歸誰所有？',
    questionEn: 'Two owners hold property as Joint Tenants. One makes a will leaving the flat to his son. Upon his death, who owns the property?',
    optionsZh: [
      'A. 全數歸親生兒子繼承，因遺囑具有最高法律優先權',
      'B. 依法自動由健在的另一位聯權共有人（長存者）全數繼承，長存權優於遺囑',
      'C. 由親生兒子與健在共有人各佔 50% 分權共有',
      'D. 物業自動轉交遺產承辦處拍賣'
    ],
    optionsEn: [
      'A. Fully inherited by the son, as a will has absolute legal priority',
      'B. Automatically vests wholly in the surviving joint tenant via Right of Survivorship, which overrides the will',
      'C. Owned 50/50 as tenants in common between the son and surviving owner',
      'D. Automatically transferred to Probate Registry for auction'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。長存權（Right of Survivorship）是聯權共有之基石。在未中斷聯權前，長存權優先於死者所立之遺囑，去世共有人之份額自動消滅並歸長存者所有。',
    explanationEn: 'Correct answer is B. Right of survivorship operates automatically upon death and takes precedence over any testamentary disposition.'
  },
  {
    id: 'q-703',
    blockId: 'b7',
    blockNum: 'Block 07',
    topicZh: '轉讓份額導致聯權中斷',
    topicEn: 'Severance of Joint Tenancy by Conveyance',
    statuteRefZh: 'Cap. 219 s.24',
    statuteRefEn: 'Cap. 219 s.24',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: 'A 與 B 為聯權共有人。若 A 在未通知 B 的情況下，將其名下權益簽契轉讓予第三者 C，法律後果為何？',
    questionEn: 'A and B are Joint Tenants. A conveys his interest to third-party C without notifying B. What is the legal consequence?',
    optionsZh: [
      'A. 該轉讓在法律上一律無效，因未得 B 同意',
      'B. 轉讓破壞了契據與時間同一性，聯權共有被中斷 (Severance)，B 與 C 成為分權共有人 (Tenants in Common)',
      'C. C 自動成為與 B 並列的聯權共有人，長存權依然維持',
      'D. B 有權要求政府直接沒收 A 的份額'
    ],
    optionsEn: [
      'A. The conveyance is completely void without B consent',
      'B. The transfer severs the joint tenancy; B and C become Tenants in Common',
      'C. C automatically becomes a joint tenant with B with survivorship continuing',
      'D. B may petition the government to confiscate A share'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。聯權共有人轉讓份額會破壞四同原則並即時切斷聯權（Severance），買家 C 與原共有人 B 轉化為分權共有關係（各佔一半）。',
    explanationEn: 'Correct answer is B. Conveying a joint share severs the joint tenancy; the transferee C and original owner B hold as Tenants in Common.'
  },
  {
    id: 'q-704',
    blockId: 'b7',
    blockNum: 'Block 07',
    topicZh: '共有人破產對聯權共有之影響',
    topicEn: 'Severance upon Bankruptcy of Joint Tenant',
    statuteRefZh: 'Cap. 219 s.24 & Cap. 6',
    statuteRefEn: 'Cap. 219 s.24 & Cap. 6',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '兩名聯權共有人中有一人被法院頒布破產令，該物業的產權結構會發生何種法定變化？',
    questionEn: 'One of two Joint Tenants is declared bankrupt by the High Court. What legal change occurs to the property title?',
    optionsZh: [
      'A. 長存權依然維持，破產人的權益在去世後歸另一業主所有',
      'B. 破產令直接破壞四同原則並切斷聯權共有，轉化為分權共有，破產人之 50% 份額歸破產受託人處置',
      'C. 另一名無破產的健康業主亦會自動被法院宣告連帶破產',
      'D. 整幢物業由破產管理署即時無償充公'
    ],
    optionsEn: [
      'A. Survivorship remains unaffected; bankrupt share passes to co-owner upon death',
      'B. Bankruptcy severs the joint tenancy into a tenancy in common; the 50% share vests in the Trustee in Bankruptcy',
      'C. The solvent co-owner is automatically declared bankrupt concurrently',
      'D. The whole property is confiscated without compensation'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。破產令會自動依法切斷聯權共有（Severance），破產者的一半業權份額依法轉歸破產受託人（Trustee in Bankruptcy）以清償債務。',
    explanationEn: 'Correct answer is B. Bankruptcy operates as severance of the joint tenancy; the bankrupt undivided share vests in the Trustee in Bankruptcy.'
  },
  {
    id: 'q-705',
    blockId: 'b7',
    blockNum: 'Block 07',
    topicZh: '分權共有 (Tenancy in Common) 特性',
    topicEn: 'Characteristics of Tenancy in Common',
    statuteRefZh: 'Cap. 219 s.24',
    statuteRefEn: 'Cap. 219 s.24',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '下列關於「分權共有」(Tenants in Common) 的法律特徵表述，哪項完全正確？',
    questionEn: 'Which of the following statements regarding Tenancy in Common is legally accurate?',
    optionsZh: [
      'A. 具有長存權 (Right of Survivorship)',
      'B. 無長存權，各共有人持有明確份額（如 60%/40%），身故後其份額依遺囑或無遺囑繼承法分配',
      'C. 分權共有人出售個人份額前必須獲得其他共有人 100% 書面同意',
      'D. 僅適用於直系親屬之間的聯名物業'
    ],
    optionsEn: [
      'A. It carries the Right of Survivorship',
      'B. No survivorship; owners hold distinct undivided shares passing under will or intestacy',
      'C. Selling an individual share requires 100% prior written consent of all co-owners',
      'D. Only applicable between immediate family members'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。分權共有（TIC）沒有長存權，各業主持有明確比例份額，去世時其份額成為其遺產之一部分，依法由其繼承人繼承。',
    explanationEn: 'Correct answer is B. Tenancy in common has no survivorship; shares are distinct and pass to heirs under succession laws.'
  },
  {
    id: 'q-706',
    blockId: 'b7',
    blockNum: 'Block 07',
    topicZh: '分權共有人獨立處置份額權利',
    topicEn: 'Independent Disposal of Undivided Share',
    statuteRefZh: 'Cap. 219',
    statuteRefEn: 'Cap. 219',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '持有 50% 不可分割份數的分權共有人，若想將自己的半數業權賣給第三方買家，是否需要其他共有人同意？',
    questionEn: 'Can a Tenant in Common holding a 50% undivided share sell his share to a third party without other co-owners consent?',
    optionsZh: [
      'A. 必須取得其他共有人簽署放棄優先購買權證明書',
      'B. 依法有權獨立出售及轉讓其擁有的 50% 份額，無需徵得其他共有人之事先同意',
      'C. 只能將份額轉讓給政府或認可慈善機構',
      'D. 法律禁止拆售分權共有物業之個別份額'
    ],
    optionsEn: [
      'A. Must obtain written waiver of pre-emption rights from other co-owners',
      'B. Lawfully entitled to independently sell and assign his 50% share without co-owner consent',
      'C. Can only transfer to government or registered charities',
      'D. Selling partial undivided shares is barred by statute'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。分權共有人有法定權利獨立處置、抵押或出售其名下的不可分割份數，無需徵求其他共有人的許可或同意。',
    explanationEn: 'Correct answer is B. Tenants in Common may freely and independently convey or mortgage their undivided shares without co-owner approval.'
  },
  {
    id: 'q-707',
    blockId: 'b7',
    blockNum: 'Block 07',
    topicZh: '書面通知中斷聯權程序',
    topicEn: 'Severance by Written Notice under Cap. 219 s.8',
    statuteRefZh: 'Cap. 219 s.8',
    statuteRefEn: 'Cap. 219 s.8',
    ordinance_tag: 'Cap. 219',
    trackApplicability: 'SQE_EAQE',
    questionZh: '根據 Cap. 219 第 8 條，聯權共有人若想單方面中斷長命契轉為分權共有，可採取甚麼法定程序？',
    questionEn: 'Under Section 8 of Cap. 219, how can a Joint Tenant unilaterally sever the joint tenancy into a tenancy in common?',
    optionsZh: [
      'A. 必須向行政長官提出赦免申請',
      'B. 向其他聯權共有人發出書面中斷通知 (Notice of Severance)，並將該通知送交土地註冊處註冊',
      'C. 只要口頭告知地產代理即可',
      'D. 必須將物業在拍賣行公開拍賣一次'
    ],
    optionsEn: [
      'A. Apply for clemency to the Chief Executive',
      'B. Serve a written Notice of Severance on other joint tenants and register it at the Land Registry',
      'C. Verbal notice to an estate agent is sufficient',
      'D. Must put the property up for public auction once'
    ],
    answerIndex: 1,
    explanationZh: '正確答案為 B。Cap. 219 第 8 條賦予聯權人權利，可向其他共有人送達書面中斷通知（Notice of Severance）並於土地註冊處註冊，即可單方面切斷聯權。',
    explanationEn: 'Correct answer is B. Section 8 allows unilateral severance by serving written notice on other co-owners and registering the notice at the Land Registry.'
  }
];