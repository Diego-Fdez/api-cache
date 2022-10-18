import { Router } from 'express';
import apicache from 'apicache';
import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getOneWorkout,
  updateWorkout,
} from '../../controllers/workoutController.js';
import { getRecordForWorkout } from '../../controllers/recordController.js';

const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */

router
  .get('/workouts', cache('2 minutes'), getAllWorkouts)
  .get('/:workoutId', getOneWorkout)
  .get('/:workoutId/records', getRecordForWorkout)
  .post('/', createWorkout)
  .put('/:workoutId', updateWorkout)
  .delete('/:workoutId', deleteWorkout);

export default router;
