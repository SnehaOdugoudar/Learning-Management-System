package com.sjsu.cmpe202.doctrina.repository;

import com.sjsu.cmpe202.doctrina.entity.Course;
import com.sjsu.cmpe202.doctrina.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepo extends JpaRepository<Course,Integer> {
}
