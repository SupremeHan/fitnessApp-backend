import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('stats', { schema: 'fitness' })
export class Stats {
    @PrimaryGeneratedColumn({ type: 'int', name: 'stats_id', unsigned: true })
    statsId: number;

    @Column('int', { name: 'bench_press', default: () => "'0'" })
    benchPress: number;

    @Column('int', { name: 'back_squat', default: () => "'0'" })
    backSquat: number;

    @Column('int', { name: 'front_squat', default: () => "'0'" })
    frontSquat: number;

    @Column('int', { name: 'overhead_squat', default: () => "'0'" })
    overheadSquat: number;

    @Column('int', { name: 'deadlift', default: () => "'0'" })
    deadlift: number;

    @Column('int', { name: 'push_press', default: () => "'0'" })
    pushPress: number;

    @Column('int', { name: 'strict_press', default: () => "'0'" })
    strictPress: number;

    @Column('int', { name: 'clean_and_jerk', default: () => "'0'" })
    cleanAndJerk: number;

    @Column('int', { name: 'snatch', default: () => "'0'" })
    snatch: number;

    @Column("int", { name: "user_id", unsigned: true, default: () => "'0'" })
    userId: number;

    @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
    user: User
}