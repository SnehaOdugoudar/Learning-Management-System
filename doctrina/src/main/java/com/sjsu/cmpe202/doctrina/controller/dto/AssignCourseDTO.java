package com.sjsu.cmpe202.doctrina.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AssignCourseDTO(
        @Schema(description = "facultyId", example = "10")
        @NotNull(message = "facultyId cannot be blank")
        @Min(value = 0L, message = "The value must be positive")
        Integer facultyId,

        @Schema(description = "courseId", example = "10")
        @NotNull(message = "courseId cannot be blank")
        @Min(value = 0L, message = "The value must be positive")
        Integer courseId) {
}
