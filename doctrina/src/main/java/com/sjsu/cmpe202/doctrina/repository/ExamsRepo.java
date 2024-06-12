package com.sjsu.cmpe202.doctrina.repository;

import com.sjsu.cmpe202.doctrina.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamsRepo extends JpaRepository<Exam,Integer> {
}
