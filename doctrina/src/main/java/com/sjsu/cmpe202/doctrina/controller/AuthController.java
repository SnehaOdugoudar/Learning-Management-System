
package com.sjsu.cmpe202.doctrina.controller;

import com.sjsu.cmpe202.doctrina.controller.dto.*;
import com.sjsu.cmpe202.doctrina.entity.LoginAttempt;
import com.sjsu.cmpe202.doctrina.entity.User;
import com.sjsu.cmpe202.doctrina.helper.JwtHelper;
import com.sjsu.cmpe202.doctrina.service.LoginService;
import com.sjsu.cmpe202.doctrina.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final UserService userService;
  private final LoginService loginService;

  public AuthController(AuthenticationManager authenticationManager, UserService userService, LoginService loginService) {
    this.authenticationManager = authenticationManager;
    this.userService = userService;
    this.loginService = loginService;
  }

  @Operation(summary = "Signup user")
  @ApiResponse(responseCode = "201")
  @ApiResponse(responseCode = "404", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
  @ApiResponse(responseCode = "409", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
  @ApiResponse(responseCode = "500", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
  @PostMapping("/signup")
  public ResponseEntity<Void> signup(@Valid @RequestBody SignupRequest requestDto) {
    userService.signup(requestDto);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @Operation(summary = "Authenticate user and return token")
  @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = LoginResponse.class)))
  @ApiResponse(responseCode = "401", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
  @ApiResponse(responseCode = "404", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
  @ApiResponse(responseCode = "500", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
  @PostMapping(value = "/login")
  public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
    } catch (BadCredentialsException e) {
      loginService.addLoginAttempt(request.email(), false);
      throw e;
    }

    String token = JwtHelper.generateToken(request.email());
    loginService.addLoginAttempt(request.email(), true);
    User user = userService.findUserByEmail(request.email());
    return ResponseEntity.ok(new LoginResponse(user.getUserId(),user.getName(), user.getRole(), user.getEmail(), token));
  }

  @Operation(summary = "Get recent login attempts")
  @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = LoginResponse.class)))
  @ApiResponse(responseCode = "403", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))//forbidden
  @ApiResponse(responseCode = "500", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
  @GetMapping(value = "/loginAttempts")
  public ResponseEntity<List<LoginAttemptResponse>> loginAttempts(@RequestHeader("Authorization") String token) {
    String email = JwtHelper.extractUsername(token.replace("Bearer ", ""));
    List<LoginAttempt> loginAttempts = loginService.findRecentLoginAttempts(email);
    return ResponseEntity.ok(convertToDTOs(loginAttempts));
  }

  private List<LoginAttemptResponse> convertToDTOs(List<LoginAttempt> loginAttempts) {
    return loginAttempts.stream()
        .map(LoginAttemptResponse::convertToDTO)
        .collect(Collectors.toList());
  }
}