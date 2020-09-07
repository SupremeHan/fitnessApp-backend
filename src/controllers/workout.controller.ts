import { Controller, Get, Put, Body } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Workout } from 'entities/Workout';
import { WorkoutService } from 'src/services/workout.service';
import { AddWorkoutDto } from 'src/dtos/workout/add.workout.dto';

@Controller('api/workout')
@Crud({
  model: {
    type: Workout,
  },
  params: {
    id: {
      field: 'workoutId',
      type: 'number',
      primary: true,
    },
  },
})
export class WorkoutController {
  constructor(public service: WorkoutService) {}

  @Get()
  getAll(): Promise<Workout[]> {
    return this.service.getAll();
  }

  @Put('addWorkout')
  addWorkout(@Body() data: AddWorkoutDto) {
    return this.service.addWorkout(data);
  }
}
