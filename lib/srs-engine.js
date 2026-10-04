/**
 * SuperMemo-2 (SM-2) Spaced Repetition Algorithm
 * 
 * @param {number} quality - User's score from 0 to 5 (0 = blackout, 5 = perfect memory)
 * @param {number} interval - Current interval in days before the next review
 * @param {number} repetitions - Number of consecutive successful reviews
 * @param {number} easeFactor - The easiness factor (defaults to 2.5)
 * @returns {object} - The new interval, repetitions, and easeFactor
 */
export function calculateNextReview(quality, interval = 0, repetitions = 0, easeFactor = 2.5) {
  let nextInterval;
  let nextRepetitions;
  let nextEaseFactor;

  // If the user scored less than 3, they forgot it. Reset their streak.
  if (quality < 3) {
    nextRepetitions = 0;
    nextInterval = 1; // Show it to them again tomorrow
  } else {
    // They remembered it! Increase their streak.
    nextRepetitions = repetitions + 1;

    // Calculate the next interval based on the streak
    if (nextRepetitions === 1) {
      nextInterval = 1; // 1 day
    } else if (nextRepetitions === 2) {
      nextInterval = 6; // 6 days
    } else {
      // Multiply the previous interval by the ease factor
      nextInterval = Math.round(interval * easeFactor);
    }
  }

  // Calculate the new Ease Factor based on how hard it was
  // Formula: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  nextEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  
  // The Ease Factor should never drop below 1.3 (so intervals don't get stuck)
  if (nextEaseFactor < 1.3) {
    nextEaseFactor = 1.3;
  }

  // Calculate the exact date for the next review
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);

  return {
    interval: nextInterval,
    repetitions: nextRepetitions,
    easeFactor: Number(nextEaseFactor.toFixed(2)),
    nextReviewDate: nextReviewDate.toISOString(),
  };
}