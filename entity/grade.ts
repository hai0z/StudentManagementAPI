import { BaseEntity, PrimaryColumn, Column, OneToOne, Entity } from "typeorm";
import Class from "./Class";

@Entity({ name: "khoi" })
export default class Grade extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 10 })
    maKhoi: string;

    @Column({ type: "varchar", length: 20 })
    tenKhoi: string;

    @OneToOne(() => Class, (class_) => class_.grade)
    class: Class;
}
