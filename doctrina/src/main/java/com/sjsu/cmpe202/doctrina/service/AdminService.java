package com.sjsu.cmpe202.doctrina.service;

import com.sjsu.cmpe202.doctrina.controller.dto.AssignCourseDTO;
import com.sjsu.cmpe202.doctrina.entity.Course;
import com.sjsu.cmpe202.doctrina.entity.Faculty;
import com.sjsu.cmpe202.doctrina.entity.Student;
import com.sjsu.cmpe202.doctrina.entity.User;
import com.sjsu.cmpe202.doctrina.exceptions.DuplicateException;
import com.sjsu.cmpe202.doctrina.exceptions.NotFoundException;
import com.sjsu.cmpe202.doctrina.repository.CourseRepo;
import com.sjsu.cmpe202.doctrina.repository.FaclutyRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {


    @Autowired
    private FaclutyRepo faclutyRepo;

    @Autowired
    private CourseRepo courseRepo;


    public List<Faculty> getAllFaculty(){
        return faclutyRepo.findAll();
    }

    public List<Course> getAllCourses(){
        return courseRepo.findAll();
    }

    @Transactional
    public void assignCourseToFaculty(AssignCourseDTO assignCourseDTO) {

        Optional<Course> existingCourse = courseRepo.findById(assignCourseDTO.courseId());
        if (existingCourse.isEmpty()) {
            throw new NotFoundException(String.format("Course with the courseId '%s' does not exist.", assignCourseDTO.courseId()));
        }

        Optional<Faculty> existingFaculty = faclutyRepo.findById(assignCourseDTO.facultyId());
        if (existingFaculty.isEmpty()) {
            throw new DuplicateException(String.format("Faculty with the facultyId address '%s' does not exist.", assignCourseDTO.facultyId()));
        }

        Course course = existingCourse.get();

        course.setFaculty(existingFaculty.get());

        courseRepo.save(course);

    }
}
