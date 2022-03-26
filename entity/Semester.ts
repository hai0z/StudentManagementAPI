import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    JoinColumn,
    ManyToOne,
    OneToOne,
    BaseEntity,
} from "typeorm";
import Subject from "./Subject";
import Statistical from "./Statistical";
import Mark from "./Mark";
@Entity({ name: "hocki" })
export default class Semester extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 20 })
    maHocKi: string;

    @Column({ type: "int" })
    hocKi: number;

    @Column({ type: "varchar", length: 15 })
    namHoc: string;

    @OneToMany(() => Subject, (subject) => subject.hocKi_maHocKi)
    maMonHoc: Subject[];

    @ManyToOne(
        () => Statistical,
        (statistical: Statistical) => statistical.maHocKi,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "thongke_maThongke" })
    thongKe_maThongke: Statistical;

    @OneToMany(() => Mark, (mark) => mark.hocKi_maHocKi)
    mark: Mark[];
}
