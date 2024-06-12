package com.sjsu.cmpe202.doctrina.repository;

import com.sjsu.cmpe202.doctrina.entity.LoginAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginAttemptRepo extends JpaRepository<LoginAttempt, Long> {

    @Query("SELECT la FROM LoginAttempt la WHERE la.email = :email ORDER BY la.createdAt DESC")
    List<LoginAttempt> findRecent(@Param("email") String email);
}
