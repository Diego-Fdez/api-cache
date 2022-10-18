import {
  getAllWorkoutsDB,
  createNewWorkoutDB,
  getOneWorkoutDB,
  updateWorkoutDB,
  deleteWorkoutDB,
} from '../database/Workout.js';
import { v4 as uuid } from 'uuid';

export const createWorkoutServices = (newWorkout) => {
  try {
    const workoutToInsert = {
      ...newWorkout,
      id: uuid(),
      createdAt: new Date().toLocaleString('en-US', { timezone: 'UTC' }),
      updatedAt: new Date().toLocaleString('en-US', { timezone: 'UTC' }),
    };

    const createdWorkout = createNewWorkoutDB(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkoutServices = (workoutId) => {
  try {
    deleteWorkoutDB(workoutId);
  } catch (error) {
    throw error;
  }
};

export const getAllWorkoutServices = (filterParams) => {
  try {
    const allWorkouts = getAllWorkoutsDB(filterParams);
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

export const oneWorkoutServices = (workoutId) => {
  try {
    const workout = getOneWorkoutDB(workoutId);
    return workout;
  } catch (error) {
    throw error;
  }
};

export const updateWorkoutServices = (workoutId, changes) => {
  try {
    const updatedWorkout = updateWorkoutDB(workoutId, changes);
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};
