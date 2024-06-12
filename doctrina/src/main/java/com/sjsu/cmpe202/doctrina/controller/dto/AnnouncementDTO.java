package com.sjsu.cmpe202.doctrina.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record AnnouncementDTO(
        @Schema(description = "announcement", example = "This is an announcement")
        @NotBlank(message = "announcement cannot be blank")
        String announcement,

        @Schema(description = "courseId", example = "10")
        @NotNull(message = "course cannot be blank")
        @Min(value = 0L, message = "The value must be positive")
        Integer courseId) {
}
