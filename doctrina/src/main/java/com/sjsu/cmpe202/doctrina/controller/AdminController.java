package com.sjsu.cmpe202.doctrina.controller;

import com.sjsu.cmpe202.doctrina.controller.dto.ApiErrorResponse;
import com.sjsu.cmpe202.doctrina.controller.dto.AssignCourseDTO;
import com.sjsu.cmpe202.doctrina.controller.dto.StudentDTO;
import com.sjsu.cmpe202.doctrina.entity.Course;
import com.sjsu.cmpe202.doctrina.entity.Faculty;
import com.sjsu.cmpe202.doctrina.exceptions.NotFoundException;
import com.sjsu.cmpe202.doctrina.service.AdminService;
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
@RequestMapping(path = "/api/lms/admin", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasAnyRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @RequestMapping("/courses")
    public List<Course> getCourses() {
        return adminService.getAllCourses();
    }

    @RequestMapping("/faculty")
    public List<Faculty> getfaculty() {
        return adminService.getAllFaculty();
    }

    @Operation(summary = "Assign a course to a Faculty for a new semester")
    @ApiResponse(responseCode = "201")
    @ApiResponse(responseCode = "404", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "409", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "500", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @PostMapping("/assignCourseToFaculty")
    public ResponseEntity<Void> assignCourseToFaculty(@Valid @RequestBody AssignCourseDTO assignCourseDTO) {

        adminService.assignCourseToFaculty(assignCourseDTO);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
