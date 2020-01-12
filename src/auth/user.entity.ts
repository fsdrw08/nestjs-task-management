import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Task } from 'src/tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Task, task => task.user, { eager: true } )
  task: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const result = await bcrypt.hash(password, this.salt);

    if (result === this.password) {
      return true;
    } else {
      return false;
    }
  }
}
