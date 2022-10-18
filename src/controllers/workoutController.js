import {
  createWorkoutServices,
  deleteWorkoutServices,
  getAllWorkoutServices,
  oneWorkoutServices,
  updateWorkoutServices,
} from '../services/workoutServices.js';

export const getAllWorkouts = (req, res) => {
  const { mode } = req.query;

  try {
    const allWorkouts = getAllWorkoutServices({ mode });
    res.send({ status: 'OK', data: allWorkouts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: `Parameter :workoutId can not be empty` },
    });
  }

  try {
    const workout = oneWorkoutServices(workoutId);
    res.send({ status: 'OK', data: workout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export const createWorkout = (req, res) => {
  const { body } = req;

  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          'One of the following keys is missing or is empty in request body',
      },
    });
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  try {
    const createdWorkout = createWorkoutServices(newWorkout);
    res.status(201).send({ status: 'OK', data: createdWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export const updateWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: `Parameter :workoutId can not be empty` },
    });
  }

  try {
    const updatedWorkout = updateWorkoutServices(workoutId, body);
    res.send({ status: 'OK', data: updatedWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export const deleteWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: `Parameter :workoutId can not be empty` },
    });
  }

  try {
    deleteWorkoutServices(workoutId);
    res.status(204).send({ status: 'OK' });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};
