import {
    PrimaryColumn,
    Entity,
    BaseEntity,
    Column,
    ManyToMany,
    JoinTable,
    OneToOne,
} from "typeorm";

import Class from "./Class";
import Student from "./Student";
import Subject from "./Subject";
@Entity({ name: "giaovien" })
export default class Teacher extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 10 })
    maGiaoVien: string;

    @Column({ type: "varchar", length: 50 })
    tenGiaoVien: string;

    @Column({ type: "boolean", default: false })
    gioiTinh: string;

    @Column({ type: "date" })
    ngaySinh: Date;

    @Column({ type: "varchar", length: 150 })
    diaChi: string;

    @Column({ type: "varchar", length: 11 })
    soDienThoai: string;

    @Column({ type: "varchar", length: 50 })
    email: string;

    @OneToOne(() => Class, (class_) => class_.teacher)
    class: Class;

    @ManyToMany(() => Class, (class_) => class_.teacher)
    @JoinTable({ name: "giaovien_has_lop" })
    maLop: Class[];

    @ManyToMany(() => Student, (student) => student.teachers)
    students: Student[];

    @ManyToMany(() => Subject, (subject) => subject.teachers)
    subjects: Subject[];
}
