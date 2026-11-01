// app/traps/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import {
  AlertTriangle,
  Scale,
  Search,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Target
} from 'lucide-react';

interface TrapEntry {
  id: string;
  capRef: string;
  topicZh: string;
  topicEn: string;
  trapZh: string;
  truthZh: string;
  trapEn: string;
  truthEn: string;
  track: 'SQE_EAQE' | 'EAQE_ONLY';
}

const MASTER_TRAP_REGISTER: TrapEntry[] = [
  // ==========================================
  // SECTION 1: AGENCY & LICENSING (CAP. 511 & FORMS)
  // ==========================================
  {
    id: 't1', capRef: 'Cap. 511 s.39', track: 'SQE_EAQE',
    topicZh: '分行經理委任資格', topicEn: 'Branch Manager Qualifications',
    trapZh: '具備 3 年以上全職地產行業經驗的營業員（細牌），可直接獲委任為分行經理獨立看管分行。',
    trapEn: 'A Salesperson with over 3 years of industry experience can manage a branch independently.',
    truthZh: '絕對錯誤。每間持牌營業處所必須由一名持有個人地產代理牌照（大牌）、且在緊接委任前 5 年內具備至少 5 年全職執業經驗的持牌代理出任經理人管理。',
    truthEn: 'FALSE. Every branch must be managed by an individual Estate Agent licensee who has held an agent license for at least 5 years within the preceding 5 years.'
  },
  {
    id: 't2', capRef: 'Cap. 511 s.40', track: 'SQE_EAQE',
    topicZh: '營業地址變更法定通知期', topicEn: '31-Day Address Change Notification',
    trapZh: '代理行搬遷分行或更換註冊辦事處地址，必須於 14 天內書面通知地產代理監管局（EAA）。',
    trapEn: 'Agencies changing office addresses must notify the EAA in writing within 14 days.',
    truthZh: '數字陷阱。法定通知期為 31 天內。持牌人營業地點、公司董事或合夥人變更，均必須於 31 天內書面呈報 EAA。',
    truthEn: 'FALSE. The statutory notice period under s.40 is 31 days, not 14 days.'
  },
  {
    id: 't3', capRef: 'Cap. 511 s.19', track: 'SQE_EAQE',
    topicZh: '發牌條件與工作經驗', topicEn: 'Licensing Criteria & Experience',
    trapZh: '「具備相關地產工作經驗」是個人申請地產代理或營業員牌照的法定發牌條件之一。',
    trapEn: '"Relevant work experience" is a statutory requirement to obtain an EAA license.',
    truthZh: '常規干擾項。工作經驗絕非法定發牌條件。法定四大條件為：年滿 18 歲、完成中五或同等學歷、獲評為「適當人選」（Fit & Proper）、於指定有效限期內考試合格。',
    truthEn: 'FALSE. Work experience is NOT a statutory condition. The 4 criteria are: age 18+, Form 5 completion, Fit & Proper person, and exam pass within prescribed window.'
  },
  {
    id: 't4', capRef: 'Cap. 511 s.19', track: 'SQE_EAQE',
    topicZh: '考試合格有效期限差異', topicEn: 'Exam Result Validity Window',
    trapZh: '無論是 EAQE（大牌）還是 SQE（細牌），考試合格成績的申請牌照有效期一律為 12 個月。',
    trapEn: 'Both EAQE and SQE exam results remain valid for 12 months when applying for a license.',
    truthZh: '期限混淆。地產代理資格考試（EAQE）合格成績有效期為 12 個月；營業員資格考試（SQE）合格成績有效期僅為 6 個月。',
    truthEn: 'FALSE. EAQE exam pass is valid for 12 months, whereas SQE exam pass is valid for only 6 months.'
  },
  {
    id: 't5', capRef: 'Cap. 511A s.9', track: 'SQE_EAQE',
    topicZh: '物業廣告發布前置授權', topicEn: 'Written Advertising Authorization',
    trapZh: '業主只要在電話或通訊軟件中口頭同意放盤開價，代理即可直接在社交平台刊登樓盤廣告。',
    trapEn: 'An agent can advertise online if the owner gives verbal consent via phone call or WhatsApp.',
    truthZh: '嚴重違規。Cap. 511A 第 9(1) 條明訂廣告必須取得業主「事先書面同意」（如簽妥 Form 3 或 Form 5），口頭同意無效，且廣告價格必須符合業主指示。',
    truthEn: 'ILLEGAL. Section 9(1) strictly requires prior written authorization from the vendor. Oral or informal consent is unlawful.'
  },
  {
    id: 't6', capRef: 'Cap. 511A s.13', track: 'SQE_EAQE',
    topicZh: '雙重代理利益披露對象', topicEn: 'Dual Agency Disclosure Scope',
    trapZh: '代理同時代表買賣雙方時，只需向支付較高佣金的一方披露雙重代理身分與佣金分配。',
    trapEn: 'In dual agency, agents only need to disclose their status to the party paying higher commission.',
    truthZh: '絕對錯誤。雙重代理（Dual Agency）必須於簽立臨時買賣協議前，向買方與賣方雙方同時以書面全面披露其雙重身分，並取得雙方書面簽署同意。',
    truthEn: 'FALSE. Dual agency status and commission rates must be disclosed in writing to and signed by BOTH buyer and seller prior to PASP signing.'
  },
  {
    id: 't7', capRef: 'Cap. 511 s.43', track: 'EAQE_ONLY',
    topicZh: '客戶存款託管與收據期限', topicEn: 'Client Money Escrow & Receipts',
    trapZh: '代理行代客戶收取臨時訂金後，必須於 3 個工作天內存入公司一般日常營運銀行戶口。',
    trapEn: 'Deposits received on behalf of clients must be paid into the general operating account within 3 days.',
    truthZh: '嚴重違規。所有客戶存款（Client Money）必須即時存入持牌銀行獨立設立的「客戶信託帳戶」，且必須於收取款項後 14 天內向客戶發出正式收據。',
    truthEn: 'ILLEGAL. Client money must be paid into a designated Client Trust Account (never operating account), and receipts must be issued within 14 days.'
  },
  {
    id: 't8', capRef: 'Cap. 511 表格規則', track: 'SQE_EAQE',
    topicZh: '法定代理協議適用範圍', topicEn: 'Prescribed Forms Statutory Scope',
    trapZh: '出租寫字樓或出售地舖商用物業時，代理必須使用法定表格 Form 5 或 Form 1。',
    trapEn: 'Leasing office spaces or selling retail shops requires EAA Prescribed Form 5 or Form 1.',
    truthZh: '範圍混淆。EAA 法定物業代理協議（表格 1 至 表格 6）僅適用於「住宅物業」。非住宅商業物業、純寫字樓及工廈買賣租賃均不受法定表格約束。',
    truthEn: 'FALSE. Prescribed Forms 1 to 6 apply strictly to residential properties. Commercial, industrial, and retail transactions are exempt.'
  },
  {
    id: 't9', capRef: 'Cap. 511 表格效期', track: 'SQE_EAQE',
    topicZh: '委託協議自動無限期展期', topicEn: 'Agency Agreement Duration',
    trapZh: '地產代理協議若未填寫終止日期，合約條款自動視為永久有效直至任何一方書面解除。',
    trapEn: 'If an agency agreement lacks an expiry date, it automatically remains effective indefinitely.',
    truthZh: '重大陷阱。法定地產代理協議的最長有效期限為自簽立日起計算 3 個月。不可約定自動無限期續約。',
    truthEn: 'FALSE. The statutory maximum default validity for EAA prescribed agency agreements is 3 months. Indefinite auto-rollover is invalid.'
  },
  {
    id: 't10', capRef: 'Cap. 511 紀律權力', track: 'SQE_EAQE',
    topicZh: '監管局紀律處分罰款上限', topicEn: 'EAA Disciplinary Fine Cap',
    trapZh: '地產代理監管局（EAA）紀律委員會對違規持牌人可判處的最高法定行政罰款為港幣 100 萬元。',
    trapEn: 'The EAA Disciplinary Committee can impose a maximum disciplinary fine of HK$1,000,000.',
    truthZh: '金額陷阱。EAA 紀律處分最高法定罰款額為港幣 $300,000（三十萬港元），並可附帶訓誡、譴責、附加持牌條件、暫時吊銷或撤銷牌照。',
    truthEn: 'FALSE. The maximum statutory fine the EAA Disciplinary Committee can order is HK$300,000 per complaint.'
  },

  // ==========================================
  // SECTION 2: CONVEYANCING & PRIORITY (CAP. 219, CAP. 128, IRIS)
  // ==========================================
  {
    id: 't11', capRef: 'Cap. 219 s.13', track: 'SQE_EAQE',
    topicZh: '物業業權根源追溯年期', topicEn: 'Statutory 15-Year Root of Title',
    trapZh: '賣方向買方證明良好業權時，只需出示最近 7 年由政府批租或轉讓之契據。',
    trapEn: 'A vendor only needs to produce title deeds tracing back 7 years to prove good title.',
    truthZh: '年期混淆。依據 Cap. 219 第 13 條，物業轉易法定業權根源（Good Root of Title）追溯期底線為至少 15 年，期間所有產權處置契據均屬必驗文件。',
    truthEn: 'FALSE. Under s.13 of Cap. 219, title deeds must trace back for at least 15 years to establish a good root of title.'
  },
  {
    id: 't12', capRef: 'Cap. 219 s.4', track: 'SQE_EAQE',
    topicZh: '法定產業權設定之形式', topicEn: 'Creation of Legal Estate via Deed',
    trapZh: '買賣雙方只要在律師見證下簽署一份普通書面買賣合約，法定產業權（Legal Estate）即刻轉移。',
    trapEn: 'A simple signed written contract witnessed by a solicitor transfers the legal estate immediately.',
    truthZh: '法律形式混淆。Cap. 219 第 4 條規定，土地法定產業權之設定或轉讓必須以「契約／契據」（Deed）形式蓋印簽立；一般書面合約僅產生衡平法權益（Equitable Interest）。',
    truthEn: 'FALSE. Under s.4, a legal estate can only be created or assigned by Deed. A simple contract only creates an equitable interest.'
  },
  {
    id: 't13', capRef: 'Cap. 219 s.6(2)', track: 'SQE_EAQE',
    topicZh: '口頭租約法定豁免契約條件', topicEn: 'Parol Lease Deed Exemption',
    trapZh: '任何租期不超過 5 年的住宅租約，只要雙方口頭約定即可構成完全合法生效的法定租賃。',
    trapEn: 'Any residential lease under 5 years can be created verbally without written deed.',
    truthZh: '條件不符。Cap. 219 第 6(2) 條豁免契約之口頭租約（Parol Lease）嚴格限制為：租期不超過 3 年、收取最佳市值合理租金、即時生效且無收取溢價（Fine/Premium）。',
    truthEn: 'FALSE. The lease must not exceed 3 years, take effect in possession, at the best rent reasonably obtainable, without taking a fine.'
  },
  {
    id: 't14', capRef: 'Cap. 219 s.24', track: 'SQE_EAQE',
    topicZh: '聯權共有長存權與破產中斷', topicEn: 'Joint Tenancy Severance upon Bankruptcy',
    trapZh: '聯權共有（長命契）業主中一人被頒布破產令，其業權份額依法全數自動歸另一存活業主所有。',
    trapEn: 'If a joint tenant goes bankrupt, their share automatically passes to the other owner via survivorship.',
    truthZh: '重大陷阱。聯權共有人破產會即時破壞四同原則並「切斷聯權」（Severance of Joint Tenancy），物業轉為分權共有，破產者份額依法歸破產受託人處置。',
    truthEn: 'FALSE. Bankruptcy severs the joint tenancy into a tenancy in common; the bankrupt’s share vests in the Trustee in Bankruptcy.'
  },
  {
    id: 't15', capRef: 'Cap. 128 s.3', track: 'SQE_EAQE',
    topicZh: '契約註冊性質 vs 產權保證', topicEn: 'Deeds Registration vs Title Guarantee',
    trapZh: '樓契於土地註冊處完成註冊後，土地註冊處即向買家保證該物業具備無可置疑的優良合法產權。',
    trapEn: 'Registration of a deed at the Land Registry legally guarantees that the title is indisputable.',
    truthZh: '香港土地法核心考點。香港土地註冊處實行「契約註冊制度」（Registration of Deeds），純粹記錄送交文書並定立優先順位，不負責審核契據內容之實質法律有效性。',
    truthEn: 'FALSE. HK operates a deeds registration system, not a Torrens title guarantee system. Registration confers priority, not validity.'
  },
  {
    id: 't16', capRef: 'Cap. 128 s.5', track: 'SQE_EAQE',
    topicZh: '30 天優先權追溯期起算', topicEn: '30-Day Relation-Back Priority Rule',
    trapZh: '契據於簽立後 30 天內送交註冊，其優先權是以「送交土地註冊處登記當日」起計算。',
    trapEn: 'A deed registered within 30 days takes priority from the date it was delivered to the Land Registry.',
    truthZh: '法理混淆。依據 Cap. 128 第 5 條，凡於簽立日起 30 天內交付註冊者，其法定優先權追溯回「簽立當日」；超過 30 天交付者，優先權才以實際送交註冊當日起算。',
    truthEn: 'FALSE. If lodged within 30 days of execution, priority relates back to the DATE OF EXECUTION, not the delivery date.'
  },
  {
    id: 't17', capRef: 'Cap. 128 s.5', track: 'SQE_EAQE',
    topicZh: '香港境外簽立契據註冊期限', topicEn: 'Overseas Deed Registration Window',
    trapZh: '業主在香港境外（如英國或加拿大）簽立之樓宇處置契據，其追溯優先權送交期限同樣為 30 天。',
    trapEn: 'Deeds executed outside Hong Kong enjoy the same 30-day delivery priority window.',
    truthZh: '數字差異。在香港境外簽立的契約，送交土地註冊處享有長達「3 個月」的優先權追溯寬限期。',
    truthEn: 'FALSE. Deeds executed outside Hong Kong have a 3-month statutory window to relate back to the date of execution.'
  },
  {
    id: 't18', capRef: 'IRIS 查冊實務', track: 'SQE_EAQE',
    topicZh: '暫准押記令之法律性質', topicEn: 'Charging Order Nisi vs Absolute',
    trapZh: '土地查冊負擔欄出現一項「Charging Order Nisi」，表示法院已確認判令可立即拍賣物業抵債。',
    trapEn: 'A "Charging Order Nisi" on land search confirms court order for immediate property auction.',
    truthZh: '重大概念陷阱。Nisi 僅代表法庭批出的「臨時暫准押記令」，債務人仍可在聆訊中抗辯。唯有法庭最終核准並蓋印為「Charging Order Absolute」才算最終落實押記。',
    truthEn: 'FALSE. Order Nisi is a provisional order. Only a "Charging Order Absolute" constitutes a final effective encumbrance.'
  },
  {
    id: 't19', capRef: 'IRIS 查冊實務', track: 'SQE_EAQE',
    topicZh: '未決訴訟之註冊影響', topicEn: 'Lis Pendens Legal Implications',
    trapZh: '土地登記冊上若註冊了「Lis Pendens」（未決訴訟），業主只需簽署承諾書保證勝訴即可自由交吉過戶。',
    trapEn: 'If a "Lis Pendens" is registered, the vendor can deliver good title by signing a guarantee of winning.',
    truthZh: '嚴重產權瑕疵。Lis Pendens 代表有法庭訴訟正直接爭議該物業之權益所有權。訴訟未經正式撤銷註冊前，賣方無法向買家交付無瑕疵的良好產權（Good Title）。',
    truthEn: 'FALSE. Lis Pendens indicates active litigation claiming an interest in the land. Good title cannot be given until it is vacated.'
  },
  {
    id: 't20', capRef: 'IRIS 查冊實務', track: 'SQE_EAQE',
    topicZh: '入伙紙與實用面積', topicEn: 'Occupation Permit (OP) Data Scope',
    trapZh: '地產代理查閱屋宇署發出的佔用許可證（OP / 入伙紙），即可獲取該單位官方核實之實用面積。',
    trapEn: 'An agent can obtain the verified saleable area directly from the Occupation Permit (OP).',
    truthZh: '常規干擾陷阱。入伙紙（Occupation Permit）只載明建築物的「法定許可用途」（Permitted User）及落成規格，絕對不會列出個別單位的實用面積。',
    truthEn: 'FALSE. Occupation Permits only specify the permitted user and completion standards; they NEVER state unit saleable area.'
  },

  // ==========================================
  // SECTION 3: TENANCY & RENT CONTROL (CAP. 7 & PART IVA)
  // ==========================================
  {
    id: 't21', capRef: 'Cap. 7 租賃權沒收', track: 'SQE_EAQE',
    topicZh: '租客欠租法定收樓門檻', topicEn: '15-Day Rent Arrears Forfeiture',
    trapZh: '合約若無明確約定沒收條款，住宅租客只要欠租達 14 天，業主即可依法直接沒收租賃權收樓。',
    trapEn: 'Absent an express clause, a landlord can forfeit the lease if rent is in arrears for 14 days.',
    truthZh: '高頻數字陷阱。在無明確合約條款約定下，普通法與 Cap. 7 規定的法定欠租沒收門檻為「欠租達 15 天」，14 天為常見干擾選項。',
    truthEn: 'FALSE. The statutory implied forfeiture threshold for non-payment of rent is 15 DAYS, not 14 days.'
  },
  {
    id: 't22', capRef: 'Cap. 7 Part IVA', track: 'SQE_EAQE',
    topicZh: '劏房規管租賃居住權保障', topicEn: 'Part IVA 2+2 Security of Tenure',
    trapZh: '劏房業主在簽訂首期 2 年租約時，可與租客簽署附約同意提早放棄次期 2 年的法定續約權。',
    trapEn: 'A subdivided unit landlord can contract out of the second 2-year statutory renewal term.',
    truthZh: '違法無效。Cap. 7 第 IVA 部「2 + 2 年」（合共 4 年）租住權保障屬於強制性法定條文。任何企圖剝奪租客法定優先續約權的排除協議在法律上一律無效。',
    truthEn: 'ILLEGAL & VOID. The 2+2 security of tenure is a mandatory statutory right. Any contracting-out agreement is legally void.'
  },
  {
    id: 't23', capRef: 'Cap. 7 Part IVA', track: 'SQE_EAQE',
    topicZh: '次期續租租金加幅上限', topicEn: 'Part IVA 10% Rent Hike Ceiling',
    trapZh: '劏房規管租賃次期續租時，若差估署租金指數上升 15%，業主即可合法加租 15%。',
    trapEn: 'If the RVD rental index rises by 15%, a subdivided unit landlord can raise rent by 15% on renewal.',
    truthZh: '封頂上限陷阱。次期租金調整率雖然參照差餉物業估價署全港租金指數，但法律同時明訂了「10% 絕對法定封頂上限」，加幅絕不可超過 10%。',
    truthEn: 'FALSE. Even if the RVD index exceeds 10%, the statutory rent increase is strictly capped at a MAXIMUM OF 10%.'
  },
  {
    id: 't24', capRef: 'Cap. 7 Part IVA', track: 'SQE_EAQE',
    topicZh: '水電費轉售違法管制', topicEn: 'Utility Surcharge Criminal Liability',
    trapZh: '業主為分租單位安裝了獨立水電錶，可按每度電 HK$2.5 劃一收費以補償線路折舊維修費。',
    trapEn: 'Landlords can charge HK$2.5 per kWh for electricity in subdivided units to cover rewiring costs.',
    truthZh: '嚴重違法刑事罪行。Cap. 7 第 IVA 部明令嚴禁業主向規管租客收取超過中電或水務署法定收費表之分攤款項，濫收水電費屬刑事犯罪。',
    truthEn: 'CRIMINAL OFFENCE. Landlords are strictly prohibited from charging more than the utility providers’ official bill amounts.'
  },
  {
    id: 't25', capRef: 'Cap. 7 CR109', track: 'SQE_EAQE',
    topicZh: 'CR109 表格提交法定限期', topicEn: 'Form CR109 1-Month Filing Deadline',
    trapZh: '住宅物業新出租或續租，業主必須在租期開始後 60 天內向差估署呈交 CR109 申報表。',
    trapEn: 'A landlord must submit Form CR109 to the RVD within 60 days of entering into a tenancy.',
    truthZh: '期限混淆。CR109 表格必須在租賃立約後「1 個月內」（30 天內）提交差估署。60 天是劏房規管租賃呈交 AR2 表格的期限，兩者不可混淆。',
    truthEn: 'FALSE. Form CR109 must be submitted within 1 MONTH (30 days). The 60-day deadline applies to Form AR2 under Part IVA.'
  },
  {
    id: 't26', capRef: 'Cap. 7 CR109', track: 'SQE_EAQE',
    topicZh: '未交 CR109 對訴訟之影響', topicEn: 'Consequences of Unfiled Form CR109',
    trapZh: '業主若未在 1 個月內提交 CR109，整份住宅租約在法律上立即無效，租客可即時免租。',
    trapEn: 'Failing to file Form CR109 immediately voids the tenancy agreement completely.',
    truthZh: '法律後果錯誤。未呈交 CR109 不會使租約無效，但業主將「暫時喪失向法庭或土地審裁處提起訴訟追討欠租」的法律權利，直至向差估署補交並繳交繳款罰款為止。',
    truthEn: 'FALSE. The tenancy remains valid, but the landlord is barred from maintaining legal action to recover rent until filed with a fee.'
  },

  // ==========================================
  // SECTION 4: BUILDINGS, PLANNING & DMC (CAP. 123, 131, 344)
  // ==========================================
  {
    id: 't27', capRef: 'Cap. 123 s.24', track: 'SQE_EAQE',
    topicZh: '清拆令與違建工程追溯期', topicEn: 'Statutory Limitation on UBW',
    trapZh: '天台僭建木屋若已存在超過 20 年且從未接獲屋宇署投訴，在普通法下即自動享有合法化豁免權。',
    trapEn: 'Unauthorized building works existing for over 20 years become legalized by adverse possession.',
    truthZh: '極大誤解。違例建築工程（UBW）在《建築物條例》下絕對無任何時效寬免抗辯。屋宇署無論何時均有權發出第 24 條清拆命令勒令拆除。',
    truthEn: 'FALSE. There is no statute of limitations for UBW. The Building Authority can issue a Section 24 demolition order at any time.'
  },
  {
    id: 't28', capRef: 'Cap. 123 s.24 vs s.26', track: 'SQE_EAQE',
    topicZh: '清拆令 vs 危樓修葺令區分', topicEn: 'Section 24 Demolition vs Section 26 Repair Orders',
    trapZh: '屋宇署發出第 24 條命令代表樓宇結構面臨危險，要求業主委任認可人士進行修葺加固。',
    trapEn: 'A Section 24 order relates to dangerous buildings requiring structural repair.',
    truthZh: '條文混淆。第 24 條是「清拆違例建築工程令」（Demolition of UBW）；針對危險建築物或結構破損勒令修葺的是「第 26 條修葺命令」（Dangerous Building Order）。',
    truthEn: 'FALSE. Section 24 governs Demolition of unauthorized works; Section 26 governs Repair of dangerous buildings.'
  },
  {
    id: 't29', capRef: 'Cap. 123 MBIS/MWIS', track: 'SQE_EAQE',
    topicZh: '強制驗樓與驗窗樓齡門檻', topicEn: 'MBIS 30-Year vs MWIS 10-Year Thresholds',
    trapZh: '強制驗樓計劃（MBIS）與強制驗窗計劃（MWIS）的法定實施樓齡門檻一律為樓齡達 30 年以上。',
    trapEn: 'Both MBIS (Mandatory Inspection) and MWIS (Window Inspection) apply to buildings aged 30+ years.',
    truthZh: '門檻混淆。強制驗樓計劃（MBIS）適用於樓齡「30 年或以上」樓宇；強制驗窗計劃（MWIS）適用於樓齡「10 年或以上」樓宇（每 5 年檢驗一次）。',
    truthEn: 'FALSE. MBIS applies to buildings aged 30 or above; MWIS applies to private buildings aged 10 or above.'
  },
  {
    id: 't30', capRef: 'Cap. 344 s.3', track: 'EAQE_ONLY',
    topicZh: '成立業主立案法團份數門檻', topicEn: '30% Undivided Shares for IO Formation',
    trapZh: '召開大會成立業主立案法團（IO），決議案必須獲得全體大廈「過半數業主人數（超過 50% 人數）」通過。',
    trapEn: 'Forming an Incorporated Owners corporation requires approval by over 50% headcount of all owners.',
    truthZh: '指標混淆。成立法團是以「不可分割份數」為依據：倡議需不少於 5% 份數業主聯署，大會通過需由持有不少於「30% 不可分割業權份數」之業主親自或委派代表投票支持。',
    truthEn: 'FALSE. Approval requires owners of not less than 30% of total undivided shares, not 50% headcount.'
  },
  {
    id: 't31', capRef: 'Cap. 344 DMC', track: 'SQE_EAQE',
    topicZh: '大廈公契後繼買家約束力', topicEn: 'DMC Covenants Running with the Land',
    trapZh: '大廈公契（DMC）屬於一手合約，二手買家因未曾與發展商直接簽約，故不受公契條款約束。',
    trapEn: 'DMC covenants only bind the original first-hand purchasers, not secondary market buyers.',
    truthZh: '法律常識錯誤。公契條款屬於「隨土地轉移之衡平約據」（Covenants running with the land），對現任、前任及所有後繼物業受讓人均具備完全法定拘束力。',
    truthEn: 'FALSE. DMC covenants run with the land and bind all subsequent owners and assigns indefinitely.'
  },
  {
    id: 't32', capRef: 'Cap. 344 第 19 條', track: 'SQE_EAQE',
    topicZh: '前業主管理費欠款與釘契', topicEn: 'Outstanding Management Fees & Memorial of Charge',
    trapZh: '前業主拖欠法團半年的管理費，成交後法團只能向原業主追討，無權對新買家之單位註冊押記。',
    trapEn: 'Unpaid management fees of former owners can never result in a charge registered against the unit.',
    truthZh: '重大物業負擔。根據公契及 Cap. 344 第 19 條，法團有權就欠繳之管理費在土地註冊處對該物業註冊「押記備忘錄」（釘契），新買家若不清理將面臨物業被拍賣風險。',
    truthEn: 'FALSE. Under s.19, the corporation can register a Memorial of Charge against the flat for unpaid fees, which binds the purchaser.'
  },
  {
    id: 't33', capRef: 'Cap. 344 保險條例', track: 'EAQE_ONLY',
    topicZh: '法團公用部分第三者保額', topicEn: 'Mandatory HK$10M Third-Party Insurance',
    trapZh: '業主立案法團就大廈公用部分購買之法定第三者責任保險，每宗事故法定最低保額為港幣 500 萬元。',
    trapEn: 'The mandatory minimum third-party risk insurance coverage for common parts is HK$5,000,000.',
    truthZh: '金額混淆。Cap. 344 法定規定業主立案法團必須為大廈公用部分投保之第三者責任保險，每宗事故法定最低承保額為「港幣 10,000,000 元（一千萬港元）」。',
    truthEn: 'FALSE. The statutory minimum mandatory coverage for third-party risk insurance under Cap. 344 is HK$10,000,000.'
  },
  {
    id: 't34', capRef: 'Cap. 131 城規條例', track: 'EAQE_ONLY',
    topicZh: '第一欄用途 vs 第二欄用途', topicEn: 'Column 1 vs Column 2 Planning Uses',
    trapZh: '分區計劃大綱圖（OZP）中的「第二欄用途（Column 2）」，只要符合建築物條例即可直接興建無需審批。',
    trapEn: 'Column 2 uses on an Outline Zoning Plan (OZP) are automatically permitted without application.',
    truthZh: '概念顛倒。第一欄用途（Column 1）才是經常准許用途；第二欄用途（Column 2）必須預先向城規會提出第 16 條規劃許可申請並獲批准後，方可合法開展。',
    truthEn: 'FALSE. Column 1 is always permitted. Column 2 requires a formal Section 16 planning application and approval from the Town Planning Board.'
  },

  // ==========================================
  // SECTION 5: FIRST-HAND SALES, STAMP DUTY & COMPLIANCE
  // ==========================================
  {
    id: 't35', capRef: 'Cap. 621 s.25/32', track: 'SQE_EAQE',
    topicZh: '一手新盤售樓書與價單時間', topicEn: 'First-hand 7-Day Brochure & 3-Day Price List',
    trapZh: '一手新盤在開售前，售樓說明書及價單均必須在發售前至少 7 天向公眾公布備取。',
    trapEn: 'Both sales brochures and price lists for first-hand residential units must be released 7 days before sale.',
    truthZh: '時間混淆口訣「書 7 價 3」。售樓說明書（Sales Brochure）必須在發售前至少 7 天公布；價單（Price List）必須在發售前至少 3 天公布。',
    truthEn: 'FALSE. Remember "Brochure 7, Price 3". Sales brochure must be available 7 days prior; price list 3 days prior.'
  },
  {
    id: 't36', capRef: 'Cap. 621 s.52/53', track: 'SQE_EAQE',
    topicZh: '一手樓冷靜期沒收訂金上限', topicEn: 'First-hand 5% Cooling-off Forfeiture Cap',
    trapZh: '買家簽署一手臨時合約（PASP）後於 5 工作天冷靜期內棄購，發展商可沒收訂金並追討樓價下跌差價。',
    trapEn: 'If a buyer cancels a first-hand PASP during the 5-day cooling-off period, the developer can claim resale deficit damages.',
    truthZh: '法律界限錯誤。買方於 5 個工作天冷靜期內終止交易，發展商沒收之臨時訂金嚴格「封頂於成交價之 5%」，法律明令禁止發展商向買家追討任何額外殘餘損失。',
    truthEn: 'FALSE. The developer’s remedy is strictly capped at forfeiting the 5% preliminary deposit. No further damages can be claimed.'
  },
  {
    id: 't37', capRef: 'Cap. 621 報價規範', track: 'SQE_EAQE',
    topicZh: '一手物業單一實用面積計價', topicEn: 'Sole Saleable Area Quotation Rule',
    trapZh: '發展商或代理宣傳一手樓時，可以同時並列標示建築面積呎價以方便老一輩買家比較。',
    trapEn: 'Agents marketing first-hand properties can display gross floor area prices alongside saleable area.',
    truthZh: '違法犯罪。Cap. 621 規定一手住宅物業銷售只准使用「實用面積」（Saleable Area）作為唯一合法計價標準。展示建築面積呎價即屬刑事罪行。',
    truthEn: 'ILLEGAL. Section 25 makes Saleable Area the sole permitted unit for price representation. Showing gross floor area is an offence.'
  },
  {
    id: 't38', capRef: 'Cap. 117 s.9', track: 'SQE_EAQE',
    topicZh: '印花稅法定加蓋期限與臨約', topicEn: '30-Day Stamping Deadline for PASP',
    trapZh: '買家簽署臨時買賣合約後，只要尚未去律師樓簽署正式買賣合約，該臨約就完全無需繳交印花稅。',
    trapEn: 'A preliminary agreement (PASP) is not subject to stamp duty until formal agreement is executed.',
    truthZh: '嚴重稅務誤解。在香港住宅物業買賣中，具法律約束力的臨時合約在簽署當刻即成為可加蓋印花之文書（Chargeable Agreement），必須在立約後 30 天內送交印花稅署加蓋。',
    truthEn: 'FALSE. A residential PASP is a chargeable instrument under Cap. 117 and must be stamped within 30 days of execution.'
  },
  {
    id: 't39', capRef: 'Cap. 117 罰款倍數', track: 'SQE_EAQE',
    topicZh: '印花稅逾期最高懲罰性罰款', topicEn: 'Up to 10x Stamp Duty Late Penalty',
    trapZh: '逾期繳納從價印花稅（AVD），印花稅署可判處的最高罰款為原本稅額的 2 倍。',
    trapEn: 'The maximum penalty for late stamping under the Stamp Duty Ordinance is 2 times the duty.',
    truthZh: '倍數陷阱。逾期加蓋印花罰則階梯：逾期不超 1 個月罰 2 倍；逾期 1 至 2 個月罰 4 倍；逾期超過 2 個月者，最高罰款額高達原本應繳稅額的「10 倍」！',
    truthEn: 'FALSE. If overdue for more than 2 months, the maximum statutory penalty is 10 TIMES the original stamp duty amount.'
  },
  {
    id: 't40', capRef: 'Cap. 117 近親提名', track: 'SQE_EAQE',
    topicZh: '提名人轉售之印花稅陷阱', topicEn: 'Nomination to Company vs Close Relatives',
    trapZh: '買家以個人名義簽立臨約，在簽正約前將買方提名為自己 100% 全資持有的空殼公司，可享免稅優惠。',
    trapEn: 'Nominating a wholly-owned private company as purchaser before formal agreement is exempt from duty.',
    truthZh: '重大稅務陷阱。自然人提名至法人公司不屬於法定「近親提名」（近親嚴格限制為配偶、父母、子女、兄弟姊妹）。此舉會被稅務局視為第二宗獨立轉售，觸發雙重從價印花稅！',
    truthEn: 'FALSE. Nominating a corporation is not a "close relative" exemption and triggers a second charge of Ad Valorem Stamp Duty.'
  },
  {
    id: 't41', capRef: 'Cap. 615 AML', track: 'SQE_EAQE',
    topicZh: '大額現金盡職審查門檻', topicEn: 'HK$120,000 Cash Transaction Threshold',
    trapZh: '地產代理在促成物業買賣或租賃時，唯有當客戶使用現金支付超過港幣 50 萬元時，才須進行客戶盡職審查（CDD）。',
    trapEn: 'Agents only need to execute enhanced CDD when a client pays more than HK$500,000 in cash.',
    truthZh: '金額混淆。根據打擊洗錢條例及監管局通告，凡涉及現金支付達「港幣 120,000 元或以上」之單一或相連交易，代理即刻產生法定責任執行嚴格客戶盡職審查。',
    truthEn: 'FALSE. The statutory AML cash threshold for real estate transactions is HK$120,000 or above.'
  },
  {
    id: 't42', capRef: 'Cap. 615 AML', track: 'SQE_EAQE',
    topicZh: '通風報信罪之刑事責任', topicEn: 'AML Tipping-Off Criminal Offence',
    trapZh: '代理向聯合財富情報組（JFIU）呈交可疑交易報告（STR）後，基於專業誠信應禮貌提醒客戶注意合規風險。',
    trapEn: 'After filing an STR with JFIU, an agent should inform the client out of professional courtesy.',
    truthZh: '嚴重犯罪！向受懷疑洗錢者透露其已被舉報，直接觸犯刑事「通風報信罪」（Tipping-off），違者最高可處罰款 HK$500,000 及監禁 3 年。',
    truthEn: 'CRIMINAL OFFENCE. Informing a suspect of an STR is "Tipping-off", punishable by a $500,000 fine and up to 3 years imprisonment.'
  },
  {
    id: 't43', capRef: 'Cap. 486 私隱條例', track: 'SQE_EAQE',
    topicZh: '收集身分證副本之法定限制', topicEn: 'HKID Card Copy Collection Rules',
    trapZh: '準買家簽署睇樓紙（表格 2）安排睇樓時，代理行有權強制要求複印其香港身分證全彩副本。',
    trapEn: 'Agents can require and copy a visitor’s HKID card before arranging a casual property viewing.',
    truthZh: '違法侵犯私隱。在單純安排睇樓階段，代理只需登記客戶姓名及證件首幾位號碼。強行複印身分證副本違反保障資料原則；唯有在簽立具拘束力臨時合約時方可複印。',
    truthEn: 'ILLEGAL. In initial viewings, only recording the name and masked ID is allowed. Copying HKID is only justified when executing binding contracts.'
  },
  {
    id: 't44', capRef: 'Cap. 201 s.9', track: 'SQE_EAQE',
    topicZh: '秘密利潤與利益授權合法抗辯', topicEn: 'Secret Profit & Principal Consent Defense',
    trapZh: '裝修公司或銀行按揭中介私下發給代理的介紹費，只要客戶最終買到心儀物業且未受實質金錢損失，代理便不算違法。',
    trapEn: 'Referral kickbacks from mortgage brokers or contractors are lawful if the buyer suffered no loss.',
    truthZh: '嚴重貪污受賄罪！代理人未經主事人（客戶及僱主代理行）事先知情及書面明示同意，瞞背客戶收受任何私下利益即構成收受「秘密利潤」（Secret Profit），觸犯防止賄賂條例第 9 條。',
    truthEn: 'CRIMINAL OFFENCE under s.9 of Cap. 201. Any secret profit without the principal’s prior informed written consent is a bribe.'
  },

  // ==========================================
  // SECTION 6: EAQE-EXCLUSIVE CORPORATE & COMMERCIAL
  // ==========================================
  {
    id: 't45', capRef: 'Cap. 622 公司法', track: 'EAQE_ONLY',
    topicZh: '固定押記 vs 浮動押記優先權', topicEn: 'Fixed vs Floating Charge Crystallization',
    trapZh: '公司土地查冊上註冊的銀行浮動押記（Floating Charge），其優先權永遠優於任何後續創設的物業固定按揭。',
    trapEn: 'A registered Floating Charge always ranks prior to subsequent fixed legal mortgages.',
    truthZh: '大牌核心公司法。浮動押記在未「結晶化」（Crystallize）前，公司仍可在日常業務中自由處置物業。若無註冊負押記條款（Negative Pledge），後續的善意固定押記持有人優先於浮動押記！',
    truthEn: 'FALSE. Prior to crystallization, a floating charge allows disposal. A subsequent fixed legal mortgage ranks higher unless a Negative Pledge was registered.'
  },
  {
    id: 't46', capRef: 'Cap. 622 公司法', track: 'EAQE_ONLY',
    topicZh: '公司授權簽立樓契文件', topicEn: 'Corporate Signatory Board Resolution',
    trapZh: '向有限公司買樓，只要公司唯一大股東個人以自己名義在樓契簽名，該合約即自動對公司產生完全拘束力。',
    trapEn: 'A sole shareholder signing a land conveyance personally binds the limited company.',
    truthZh: '重大產權缺陷！公司具獨立法人地位。處置物業必須嚴格依照其公司章程（Articles），由正式授權之董事簽署並具備有效的董事會決議案（Board Resolution）。',
    truthEn: 'FALSE. A company is a separate legal person. Title requires execution under the Articles supported by an authoritative Board Resolution.'
  },
  {
    id: 't47', capRef: 'Cap. 32 清盤條例', track: 'EAQE_ONLY',
    topicZh: '清盤呈請後物業處置之效力', topicEn: 'Winding-Up Petition Void Dispositions',
    trapZh: '公司被呈請清盤後，在法庭正式頒布清盤令前簽立的物業買賣協議，法律上一律有效不可撤銷。',
    trapEn: 'Property disposals made after a winding-up petition but before the winding-up order are completely valid.',
    truthZh: '重大法理陷阱！根據公司清盤條例，清盤一旦由法庭頒令，其法律效力自動溯及至「呈請提交之日」。在此之後對公司財產的任何轉讓處置，除非事先獲得法院認可命令，否則在法律上一律無效（Void）！',
    truthEn: 'FALSE. Dispositions made after commencement of winding-up (petition date) are void unless the court orders otherwise.'
  },
  {
    id: 't48', capRef: '地契用戶限制', track: 'EAQE_ONLY',
    topicZh: '工廈地契用戶條款違反後果', topicEn: 'Industrial User Clause Breach & Re-Entry',
    trapZh: '工廈地契雖然寫明「工業及/或貨倉」，只要業主繳清差餉物業稅，地政總署便無權收回該違契單位。',
    trapEn: 'Lands Department cannot re-enter an industrial unit used for retail if rates and taxes are paid.',
    truthZh: '嚴重產權風險。地政總署有權對違反地契用戶條款（User Restrictions）的單位註冊警告信，情節嚴重者更可啟動法定程序行使「收回土地權」（Right of Re-entry），物業所有權將被政府直接充公沒收！',
    truthEn: 'FALSE. The Lands Department has statutory power to register warning notices and exercise the Right of Re-entry, forfeiting the leasehold.'
  },
  {
    id: 't49', capRef: '工廈活化政策', track: 'EAQE_ONLY',
    topicZh: '工廈整幢改裝活化門檻', topicEn: 'Industrial Revitalization 100% Ownership',
    trapZh: '工廈業主只要持有大廈超過 80% 的不可分割份數，即可向地政總署申請免補地價整幢改裝為過渡性房屋。',
    trapEn: 'Owners with 80% shares can apply for the nil-waiver fee revitalization scheme to convert a factory.',
    truthZh: '申請資格不符。工廈活化政策整幢改裝申請，法定前提必須由「單一業主持有整幢工廈之 100% 完整業權」方合乎申請資格。80% 僅為強拍條例門檻，兩者不可混淆。',
    truthEn: 'FALSE. The nil-waiver industrial revitalization scheme strictly requires 100% unified single ownership of the entire industrial building.'
  },
  {
    id: 't50', capRef: 'Cap. 619 競爭條例', track: 'SQE_EAQE',
    topicZh: '同行協議統一佣金率之合法性', topicEn: 'Competition Ordinance First Conduct Rule',
    trapZh: '幾間主流大型地產代理行高層私下達成口頭協議，約定全行住宅二手買賣劃一收取最低 1% 佣金，屬於合法商業保護行為。',
    trapEn: 'Agencies colluding to enforce a minimum 1% commission floor is lawful industry protection.',
    truthZh: '嚴重違法！此舉屬於典型的合謀定價行為（Price-fixing），直接觸犯《競爭條例》（Cap. 619）「第一行為守則」（First Conduct Rule），涉案行號將面臨競爭事務審裁處處以最高該機構全球營業額 10% 的巨額罰款！',
    truthEn: 'ILLEGAL. Price-fixing and setting minimum commission rates breaches the First Conduct Rule, risking fines up to 10% of local turnover.'
  }
];

export default function TrapsPage() {
  const { language, locale } = useLanguage();
  const { isPaidUser } = useAuth();
  
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<'ALL' | 'SQE_EAQE' | 'EAQE_ONLY'>('ALL');

  const filteredTraps = useMemo(() => {
    return MASTER_TRAP_REGISTER.filter((t) => {
      if (selectedTrack !== 'ALL' && t.track !== selectedTrack) return false;
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        return (
          t.topicZh.toLowerCase().includes(q) ||
          t.topicEn.toLowerCase().includes(q) ||
          t.capRef.toLowerCase().includes(q) ||
          t.trapZh.toLowerCase().includes(q) ||
          t.truthZh.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedTrack]);

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-rose-200 bg-rose-50 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
                <ShieldAlert className="h-4 w-4" />
                <span>{isZh ? '官方 50 大核心法規假命題登錄' : 'The 50 Master Exam Trap Register'}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-rose-950">
              {isZh ? '常規陷阱與易混淆概念 (Do Not Confuse)' : 'Master Exam Trap Register'}
            </h1>
            <p className="text-sm text-rose-900/80 max-w-2xl leading-relaxed">
              {isZh 
                ? '統計顯示超過 75% 的失分來自概念混淆而非盲區。本清單收錄 EAA 官方試卷中高頻率出現的 50 個假命題（FALSE Statements），並由持牌律師拆解背後對應的正確法理。'
                : 'Over 75% of marks are lost due to fine-line misconceptions. This catalogue registers 50 high-frequency false propositions from EAA exams with exact legal answers.'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/mock-exam"
              className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              <span>{isZh ? '前往全真模擬考' : 'Take Mock Exam'}</span>
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-6 rounded-3xl border border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setSelectedTrack('ALL')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition ${selectedTrack === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {isZh ? `全部陷阱 (${MASTER_TRAP_REGISTER.length})` : `All (${MASTER_TRAP_REGISTER.length})`}
            </button>
            <button
              onClick={() => setSelectedTrack('SQE_EAQE')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition ${selectedTrack === 'SQE_EAQE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              SQE + EAQE (40)
            </button>
            <button
              onClick={() => setSelectedTrack('EAQE_ONLY')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition ${selectedTrack === 'EAQE_ONLY' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {isZh ? '大牌專屬 (10)' : 'EAQE Only (10)'}
            </button>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isZh ? '搜尋條例編號 (Cap.) 或陷阱關鍵字...' : 'Search Cap., topic, keyword...'}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Traps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTraps.map((trap, idx) => {
            const isLocked = !isPaidUser && idx >= 6;

            if (isLocked) {
              return (
                <div key={trap.id} className="p-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 opacity-80 flex flex-col justify-center items-center text-center space-y-3 min-h-[240px]">
                  <ShieldAlert className="h-8 w-8 text-slate-400" />
                  <div>
                    <span className="text-[10px] font-mono font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded">PRO REQUIRED</span>
                    <h3 className="text-sm font-bold text-slate-700 mt-2">{isZh ? `解鎖陷阱 #${idx + 1}：${trap.capRef}` : `Unlock Trap #${idx + 1}`}</h3>
                  </div>
                  <Link href="/pricing" className="px-5 py-2 mt-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm">
                    {isZh ? '升級 PRO 帳號解鎖 50 大陷阱' : 'Upgrade to Unlock All 50 Traps'} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            }

            return (
              <div key={trap.id} className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-black text-white bg-slate-900 px-2.5 py-0.5 rounded-md">
                      #{trap.id.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {trap.capRef}
                    </span>
                  </div>
                  {trap.track === 'EAQE_ONLY' && (
                    <span className="text-[10px] font-black text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                      EAQE 大牌專屬
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Scale className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>{isZh ? trap.topicZh : trap.topicEn}</span>
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* The Trap */}
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
                    <span className="text-[10px] font-black font-mono text-rose-800 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> [FALSE / 常見假命題]
                    </span>
                    <p className="text-xs font-semibold text-rose-950 leading-relaxed">
                      {isZh ? trap.trapZh : trap.trapEn}
                    </p>
                  </div>

                  {/* The Truth */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                    <span className="text-[10px] font-black font-mono text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> [TRUE / 正確法理解析]
                    </span>
                    <p className="text-xs font-medium text-emerald-950 leading-relaxed">
                      {isZh ? trap.truthZh : trap.truthEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredTraps.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">
              {isZh ? '沒有找到相符的考題陷阱' : 'No matching traps found'}
            </h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTrack('ALL');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs mt-2"
            >
              {isZh ? '重設篩選' : 'Reset Filters'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}