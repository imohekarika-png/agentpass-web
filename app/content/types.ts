// app/content/types.ts
export interface FullLesson {
  id: string;
  moduleId: string;
  moduleZh: string;
  moduleEn: string;
  titleZh: string;
  titleEn: string;
  capRef: string;
  
  // Section 1: Memory Mnemonic
  memoryHookZh: { title: string; imageConcept: string; desc: string };
  memoryHookEn: { title: string; imageConcept: string; desc: string };
  
  // Section 2: Case Scenario / Practical Hook
  scenarioZh: string;
  scenarioEn: string;
  
  // Section 3: Verified Syllabus Notes (✓)
  verifiedNotesZh: string[];
  verifiedNotesEn: string[];
  
  // Section 4: Deep Legal & Statutory Commentary (The missing detail!)
  detailedLawNotesZh: string[];
  detailedLawNotesEn: string[];
  
  // Section 5: Master Exam Traps (⚠)
  trapsZh: string[];
  trapsEn: string[];
  
  // Section 6: Active Retrieval Questions (Self-Test)
  retrievalQuestionsZh: string[];
  retrievalQuestionsEn: string[];
  
  // Section 7: Sample Exam Multiple-Choice Question
  quiz: {
    questionZh: string;
    questionEn: string;
    optionsZh: string[];
    optionsEn: string[];
    correctIndex: number;
    explanationZh: string;
    explanationEn: string;
  };
}