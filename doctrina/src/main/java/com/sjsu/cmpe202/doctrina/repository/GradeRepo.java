package com.sjsu.cmpe202.doctrina.repository;

import com.sjsu.cmpe202.doctrina.entity.Admin;
import com.sjsu.cmpe202.doctrina.entity.Grade;
import com.sjsu.cmpe202.doctrina.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GradeRepo extends JpaRepository<Grade,Integer> {

    public Optional<Grade> findGradeByStudent(Student student);
}
