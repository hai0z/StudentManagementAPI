import {
    PrimaryColumn,
    Entity,
    BaseEntity,
    Column,
    OneToOne,
    OneToMany,
    BeforeInsert,
    JoinColumn,
    AfterInsert,
} from "typeorm";

import Class from "./Class";
import Teaching from "./Teaching";
import TeacherAccount from "./teacherAccount";
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

    @Column({ type: "varchar", length: 500 })
    img: string;
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

    @OneToOne(() => TeacherAccount, (teacherAccount) => teacherAccount.account)
    @JoinColumn({ name: "teacherAccount_id" })
    teacherAccount: TeacherAccount;

    @BeforeInsert()
    async createTeacherAccount() {
        try {
            const teacherAccount = new TeacherAccount();
            teacherAccount.maGiaoVien = this.maGiaoVien;
            teacherAccount.password = "1111";
            await teacherAccount.save();
            this.teacherAccount = teacherAccount;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    @AfterInsert()
    async addAvatar() {
        try {
            if (this.gioiTinh) {
                this.img =
                    "https://cdn.discordapp.com/attachments/839856823866490970/966252005268000788/ggg-removebg-preview.png";
            } else {
                this.img =
                    " https://cdn.discordapp.com/attachments/839856823866490970/966252005498707968/unknown-removebg-preview_1.png";
            }
        } catch (err: any) {
            console.log(err.message);
        }
    }
}
