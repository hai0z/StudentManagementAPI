import {
    PrimaryColumn,
    Column,
    Entity,
    OneToMany,
    BaseEntity,
    ManyToMany,
    JoinTable,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import Grade from "./grade";
import Student from "./Student";
import Teacher from "./Teacher";
import Teaching from "./Teaching";
@Entity({ name: "lop" })
export default class Class extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 10 })
    maLop: string;

    @Column({ type: "varchar", length: 50 })
    tenLop: string;

    @Column({ type: "varchar", length: 12 })
    nienKhoa: string;

    @ManyToOne(() => Grade, (grade) => grade.class)
    @JoinColumn({ name: "maKhoi" })
    grade: Grade;

    @OneToOne(() => Teacher, (teacher) => teacher.class)
    @JoinColumn({ name: "gvcn" })
    gvcn: Teacher;

    @OneToMany(() => Student, (student) => student.lop_maLop)
    students: Student[];

    @OneToMany(() => Teaching, (teaching) => teaching.maLop)
    teaching: Teaching[];
}
