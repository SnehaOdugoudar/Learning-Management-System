package com.sjsu.cmpe202.doctrina.service;

import com.sjsu.cmpe202.doctrina.entity.User;
import com.sjsu.cmpe202.doctrina.exceptions.NotFoundException;
import com.sjsu.cmpe202.doctrina.repository.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepo repository;

  public UserDetailsServiceImpl(UserRepo repository) {
    this.repository = repository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) {

    User user = repository.findByEmail(email).orElseThrow(() ->
        new NotFoundException(String.format("User does not exist, email: %s", email)));

    return org.springframework.security.core.userdetails.User.builder()
        .username(user.getEmail())
        .password(user.getPassword())
        .roles(user.getRole())
        .build();
  }
}
