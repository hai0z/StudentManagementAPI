import {
    PrimaryGeneratedColumn,
    Entity,
    BaseEntity,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import Class from "./Class";
import Semester from "./Semester";
import Subject from "./Subject";
import Teacher from "./Teacher";
@Entity({ name: "phan_cong_giang_day" })
export default class Teaching extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Teacher, (teacher) => teacher.teaching)
    @JoinColumn({ name: "maGiaoVien" })
    maGiaoVien: string;

    @ManyToOne(() => Class, (class_) => class_.teaching)
    @JoinColumn({ name: "maLop" })
    maLop: string;

    @ManyToOne(() => Subject, (subject) => subject.teaching)
    @JoinColumn({ name: "maMonHoc" })
    maMonHoc: string;

    @ManyToOne(() => Semester, (semester) => semester.teaching)
    @JoinColumn({ name: "maHocKy" })
    maHocKy: string;
}
