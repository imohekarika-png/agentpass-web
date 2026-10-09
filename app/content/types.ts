// app/content/types.ts

export interface QuizData {
  questionZh: string;
  questionEn: string;
  optionsZh: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationZh: string;
  explanationEn: string;
}

export interface MemoryHookData {
  title: string;
  imageConcept?: string;
  desc: string;
}

export interface FullLesson {
  id: string;
  moduleId: string;
  moduleZh: string;
  moduleEn: string;
  titleZh: string;
  titleEn: string;
  capRef: string;
  
  // Section 1: Memory Mnemonic / Dual Coding
  memoryHookZh: MemoryHookData;
  memoryHookEn: MemoryHookData;
  
  // Section 2: Case Scenario / Practical Hook
  scenarioZh: string;
  scenarioEn: string;
  
  // Section 3: Verified Syllabus Notes (Supports both property names)
  verifiedNotesZh?: string[];
  verifiedNotesEn?: string[];
  keyTakeawaysZh?: string[];
  keyTakeawaysEn?: string[];
  
  // Section 4: Deep Legal & Statutory Commentary
  detailedLawNotesZh: string[];
  detailedLawNotesEn: string[];
  
  // Section 5: Master Exam Traps (⚠)
  trapsZh?: string[];
  trapsEn?: string[];
  
  // Section 6: Active Retrieval Questions
  retrievalQuestionsZh?: string[];
  retrievalQuestionsEn?: string[];
  
  // Section 7: Sample Exam Multiple-Choice Question
  quiz?: QuizData;
}