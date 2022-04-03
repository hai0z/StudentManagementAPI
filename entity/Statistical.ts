import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import Student from "./Student";
import Semester from "./Semester";
import Mark from "./Mark";

@Entity({ name: "thongke" })
export default class Statistical {
    @PrimaryGeneratedColumn()
    maThongke: number;

    @Column()
    diemTrungbinh: number;

    @Column()
    xepLoai: string;

    @ManyToOne(() => Student, (student: Student) => student.thongKe_maThongKe)
    @JoinColumn({ name: "hocSinh_maHocSinh" })
    maHocSinh: Student;

    @ManyToOne(
        () => Semester,
        (semester: Semester) => semester.thongKe_maThongke,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "hocKy_maHocKy" })
    maHocKi: Semester;

    async getMark() {
        const mark = await Mark.find({
            where: {
                hocKi_maHocKi: this.maHocKi,
                student: {
                    maHs: this.maHocSinh.maHs,
                },
            },
        });
        return mark;
    }
}
