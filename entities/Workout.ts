import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('workout', { schema: 'fitness' })
export class Workout {
  @PrimaryGeneratedColumn({ type: 'int', name: 'workout_id', unsigned: true })
  workoutId: number;

  @Column('varchar', { name: 'name', length: 64, default: () => "'0'" })
  name: string;

  @Column('int', { name: 'duration', default: () => "'0'" })
  duration: number;

  @Column('varchar', { name: 'wod', default: () => "'0'" })
  wod: string;

  @Column('varchar', { name: 'video_link', length: 128, default: () => "'0'" })
  videoLink: string;
}
