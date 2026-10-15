// app/memory-palace/blueprint/page.tsx
import React, { useState, useRef } from 'react';
import { 
  Compass, 
  BookOpen, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Building2, 
  Scale, 
  Layers,
  MapPin,
  ShieldCheck,
  Eye,
  ArrowRight,
  ChevronDown,
  Globe,
  Map
} from 'lucide-react';

interface LociStation {
  id: string;
  num: string;
  titleZh: string;
  titleEn: string;
  locationZh: string;
  locationEn: string;
  icon: React.ElementType;
  blockId: string;
  statuteRefZh: string;
  statuteRefEn: string;
  spatialSceneZh: string;
  spatialSceneEn: string;
  mnemonicHookZh: string;
  mnemonicHookEn: string;
  examTrapZh: string;
  examTrapEn: string;
  linkedRoute?: string;
  linkedRouteLabelZh?: string;
  linkedRouteLabelEn?: string;
}

const LOCI_STATIONS: LociStation[] = [
  {
    id: 'loci-1',
    num: 'Station 01',
    titleZh: 'EAA 拱門與持牌四大柱石',
    titleEn: 'EAA Archway & 4 Licensing Pillars',
    locationZh: '記憶宮殿大門入口 (Entrance Gate)',
    locationEn: 'Memory Palace Main Entrance Gate',
    icon: Building2,
    blockId: 'b1',
    statuteRefZh: 'Cap. 511 s.15 & s.19',
    statuteRefEn: 'Cap. 511 s.15 & s.19',
    spatialSceneZh: '想像宮殿入口有四根巨型大理石柱：柱子頂部雕刻著「18 歲🎂」、「中五畢業證書📜」、「12 個月考試合格沙漏⏳」與「Fit & Proper 盾牌🛡️」。',
    spatialSceneEn: 'Visualize four giant marble pillars at the entrance arch: carved with "Age 18🎂", "Form 5 Certificate📜", "12-Month Exam Validity Hourglass⏳", and "Fit & Proper Shield🛡️".',
    mnemonicHookZh: '口訣：【18 - 5 - 12 - F&P】。工作經驗 (Work Experience) 完全不屬於柱石之一！',
    mnemonicHookEn: 'Mnemonic: 18 - 5 - 12 - F&P. Work Experience is completely absent from the pillars!',
    examTrapZh: ' Trap: 考官常宣稱「具備 3 年行業經驗可獲評為 Fit & Proper」——錯誤！EAA 評估不考慮工作經驗。',
    examTrapEn: ' Trap: "3 years experience counts for Fit & Proper assessment" — FALSE. EAA ignores work experience.'
  },
  {
    id: 'loci-2',
    num: 'Station 02',
    titleZh: '31 天紅色郵筒與分行管理',
    titleEn: '31-Day Red Mailbox & Branch Control',
    locationZh: '接待大堂 (Main Reception Lobby)',
    locationEn: 'Main Reception Lobby',
    icon: MapPin,
    blockId: 'b2',
    statuteRefZh: 'Cap. 511 s.36 & s.40',
    statuteRefEn: 'Cap. 511 s.36 & s.40',
    spatialSceneZh: '在大堂正中央立著一個耀眼的「31 天發光紅色郵筒 📬」。每當分行搬遷或新經理上任，工作人員必須在 31 天內將通知信投進郵筒。',
    spatialSceneEn: 'A glowing "31-Day Red Mailbox 📬" stands in the lobby center. Whenever a branch moves or a new manager is appointed, a notice letter must be mailed within 31 days.',
    mnemonicHookZh: '口訣：【31 天郵筒】。注意：每一營業地點必須由持「地產代理牌照 (個人)」之經理獨立有效控制。',
    mnemonicHookEn: 'Mnemonic: The 31-Day Mailbox. Every branch requires separate effective control by an Individual Estate Agent License holder.',
    examTrapZh: ' Trap: 宣稱「分行開張只需通知開張日期，無需指派代理牌照持有人經理」——錯誤！',
    examTrapEn: ' Trap: "Branch opening only requires reporting the address without a licensed agent manager" — FALSE.'
  },
  {
    id: 'loci-3',
    num: 'Station 03',
    titleZh: '客戶存款獨立金庫 (3-2-14-3)',
    titleEn: 'Client Money Safe Deposit Vault (3-2-14-3)',
    locationZh: '地下地下室金庫 (Underground Vault)',
    locationEn: 'Underground Vault',
    icon: ShieldCheck,
    blockId: 'b4',
    statuteRefZh: 'Cap. 511 s.43 & Client Money Rules',
    statuteRefEn: 'Cap. 511 s.43 & Client Money Rules',
    spatialSceneZh: '走進金庫，看見一個嚴密密封的「銀行客戶信託戶口保險箱 🏦」。牆上刻著密碼數字：【3 種法定用途 - 2 個可支付對象 - 14 天發收據 - 3 年收據保存】。',
    spatialSceneEn: 'Step inside the vault to see a sealed "Bank Client Trust Account Safe 🏦". Etched on the wall is the formula: 3 Permitted Uses - 2 Recipients - 14 Days Receipt - 3 Years Record Retention.',
    mnemonicHookZh: '口訣：【3 - 2 - 14 - 3】。客戶訂金絕對不能存入代理營業戶口或個人戶口！',
    mnemonicHookEn: 'Mnemonic: 3 - 2 - 14 - 3. Client deposits must NEVER enter an agency office or personal bank account!',
    examTrapZh: ' Trap: 宣稱「代理可直接將買家訂金存入賣方律師樓戶口」——錯誤！除非有事前書面指示。',
    examTrapEn: ' Trap: "Agent can directly deposit client money into vendor solicitor account" — FALSE unless prior written instruction exists.'
  },
  {
    id: 'loci-4',
    num: 'Station 04',
    titleZh: '單雙數代理協議翹翹板',
    titleEn: 'Odd/Even Agency Agreement Seesaw',
    locationZh: '法律檔案館 (Legal Filing Archive)',
    locationEn: 'Legal Filing Archive',
    icon: Layers,
    blockId: 'b11',
    statuteRefZh: 'Form 3, Form 4, Form 5, Form 6',
    statuteRefEn: 'Form 3, Form 4, Form 5, Form 6',
    spatialSceneZh: '檔案館中央有一個巨大的翹翹板：左邊坐著「單數賣方/業主 (Form 3, Form 5 🏷️)」，右邊坐著「雙數買方/租客 (Form 4, Form 6 🛒)」。翹翹板中間掛著【最長 3 個月有效期】時鐘。',
    spatialSceneEn: 'A giant seesaw stands in the archive: "Odd Seller/Landlord (Form 3, Form 5 🏷️)" sits on the left, "Even Buyer/Tenant (Form 4, Form 6 🛒)" sits on the right. A clock reading "Max 3 Months" hangs in the middle.',
    mnemonicHookZh: '口訣：【單數賣 🏷️、雙數買 🛒】。Form 1 & 2 是資料單 (Information)，Form 3 至 6 是約束協議！',
    mnemonicHookEn: 'Mnemonic: Odd Sells 🏷️, Even Buys 🛒. Forms 1 & 2 are Info forms, Forms 3 to 6 are Binding Agreements.',
    examTrapZh: ' Trap: 宣稱「出租商業寫字樓必須簽署 Form 5」——錯誤！法定表格僅適用於住宅物業。',
    examTrapEn: ' Trap: "Leasing commercial office requires Form 5" — FALSE. Prescribed forms apply only to residential properties.'
  },
  {
    id: 'loci-5',
    num: 'Station 05',
    titleZh: 'POIM 四大抽屜與公司雙重查冊',
    titleEn: 'POIM 4-Drawer Cabinet & Two-Search Rule',
    locationZh: '土地註冊處展廳 (Land Registry Gallery)',
    locationEn: 'Land Registry Gallery',
    icon: FileText,
    blockId: 'b14',
    statuteRefZh: 'Land Registration Ordinance Cap. 128',
    statuteRefEn: 'Land Registration Ordinance Cap. 128',
    spatialSceneZh: '展廳立著一座四層金屬抽屜柜：【(P) Property - (O) Owner - (I) Incumbrances - (M) Memorials】。每當賣家是「有限公司」時，抽屜上方會閃爍警示燈，指示開啟旁邊的【公司註冊處 (Companies Registry) 抵押櫃】！',
    spatialSceneEn: 'A 4-drawer metal cabinet stands tall: (P) Property - (O) Owner - (I) Incumbrances - (M) Memorials. When the vendor is a Limited Company, a flashing light alerts you to open the adjacent "Companies Registry Charges Cabinet"!',
    mnemonicHookZh: '口訣：【P-O-I-M 四抽屜 🗄️ 與 雙重查冊 (Two Searches)】。',
    mnemonicHookEn: 'Mnemonic: P-O-I-M 4-Drawer Cabinet 🗄️ & Two-Search Rule.',
    examTrapZh: ' Trap: 宣稱「商業登記證 (BR) 可查出公司物業是否設有浮動押記」——錯誤！必須做公司註冊處查冊。',
    examTrapEn: ' Trap: "Business Registration (BR) reveals corporate floating charges" — FALSE. Requires Companies Registry search.',
    linkedRoute: '/case-study',
    linkedRouteLabelZh: '進入 Part II 個案實務 & POIM 查冊',
    linkedRouteLabelEn: 'Launch Part II Case Study & POIM Viewer'
  },
  {
    id: 'loci-6',
    num: 'Station 06',
    titleZh: '2-2-2 鏡像長廊與 15 天沒收權',
    titleEn: '2-2-2 Mirror Corridor & 15-Day Forfeiture',
    locationZh: '租務法庭長廊 (Tenancy Court Corridor)',
    locationEn: 'Tenancy Court Corridor',
    icon: Scale,
    blockId: 'b16',
    statuteRefZh: 'Cap. 7 Part IV & Part IVA',
    statuteRefEn: 'Cap. 7 Part IV & Part IVA',
    spatialSceneZh: '長廊兩側設有對稱鏡子：租客鏡像顯示「2 項權利 + 2 項義務」；業主鏡像顯示「2 項權利 + 1 項義務 (結構及外牆維修)」。鏡面上方標註著【欠租 15 天沒收權】與【劏房 2+2 四年保障期】。',
    spatialSceneEn: 'Symmetrical mirrors line the corridor: Tenant mirror shows "2 Rights + 2 Duties"; Landlord mirror shows "2 Rights + 1 Duty (Structure/Exterior Repairs)". Highlighted above is "15-Day Unpaid Rent Forfeiture" and "Part IVA 2+2 Tenure Protection".',
    mnemonicHookZh: '口訣：【2-2-2 鏡像 🪞 與 15 天】。住宅新租續租必須於 1 個月內提交 Form CR109！',
    mnemonicHookEn: 'Mnemonic: 2-2-2 Mirror 🪞 & 15 Days. Residential new/renewals require Form CR109 within 1 month!',
    examTrapZh: ' Trap: 宣稱「住宅租客欠租 14 天業主即可收樓」——錯誤！法定門檻為 15 天。',
    examTrapEn: ' Trap: "Landlord can forfeit for unpaid rent after 14 days" — FALSE. Threshold is 15 Days.'
  }
];

export default function App() {
  const [isZh, setIsZh] = useState<boolean>(true);
  const [activeStation, setActiveStation] = useState<LociStation>(LOCI_STATIONS[0]);
  const inspectorRef = useRef<HTMLDivElement | null>(null);

  const handleSelectStation = (station: LociStation) => {
    setActiveStation(station);
    if (inspectorRef.current) {
      inspectorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">

        {}
        <div 
          className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500">
                <Compass className="h-3.5 w-3.5" />
                <span>Method of Loci & Spatial Memory Architecture</span>
              </div>
              <button
                onClick={() => setIsZh(!isZh)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-slate-700 bg-slate-800/80 hover:border-amber-400 text-slate-300 hover:text-amber-400 transition"
                title="Toggle Language"
              >
                <Globe className="h-3.5 w-3.5 text-amber-400" />
                <span>{isZh ? 'EN' : '繁體中文'}</span>
              </button>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {isZh ? '互動記憶宮殿路線圖 (Memory Loci Map)' : 'Interactive Memory Palace Loci Map'}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-400 max-w-2xl leading-relaxed">
              {isZh 
                ? '點擊下方宮殿記憶驛站，以空間視覺圖像錨定法規考點，實現零遺忘長效記憶。'
                : 'Click through memory loci stations to anchor complex statutory rules with spatial visual imagery.'}
            </p>
          </div>

          {}
          <div className="flex items-center gap-3 shrink-0 flex-wrap w-full md:w-auto">
            <button
              onClick={() => handleNavigate('/course')}
              className="flex-1 md:flex-initial px-5 py-3 rounded-2xl border border-slate-700 bg-slate-800/60 hover:border-indigo-500 font-bold text-xs transition flex items-center justify-center gap-2 text-slate-200"
            >
              <BookOpen className="h-4 w-4 text-indigo-400" />
              <span>{isZh ? '返回課程大綱' : 'Back to Syllabus'}</span>
            </button>

            <button
              onClick={() => handleNavigate('/case-study')}
              className="flex-1 md:flex-initial px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>{isZh ? 'Part II 個案實務' : 'Part II Case Study'}</span>
            </button>
          </div>
        </div>

        {}
        <div 
          className="p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-amber-500/15 via-slate-900 to-indigo-950/40 hover:border-amber-500/50 transition group"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs">
              <Eye className="h-4 w-4" />
              <span>FEATURED • Spatial Loci Blueprint Engine v2.0</span>
            </div>
            <h3 className="text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition">
              {isZh ? '宮殿建築平面視覺藍圖 (Architectural Loci Floorplan)' : 'Architectural Loci Floorplan Blueprint'}
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              {isZh 
                ? '開啟專屬向量式 2D 建築平面圖，視覺化檢索 6 大空間驛站、流動導覽路線與法規細節。'
                : 'Launch the dedicated 2D architectural vector floorplan to visually inspect all 6 spatial rooms.'}
            </p>
          </div>

          <button
            onClick={() => handleNavigate('/memory-palace/blueprint')}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 transition flex items-center justify-center gap-2 shrink-0 group-hover:scale-105"
          >
            <Map className="h-4 w-4 text-slate-950" />
            <span>{isZh ? '開啟藍圖視察引擎' : 'Launch Blueprint Engine'}</span>
            <ArrowRight className="h-4 w-4 text-slate-950" />
          </button>
        </div>

        {}
        <div 
          className="p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-4 bg-slate-900/60"
        >
          <div className="flex items-center justify-between border-b pb-3 border-slate-800 flex-wrap gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              {isZh ? '宮殿空間驛站導覽 (Palace Spatial Route Map):' : 'Palace Spatial Route Map:'}
            </span>
            <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
              6 Spatial Loci Stations
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {LOCI_STATIONS.map((station) => {
              const IconComp = station.icon;
              const isActive = station.id === activeStation.id;

              return (
                <button
                  key={station.id}
                  onClick={() => handleSelectStation(station)}
                  className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xl font-extrabold scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-amber-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {station.num}
                    </span>
                    <IconComp className={`h-4 w-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold leading-snug line-clamp-2">
                      {isZh ? station.titleZh : station.titleEn}
                    </h4>
                    <span className={`text-[10px] block truncate font-medium ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                      {isZh ? station.locationZh : station.locationEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {}
        <div ref={inspectorRef} className="scroll-mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Panel: Spatial Scene & Mnemonic Anchor (7 Columns) */}
          <div 
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-slate-800 flex-wrap gap-2">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-bold text-amber-400">
                    {activeStation.num} • {isZh ? activeStation.locationZh : activeStation.locationEn}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {isZh ? activeStation.titleZh : activeStation.titleEn}
                  </h2>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                  {isZh ? activeStation.statuteRefZh : activeStation.statuteRefEn}
                </span>
              </div>

              {/* Spatial Scene Description */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>{isZh ? '宮殿空間視覺影像 (Spatial Visual Scene)' : 'Spatial Visual Scene'}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-90 text-slate-200">
                  {isZh ? activeStation.spatialSceneZh : activeStation.spatialSceneEn}
                </p>
              </div>

              {/* Dual Coding Mnemonic Anchor */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                  <Lightbulb className="h-4 w-4" />
                  <span>{isZh ? '記憶錨定口訣 (Mnemonic Anchor)' : 'Mnemonic Anchor'}</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-amber-200 leading-relaxed">
                  {isZh ? activeStation.mnemonicHookZh : activeStation.mnemonicHookEn}
                </p>
              </div>
            </div>

            {/* Station Action Link Group */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              {activeStation.linkedRoute && (
                <button
                  onClick={() => handleNavigate(activeStation.linkedRoute!)}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>{isZh ? activeStation.linkedRouteLabelZh : activeStation.linkedRouteLabelEn}</span>
                </button>
              )}

              <button
                onClick={() => handleNavigate(`/quiz?block=${activeStation.blockId}`)}
                className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{isZh ? '進入單元刷題' : 'Practice Block Quiz'}</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Associated Master Exam Trap (5 Columns) */}
          <div 
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-extrabold text-base border-b border-slate-800 pb-3">
                <AlertTriangle className="h-5 w-5" />
                <span>{isZh ? '關聯主考官陷阱登錄' : 'Associated Master Exam Trap'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-bold leading-relaxed space-y-2">
                <p>{isZh ? activeStation.examTrapZh : activeStation.examTrapEn}</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2 text-xs">
                <span className="font-bold text-indigo-400 uppercase font-mono block">
                  {isZh ? '【 空間記憶複習指南 】' : '[ Spatial Recall Guide ]'}
                </span>
                <p className="opacity-80 leading-relaxed text-slate-300">
                  {isZh 
                    ? '閉上眼睛，在腦海中沿著宮殿路線從 Station 01 走到 Station 06。重現每一個驛站的視覺物件與數字，即可徹底鎖定法規細節。'
                    : 'Close your eyes and mentally walk from Station 01 to Station 06. Revisualize each spatial object to lock in statutory nuances.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono font-bold opacity-60 text-slate-400">
                AgentPass™ Loci Engine
              </span>

              <button
                onClick={() => handleNavigate(`/flashcards?block=${activeStation.blockId}`)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-slate-200 transition flex items-center gap-1.5"
              >
                <Layers className="h-3.5 w-3.5 text-indigo-400" />
                <span>{isZh ? '翻閱對應閃卡' : 'View Flashcards'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}