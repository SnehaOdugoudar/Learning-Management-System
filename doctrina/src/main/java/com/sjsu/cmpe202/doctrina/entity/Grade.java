package com.sjsu.cmpe202.doctrina.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Grade")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Grade {

    @Id
    @Column(name = "gradeId", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gradeId;

    @ManyToOne
    @JsonBackReference
    private Course course;

    @ManyToOne
    @JsonBackReference
    private Student student;

    private String grade;

}
