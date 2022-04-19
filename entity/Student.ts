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
    AfterInsert,
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
    @AfterInsert()
    async addAvatar() {
        try {
            if (this.gioiTinh) {
                this.img =
                    "https://static.vecteezy.com/system/resources/previews/004/773/704/large_2x/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg";
            } else {
                this.img =
                    "https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg";
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }
}
