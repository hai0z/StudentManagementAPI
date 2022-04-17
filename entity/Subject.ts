import { Entity, PrimaryColumn, Column, OneToMany, BaseEntity } from "typeorm";
import Mark from "./Mark";
import Teaching from "./Teaching";

@Entity({ name: "monhoc" })
export default class Subject extends BaseEntity {
    @PrimaryColumn({ length: 20 })
    maMonHoc: string;

    @Column({ type: "varchar", length: 50 })
    tenMonHoc: string;

    @OneToMany(() => Mark, (mark) => mark.monHoc_maMonHoc, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    mark: Mark[];

    @OneToMany(() => Teaching, (teaching) => teaching.maMonHoc)
    teaching: Teaching[];
}
