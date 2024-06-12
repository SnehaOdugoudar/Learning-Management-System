package com.sjsu.cmpe202.doctrina.controller;

import com.sjsu.cmpe202.doctrina.entity.*;
import com.sjsu.cmpe202.doctrina.exceptions.NotFoundException;
import com.sjsu.cmpe202.doctrina.repository.CourseRepo;
import com.sjsu.cmpe202.doctrina.repository.LoginAttemptRepo;
import com.sjsu.cmpe202.doctrina.repository.StudentRepo;
import com.sjsu.cmpe202.doctrina.service.FacultyService;
import com.sjsu.cmpe202.doctrina.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/lms", produces = MediaType.APPLICATION_JSON_VALUE)
public class Controller {

    @Autowired
    private StudentService studentService;

    @Autowired
    private LoginAttemptRepo loginAttemptRepo;

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private StudentRepo studentRepo;

    @RequestMapping("/init")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public List<Student> adminTest() {
        return studentService.init();
    }




}
