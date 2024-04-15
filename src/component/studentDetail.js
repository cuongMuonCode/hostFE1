// StudentDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDetail = ({ studentId }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch student data by ID
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/student/${studentId}`);
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
          <h2>ID: {student.informationId}</h2>
          <p> Name:{student.name}  </p>
          <p>Email: {student.email}</p>
           <p>Faculty:{student.faculty}  </p>
        </div>
      ) : (
        <p>No student found</p>
      )}
    </div>
  );
};

export default StudentDetail;
