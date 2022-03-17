import {
    PrimaryColumn,
    Column,
    Entity,
    OneToMany,
    BaseEntity,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from "typeorm";
import Student from "./Student";
import Teacher from "./Teacher";
@Entity({ name: "lop" })
export default class Class extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 10 })
    maLop: string;

    @Column({ type: "varchar", length: 50 })
    tenLop: string;

    @OneToMany(() => Student, (student) => student.lop_maLop)
    students: Student[];

    @ManyToMany(() => Teacher, (teacher) => teacher.maLop)
    @JoinTable({ name: "giaovien_has_lop" })
    teacher: Teacher[];
}
