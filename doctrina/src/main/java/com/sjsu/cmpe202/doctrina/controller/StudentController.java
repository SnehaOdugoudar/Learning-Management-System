package com.sjsu.cmpe202.doctrina.controller;

import com.sjsu.cmpe202.doctrina.controller.dto.ApiErrorResponse;
import com.sjsu.cmpe202.doctrina.controller.dto.CourseContentDTO;
import com.sjsu.cmpe202.doctrina.controller.dto.StudentDTO;
import com.sjsu.cmpe202.doctrina.entity.Course;
import com.sjsu.cmpe202.doctrina.entity.Exam;
import com.sjsu.cmpe202.doctrina.entity.Student;
import com.sjsu.cmpe202.doctrina.exceptions.NotFoundException;
import com.sjsu.cmpe202.doctrina.repository.CourseRepo;
import com.sjsu.cmpe202.doctrina.repository.ExamsRepo;
import com.sjsu.cmpe202.doctrina.repository.LoginAttemptRepo;
import com.sjsu.cmpe202.doctrina.repository.StudentRepo;
import com.sjsu.cmpe202.doctrina.service.FacultyService;
import com.sjsu.cmpe202.doctrina.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/lms/student", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasAnyRole('STUDENT')")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentRepo studentRepo;

    @RequestMapping("/{studentId}")
    public Student getStudentById(@PathVariable Integer studentId) {
        return studentService.getStudentById(studentId);
    }

    @RequestMapping("/courses/{studentId}")
    public List<Course> getCourses(@PathVariable Integer studentId) {

        return studentService.getCoursesById(studentId).orElseThrow(()-> new NotFoundException("Courses not enrolled."));
    }

    @RequestMapping("/exams/{studentId}")
    public List<List<Exam>> getExams(@PathVariable Integer studentId) {

        return studentRepo.findById(studentId)
                .orElseThrow()
                .getEnrolledCourses()
                .stream()
                .map(Course::getExams)
                .collect(Collectors.toList());
    }

    //todo
    //think of different approach for grades
    @RequestMapping("/grades/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT')")
    public List<Course> getGrades(@PathVariable Integer studentId) {
        return new ArrayList<>(studentRepo.findById(studentId)
                .orElseThrow()
                .getEnrolledCourses());
    }
    @Operation(summary = "Post Student Profile")
    @ApiResponse(responseCode = "201")
    @ApiResponse(responseCode = "404", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "409", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "500", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @PostMapping("/postStudentProfile")
    public ResponseEntity<Void> postStudentProfile(@Valid @RequestBody StudentDTO studentDTO) {

        studentService.postStudentProfile(studentDTO);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


}