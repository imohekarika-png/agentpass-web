// app/data/quizQuestions.ts

export interface QuizQuestion {
  id: number;
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
  trackApplicability: 'BOTH' | 'EAQE_ONLY' | 'SQE_ONLY';
  isLocked?: boolean;
}

const TOPIC_QUESTION_DATA = [
  { blockId: 'b1', blockNum: 'Block 01', topicZh: 'EAA 架構與持牌資格', topicEn: 'EAA Structure & Licensing Qualifications', refZh: '《地產代理條例》Cap. 511 s.15', refEn: 'Cap. 511 s.15', track: 'BOTH' as const, qZh: '下列哪項條件【絕非】個人申請地產代理牌照 (EAQE) 或營業員牌照 (SQE) 的法定要求？', qEn: 'Which of the following is NOT a statutory requirement for applying for an individual Estate Agent or Salesperson licence?', optsZh: ['A. 年滿 18 歲', 'B. 完成中五 (Form 5) 或同等學歷', 'C. 具備最少 1 年地產相關工作經驗', 'D. 獲監管局評定為「適當人選」(Fit and Proper)'], optsEn: ['A. Aged 18 or above', 'B. Completed Form 5 or equivalent', 'C. Possess at least 1 year relevant estate agency work experience', 'D. Deemed a Fit and Proper person by the EAA'], ans: 2, expZh: '《地產代理條例》(Cap. 511) 規定之發牌四條件為：年滿 18 歲、中五學歷、Fit & Proper 評估及考試合格。「工作經驗」絕非發牌法定條件。', expEn: 'Under Cap. 511, the 4 statutory conditions are: Age 18+, Form 5, Fit & Proper, and Exam passed. Work experience is NOT required.' },
  { blockId: 'b2', blockNum: 'Block 02', topicZh: '營業地點與通知', topicEn: 'Business Premises', refZh: 'Cap. 511 s.40', refEn: 'Cap. 511 s.40', track: 'BOTH' as const, qZh: '變更營業地址須於幾多天內通知 EAA？', qEn: 'Address changes must be notified within how many days?', optsZh: ['A. 7 天內', 'B. 14 天內', 'C. 31 天內', 'D. 60 天內'], optsEn: ['A. 7 days', 'B. 14 days', 'C. 31 days', 'D. 60 days'], ans: 2, expZh: '必須於 31 天內書面通知。', expEn: 'Within 31 days.' },
  { blockId: 'b3', blockNum: 'Block 03', topicZh: '廣告發布規範', topicEn: 'Advertising Rules', refZh: 'Cap. 511A s.9', refEn: 'Cap. 511A s.9', track: 'BOTH' as const, qZh: '廣告前必須取得哪份文件？', qEn: 'Which document is required before advertising?', optsZh: ['A. Form 3', 'B. PASP', 'C. HKID', 'D. Land Search'], optsEn: ['A. Form 3', 'B. PASP', 'C. HKID', 'D. Land Search'], ans: 0, expZh: '必須取得 Form 3 授權。', expEn: 'Form 3 required.' },
  { blockId: 'b4', blockNum: 'Block 04', topicZh: '客戶存款', topicEn: 'Client Money', refZh: 'Cap. 511B', refEn: 'Cap. 511B', track: 'EAQE_ONLY' as const, qZh: '收取存款後須於幾多天內發收據？', qEn: 'Receipts must be issued within how many days?', optsZh: ['A. 即時', 'B. 7 天', 'C. 14 天', 'D. 30 天'], optsEn: ['A. Immediately', 'B. 7 days', 'C. 14 days', 'D. 30 days'], ans: 2, expZh: '14天內。', expEn: '14 days.' },
  { blockId: 'b5', blockNum: 'Block 05', topicZh: '雙重代理', topicEn: 'Dual Agency', refZh: 'Cap. 511A s.13', refEn: 'Cap. 511A s.13', track: 'BOTH' as const, qZh: '雙重代理必須？', qEn: 'Dual agency requires?', optsZh: ['A. 事前書面同意', 'B. 事後口頭通知', 'C. 隱瞞', 'D. 只獲賣方同意'], optsEn: ['A. Prior written consent', 'B. Oral notice', 'C. Conceal', 'D. Vendor consent only'], ans: 0, expZh: '事前書面同意。', expEn: 'Prior written consent.' },
  { blockId: 'b6', blockNum: 'Block 06', topicZh: '秘密回佣', topicEn: 'Secret Commissions', refZh: 'Cap. 201 s.9', refEn: 'Cap. 201 s.9', track: 'BOTH' as const, qZh: '未經同意收回佣觸犯？', qEn: 'Secret commission breaches?', optsZh: ['A. 防賄條例 s.9', 'B. 盜竊罪', 'C. 民事法', 'D. 無罪'], optsEn: ['A. POBO s.9', 'B. Theft', 'C. Civil law', 'D. No crime'], ans: 0, expZh: '防賄條例 s.9。', expEn: 'POBO s.9.' },
  { blockId: 'b7', blockNum: 'Block 07', topicZh: '一手樓價單', topicEn: 'First-hand Price List', refZh: 'Cap. 621', refEn: 'Cap. 621', track: 'BOTH' as const, qZh: '售樓書及價單須提前幾天公佈？', qEn: 'Brochure and price list advance days?', optsZh: ['A. 書7價3', 'B. 書14價7', 'C. 書3價1', 'D. 皆30天'], optsEn: ['A. Brochure 7, Price 3', 'B. Brochure 14, Price 7', 'C. Brochure 3, Price 1', 'D. 30 days'], ans: 0, expZh: '書7價3。', expEn: 'Brochure 7, Price 3.' },
  { blockId: 'b8', blockNum: 'Block 08', topicZh: '一手樓冷靜期', topicEn: 'Cooling-off Period', refZh: 'Cap. 621 s.53', refEn: 'Cap. 621 s.53', track: 'BOTH' as const, qZh: '一手樓買家冷靜期內退訂沒收多少？', qEn: 'Deposit forfeited during cooling-off?', optsZh: ['A. 5%', 'B. 10%', 'C. 0%', 'D. 2.5%'], optsEn: ['A. 5%', 'B. 10%', 'C. 0%', 'D. 2.5%'], ans: 0, expZh: '5%。', expEn: '5%.' },
  { blockId: 'b9', blockNum: 'Block 09', topicZh: '15年根源', topicEn: '15-Year Root', refZh: 'Cap. 219 s.13', refEn: 'Cap. 219 s.13', track: 'BOTH' as const, qZh: '業權契據須至少多少年歷史？', qEn: 'Title root must be how old?', optsZh: ['A. 7 年', 'B. 15 年', 'C. 20 年', 'D. 30 年'], optsEn: ['A. 7 yrs', 'B. 15 yrs', 'C. 20 yrs', 'D. 30 yrs'], ans: 1, expZh: '15年。', expEn: '15 yrs.' },
  { blockId: 'b10', blockNum: 'Block 10', topicZh: '聯權共有', topicEn: 'Joint Tenancy', refZh: 'Cap. 219 s.24', refEn: 'Cap. 219 s.24', track: 'BOTH' as const, qZh: '聯權轉讓份額會？', qEn: 'Transferring a joint share causes?', optsZh: ['A. 無效', 'B. 轉為分權共有', 'C. 獨佔', 'D. 沒影響'], optsEn: ['A. Void', 'B. Severance to TIC', 'C. Sole title', 'D. No effect'], ans: 1, expZh: '轉為分權共有。', expEn: 'Severance to TIC.' },
  { blockId: 'b11', blockNum: 'Block 11', topicZh: 'Form 3', topicEn: 'Form 3', refZh: 'Cap. 511A s.6', refEn: 'Cap. 511A s.6', track: 'BOTH' as const, qZh: 'Form 3 未填有效期？', qEn: 'Form 3 without validity period?', optsZh: ['A. 完全無效', 'B. 3個月', 'C. 永久', 'D. 1年'], optsEn: ['A. Void', 'B. 3 months', 'C. Perpetual', 'D. 1 year'], ans: 0, expZh: '完全無效。', expEn: 'Void.' },
  { blockId: 'b12', blockNum: 'Block 12', topicZh: '土地註冊', topicEn: 'Land Registration', refZh: 'Cap. 128 s.5', refEn: 'Cap. 128 s.5', track: 'BOTH' as const, qZh: '優先權追溯期限為？', qEn: 'Relation back period for registration?', optsZh: ['A. 1 個月', 'B. 2 個月', 'C. 3 個月', 'D. 6 個月'], optsEn: ['A. 1 month', 'B. 2 months', 'C. 3 months', 'D. 6 months'], ans: 0, expZh: '1 個月內。', expEn: 'Within 1 month.' },
  { blockId: 'b13', blockNum: 'Block 13', topicZh: '法團成立', topicEn: 'IO Formation', refZh: 'Cap. 344 s.3', refEn: 'Cap. 344 s.3', track: 'EAQE_ONLY' as const, qZh: '成立法團需多少份數支持？', qEn: 'Shares needed to form IO?', optsZh: ['A. 10%', 'B. 30%', 'C. 50%', 'D. 100%'], optsEn: ['A. 10%', 'B. 30%', 'C. 50%', 'D. 100%'], ans: 1, expZh: '30%。', expEn: '30%.' },
  { blockId: 'b14', blockNum: 'Block 14', topicZh: '雙重查冊', topicEn: 'Double Search', refZh: 'Cap. 128', refEn: 'Cap. 128', track: 'BOTH' as const, qZh: '公司賣方必須查？', qEn: 'Company vendor requires?', optsZh: ['A. 公司註冊處查冊', 'B. 商業登記', 'C. 破產署', 'D. 房屋署'], optsEn: ['A. Companies Registry', 'B. BR', 'C. OR', 'D. HD'], ans: 0, expZh: '公司註冊處。', expEn: 'Companies Registry.' },
  { blockId: 'b15', blockNum: 'Block 15', topicZh: '公司授權', topicEn: 'Corporate Authority', refZh: 'Cap. 622', refEn: 'Cap. 622', track: 'EAQE_ONLY' as const, qZh: '核實公司代表簽署須看？', qEn: 'To verify company signatory?', optsZh: ['A. 董事會決議', 'B. BR', 'C. ID', 'D. 稅表'], optsEn: ['A. Board Resolution', 'B. BR', 'C. ID', 'D. Tax return'], ans: 0, expZh: '董事會決議。', expEn: 'Board Resolution.' },
  { blockId: 'b16', blockNum: 'Block 16', topicZh: '沒收租賃', topicEn: 'Forfeiture', refZh: 'Cap. 7', refEn: 'Cap. 7', track: 'BOTH' as const, qZh: '欠租多少天業主可收樓？', qEn: 'Unpaid rent days for forfeiture?', optsZh: ['A. 7 天', 'B. 14 天', 'C. 15 天', 'D. 30 天'], optsEn: ['A. 7 days', 'B. 14 days', 'C. 15 days', 'D. 30 days'], ans: 2, expZh: '15天。', expEn: '15 days.' },
  { blockId: 'b17', blockNum: 'Block 17', topicZh: '印花稅罰款', topicEn: 'Stamp Duty Penalty', refZh: 'Cap. 117 s.9', refEn: 'Cap. 117 s.9', track: 'BOTH' as const, qZh: '逾期2個月印花稅最高罰？', qEn: 'Max penalty for >2 months late?', optsZh: ['A. 2倍', 'B. 4倍', 'C. 10倍', 'D. 20倍'], optsEn: ['A. 2x', 'B. 4x', 'C. 10x', 'D. 20x'], ans: 2, expZh: '10倍。', expEn: '10x.' },
  { blockId: 'b18', blockNum: 'Block 18', topicZh: '僭建令', topicEn: 'Building Orders', refZh: 'Cap. 123 s.24', refEn: 'Cap. 123 s.24', track: 'EAQE_ONLY' as const, qZh: '未獲許可骨灰龕城規會發？', qEn: 'Unauthorized columbarium notice?', optsZh: ['A. 執行通知書', 'B. 清拆令', 'C. 破產令', 'D. 封閉令'], optsEn: ['A. Enforcement Notice', 'B. Removal Order', 'C. Bankruptcy', 'D. Closure'], ans: 0, expZh: '執行通知書。', expEn: 'Enforcement Notice.' },
  { blockId: 'b19', blockNum: 'Block 19', topicZh: '授權書', topicEn: 'Power of Attorney', refZh: 'Cap. 31', refEn: 'Cap. 31', track: 'BOTH' as const, qZh: '賣樓授權書必須是？', qEn: 'Land POA must be?', optsZh: ['A. 契據', 'B. 合約', 'C. 口頭', 'D. 電郵'], optsEn: ['A. Deed', 'B. Contract', 'C. Oral', 'D. Email'], ans: 0, expZh: '契據 (Deed)。', expEn: 'Deed.' },
  { blockId: 'b20', blockNum: 'Block 20', topicZh: '競爭條例', topicEn: 'Competition Law', refZh: 'Cap. 619', refEn: 'Cap. 619', track: 'BOTH' as const, qZh: '代理合謀定價觸犯？', qEn: 'Price fixing breaches?', optsZh: ['A. 第一行為守則', 'B. 商品說明', 'C. 代理條例', 'D. 商業合約'], optsEn: ['A. First Conduct Rule', 'B. TDO', 'C. EAO', 'D. Contract'], ans: 0, expZh: '第一行為守則。', expEn: 'First Conduct Rule.' }
];

export const RAW_QUESTION_BANK: QuizQuestion[] = Array.from({ length: 130 }, (_, idx) => {
  const qId = idx + 101;
  const tmpl = TOPIC_QUESTION_DATA[idx % TOPIC_QUESTION_DATA.length];

  return {
    id: qId,
    blockId: tmpl.blockId,
    blockNum: tmpl.blockNum,
    topicZh: `${tmpl.topicZh} (題 #${qId})`,
    topicEn: `${tmpl.topicEn} (Q #${qId})`,
    questionZh: tmpl.qZh,
    questionEn: tmpl.qEn,
    optionsZh: tmpl.optsZh,
    optionsEn: tmpl.optsEn,
    answerIndex: tmpl.ans,
    explanationZh: tmpl.expZh,
    explanationEn: tmpl.expEn,
    statuteRefZh: tmpl.refZh,
    statuteRefEn: tmpl.refEn,
    trackApplicability: tmpl.track
  };
});