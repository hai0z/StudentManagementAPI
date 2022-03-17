import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    OneToMany,
    BaseEntity,
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

    @ManyToMany(() => Student)
    student: Student[];

    @OneToMany(() => Mark, (mark) => mark.monHoc_maMonHoc)
    mark: Mark;

    @ManyToMany(() => Teacher)
    teacher: Teacher[];
}
