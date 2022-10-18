import { getRecordWorkoutService } from '../services/recordServices.js';

export const getRecordForWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: 'Parameter :workoutId is required' },
    });
    return;
  }

  try {
    const record = getRecordWorkoutService(workoutId);
    res.send({ status: 'OK', data: record });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};
