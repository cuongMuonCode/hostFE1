import React, { useState } from 'react';
import axios from 'axios';

function DeleteStudent() {
    const [studentId, setStudentId] = useState('');
    const [information, setInformation] = useState(null);

    const handleInputChange = (event) => {
        setStudentId(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/Admin/deleteStudent/${studentId}`);
            setInformation(response.data);
        } catch (error) {
            console.error("Error deleting student:", error);
            setInformation({ message: 'Error deleting student. Please try again.' });
        }
    };

    return (
        <div>
            <h2>Delete Student</h2>
            <div>
                <label htmlFor="studentId">Student ID:</label>
                <input 
                    type="number" 
                    id="studentId" 
                    value={studentId} 
                    onChange={handleInputChange} 
                />
            </div>
            <button onClick={handleSubmit}>Delete Student</button>
            <div>
                {information && information.message && <p>{information.message}</p>}
                {information && information.name && (
                    <>
                        <h3>Deleted Student Information</h3>
                        <p>ID: {studentId}</p>
                        <p>Name: {information.name}</p>
                        <p>Email: {information.email}</p>
                        <p>Faculty: {information.faculty}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default DeleteStudent;
