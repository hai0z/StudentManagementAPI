import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import Student from "./Student";
import Semester from "./Semester";

@Entity({ name: "thongke" })
export default class Statistical {
    @PrimaryColumn({ type: "varchar", length: 10 })
    maThongke: string;

    @Column()
    diemTrungbinh: number;

    @OneToMany(() => Student, (student: Student) => student.thongKe_maThongKe)
    maHocSinh: Student[];

    @OneToMany(
        () => Semester,
        (semester: Semester) => semester.thongKe_maThongke,
        { onDelete: "CASCADE" }
    )
    maHocKi: Semester[];
}
