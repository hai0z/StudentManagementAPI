import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn,
    ManyToMany,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import Student from "./Student";
import Subject from "./Subject";

@Entity({ name: "diem" })
export default class Mark extends BaseEntity {
    @PrimaryGeneratedColumn()
    maDiem: string;

    @Column({ type: "float" })
    diemHeSo1: number;

    @Column({ type: "float" })
    diemHeSo2: number;

    @Column({ type: "float" })
    diemHeSo3: number;

    @Column({ type: "float" })
    trungBinhMon: number;

    @ManyToMany(() => Student)
    student: Student[];

    @ManyToOne(() => Subject, (suject) => suject.mark)
    @JoinColumn({ name: "monHoc_maMonHoc" })
    monHoc_maMonHoc: Subject;
}
