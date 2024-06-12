package com.sjsu.cmpe202.doctrina.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;

@Entity
@Table(name = "EXAM")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Exam {

    @Id
    @Column(name = "examId", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer examId;
    @Column(name = "examType")
    private String examType;
    @Column(name = "isPublished")
    private boolean isPublished;
    @Column(name = "question")
    private String question;
    @ManyToOne
    @JsonBackReference
    private Course course;


}
