import './App.css';

// import StudentDetail from './component/studentDetail';
// import StudentAvgGPA from './component/studentGPA';
// import StudentALLGPA from './component/studentAllGPA';
import CreateStudentForm from './component/createStudent';
import StudentList from './component/deleteStudent';
import UpdateStudentName from './component/renameStudent';
import UpdateStudentEmail from './component/reemailStudent';
import CreateTeacherForm from './component/createTeacher';
import UpdateStudentFaculty from './component/refacultyStudent';
import UpdateTeacherName from './component/renameTeacher';
import DeleteTeacher from './component/deleteTecher';
import UpdateTeacherEmail from './component/reemailTeacher';
import UpdateTeacherFaculty from './component/refacultyTeacher';
import CreateClassroom from './component/createClassRoom';
import GetClassroom from './component/getClassRoom';

function App() {
  return (
    <>

        <CreateTeacherForm/>
        <DeleteTeacher/>
        <UpdateTeacherName/>
        <UpdateTeacherEmail/>
        <UpdateTeacherFaculty/>
              <CreateStudentForm />
              <StudentList />
              <UpdateStudentName />
              <UpdateStudentEmail />
              <UpdateStudentFaculty/>
              <CreateClassroom/>
              <GetClassroom/>

      {/* Các component khác */}
      {/* <CreateStudentForm/> */}
      {/* <StudentDetail studentId={1}/> */}
    </>
  );
}

export default App;



