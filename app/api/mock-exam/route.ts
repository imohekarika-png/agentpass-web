import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const ADMIN_EMAILS = [
  'imoh.ekarika@savantnex.com',
  'imoh.ekarika@gmail.com'
];

export type UserSubscriptionTier =
  | 'ADMIN_BUILDER'
  | 'EAQE_PRO'
  | 'SQE_PRO'
  | 'ALL_ACCESS_PRO'
  | 'FREE_PREVIEW';

export interface MockQuestionServer {
  id: number;
  part: 'I' | 'II';
  trackApplicability: 'BOTH' | 'EAQE_ONLY' | 'SQE_ONLY';
  caseScenarioId?: string;
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
}

// 80 Completely Unique Part I Questions
const PART_I_UNIQUE_DATA = [
  { qZh: "持牌地產代理變更營業地址或經理姓名後，須於幾多天內以書面通知 EAA？", qEn: "Within how many days must a licensed estate agent notify EAA of a business address or manager change?", optsZh: ["A. 7 天", "B. 14 天", "C. 31 天", "D. 60 天"], optsEn: ["A. 7 Days", "B. 14 Days", "C. 31 Days", "D. 60 Days"], ans: 2, refZh: "《地產代理條例》Cap. 511 s.40", refEn: "Cap. 511 s.40" },
  { qZh: "地產代理行收到客戶存款後，須於幾多天內開具收據並妥善保存紀錄幾多年？", qEn: "Within how many days must a deposit receipt be issued, and for how long must trust records be kept?", optsZh: ["A. 14 天內開收據，保存 3 年", "B. 7 天內開收據，保存 1 年", "C. 21 天內開收據，保存 5 年", "D. 30 天內開收據，保存 7 年"], optsEn: ["A. 14 days receipt, 3 years retention", "B. 7 days receipt, 1 year retention", "C. 21 days receipt, 5 years retention", "D. 30 days receipt, 7 years retention"], ans: 0, refZh: "《地產代理(客戶款項)規例》Cap. 511B", refEn: "Cap. 511B" },
  { qZh: "代理在向二手住宅物業準買家推介單位前，必須向買家提供並解釋哪一份法定表格？", qEn: "Which prescribed form must an agent provide and explain to a prospective buyer before property introduction?", optsZh: ["A. 表格一 (Form 1)", "B. 表格三 (Form 3)", "C. 表格四 (Form 4)", "D. 表格六 (Form 6)"], optsEn: ["A. Form 1", "B. Form 3", "C. Form 4", "D. Form 6"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A Form 1" },
  { qZh: "住宅租客拖欠租金達幾多天時，業主可根據法定隱含條件行使沒收租賃權 (Forfeiture)？", qEn: "After how many days of unpaid rent can a landlord exercise statutory implied forfeiture?", optsZh: ["A. 7 天", "B. 14 天", "C. 15 天", "D. 30 天"], optsEn: ["A. 7 Days", "B. 14 Days", "C. 15 Days", "D. 30 Days"], ans: 2, refZh: "《業主與租客(綜合)條例》Cap. 7", refEn: "Cap. 7 Part IV" },
  { qZh: "劏房規管租賃首期 2 年屆滿後，次期 2 年續租租金加幅上限為何？", qEn: "What is the ceiling cap for rent increase upon renewal of regulated subdivided unit tenancy?", optsZh: ["A. 5%", "B. 10% 或差估署私樓租金指數變動（以較低者為準）", "C. 15%", "D. 由業主隨意決定"], optsEn: ["A. 5%", "B. 10% or RVD index, whichever is lower", "C. 15%", "D. Discretionary"], ans: 1, refZh: "《業主與租客(綜合)條例》Part IVA", refEn: "Cap. 7 Part IVA" },
  { qZh: "甲、乙以「聯權共有」持有一單位，甲未經乙同意將其份額轉讓予丙。結果為何？", qEn: "A and B hold as Joint Tenants. A assigns share to C without B's consent. What is the result?", optsZh: ["A. 轉讓無效", "B. Severance 為分權共有 (Tenancy in Common)", "C. 乙獨佔全數業權", "D. 聯權共有維持"], optsEn: ["A. Void", "B. Severance into Tenancy in Common", "C. B absorbs sole title", "D. Joint tenancy remains"], ans: 1, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "契約若在簽立後幾多個月內交付土地註冊處註冊，其優先權可追溯至簽立日生效？", qEn: "If a deed is registered within how many months of execution does priority relate back to execution date?", optsZh: ["A. 1 個月", "B. 2 個月", "C. 3 個月", "D. 6 個月"], optsEn: ["A. 1 Month", "B. 2 Months", "C. 3 Months", "D. 6 Months"], ans: 0, refZh: "《土地註冊條例》Cap. 128 s.5", refEn: "Cap. 128 s.5" },
  { qZh: "代理未得主事人事前書面同意，私下向對家收取非法回佣，觸犯哪項刑事罪行？", qEn: "Accepting secret commission from counterparty without principal consent breaches which Ordinance?", optsZh: ["A. 《防止賄賂條例》Cap. 201 s.9", "B. 盜竊罪", "C. 民事違約", "D. 行政罰款"], optsEn: ["A. Cap. 201 s.9 Corrupt transactions", "B. Theft Ordinance", "C. Civil breach", "D. Administrative fine"], ans: 0, refZh: "《防止賄賂條例》Cap. 201 s.9", refEn: "Cap. 201 s.9" },
  { qZh: "發展商開售一手住宅前，售樓說明書及價單分別須提前至少幾多天公佈？", qEn: "At least how many days before sale must first-hand sales brochures and price lists be made available?", optsZh: ["A. 售樓書 7 天前，價單 3 天前", "B. 售樓書 14 天前，價單 7 天前", "C. 售樓書 3 天前，價單 1 天前", "D. 30 天前"], optsEn: ["A. Sales brochure 7 days; Price list 3 days", "B. Sales brochure 14 days; Price list 7 days", "C. Sales brochure 3 days; Price list 1 day", "D. 30 days"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621", refEn: "Cap. 621" },
  { qZh: "簽署一手樓 PASP 後 5 個工作天內撤回交易，賣方最多可沒收幾多訂金？", qEn: "If buyer withdraws within 5 working days after signing a PASP, how much deposit can be forfeited?", optsZh: ["A. 樓價 5% 臨時訂金", "B. 全數 10%", "C. 無權沒收", "D. 2.5%"], optsEn: ["A. Forfeit 5% preliminary deposit only", "B. Forfeit full 10%", "C. No forfeiture", "D. 2.5%"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621 s.53", refEn: "Cap. 621 s.53" },
  { qZh: "地產代理同時代表買賣雙方 (Dual Agency) 時，必須履行何種法定程序？", qEn: "When acting for both buyer and seller in the same transaction, what mandatory procedure must an agent follow?", optsZh: ["A. 事前取得雙方書面同意並披露佣金率", "B. 事後口頭通知", "C. 無需披露", "D. 單方面隱瞞"], optsEn: ["A. Prior written consent from both parties disclosing commission", "B. Subsequent oral notification", "C. No disclosure required", "D. Conceal representation"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.13", refEn: "Cap. 511A s.13" },
  { qZh: "授權人以授權書 (Power of Attorney) 委託受託人處置物業，該授權書必須以何種形式簽立？", qEn: "A Power of Attorney authorising disposition of land in HK must be executed under what form?", optsZh: ["A. 契據 (Deed)", "B. 普通合約", "C. 口頭錄音", "D. 電郵"], optsEn: ["A. Executed as a Deed", "B. Simple contract", "C. Verbal recording", "D. Email"], ans: 0, refZh: "《授權書條例》Cap. 31", refEn: "Cap. 31" },
  { qZh: "根據《大廈管理條例》(Cap. 344)，成立業主立案法團 (IO) 需獲得不少於幾多比例不可分割份數業主支持？", qEn: "Under Cap. 344, forming an Incorporated Owners requires resolution supported by what share percentage?", optsZh: ["A. 30%", "B. 10%", "C. 20%", "D. 50%"], optsEn: ["A. 30%", "B. 10%", "C. 20%", "D. 50%"], ans: 0, refZh: "《大廈管理條例》Cap. 344 s.3", refEn: "Cap. 344 s.3" },
  { qZh: "多間地產代理行私下商定統一佣金折扣上限，觸犯哪項條例？", qEn: "Estate agencies colluding to fix maximum commission discounts breach which Ordinance?", optsZh: ["A. 《競爭條例》Cap. 619 第一行為守則", "B. 商品說明條例", "C. 地產代理條例 s.15", "D. 商業合約"], optsEn: ["A. Competition Ordinance Cap. 619 First Conduct Rule", "B. Trade Descriptions Ordinance", "C. Estate Agents Ordinance s.15", "D. Commercial contract"], ans: 0, refZh: "《競爭條例》Cap. 619", refEn: "Cap. 619" },
  { qZh: "買賣合約逾期超過 2 個月未繳付印花稅，最高可被處以幾多倍應繳稅款之罰款？", qEn: "If stamp duty is overdue for more than 2 months, what is the maximum penalty multiple?", optsZh: ["A. 10 倍", "B. 2 倍", "C. 4 倍", "D. 20 倍"], optsEn: ["A. 10 Times", "B. 2 Times", "C. 4 Times", "D. 20 Times"], ans: 0, refZh: "《印花稅條例》Cap. 117 s.9", refEn: "Cap. 117 s.9" },
  { qZh: "於新界農地上未獲許可興建骨灰龕，城規會可發出哪種命令勒令中止？", qEn: "For unauthorized development on NT agricultural land, which notice can the Town Planning Board issue?", optsZh: ["A. 執行通知書 (Enforcement Notice)", "B. 拆卸令", "C. 破產令", "D. 封閉令"], optsEn: ["A. Enforcement Notice", "B. Demolition Order", "C. Bankruptcy Order", "D. Closure Order"], ans: 0, refZh: "《城市規劃條例》Cap. 131 s.23", refEn: "Cap. 131 s.23" },
  { qZh: "業主簽署 Form 3 出售放盤協議時，若未填寫有效期限，該協議有何法律效力？", qEn: "If the validity period is omitted when signing Form 3 for sale, what is the legal status?", optsZh: ["A. 協議無效", "B. 自動以 3 個月為上限", "C. 永久有效", "D. 以 1 年為上限"], optsEn: ["A. Agreement is invalid / void", "B. Deemed 3 months maximum", "C. Perpetual validity", "D. Deemed 1 year"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.6", refEn: "Cap. 511A s.6" },
  { qZh: "賣方必須提供多久歷史之業權契據 (Title Deeds) 方足夠證明良好業權 (Good Title)？", qEn: "A vendor must produce title deeds spanning at least how many years to show good title under Cap. 219 s.13?", optsZh: ["A. 15 年", "B. 7 年", "C. 20 年", "D. 30 年"], optsEn: ["A. 15 Years", "B. 7 Years", "C. 20 Years", "D. 30 Years"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219 s.13", refEn: "Cap. 219 s.13" },
  { qZh: "代理誤告知買家天台屬獨家業權，事後證實屬公用部分。代理須負何種法律責任？", qEn: "An agent wrongly tells a buyer a rooftop is legal title when it is common area. What is the agent’s legal liability?", optsZh: ["A. 過失失實陳述 (Negligent Misrepresentation) 損害賠償", "B. 無須負責", "C. 刑事監禁", "D. 買家自行承擔"], optsEn: ["A. Liability for Negligent Misrepresentation damages", "B. No liability", "C. Criminal imprisonment", "D. Buyer's risk"], ans: 0, refZh: "《失實陳述條例》Cap. 284", refEn: "Cap. 284" },
  { qZh: "根據 EAA 操守守則，代理在處理物業交易時，應避免採取何種不正當手段？", qEn: "Under the EAA Code of Ethics, which practice is strictly prohibited during property negotiations?", optsZh: ["A. 故意隱瞞重要事實或製造虛假形勢以催迫簽約", "B. 向買方提供土地查冊副本", "C. 建議訂金由律師樓託管", "D. 提醒買方視察物業"], optsEn: ["A. Deliberately misrepresenting facts or creating false urgency", "B. Supplying land search copies", "C. Advising deposit stakeholding", "D. Inspecting premises"], ans: 0, refZh: "地產代理監管局《操守守則》", refEn: "EAA Code of Ethics" },
  { qZh: "持牌營業員 (Salesperson) 在地產代理業務中，下列哪項行為屬超越權限？", qEn: "Which action exceeds authority for a licensed Salesperson in estate agency practice?", optsZh: ["A. 獨立以個人名義設立地產代理分行門市", "B. 代表地產代理行陪同客戶視察物業", "C. 協助客戶填寫 Form 1 表格", "D. 遞交臨約予業主"], optsEn: ["A. Operating an agency branch independently in personal name", "B. Accompanying clients to inspect property", "C. Assisting client with Form 1", "D. Delivering PASP to vendor"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.15", refEn: "Cap. 511 s.15" },
  { qZh: "持牌人申請續期地產代理牌照，最遲須於牌照屆滿前多久提出申請？", qEn: "When is the latest a licensee must apply for licence renewal before expiry?", optsZh: ["A. 至少 1 個月前，但不早於 3 個月前", "B. 7 天前", "C. 6 個月前", "D. 牌照屆滿當日"], optsEn: ["A. At least 1 month before, but not earlier than 3 months before", "B. 7 days before", "C. 6 months before", "D. On expiry date"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.27", refEn: "Cap. 511 s.27" },
  { qZh: "地產代理公司每一間營業地點，必須委任最少多少名持牌地產代理（大牌）作為經理？", qEn: "How many licensed Estate Agents (Full Licence) must be appointed as manager at every place of business?", optsZh: ["A. 1 名", "B. 2 名", "C. 3 名", "D. 無需委任"], optsEn: ["A. At least 1 manager", "B. 2 managers", "C. 3 managers", "D. None required"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.38", refEn: "Cap. 511 s.38" },
  { qZh: "代理發布二手物業廣告前，必須先取得業主簽署之哪份法定文件？", qEn: "Which document must be signed by vendor before issuing second-hand property advertisements?", optsZh: ["A. Form 3 (出售代理協議)", "B. 臨約", "C. Form 1", "D. 土地查冊副本"], optsEn: ["A. Form 3 (Estate Agency Agreement for Sale)", "B. PASP", "C. Form 1", "D. Land search copy"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "地產代理行必須在其主要營業地點顯眼處展示下列哪項文件？", qEn: "Which document must be displayed conspicuously at the principal place of business?", optsZh: ["A. 地產代理牌照正本", "B. 業主委託書", "C. 員工名冊", "D. 稅單"], optsEn: ["A. Original Estate Agent Licence", "B. Vendor authorization", "C. Employee register", "D. Tax demand"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.39", refEn: "Cap. 511 s.39" },
  { qZh: "業主出租住宅物業後，須於多少天內向差餉物業估價署提交 CR107 表格？", qEn: "Within how many days of letting a domestic property must Form CR107 be submitted to RVD?", optsZh: ["A. 1 個月內", "B. 7 天內", "C. 3 個月內", "D. 6 個月內"], optsEn: ["A. Within 1 month", "B. Within 7 days", "C. Within 3 months", "D. Within 6 months"], ans: 0, refZh: "《業主與租客(綜合)條例》Cap. 7 s.119K", refEn: "Cap. 7 s.119K" },
  { qZh: "生約期間 (Breathing period) 租客欲行使退租權，法律規定標準書面通知期一般為多久？", qEn: "What is the standard written notice period for a tenant exercising break clause during option term?", optsZh: ["A. 至少 1 個月", "B. 7 天", "C. 14 天", "D. 3 個月"], optsEn: ["A. At least 1 month", "B. 7 days", "C. 14 days", "D. 3 months"], ans: 0, refZh: "《業主與租客(綜合)條例》Cap. 7", refEn: "Cap. 7" },
  { qZh: "在無特別約定下，業主對住宅單位結構及外牆負有何種法定責任？", qEn: "In the absence of agreement, what is the landlord statutory duty regarding domestic structure?", optsZh: ["A. 保持內部及外牆結構良好維修狀態", "B. 由租客負擔全數費用", "C. 無需維修", "D. 由政府維修"], optsEn: ["A. Keep internal and external structure in good repair", "B. Tenant bears full cost", "C. No repair duty", "D. Government repairs"], ans: 0, refZh: "《業主與租客(綜合)條例》Cap. 7", refEn: "Cap. 7" },
  { qZh: "名義業主以明示信託 (Express Trust) 為受益人持有物業，處置該物業前必須取得誰的同意？", qEn: "A legal owner holds property under Express Trust. Whose consent is mandatory before disposition?", optsZh: ["A. 衡平法受益人 (Equitable Beneficiary)", "B. 地產代理", "C. 房屋署", "D. 管理公司"], optsEn: ["A. Equitable Beneficiary", "B. Estate Agent", "C. Housing Department", "D. Property Manager"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "臨約中載明「Right of First Refusal」(優先購買權)，其法律效力為何？", qEn: "What is the legal effect of a Right of First Refusal clause in a preliminary agreement?", optsZh: ["A. 業主欲出售時須優先以同等條件配售予該權利人", "B. 自動轉為正式合約", "C. 無約束力", "D. 罰款條款"], optsEn: ["A. Vendor must first offer property to holder on equal terms before selling elsewhere", "B. Automatically becomes formal agreement", "C. Non-binding", "D. Penalty clause"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "土地查冊負擔欄出現「Lis Pendens」(未決訴訟)，代表物業存在何種風險？", qEn: "What does 'Lis Pendens' registered in the Incumbrances section of a Land Search indicate?", optsZh: ["A. 該物業正涉及高等法院關於業權或權益之訴訟", "B. 已清還按揭", "C. 租約屆滿", "D. 差餉退款"], optsEn: ["A. Property is subject to pending High Court litigation affecting title", "B. Mortgage discharged", "C. Tenancy expired", "D. Rates refund"], ans: 0, refZh: "《土地註冊條例》Cap. 128", refEn: "Cap. 128" },
  { qZh: "下列哪項權益依法屬於「不可註冊於土地註冊處」之事項？", qEn: "Which instrument is statutorily unregisterable at the Land Registry?", optsZh: ["A. 短於 3 年且連同即時管有之普通口頭租約", "B. 法定按揭契據", "C. 臨約", "D. 押記令"], optsEn: ["A. Oral lease not exceeding 3 years at best rent with immediate possession", "B. Legal Charge", "C. PASP", "D. Charging Order"], ans: 0, refZh: "《土地註冊條例》Cap. 128 s.3", refEn: "Cap. 128 s.3" },
  { qZh: "可註冊契據若完全未交付土地註冊處註冊，對後續善意付價買家 (BFP) 有何法律效果？", qEn: "What is the legal effect of an uncompleted registerable deed against a subsequent bona fide purchaser?", optsZh: ["A. 對善意付價買家無效 (Void as against BFP)", "B. 完全優先", "C. 自動生效", "D. 刑事罪行"], optsEn: ["A. Null and void against subsequent bona fide purchaser for valuable consideration", "B. Takes absolute priority", "C. Automatically valid", "D. Criminal offence"], ans: 0, refZh: "《土地註冊條例》Cap. 128 s.3", refEn: "Cap. 128 s.3" },
  { qZh: "將契據交付土地註冊處註冊時，必須隨附哪一份法定表格？", qEn: "Which prescribed form must accompany a deed lodged for registration at the Land Registry?", optsZh: ["A. 註冊摘要 (Memorial Form)", "B. Form 1", "C. Form CR107", "D. PASP"], optsEn: ["A. Memorial Form", "B. Form 1", "C. Form CR107", "D. PASP"], ans: 0, refZh: "《土地註冊條例》Cap. 128", refEn: "Cap. 128" },
  { qZh: "代理若要合法收取買賣雙方佣金，其「事前同意」必須符合何種形式？", qEn: "To legally accept commission from both buyer and vendor, how must prior consent be obtained?", optsZh: ["A. 於代理協議或臨約中以書面明確披露並獲簽署同意", "B. 事後口頭告知", "C. 私下默許", "D. 同意無需"], optsEn: ["A. Expressly disclosed in writing in agency agreement/PASP with signed consent", "B. Oral notification afterwards", "C. Tacit understanding", "D. Consent unnecessary"], ans: 0, refZh: "《防止賄賂條例》Cap. 201 s.9", refEn: "Cap. 201 s.9" },
  { qZh: "一手住宅物業銷售中，法例規定唯一合法用於計算每平方呎單價之面積為何？", qEn: "What is the sole statutory area metric permitted for calculating per square foot prices in first-hand sales?", optsZh: ["A. 實用面積 (Saleable Area)", "B. 建築面積", "C. 實用率", "D. 窗台面積"], optsEn: ["A. Saleable Area", "B. Gross Floor Area", "C. Efficiency Ratio", "D. Bay window area"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621 s.8", refEn: "Cap. 621 s.8" },
  { qZh: "業主違反大廈公契 (DMC) 於平台加建小屋，管委會可採取何種法律行動？", qEn: "An owner breaches the DMC by constructing an unauthorized hut on a podium. What action can the IO take?", optsZh: ["A. 申請禁制令 (Injunction) 及註冊負擔令", "B. 沒收業主單位", "C. 切斷水電", "D. 罰款 $100"], optsEn: ["A. Apply for an Injunction and register a Charge against title", "B. Forfeit the unit", "C. Disconnect utilities", "D. Fine $100"], ans: 0, refZh: "《大廈管理條例》Cap. 344", refEn: "Cap. 344" },
  { qZh: "根據《地產代理條例》，監管局紀律委員會對違規持牌人可實施之最嚴重制裁為何？", qEn: "What is the most severe sanction the Disciplinary Committee can impose on a non-compliant licensee?", optsZh: ["A. 撤銷地產代理牌照 (Revocation of Licence)", "B. 警告信", "C. 罰款 $1,000", "D. 修讀課程"], optsEn: ["A. Revocation of Licence", "B. Warning Letter", "C. Fine $1,000", "D. Course attendance"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.30", refEn: "Cap. 511 s.30" },
  { qZh: "買方簽署臨約時付予代理行作為「Stakeholder」(託管人) 之訂金，代理行有何處理責任？", qEn: "How must deposit held by an agency as Stakeholder under a PASP be processed?", optsZh: ["A. 存入指定獨立信託戶口 (Trust Account)，未獲雙方同意不得擅自發還", "B. 直接轉交賣方", "C. 存入代理個人戶口", "D. 用作支付代理佣金"], optsEn: ["A. Deposit into designated trust account; released only upon dual authorization", "B. Directly hand to vendor", "C. Deposit into personal account", "D. Deduct commission"], ans: 0, refZh: "《地產代理(客戶款項)規例》Cap. 511B", refEn: "Cap. 511B" },
  { qZh: "代理處理物業交易時，若發現買賣雙方的身份證明文件名字與查冊紀錄不符，標準做法為何？", qEn: "What is the mandatory practice if vendor ID name conflicts with Land Search records?", optsZh: ["A. 暫停簽署並核對身分證明文件，確保無冒充業主詐騙", "B. 無視差異照常簽約", "C. 隨意自行修改臨約名字", "D. 叫買家私下交收"], optsEn: ["A. Pause signing and verify statutory ID to prevent impersonation fraud", "B. Ignore conflict", "C. Alter name unilaterally", "D. Private transfer"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "業主委託地產代理獨家代理 (Exclusive Agency) 出售單位，在獨家期內業主自行私下賣出單位，有何法律後果？", qEn: "Under an Exclusive Agency agreement, if vendor sells unit privately during exclusivity, what is the result?", optsZh: ["A. 業主仍須依約向獨家代理支付約定之佣金", "B. 業主無須支付任何佣金", "C. 買賣合約無效", "D. 獨家代理須向業主賠償"], optsEn: ["A. Vendor remains liable to pay agreed commission to exclusive agent", "B. No commission payable", "C. Contract void", "D. Agent pays vendor"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A Form 3", refEn: "Cap. 511A Form 3" },
  { qZh: "買方透過地產代理購入夾屋或居屋未補地價單位，代理必須確認買方具備何種法定資格？", qEn: "Before purchasing un-assessed HOS/PSPS flats, which statutory document must buyer possess?", optsZh: ["A. 房屋委員會發出之有效「購買資格證明書」(Letter of Eligibility)", "B. 銀行高層推薦信", "C. 稅務局免稅證", "D. 律師樓擔保"], optsEn: ["A. Valid Letter of Eligibility issued by the Housing Authority", "B. Bank reference", "C. Tax exemption certificate", "D. Solicitor guarantee"], ans: 0, refZh: "《房屋條例》Cap. 283", refEn: "Cap. 283" },
  { qZh: "物業存在清拆令 (Removal Order under s.24 Buildings Ordinance)，買方律師可否以此提出「Requisition on Title」(業質質詢)？", qEn: "Can a buyer's solicitor raise a Requisition on Title regarding an un-cleared s.24 Removal Order?", optsZh: ["A. 可以，因未遵從之清拆令構成業主業權瑕疵 (Title Defect)", "B. 不可以，因清拆令非產權事項", "C. 自動取消合約", "D. 由監管局決定"], optsEn: ["A. Yes, as an un-cleared statutory order constitutes a title defect", "B. No", "C. Auto cancel", "D. EAA decision"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "買賣雙方簽署臨時買賣合約 (PASP) 後，買方無故拒絕簽署正式買賣合約，賣方可採取何種法律救濟？", qEn: "If buyer refuses to sign formal agreement after PASP without lawful cause, what remedy is available?", optsZh: ["A. 沒收臨時訂金，並按臨約條款追討實際損失或特定履行 (Specific Performance)", "B. 即時入獄", "C. 沒收買方所有資產", "D. 無任何救濟"], optsEn: ["A. Forfeit deposit and claim actual loss/Specific Performance per PASP terms", "B. Imprisonment", "C. Forfeit all assets", "D. No remedy"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "物業土地查冊出現「Mortgage in favour of Hang Seng Bank」，賣方須於何時完成「Deed of Release」(解除押記契)？", qEn: "When must the vendor complete a Deed of Release for a registered bank mortgage?", optsZh: ["A. 於成交日 (Completion Date) 或之前完成交樓", "B. 成交後半年", "C. 簽臨約當日", "D. 隨時"], optsEn: ["A. On or before Completion Date", "B. 6 months after", "C. PASP signing date", "D. Any time"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "根據《商品說明條例》(Cap. 362)，地產代理在物業宣傳品中對單位面積或景觀作出誤導性遺漏 (Misleading Omission)，有何後果？", qEn: "Under Cap. 362, what is the consequence of misleading omissions regarding area or view in promotional materials?", optsZh: ["A. 屬刑事罪行，可被香港海關檢控", "B. 僅屬微不足道民事糾紛", "C. 警告了事", "D. 由地產行內部處分"], optsEn: ["A. Criminal offence subject to prosecution by Customs and Excise", "B. Civil dispute only", "C. Warning only", "D. Internal sanction"], ans: 0, refZh: "《商品說明條例》Cap. 362", refEn: "Cap. 362" },
  { qZh: "地產代理協議 (Form 3 / Form 4) 中，關於佣金支付時間的預設法定條款為何？", qEn: "What is the default statutory term regarding commission payment timing in Form 3 / Form 4?", optsZh: ["A. 於買賣雙方完成簽署正式買賣合約或完成交易時支付", "B. 視察物業時即時支付", "C. 簽放盤紙時即時支付", "D. 永久不付"], optsEn: ["A. Payable upon execution of formal agreement or completion of transaction", "B. Payable upon inspection", "C. Payable upon listing", "D. Never payable"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { qZh: "物業屬「破產管理署」(Official Receiver) 處置之破產人資產，代理應向誰確認處置權限？", qEn: "If property is asset of a bankrupt under Official Receiver, from whom must agency verify disposition authority?", optsZh: ["A. 破產管理署署長或受託人 (Trustee in Bankruptcy)", "B. 破產人個人", "C. 破產人親屬", "D. 鄰居"], optsEn: ["A. Official Receiver or Trustee in Bankruptcy", "B. Bankrupt individual", "C. Relatives", "D. Neighbors"], ans: 0, refZh: "《破產條例》Cap. 6", refEn: "Cap. 6" },
  { qZh: "代理在計算二手物業臨約之印花稅 (Stamp Duty) 時，應參考稅務局最新的何種稅率表？", qEn: "When calculating Stamp Duty for PASP, which official Inland Revenue scale applies?", optsZh: ["A. 從價印花稅 (AVD) 第 1 標準第 2 部或第 2 標準稅率表", "B. 薪俸稅率表", "C. 利得稅率表", "D. 差餉表"], optsEn: ["A. Ad Valorem Stamp Duty (AVD) Scale 1 Part 2 or Scale 2", "B. Salaries Tax scale", "C. Profits Tax scale", "D. Rates scale"], ans: 0, refZh: "《印花稅條例》Cap. 117", refEn: "Cap. 117" },
  { qZh: "業主以「Power of Attorney」(授權書) 授權其親友簽署臨約，代理必須查核該授權書是否已於何處註冊？", qEn: "If vendor appoints an attorney under Power of Attorney to sign PASP, where must agency verify registration?", optsZh: ["A. 土地註冊處 (Land Registry)", "B. 警察總部", "C. 房屋署", "D. 稅務局"], optsEn: ["A. Land Registry", "B. Police Headquarters", "C. Housing Dept", "D. Inland Revenue"], ans: 0, refZh: "《授權書條例》Cap. 31", refEn: "Cap. 31" },
  { qZh: "地產代理行收取訂金支票時，抬頭應寫為誰人？", qEn: "When agency collects deposit cheque, who should be named as payee?", optsZh: ["A. 賣方律師樓或賣方個人（按臨約規定），或代理行作為 Stakeholder", "B. 代理個人名義", "C. 代理主管名義", "D. 隨意空白"], optsEn: ["A. Vendor's solicitor, vendor personally, or agency as Stakeholder per PASP", "B. Agent personal name", "C. Supervisor name", "D. Blank"], ans: 0, refZh: "《地產代理(客戶款項)規例》Cap. 511B", refEn: "Cap. 511B" },
  { qZh: "根據《大廈管理條例》，公契 (DMC) 對大廈的所有業主及其繼承人具何種法律效力？", qEn: "Under Cap. 344, what is the legal effect of a Deed of Mutual Covenant (DMC) on successors?", optsZh: ["A. 具法例賦予之契約約束力 (Covenant running with the land)", "B. 僅對第一代業主有效", "C. 無約束力", "D. 僅屬建議性質"], optsEn: ["A. Statutory binding covenant running with the land", "B. Valid for 1st owner only", "C. Non-binding", "D. Advisory"], ans: 0, refZh: "《大廈管理條例》Cap. 344", refEn: "Cap. 344" },
  { qZh: "買方發現物業存在未清還之政府維修命令 (Building Order under s.26)，賣方在法律上有何責任？", qEn: "If an un-cleared s.26 Building Repair Order exists, what is the vendor statutory duty?", optsZh: ["A. 賣方須於成交前負責清還相關維修費用及取消命令，除非臨約另有協議", "B. 買方全數負擔", "C. 代理負擔", "D. 政府負擔"], optsEn: ["A. Vendor must pay costs and discharge order before completion unless PASP specifies otherwise", "B. Buyer pays all", "C. Agent pays", "D. Govt pays"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "地產代理行僱用未持有有效牌照的人士從事地產代理工作，該代理行觸犯何罪？", qEn: "What offence is committed if an agency employs an unlicensed individual for estate agency work?", optsZh: ["A. 《地產代理條例》第 15 條（無牌執業/僱用無牌人士罪）", "B. 無罪", "C. 勞工法例糾紛", "D. 民事侵權"], optsEn: ["A. Cap. 511 s.15 Unlicensed practice / employing unlicensed person", "B. No offence", "C. Labor dispute", "D. Civil tort"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.15", refEn: "Cap. 511 s.15" },
  { qZh: "租客簽署住宅租約 (Form 6) 時，代理必須向租客提供並解釋物業土地查冊結果，主要確認甚麼？", qEn: "When tenant signs Form 6, why must agency supply and explain Land Search results?", optsZh: ["A. 確認出租人是否登記業主或獲授權租務代表", "B. 確認業主婚姻狀況", "C. 確認業主職業", "D. 確認鄰居身份"], optsEn: ["A. Confirm lessor is registered owner or authorized leasing representative", "B. Confirm marital status", "C. Confirm occupation", "D. Confirm neighbor ID"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "一手住宅物業銷售中，若宣傳資料包含電腦模擬圖像 (CG renders)，發展商必須於圖旁標明甚麼？", qEn: "In first-hand sales, if promotion includes CG renders, what notice must developer state?", optsZh: ["A. 標明屬畫家對物業之想像感覺 (Artist's Impression)", "B. 保證 100% 與實物一致", "C. 無需標明", "D. 標明價錢"], optsEn: ["A. State that image is Artist's Impression only", "B. Guarantee 100% identical", "C. No notice needed", "D. State price"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621", refEn: "Cap. 621" },
  { qZh: "買賣合約中「Time is of the essence」(時間為合約要素) 條款之法律效果為何？", qEn: "What is the legal effect of 'Time is of the essence' clause in property agreement?", optsZh: ["A. 任何一方未按嚴格約定時間完成義務即屬違約，對家可即時解約", "B. 時間可隨意寬限", "C. 無法律效力", "D. 僅供參考"], optsEn: ["A. Strict compliance with time limits; failure constitutes breach entitling termination", "B. Flexible time", "C. Non-binding", "D. Advisory"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "業主身故後，其遺產受益人在未取得哪份文件前，無權簽署正式合約出售遺產物業？", qEn: "Before acquiring which legal document can estate beneficiaries NOT sign formal agreement to sell?", optsZh: ["A. 遺囑認證書 (Letters of Probate) 或遺產管理證明書", "B. 死亡證影印本", "C. 遺書副本", "D. 戶口簿"], optsEn: ["A. Letters of Probate or Letters of Administration", "B. Death certificate copy", "C. Will copy", "D. Bank book"], ans: 0, refZh: "《遺囑認證及遺產管理條例》Cap. 10", refEn: "Cap. 10" },
  { qZh: "地產代理行與客戶簽署之 Form 3 或 Form 4 協議，副本必須於多久內交付客戶？", qEn: "Within how long must a copy of signed Form 3 / Form 4 be delivered to client?", optsZh: ["A. 簽署後即時或 7 天內", "B. 1 個月後", "C. 成交後", "D. 無需交付"], optsEn: ["A. Immediately upon signing or within 7 days", "B. After 1 month", "C. Upon completion", "D. No delivery needed"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.6", refEn: "Cap. 511A s.6" },
  { qZh: "代理處理物業交易時，若發現單位存在結構性改變（如拆除承重牆），標準專業義務為何？", qEn: "What is agency duty if unauthorized structural alteration (e.g. load-bearing wall removal) is found?", optsZh: ["A. 提醒買方諮詢專業認可人士 (AP) 並向業主查詢有否入則", "B. 隱瞞買方", "C. 保證結構安全", "D. 叫買方即時撕毀合約"], optsEn: ["A. Advise buyer to consult Authorized Person (AP) and verify approved plans", "B. Conceal from buyer", "C. Guarantee structural safety", "D. Cancel PASP"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { qZh: "二手住宅物業交易中，臨時買賣合約 (PASP) 一般由誰人擬定及提供表格？", qEn: "In second-hand residential sales, who prepares and supplies the PASP form?", optsZh: ["A. 地產代理行", "B. 土地註冊處", "C. 房屋署", "D. 稅務局"], optsEn: ["A. Estate agency firm", "B. Land Registry", "C. Housing Dept", "D. Inland Revenue"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { qZh: "買方付予賣方之「初訂」(Preliminary Deposit) 一般佔總樓價多少比例？", qEn: "What is the standard percentage of Preliminary Deposit paid to vendor under PASP?", optsZh: ["A. 3% 至 5%", "B. 20%", "C. 50%", "D. 0.1%"], optsEn: ["A. 3% to 5%", "B. 20%", "C. 50%", "D. 0.1%"], ans: 0, refZh: "香港地產買賣常規", refEn: "HK Practice" },
  { qZh: "買賣雙方簽署正式合約時補足之「加訂」(Further Deposit)，連同初訂一般達到總樓價多少？", qEn: "Together with preliminary deposit, what total percentage does Further Deposit bring upon formal contract?", optsZh: ["A. 10%", "B. 30%", "C. 5%", "D. 50%"], optsEn: ["A. 10%", "B. 30%", "C. 5%", "D. 50%"], ans: 0, refZh: "香港地產買賣常規", refEn: "HK Practice" },
  { qZh: "地產代理在物業廣告上刊登的樓價，必須符合何種規定？", qEn: "What statutory rule governs property prices listed in agency advertisements?", optsZh: ["A. 必須為業主親自指示或書面同意之真實開價", "B. 代理可隨意刊登超低虛假吸引價", "C. 無需業主同意", "D. 參考同行開價"], optsEn: ["A. Must reflect genuine asking price instructed/authorized in writing by vendor", "B. Free to list false low price", "C. Vendor consent unnecessary", "D. Copy competitor"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "根據《地產代理條例》，持牌人若被裁定觸犯涉及詐騙或不誠實的罪行，監管局有何權力？", qEn: "What power has EAA if a licensee is convicted of an offence involving fraud or dishonesty?", optsZh: ["A. 撤銷或暫停其地產代理牌照", "B. 無權干預", "C. 罰款 $100", "D. 升職"], optsEn: ["A. Revoke or suspend estate agent licence", "B. No power", "C. Fine $100", "D. Promotion"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.30", refEn: "Cap. 511 s.30" },
  { qZh: "買方經代理購入連租約單位 (Subject to Tenancy)，代理必須向買方核實並提供甚麼？", qEn: "When purchasing property Subject to Tenancy, what must agency verify and supply to buyer?", optsZh: ["A. 現行租約副本、按金數額及租客交租紀錄", "B. 租客個人身分證正本", "C. 業主私人存款", "D. 鄰居評語"], optsEn: ["A. Tenancy agreement copy, deposit sum, and rental payment records", "B. Tenant original ID", "C. Vendor bank savings", "D. Neighbor comments"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "物業土地查冊顯示「Building Order under s.24」，代表建築事務監督發出了甚麼命令？", qEn: "What order is represented by 'Building Order under s.24' in a Land Search?", optsZh: ["A. 勒令拆除違例建築物 (UBW) 之清拆令", "B. 檢驗窗戶令", "C. 修理斜坡令", "D. 封閉令"], optsEn: ["A. Removal Order for Unauthorized Building Works (UBW)", "B. Window inspection order", "C. Slope repair order", "D. Closure Order"], ans: 0, refZh: "《建築物條例》Cap. 123 s.24", refEn: "Cap. 123 s.24" },
  { qZh: "物業土地查冊顯示「Building Order under s.28」，代表發出了何種命令？", qEn: "What order is represented by 'Building Order under s.28' in a Land Search?", optsZh: ["A. 排水渠修葺或排水系統命令", "B. 清拆令", "C. 斜坡令", "D. 停工令"], optsEn: ["A. Drainage repair or drainage system order", "B. Removal order", "C. Slope order", "D. Stop work order"], ans: 0, refZh: "《建築物條例》Cap. 123 s.28", refEn: "Cap. 123 s.28" },
  { qZh: "物業土地查冊顯示「Charge under Stamp Duty Ordinance」，代表甚麼？", qEn: "What does 'Charge under Stamp Duty Ordinance' registered on Land Search signify?", optsZh: ["A. 該物業因欠繳印花稅而被印花稅署署長註冊了押記", "B. 物業已完稅", "C. 業主獲免稅", "D. 按揭已清還"], optsEn: ["A. A charge registered by Collector of Stamp Revenue for unpaid stamp duty", "B. Stamping completed", "C. Tax exempted", "D. Mortgage paid"], ans: 0, refZh: "《印花稅條例》Cap. 117", refEn: "Cap. 117" },
  { qZh: "代理處理「分權共有」(Tenancy in Common) 物業出售時，其中一名業主欲出售其個人份額，需否其他業主同意？", qEn: "Under Tenancy in Common, does an owner require co-owner consent to sell personal undivided share?", optsZh: ["A. 依法可獨立出售其個人分權份額，無需其他業主同意", "B. 必須 100% 業主同意", "C. 必須法庭批准", "D. 完全禁止出售"], optsEn: ["A. May assign undivided share independently without co-owner consent", "B. 100% consent required", "C. Court order required", "D. Prohibited"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "若物業屬「負資產」(Negative Equity)，賣方出售樓價不足以清還銀行按揭，代理有何特別風險責任？", qEn: "If selling price is insufficient to discharge mortgage (Negative Equity), what is agency risk duty?", optsZh: ["A. 須確認賣方有能力補足差額清還按揭，並建議訂金由律師樓託管 (Stakeholder)", "B. 慫恿買方直接給賣方現金", "C. 無需理會按揭", "D. 由代理行補貼"], optsEn: ["A. Verify vendor capability to top up shortfall and advise deposit stakeholding", "B. Encourage cash to vendor", "C. Ignore mortgage", "D. Agency pays shortfall"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { qZh: "代理向買方宣稱物業可作商業閣樓開餐廳，但公契限制只可作住宅，代理觸犯了甚麼？", qEn: "Agent tells buyer unit allows restaurant when DMC restricts to residential. What is breached?", optsZh: ["A. 誤導性失實陳述及違反操守守則", "B. 完全合法", "C. 商業推廣技巧", "D. 僅由買方自負"], optsEn: ["A. Misleading misrepresentation and breach of Code of Ethics", "B. Fully legal", "C. Marketing technique", "D. Buyer risk only"], ans: 0, refZh: "《失實陳述條例》Cap. 284 & 操守守則", refEn: "Cap. 284 & Code of Ethics" },
  { qZh: "二手住宅物業交易中，賣方未能於成交日交付「VACANT POSSESSION」(空置管有)，構成何種效果？", qEn: "What is the legal effect if vendor fails to deliver Vacant Possession on completion date?", optsZh: ["A. 賣方重大違約，買方有權終止合約並索償", "B. 買方必須接受連租約", "C. 自動延期 1 年", "D. 無任何效果"], optsEn: ["A. Fundamental breach by vendor; buyer entitled to terminate and claim damages", "B. Buyer must accept tenancy", "C. Auto extend 1 year", "D. No effect"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "地產代理在物業臨約上記錄的物業地址，必須與哪里的官方紀錄完全一致？", qEn: "Where must the property address recorded in a PASP exactly match?", optsZh: ["A. 土地註冊處 (Land Registry) 查冊紀錄", "B. 業主名片", "C. 水費單", "D. 管理處收據"], optsEn: ["A. Land Registry search records", "B. Vendor business card", "C. Water bill", "D. Management receipt"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { qZh: "買賣合約中「As Is」(按現狀) 條款，是否豁免賣方隱瞞「潛在隱蔽業權瑕疵」(Latent Defect) 的責任？", qEn: "Does an 'As Is' clause exempt vendor liability for concealing latent title defects?", optsZh: ["A. 否，按現狀條款一般僅指物理現狀，不豁免賣方隱瞞業權瑕疵責任", "B. 是，賣方可隱瞞所有瑕疵", "C. 是，買方無權追討", "D. 由代理承擔"], optsEn: ["A. No; 'As Is' applies to physical state, not exculpating title defect concealment", "B. Yes", "C. Yes", "D. Agency bears liability"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "一手住宅物業銷售中，發展商提供之融資按揭計劃，必須於價單中披露甚麼？", qEn: "What must developer disclose in price list regarding offered mortgage schemes?", optsZh: ["A. 利率、條款及申請資格門檻", "B. 發展商私人帳目", "C. 銀行股東名單", "D. 無需披露"], optsEn: ["A. Interest rates, key terms, and eligibility criteria", "B. Developer accounts", "C. Bank shareholders", "D. No disclosure"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621", refEn: "Cap. 621" },
  { qZh: "代理收取買方預付之微薄服務費，是否仍須發出正式蓋印/簽署收據？", qEn: "Must an agency issue a formal receipt upon receiving a small service fee advance?", optsZh: ["A. 是，所有客戶款項不論金額均須開具收據", "B. 否，小額無需收據", "C. 視乎代理心情", "D. 口頭確認即可"], optsEn: ["A. Yes; formal receipts are mandatory for all client monies regardless of amount", "B. No for small fees", "C. Optional", "D. Verbal confirmation"], ans: 0, refZh: "《地產代理(客戶款項)規例》Cap. 511B", refEn: "Cap. 511B" },
  { qZh: "根據《地產代理條例》，牌照被撤銷的人士，自撤銷之日起多久內不得重新申請牌照？", qEn: "How long after revocation of licence is an individual barred from re-applying?", optsZh: ["A. 12 個月內 (或監管局指定期限)", "B. 7 天內", "C. 永久不得申請", "D. 1 個月內"], optsEn: ["A. Within 12 months (or period specified by EAA)", "B. 7 days", "C. Permanent bar", "D. 1 month"], ans: 0, refZh: "《地產代理條例》Cap. 511 s.30", refEn: "Cap. 511 s.30" },
  { qZh: "物業土地查冊顯示「Notice under s.17B of Noise Control Ordinance」，代表物業涉及甚麼？", qEn: "What does 'Notice under s.17B of Noise Control Ordinance' on Land Search indicate?", optsZh: ["A. 噪音管制條例相關通知書", "B. 僭建令", "C. 補地價通知", "D. 差餉單"], optsEn: ["A. Statutory Notice issued under Noise Control Ordinance", "B. UBW order", "C. Premium notice", "D. Rates bill"], ans: 0, refZh: "《噪音管制條例》Cap. 400", refEn: "Cap. 400" },
  { qZh: "地產代理處理村屋 (Village House) 買賣時，必須提醒買方核實村屋是否具備甚麼官方證明文件？", qEn: "When dealing with Village House sales, which official document must agency remind buyer to verify?", optsZh: ["A. 完工證 / 不反對入住書 (Letter of No Objection) 及地界圖", "B. 村長口頭證明", "C. 鄰居協議", "D. 水費單"], optsEn: ["A. Certificate of Exemption / Letter of No Objection and boundary plan", "B. Village representative oral note", "C. Neighbor note", "D. Water bill"], ans: 0, refZh: "《建築物條例(新界適用)條例》Cap. 121", refEn: "Cap. 121" }
];

// 20 Completely Unique Part II Questions
const PART_II_20_UNIQUE = [
  // Case 1
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q81】審視 Smart Mansion 土地查冊報告。代理 Sunny 發現屋宇署第 24 條清拆命令，賣方指示隱瞞。Sunny 最符合法規的做法為何？", qEn: "[Part II Case 1 • Q81] Inspecting Smart Mansion Land Search. Sunny finds a s.24 Removal Order. Vendor instructs non-disclosure. What is Sunny's duty?", optsZh: ["A. 遵從賣方指示不予披露", "B. 必須向買方全面披露清拆令並於臨約特別條款記載", "C. 建議買方自行評估風險", "D. 私下為賣方拆除僭建"], optsEn: ["A. Comply with vendor", "B. Mandatory disclosure to purchaser in PASP", "C. Advise buyer self-assessment", "D. Privately dismantle UBW"], ans: 1, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q82】溫先生以單獨遺囑執行人身分簽臨約。買方律師要求查閱 Letters of Probate 主要目的為何？", qEn: "[Part II Case 1 • Q82] Mr. Wan signs as Sole Executor. Why does buyer's solicitor require Letters of Probate?", optsZh: ["A. 核實溫先生具備處置物業之合法遺產管理權限", "B. 核實死亡證真偽", "C. 檢查遺產扣稅額", "D. 評估印花稅"], optsEn: ["A. Confirm legal authority to dispose estate property", "B. Verify death certificate", "C. Inspect tax deduction", "D. Calculate stamp duty"], ans: 0, refZh: "《遺囑認證及遺產管理條例》Cap. 10", refEn: "Cap. 10" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q83】代理查冊發現露台存在未入則加建物 (UBW)。臨約特別條款應如何擬定？", qEn: "[Part II Case 1 • Q83] Search reveals unauthorized balcony enclosure. How should special conditions be drafted?", optsZh: ["A. 明確列明該 UBW 存在，買方知悉並承擔日後清拆風險", "B. 保證該 UBW 100% 合法", "C. 承諾賣方開工拆除", "D. 不作任何紀錄"], optsEn: ["A. Explicitly state UBW presence, buyer accepts removal risk", "B. Guarantee legality", "C. Vendor promises removal", "D. Omit mention"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q84】物業土地查冊負擔欄有 2018 年恆生銀行按揭。臨約交樓條款應如何訂明？", qEn: "[Part II Case 1 • Q84] Search shows a 2018 Hang Seng Bank Legal Charge. How should completion terms be framed?", optsZh: ["A. 賣方須於成交日或之前清還按揭並提供解除押記契 (Release)", "B. 買方承接賣方原有按揭", "C. 訂金直接付予賣方個人", "D. 無需處理舊按揭"], optsEn: ["A. Vendor must discharge legal charge on or before completion", "B. Buyer assumes existing mortgage", "C. Deposit paid to vendor personally", "D. Ignore prior mortgage"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q85】若買方要求在未取得遺囑認證書前先付大訂予溫先生， Sunny 應給予甚麼專業建議？", qEn: "[Part II Case 1 • Q85] Buyer offers further deposit to Mr. Wan before Probate grant. What is Sunny's advice?", optsZh: ["A. 嚴禁將訂金直接給予溫先生，訂金必須由賣方律師樓託管 (Stakeholder)", "B. 贊成直接交現金", "C. 存入 Sunny 個人戶口", "D. 無所謂"], optsEn: ["A. Strictly prohibit direct payment; mandate solicitor stakeholding", "B. Agree cash payment", "C. Deposit to Sunny account", "D. Unimportant"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q86】查冊顯示 Smart Mansion 屬 1975 年落成大廈，買方欲確認大廈是否已收到強制驗樓通知 (s.30A Notice)， Sunny 應如何協助？", qEn: "[Part II Case 1 • Q86] Buyer asks if 1975 building received s.30A Mandatory Building Inspection Notice. How to assist?", optsZh: ["A. 查閱屋宇署資料庫及向管理處查詢有否收到 s.30A 強制驗樓/驗窗通知", "B. 保證大廈永遠無需驗樓", "C. 叫買家自行上網搵", "D. 隱瞞通知書"], optsEn: ["A. Search Buildings Dept records and verify with IO/Manager regarding s.30A notice", "B. Guarantee no inspection needed", "C. Ask buyer to search web", "D. Conceal notice"], ans: 0, refZh: "《建築物條例》Cap. 123 s.30A", refEn: "Cap. 123 s.30A" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q87】溫先生表示遺產繼承人共有三人，但遺囑指定其為單獨執行人。簽署臨約時需要其他繼承人聯署嗎？", qEn: "[Part II Case 1 • Q87] Will names Mr. Wan as sole executor among 3 beneficiaries. Must other beneficiaries co-sign PASP?", optsZh: ["A. 依法僅需單獨遺囑執行人溫先生簽署即具法律效力", "B. 必須全數繼承人聯署", "C. 必須民政事務署簽名", "D. 必須地產代理簽名"], optsEn: ["A. Signing by sole executor Mr. Wan alone carries full legal binding effect", "B. All beneficiaries must sign", "C. Home Affairs sign", "D. Agent sign"], ans: 0, refZh: "《遺囑認證及遺產管理條例》Cap. 10", refEn: "Cap. 10" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q88】查冊紀錄顯示單位不可分割份數為 1/50th，公契載明住宅用途。買方意圖改作無牌民宿 (AirBnB)，代理有何義務？", qEn: "[Part II Case 1 • Q88] Land search specifies domestic use. Buyer intends unlicensed AirBnB rental. What is agency duty?", optsZh: ["A. 提醒買方此舉違反大廈公契及《旅館業條例》，代理不可協助違規", "B. 鼓勵買方經營", "C. 代買方宣傳民宿", "D. 隱瞞公契條款"], optsEn: ["A. Advise buyer that commercial short-lets breach DMC and Hotel & Guesthouse Accommodation Ordinance", "B. Encourage operation", "C. Advertise AirBnB", "D. Conceal DMC"], ans: 0, refZh: "《旅館業條例》Cap. 349 & DMC", refEn: "Cap. 349 & DMC" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q89】若屋宇署清拆令在成交前被註銷，賣方律師應提供甚麼文件予買方律師驗證？", qEn: "[Part II Case 1 • Q89] If s.24 Order is discharged before completion, what document proves compliance to buyer's solicitor?", optsZh: ["A. 屋宇署發出之 Compliance Letter (順從通知書/撤銷令)", "B. 口頭保證", "C. 裝修公司收據", "D. 代理信件"], optsEn: ["A. Official Compliance Letter / Order of Discharge issued by Buildings Dept", "B. Oral guarantee", "C. Contractor receipt", "D. Agency note"], ans: 0, refZh: "《建築物條例》Cap. 123", refEn: "Cap. 123" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q90】 Smart Mansion 單位交樓時， Sunny 陪同交樓驗收發現露台 UBW 仍未拆除。臨約已訂明「按現狀承擔」，買方可否拒絕成交？", qEn: "[Part II Case 1 • Q90] Upon handover, UBW remains. PASP stated 'As Is with UBW accepted'. Can buyer refuse completion?", optsZh: ["A. 買方須按合約條款接受現狀並按時完成成交，不可無故拒絕", "B. 買方可即時要求退還雙倍訂金", "C. 買方可即時扣減一半樓價", "D. 臨約自動作廢"], optsEn: ["A. Buyer must complete per contractual 'As Is' risk acceptance clause", "B. Demand double deposit return", "C. Deduct half price", "D. PASP voided"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },

  // Case 2
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q91】賣方 Apex Profits Limited 屬公司。代理 Ken 僅進行土地查冊，遺漏公司註冊處 (CR) 查冊，有何風險？", qEn: "[Part II Case 2 • Q91] Vendor is a company. Agent Ken omitted Companies Registry search. What risk is exposed?", optsZh: ["A. 遺漏未於土地註冊處登記之浮動押記 (Floating Charge) 及 Negative Pledge 限制", "B. 遺漏差餉紀錄", "C. 遺漏水電費紀錄", "D. 無任何風險"], optsEn: ["A. Omission of unregistered Floating Charge with Negative Pledge at Land Registry", "B. Omission of rates", "C. Omission of utility bills", "D. No risk"], ans: 0, refZh: "《公司條例》Cap. 622", refEn: "Cap. 622" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q92】商業物業交易中，代理 Ken 建議將 380 萬大訂直接存入賣方公司帳戶，有何潛在隱患？", qEn: "[Part II Case 2 • Q92] Ken advises paying HK$3.8M deposit directly to corporate vendor account. What danger exists?", optsZh: ["A. 若公司清盤或負債，買方面臨損失訂金且無法取得業權之極高風險", "B. 買方可獲稅務扣減", "C. 律師樓禁止託管商業訂金", "D. 符合標準對家程序"], optsEn: ["A. Severe risk of deposit loss if vendor liquidates before completion", "B. Tax reduction", "C. Solicitors prohibited from stakeholding", "D. Standard practice"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q93】買方公司要求以授權簽署人 (Authorized Signatory) 代表簽署正式合約，代理應查核哪份文件？", qEn: "[Part II Case 2 • Q93] Purchaser company signs via Authorized Signatory. Which corporate document must be inspected?", optsZh: ["A. 董事會決議案 (Board Resolution) 及公司章程 (Articles of Association)", "B. 商業登記證影印本", "C. 報稅表", "D. 股東個人身分證"], optsEn: ["A. Board Resolution and Articles of Association", "B. Business Registration copy", "C. Tax return", "D. Shareholder ID"], ans: 0, refZh: "《公司條例》Cap. 622", refEn: "Cap. 622" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q94】商業單位公契載明限作辦公室用途 (Commercial Office)。買方意圖改作零售開診所，代理有何義務？", qEn: "[Part II Case 2 • Q94] DMC restricts unit to Commercial Office. Buyer intends retail medical clinic. What is agent duty?", optsZh: ["A. 提醒買方查核 DMC 及大廈公契用途限制，避免違規", "B. 保證開診所完全合法", "C. 慫恿買方先簽約後申請", "D. 隱瞞用途限制"], optsEn: ["A. Advise buyer to check DMC user restrictions and planning permission", "B. Guarantee legal clinic use", "C. Encourage signing first", "D. Conceal restrictions"], ans: 0, refZh: "大廈公契 (DMC) & 城規條例", refEn: "DMC & Town Planning" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q95】查冊發現賣方公司於 2019 年向渣打銀行做過法定押記 (Legal Charge)， Ken 應如何確認賣方具清還能力？", qEn: "[Part II Case 2 • Q95] Land search shows 2019 Legal Charge to bank. How to verify vendor ability to discharge?", optsZh: ["A. 要求賣方律師提供 Redemption Statement (贖樓清單)，確認賣方所得樓價足夠清還按揭", "B. 相信賣方口頭承諾", "C. 代賣方向銀行借錢", "D. 無需確認"], optsEn: ["A. Request vendor solicitor to supply Redemption Statement verifying proceeds clear debt", "B. Believe oral assurance", "C. Agency loans funds", "D. No check"], ans: 0, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q96】若 Apex Profits Limited 在簽正式合約前被債權人入稟法院申請清盤 (Winding-up Petition)，該物業交易有何影響？", qEn: "[Part II Case 2 • Q96] If vendor company faces Winding-up Petition before formal contract, what is the impact?", optsZh: ["A. 根據《公司(清盤及雜項條文)條例》，清盤開始後處置公司財產依法屬無效 (Void)", "B. 交易照常無影響", "C. 買方自動獲得物業", "D. 代理接收物業"], optsEn: ["A. Any property disposition after winding-up commencement is void by law", "B. Transaction unaffected", "C. Buyer gets property auto", "D. Agency receives property"], ans: 0, refZh: "《公司(清盤及雜項條文)條例》Cap. 32 s.182", refEn: "Cap. 32 s.182" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q97】買方為海外註冊公司 (BVI Company)，代理在核實其簽署人身份時須特別注意甚麼？", qEn: "[Part II Case 2 • Q97] Buyer is an overseas BVI company. What special document verifies signatory capacity?", optsZh: ["A. 要求提供 Incumbency Certificate (董事職權證明書) 及 Legal Opinion (法律意見書)", "B. 僅憑 BVI 商業牌照即可", "C. 隨意簽署", "D. 拒絕處理"], optsEn: ["A. Request Certificate of Incumbency and Legal Opinion verifying authority", "B. BVI licence copy only", "C. Sign freely", "D. Refuse transaction"], ans: 0, refZh: "香港商業轉易實務", refEn: "HK Commercial Conveyancing" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q98】中環商業中心全層面積達 5,000 呎，買方欲將其分拆為 4 個小單位出租， Ken 應給予何種法規提示？", qEn: "[Part II Case 2 • Q98] Buyer plans to sub-divide 5,000 sq ft office floor into 4 units. What regulatory advice applies?", optsZh: ["A. 提示須符合屋宇署建築物條例、消防條例及公契 (DMC) 拆細限制", "B. 保證隨意拆細完全合法", "C. 叫買方偷偷裝修", "D. 隱瞞建築署規定"], optsEn: ["A. Caution that subdivision must comply with Buildings Ordinance, Fire Safety, and DMC", "B. Guarantee legal", "C. Secret renovation", "D. Conceal BO"], ans: 0, refZh: "《建築物條例》Cap. 123 & DMC", refEn: "Cap. 123 & DMC" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q99】賣方公司要求買方以商業本票 (Banker's Draft) 支付臨約訂金，抬頭指定為賣方律師樓，此做法是否合規？", qEn: "[Part II Case 2 • Q99] Vendor requires deposit via Banker's Draft payable to vendor's solicitor. Is this compliant?", optsZh: ["A. 合規，抬頭為賣方律師樓作為 Stakeholder 能有效保障訂金安全", "B. 不合規，必須付現金", "C. 不合規，抬頭必須寫代理名", "D. 違法行為"], optsEn: ["A. Compliant; Banker's Draft to solicitor as Stakeholder secures deposit safety", "B. Non-compliant cash required", "C. Must name agency", "D. Illegal"], ans: 0, refZh: "《地產代理(客戶款項)規例》Cap. 511B", refEn: "Cap. 511B" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q100】完成商業物業交易後，買方律師必須於多少天內向稅務局印花稅署繳付相關印花稅並辦理土地註冊？", qEn: "[Part II Case 2 • Q100] Within how many days after completion must purchaser solicitor pay stamp duty and register deed?", optsZh: ["A. 簽署合約後 30 天內", "B. 7 天內", "C. 60 天內", "D. 1 年內"], optsEn: ["A. Within 30 days of contract execution", "B. Within 7 days", "C. Within 60 days", "D. Within 1 year"], ans: 0, refZh: "《印花稅條例》Cap. 117 & Cap. 128", refEn: "Cap. 117 & Cap. 128" }
];

// Combine into 100 Absolutely Unique Master Questions
const MASTER_QUESTIONS: MockQuestionServer[] = [
  ...PART_I_UNIQUE_DATA.map((item, idx) => ({
    id: idx + 1,
    part: 'I' as const,
    trackApplicability: ((idx + 1) % 3 === 0 ? 'EAQE_ONLY' : 'BOTH') as 'EAQE_ONLY' | 'BOTH',
    topicZh: item.refZh,
    topicEn: item.refEn,
    questionZh: item.qZh,
    questionEn: item.qEn,
    optionsZh: item.optsZh,
    optionsEn: item.optsEn,
    answerIndex: item.ans,
    explanationZh: `根據香港相關法例（${item.refZh}），此題答案為 ${item.optsZh[item.ans]}。`,
    explanationEn: `Under Hong Kong property law (${item.refEn}), the correct statutory answer is ${item.optsEn[item.ans]}.`,
    statuteRefZh: item.refZh,
    statuteRefEn: item.refEn
  })),
  ...PART_II_20_UNIQUE.map((item, idx) => ({
    id: idx + 81,
    part: 'II' as const,
    trackApplicability: 'BOTH' as const,
    caseScenarioId: item.scenarioId,
    topicZh: item.refZh,
    topicEn: item.refEn,
    questionZh: item.qZh,
    questionEn: item.qEn,
    optionsZh: item.optsZh,
    optionsEn: item.optsEn,
    answerIndex: item.ans,
    explanationZh: `根據土地查冊紀錄及法規依據（${item.refZh}），此題答案為 ${item.optsZh[item.ans]}。`,
    explanationEn: `Based on Land Search records and statutory authority (${item.refEn}), the correct answer is ${item.optsEn[item.ans]}.`,
    statuteRefZh: item.refZh,
    statuteRefEn: item.refEn
  }))
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedTrack = (searchParams.get('track') || 'EAQE').toUpperCase() as 'EAQE' | 'SQE';

    const authHeader = req.headers.get('authorization') || '';
    const bearerToken = authHeader.replace('Bearer ', '').trim();
    const dynamicClientEmail = (req.headers.get('x-user-email') || '').toLowerCase().trim();
    const dynamicClaimedTier = (req.headers.get('x-user-tier') || '').toUpperCase().trim();

    const isAdmin = dynamicClientEmail.length > 0 && ADMIN_EMAILS.includes(dynamicClientEmail);

    let effectiveTier: UserSubscriptionTier = 'FREE_PREVIEW';

    if (isAdmin || dynamicClaimedTier === 'ADMIN_BUILDER') {
      effectiveTier = 'ADMIN_BUILDER';
    } else if (dynamicClaimedTier === 'ALL_ACCESS_PRO') {
      effectiveTier = 'ALL_ACCESS_PRO';
    } else if (dynamicClaimedTier === 'EAQE_PRO') {
      effectiveTier = 'EAQE_PRO';
    } else if (dynamicClaimedTier === 'SQE_PRO') {
      effectiveTier = 'SQE_PRO';
    } else if (bearerToken.length > 30 && dynamicClientEmail.length > 0) {
      effectiveTier = requestedTrack === 'EAQE' ? 'EAQE_PRO' : 'SQE_PRO';
    }

    const isAuthorizedForEAQE =
      effectiveTier === 'ADMIN_BUILDER' ||
      effectiveTier === 'ALL_ACCESS_PRO' ||
      effectiveTier === 'EAQE_PRO';

    const isAuthorizedForSQE = isAuthorizedForEAQE || effectiveTier === 'SQE_PRO';
    const isAuthorizedForRequestedTrack = requestedTrack === 'EAQE' ? isAuthorizedForEAQE : isAuthorizedForSQE;

    const trackRelevantQuestions = MASTER_QUESTIONS.filter((q) => {
      if (requestedTrack === 'SQE') {
        return q.trackApplicability === 'BOTH' || q.trackApplicability === 'SQE_ONLY';
      }
      return q.trackApplicability === 'BOTH' || q.trackApplicability === 'EAQE_ONLY';
    });

    if (isAuthorizedForRequestedTrack) {
      return NextResponse.json({
        success: true,
        userTier: effectiveTier,
        requestedTrack,
        isAuthorized: true,
        totalAvailable: trackRelevantQuestions.length,
        questions: trackRelevantQuestions.map((q) => ({
          ...q,
          isLocked: false
        }))
      });
    }

    const sanitizedQuestions = trackRelevantQuestions.map((q, idx) => {
      if (idx < 10) return { ...q, isLocked: false };

      const requiresEaqeUpgrade = requestedTrack === 'EAQE' && effectiveTier === 'SQE_PRO';

      return {
        id: q.id,
        part: q.part,
        trackApplicability: q.trackApplicability,
        caseScenarioId: q.caseScenarioId,
        topicZh: q.topicZh,
        topicEn: q.topicEn,
        statuteRefZh: q.statuteRefZh,
        statuteRefEn: q.statuteRefEn,
        isLocked: true,
        lockReason: requiresEaqeUpgrade ? 'REQUIRES_EAQE_UPGRADE' : 'REQUIRES_SUBSCRIPTION',
        questionZh: requiresEaqeUpgrade
          ? '【EAQE 大牌專屬試題】此題屬地產代理（大牌）資格考題。請升級以解鎖全真大牌試卷。'
          : '【PRO 專業版專屬考題】此題屬標準資格考題。請解鎖專業版以閱覽完整題幹、ABCD 選項及法規解析。',
        questionEn: requiresEaqeUpgrade
          ? '[EAQE EXCLUSIVE] This item tests Estate Agent level competency. Upgrade to access full EAQE papers.'
          : '[PRO TIER EXCLUSIVE QUESTION] Unlock PRO to inspect question stems, options, and statutory analysis.',
        optionsZh: [
          'A. [PRO 專屬選項 - 點擊升級解鎖]',
          'B. [PRO 專屬選項 - 點擊升級解鎖]',
          'C. [PRO 專屬選項 - 點擊升級解鎖]',
          'D. [PRO 專屬選項 - 點擊升級解鎖]'
        ],
        optionsEn: [
          'A. [PRO Locked Option - Unlock to view]',
          'B. [PRO Locked Option - Unlock to view]',
          'C. [PRO Locked Option - Unlock to view]',
          'D. [PRO Locked Option - Unlock to view]'
        ],
        answerIndex: 0,
        explanationZh: '請升級以獲取主考官評分依據與條例解析。',
        explanationEn: 'Please upgrade to view master examiner statutory analysis.'
      };
    });

    return NextResponse.json({
      success: true,
      userTier: effectiveTier,
      requestedTrack,
      isAuthorized: false,
      freeLimit: 10,
      totalAvailable: trackRelevantQuestions.length,
      questions: sanitizedQuestions
    });

  } catch (err: any) {
    console.error('Tier-Gated Mock Exam API Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}