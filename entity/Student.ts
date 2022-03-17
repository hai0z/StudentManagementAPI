import {
    BaseEntity,
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";

import Class from "./Class";
import Mark from "./Mark";
import Statistical from "./Statistical";
import Subject from "./Subject";
import Teacher from "./Teacher";

@Entity({ name: "hocsinh" })
export default class Student extends BaseEntity {
    @PrimaryColumn({ length: 6 })
    maHs: string;

    @Column({ type: "varchar", length: 25 })
    hoTen: string;

    @Column({ type: "boolean", default: false, nullable: false })
    gioiTinh: boolean;

    @Column({ type: "date" })
    ngaySinh: Date;

    @Column()
    queQuan: string;

    @Column()
    diaChi: string;

    @ManyToOne(() => Class, (class_) => class_.students)
    @JoinColumn({ name: "lop_maLop" })
    lop_maLop: Class;

    @ManyToOne(() => Statistical, (statistical) => statistical.maHocSinh)
    @JoinColumn({ name: "thongKe_maThongKe" })
    thongKe_maThongKe: Statistical;

    @ManyToMany(() => Mark, (mark) => mark.student)
    @JoinTable({ name: "hocsinh_has_diem" })
    marks: Mark[];

    @ManyToMany(() => Subject, (subject) => subject.student)
    @JoinTable({ name: "hocsinh_has_monhoc" })
    subjects: Subject[];

    @ManyToMany(() => Teacher, (teacher) => teacher.students)
    @JoinTable({ name: "hocsinh_has_giaovien" })
    teachers: Teacher[];
}
