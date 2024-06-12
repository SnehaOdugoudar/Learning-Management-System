package com.sjsu.cmpe202.doctrina.service;

import com.sjsu.cmpe202.doctrina.controller.dto.AnnouncementDTO;
import com.sjsu.cmpe202.doctrina.controller.dto.AssignGradeDTO;
import com.sjsu.cmpe202.doctrina.controller.dto.CourseContentDTO;
import com.sjsu.cmpe202.doctrina.controller.dto.ExamDTO;
import com.sjsu.cmpe202.doctrina.entity.*;
import com.sjsu.cmpe202.doctrina.exceptions.DuplicateException;
import com.sjsu.cmpe202.doctrina.exceptions.NotFoundException;
import com.sjsu.cmpe202.doctrina.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyService {

    @Autowired
    private FaclutyRepo faclutyRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private GradeRepo gradeRepo;

    @Autowired
    private AnnouncementRepo announcementRepo;

    @Autowired
    private ExamsRepo examsRepo;


    public Optional<Faculty> getOneFaculty(){
        return faclutyRepo.findAll().stream().findAny();
    }

    public Optional<List<Course>> getCoursesById(Integer userId) {
        return faclutyRepo.findById(userId).map(Faculty::getCourseList);
    }

    public boolean addCourseContent(Course course){
        //todo
        return true;
    }
    public List<Student> getStudentsByCourseId(Integer courseId){
        return courseRepo.findById(courseId)
                .orElseThrow(() -> new NotFoundException("Course not found"))
                .getStudents();
    }

    @Transactional
    public void postAnnouncement(AnnouncementDTO announcementDTO) {

        Course course = courseRepo.findById(announcementDTO.courseId())
                .orElseThrow(() -> new NotFoundException("Course not found"));

        Announcement announcement = new Announcement();
        announcement.setAnnouncement(announcementDTO.announcement());
        announcement.setCourse(course);
        announcementRepo.save(announcement);

    }
    @Transactional
    public void postExam(ExamDTO examDTO) {
        Course course = courseRepo.findById(examDTO.courseId())
                .orElseThrow(() -> new NotFoundException("Course not found"));
        Exam exam = new Exam();
        exam.setExamType(examDTO.examType());
        exam.setPublished(examDTO.isPublished());
        exam.setQuestion(examDTO.question());
        exam.setCourse(course);
        examsRepo.save(exam);
    }
    @Transactional
    public void postCourseContent(CourseContentDTO courseContentDTO) {
        Course course = courseRepo.findById(courseContentDTO.courseId())
                .orElseThrow(() -> new NotFoundException("Course not found"));
        course.setContent(courseContentDTO.courseContent());
        courseRepo.save(course);

    }

    public void assignGrade(AssignGradeDTO assignGradeDTO) {
        Optional<Course> existingCourse = courseRepo.findById(assignGradeDTO.courseId());
        if (existingCourse.isEmpty()) {
            throw new NotFoundException(String.format("Course with the courseId '%s' does not exist.", assignGradeDTO.courseId()));
        }

        Optional<Student> existingStudent = studentRepo.findById(assignGradeDTO.studentId());
        if (existingStudent.isEmpty()) {
            throw new DuplicateException(String.format("Student with the studentId '%s' does not exist.", assignGradeDTO.studentId()));
        }

        Optional<Grade> existingGrade = gradeRepo.findGradeByStudent(existingStudent.get());
        if (existingGrade.isEmpty()) {
            Grade grade = new Grade();
            grade.setCourse(existingCourse.get());
            grade.setStudent(existingStudent.get());
            grade.setGrade(assignGradeDTO.grade());
            gradeRepo.saveAndFlush(grade);
        }else {
            existingGrade.get().setGrade(assignGradeDTO.grade());
            gradeRepo.saveAndFlush(existingGrade.get());
        }

    }
}
