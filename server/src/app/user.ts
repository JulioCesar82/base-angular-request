import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('USERS')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    nullable: false
  })
  firstname: string;

  @Column({
    length: 50,
    nullable: false
  })
  lastname: string;

  @Column({
    length: 50,
    nullable: false
  })
  username: string;

  @Column({
    length: 250,
    nullable: false
  })
  password: string;

  @Column({
    length: 20,
    nullable: false
  })
  role: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;

  static encryptPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

}
