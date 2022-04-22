import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    BaseEntity,
    ManyToOne,
    BeforeUpdate,
    AfterLoad,
} from "typeorm";
import Semester from "./Semester";
import Student from "./Student";
import Subject from "./Subject";

@Entity({ name: "diem" })
export default class Mark extends BaseEntity {
    @PrimaryGeneratedColumn()
    maDiem: number;

    @Column({ type: "float", nullable: true })
    diemHeSo1: number;
    @Column({ type: "float", nullable: true })
    diemHeSo1_2: number;
    @Column({ type: "float", nullable: true })
    diemHeSo1_3: number;
    @Column({ type: "float", nullable: true })
    diemHeSo1_4: number;

    @Column({ type: "float", nullable: true })
    diemHeSo2: number;
    @Column({ type: "float", nullable: true })
    diemHeSo2_2: number;
    @Column({ type: "float", nullable: true })
    diemHeSo2_3: number;

    @Column({ type: "float", nullable: true })
    diemHeSo3: number;

    @Column({ type: "float", nullable: true })
    trungBinhMon: number | any;

    @ManyToOne(() => Student, (student) => student.marks, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "maHs" })
    student: Student;

    @ManyToOne(() => Subject, (suject) => suject.mark, {
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "monHoc_maMonHoc" })
    monHoc_maMonHoc: Subject;

    @ManyToOne(() => Semester, (semester) => semester.mark, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "hocKi_maHocKi" })
    hocKi_maHocKi: Semester;

    @BeforeUpdate()
    TinhTrungBinhMon() {
        console.log("before update mark");
        let totalElements = 0;
        let markArr = [];
        if (this.diemHeSo1 != null) {
            markArr.push(+this.diemHeSo1);
            totalElements++;
        }
        if (this.diemHeSo1_2 != null) {
            markArr.push(+this.diemHeSo1_2);
            totalElements++;
        }
        if (this.diemHeSo1_3 != null) {
            markArr.push(+this.diemHeSo1_3);
            totalElements++;
        }
        if (this.diemHeSo1_4 != null) {
            markArr.push(+this.diemHeSo1_4);
            totalElements++;
        }

        if (this.diemHeSo2 != null) {
            markArr.push(+this.diemHeSo2 * 2.0);
            totalElements += 2;
        }
        if (this.diemHeSo2_2 != null) {
            markArr.push(+this.diemHeSo2_2 * 2.0);
            totalElements += 2;
        }
        if (this.diemHeSo2_3 != null) {
            markArr.push(+this.diemHeSo2_3 * 2.0);
            totalElements += 2;
        }
        const diemHeSo3 = this.diemHeSo3;
        if (diemHeSo3 != null) {
            markArr.push(+this.diemHeSo3 * 3.0);
            totalElements += 3;
            let sum = 0;
            for (let i = 0; i < markArr.length; i++) {
                sum += markArr[i];
            }
            let average = +(sum / totalElements).toFixed(1);
            this.trungBinhMon = average;
        }
    }
    @AfterLoad()
    resetDTB() {
        if (
            this.diemHeSo3 == null ||
            this.diemHeSo3 == undefined ||
            this.diemHeSo3 == 0
        ) {
            this.trungBinhMon = null;
        }
    }
}
