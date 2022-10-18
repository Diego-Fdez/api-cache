import db from './db.json' assert { type: 'json' };
import { saveToDatabase } from './utils.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Tommy V
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */

export const getAllWorkoutsDB = (filterParams) => {
  try {
    let workouts = db.workouts;

    /* Filtering the workouts by mode. */
    if (filterParams.mode) {
      return workouts.filter((workout) =>
        workout.mode.toLowerCase().includes(filterParams.mode)
      );
    }

    return db.workouts;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

export const createNewWorkoutDB = (newWorkout) => {
  const isAlreadyAdded = db.workouts.findIndex(
    ((workout) => workout.name === newWorkout.name) > -1
  );

  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the same name ${newWorkout.name} already exists`,
    };
  }

  try {
    db.workouts.push(newWorkout);
    saveToDatabase(db);
    return newWorkout;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

export const getOneWorkoutDB = (workoutId) => {
  try {
    const workout = db.workouts.find((workout) => workout.id === workoutId);

    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    return workout;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

export const updateWorkoutDB = (workoutId, changes) => {
  try {
    const isAlreadyAdded =
      db.workouts.findIndex((workout) => workout.name === changes.name) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${changes.name}' already exists`,
      };
    }

    const indexForUpdated = db.workouts.findIndex(
      (workout) => workout.id === workoutId
    );

    if (indexForUpdated === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    const updatesWorkout = {
      ...db.workouts[indexForUpdated],
      ...changes,
      updatedAt: new Date().toLocaleString('en-US', {
        timeZone: 'UTC',
      }),
    };

    db.workouts[indexForUpdated] = updatesWorkout;
    saveToDatabase(db);
    return updatesWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

export const deleteWorkoutDB = (workoutId) => {
  try {
    const indexForDelete = db.workouts.findIndex(
      (workout) => workout.id === workoutId
    );

    if (indexForDelete === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    db.workouts.splice(indexForDelete, 1);
    saveToDatabase(db);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};
