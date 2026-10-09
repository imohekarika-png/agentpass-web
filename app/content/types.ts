// app/content/types.ts
export interface FullLesson {
  id: string;
  moduleId: string;
  moduleZh: string;
  moduleEn: string;
  titleZh: string;
  titleEn: string;
  capRef: string;
  
  // Section 1: Memory Mnemonic (imageConcept is optional)
  memoryHookZh: { title: string; imageConcept?: string; desc: string };
  memoryHookEn: { title: string; imageConcept?: string; desc: string };
  
  // Section 2: Case Scenario
  scenarioZh: string;
  scenarioEn: string;
  
  // Section 3: Verified Notes
  verifiedNotesZh: string[];
  verifiedNotesEn: string[];
  
  // Section 4: Law Commentary
  detailedLawNotesZh: string[];
  detailedLawNotesEn: string[];
  
  // Section 5: Traps
  trapsZh: string[];
  trapsEn: string[];
  
  // Section 6: Retrieval
  retrievalQuestionsZh: string[];
  retrievalQuestionsEn: string[];
  
  // Section 7: Quiz
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