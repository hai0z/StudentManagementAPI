import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToMany,
    BaseEntity,
    ManyToOne,
    OneToOne,
} from "typeorm";
import Semester from "./Semester";
import Student from "./Student";
import Subject from "./Subject";

@Entity({ name: "diem" })
export default class Mark extends BaseEntity {
    @PrimaryGeneratedColumn()
    maDiem: number;

    @Column({ type: "float", nullable: true })
    diemHeSo1: number;

    @Column({ type: "float", nullable: true })
    diemHeSo2: number;

    @Column({ type: "float", nullable: true })
    diemHeSo3: number;

    @Column({ type: "float", nullable: true })
    trungBinhMon: number;

    @ManyToMany(() => Student, (student) => student.marks)
    student: Student[];

    @ManyToOne(() => Subject, (suject) => suject.mark)
    @JoinColumn({ name: "monHoc_maMonHoc" })
    monHoc_maMonHoc: Subject;

    @ManyToOne(() => Semester, (semester) => semester.mark)
    @JoinColumn({ name: "hocKi_maHocKi" })
    hocKi_maHocKi: Semester;
}
