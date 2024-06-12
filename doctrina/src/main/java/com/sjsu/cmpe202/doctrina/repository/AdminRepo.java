package com.sjsu.cmpe202.doctrina.repository;

import com.sjsu.cmpe202.doctrina.entity.Admin;
import com.sjsu.cmpe202.doctrina.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin,Integer> {
}
