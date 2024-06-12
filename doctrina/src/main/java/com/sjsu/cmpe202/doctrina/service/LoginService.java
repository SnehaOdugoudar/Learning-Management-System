package com.sjsu.cmpe202.doctrina.service;

import com.sjsu.cmpe202.doctrina.entity.LoginAttempt;
import com.sjsu.cmpe202.doctrina.repository.LoginAttemptRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class LoginService {

  private final LoginAttemptRepo repository;

  public LoginService(LoginAttemptRepo repository) {
    this.repository = repository;
  }

  @Transactional
  public void addLoginAttempt(String email, boolean success) {
    LoginAttempt loginAttempt = new LoginAttempt();
    loginAttempt.setEmail(email);
    loginAttempt.setSuccess(success);
    loginAttempt.setCreatedAt(LocalDateTime.now());
    repository.save(loginAttempt);
  }

  public List<LoginAttempt> findRecentLoginAttempts(String email) {
    return repository.findRecent(email);
  }
}
