import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    BaseEntity,
    AfterInsert,
    AfterUpdate,
} from "typeorm";
import Subject from "./Subject";
import Statistical from "./Statistical";
import Mark from "./Mark";
import Student from "./Student";
import Teaching from "./Teaching";
@Entity({ name: "hocki" })
export default class Semester extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 20 })
    maHocKi: string;

    @Column({ type: "int" })
    hocKi: number;

    @Column({ type: "varchar", length: 15 })
    namHoc: string;

    @OneToMany(
        () => Statistical,
        (statistical: Statistical) => statistical.maHocKi,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    thongKe_maThongke: Statistical[];

    @OneToMany(() => Mark, (mark) => mark.hocKi_maHocKi, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    mark: Mark[];

    @OneToMany(() => Teaching, (teaching) => teaching.maHocKy)
    teaching: Teaching[];

    @AfterInsert()
    async createMarkForAllStudent() {
        console.log("affter insert semester");
        try {
            const student = await Student.find({ relations: ["marks"] });
            const subject = await Subject.find();
            student.forEach(async (student) => {
                subject.forEach(async (item) => {
                    const mark = new Mark();
                    mark.hocKi_maHocKi = this;
                    student && (mark.student = student);
                    mark.monHoc_maMonHoc = item;
                    await mark.save();
                    student?.marks.push(mark);
                });
            });
        } catch (error: any) {
            console.log(error.message);
        }
    }
    @AfterInsert()
    async createStatistical() {
        console.log("affter insert semester");
        try {
            const student = await Student.find({
                relations: ["thongKe_maThongKe"],
            });
            student.forEach(async (student) => {
                const statistical = new Statistical();
                statistical.maHocKi = this;
                statistical.maHocSinh = student;
                await statistical.save();
            });
        } catch (error: any) {
            console.log(error.message);
        }
    }
}
