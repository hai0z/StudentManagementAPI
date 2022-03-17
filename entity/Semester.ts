import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import Subject from "./Subject";
import Statistical from "./Statistical";
@Entity({ name: "hocki" })
export default class Semester {
    @PrimaryColumn({ type: "varchar", length: 10 })
    maHocKi: string;

    @Column()
    hocKi: number;

    @Column()
    namHoc: number;

    @OneToMany(() => Subject, (subject) => subject.hocKi_maHocKi)
    maMonHoc: Subject[];

    @ManyToOne(
        () => Statistical,
        (statistical: Statistical) => statistical.maHocKi,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "thongke_maThongke" })
    thongKe_maThongke: Statistical;
}
