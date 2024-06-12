package com.sjsu.cmpe202.doctrina.repository;

import com.sjsu.cmpe202.doctrina.entity.Faculty;
import com.sjsu.cmpe202.doctrina.entity.Student;
import com.sjsu.cmpe202.doctrina.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student,Integer> {
    Optional<Student> findByEmail(String email);
}
