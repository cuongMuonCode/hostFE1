import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentAvgGPA = ({ studentId }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch student data by ID
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/student/${studentId}/AVG`);
        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {student ? (
        <div>
          <h2>Student GPA: {student}</h2>
        </div>
      ) : (
        <p>No student found</p>
      )}
    </div>
  );
};
export default StudentAvgGPA;

