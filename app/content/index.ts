// app/content/index.ts
import { FullLesson } from './types';
import { MODULE_1_LESSONS } from './modules/module1';
import { MODULE_2_LESSONS } from './modules/module2';
import { MODULE_3_LESSONS } from './modules/module3';
import { MODULE_4_LESSONS } from './modules/module4';

export const LESSON_REGISTRY: Record<string, FullLesson> = {
  ...MODULE_1_LESSONS,
  ...MODULE_2_LESSONS,
  ...MODULE_3_LESSONS,
  ...MODULE_4_LESSONS,
};