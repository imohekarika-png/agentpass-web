// app/content/modules/module4.ts
import { FullLesson } from '../types';

export const MODULE_4_LESSONS: Record<string, FullLesson> = {
  'm4-l1': {
    id: 'm4-l1',
    moduleId: 'module-4',
    moduleZh: 'Module 4：租務實務、機構管理與應試技巧',
    moduleEn: 'Module 4: Tenancy, Management & Exam Mastery',
    titleZh: '4.1 租務 2-2-2 鏡像法則、15 天沒收權與 CR109 申報',
    titleEn: '4.1 Tenancy 2-2-2 Mirror, 15-Day Forfeiture & CR109',
    capRef: 'Cap. 7 Landlord and Tenant Ordinance',
    memoryHookZh: {
      title: '租務 2-2-2 鏡像 + 15 天沒收期 + CR109 規則',
      imageConcept: '兩個人面對面隔著牆，牆上有裂縫，只有業主有工具去修補外牆。',
      desc: '租客：2 權 (專有佔用/平靜享受)、2 責 (交租/交還物業)。業主：2 權 (收租/收樓)、1 責 (維修結構與外牆)。沒收租賃：欠租滿 15 天！CR109：住宅新租/續租向差餉署申報。'
    },
    memoryHookEn: {
      title: 'Tenancy 2-2-2 Mirror, 15-Day Forfeiture & CR109',
      desc: 'Tenant: 2 rights, 2 duties. Landlord: 2 rights, 1 duty (structural & exterior repair). Forfeiture: 15 days default. CR109: Residential new leases & renewals to RVD.'
    },
    scenarioZh: '租客欠繳租金且租約無明文沒收條款，業主須等候多少天方可沒收租賃？表格 CR109 適用於哪些情況？',
    scenarioEn: 'Tenant defaults on rent without express forfeiture clause. After how many days can landlord forfeit? When is CR109 required?',
    verifiedNotesZh: [
      '✓ 維修分工：業主負責「結構及外牆」維修；租客僅負責「內部」維修 (合理損耗除外)。要求租客維修外牆屬不常見條款！',
      '✓ 無明文沒收條款下，租客欠租滿 15 天，業主方可沒收租賃 (7、10、14 天均為常考干擾項)。',
      '✓ 表格 CR109：適用於住宅物業之「新租賃」及「續租」，須送交差餉物業估價署。退租或商業租務無須申報。',
      '✓ 保護 2 年期 + 2 年續租權租客：代理應建議租約須「蓋印花 (Stamped)」並於「土地註冊處註冊」。'
    ],
    verifiedNotesEn: [
      '✓ Repair duty: Landlord repairs structure/exterior; Tenant maintains interior (fair wear & tear excepted). Tenant exterior repair is unusual!',
      '✓ In absence of express clause, landlord may forfeit for non-payment after 15 DAYS (not 7, 10, or 14).',
      '✓ Form CR109: Applies to RESIDENTIAL new lettings & renewals, lodged with RVD. Surrenders or commercial leases excluded.',
      '✓ Protecting tenant with 2+2 option: Advise tenancy be STAMPED and REGISTERED at Land Registry.'
    ],
    detailedLawNotesZh: [
      '1. 依據《業主與租客(綜合)條例》(Cap. 7)，住宅租約常見條款中，要求租客負責「外牆及結構維修」屬不常見條款。',
      '2. 欠租沒收法定寬限期為 15 天。CR109 表格未於 1 個月內提交會影響日後採取法律行動。'
    ],
    detailedLawNotesEn: [
      '1. Under Cap. 7 Landlord & Tenant Ordinance, requiring tenants to maintain structural/exterior parts is unusual.',
      '2. Statutory non-payment forfeiture period is 15 days. CR109 must be lodged with RVD.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「業主可在欠租 14 天後沒收租賃」— 錯誤！法定天數為 15 天。',
      '⚠ 考官陷阱：宣稱「住宅租客退租 (Surrender) 或商業樓宇出租時須提交 CR109」— 錯誤！僅限住宅新租與續租。'
    ],
    trapsEn: [
      '⚠ Trap: Claims landlord can forfeit after 14 days of unpaid rent — FALSE! Statutory requirement is 15 days.',
      '⚠ Trap: Claims CR109 is required for tenancy surrenders or commercial leases — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫租務 2-2-2 鏡像對應關係，並指出誰負責維修結構與外牆。',
      '□ 無明文沒收條款下，欠租多少天業主可沒收租賃？CR109 適用於哪兩種情況？'
    ],
    retrievalQuestionsEn: [
      '□ Fill in the 2-2-2 mirror from memory. Who repairs the exterior and structure?',
      '□ After how many days default can landlord forfeit without express clause? Name the 2 situations requiring CR109.'
    ],
    quiz: {
      questionZh: '關於表格 CR109 的申報規定，下列哪種情況「必須」向差餉物業估價署提交？',
      questionEn: 'In which scenario MUST a Form CR109 be lodged with the Rating and Valuation Department?',
      optionsZh: [
        '住宅物業簽立新租賃協議或辦理續租時',
        '租客提前退租 (Surrender) 時',
        '寫字樓 (Commercial Office) 簽立新租約時',
        '業主與租客同意終止租約時'
      ],
      optionsEn: [
        'New letting or renewal of a residential tenancy',
        'Early surrender of a tenancy by the tenant',
        'New tenancy of a commercial office space',
        'Mutual agreement to terminate a lease'
      ],
      correctIndex: 0,
      explanationZh: '正確答案為 A。CR109 僅適用於住宅物業之「新租」及「續租」。退租及商業租約均無須申報。',
      explanationEn: 'Correct answer is A. Form CR109 applies strictly to new lettings and renewals of residential premises.'
    }
  },

  'm4-l2': {
    id: 'm4-l2',
    moduleId: 'module-4',
    moduleZh: 'Module 4：租務實務、機構管理與應試技巧',
    moduleEn: 'Module 4: Tenancy, Management & Exam Mastery',
    titleZh: '4.2 有效機構管理 (P-M-D 通知、S-C-P-R 反洗錢與信頭規範)',
    titleEn: '4.2 Agency Management (P-M-D Notice, S-C-P-R AML)',
    capRef: 'Cap. 511 Section 38 & Practice Directions',
    memoryHookZh: {
      title: 'P - M - D 通知 + S - C - P - R 反洗錢 + 信頭三要件',
      desc: '通知 EAA (P-M-D)：新僱用 Person、新 Branch Manager (31天內)、新 Director。內部調配無須通知！信頭三要件：牌照/SPOB號碼、營業名稱、營業地點 (均來自 SPOB，非商業登記 BR！)。'
    },
    memoryHookEn: {
      title: 'P-M-D Notice + S-C-P-R AML + Letterhead Trio',
      desc: 'Notify EAA (P-M-D): Person employed, Manager appointed (within 31 days), Director appointed. Letterhead trio: Licence/SPOB no., business name, place of business (all from SPOB!).'
    },
    scenarioZh: '開設新分行及委任主管時，機構須於多少天內通知 EAA？公函信頭須列明哪些事項？',
    scenarioEn: 'Opening a new branch and appointing a manager—within how many days must EAA be notified? What must appear on letterheads?',
    verifiedNotesZh: [
      '✓ 須通知 EAA 事項 (P-M-D)：僱用營業員、委任分行管轄主管 (31 天內)、委任公司董事。持牌人於分行間的內部調配「無須通知」。',
      '✓ 反洗錢 (AML) 四要件 (S-C-P-R)：關注 FATF 高風險地區聲明、核實公司簽署人身份、臨約列明價格/物業/日期、協議副本保存 5 年。無須將協議交予警方備案！',
      '✓ 公函信頭必須列明：牌照號碼/SPOB號碼、營業名稱、營業地點 (資料均來自 SPOB 營業詳情說明書，非 BR 商業登記證)。'
    ],
    verifiedNotesEn: [
      '✓ Notifiable events to EAA (P-M-D): Salesperson employed, Branch Manager appointed (within 31 days), Director appointed. Internal transfers NOT notifiable.',
      '✓ AML measures (S-C-P-R): FATF high-risk warnings, verify corporate signatory ID, state price/address/date, retain agreement 5 years. (NO duty to submit to police!).',
      '✓ Letterhead requirements: Licence/SPOB number, business name, place of business (all from SPOB statement, NOT Business Registration certificate).'
    ],
    detailedLawNotesZh: [
      '1. 機構管理 (EAQE 專有) 強調有效控制。分行主管須於 31 天內通知 EAA。',
      '2. 反洗錢協議須保存 5 年。公函地址須與 SPOB 一致。'
    ],
    detailedLawNotesEn: [
      '1. Agency management mandates effective control. Branch manager appointments require 31 days notice.',
      '2. AML agreements kept 5 years. Letterhead address must match SPOB.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「分行之間的內部人員調動必須通知 EAA」— 錯誤！內部調配無須通知。',
      '⚠ 考官陷阱：宣稱「信頭地址應寫商業登記證 (BR) 上的地址」— 錯誤！須寫 SPOB 上的營業地點。'
    ],
    trapsEn: [
      '⚠ Trap: Claims internal branch staff transfers must be notified to EAA — FALSE!',
      '⚠ Trap: Claims letterhead address comes from Business Registration certificate — FALSE!'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫三種須通知 EAA 的事項 (P-M-D) 以及一種常見不須通知的情況。',
      '□ 信頭三要件資料來自哪一份文件？'
    ],
    retrievalQuestionsEn: [
      '□ Name the 3 notifiable events to EAA (P-M-D) and 1 non-notifiable event.',
      '□ Where do the 3 letterhead particulars come from?'
    ],
    quiz: {
      questionZh: '地產代理公司設立新分行及委任分行主管時，須於委任後多少天內通知地產代理監管局？',
      questionEn: 'Within how many days of appointment must an agency notify the EAA of a newly appointed branch manager?',
      optionsZh: ['7 天內', '14 天內', '31 天內', '60 天內'],
      optionsEn: ['Within 7 days', 'Within 14 days', 'Within 31 days', 'Within 60 days'],
      correctIndex: 2,
      explanationZh: '正確答案為 C。委任主管須於 31 天內通知 EAA。',
      explanationEn: 'Correct answer is C. Notification required within 31 days.'
    }
  },

  'm4-l3': {
    id: 'm4-l3',
    moduleId: 'module-4',
    moduleZh: 'Module 4：租務實務、機構管理與應試技巧',
    moduleEn: 'Module 4: Tenancy, Management & Exam Mastery',
    titleZh: '4.3 十站交易記憶宮殿 (Transaction Memory Palace)',
    titleEn: '4.3 The 10-Station Transaction Memory Palace',
    capRef: 'Syllabus Sequence Method',
    memoryHookZh: {
      title: '從大門到後花園的十站式交易之旅',
      desc: '1大門(放盤委託) -> 2玄關(簽 Form 3/5) -> 3客廳(Form 1 物業資料) -> 4廚房(廣告同意) -> 5書房(睇樓陪同) -> 6樓梯(議價不收回扣) -> 7樓梯響(簽臨約/託管) -> 8睡房(資金信託) -> 9浴室(交吉/解押) -> 10後花園(售後/佣金爭議)。'
    },
    memoryHookEn: {
      title: '10-Station Front Door to Back Garden Route',
      desc: '1 Front Door (Listing) -> 2 Hallway (Form 3/5) -> 3 Living Room (Form 1) -> 4 Kitchen (Ads) -> 5 Study (Inspection) -> 6 Stairs (Negotiation) -> 7 Landing (PASP/Stakeholding) -> 8 Bedroom (Trust money) -> 9 Bathroom (Completion) -> 10 Back Garden (Post-transaction).'
    },
    scenarioZh: '如何運用十站式房屋空間記憶宮殿 (Memory Palace) 貫串整套地產代理監管條例及個案題交易順序？',
    scenarioEn: 'How to utilize the 10-Station Transaction Memory Palace to map out regulatory duties and Part II case study flow?',
    verifiedNotesZh: [
      '✓ 站點 1 (大門)：放盤委託與開價 (依業主指示非市場價)。',
      '✓ 站點 2 (玄關)：簽署法定協議 (Form 3/5 單數賣，Form 4/6 雙數買)。',
      '✓ 站點 7 (樓梯響)：簽臨約，遇 NEG-CHG-CONF 訂金交律師樓託管。',
      '✓ 站點 8 (睡房)：客戶資金存入銀行信託戶口，14 天發收據，副本存 3 年。'
    ],
    verifiedNotesEn: [
      '✓ Station 1 (Front Door): Listing & instructions (asking price per owner instruction).',
      '✓ Station 2 (Hallway): Sign prescribed agreements (Form 3/5 Odd, Form 4/6 Even).',
      '✓ Station 7 (Landing): Sign PASP; stakeholding deposit under NEG-CHG-CONF.',
      '✓ Station 8 (Bedroom): Client money into bank trust account, receipt in 14 days, keep copy 3 years.'
    ],
    detailedLawNotesZh: [
      '1. 記憶宮殿方法將所有監管職責按交易時間軸排列，精準對應 Part II 個案題之提問順序。'
    ],
    detailedLawNotesEn: [
      '1. Method of Loci maps regulatory duties onto a transaction timeline, directly matching Part II case question sequences.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：混淆臨約簽訂階段與完成交吉階段的法定文書及責任。'
    ],
    trapsEn: [
      '⚠ Trap: Confusing duties between provisional agreement signing and completion stage.'
    ],
    retrievalQuestionsZh: [
      '□ 請從站點 1 (大門) 到站點 10 (後花園) 口述走一遍記憶宮殿，並說出各站點對應的規則。'
    ],
    retrievalQuestionsEn: [
      '□ Walk the 10 stations aloud from memory and state the key rule at each station.'
    ],
    quiz: {
      questionZh: '在交易記憶宮殿中，收到客戶訂金現金後的正確處置（站點 8 睡房）為何？',
      questionEn: 'In the Memory Palace route, what is the correct handling of client cash deposit (Station 8 Bedroom)?',
      optionsZh: [
        '存入代理公司銀行信託戶口，14 天內出收據並保留副本 3 年',
        '存入代理個人銀行戶口代為保管',
        '直接轉交買方律師樓',
        '存入公司日常營運戶口'
      ],
      optionsEn: [
        'Deposit into agency bank trust account, issue receipt in 14 days, keep copy 3 years',
        'Deposit into agent\'s personal bank account',
        'Transfer directly to buyer\'s solicitor',
        'Deposit into agency office operational account'
      ],
      correctIndex: 0,
      explanationZh: '正確答案為 A。資金須存入代理公司銀行信託戶口，14 天內出收據，保留副本 3 年。',
      explanationEn: 'Correct answer is A. Must deposit in agency bank trust account, issue receipt within 14 days, keep copy 3 years.'
    }
  },

  'm4-l4': {
    id: 'm4-l4',
    moduleId: 'module-4',
    moduleZh: 'Module 4：租務實務、機構管理與應試技巧',
    moduleEn: 'Module 4: Tenancy, Management & Exam Mastery',
    titleZh: '4.4 Part II 個案研習技巧與審題「三行法則」',
    titleEn: '4.4 Part II Case Study Technique & 3-Line Method',
    capRef: 'Exam Technique & Land Search Annex',
    memoryHookZh: {
      title: '先看故事 -> 再看查冊 -> 草稿寫三行 -> 開始答題',
      desc: '草稿三行：1. Current Owner (現任業主/是否有死亡或遺囑)；2. Incumbrances (負擔欄/有無 S.24 命令或押記)；3. What Went Wrong (違規行為/無簽表格或私下回贈)。'
    },
    memoryHookEn: {
      title: 'Read Story -> Read Search -> Write 3 Lines -> Answer',
      desc: 'Three lines on scratchpad: 1. Current Owner; 2. Subsisting Incumbrances; 3. What Went Wrong.'
    },
    scenarioZh: 'EAQE Part II 占 20 題 (SQE 占 10 題) 個案題。面對隨附的土地查冊附件 (Annex)，正確的解題三行法則為何？',
    scenarioEn: 'Facing Part II case studies with Land Search Annex, what is the systematic 3-Line Method to answer questions efficiently?',
    verifiedNotesZh: [
      '✓ 個案題切勿先看第一題再反覆翻閱背景故事，否則必定超時。',
      '✓ 查閱 Annex 土地查冊：現任業主姓名、未清還按揭、建築物條例令 (S.24 / S.26 Order)、未決訴訟 (Lis Pendens)。',
      '✓ EAQE Part II 需對 12 題 (24分/40分)，SQE Part II 需對 6 題 (12分/20分) 方達及格門檻。'
    ],
    verifiedNotesEn: [
      '✓ Never read Question 1 first and repeatedly scan the case text; manage time strictly.',
      '✓ Inspect Annex Land Search: Current owner name, undischarged mortgages, Buildings Orders (S.24/S.26), Lis Pendens.',
      '✓ Pass threshold: EAQE Part II minimum 24/40 marks (12 questions); SQE Part II minimum 12/20 marks (6 questions).'
    ],
    detailedLawNotesZh: [
      '1. 個案題測試實務應用能力 (Level 4)。開啟 Annex PDF 對照查冊是取分關鍵。'
    ],
    detailedLawNotesEn: [
      '1. Part II tests practical application (Level 4). Cross-referencing Annex land search reports is vital.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：無視 Annex 查冊附件中的未清還按揭或押記令，直接建議將訂金交給賣方。'
    ],
    trapsEn: [
      '⚠ Trap: Ignoring undischarged mortgages in Annex land search and advising paying deposit directly to vendor.'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫審題草稿「三行法則」包含哪三行內容。'
    ],
    retrievalQuestionsEn: [
      '□ Name the 3 lines in the case study scratchpad method.'
    ],
    quiz: {
      questionZh: '解答 Part II 個案題時，面對隨附的土地查冊 (Annex)，正確的審題順序為何？',
      questionEn: 'When tackling Part II case studies with a Land Search Annex, what is the correct sequence?',
      optionsZh: [
        '先讀一遍背景故事 -> 查閱 Annex 土地查冊寫下三行重點 -> 開始答題',
        '直接看第一題，然後在個案故事中找答案',
        '先做完全部選擇題，最後才看護查冊附件',
        '只看護查冊附件，不讀背景故事'
      ],
      optionsEn: [
        'Read case story once -> Inspect Annex land search & write 3 lines -> Answer questions',
        'Read Question 1 first, then search case story',
        'Answer all questions first, check Annex at the end',
        'Read Annex only, skip case story'
      ],
      correctIndex: 0,
      explanationZh: '正確答案為 A。先讀故事，看護查冊寫三行草稿，再開始做題最高效。',
      explanationEn: 'Correct answer is A. Read story once, inspect Annex, write 3-line summary, then answer.'
    }
  },

  'm4-l5': {
    id: 'm4-l5',
    moduleId: 'module-4',
    moduleZh: 'Module 4：租務實務、機構管理與應試技巧',
    moduleEn: 'Module 4: Tenancy, Management & Exam Mastery',
    titleZh: '4.5 1-3-7-16-35 溫習階梯與大師級考前陷阱冊',
    titleEn: '4.5 Spaced Repetition Ladder & Master Trap Register',
    capRef: 'Memory Engineering & Exam Strategy',
    memoryHookZh: {
      title: '1 - 3 - 7 - 16 - 35 電話號碼式溫習階梯',
      desc: '第 1 天學習 -> 第 2 天檢索 -> 第 4 天檢索 -> 第 8 天檢索 -> 第 17 天全真模擬 -> 第 36 天總複習。考前最後一天：白紙默寫口訣、看一次陷阱冊、走一遍記憶宮殿，然後休息！切勿學新東西！'
    },
    memoryHookEn: {
      title: '1-3-7-16-35 Spaced Repetition Ladder',
      desc: 'Day 1 learn, Day 2 retrieve, Day 4 retrieve, Day 8 retrieve, Day 17 practice exam, Day 36 review. Final day: Blank-page mnemonics, read trap register, walk palace, sleep.'
    },
    scenarioZh: '如何運用 1 - 3 - 7 - 16 - 35 遺忘曲線複習階梯，並於考前最後一天進行高效備考？',
    scenarioEn: 'How to apply the 1 - 3 - 7 - 16 - 35 spaced repetition ladder and prepare on the final day before the examination?',
    verifiedNotesZh: [
      '✓ 及格門檻：總分達 60% 且 Part I 及 Part II 兩部分「同時及格」。(EAQE: 36/24分；SQE: 48/12分)。',
      '✓ 官方統計合格率：EAQE 僅約 27% - 39%，SQE 約 25% - 46%。絕大多數考生败在過度複習法律而忽視監管及租務。',
      '✓ 考前最後一天：默寫所有記憶鉤、瀏覽 Master Trap Register 陷阱冊、走一遍記憶宮殿、充足睡眠。'
    ],
    verifiedNotesEn: [
      '✓ Pass requirements: 60% overall AND BOTH parts passed (EAQE: Part I >=36, Part II >=24; SQE: Part I >=48, Part II >=12).',
      '✓ Official pass rates: EAQE 27-39%, SQE 25-46%. Most candidates fail by over-studying general law and under-studying tenancy.',
      '✓ Final day routine: Blank-page mnemonics, read Master Trap Register once, walk the Memory Palace, sleep well.'
    ],
    detailedLawNotesZh: [
      '1. 間隔重複 beats 重新閱讀。將錯題放入 1-3-7-16-35 階梯，考前專注審視常見錯項陷阱冊。'
    ],
    detailedLawNotesEn: [
      '1. Spaced retrieval beats re-reading. Place wrong answers on the ladder and review trap register entries.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：在考前最後一天試圖學習全新法律條文，導致焦慮與記憶混亂。'
    ],
    trapsEn: [
      '⚠ Trap: Trying to learn new legal topics on the final day before exam.'
    ],
    retrievalQuestionsZh: [
      '□ EAQE 及 SQE 的 Part I 與 Part II 及格分數線分別是多少？考前最後一天要做哪四件事？'
    ],
    retrievalQuestionsEn: [
      '□ What are the passing score thresholds for EAQE and SQE? What 4 things should you do on the final day?'
    ],
    quiz: {
      questionZh: '關於 EAQE 考試的及格門檻，下列哪項說明是完全正確的？',
      questionEn: 'Which statement regarding EAQE pass requirements is completely correct?',
      optionsZh: [
        '總分達到 60% 即可，不設單科分數要求',
        '總分達到 60% 且 Part I 至少 36 分、Part II 至少 24 分，兩部分須同時及格',
        '只要 Part I 取得 50 分，Part II 可以不及格',
        '總分達到 50% 即可獲頒牌照'
      ],
      optionsEn: [
        'Overall score 60% without individual part thresholds',
        'Overall score 60% AND Part I at least 36 marks, Part II at least 24 marks (both parts passed)',
        'Part I 50 marks passes even if Part II fails',
        'Overall score 50% passes'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。總分須達 60% 且兩部分同時過線 (Part I >= 36, Part II >= 24)。',
      explanationEn: 'Correct answer is B. Overall 60% and both parts must pass (Part I >=36, Part II >=24).'
    }
  }
};