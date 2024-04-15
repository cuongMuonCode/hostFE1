import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentALLGPA = ({ studentId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch all GPA courses by student ID
    const fetchAllGPA = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/student/${studentId}/allGPA`);
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAllGPA();
  }, [studentId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>All GPA Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Credits</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.courseName}</td>
              <td>{course.credits}</td>
              <td>{course.gpa }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentALLGPA;
