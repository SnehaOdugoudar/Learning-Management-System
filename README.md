[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/LZLg91XD)

### Team Name: GoTeam202

### Team members: Manoj Kotteda, Sneha Odugoudar, Jing Xue, Hongjin Cheng

### Contributions:

**Manoj Kotteda**: 
  - Backend APIs for three roles (Faculty, Student, Admin); 
  - Backend APIs for Security (Authentication, api authorization, JWT based security setup); 
  - Cloud deployment (Azure Spring apps setup, azure sql DB setup);

    
**Sneha Odugoudar**: 
  - Login and Register Component (Authorization)
  - Faculty web UI design;
  - implement all Faculty functionalities (call deployed API from frontend)
    
**Jing Xue**: 
  - Student and Admin web UI design;
  - implement all Student and Admin functionalities (call deployed API from frontend)
    
**Hongjin Cheng**:
  - admin web page

### Team’s GitHub Repo Link:
https://github.com/gopinathsjsu/team-project-goteam202


### Team’s Project Journal Link (includes Weekly Scrum Report and XP Core Values Analysis):
https://github.com/gopinathsjsu/team-project-goteam202/blob/main/GoTeam202_ProjectJournal.pdf

### Team’s Jira sprint sheet and Project Board link (including Scrum Backlog, Stories, Task Board, and Sprint Burndown Chart):
https://sjsu-manojkotteda.atlassian.net/jira/software/projects/GOT/boards/3/timeline 

### UI Wireframes Link:
https://github.com/gopinathsjsu/team-project-goteam202/blob/main/UI_Wireframe.pdf
	
### UML Diagram:
![alt text](https://github.com/gopinathsjsu/team-project-goteam202/blob/main/LMS_UML_diagram.png)

### Component Diagram:
![alt text](https://github.com/gopinathsjsu/team-project-goteam202/blob/main/Component_Diagram.jpg)

### Design decisions:
**Backed:** 
- H2 in memory db is used to save resources on azure cloud.
- JPA and hibernate ORM is used to preserve entity relationships within code and prevent manual SQL scripts. Which allowed us switch between different DBs like H2 and Azure SQL
- JWT is used for security to make the connections between frontend and backend stateless
- Intellij Azure plugin is used for deploying locally built jars to Azure Spring Container (github actions for CI/CD were not accessible to us due to permissions).

**Front-End:**
- React.Js
- Bootstrap

*Tech Stack Selection:*
React: Chosen for building a modern, responsive UI. It offers a component-based architecture, Virtual DOM for efficient rendering, and rich ecosystem support.

*Component Architecture:*
Separation of Concerns: Each major feature is encapsulated in its own component or set of components, fostering modularity and reusability.
State Management: State management in the LMS front end involves using the Context API and Reducer for lightweight, hierarchical state sharing across various components.

*Data Fetching and Error Handling:*
Axios: For API requests with error handling and interceptors.
Error Boundaries: Catch JavaScript errors in the component tree.


### Feature Set:
 - Admin, Faculty, and Student roles sign up and login
 - Login authorization and verification
 - implemented required functionalities of Faculty, Student, and Admin roles

