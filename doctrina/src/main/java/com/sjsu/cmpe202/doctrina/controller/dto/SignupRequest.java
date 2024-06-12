package com.sjsu.cmpe202.doctrina.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SignupRequest(
    @Schema(description = "name", example = "manoj")
    @NotBlank(message = "Name cannot be blank")
    String name,

    @Schema(description = "email", example = "manoj@gmail.com")
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email cannot be blank")
    String email,

    @Schema(description = "role", example = "STUDENT")
    @Pattern(regexp = "ADMIN|STUDENT|FACULTY", message = "Invalid role, must be ADMIN, STUDENT, or FACULTY")
    @NotBlank(message = "Role cannot be blank")
    String role,

    @Schema(description = "password", example = "123456")
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
    String password) {

}
