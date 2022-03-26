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
} from "typeorm";
import Grade from "./grade";
import Student from "./Student";
import Teacher from "./Teacher";
@Entity({ name: "lop" })
export default class Class extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 10 })
    maLop: string;

    @Column({ type: "varchar", length: 50 })
    tenLop: string;

    @Column({ type: "varchar", length: 12 })
    nienKhoa: string;

    @OneToOne(() => Grade, (grade) => grade.class)
    @JoinColumn({ name: "maKhoi" })
    grade: Grade;

    @OneToOne(() => Teacher, (teacher) => teacher.class)
    @JoinColumn({ name: "gvcn" })
    gvcn: Teacher;

    @OneToMany(() => Student, (student) => student.lop_maLop)
    students: Student[];

    @ManyToMany(() => Teacher, (teacher) => teacher.maLop)
    @JoinTable({ name: "giaovien_has_lop" })
    teacher: Teacher[];
}
