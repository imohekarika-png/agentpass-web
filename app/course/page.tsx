// app/course/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ExamTrackerCTA from '@/app/components/ExamTrackerCTA';
import OfficialScheduleFetcher from '@/app/components/OfficialScheduleFetcher';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { 
  BookOpen, 
  CheckCircle2, 
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
  FileText,
  Lock,
  ShieldCheck,
  Search,
  ChevronUp,
  ChevronDown,
  BookmarkCheck
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

// Complete 20-Block Official EAA Syllabus integrated with your course schema
const TOPIC_BLOCKS: TopicBlock[] = [
  { 
    id: 'b1', num: 'Block 01', part: 'I', scope: 'SQE_EAQE', level: 'Level 2 - Basic Knowledge',
    categoryZh: '發牌與資格', categoryEn: 'Licensing & Qualifications',
    titleZh: '地產代理監管局 (EAA) 架構與持牌資格', titleEn: 'EAA Structure & Licensing Qualifications',
    summaryZh: 'Cap. 511 規定的代理 (EAQE) 與營業員 (SQE) 發牌條件、適當人選測試 (Fit & Proper) 及四層監管架構。',
    summaryEn: 'Licensing conditions under Cap. 511 for EAQE/SQE, Fit & Proper criteria, and 4-floor EAA structure.',
    keyStatutes: ['Cap. 511 s.15', 'Cap. 511 s.19'], suggestedDay30: 1,
    lesson: {
      overviewZh: '本單元為香港地產代理法規之基石。掌握 EAA 四大職能與持牌四大法定門檻，為 Level 2 基礎考核重點。',
      overviewEn: 'Foundation of HK agency law. Covers 4 EAA functions and 4 statutory eligibility pillars.',
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
      memoryHookZh: '【18 - 5 - 12 - F&P】口訣：18 歲🎂、中五學歷📜、12 個月考試合格 (SQE 為 6 個月)⌛、Fit & Proper 審查🛡️。',
      memoryHookEn: 'Mnemonic: 18 (Age) - 5 (Form 5) - 12 (Months validity, 6 for SQE) - Fit & Proper.',
      retrievalQuestionsZh: [
        '1. 請不看筆記列出個人申請牌照的四大法定條件？哪一項常被誤認為條件但實際不是？',
        '2. 營業員牌照 (SQE) 與代理牌照 (EAQE) 的考試合格有效期限分別為多久？'
      ],
      retrievalQuestionsEn: [
        '1. Without looking, name the 4 statutory eligibility requirements. Which common factor is NOT required?',
        '2. What are the exam validity windows for SQE vs EAQE applications?'
      ],
      doNotConfusePairs: [{
        topicZh: '考試合格有效期限', topicEn: 'Exam Validity Window',
        correctZh: '代理牌照 (EAQE) 為 12 個月', correctEn: '12 months for Estate Agent License (EAQE)',
        wrongTurnZh: '營業員牌照 (SQE) 為 6 個月', wrongTurnEn: '6 months for Salesperson License (SQE)'
      }],
      examTrapsZh: [' Trap: 主考官常宣稱「具備 3 年行業經驗的營業員可擔任分行經理」——錯誤！必須持有大牌。'],
      examTrapsEn: [' Trap: "Salesperson with 3 years experience can manage branch" — FALSE. Requires Agent License.']
    }
  },
  { 
    id: 'b2', num: 'Block 02', part: 'I', scope: 'SQE_EAQE', level: 'Level 4 - Understand + Apply',
    categoryZh: '營業地點規管', categoryEn: 'Business Premises',
    titleZh: '營業地點展示牌照與 31 天法定通知期', titleEn: 'License Display & 31-Day Address Change Notice',
    summaryZh: '每個營業地點必須展示牌照正本。變更營業地點後必須於 31 天內以書面通知 EAA。',
    summaryEn: 'Mandatory display of license. Address changes require written notice within 31 days.',
    keyStatutes: ['Cap. 511 s.36', 'Cap. 511 s.40'], suggestedDay30: 2,
    lesson: {
      overviewZh: '涵蓋分支機構 (SPOB) 設立、分行經理獨立有效控制及營業地點變更之 31 天法定限期。',
      overviewEn: 'Covers branch SPOB registration, manager effective control, and 31-day address change notice.',
      verifiedNotesZh: [
        '✓ 每個營業地點必須於顯眼處展示地產代理牌照正本或營業詳情說明書 (SPOB)。',
        '✓ 營業地點或公司註冊地址如有任何變更，持牌人必須於 31 天內以書面通知 EAA。',
        '✓ 設立新分行時，必須於 31 天內通知 EAA 關於「分行經理之委任」。'
      ],
      verifiedNotesEn: [
        '✓ Original license or SPOB must be conspicuously displayed at every branch.',
        '✓ Any change of business address must be notified to EAA in writing within 31 days.',
        '✓ Opening a new branch requires notifying EAA of Manager Appointment within 31 days.'
      ],
      memoryHookZh: '【31 天郵筒 📬】搬遷地址、委任分行經理，均需在 31 天內投信通知 EAA！',
      memoryHookEn: 'Mnemonic: 31-Day Mailbox 📬. Address change and manager appointments reported within 31 days.',
      retrievalQuestionsZh: ['1. 分行開張時，必須於 31 天內向 EAA 申報甚麼事項？'],
      retrievalQuestionsEn: ['1. What event must be reported to EAA within 31 days of opening a branch?'],
      doNotConfusePairs: [{
        topicZh: '開張與變更通知', topicEn: 'Branch Opening vs Change Notice',
        correctZh: '於 31 天內通知 EAA「分行經理之委任」', correctEn: 'Notify EAA of Manager Appointment within 31 days',
        wrongTurnZh: '誤以為只需通知「開張」本身', wrongTurnEn: 'Mistakenly notifying opening date instead of manager'
      }],
      examTrapsZh: [' Trap: 宣稱「分行開張只需通知地址，無需指定經理」——錯誤！必須指定大牌經理。'],
      examTrapsEn: [' Trap: "Branch opening only needs address notice, no licensed manager" — FALSE.']
    }
  },
  {
    id: 'b3', num: 'Block 03', part: 'I', scope: 'SQE_EAQE', level: 'Level 2 - Basic Knowledge',
    categoryZh: '執業常規與廣告', categoryEn: 'Practice & Advertising',
    titleZh: '廣告發布規範與業主書面同意 (Form 3/5)', titleEn: 'Advertising Rules & Vendor Written Consent',
    summaryZh: '發布物業廣告前必須先取得業主書面同意 (Form 3/5)，標明真實開價與牌照號碼。',
    summaryEn: 'Mandatory vendor written authorization prior to issuing property advertisements.',
    keyStatutes: ['Cap. 511A s.9', 'Cap. 511A s.10'], suggestedDay30: 3,
    lesson: {
      overviewZh: '規範二手物業廣告宣傳與開價合規性，防止虛假廣告與無授權放盤。',
      overviewEn: 'Regulates property advertising and pricing compliance to eliminate misleading ads.',
      verifiedNotesZh: [
        '✓ 未取得業主簽署 Form 3 或 Form 5 書面授權前，嚴禁刊登任何廣告。',
        '✓ 廣告上顯示之價格必須為業主親自指示或書面同意之真實開價。',
        '✓ 廣告必須清晰標明持牌地產代理行名稱及牌照號碼。'
      ],
      verifiedNotesEn: [
        '✓ Written authorization (Form 3/5) must be secured prior to publishing any advertisement.',
        '✓ Advertised prices must reflect genuine instructions authorized in writing by vendors.',
        '✓ Advertisements must clearly state the agency business name and license number.'
      ],
      memoryHookZh: '【先授權、後廣告 📢】無 Form 3/5 放盤紙，絕不可貼出廣告！',
      memoryHookEn: 'Mnemonic: Authorize First, Advertise Second 📢. No Form 3/5, no ad.',
      retrievalQuestionsZh: ['1. 刊登廣告前必須取得業主簽署哪份文件？'],
      retrievalQuestionsEn: ['1. Which form must be signed by the vendor before advertising?'],
      doNotConfusePairs: [{
        topicZh: '廣告開價來源', topicEn: 'Advertised Price Authority',
        correctZh: '業主書面指示之真實開價', correctEn: 'Genuine price instructed in writing by vendor',
        wrongTurnZh: '代理估算或同行開價', wrongTurnEn: 'Agent estimated or competitor pricing'
      }],
      examTrapsZh: [' Trap: 宣稱「代理可先刊登超低吸客價，獲業主同意後再修改」——違規！'],
      examTrapsEn: [' Trap: "Agent can list false low price to attract buyers" — ILLEGAL.']
    }
  },
  { 
    id: 'b4', num: 'Block 04', part: 'I', scope: 'EAQE_ONLY', level: 'Level 4 - Understand + Apply',
    categoryZh: '客戶帳戶管理', categoryEn: 'Client Account Trust',
    titleZh: '客戶存款 (Client Money) 託管與獨立信託帳戶', titleEn: 'Client Money Custody & Independent Trust Accounts',
    summaryZh: '代理收取之訂金與客戶款項必須存入指定客戶信託戶口，14天發收據、保存3年。',
    summaryEn: 'All client deposits must be held in designated bank trust accounts.',
    keyStatutes: ['Cap. 511 s.43', 'Client Money Rules'], suggestedDay30: 5,
    lesson: {
      overviewZh: 'EAQE 專屬 Level 4 靈魂考點！規管客戶訂金託管與信託戶口。',
      overviewEn: 'EAQE-only Level 4 statutory core! Governs client money trust deposits.',
      verifiedNotesZh: [
        '✓ 代理代客戶收取之訂金，必須即時存入於持牌銀行開立之「客戶信託帳戶」。',
        '✓ 收取客戶款項後，必須於 14 天內 向客戶發出書面收據。',
        '✓ 款項收據副本必須妥善保存不少於 3 年；AML 紀錄保存不少於 5 年。'
      ],
      verifiedNotesEn: [
        '✓ Client money received must be immediately deposited into a designated Client Trust Account.',
        '✓ Written receipts must be issued within 14 days.',
        '✓ Receipt copies retained for 3 years; AML records for 5 years.'
      ],
      memoryHookZh: '【3 - 2 - 14 - 3】3 種用途、2 個對象、14 天發收據、保存 3 年！',
      memoryHookEn: 'Mnemonic: 3 uses, 2 recipients, 14 days receipt, 3 years retention.',
      retrievalQuestionsZh: ['1. 收取客戶訂金後發出收據的法定限期是多少天？'],
      retrievalQuestionsEn: ['1. What is the deadline to issue a client money receipt?'],
      doNotConfusePairs: [{
        topicZh: '存款存放地點', topicEn: 'Deposit Destination',
        correctZh: '代理行銀行客戶信託戶口', correctEn: 'Agency designated Client Trust Account',
        wrongTurnZh: '營業戶口或個人戶口', wrongTurnEn: 'Operating or personal account'
      }],
      examTrapsZh: [' Trap: 宣稱「訂金可存入代理個人戶口暫存」——違規！'],
      examTrapsEn: [' Trap: "Deposit can be placed in personal account temporarily" — ILLEGAL.']
    }
  },
  {
    id: 'b5', num: 'Block 05', part: 'I', scope: 'SQE_EAQE', level: 'Level 3 - Basic + Apply',
    categoryZh: '雙重代理與衝突', categoryEn: 'Dual Agency & Conflict',
    titleZh: '雙重代理 (Dual Agency) 與佣金透明披露', titleEn: 'Dual Agency & Commission Disclosure',
    summaryZh: '同時代表買賣雙方時必須事前取得雙方書面同意並透明披露佣金率。',
    summaryEn: 'Mandatory prior written consent and commission rate disclosure for dual agency.',
    keyStatutes: ['Cap. 511A s.13', 'Cap. 511A s.14'], suggestedDay30: 6,
    lesson: {
      overviewZh: '規範代理人在雙重代理或利益衝突情況下之法定披露程序。',
      overviewEn: 'Governs disclosure procedures for dual agency and personal interest conflicts.',
      verifiedNotesZh: [
        '✓ 同時代表買家與賣家時，必須在代理協議中明確說明並取得雙方書面簽署同意。',
        '✓ 代理人若購買自己放盤或賣予親屬，必須向主事人書面披露個人利益。',
        '✓ 佣金金額或折扣率必須透明列明，禁止私下隱瞞。'
      ],
      verifiedNotesEn: [
        '✓ Acting for both parties requires explicit written disclosure and signed consent.',
        '✓ Personal interest in property transactions must be disclosed in writing to principal.',
        '✓ Commission rates and discounts must be transparently recorded.'
      ],
      memoryHookZh: '【雙重同意、利益申報 🤝】同時代表雙方，一定要兩邊簽字！',
      memoryHookEn: 'Mnemonic: Double Consent 🤝. Dual agency needs signatures from both sides.',
      retrievalQuestionsZh: ['1. 代理同時代表買賣雙方需要符合甚麼條件？'],
      retrievalQuestionsEn: ['1. What condition is mandatory when acting as dual agent?'],
      doNotConfusePairs: [{
        topicZh: '雙重代理同意時機', topicEn: 'Dual Agency Consent Timing',
        correctZh: '事前書面同意', correctEn: 'Prior written consent',
        wrongTurnZh: '事後口頭補辦', wrongTurnEn: 'Subsequent oral notice'
      }],
      examTrapsZh: [' Trap: 宣稱「只需向賣方披露代表買方，無須向買方披露」——錯誤！兩邊都要。'],
      examTrapsEn: [' Trap: "Only need vendor consent, not buyer consent" — FALSE.']
    }
  },
  {
    id: 'b6', num: 'Block 06', part: 'I', scope: 'SQE_EAQE', level: 'Level 2 - Basic Knowledge',
    categoryZh: '物業轉易法規', categoryEn: 'Conveyancing Law',
    titleZh: '物業轉易及物業條例 (Cap. 219) 業權契據 15 年根源', titleEn: 'Conveyancing (Cap. 219) & 15-Year Good Title Root',
    summaryZh: '賣方必須提供至少 15 年業權契據方可證明良好業權 (Good Title)。',
    summaryEn: 'Vendor must produce title root deeds spanning at least 15 years.',
    keyStatutes: ['Cap. 219 s.13'], suggestedDay30: 12,
    lesson: {
      overviewZh: '掌握香港地產轉易條例 Cap. 219 之 15 年業權根源 (Title Root) 規則。',
      overviewEn: 'Master Cap. 219 15-year title root rule for proving good title.',
      verifiedNotesZh: [
        '✓ 賣方證明良好業權 (Good Title) 時，必須提供至少 15 年歷史之業權契據。',
        '✓ 契據處置土地必須以書面並作為契據 (Deed) 蓋印簽立。',
        '✓ 買賣雙方簽署臨約後，賣方有責任向買方交付無瑕疵業權。'
      ],
      verifiedNotesEn: [
        '✓ Proving good title requires producing root title deeds spanning at least 15 years.',
        '✓ Land conveyances must be executed in writing as a Deed under seal.',
        '✓ Vendor is obligated to assign free from encumbrances (Good Title).'
      ],
      memoryHookZh: '【業權 15 年 🌳】良好業權追溯 15 年，契據必須成 Deed！',
      memoryHookEn: 'Mnemonic: 15 Years Root 🌳. Title root goes back 15 years.',
      retrievalQuestionsZh: ['1. 證明良好業權需要提供多少年歷史之契據？'],
      retrievalQuestionsEn: ['1. How many years of title root deeds are required to show good title?'],
      doNotConfusePairs: [{
        topicZh: '業權契據年限', topicEn: 'Title Root Duration',
        correctZh: '至少 15 年 (15 Years)', correctEn: 'At least 15 Years',
        wrongTurnZh: '7 年或 20 年', wrongTurnEn: '7 Years or 20 Years'
      }],
      examTrapsZh: [' Trap: 宣稱「只要提供土地查冊，賣方無需提供 15 年舊契」——錯誤！'],
      examTrapsEn: [' Trap: "Land search alone replaces 15-year title deeds requirement" — FALSE.']
    }
  },
  {
    id: 'b7', num: 'Block 07', part: 'I', scope: 'SQE_EAQE', level: 'Level 3 - Basic + Apply',
    categoryZh: '聯權與分權共有', categoryEn: 'Co-Ownership',
    titleZh: '聯權共有 (Joint Tenancy) 與中斷 (Severance)', titleEn: 'Joint Tenancy & Severance (Cap. 219)',
    summaryZh: '聯權共有具長存權 (Survivorship)；轉讓份額破壞四同，導致中斷為分權共有。',
    summaryEn: 'Joint Tenancy includes survivorship; share conveyance severs into Tenancy in Common.',
    keyStatutes: ['Cap. 219 s.24'], suggestedDay30: 14,
    lesson: {
      overviewZh: '解析聯權共有長存權利與中斷 (Severance) 為分權共有之法律效果。',
      overviewEn: 'Analyzes joint tenancy survivorship rights and severance into tenancy in common.',
      verifiedNotesZh: [
        '✓ 聯權共有 (Joint Tenancy) 具長存權，一方身分後業權自動由長存者承繼。',
        '✓ 聯權共有人轉讓個人份額予第三方，破壞四同，中斷 (Severance) 為分權共有。',
        '✓ 分權共有人可獨立出售其個人份額，無須其他共有人同意。'
      ],
      verifiedNotesEn: [
        '✓ Joint tenancy carries Right of Survivorship; deceased share auto-passes to survivor.',
        '✓ Conveying a joint share severs joint tenancy into Tenancy in Common.',
        '✓ Tenants in Common may independently sell undivided shares without co-owner consent.'
      ],
      memoryHookZh: '【長存聯權、轉讓分權 ✂️】聯權自動長存，一轉讓就 Severance 切開！',
      memoryHookEn: 'Mnemonic: Joint Survives, Transfer Severs ✂️.',
      retrievalQuestionsZh: ['1. 聯權共有人未經同意將份額賣予第三方，會產生何法律效果？'],
      retrievalQuestionsEn: ['1. What happens if a joint tenant sells share to a 3rd party?'],
      doNotConfusePairs: [{
        topicZh: '共有形式長存權', topicEn: 'Survivorship Right',
        correctZh: '聯權共有 (Joint Tenancy) 具長存權', correctEn: 'Joint Tenancy has Survivorship',
        wrongTurnZh: '分權共有 (Tenancy in Common) 無長存權', wrongTurnEn: 'Tenancy in Common has NO Survivorship'
      }],
      examTrapsZh: [' Trap: 宣稱「分權共有人出售個人份額必須取得其他業主 100% 同意」——錯誤！'],
      examTrapsEn: [' Trap: "Tenants in common need 100% co-owner consent to sell" — FALSE.']
    }
  },
  {
    id: 'b8', num: 'Block 08', part: 'I', scope: 'SQE_EAQE', level: 'Level 3 - Basic + Apply',
    categoryZh: '印花稅與印花稅條例', categoryEn: 'Stamp Duty Ordinance',
    titleZh: '印花稅條例 (Cap. 117) 逾期罰款與從價印花稅 (AVD)', titleEn: 'Stamp Duty (Cap. 117) Late Stamping Penalties & AVD',
    summaryZh: '逾期超過 2 個月未繳印花稅最高可被處以 10 倍罰款；臨約/正式合約印花稅安排。',
    summaryEn: 'Overdue >2 months subject to max 10x penalty; AVD stamping rules.',
    keyStatutes: ['Cap. 117 s.9', 'Cap. 117 s.15'], suggestedDay30: 26,
    lesson: {
      overviewZh: '解析香港印花稅 Cap. 117 繳付時限與逾期 10 倍罰款機制。',
      overviewEn: 'Analyzes Cap. 117 stamp duty execution deadlines and 10x penalty mechanism.',
      verifiedNotesZh: [
        '✓ 住宅買賣合約須於簽署後 30 天內加蓋印花 (Stamp Duty)。',
        '✓ 逾期超過 2 個月未繳付印花稅，最高可被處以應繳稅款 10 倍之罰款。',
        '✓ 未加蓋印花之合約，依法不可於土地註冊處註冊，亦不可作為法庭呈堂證供。'
      ],
      verifiedNotesEn: [
        '✓ Residential agreements must be stamped within 30 days of execution.',
        '✓ Stamping overdue for >2 months attracts a maximum penalty of 10 times the duty.',
        '✓ Unstamped agreements are inadmissible in court and unregisterable at Land Registry.'
      ],
      memoryHookZh: '【30 天加蓋、逾期 10 倍 💸】30 天內交稅，逾 2 個月罰 10 倍！',
      memoryHookEn: 'Mnemonic: 30-Day Stamping, 10x Penalty 💸.',
      retrievalQuestionsZh: ['1. 印花稅逾期超過 2 個月，最高罰款為多少倍？'],
      retrievalQuestionsEn: ['1. What is the max penalty if stamp duty is overdue for >2 months?'],
      doNotConfusePairs: [{
        topicZh: '印花稅逾期最高罰款', topicEn: 'Max Late Stamping Penalty',
        correctZh: '10 倍應繳稅款 (10 Times)', correctEn: '10 Times duty',
        wrongTurnZh: '2 倍或 4 倍', wrongTurnEn: '2 Times or 4 Times'
      }],
      examTrapsZh: [' Trap: 宣稱「未蓋印花之合約仍可直接於土地註冊處註冊」——錯誤！'],
      examTrapsEn: [' Trap: "Unstamped agreements can be registered directly at Land Registry" — FALSE.']
    }
  },
  { 
    id: 'b9', num: 'Block 09', part: 'II', scope: 'SQE_EAQE', level: 'Level 4 - Understand + Apply',
    categoryZh: '地產代理協議', categoryEn: 'Agency Agreements',
    titleZh: '法定地產代理協議表格 Form 3 至 Form 6 詳解', titleEn: 'Statutory Agency Agreements (Forms 3 to 6) Mastery',
    summaryZh: 'Form 3 (賣方)、Form 4 (買方)、Form 5 (出租人) 及 Form 6 (承租人) 之法定條款與最長 3 個月有效期。',
    summaryEn: 'Statutory terms, max 3-month validity, and commission clauses for Forms 3 to 6.',
    keyStatutes: ['Form 3', 'Form 4', 'Form 5', 'Form 6'], suggestedDay30: 15,
    lesson: {
      overviewZh: '單數表屬賣方/業主端，雙數表屬買方/租客端。掌握 Form 3–6 約束力。',
      overviewEn: 'Odd forms seller-side, Even forms buyer-side. Master Form 3-6 rules.',
      verifiedNotesZh: [
        '✓ 單數賣方/業主：Form 3 (出售賣方)、Form 5 (出租業主)。',
        '✓ 雙數買方/租客：Form 4 (購買買方)、Form 6 (承租租客)。',
        '✓ 地產代理協議的最長有效期限為 3 個月。',
        '✓ 豁免情況：店舖出售、辦公室租賃、非獨立住宅單位租賃。'
      ],
      verifiedNotesEn: [
        '✓ Odd = Seller/Landlord: Form 3 (Vendor), Form 5 (Landlord).',
        '✓ Even = Buyer/Tenant: Form 4 (Purchaser), Form 6 (Tenant).',
        '✓ Maximum statutory validity is 3 months.',
        '✓ No prescribed form for: Shop sales, Office leases, Non-self-contained flats.'
      ],
      memoryHookZh: '【單數賣 🏷️、雙數買 🛒】最長有效期 3 個月！',
      memoryHookEn: 'Mnemonic: Odd Sells 🏷️, Even Buys 🛒. Max 3 months validity.',
      retrievalQuestionsZh: ['1. 業主出租住宅應簽哪張表格？最長有效期多久？'],
      retrievalQuestionsEn: ['1. Which form does a landlord sign? What is max validity?'],
      doNotConfusePairs: [{
        topicZh: '表格屬性', topicEn: 'Form Assignment',
        correctZh: 'Form 3 屬賣方，Form 4 屬買方', correctEn: 'Form 3 Vendor, Form 4 Purchaser',
        wrongTurnZh: '混淆買賣端表格', wrongTurnEn: 'Confusing seller/buyer forms'
      }],
      examTrapsZh: [' Trap: 宣稱「出租商業寫字樓必須簽署 Form 5」——錯誤！僅適用於住宅。'],
      examTrapsEn: [' Trap: "Office leasing requires Form 5" — FALSE. Prescribed forms for residential only.']
    }
  },
  { 
    id: 'b10', num: 'Block 10', part: 'II', scope: 'SQE_EAQE', level: 'Level 4 - Understand + Apply',
    categoryZh: '土地查冊 P-O-I-M', categoryEn: 'Land Search P-O-I-M',
    titleZh: '土地查冊 P-O-I-M 四大核心章節深度解析', titleEn: 'Land Search P-O-I-M (Property, Owner, Incumbrances, Memorials)',
    summaryZh: 'Property, Owner, Incumbrances 及 Memorials 四大抽屜解析，個案題勝負關鍵。',
    summaryEn: 'Analysis of Property Details, Ownership, Incumbrances, and Memorials.',
    keyStatutes: ['Land Registration Ordinance Cap. 128'], suggestedDay30: 20,
    lesson: {
      overviewZh: 'Level 4 個案題 (Part II) 核心！公司賣方金科玉律：必須做「雙重查冊」。',
      overviewEn: 'Level 4 Case Study core! Company vendor golden rule: TWO SEARCHES required.',
      verifiedNotesZh: [
        '✓ P-O-I-M 四大抽屜：Property, Owner, Incumbrances, Memorials。',
        '✓ 公司賣方：必須做「雙重查冊」(土地註冊處 + 公司註冊處查浮動押記)。',
        '✓ 佔用許可證 (OP) 只提供「法定許可用途」，不提供實用面積。'
      ],
      verifiedNotesEn: [
        '✓ P-O-I-M: Property, Owner, Incumbrances, Memorials.',
        '✓ Company Vendor: TWO SEARCHES required (Land Registry + Companies Registry).',
        '✓ Occupation Permit (OP) states Permitted User ONLY; no saleable area.'
      ],
      memoryHookZh: '【P-O-I-M 四大抽屜🗄️】公司賣家一定要查公司註冊處！',
      memoryHookEn: 'Mnemonic: P-O-I-M 4-Drawer Cabinet🗄️. Company vendor needs CR search.',
      retrievalQuestionsZh: ['1. 賣家是一家有限公司時，除了土地查冊還必須做甚麼查冊？'],
      retrievalQuestionsEn: ['1. When vendor is a limited company, what second search is required?'],
      doNotConfusePairs: [{
        topicZh: '公司賣方查冊地點', topicEn: 'Company Vendor Search',
        correctZh: '土地註冊處 + 公司註冊處 (Two Searches)', correctEn: 'Land Registry + Companies Registry',
        wrongTurnZh: '商業登記證 (BR)', wrongTurnEn: 'Business Registration Certificate (BR)'
      }],
      examTrapsZh: [' Trap: 宣稱「商業登記證 (BR) 可查出公司物業按揭」——錯誤！必須查 CR。'],
      examTrapsEn: [' Trap: "BR certificate reveals property charges on company" — FALSE. Needs CR search.']
    }
  },
  {
    id: 'b11', num: 'Block 11', part: 'I', scope: 'EAQE_ONLY', level: 'Level 4 - Understand + Apply',
    categoryZh: '大廈管理與公契', categoryEn: 'Building Management',
    titleZh: '大廈管理條例 (Cap. 344) 與公契 (DMC) 違規加建', titleEn: 'Building Management (Cap. 344) & DMC Covenants',
    summaryZh: '成立業主立案法團 (IO) 需 30% 份數；公契具法定約束力，違規可申禁制令。',
    summaryEn: 'IO formation requires 30% shares; DMC covenants run with land.',
    keyStatutes: ['Cap. 344 s.3', 'Cap. 344 s.16'], suggestedDay30: 19,
    lesson: {
      overviewZh: 'EAQE 專屬 Level 4 考點！涵蓋大廈公契 (DMC) 約束力與 IO 成立門檻。',
      overviewEn: 'EAQE-only Level 4 core! Covers DMC covenant enforcement and IO 30% threshold.',
      verifiedNotesZh: [
        '✓ 成立業主立案法團 (IO) 需獲得不少於 30% 不可分割份數業主支持。',
        '✓ 公契 (DMC) 為具法律約束力之契約，效力隨土地轉移 (Runs with the land)。',
        '✓ 業主違規改建公用部分，管委會可申請法庭禁制令 (Injunction)。'
      ],
      verifiedNotesEn: [
        '✓ Forming Incorporated Owners (IO) requires at least 30% undivided shares.',
        '✓ DMC covenants run with the land and bind all present/future owners.',
        '✓ Management Committee can apply for Court Injunction against DMC breaches.'
      ],
      memoryHookZh: '【30% 門檻 🏢】成立法團需 30% 份數，公契跟屋不跟人！',
      memoryHookEn: 'Mnemonic: 30% IO Threshold 🏢. DMC runs with land.',
      retrievalQuestionsZh: ['1. 成立業主立案法團需要多少比例不可分割份數支持？'],
      retrievalQuestionsEn: ['1. What undivided share percentage is needed to form an IO?'],
      doNotConfusePairs: [{
        topicZh: '法團成立門檻', topicEn: 'IO Formation Threshold',
        correctZh: '30% 不可分割份數', correctEn: '30% undivided shares',
        wrongTurnZh: '50% 或 100% 業主人數', wrongTurnEn: '50% or 100% owners headcount'
      }],
      examTrapsZh: [' Trap: 宣稱「公契僅對一手買家有效，二手買家不受約束」——錯誤！'],
      examTrapsEn: [' Trap: "DMC binds first buyer only, not subsequent owners" — FALSE.']
    }
  },
  {
    id: 'b12', num: 'Block 12', part: 'I', scope: 'EAQE_ONLY', level: 'Level 4 - Understand + Apply',
    categoryZh: '公司賣方與浮動押記', categoryEn: 'Corporate Vendors',
    titleZh: '公司賣方 (Corporate Vendor) 與浮動押記 (Floating Charge)', titleEn: 'Corporate Vendors & Floating Charges (Cap. 622)',
    summaryZh: '公司處置資產須防範浮動押記及 Negative Pledge；查核 Board Resolution 授權。',
    summaryEn: 'Corporate asset disposition requires checking Floating Charges and Board Resolutions.',
    keyStatutes: ['Companies Ordinance Cap. 622'], suggestedDay30: 22,
    lesson: {
      overviewZh: 'EAQE 專屬 Level 4 商業物業考點！公司賣方清盤風險與授權簽署人查核。',
      overviewEn: 'EAQE-only Level 4 commercial core! Company liquidation risks and signatory authority.',
      verifiedNotesZh: [
        '✓ 公司註冊處 (CR) 查冊可查出未登記於土地註冊處之浮動押記及 Negative Pledge。',
        '✓ 買方公司或賣方公司簽署合約，必須查核董事會決議案 (Board Resolution)。',
        '✓ 清盤呈請 (Winding-up Petition) 開始後，處置公司財產依法屬無效 (Void)。'
      ],
      verifiedNotesEn: [
        '✓ Companies Registry search reveals Floating Charges and Negative Pledge clauses.',
        '✓ Corporate signings require checking Board Resolutions and Articles.',
        '✓ Dispositions after winding-up petition commencement are void by law.'
      ],
      memoryHookZh: '【公司賣方雙查冊 🏢】土地處查物業，公司處查押記與董事會決議！',
      memoryHookEn: 'Mnemonic: Corporate Double Check 🏢.',
      retrievalQuestionsZh: ['1. 查核公司簽署人合法權限需要查閱甚麼文件？'],
      retrievalQuestionsEn: ['1. What corporate document verifies signatory legal capacity?'],
      doNotConfusePairs: [{
        topicZh: '公司授權文件', topicEn: 'Corporate Authority Document',
        correctZh: '董事會決議案 (Board Resolution)', correctEn: 'Board Resolution',
        wrongTurnZh: '商業登記證或股東個人 ID', wrongTurnEn: 'Business Registration or Shareholder ID'
      }],
      examTrapsZh: [' Trap: 宣稱「只要股東個人簽名即可代表公司賣樓」——錯誤！須董事會授權。'],
      examTrapsEn: [' Trap: "Shareholder personal signature validly binds company" — FALSE.']
    }
  },
  {
    id: 'b13', num: 'Block 13', part: 'I', scope: 'EAQE_ONLY', level: 'Level 4 - Understand + Apply',
    categoryZh: '城市規劃與建築物條例', categoryEn: 'Town Planning & BO',
    titleZh: '城市規劃條例 (Cap. 131) 違例發展與 s.24 清拆令', titleEn: 'Town Planning (Cap. 131) & BO s.24 Orders',
    summaryZh: '城規會 Enforcement Notice 執行通知書；屋宇署 s.24 清拆令與 UBW 潛在業權瑕疵。',
    summaryEn: 'Town Planning Enforcement Notices; BO s.24 Removal Orders & UBW defects.',
    keyStatutes: ['Cap. 131 s.23', 'Cap. 123 s.24'], suggestedDay30: 27,
    lesson: {
      overviewZh: 'EAQE 專屬 Level 4 考點！農地違規與屋宇署 s.24 違例建築物 (UBW) 清拆令。',
      overviewEn: 'EAQE-only Level 4 core! Agricultural land unauthorized use and s.24 UBW removal orders.',
      verifiedNotesZh: [
        '✓ 於新界農地上未獲許可興建骨灰龕，城規會可發出執行通知書 (Enforcement Notice)。',
        '✓ 屋宇署第 24 條清拆令 (s.24 Removal Order) 屬於土地查冊負擔欄之重大業權瑕疵。',
        '✓ 臨約特別條款可擬定「按現狀 (As Is) 承擔 UBW」，買方知悉並承擔日後清拆風險。'
      ],
      verifiedNotesEn: [
        '✓ Town Planning Board issues Enforcement Notices against unauthorized land development.',
        '✓ Buildings Dept s.24 Removal Orders in Incumbrances constitute title defects.',
        '✓ Special PASP conditions may specify "As Is with UBW accepted" placing removal risk on buyer.'
      ],
      memoryHookZh: '【Enforcement Notice ⚠️】農地違規出 Enforcement，僭建清拆出 s.24！',
      memoryHookEn: 'Mnemonic: Enforcement Notice ⚠️ for planning, s.24 for UBW.',
      retrievalQuestionsZh: ['1. 農地未經許可改建，城規會可發出哪種法定通知書？'],
      retrievalQuestionsEn: ['1. Which statutory notice does Town Planning Board issue for unauthorized land use?'],
      doNotConfusePairs: [{
        topicZh: '違例命令發出機關', topicEn: 'Order Issuing Authority',
        correctZh: '城規會發 Enforcement Notice，屋宇署發 s.24 清拆令', correctEn: 'Town Planning issues Enforcement Notice; BO issues s.24 Order',
        wrongTurnZh: '混淆發出機關', wrongTurnEn: 'Confusing issuing authority'
      }],
      examTrapsZh: [' Trap: 宣稱「按現狀 (As Is) 條款自動豁免賣方隱瞞業權瑕疵責任」——錯誤！'],
      examTrapsEn: [' Trap: "As Is clause exculpates vendor from concealing title defects" — FALSE.']
    }
  },
  {
    id: 'b14', num: 'Block 14', part: 'I', scope: 'EAQE_ONLY', level: 'Level 3 - Basic + Apply',
    categoryZh: '非住宅物業法規', categoryEn: 'Non-residential Covenants',
    titleZh: '工商舖物業代理實務與政府地契用途限制', titleEn: 'Commercial/Industrial Practice & Government Lease Covenants',
    summaryZh: '非住宅物業買賣與租賃、政府地契用途限制 (User Restrictions) 及工廈活化。',
    summaryEn: 'Non-residential agency, government lease user covenants, and industrial revitalization.',
    keyStatutes: ['Land Grant Covenants'], suggestedDay30: 28,
    lesson: {
      overviewZh: 'EAQE 專屬 Level 3 考點！政府地契用途限制 (User Clause) 與工廈違契風險。',
      overviewEn: 'EAQE-only Level 3 core! Government lease user clauses and industrial breach risks.',
      verifiedNotesZh: [
        '✓ 工廈地契通常限制用途為「工業及/或貨倉」，未取得豁免前禁止作零售、教學或一般辦公用途。',
        '✓ 違反地契用途條款，地政總署有權釘契，甚至收回土地 (Re-entry)。',
        '✓ 代理推介工廈單位作非工業用途前，必須核實物業是否已取得短期豁免書 (Waiver)。'
      ],
      verifiedNotesEn: [
        '✓ Industrial leases restrict use to "industrial and/or godown"; retail/office uses require a waiver.',
        '✓ Breaching user covenants allows Lands Department to register a warning letter or re-enter the land.',
        '✓ Agents must verify if a valid waiver exists before marketing industrial units for non-industrial use.'
      ],
      memoryHookZh: '【用途限制要查契 🏭】工廈不可隨便做寫字樓，除非有 Waiver！',
      memoryHookEn: 'Mnemonic: Check the User Clause 🏭. No offices in industrial without a Waiver.',
      retrievalQuestionsZh: ['1. 若工廈單位未經批准改作零售用途，地政總署最嚴厲的處分是什麼？'],
      retrievalQuestionsEn: ['1. What is the most severe penalty by Lands Dept for unauthorized retail use in industrial buildings?'],
      doNotConfusePairs: [{
        topicZh: '地契用途限制執行機關', topicEn: 'Lease Covenant Enforcement Authority',
        correctZh: '地政總署 (Lands Department)', correctEn: 'Lands Department',
        wrongTurnZh: '屋宇署 (Buildings Department)', wrongTurnEn: 'Buildings Department'
      }],
      examTrapsZh: [' Trap: 宣稱「只要取得消防處許可，工廈即可隨意開設補習社」——錯誤！必須符合地契用途或取得豁免。'],
      examTrapsEn: [' Trap: "Fire Services approval alone allows tutoring centers in industrial buildings" — FALSE. Must comply with lease.']
    }
  },
  {
    id: 'b15', num: 'Block 15', part: 'I', scope: 'SQE_EAQE', level: 'Level 2 - Basic Knowledge',
    categoryZh: '打擊洗錢與反恐', categoryEn: 'AML & CTF',
    titleZh: '打擊洗錢 (Cap. 615) 客戶審查與大額現金交易', titleEn: 'AML (Cap. 615) Customer Due Diligence & Cash Transactions',
    summaryZh: '處理達 HK$120,000 現金交易須作客戶盡職審查 (CDD)；舉報可疑交易 (STR)。',
    summaryEn: 'CDD required for cash transactions ≥ HK$120,000; Suspicious Transaction Reporting (STR).',
    keyStatutes: ['Cap. 615'], suggestedDay30: 29,
    lesson: {
      overviewZh: '防洗黑錢法規重點，涵蓋大額現金審查門檻與通風報信罪。',
      overviewEn: 'AML regulations covering large cash transaction thresholds and tipping-off offences.',
      verifiedNotesZh: [
        '✓ 當單一或關聯交易涉及現金達 HK$120,000 或以上，代理必須進行客戶盡職審查 (CDD)。',
        '✓ 代理如懷疑任何交易涉及犯罪得益，必須盡快向聯合財富情報組 (JFIU) 提交可疑交易報告 (STR)。',
        '✓ 向受疑人透露已作出舉報，即觸犯「通風報信罪」(Tipping-off)。',
        '✓ 客戶審查紀錄及交易文件必須於交易完成後保存最少 5 年。'
      ],
      verifiedNotesEn: [
        '✓ Agents must perform Customer Due Diligence (CDD) for cash transactions of HK$120,000 or more.',
        '✓ Suspicious transactions must be reported to the Joint Financial Intelligence Unit (JFIU) via STR.',
        '✓ Revealing to a suspect that a report was made constitutes the offence of "Tipping-off".',
        '✓ CDD and transaction records must be kept for at least 5 years after transaction completion.'
      ],
      memoryHookZh: '【12 萬現金查底細 💰】見疑即報 JFIU，切勿通風報信！',
      memoryHookEn: 'Mnemonic: 120k Cash Check 💰. Report to JFIU, No Tipping-off!',
      retrievalQuestionsZh: ['1. 進行大額現金盡職審查的法定門檻金額為多少？', '2. 向客戶透露已舉報其可疑交易會觸犯什麼罪行？'],
      retrievalQuestionsEn: ['1. What is the statutory cash threshold amount requiring CDD?', '2. Revealing a suspicious transaction report to the client constitutes what offence?'],
      doNotConfusePairs: [{
        topicZh: '大額現金門檻', topicEn: 'Large Cash Threshold',
        correctZh: 'HK$120,000 或以上', correctEn: 'HK$120,000 or more',
        wrongTurnZh: 'HK$100,000 或 HK$50,000', wrongTurnEn: 'HK$100,000 or HK$50,000'
      }],
      examTrapsZh: [' Trap: 宣稱「提交 STR 後應提醒客戶暫緩交易以免被捕」——嚴重違法！構成通風報信罪。'],
      examTrapsEn: [' Trap: "Agent should warn client to delay transaction after filing STR" — ILLEGAL! Constitutes Tipping-off.']
    }
  },
  {
    id: 'b16', num: 'Block 16', part: 'I', scope: 'SQE_EAQE', level: 'Level 2 - Basic Knowledge',
    categoryZh: '個人資料私隱', categoryEn: 'Data Privacy',
    titleZh: '個人資料 (私隱) 條例 (Cap. 486) 與直接促銷', titleEn: 'Personal Data (Privacy) Ordinance (Cap. 486) & Direct Marketing',
    summaryZh: '收集身分證副本限制、保障資料六大原則 (DPPs) 及直接促銷 (Direct Marketing) 必須取得同意 (Opt-in)。',
    summaryEn: 'HKID collection limits, 6 DPPs, and mandatory Opt-in for direct marketing.',
    keyStatutes: ['Cap. 486 Part VIA'], suggestedDay30: 30,
    lesson: {
      overviewZh: '掌握六項保障資料原則 (DPPs) 及直接促銷的法定同意程序。',
      overviewEn: 'Master the 6 Data Protection Principles and statutory consent for direct marketing.',
      verifiedNotesZh: [
        '✓ 代理不應在純粹安排睇樓時收集客戶香港身份證副本，除非為了準備具約束力的合約。',
        '✓ 進行直接促銷 (如電話推銷新盤) 前，必須明確告知客戶並取得其明確同意 (Opt-in)。',
        '✓ 客戶有權隨時要求停止接收直接促銷訊息 (Opt-out)，代理必須免費及無條件遵從。',
        '✓ 未經同意將客戶資料交予第三方 (如按揭轉介公司) 屬違法行為。'
      ],
      verifiedNotesEn: [
        '✓ Agents should not collect HKID copies just for viewing arrangements, unless preparing a binding contract.',
        '✓ Must obtain explicit consent (Opt-in) before using personal data for direct marketing (e.g., cold calling).',
        '✓ Clients can request to cease direct marketing (Opt-out) anytime; agents must comply free of charge.',
        '✓ Transferring client data to third parties (e.g., mortgage brokers) without consent is illegal.'
      ],
      memoryHookZh: '【先同意，後推銷 📞】睇樓抄名即可，簽約才收證件副本！',
      memoryHookEn: 'Mnemonic: Opt-in before Call 📞. Only collect ID copy when signing contract.',
      retrievalQuestionsZh: ['1. 代理在哪個階段才可以合法收集客戶的香港身份證副本？', '2. 將客戶資料用於直接促銷前必須獲得什麼？'],
      retrievalQuestionsEn: ['1. At what stage can an agent legally collect a copy of a client\'s HKID?', '2. What must be obtained before using client data for direct marketing?'],
      doNotConfusePairs: [{
        topicZh: '直接促銷同意機制', topicEn: 'Direct Marketing Consent',
        correctZh: '必須取得明確同意 (Opt-in)', correctEn: 'Explicit consent required (Opt-in)',
        wrongTurnZh: '只要客戶無反對即可 (Opt-out default)', wrongTurnEn: 'Assuming consent if no objection (Opt-out default)'
      }],
      examTrapsZh: [' Trap: 宣稱「客戶簽妥睇樓紙後，代理即可自動將其資料加入公司營銷名單」——違法！必須另行獲取直接促銷同意。'],
      examTrapsEn: [' Trap: "Signing a viewing form automatically allows adding client to marketing list" — ILLEGAL! Requires separate direct marketing consent.']
    }
  },
  {
    id: 'b17', num: 'Block 17', part: 'I', scope: 'SQE_EAQE', level: 'Level 2 - Basic Knowledge',
    categoryZh: '一手樓銷售條例', categoryEn: 'First-hand Sales',
    titleZh: '一手住宅物業銷售條例 (Cap. 621) 售樓書與價單', titleEn: 'First-hand Sales Brochure & Price List (Cap. 621)',
    summaryZh: '售樓書開售前 7 天、價單開售前 3 天公佈，實用面積為唯一計價標準。',
    summaryEn: 'Brochure 7 days and price list 3 days prior to sale; saleable area sole pricing unit.',
    keyStatutes: ['Cap. 621 s.25', 'Cap. 621 s.32'], suggestedDay30: 10,
    lesson: {
      overviewZh: '掌握 Cap. 621 一手新盤合規宣傳與「書 7 價 3」時間表。',
      overviewEn: 'Master Cap. 621 first-hand property rules and the "7-day brochure, 3-day price list" rule.',
      verifiedNotesZh: [
        '✓ 售樓說明書 (Sales Brochure) 必須於開售前至少 7 天公佈。',
        '✓ 價單 (Price List) 必須於開售前至少 3 天公佈。',
        '✓ 實用面積 (Saleable Area) 為一手新盤唯一合法之計價面積。'
      ],
      verifiedNotesEn: [
        '✓ Sales Brochure must be public at least 7 days before sales begin.',
        '✓ Price List must be public at least 3 days before sales begin.',
        '✓ Saleable Area is the sole legal area representation for first-hand pricing.'
      ],
      memoryHookZh: '【書 7 價 3 📖】口訣：售樓書提前 7 天，價單提前 3 天！',
      memoryHookEn: 'Mnemonic: Brochure 7, Price 3 📖.',
      retrievalQuestionsZh: ['1. 一手樓開售前，售樓書及價單分別須提前幾天公佈？'],
      retrievalQuestionsEn: ['1. How many days in advance must brochures and price lists be made available?'],
      doNotConfusePairs: [{
        topicZh: '一手樓面積標準', topicEn: 'First-hand Area Standard',
        correctZh: '實用面積 (Saleable Area)', correctEn: 'Saleable Area only',
        wrongTurnZh: '建築面積 (Gross Floor Area)', wrongTurnEn: 'Gross Floor Area'
      }],
      examTrapsZh: [' Trap: 宣稱「一手新盤廣告可用建築面積呎價宣傳」——違規！'],
      examTrapsEn: [' Trap: "First-hand ads can use gross floor area price" — ILLEGAL.']
    }
  },
  {
    id: 'b18', num: 'Block 18', part: 'I', scope: 'SQE_EAQE', level: 'Level 3 - Basic + Apply',
    categoryZh: '一手樓冷靜期', categoryEn: 'Cooling-off Period',
    titleZh: '一手樓臨時合約 (PASP) 5 天冷靜期與訂金沒收', titleEn: 'First-hand PASP 5-Day Cooling-off & Deposit Forfeiture',
    summaryZh: '簽 PASP 後 5 個工作天內撤回交易，賣方沒收 5% 臨時訂金，不得追討殘餘損失。',
    summaryEn: '5-working-day cooling-off; vendor forfeits 5% deposit with no further claims.',
    keyStatutes: ['Cap. 621 s.52', 'Cap. 621 s.53'], suggestedDay30: 11,
    lesson: {
      overviewZh: '解析一手住宅 PASP 簽署、冷靜期退訂與 5% 沒收條款。',
      overviewEn: 'Analyzes first-hand PASP execution, cooling-off withdrawal, and 5% forfeiture limit.',
      verifiedNotesZh: [
        '✓ 買家簽署 PASP 後享有 5 個工作天冷靜期。',
        '✓ 若買家於 5 工作天內放棄交易，賣方沒收樓價 5% 之臨時訂金。',
        '✓ 賣方沒收 5% 訂金後，無權向買家追討任何額外損失。'
      ],
      verifiedNotesEn: [
        '✓ Buyer enjoys a 5-working-day cooling-off period after signing PASP.',
        '✓ Withdrawal within 5 days results in forfeiture of the 5% preliminary deposit.',
        '✓ Vendor has no right to claim further damages beyond the forfeited 5% deposit.'
      ],
      memoryHookZh: '【沒收 5% 鎖定 🔒】冷靜期撤回，只賠 5% 臨訂，追討無門！',
      memoryHookEn: 'Mnemonic: Locked at 5% 🔒. Deposit forfeit capped at 5%.',
      retrievalQuestionsZh: ['1. 簽署一手 PASP 後撤回，賣方最多可追討多少賠償？'],
      retrievalQuestionsEn: ['1. Upon PASP withdrawal, what is vendor max recovery?'],
      doNotConfusePairs: [{
        topicZh: '冷靜期長度', topicEn: 'Cooling-off Length',
        correctZh: '5 個工作天 (5 Working Days)', correctEn: '5 Working Days',
        wrongTurnZh: '5 個日曆天 (5 Calendar Days)', wrongTurnEn: '5 Calendar Days'
      }],
      examTrapsZh: [' Trap: 宣稱「賣方沒收 5% 訂金後可追討樓價下跌差額」——錯誤！'],
      examTrapsEn: [' Trap: "Vendor can claim further market drop loss after 5% forfeit" — FALSE.']
    }
  },
  {
    id: 'b19', num: 'Block 19', part: 'I', scope: 'SQE_EAQE', level: 'Level 3 - Basic + Apply',
    categoryZh: '授權書與遺囑認證', categoryEn: 'Power of Attorney & Probate',
    titleZh: '授權書條例 (Cap. 31) 契據簽立與遺囑認證書 (Probate)', titleEn: 'Power of Attorney (Cap. 31) Deeds & Letters of Probate',
    summaryZh: '處置土地授權書必須以契據 (Deed) 簽立；遺產物業須查驗 Letters of Probate。',
    summaryEn: 'Land Power of Attorney executed as Deed; estate sale requires Letters of Probate.',
    keyStatutes: ['Cap. 31 s.2', 'Cap. 10 s.13'], suggestedDay30: 29,
    lesson: {
      overviewZh: '解析授權書 (Power of Attorney) 簽立門檻與遺囑認證書 (Letters of Probate) 驗證。',
      overviewEn: 'Analyzes Power of Attorney execution requirements and Letters of Probate verification.',
      verifiedNotesZh: [
        '✓ 處置香港土地權益之授權書，必須以契據 (Deed) 形式蓋印簽立。',
        '✓ 授權書一般應於土地註冊處 (Land Registry) 辦理註冊。',
        '✓ 遺產物業賣方在未取得遺囑認證書 (Letters of Probate) 前，無權簽署正式買賣合約。'
      ],
      verifiedNotesEn: [
        '✓ Power of Attorney authorizing disposition of HK land must be executed under seal as a Deed.',
        '✓ Power of Attorney should be registered at the Land Registry.',
        '✓ Executors have no legal authority to assign estate property without Letters of Probate.'
      ],
      memoryHookZh: '【土地授權成 Deed 📜】賣遺產樓一定要睇 Letters of Probate！',
      memoryHookEn: 'Mnemonic: Land POA needs a Deed 📜. Estate sales need Probate.',
      retrievalQuestionsZh: ['1. 處置土地之授權書必須以何種形式簽立？'],
      retrievalQuestionsEn: ['1. Under what form must a Power of Attorney for land disposition be executed?'],
      doNotConfusePairs: [{
        topicZh: '授權書簽立形式', topicEn: 'Power of Attorney Form',
        correctZh: '必須為契據 (Deed)', correctEn: 'Must be executed as a Deed',
        wrongTurnZh: '普通書面合約或口頭錄音', wrongTurnEn: 'Simple written contract or oral recording'
      }],
      examTrapsZh: [' Trap: 宣稱「遺產受益人只要出示死亡證即可代表遺產賣樓」——錯誤！須 Probate。'],
      examTrapsEn: [' Trap: "Beneficiary with death certificate alone can sign to sell estate property" — FALSE.']
    }
  },
  {
    id: 'b20', num: 'Block 20', part: 'I', scope: 'SQE_EAQE', level: 'Level 3 - Basic + Apply',
    categoryZh: '競爭條例與普通法侵權', categoryEn: 'Competition & Tort',
    titleZh: '《競爭條例》(Cap. 619) 第一行為守則與失實陳述條例', titleEn: 'Competition Ordinance (Cap. 619) & Misrepresentation',
    summaryZh: '代理行合謀定價觸犯 Cap. 619 第一行為守則；未核實作錯誤陳述負過失失實陳述責任。',
    summaryEn: 'Price fixing breaches Cap. 619 First Conduct Rule; unverified claims breach Cap. 284.',
    keyStatutes: ['Cap. 619 First Conduct', 'Cap. 284 s.3'], suggestedDay30: 30,
    lesson: {
      overviewZh: '掌握競爭條例第一行為守則 (反合謀定價) 與失實陳述條例 Cap. 284 民事賠償。',
      overviewEn: 'Master Competition Ordinance First Conduct Rule (anti-collusion) and Cap. 284 misrepresentation.',
      verifiedNotesZh: [
        '✓ 多間地產代理行私下協議統一佣金折扣上限，觸犯 Cap. 619 第一行為守則 (First Conduct Rule)。',
        '✓ 代理未經核實向買家宣稱單位附連合法天台/閣樓，事後證實不符，須負過失失實陳述賠償責任。',
        '✓ 代理對買家負有專業盡職審查責任 (Due Diligence)。'
      ],
      verifiedNotesEn: [
        '✓ Agencies colluding to fix maximum commission discounts breach Cap. 619 First Conduct Rule.',
        '✓ Making unverified representations about rooftops/mezzanines induces Negligent Misrepresentation liability.',
        '✓ Agents owe a statutory duty of due diligence to purchasers.'
      ],
      memoryHookZh: '【禁止合謀定價 ⚖️】同業不可合謀定佣金，未核實事實不可亂講！',
      memoryHookEn: 'Mnemonic: Anti-Collusion ⚖️. No price fixing, verify facts before telling.',
      retrievalQuestionsZh: ['1. 地產代理行私下協議統一佣金折扣上限觸犯哪條例？'],
      retrievalQuestionsEn: ['1. Which Ordinance is breached if agencies collude to set commission caps?'],
      doNotConfusePairs: [{
        topicZh: '反合謀條款', topicEn: 'Anti-Collusion Rule',
        correctZh: '《競爭條例》第一行為守則', correctEn: 'Competition Ordinance First Conduct Rule',
        wrongTurnZh: '商品說明條例或代理條例', wrongTurnEn: 'Trade Descriptions or Estate Agents Ordinance'
      }],
      examTrapsZh: [' Trap: 宣稱「同行協議統一佣金率屬於正常商業保護行為」——違法！'],
      examTrapsEn: [' Trap: "Competitor agreement on standard commission is normal business protection" — ILLEGAL.']
    }
  }
];

export default function CoursePage() {
  const { language, locale } = useLanguage();
  const { isPaidUser } = useAuth();

  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [selectedTrack, setSelectedTrack] = useState<'sqe' | 'eaqe'>('sqe');
  const [examDate, setExamDate] = useState<string>('2026-11-18');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeLessonBlock, setActiveLessonBlock] = useState<TopicBlock | null>(null);
  const [modalTab, setModalTab] = useState<'notes' | 'mnemonic' | 'confuse' | 'traps'>('notes');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTrack = localStorage.getItem('agentpass_selected_track');
      if (savedTrack === 'eaqe' || savedTrack === 'sqe') {
        setSelectedTrack(savedTrack);
      }

      const savedDate = localStorage.getItem('agentpass_exam_date');
      if (savedDate) setExamDate(savedDate);
    }
  }, []);

  const handleTrackSwitch = (track: 'sqe' | 'eaqe') => {
    setSelectedTrack(track);
    if (typeof window !== 'undefined') {
      localStorage.setItem('agentpass_selected_track', track);
    }
  };

  const handleSelectOfficialDate = (fetchedDate: string) => {
    setExamDate(fetchedDate);
    if (typeof window !== 'undefined') {
      localStorage.setItem('agentpass_exam_date', fetchedDate);
    }
  };

  const filteredBlocks = useMemo(() => {
    return TOPIC_BLOCKS.filter((block) => {
      // 1. Track filter
      if (selectedTrack === 'sqe' && block.scope !== 'SQE_EAQE') {
        return false;
      }
      
      // 2. Search filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = block.titleZh.toLowerCase().includes(q) || block.titleEn.toLowerCase().includes(q);
        const matchCap = block.keyStatutes.some(st => st.toLowerCase().includes(q));
        const matchSummary = block.summaryZh.toLowerCase().includes(q);
        
        if (!matchTitle && !matchCap && !matchSummary) {
          return false;
        }
      }
      return true;
    });
  }, [selectedTrack, searchQuery]);

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Top Header Banner Container */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                <span>Official HK EAA Licensing Syllabi & Memory Engineering</span>
              </span>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                isPaidUser
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}>
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isPaidUser ? 'PRO ACCESS (UNLOCKED)' : 'FREE PREVIEW MODE'}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {isZh ? '20 大主題單元與精讀課程' : '20 Statutory Topic Blocks'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {isZh 
                ? '點擊任何單元即可開啟「驗證筆記、記憶口訣、易混淆辨析對照表與主考官陷阱登錄」。'
                : 'Click any block card to open statutory notes, memory hooks, Do Not Confuse pairs, and trap registers.'}
            </p>
          </div>

          {/* Quick Nav Shortcuts */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <Link
              href="/memory-palace"
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition flex items-center gap-2"
            >
              <Compass className="h-4 w-4" />
              <span>{isZh ? '進入記憶宮殿' : 'Memory Palace'}</span>
            </Link>

            <Link
              href="/mock-exam"
              className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md transition flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4 !text-white" />
              <span>{isZh ? '全真試題庫' : 'Mock Exam'}</span>
            </Link>
          </div>
        </div>

        {/* Live Official HKEAA Schedule Sync Selector */}
        <OfficialScheduleFetcher
          track={selectedTrack.toUpperCase() as 'EAQE' | 'SQE'}
          isZh={isZh}
          onSelectDate={handleSelectOfficialDate}
        />

        {/* One-Click Google Calendar, .ICS Download, & Email Reminder CTAs */}
        <ExamTrackerCTA
          isZh={isZh}
          trackName={selectedTrack.toUpperCase() as 'EAQE' | 'SQE'}
        />

        {/* Track Switcher & Search Controller */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleTrackSwitch('sqe')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                  selectedTrack === 'sqe'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="h-3.5 w-3.5" />
                <span>{isZh ? 'SQE 營業員軌道 (16 Blocks)' : 'SQE Salesperson'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleTrackSwitch('eaqe')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                  selectedTrack === 'eaqe'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isZh ? 'EAQE 大牌軌道 (20 Blocks)' : 'EAQE Master Pass'}</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isZh ? '搜尋條例或關鍵字...' : 'Search by Cap. or keyword...'}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-xs">
            <div>
              <label className="block text-xs font-bold uppercase mb-1 text-slate-500">
                {isZh ? '目標考試日期 (自動推算進度)' : 'Target Exam Date'}
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => {
                  setExamDate(e.target.value);
                  if (typeof window !== 'undefined') localStorage.setItem('agentpass_exam_date', e.target.value);
                }}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-blue-700 block">
                {isZh ? '每日完成目標' : 'Daily Pace Requirement'}
              </span>
              <span className="text-lg font-black text-blue-900">
                {selectedTrack === 'sqe' ? '0.5 - 1 Block / Day' : '1 - 1.5 Blocks / Day'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 block">
                {isZh ? '目前軌道涵蓋單元' : 'Active Track Coverage'}
              </span>
              <span className="text-lg font-black text-emerald-900">
                {filteredBlocks.length} / 20 Topic Blocks
              </span>
            </div>
          </div>
        </div>

        {/* Empty Search State */}
        {filteredBlocks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3 shadow-sm">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">
              {isZh ? '沒有找到相符的條例模組' : 'No matching study blocks found'}
            </h3>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs mt-2"
            >
              {isZh ? '清除搜尋' : 'Clear Search'}
            </button>
          </div>
        )}

        {/* Topic Block Lesson Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlocks.map((block, idx) => {
            const isFreeBlock = idx < 3;
            const isBlockLocked = !isPaidUser && !isFreeBlock;

            return (
              <div
                key={block.id}
                className="p-6 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm space-y-4 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition group relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700">
                      {block.num} • Part {block.part}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isBlockLocked && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          <span>PRO</span>
                        </span>
                      )}
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border border-slate-200 bg-slate-100 text-slate-700">
                        {block.level}
                      </span>
                    </div>
                  </div>

                  <div 
                    onClick={() => {
                      if (!isBlockLocked) {
                        setActiveLessonBlock(block);
                        setModalTab('notes');
                      }
                    }}
                    className={`space-y-2 transition ${isBlockLocked ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer group-hover:text-blue-600'}`}
                  >
                    <h3 className="text-lg font-bold flex items-center justify-between text-slate-900">
                      <span>{isZh ? block.titleZh : block.titleEn}</span>
                      {!isBlockLocked && <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition" />}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isZh ? block.summaryZh : block.summaryEn}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {block.keyStatutes.map((st, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                          {st}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={isBlockLocked}
                      onClick={() => {
                        setActiveLessonBlock(block);
                        setModalTab('notes');
                      }}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>{isBlockLocked ? (isZh ? '解鎖查閱' : 'Unlock') : (isZh ? '精讀課文' : 'Lesson')}</span>
                    </button>
                  </div>

                  {/* Practice Action Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <Link
                      href={isBlockLocked ? '/pricing' : `/course/${block.id}`}
                      className={`px-3 py-2 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition ${
                        isBlockLocked 
                          ? 'bg-slate-200 text-slate-500' 
                          : 'bg-blue-600 hover:bg-blue-700 !text-white'
                      }`}
                    >
                      <Target className={`h-3.5 w-3.5 ${!isBlockLocked && '!text-white'}`} />
                      <span>{isZh ? '單元測驗' : 'Quiz'}</span>
                    </Link>

                    <Link
                      href={isBlockLocked ? '/pricing' : `/flashcards?block=${block.id}`}
                      className={`px-3 py-2 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition ${
                        isBlockLocked 
                          ? 'bg-slate-200 text-slate-500' 
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      }`}
                    >
                      <Zap className="h-3.5 w-3.5" />
                      <span>{isZh ? '速記閃卡' : 'Flashcards'}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Deep-Dive Interactive Lesson Modal */}
      {activeLessonBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-2xl space-y-6 relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700">
                    {activeLessonBlock.num} • Part {activeLessonBlock.part}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-800">
                    {activeLessonBlock.level}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {isZh ? activeLessonBlock.titleZh : activeLessonBlock.titleEn}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveLessonBlock(null)}
                className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Navigation Sub-Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
              <button
                type="button"
                onClick={() => setModalTab('notes')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'notes'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{isZh ? '📖 驗證筆記 (Verified Notes)' : '📖 Verified Notes'}</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('mnemonic')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'mnemonic'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Lightbulb className="h-3.5 w-3.5" />
                <span>{isZh ? '🧠 記憶圖像 (Mnemonic)' : '🧠 Mnemonic & Loci'}</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('confuse')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'confuse'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Scale className="h-3.5 w-3.5" />
                <span>{isZh ? '⚔️ 易混淆辨析 (Do Not Confuse)' : '⚔️ Do Not Confuse'}</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('traps')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'traps'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
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
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
                    <span className="font-bold text-blue-800 uppercase font-mono block">
                      {isZh ? '【 官方考綱要求 】' : '[ Syllabus Requirement ]'}
                    </span>
                    <p className="font-medium leading-relaxed">
                      {isZh ? activeLessonBlock.lesson.overviewZh : activeLessonBlock.lesson.overviewEn}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-base flex items-center gap-2 text-emerald-800">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>{isZh ? '官方驗證真題筆記 (Exhaustive Verified Notes)' : 'Exhaustive Verified Notes'}</span>
                    </h3>

                    <ul className="space-y-2.5">
                      {(isZh ? activeLessonBlock.lesson.verifiedNotesZh : activeLessonBlock.lesson.verifiedNotesEn).map((note, idx) => (
                        <li key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed font-medium">
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
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-3">
                    <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                      <span>{isZh ? '記憶工程圖像口訣 (Dual Coding Mnemonic)' : 'Dual Coding Mnemonic'}</span>
                    </div>
                    <p className="font-bold text-amber-900 text-sm leading-relaxed">
                      {isZh ? activeLessonBlock.lesson.memoryHookZh : activeLessonBlock.lesson.memoryHookEn}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="font-extrabold text-base flex items-center gap-2 text-blue-800">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                      <span>{isZh ? '主動檢索測試 (Active Retrieval Questions)' : 'Active Retrieval Questions'}</span>
                    </h3>

                    <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-3 text-slate-800">
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
                    <h3 className="font-extrabold text-base flex items-center gap-2 text-blue-800">
                      <Scale className="h-4 w-4 text-blue-600" />
                      <span>{isZh ? '易混淆對照表 (Do Not Confuse Pair Tables)' : 'Do Not Confuse Pair Tables'}</span>
                    </h3>
                    <p className="text-xs text-slate-600">
                      {isZh ? '90% 的失分來自概念混淆而非盲區。請務必成對對照記憶：' : 'Most marks are lost through confusing two similar rules. Learn them as pairs:'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {activeLessonBlock.lesson.doNotConfusePairs.map((pair, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                        <span className="text-xs font-mono font-bold text-amber-800 block">
                          Topic: {isZh ? pair.topicZh : pair.topicEn}
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold space-y-1">
                            <span className="font-mono font-bold block text-emerald-800">✓ 正確條文 (Correct Rule)</span>
                            <p>{isZh ? pair.correctZh : pair.correctEn}</p>
                          </div>

                          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 font-semibold space-y-1">
                            <span className="font-mono font-bold block text-rose-800">✗ 常犯陷阱 (Wrong Turn)</span>
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
                    <h3 className="font-extrabold text-base flex items-center gap-2 text-rose-800">
                      <AlertTriangle className="h-4 w-4 text-rose-600" />
                      <span>{isZh ? '主考官假命題陷阱登錄 (Master Exam Trap Register)' : 'Master Exam Trap Register'}</span>
                    </h3>
                    <p className="text-xs text-slate-600">
                      {isZh ? '下列選項均為地產代理監管局 (EAA) 試題庫中出現過的錯誤命題 (FALSE)：' : 'The following are false statements directly marked incorrect in official EAA exam papers:'}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {(isZh ? activeLessonBlock.lesson.examTrapsZh : activeLessonBlock.lesson.examTrapsEn).map((trap, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 font-bold leading-relaxed flex items-start gap-2.5">
                        <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{trap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Control Footer */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono font-bold text-slate-500">
                {isZh ? '閱讀完成？選擇練習模式：' : 'Lesson complete? Select practice mode:'}
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href={`/course/${activeLessonBlock.id}`}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <Target className="h-4 w-4 !text-white" />
                  <span>{isZh ? '進入專屬單元測驗' : 'Practice Lesson Quiz'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}