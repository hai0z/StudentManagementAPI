import {
    BaseEntity,
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
    OneToMany,
    BeforeInsert,
} from "typeorm";

import Class from "./Class";
import Mark from "./Mark";
import Statistical from "./Statistical";
import StudentAccount from "./StudentAccount";

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

    @Column({ type: "varchar", length: 500 })
    img: string;

    @ManyToOne(() => Class, (class_) => class_.students, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "lop_maLop" })
    lop_maLop: Class;

    @OneToMany(() => Statistical, (statistical) => statistical.maHocSinh, {
        onDelete: "CASCADE",
    })
    thongKe_maThongKe: Statistical[];

    @OneToMany(() => Mark, (mark) => mark.student, { onDelete: "CASCADE" })
    marks: Mark[];

    @OneToOne(
        () => StudentAccount,
        (studentAccount) => studentAccount.account,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "studentAccount_id" })
    studentAccount: StudentAccount;

    @BeforeInsert()
    async createStudentAccount() {
        try {
            const studentAccount = new StudentAccount();
            studentAccount.maHocSinh = this.maHs;
            studentAccount.password = "1111";
            await studentAccount.save();
            this.studentAccount = studentAccount;
        } catch (error: any) {
            console.log(error.message);
        }
    }
}
