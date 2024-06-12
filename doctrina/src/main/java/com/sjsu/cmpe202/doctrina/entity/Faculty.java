package com.sjsu.cmpe202.doctrina.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Faculty extends User{

/*
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer facultyId;
*/

    @OneToMany(mappedBy = "faculty")
    @JsonBackReference
    private List<Course> courseList;



}