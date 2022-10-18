import db from './db.json' assert { type: 'json' };

export const getRecordForWorkoutDB = (workoutId) => {
  try {
    const record = db.workouts.filter((record) => record.workout === workoutId);

    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with id ${workoutId}`,
      };
    }

    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};
