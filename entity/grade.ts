import { BaseEntity, PrimaryColumn, Column, OneToMany, Entity } from "typeorm";
import Class from "./Class";

@Entity({ name: "khoi" })
export default class Grade extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 10 })
    maKhoi: string;

    @Column({ type: "varchar", length: 20 })
    tenKhoi: string;

    @OneToMany(() => Class, (class_) => class_.grade)
    class: Class[];
}
