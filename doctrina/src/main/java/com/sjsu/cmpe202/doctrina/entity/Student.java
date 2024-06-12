package com.sjsu.cmpe202.doctrina.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "STUDENT")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Student extends User{

    @Column(name = "notificationFrequency")
    private Integer notificationFrequency;

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "student_course",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "courseId")
    )
    @JsonBackReference
    private List<Course> enrolledCourses = new ArrayList<>();

    @OneToMany(mappedBy = "student")
    private List<Grade> grades;


}