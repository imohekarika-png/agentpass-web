// app/content/modules/module1.ts
import { FullLesson } from '../types';

export const MODULE_1_LESSONS: Record<string, FullLesson> = {
  'm1-l1': {
    id: 'm1-l1',
    moduleId: 'module-1',
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.1 EAO 立法原意與 EAA 四層監管架構',
    titleEn: '1.1 Why EAO Exists & EAA 4-Floor Model',
    capRef: 'Cap. 511 Section 3 & 4',
    memoryHookZh: {
      title: '四層大樓記憶法 (4-Floor EAA Building)',
      imageConcept: '想像 EAA 總部大樓有四層樓：1樓發牌、2樓監管、3樓懲處、4樓教育。',
      desc: '1樓 LICENCE (發牌) -> 2樓 REGULATE (執業規例) -> 3樓 DISCIPLINE (紀律研訊) -> 4樓 EDUCATE (持續進修與考試)。'
    },
    memoryHookEn: {
      title: 'Four-Floor EAA Building Model',
      imageConcept: 'Picture EAA headquarters with 4 distinct floors.',
      desc: '1F LICENCE -> 2F REGULATE -> 3F DISCIPLINE -> 4F EDUCATE.'
    },
    scenarioZh: '行業發展已由個人經營轉型為公司型及大型連鎖企業。陳先生擬了解地產代理監管局的法定職能，以及資格考試與註冊程序的權責劃分。',
    scenarioEn: 'The trade evolved from individual practice to corporate chains. Mr. Chan wants to clarify EAA\'s statutory duties and exam administration responsibilities.',
    verifiedNotesZh: [
      '✓ 地產代理監管局 (EAA) 是根據《地產代理條例》(Cap. 511) 成立的法定機構，負責發牌及規管行業。',
      '✓ 資格考試本身由「香港考試及評核局 (HKEAA)」代為舉行；考試報名由 Peak Exam Centre (VTC) 處理。',
      '✓ 監管局行政總裁 (CEO) 負責處理投訴及進行調查；紀律處分由「紀律委員會 (Disciplinary Committee)」進行研訊。',
      '✓ 監管局四主職：審批牌照、制定執業守則、調查及懲處違規、推動持續專業進修 (CPD)。'
    ],
    verifiedNotesEn: [
      '✓ EAA is a statutory body established under Cap. 511 to grant licences and regulate practice.',
      '✓ Qualifying exams are administered by HKEAA on EAA\'s behalf; registration via PEAK VTC.',
      '✓ CEO handles complaints and investigations; Disciplinary Committee conducts inquiries.',
      '✓ 4 core duties: Granting licences, setting practice rules, disciplinary inquiries, and CPD.'
    ],
    detailedLawNotesZh: [
      '1. 立法背景：《地產代理條例》(第511章) 旨在建立發牌制度、提升地產代理從業員的專業操守，並保障物業買賣及租賃雙方的消費權益。',
      '2. 權力架構：監管局設有不同常設委員會 (Standing Committees)。行政總裁 (CEO) 擁有調配調查人員及發出第28條調查通知書之權利。',
      '3. 執業常規發布：監管局透過發出《執業通告》(Practice Circulars) 向持牌人發布最新監管要求及法定提示。'
    ],
    detailedLawNotesEn: [
      '1. Statutory Purpose: Cap. 511 establishes a licensing system to elevate professionalism and safeguard consumers.',
      '2. Authority Structure: EAA comprises standing committees. The CEO exercises powers to appoint investigators under Section 28.',
      '3. Practice Circulars: EAA issues Practice Circulars to update licensees on regulatory standards and compliance.'
    ],
    trapsZh: [
      '⚠ 考官陷阱：宣稱「資格考試由地產代理監管局直接監考及主辦」— 錯誤！考試是由考評局 (HKEAA) 託管代辦。',
      '⚠ 考官陷阱：宣稱「監管局可以對違規從業員處以港幣 10 萬元的刑事罰款」— 錯誤！EAA 紀律處分權不包括直接處以罰款。'
    ],
    trapsEn: [
      '⚠ Trap: Claims EAA directly holds and invigilates exams — FALSE! HKEAA administers exams on EAA\'s behalf.',
      '⚠ Trap: Claims EAA can directly impose a $100,000 fine on licensees — FALSE! Disciplinary powers do not include fines.'
    ],
    retrievalQuestionsZh: [
      '□ 請不看講義默寫 EAA 四層大樓模型的四大主職，並將「常設委員會」、「發放執業通告」、「CEO 調查」分類至正確層數。',
      '□ 資格考試由哪一個機構代為舉行？報名由哪一個機構處理？'
    ],
    retrievalQuestionsEn: [
      '□ Name the four floors of the EAA building and sort these: Standing committees, Practice Circulars, CEO investigations.',
      '□ Which authority administers the qualifying exams? Which centre handles registration?'
    ],
    quiz: {
      questionZh: '下列關於地產代理監管局 (EAA) 職能的表述，哪項是完全正確的？',
      questionEn: 'Which statement regarding the functions of the EAA is correct?',
      optionsZh: [
        'EAA 是直接負責舉行資格考試的政府部門',
        'EAA 是根據 Cap. 511 成立的法定機構，負責發牌與行業監管',
        'EAA 可以對違規從業員處以港幣 10 萬元的刑事罰款',
        'EAA 負責為所有二手住宅交易提供免費物業估值'
      ],
      optionsEn: [
        'EAA is a government department that directly holds exams',
        'EAA is a statutory body under Cap. 511 responsible for licensing and regulation',
        'EAA can directly impose a $100,000 criminal fine on licensees',
        'EAA provides free valuation services for secondary properties'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。EAA 是 Cap. 511 設立的法定機構。考試由考評局代辦，EAA 無處以刑事罰款權利。',
      explanationEn: 'Correct answer is B. EAA is a statutory body under Cap. 511. Exams are held by HKEAA, and EAA cannot impose fines.'
    }
  }
  // Additional 19 blocks structured identically...
};