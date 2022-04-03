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
import Teaching from "./Teaching";

@Entity({ name: "monhoc" })
export default class Subject extends BaseEntity {
    @PrimaryColumn({ length: 20 })
    maMonHoc: string;

    @Column({ type: "varchar", length: 50 })
    tenMonHoc: string;

    @ManyToMany(() => Student, (student) => student.subjects)
    student: Student[];

    @OneToMany(() => Mark, (mark) => mark.monHoc_maMonHoc)
    mark: Mark[];

    @OneToMany(() => Teaching, (teaching) => teaching.maMonHoc)
    teaching: Teaching[];
}
