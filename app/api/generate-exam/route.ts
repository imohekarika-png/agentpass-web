import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';

export type ExamDomainBatch = 
  | 'CAP511' 
  | 'CONVEYANCING' 
  | 'TENANCY_BUILDINGS' 
  | 'AGENCY_TORT' 
  | 'POIM_CASE';

interface GenerateExamRequest {
  track?: 'EAQE' | 'SQE';
  domainBatch?: ExamDomainBatch;
  count?: number;
  isZh?: boolean;
  caseScenarioId?: string;
  caseContext?: {
    title: string;
    narrative: string;
    incumbrances: string[];
    owner: string[];
  };
}

const DOMAIN_PROMPTS: Record<ExamDomainBatch, { zh: string; en: string; statutes: string }> = {
  CAP511: {
    zh: '《地產代理條例》(Cap. 511)、持牌人資格 (Fit & Proper 18-5-12)、分行管理與 31 天通知 (s.40)、客戶款項信託規例 (3-2-14-3 規則) 及法定協議表格 (Form 1 至 6)。',
    en: 'Estate Agents Ordinance (Cap. 511), licensing requirements (18-5-12 Fit & Proper), branch control and 31-day notification (s.40), client money trust rules (3-2-14-3 rule), and prescribed forms (Form 1-6).',
    statutes: 'Cap. 511, Cap. 511A (Practice Regs), Estate Agents (Client Money) Rules'
  },
  CONVEYANCING: {
    zh: '《物業轉易及物業條例》(Cap. 219)、《土地註冊條例》(Cap. 128)、產權契約、聯權共有 (Joint Tenancy) 與分權共有 (Tenancy in Common)、註冊摘要優先權、未解除法定押記及查冊審查。',
    en: 'Conveyancing and Property Ordinance (Cap. 219), Land Registration Ordinance (Cap. 128), deeds, Joint Tenancy vs Tenancy in Common, registration priority of memorials, undischarged legal charges, and title requisitions.',
    statutes: 'Cap. 219, Cap. 128, Cap. 10 (Probate)'
  },
  TENANCY_BUILDINGS: {
    zh: '《業主與租客（綜合）條例》(Cap. 7) 住宅租賃法定隱含條件、拖欠租金 15 天收樓沒收權、Form CR109 申報、Part IVA 劏房 2+2 四年租住權保障，以及《建築物條例》(Cap. 123) 第 24 條清拆命令與僭建物 (UBW) 責任。',
    en: 'Landlord and Tenant (Consolidation) Ordinance (Cap. 7), statutory implied conditions, 15-day rent arrears forfeiture, Form CR109 notice, Part IVA subdivided unit 2+2 security of tenure, and Buildings Ordinance (Cap. 123) s.24 removal orders & UBW encumbrances.',
    statutes: 'Cap. 7 Part IV & Part IVA, Cap. 123 s.24 & s.26'
  },
  AGENCY_TORT: {
    zh: '普通法代理關係 (Law of Agency)、受信責任 (Fiduciary Duty)、雙重代理秘密佣金禁止、失實陳述條例 (Cap. 284)、合約法要約與承諾、個人資料（私隱）條例 (Cap. 486) 及防止賄賂條例 (Cap. 201) 第 9 條。',
    en: 'Common law agency, fiduciary duties, prohibition of secret profits and undisclosed dual agency, Misrepresentation Ordinance (Cap. 284), contract formation, Personal Data (Privacy) Ordinance (Cap. 486), and Prevention of Bribery Ordinance (Cap. 201) s.9.',
    statutes: 'Cap. 284, Cap. 486, Cap. 201 s.9, Common Law Agency'
  },
  POIM_CASE: {
    zh: 'Part II 土地查冊 (POIM) 實務個案分析：物業資料 (P)、業主資料 (O)、產權負擔 (I) 與註冊摘要 (M)。測試遺囑認證執行人權限、有限公司賣方雙重查冊 (浮動押記)、授權書 (Power of Attorney) 時效與買賣訂金由律師託管 (Stakeholder) 職責。',
    en: 'Part II Land Search (POIM) practical case analysis: Property (P), Owner (O), Incumbrances (I), and Memorials (M). Testing probate executor authority, corporate vendor dual-search (floating charge debentures), Power of Attorney validity, and stakeholder escrow deposit requirements.',
    statutes: 'Land Registration (Cap. 128), Powers of Attorney (Cap. 31), Companies (Cap. 622)'
  }
};

export async function POST(req: NextRequest) {
  try {
    const body: GenerateExamRequest = await req.json();
    const { 
      track = 'EAQE', 
      domainBatch = 'CAP511', 
      count = 4, 
      isZh = true, 
      caseScenarioId = 'case-1', 
      caseContext 
    } = body;

    // Strict batch clamp between 1 and 5 questions to guarantee sub-3s response and eliminate timeout
    const clampedCount = Math.min(Math.max(1, count), 5);

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { 
          error: 'Missing OpenRouter API Key. Please configure OPENROUTER_API_KEY in your environment.' 
        }, 
        { status: 503 }
      );
    }

    const domainInfo = DOMAIN_PROMPTS[domainBatch] || DOMAIN_PROMPTS.CAP511;

    let scenarioSupplement = '';
    if (domainBatch === 'POIM_CASE' && caseContext) {
      scenarioSupplement = `
ANCHORED CASE SCENARIO CONTEXT:
Title: ${caseContext.title}
Facts: ${caseContext.narrative}
Owner Register: ${caseContext.owner.join(' | ')}
Incumbrances Register: ${caseContext.incumbrances.join(' | ')}
The questions MUST specifically interrogate this Land Search extract, requiring the student to identify legal issues in the registered documents.
`;
    }

    const systemPrompt = `You are a Principal Examiner drafting authentic examination papers for the Hong Kong Estate Agents Authority (EAA) for the ${track} Qualifying Licensing Examination.
Target Specification:
- Examination: HK EAA ${track} (${track === 'EAQE' ? 'Estate Agent' : 'Salesperson'})
- Domain Batch: ${domainBatch}
- Legal Focus: ${domainInfo.statutes}
- Content: ${isZh ? domainInfo.zh : domainInfo.en}
${scenarioSupplement}

Strict JSON output rules:
1. Output valid JSON ONLY. No markdown ticks, no preamble.
2. Generate exactly ${clampedCount} multiple-choice questions.
3. Every question must have exactly 4 plausible options (A, B, C, D).
4. Include precise statutory explanations citing specific sections of Hong Kong Ordinances (e.g., Cap. 511 s.40, Cap. 7 s.117, Cap. 123 s.24).

JSON Schema:
{
  "questions": [
    {
      "part": "${domainBatch === 'POIM_CASE' ? 'II' : 'I'}",
      "caseScenarioId": "${domainBatch === 'POIM_CASE' ? caseScenarioId : ''}",
      "topicZh": "Brief topic name in Traditional Chinese",
      "topicEn": "Brief topic name in English",
      "questionZh": "Question stem in formal Hong Kong legal Chinese",
      "questionEn": "Question stem in formal Hong Kong legal English",
      "optionsZh": ["A. 選項一", "B. 選項二", "C. 選項三", "D. 選項四"],
      "optionsEn": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
      "answerIndex": 0,
      "explanationZh": "Comprehensive statutory analysis explaining why the answer is correct and why other options fail.",
      "explanationEn": "Comprehensive statutory analysis explaining why the answer is correct and why other options fail.",
      "statuteRefZh": "e.g. 《地產代理條例》Cap. 511 第 40 條",
      "statuteRefEn": "e.g. Estate Agents Ordinance Cap. 511 s.40"
    }
  ]
}`;

    const userPrompt = `Draft ${clampedCount} challenging, authentic ${track} ${domainBatch === 'POIM_CASE' ? 'Part II Land Search practical case questions' : 'Part I statutory law examination questions'}. Focus on real exam traps and precise numbers/deadlines.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://agentpass.hk',
        'X-Title': 'AgentPass EAA Prep Platform',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.25, // Low temperature for high factual accuracy in Hong Kong law
        max_tokens: 2200,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenRouter Gateway Error:', response.status, errText);
      return NextResponse.json(
        { error: `OpenRouter Gateway Error (${response.status}): ${errText.slice(0, 120)}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '{}';

    let parsed;
    try {
      parsed = JSON.parse(rawContent.trim());
    } catch {
      const cleanJson = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleanJson);
    }

    return NextResponse.json({
      success: true,
      batchType: domainBatch,
      track,
      questions: parsed.questions || []
    });

  } catch (err: any) {
    console.error('Multi-Batch Exam Synthesis Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error during batch synthesis' },
      { status: 500 }
    );
  }
}