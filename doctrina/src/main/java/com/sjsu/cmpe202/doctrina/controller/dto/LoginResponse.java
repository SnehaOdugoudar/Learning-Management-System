package com.sjsu.cmpe202.doctrina.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginResponse(
    @Schema(description = "userId")
    Integer userId,
    @Schema(description = "name")
    String name,
    @Schema(description = "role")
    String role,
    @Schema(description = "email")
    String email,
    @Schema(description = "JWT token")
    String token) {

}
