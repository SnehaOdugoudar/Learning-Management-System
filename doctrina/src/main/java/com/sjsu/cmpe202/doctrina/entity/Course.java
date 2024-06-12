package com.sjsu.cmpe202.doctrina.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
/*@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "courseId")*/
@Entity
@Table(name = "COURSE")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Course {

    @Id
    @Column(name = "courseId", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer courseId;
    @Column
    private String courseName;
    @Column
    private boolean isPublished;
    @Column
    private String semester;
    @Column
    private String content;

    @ManyToOne
    @JsonManagedReference
    private Faculty faculty;

    @OneToMany(mappedBy = "course")
    @JsonManagedReference
    private List<Exam> exams;

    @OneToMany(mappedBy = "course")
    @JsonManagedReference
    private List<Grade> grades;

    @OneToMany(mappedBy = "course")
    private List<Announcement> announcements;

    @ManyToMany(mappedBy = "enrolledCourses")
    @JsonManagedReference
    private List<Student> students = new ArrayList<>();


}
