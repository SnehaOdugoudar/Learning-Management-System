package com.sjsu.cmpe202.doctrina.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "ANNOUNCEMENT")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Announcement {

    @Id
    @Column(name = "announcementId", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer announcementId;
    private String announcement;
    @ManyToOne
    @JsonBackReference
    private Course course;
}
