import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    AfterLoad,
    BaseEntity,
} from "typeorm";
import Student from "./Student";
import Semester from "./Semester";
import Mark from "./Mark";

@Entity({ name: "thongke" })
export default class Statistical extends BaseEntity {
    @PrimaryGeneratedColumn()
    maThongke: number;

    @Column({ type: "float", nullable: true })
    diemTrungBinh: number;

    @ManyToOne(() => Student, (student: Student) => student.thongKe_maThongKe, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "hocSinh_maHocSinh" })
    maHocSinh: Student;

    @ManyToOne(
        () => Semester,
        (semester: Semester) => semester.thongKe_maThongke,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "hocKy_maHocKy" })
    maHocKi: Semester;
}
