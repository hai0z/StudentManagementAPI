import {
    Column,
    Entity,
    BaseEntity,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import Student from "./Student";
@Entity({ name: "student_account" })
export default class StudentAccount extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", length: 10 })
    maHocSinh: string;

    @Column({ type: "varchar", length: 50 })
    password: string;

    @OneToOne(() => Student, (student) => student.studentAccount)
    account: Student;
}
