package com.sjsu.cmpe202.doctrina.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

public record StudentDTO(

    @Schema(description = "userId", example = "10")
    @NotNull(message = "userId cannot be blank")
    @Min(value = 0L, message = "The value must be positive")
    Integer userId,

    @Schema(description = "name", example = "manoj")
    @NotBlank(message = "Name cannot be blank")
    String name,

    @Schema(description = "password", example = "123456")
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
    String password,

    @Schema(description = "notificationFrequency", example = "10")
    @NotNull(message = "notificationFrequency cannot be blank")
    @Min(value = 0L, message = "The value must be positive")
    Integer notificationFrequency) {

}
