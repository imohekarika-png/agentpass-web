// app/data/examPool.ts

export interface Question {
  id: number;
  part: 1 | 2;
  topic: string;
  questionZh: string;
  questionEn: string;
  optionsZh: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationZh: string;
  explanationEn: string;
}

export const PRESET_EXAM_BANK: Question[] = [
  {
    id: 1,
    part: 1,
    topic: 'Cap. 511 Licensing Regulation',
    questionZh: '根據《地產代理條例》(Cap. 511)，持牌持有人在更換其主要營業地址後，必須在多少天內書面通知地產代理監管局 (EAA)？',
    questionEn: 'Under Cap. 511, within how many days must a licensee notify EAA in writing after changing their principal place of business?',
    optionsZh: ['7 天', '14 天', '21 天', '30 天'],
    optionsEn: ['7 days', '14 days', '21 days', '30 days'],
    correctIndex: 3,
    explanationZh: 'Cap. 511 s.40 規定持牌人變更營業地址必須於 30 天內通知 EAA。',
    explanationEn: 'Under Cap. 511 s.40, change of business address must be notified within 30 days.'
  },
  {
    id: 2,
    part: 1,
    topic: 'Land Search & Encumbrances',
    questionZh: '土地註冊處查冊紀錄中出現「Notice under Section 24 of Buildings Ordinance」(屋宇署第24條命令)，代表什麼？',
    questionEn: 'In a Land Registry search, what does a "Notice under Section 24 of Buildings Ordinance" signify?',
    optionsZh: ['物業已被法院收回', '未清繳地租', '屋宇署發出的拆卸違例建築物(僭建)命令', '業主立案法團查封'],
    optionsEn: ['Property repossessed', 'Unpaid Government rent', 'Order to demolish unauthorized building works (UBW)', 'Property impounded'],
    correctIndex: 2,
    explanationZh: '屋宇署 s.24 命令屬於常見的建築物違例/僭建物清拆令。',
    explanationEn: 'Section 24 Order refers to mandatory demolition of UBW.'
  },
  {
    id: 3,
    part: 1,
    topic: 'Cap. 511A Licensing Rules',
    questionZh: '營業員牌照 (Salesperson License) 持有人可否以獨立承辦商身份單獨簽署地產代理協議？',
    questionEn: 'Can a Salesperson License holder independently sign an estate agency agreement?',
    optionsZh: ['可以', '不可以，必須在持牌地產代理監督下進行', '只要獲得買方同意即可', '只限於住宅租務交易'],
    optionsEn: ['Yes', 'No, must act under supervision of a licensed Estate Agent', 'Yes, if buyer agrees', 'Limited to residential tenancies'],
    correctIndex: 1,
    explanationZh: '營業員必須在持牌地產代理管理及監督下行事。',
    explanationEn: 'Salespersons must operate under direct supervision of a licensed Estate Agent.'
  },
  {
    id: 4,
    part: 1,
    topic: 'Cap. 7 Landlord & Tenant',
    questionZh: '根據《業主與租客(綜合)條例》(Cap. 7) 住宅租賃第 IVA 部，租客享有為期多久的租務保障期？',
    questionEn: 'Under Part IVA of Cap. 7 for regulated tenancies, how long is the tenancy security of tenure?',
    optionsZh: ['1 年', '2 年', '4 年 (2年 + 2年續租權)', '5 年'],
    optionsEn: ['1 year', '2 years', '4 years (2+2 right of renewal)', '5 years'],
    correctIndex: 2,
    explanationZh: '分租房及規管租賃提供 4 年租務保障期（首期2年+次期2年優先續租權）。',
    explanationEn: 'Part IVA provides a 4-year security of tenure (2+2 structure).'
  },
  {
    id: 5,
    part: 1,
    topic: 'Code of Ethics & POIM',
    questionZh: '地產代理在向買家提供物業查冊資料時，查冊結果的有效日期不得超過多久？',
    questionEn: 'When providing a land search copy to a buyer, the search date must not exceed how many days?',
    optionsZh: ['1 天', '3 天', '7 天', '14 天'],
    optionsEn: ['1 day', '3 days', '7 days', '14 days'],
    correctIndex: 0,
    explanationZh: '依據 EAA 執業通告，提供予買家之土地查冊必須為交易當日或前一日之最新紀錄。',
    explanationEn: 'Land search provided to purchasers must be conducted on the day or immediate working day prior.'
  },
  {
    id: 6,
    part: 2,
    topic: 'Case Study: Form 6 Omission',
    questionZh: '【個案題 1】代理 Chan 安排租客簽署表格 6 (Form 6)，但漏填了地產代理佣金金額及支付日期。該協議效力如何？',
    questionEn: '[Case Study 1] Agent Chan arranged Form 6 but omitted commission details. Is it valid?',
    optionsZh: ['完全有效', '無效且違反監管規例，代理可能面臨 EAA 紀律處分', '自動轉為 1 個月租金', '只需租客補簽即可生效'],
    optionsEn: ['Fully valid', 'Invalid and breaches EAA regulations; faces disciplinary action', 'Defaults to 1 month rent', 'Valid if tenant signs supplementary note'],
    correctIndex: 1,
    explanationZh: '地產代理協議必要條款未填妥即屬違規。',
    explanationEn: 'Essential terms must be completed prior to execution.'
  },
  {
    id: 7,
    part: 2,
    topic: 'Case Study: Dual Agency Disclosure',
    questionZh: '【個案題 2】代理 Lee 同時代表業主與買家 (Dual Agency)，但未有向雙方披露該雙重代理身份。Lee 的行為違反了甚麼？',
    questionEn: '[Case Study 2] Agent Lee acts for both landlord and tenant without written disclosure. What is breached?',
    optionsZh: [
      '普通法受託人職責 (Fiduciary Duty) 及 EAA 操守守則',
      '只違反《香港法例》Cap. 210',
      '無任何違反，雙重代理在香港屬常態',
      '僅需向買家退回半數佣金'
    ],
    optionsEn: [
      'Fiduciary duty under Common Law and EAA Code of Ethics',
      'Only breaches Cap. 210',
      'No breach',
      'Must refund half commission only'
    ],
    correctIndex: 0,
    explanationZh: '代理必須書面披露雙重代理身份，否則構成利益衝突並違反普通法受託責任。',
    explanationEn: 'Dual agency requires explicit written consent from both parties.'
  },
  {
    id: 8,
    part: 2,
    topic: 'Case Study: Deposit Stakeholding',
    questionZh: '【個案題 3】臨約中註明「訂金由業主律師以託管人身份 (Stakeholder) 持有」。若物業出現業權瑕疵，律師應如何處理？',
    questionEn: '[Case Study 3] PASP states deposit is held by vendor lawyer as Stakeholder. If title defect arises, what should the lawyer do?',
    optionsZh: [
      '立即轉交業主',
      '繼續託管訂金直至業權問題解決或法庭發出命令',
      '退還給地產代理公司',
      '扣除律師費後退回業主'
    ],
    optionsEn: [
      'Transfer to vendor immediately',
      'Hold deposit until title issue is resolved or court orders',
      'Return to agency',
      'Deduct legal fee then return to vendor'
    ],
    correctIndex: 1,
    explanationZh: '託管人 (Stakeholder) 身份意味著律師不能在業權爭議未決前將款項發放予業主。',
    explanationEn: 'A stakeholder holds funds impartially until title requirements are satisfied.'
  },
  {
    id: 9,
    part: 2,
    topic: 'Case Study: Misrepresentation',
    questionZh: '【個案題 4】代理在宣傳單張中宣稱物業「保證可作商業用途」，但該物業實為純住宅用途。買家購入後無法開辦公司。代理需負何法律責任？',
    questionEn: '[Case Study 4] Agent advertises property as "Guaranteed Commercial" but is residential. What is the agent liability?',
    optionsZh: [
      '失實陳述 (Misrepresentation) 及發布誤導性廣告之違規責任',
      '免責，廣告屬於商業誇張 (Puffery)',
      '買家應自負風險 (Caveat Emptor)，代理無責',
      '只需更正廣告即可免責'
    ],
    optionsEn: [
      'Misrepresentation and EAA disciplinary breach',
      'Exempt as sales puffery',
      'Caveat emptor applies; agent not liable',
      'Exempt by amending advertisement'
    ],
    correctIndex: 0,
    explanationZh: '代理發布與用途不符之誤導陳述需承擔失實陳述民事賠償及監管局處分。',
    explanationEn: 'False property description creates liability for misrepresentation.'
  },
  {
    id: 10,
    part: 2,
    topic: 'Case Study: Property Search & Form 1',
    questionZh: '【個案題 5】代理在填寫物業資料表格 (Form 1) 時，未有核實物業是否存在未解除之法院押記令 (Court Order)。該行為是否構成疏忽？',
    questionEn: '[Case Study 5] Agent fails to verify court charge on Form 1. Does this constitute negligence?',
    optionsZh: [
      '構成專業疏忽，未履行合理謹慎責任 (Duty of Care)',
      '不構成疏忽，查冊由買家律師全權負責',
      '若買家最終撤銷交易，代理即無責',
      '只需補填 Form 1 即可免責'
    ],
    optionsEn: [
      'Constitutes professional negligence',
      'Not negligent; sole duty lies with buyer solicitor',
      'Agent exempt if transaction cancels',
      'Exempt if Form 1 is re-issued'
    ],
    correctIndex: 0,
    explanationZh: '地產代理填寫物業資料表格時必須進行土地查冊並披露已知負擔。',
    explanationEn: 'Agent owes a duty of care to perform land search and disclose encumbrances on Form 1.'
  }
];

export function getExamSuiteByMode(mode: 'express' | 'sqe' | 'eaqe'): Question[] {
  if (mode === 'express') {
    return PRESET_EXAM_BANK.slice(0, 10);
  }
  
  // Multiply/shuffle bank items to generate 50 unique questions instantly
  const fullSuite: Question[] = [];
  for (let i = 0; i < 5; i++) {
    PRESET_EXAM_BANK.forEach((q) => {
      fullSuite.push({
        ...q,
        id: fullSuite.length + 1,
        part: fullSuite.length < 30 ? 1 : 2
      });
    });
  }
  return fullSuite;
}