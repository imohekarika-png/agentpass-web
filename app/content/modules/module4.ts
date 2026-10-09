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
      imageConcept: '兩個人面對面隔著牆，牆上有一道裂縫，只有業主有工具去修補外牆。',
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
  }
};