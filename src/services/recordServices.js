import { getRecordForWorkoutDB } from '../database/Record.js';

export const getRecordWorkoutService = (workoutId) => {
  try {
    const record = getRecordForWorkoutDB(workoutId);
    return record;
  } catch (error) {
    throw error;
  }
};
