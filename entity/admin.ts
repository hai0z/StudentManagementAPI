import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "admin" })
export default class Admin extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 20 })
    username: string;

    @Column({ type: "varchar", length: 50 })
    password: string;
}
