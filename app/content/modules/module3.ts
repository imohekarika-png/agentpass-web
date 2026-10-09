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
      '✓ Occupation Permit states "Permitted User" of units; DOES NOT state saleable area or gross floor area.',
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
      '⚠ Trap: Claims Business Registration or M&A reveals company mortgages — FALSE! Must search Companies Registry.',
      '⚠ Trap: Claims Occupation Permit shows saleable area — FALSE! Saleable area comes from RVD.'
    ],
    retrievalQuestionsZh: [
      '□ 請默寫土地查冊四抽屜 (P-O-I-M) 分別代表什麼。',
      '□ 公司賣方需進行哪兩個查冊？哪三個常見公司文件不會顯示按揭負擔？'
    ],
    retrievalQuestionsEn: [
      '□ Name the 4 drawers of a land search (P-O-I-M).',
      '□ Name the 2 searches required for a company vendor and 3 company documents that will NOT reveal charges.'
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
  }
};