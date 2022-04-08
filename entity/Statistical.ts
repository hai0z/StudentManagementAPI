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
    diemTrungbinh: number;

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
    async tinhDiemTrungBinh() {
        console.log("after load");
        // const mark = await Student.findOne(this.maHocSinh, {
        //     relations: ["marks"],
        // });
        // const arrMark: any = [];
        // console.log(mark);
        // mark?.marks.forEach((item) => {
        //     if (item.trungBinhMon != null) {
        //         arrMark.push(item.trungBinhMon);
        //     }
        // });
        // if (arrMark.length == mark?.marks.length) {
        //     this.diemTrungbinh = +(
        //         arrMark.reduce((a: any, b: any) => a + b) / arrMark.length
        //     ).toFixed(1);
        // }
        this.diemTrungbinh = 10;
    }
}
