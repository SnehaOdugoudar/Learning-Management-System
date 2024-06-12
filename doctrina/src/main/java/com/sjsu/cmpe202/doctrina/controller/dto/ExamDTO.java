package com.sjsu.cmpe202.doctrina.controller.dto;

import com.sjsu.cmpe202.doctrina.entity.Course;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record ExamDTO(
        @Schema(description = "examType", example = "ASSIGNMENT or QUIZ")
        @Pattern(regexp = "ASSIGNMENT|QUIZ", message = "Invalid examType, must be ASSIGNMENT or QUIZ")
        @NotBlank(message = "examType cannot be blank")
        String examType,

        @Schema(description = "isPublished", example = "True")
        @NotNull(message = "isPublished must be specified")
        Boolean isPublished,

        @Schema(description = "question", example = "This is a Quiz Question")
        @NotBlank(message = "question cannot be blank")
        String question,

        @Schema(description = "courseId", example = "10")
        @NotNull(message = "course cannot be blank")
        @Min(value = 0L, message = "The value must be positive")
        Integer courseId) {

}
