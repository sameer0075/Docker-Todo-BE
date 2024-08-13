import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn() id!: number;

    @Column()
    title!: string;

    @Column({ default: 'Testing' })
    description?: string;

    @Column()
    userId!: number;

    // Define the Many-to-One relationship
    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column()
    @CreateDateColumn()
    created_at!: Date;

    @Column()
    @UpdateDateColumn()
    updated_at!: Date;
}
