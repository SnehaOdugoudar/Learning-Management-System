package com.sjsu.cmpe202.doctrina.service;

import com.sjsu.cmpe202.doctrina.controller.dto.StudentDTO;
import com.sjsu.cmpe202.doctrina.entity.Course;
import com.sjsu.cmpe202.doctrina.entity.Exam;
import com.sjsu.cmpe202.doctrina.entity.Student;
import com.sjsu.cmpe202.doctrina.exceptions.NotFoundException;
import com.sjsu.cmpe202.doctrina.repository.CourseRepo;
import com.sjsu.cmpe202.doctrina.repository.ExamsRepo;
import com.sjsu.cmpe202.doctrina.repository.StudentRepo;
import com.sjsu.cmpe202.doctrina.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private UserRepo userRepo;


    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private ExamsRepo examsRepo;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    public StudentService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    @Transactional
    public List<Student> init(){

        for (int i=0; i < 4; i++) {
            String courseName = "CMPE20" + new Random().nextInt(10);

            Course course =  new Course();
            course.setCourseName(courseName);
            course.setFaculty(facultyService.getOneFaculty()
                    .orElseThrow(()-> new NotFoundException("Faculties does not exist.")));
            course.setExams(null);
            course.setPublished(true);
            String sem = "Spring24";
            if (i > 1) sem = "Fall23";
            course.setSemester(sem);
            course.setAnnouncements(null);
//            course.getStudents().addAll(studentList.stream().toList());

            List<Student> studentList = studentRepo.findAll();


            Exam assignment =new Exam();
            assignment.setExamType("ASSIGNMENT");
            assignment.setCourse(course);
            assignment.setPublished(true);
            assignment.setQuestion("Assignment Question " + i);

            Exam quiz =new Exam();
            quiz.setExamType("QUIZ");
            quiz.setCourse(course);
            quiz.setPublished(true);
            quiz.setQuestion("Quiz Question " + i);


            if(courseRepo.findAll().stream().filter(c -> c.getCourseName().equals(courseName)).findAny().isEmpty()){

                courseRepo.save(course);
            }

            if (!studentList.isEmpty()) {
                Student student1 = studentList.get(0);
                student1.getEnrolledCourses().addAll(courseRepo.findAll());
                studentRepo.save(student1);
            } else {
                throw new NotFoundException("No student found.");
            }

            examsRepo.save(assignment);
            examsRepo.saveAndFlush(quiz);
        }



        return studentRepo.findAll();
    }
    public Optional<List<Course>> getCoursesById(Integer userId) {
        //todo
        return studentRepo.findById(userId).map(Student::getEnrolledCourses);
    }

    public Student getStudentById(Integer studentId){
        return studentRepo.findById(studentId).orElseThrow(() -> new NotFoundException("Student not found"));
    }

    @Transactional
    public void postStudentProfile(StudentDTO studentDTO) {
        Optional<Student> existingStudent = studentRepo.findById(studentDTO.userId());
        if (existingStudent.isEmpty()) {
            throw new NotFoundException(String.format("User with the userId '%s' does not exist.", studentDTO.userId()));
        }

        String hashedPassword = passwordEncoder.encode(studentDTO.password());

        Student student = existingStudent.get();

        student.setName(studentDTO.name());
        student.setPassword(hashedPassword);
        student.setNotificationFrequency(studentDTO.notificationFrequency());
        studentRepo.save(student);

    }
}
