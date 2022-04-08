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

@Entity({ name: "thongke" })
export default class Statistical extends BaseEntity {
    @PrimaryGeneratedColumn()
    maThongke: number;

    @Column({ type: "float", nullable: true })
    diemTrungBinh: number;

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

    @AfterLoad()
    async tinhDiemTrungBinh(maHs: string) {
        const mark = await Student.findOne(maHs, {
            relations: ["marks"],
        });
        const arrMark: any = [];
        mark?.marks.forEach((item) => {
            if (item.trungBinhMon != null) {
                arrMark.push(item.trungBinhMon);
            }
        });
        if (arrMark.length == mark?.marks.length) {
            this.diemTrungBinh = +(
                arrMark.reduce((a: any, b: any) => a + b) / arrMark.length
            ).toFixed(1);
        }
        return this.diemTrungBinh;
    }
}
