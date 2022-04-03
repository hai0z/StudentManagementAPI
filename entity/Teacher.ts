import {
    PrimaryColumn,
    Entity,
    BaseEntity,
    Column,
    ManyToMany,
    JoinTable,
    OneToOne,
    OneToMany,
} from "typeorm";

import Class from "./Class";
import Teaching from "./Teaching";
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

    @OneToOne(() => Class, (class_) => class_.gvcn)
    class: Class;

    @OneToMany(() => Teaching, (teaching) => teaching.maGiaoVien)
    teaching: Teaching[];
}
