import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Workout } from 'entities/Workout';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/misc/api.response';
import { AddWorkoutDto } from 'src/dtos/workout/add.workout.dto';

@Injectable()
export class WorkoutService extends TypeOrmCrudService<Workout> {
  constructor(
    @InjectRepository(Workout)
    private readonly workout: Repository<Workout>,
  ) {
    super(workout);
  }

  getAll(): Promise<Workout[]> {
    return this.workout.find();
  }

  getById(id: number): Promise<Workout> {
    return this.workout.findOne(id);
  }

  async addWorkout(data: AddWorkoutDto): Promise<Workout | ApiResponse> {
    let newWorkout: Workout = new Workout();
    newWorkout.name = data.name;
    newWorkout.duration = data.duration;
    newWorkout.wod = data.wod;
    newWorkout.videoLink = data.videoLink;

    return new Promise(resolve => {
      this.workout
        .save(newWorkout)
        .then(data => resolve(data))
        .catch(error => {
          resolve(new ApiResponse('error', -3001));
        });
    });
  }
}
