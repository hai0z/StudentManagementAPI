import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
} from "typeorm";
import Teacher from "./Teacher";
@Entity()
export default class TeacherAccount extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 10 })
    maGiaoVien: string;

    @Column()
    password: string;

    @OneToOne(() => Teacher, (teacher) => teacher.teacherAccount)
    account: Teacher;
}
