import {
    PrimaryColumn,
    Entity,
    BaseEntity,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm";

import Class from "./Class";
import Student from "./Student";
import Subject from "./Subject";
@Entity({ name: "giaovien" })
export default class Teacher extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 10 })
    maGiaoVien: string;

    @Column()
    tenGiaoVien: string;

    @Column()
    gioiTinh: string;

    @Column()
    ngaySinh: string;

    @Column()
    diaChi: string;

    @Column()
    soDienThoai: string;

    @Column()
    email: string;

    @ManyToMany(() => Class)
    @JoinTable({ name: "giaovien_has_lop" })
    maLop: Class[];

    @ManyToMany(() => Student)
    students: Student[];

    @ManyToMany(() => Subject, (subject) => subject.teacher)
    @JoinTable({ name: "giaovien_has_monhoc" })
    subjects: Subject[];
}
