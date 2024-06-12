package com.sjsu.cmpe202.doctrina.service;

import com.sjsu.cmpe202.doctrina.controller.dto.SignupRequest;
import com.sjsu.cmpe202.doctrina.entity.Admin;
import com.sjsu.cmpe202.doctrina.entity.Faculty;
import com.sjsu.cmpe202.doctrina.entity.Student;
import com.sjsu.cmpe202.doctrina.entity.User;
import com.sjsu.cmpe202.doctrina.exceptions.DuplicateException;
import com.sjsu.cmpe202.doctrina.exceptions.NotFoundException;
import com.sjsu.cmpe202.doctrina.repository.AdminRepo;
import com.sjsu.cmpe202.doctrina.repository.FaclutyRepo;
import com.sjsu.cmpe202.doctrina.repository.StudentRepo;
import com.sjsu.cmpe202.doctrina.repository.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UserService {

  private final UserRepo repository;

  private final FaclutyRepo faclutyRepo;

  private final AdminRepo adminRepo;

  private final StudentRepo studentRepo;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepo repository, FaclutyRepo faclutyRepo, AdminRepo adminRepo, StudentRepo studentRepo, PasswordEncoder passwordEncoder) {
    this.repository = repository;
    this.faclutyRepo = faclutyRepo;
    this.adminRepo = adminRepo;
    this.studentRepo = studentRepo;
    this.passwordEncoder = passwordEncoder;
  }

  @Transactional
  public void signup(SignupRequest request) {
    String email = request.email();
    Optional<User> existingUser = repository.findByEmail(email);
    if (existingUser.isPresent()) {
      throw new DuplicateException(String.format("User with the email address '%s' already exists.", email));
    }

    String hashedPassword = passwordEncoder.encode(request.password());

    /*User user = new User();
    user.setName(request.name());
    user.setEmail(email);
    user.setRole(request.role());
    user.setPassword(hashedPassword);
    user.setCreatedAt(LocalDateTime.now());
    repository.save(user);*/

    if(request.role().equals("ADMIN")){

      Admin admin = new Admin();
      admin.setName(request.name());
      admin.setEmail(email);
      admin.setRole(request.role());
      admin.setPassword(hashedPassword);
      admin.setCreatedAt(LocalDateTime.now());
      adminRepo.save(admin);

    } else if (request.role().equals("FACULTY")) {

      Faculty faculty = new Faculty();
      faculty.setName(request.name());
      faculty.setEmail(email);
      faculty.setRole(request.role());
      faculty.setPassword(hashedPassword);
      faculty.setCreatedAt(LocalDateTime.now());
      faclutyRepo.save(faculty);

    } else if (request.role().equals("STUDENT")) {

      Student student = new Student();
      student.setName(request.name());
      student.setEmail(email);
      student.setRole(request.role());
      student.setPassword(hashedPassword);
      student.setCreatedAt(LocalDateTime.now());
      studentRepo.save(student);

    }

  }

  public User findUserByEmail(String email){
      return repository.findByEmail(email).orElseThrow(() ->
            new NotFoundException(String.format("User does not exist, email: %s", email)));
  }

}
