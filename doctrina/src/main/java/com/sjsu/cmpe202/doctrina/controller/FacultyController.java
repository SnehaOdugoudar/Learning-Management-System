package com.sjsu.cmpe202.doctrina.controller;

import com.sjsu.cmpe202.doctrina.controller.dto.*;
import com.sjsu.cmpe202.doctrina.entity.Course;
import com.sjsu.cmpe202.doctrina.entity.Student;
import com.sjsu.cmpe202.doctrina.exceptions.NotFoundException;
import com.sjsu.cmpe202.doctrina.service.FacultyService;
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

import java.util.List;

@RestController
@RequestMapping(path = "/api/lms/faculty", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasAnyRole('FACULTY')")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @RequestMapping("/courses/{facultyId}")
    public List<Course> getCourses(@PathVariable Integer facultyId) {

        return facultyService.getCoursesById(facultyId)
                .orElseThrow(()-> new NotFoundException("Courses not Found for Faculty."));
    }

    @RequestMapping("/students/{courseId}")
    public List<Student> getStudentByCourse(@PathVariable Integer courseId) {

        return facultyService.getStudentsByCourseId(courseId);
    }

    @Operation(summary = "Post Announcement")
    @ApiResponse(responseCode = "201")
    @ApiResponse(responseCode = "404", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "409", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "500", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @PostMapping("/postAnnouncement")
    public ResponseEntity<Void> postAnnouncement(@Valid @RequestBody AnnouncementDTO announcementDTO) {

        facultyService.postAnnouncement(announcementDTO);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Post Assignments and Quizzes")
    @ApiResponse(responseCode = "201")
    @ApiResponse(responseCode = "404", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "409", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "500", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @PostMapping("/postExam")
    public ResponseEntity<Void> postExam(@Valid @RequestBody ExamDTO examDTO) {

        facultyService.postExam(examDTO);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Post Course Content")
    @ApiResponse(responseCode = "201")
    @ApiResponse(responseCode = "404", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "409", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "500", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @PostMapping("/postCourseContent")
    public ResponseEntity<Void> postCourseContent(@Valid @RequestBody CourseContentDTO courseContentDTO) {

        facultyService.postCourseContent(courseContentDTO);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Assign Grade")
    @ApiResponse(responseCode = "201")
    @ApiResponse(responseCode = "404", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "409", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "500", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @PostMapping("/assignGrade")
    public ResponseEntity<Void> assignGrade(@Valid @RequestBody AssignGradeDTO assignGradeDTO) {

        facultyService.assignGrade(assignGradeDTO);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }







}
