package com.sjsu.cmpe202.doctrina.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Admin extends User{

}
