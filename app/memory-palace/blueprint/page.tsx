'use client';

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
  ArrowLeft, 
  ChevronDown, 
  Globe, 
  Zap 
} from 'lucide-react';

interface LociStation {
  id: string;
  num: string;
  code: string;
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
  room: {
    x: number;
    y: number;
    w: number;
    h: number;
    label: string;
    nodeX: number;
    nodeY: number;
  };
}

const LOCI_STATIONS: LociStation[] = [
  {
    id: 'loci-1',
    num: 'Station 01',
    code: 'ROOM-01',
    titleZh: 'EAA 拱門與持牌四大柱石',
    titleEn: 'EAA Archway & 4 Licensing Pillars',
    locationZh: '宮殿大門入口 (Entrance Gate)',
    locationEn: 'Palace Main Entrance Gate',
    icon: Building2,
    blockId: 'b1',
    statuteRefZh: 'Cap. 511 s.15 & s.19',
    statuteRefEn: 'Cap. 511 s.15 & s.19',
    spatialSceneZh: '想像宮殿入口有四根巨型大理石柱：柱子頂部雕刻著「18 歲🎂」、「中五畢業證書📜」、「12 個月考試合格沙漏⏳」與「Fit & Proper 盾牌🛡️」。',
    spatialSceneEn: 'Visualize four giant marble pillars at the entrance arch: carved with "Age 18🎂", "Form 5 Certificate📜", "12-Month Exam Validity Hourglass⏳", and "Fit & Proper Shield🛡️".',
    mnemonicHookZh: '口訣：【18 - 5 - 12 - F&P】。工作經驗 (Work Experience) 完全不屬於柱石之一！',
    mnemonicHookEn: 'Mnemonic: 18 - 5 - 12 - F&P. Work Experience is completely absent from the pillars!',
    examTrapZh: ' Trap: 考官常宣稱「具備 3 年行業經驗可獲評為 Fit & Proper」——錯誤！EAA 評估不考慮工作經驗。',
    examTrapEn: ' Trap: "3 years experience counts for Fit & Proper assessment" — FALSE. EAA ignores work experience.',
    room: { x: 45, y: 55, w: 240, h: 180, label: '01. ENTRANCE ARCHWAY', nodeX: 165, nodeY: 145 }
  },
  {
    id: 'loci-2',
    num: 'Station 02',
    code: 'ROOM-02',
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
    examTrapEn: ' Trap: "Branch opening only requires reporting the address without a licensed agent manager" — FALSE.',
    room: { x: 330, y: 55, w: 240, h: 180, label: '02. RECEPTION LOBBY', nodeX: 450, nodeY: 145 }
  },
  {
    id: 'loci-3',
    num: 'Station 03',
    code: 'ROOM-03',
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
    examTrapEn: ' Trap: "Agent can directly deposit client money into vendor solicitor account" — FALSE unless prior written instruction exists.',
    room: { x: 615, y: 55, w: 240, h: 180, label: '03. TRUST VAULT', nodeX: 735, nodeY: 145 }
  },
  {
    id: 'loci-4',
    num: 'Station 04',
    code: 'ROOM-04',
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
    examTrapEn: ' Trap: "Leasing commercial office requires Form 5" — FALSE. Prescribed forms apply only to residential properties.',
    room: { x: 45, y: 310, w: 240, h: 180, label: '04. LEGAL FILING ARCHIVE', nodeX: 165, nodeY: 400 }
  },
  {
    id: 'loci-5',
    num: 'Station 05',
    code: 'ROOM-05',
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
    linkedRouteLabelEn: 'Launch Part II Case Study & POIM Viewer',
    room: { x: 330, y: 310, w: 240, h: 180, label: '05. LAND REGISTRY GALLERY', nodeX: 450, nodeY: 400 }
  },
  {
    id: 'loci-6',
    num: 'Station 06',
    code: 'ROOM-06',
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
    examTrapEn: ' Trap: "Landlord can forfeit for unpaid rent after 14 days" — FALSE. Threshold is 15 Days.',
    room: { x: 615, y: 310, w: 240, h: 180, label: '06. TENANCY COURT CORRIDOR', nodeX: 735, nodeY: 400 }
  }
];

export default function App() {
  const [isZh, setIsZh] = useState<boolean>(true);
  const [activeStation, setActiveStation] = useState<LociStation>(LOCI_STATIONS[0]);
  const [hoveredStation, setHoveredStation] = useState<LociStation | null>(null);
  const inspectorRef = useRef<HTMLDivElement | null>(null);

  const handleSelectStation = (station: LociStation, triggerScroll = true) => {
    setActiveStation(station);
    if (triggerScroll && inspectorRef.current) {
      inspectorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1 text-xs font-black text-amber-900 dark:text-amber-300 shadow-sm">
                <Compass className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                <span>Spatial Loci Vector Blueprint Engine v2.0</span>
              </div>
              <button
                type="button"
                onClick={() => setIsZh(!isZh)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:border-amber-600 transition cursor-pointer shadow-sm"
                title="Toggle Language"
              >
                <Globe className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
                <span>{isZh ? 'EN' : '繁體中文'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white flex items-center gap-3">
              <span>{isZh ? '宮殿建築平面視覺藍圖' : 'Architectural Vector Blueprint Engine'}</span>
              <span className="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-700 text-indigo-950 dark:text-indigo-300 hidden sm:inline-block">
                VECTOR CAD 1:100
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
              {isZh 
                ? '點擊下方向量式建築藍圖中的 6 大房間驛站與節點，即時呼叫空間視覺影像、記憶錨定口訣與主考官陷阱登錄。'
                : 'Click room nodes inside the interactive CAD blueprint to visually inspect spatial memory anchors, mnemonic formulas, and statutory traps.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap w-full md:w-auto">
            <a
              href="/memory-palace"
              className="flex-1 md:flex-initial px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-600 font-extrabold text-xs text-slate-900 dark:text-slate-100 shadow-sm transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              <span>{isZh ? '返回宮殿路線' : 'Back to Loci Map'}</span>
            </a>

            <a
              href="/course"
              className="flex-1 md:flex-initial px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-600 font-extrabold text-xs text-slate-900 dark:text-slate-100 shadow-sm transition flex items-center justify-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-indigo-700 dark:text-indigo-400" />
              <span>{isZh ? '課程大綱' : 'Syllabus'}</span>
            </a>

            <a
              href="/case-study"
              className="flex-1 md:flex-initial px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4 text-slate-950" />
              <span>{isZh ? 'Part II 個案實務' : 'Case Study'}</span>
            </a>
          </div>
        </div>

        {/* Blueprint Visual Canvas Box */}
        <div className="p-4 sm:p-7 rounded-3xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-4 relative overflow-hidden transition">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3.5 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-mono font-black text-amber-900 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                <span>{isZh ? '宮殿建築向量平面視圖 (Interactive SVG Blueprint)' : 'Interactive SVG Vector Blueprint'}</span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-700 dark:text-slate-300">
              <span className="hidden sm:inline-block font-bold">SCALE 1:100 • 6 LOCI NODES</span>
              <span className="px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-300 font-black">
                {isZh ? `當前選中: ${activeStation.num}` : `Active: ${activeStation.num}`}
              </span>
            </div>
          </div>

          {/* SVG Vector Container */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[580px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
            <div 
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage: 'radial-gradient(circle, #818cf8 1px, transparent 1px), linear-gradient(to right, rgba(99,102,241,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.12) 1px, transparent 1px)',
                backgroundSize: '24px 24px, 48px 48px, 48px 48px'
              }}
            />

            <svg viewBox="0 0 900 550" className="w-full h-full select-none">
              {/* Outer Boundary Wall */}
              <rect x="25" y="25" width="850" height="500" rx="24" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="12 6" />
              <rect x="30" y="30" width="840" height="490" rx="20" fill="none" stroke="#475569" strokeWidth="1.5" />

              {/* Connecting Pathway Line */}
              <path 
                d="M 165 145 L 450 145 L 735 145 L 735 400 L 450 400 L 165 400" 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="4" 
                strokeDasharray="8 8" 
                strokeLinecap="round"
                className="opacity-90 animate-pulse" 
              />

              {/* Intermediate Pathway Dots */}
              <circle cx="307" cy="145" r="5" fill="#f59e0b" />
              <circle cx="592" cy="145" r="5" fill="#f59e0b" />
              <circle cx="735" cy="272" r="5" fill="#f59e0b" />
              <circle cx="592" cy="400" r="5" fill="#f59e0b" />
              <circle cx="307" cy="400" r="5" fill="#f59e0b" />

              {/* Render Room Polygons with high-contrast text */}
              {LOCI_STATIONS.map((station) => {
                const isActive = station.id === activeStation.id;
                const isHovered = hoveredStation?.id === station.id;

                return (
                  <g 
                    key={station.id}
                    onClick={() => handleSelectStation(station, true)}
                    onMouseEnter={() => setHoveredStation(station)}
                    onMouseLeave={() => setHoveredStation(null)}
                    className="cursor-pointer transition-all duration-300"
                  >
                    {/* Room Background */}
                    <rect 
                      x={station.room.x} 
                      y={station.room.y} 
                      width={station.room.w} 
                      height={station.room.h} 
                      rx="18" 
                      fill={isActive ? 'rgba(245, 158, 11, 0.28)' : isHovered ? 'rgba(99, 102, 241, 0.28)' : 'rgba(15, 23, 42, 0.95)'} 
                      stroke={isActive ? '#f59e0b' : isHovered ? '#a5b4fc' : '#64748b'} 
                      strokeWidth={isActive ? '4' : isHovered ? '3' : '2'} 
                      className="transition-colors duration-200"
                    />

                    {/* Room Code Badge */}
                    <rect 
                      x={station.room.x + 10} 
                      y={station.room.y + 10} 
                      width="110" 
                      height="24" 
                      rx="6" 
                      fill={isActive ? '#f59e0b' : '#1e293b'} 
                      stroke={isActive ? '#d97706' : '#475569'}
                      strokeWidth="1.5"
                      className="transition-colors duration-200"
                    />
                    <text 
                      x={station.room.x + 65} 
                      y={station.room.y + 26} 
                      textAnchor="middle" 
                      fill={isActive ? '#0f172a' : '#f8fafc'} 
                      fontSize="11" 
                      fontFamily="monospace" 
                      fontWeight="900"
                    >
                      {station.code}
                    </text>

                    {/* Room Name - High Contrast White & Gold Text */}
                    <text 
                      x={station.room.x + station.room.w / 2} 
                      y={station.room.y + 60} 
                      textAnchor="middle" 
                      fill={isActive ? '#fde047' : '#ffffff'} 
                      fontSize="13.5" 
                      fontWeight="900"
                    >
                      {isZh ? station.titleZh : station.titleEn}
                    </text>

                    <text 
                      x={station.room.x + station.room.w / 2} 
                      y={station.room.y + 80} 
                      textAnchor="middle" 
                      fill={isActive ? '#fef08a' : '#cbd5e1'} 
                      fontSize="11" 
                      fontWeight="700"
                    >
                      {isZh ? station.locationZh.split(' ')[0] : station.locationEn}
                    </text>

                    {/* Pulse Glow for active node */}
                    {isActive && (
                      <circle 
                        cx={station.room.nodeX} 
                        cy={station.room.nodeY} 
                        r="34" 
                        fill="#f59e0b" 
                        opacity="0.35" 
                        className="animate-ping" 
                      />
                    )}

                    {/* Center Node Circle */}
                    <circle 
                      cx={station.room.nodeX} 
                      cy={station.room.nodeY} 
                      r="22" 
                      fill={isActive ? '#f59e0b' : '#0f172a'} 
                      stroke={isActive ? '#fef08a' : isHovered ? '#818cf8' : '#94a3b8'} 
                      strokeWidth="3" 
                      className="transition-all duration-200"
                    />

                    {/* Node Digit */}
                    <text 
                      x={station.room.nodeX} 
                      y={station.room.nodeY + 5} 
                      textAnchor="middle" 
                      fill={isActive ? '#0f172a' : '#fbbf24'} 
                      fontSize="13" 
                      fontWeight="900" 
                      fontFamily="monospace"
                    >
                      {station.num.replace('Station 0', '')}
                    </text>

                    {/* Statute Badge */}
                    <rect 
                      x={station.room.x + 18} 
                      y={station.room.y + station.room.h - 32} 
                      width={station.room.w - 36} 
                      height="22" 
                      rx="6" 
                      fill="#020617" 
                      stroke="#64748b" 
                      strokeWidth="1.5"
                    />
                    <text 
                      x={station.room.x + station.room.w / 2} 
                      y={station.room.y + station.room.h - 17} 
                      textAnchor="middle" 
                      fill="#f8fafc" 
                      fontSize="10" 
                      fontFamily="monospace"
                      fontWeight="800"
                    >
                      {station.statuteRefZh}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Float Card preview on active node */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black shrink-0 shadow-sm">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-amber-900 dark:text-amber-300 font-black truncate">
                    {activeStation.num} • {isZh ? activeStation.locationZh : activeStation.locationEn}
                  </div>
                  <div className="font-black text-slate-950 dark:text-white truncate">
                    {isZh ? activeStation.titleZh : activeStation.titleEn}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectStation(activeStation, true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0 transition flex items-center gap-1 cursor-pointer shadow-md"
              >
                <span>{isZh ? '檢視詳情' : 'Inspect'}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-700 dark:text-slate-300 pt-1">
            <span className="font-bold">
              <Zap className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 inline mr-1" />
              <span>{isZh ? '導覽順序: 01 拱門 → 02 郵筒 → 03 金庫 → 04 翹翹板 → 05 POIM → 06 鏡像' : 'Flow: 01 Arch → 02 Mailbox → 03 Vault → 04 Seesaw → 05 POIM → 06 Mirror'}</span>
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-black hidden sm:inline-block">
              {isZh ? '✓ 100% 空間錨定相容' : '✓ 100% Spatial Loci Aligned'}
            </span>
          </div>
        </div>

        {/* Spatial Node Switcher */}
        <div className="p-6 rounded-3xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-4 transition">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider block">
              {isZh ? '空間驛站快速切換 (Spatial Node Switcher):' : 'Spatial Node Switcher:'}
            </span>
            <span className="text-xs font-mono text-amber-900 dark:text-amber-300 font-black px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700">
              6 Spatial Loci Nodes
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {LOCI_STATIONS.map((station) => {
              const IconComp = station.icon;
              const isActive = station.id === activeStation.id;

              return (
                <button
                  type="button"
                  key={station.id}
                  onClick={() => handleSelectStation(station, true)}
                  className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between gap-2.5 cursor-pointer relative overflow-hidden group shadow-sm ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.02] ring-2 ring-amber-400'
                      : 'bg-slate-50 dark:bg-slate-800/90 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-amber-600 hover:bg-amber-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-md ${
                      isActive 
                        ? 'bg-slate-950 text-amber-300' 
                        : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                    }`}>
                      {station.num}
                    </span>
                    <IconComp className={`h-4 w-4 ${isActive ? 'text-slate-950' : 'text-amber-700 dark:text-amber-400'}`} />
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black leading-snug line-clamp-2 text-slate-950 dark:text-white">
                      {isZh ? station.titleZh : station.titleEn}
                    </h4>
                    <span className={`text-[10px] block truncate font-bold ${isActive ? 'text-slate-950' : 'text-slate-700 dark:text-slate-300'}`}>
                      {isZh ? station.locationZh : station.locationEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Loci Inspector Detail Panel */}
        <div ref={inspectorRef} className="scroll-mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Panel: Spatial Scene & Mnemonic Anchor */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6 flex flex-col justify-between transition">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 flex-wrap gap-2">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-xs font-mono font-black text-amber-900 dark:text-amber-300">
                      {activeStation.num} • {isZh ? activeStation.locationZh : activeStation.locationEn}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white pt-1">
                    {isZh ? activeStation.titleZh : activeStation.titleEn}
                  </h2>
                </div>

                <span className="text-xs font-mono font-black px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                  {isZh ? activeStation.statuteRefZh : activeStation.statuteRefEn}
                </span>
              </div>

              {/* Spatial Scene Description */}
              <div className="p-5 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>{isZh ? '宮殿空間視覺影像 (Spatial Visual Scene)' : 'Spatial Visual Scene'}</span>
                </div>
                <p className="text-xs sm:text-sm font-bold leading-relaxed text-slate-100">
                  {isZh ? activeStation.spatialSceneZh : activeStation.spatialSceneEn}
                </p>
              </div>

              {/* Dual Coding Mnemonic Anchor */}
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-600/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-black text-sm">
                  <Lightbulb className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                  <span>{isZh ? '記憶錨定口訣 (Mnemonic Anchor)' : 'Mnemonic Anchor'}</span>
                </div>
                <p className="text-xs sm:text-sm font-black text-slate-950 dark:text-amber-100 leading-relaxed">
                  {isZh ? activeStation.mnemonicHookZh : activeStation.mnemonicHookEn}
                </p>
              </div>

            </div>

            {/* Station Action Link Group */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              {activeStation.linkedRoute && (
                <a
                  href={activeStation.linkedRoute}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="h-4 w-4 text-slate-950" />
                  <span>{isZh ? activeStation.linkedRouteLabelZh : activeStation.linkedRouteLabelEn}</span>
                </a>
              )}

              <a
                href={`/quiz?block=${activeStation.blockId}`}
                className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md shadow-indigo-600/20 transition flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{isZh ? '進入單元刷題' : 'Practice Block Quiz'}</span>
              </a>
            </div>
          </div>

          {/* Right Panel: Associated Master Exam Trap */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6 flex flex-col justify-between transition">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-black text-base border-b border-slate-200 dark:border-slate-800 pb-3">
                <AlertTriangle className="h-5 w-5" />
                <span>{isZh ? '關聯主考官陷阱登錄' : 'Associated Master Exam Trap'}</span>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-200 text-xs sm:text-sm font-black leading-relaxed space-y-2">
                <p>{isZh ? activeStation.examTrapZh : activeStation.examTrapEn}</p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800 space-y-2 text-xs">
                <span className="font-black text-indigo-950 dark:text-indigo-300 uppercase font-mono block">
                  {isZh ? '【 向量空間複習心法 】' : '[ Vector Spatial Recall Method ]'}
                </span>
                <p className="text-slate-900 dark:text-slate-200 font-bold leading-relaxed">
                  {isZh 
                    ? '閉上眼睛，在腦海中俯瞰整座 1:100 宮殿平面圖：從 01 拱門走入 02 郵筒大堂，進入 03 金庫，下轉 04 翹翹板，再到 05 POIM 展廳與 06 租務長廊。空間定位即是法規答案。'
                    : 'Close your eyes and mentally view the 1:100 palace floorplan from above: follow the golden vector line across all 6 rooms to lock in statutory rules.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                Spatial Loci Engine v2.0
              </span>

              <a
                href={`/flashcards?block=${activeStation.blockId}`}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-black text-xs text-slate-900 dark:text-slate-100 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Layers className="h-3.5 w-3.5 text-indigo-700 dark:text-indigo-400" />
                <span>{isZh ? '翻閱對應閃卡' : 'View Flashcards'}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}