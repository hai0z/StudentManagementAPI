import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    OneToMany,
    BaseEntity,
    JoinTable,
} from "typeorm";
import Mark from "./Mark";
import Semester from "./Semester";
import Student from "./Student";
import Teacher from "./Teacher";

@Entity({ name: "monhoc" })
export default class Subject extends BaseEntity {
    @PrimaryColumn({ length: 6 })
    maMonHoc: string;

    @Column()
    tenMonHoc: string;

    @ManyToOne(() => Semester, (semester) => semester.maMonHoc)
    @JoinColumn({ name: "hocKi_maHocKi" })
    hocKi_maHocKi: Semester;

    @ManyToMany(() => Student, (student) => student.subjects)
    student: Student[];

    @OneToMany(() => Mark, (mark) => mark.monHoc_maMonHoc)
    mark: Mark[];

    @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
    @JoinTable({ name: "monhoc_has_giaovien" })
    teachers: Teacher[];
}
