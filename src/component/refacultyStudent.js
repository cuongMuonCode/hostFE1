import React, { useState } from 'react';
import axios from 'axios';

function UpdateStudentFaculty() {
    const [studentId, setStudentId] = useState('');
    const [faculty, setFaculty] = useState('');
    const [information, setInformation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === 'studentId') {
            setStudentId(value);
        } else if (id === 'faculty') {
            setFaculty(value);
        }
    };

    const handleUpdateFaculty = async () => {
        setIsLoading(true);

        try {
            const response = await axios.put(`http://localhost:8080/Admin/updateStudent/refalcuty`, null, {
                params: {
                    studentId: studentId,
                    faculty: faculty
                }
            });

            setInformation(response.data);
        } catch (error) {
            console.error("Error updating student faculty:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setInformation({ message: error.response.data.message });
            } else {
                setInformation({ message: 'Error updating student faculty. Please try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Update Student Faculty</h2>
            <div>
                <label htmlFor="studentId">Student ID:</label>
                <input 
                    type="number" 
                    id="studentId" 
                    value={studentId} 
                    onChange={handleInputChange} 
                />
            </div>
            <div>
                <label htmlFor="faculty">New Faculty:</label>
                <input 
                    type="text" 
                    id="faculty" 
                    value={faculty} 
                    onChange={handleInputChange} 
                />
            </div>
            <button onClick={handleUpdateFaculty} disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Faculty'}
            </button>
            <div>
                {information && information.name && (
                    <>
                        <h3>Updated Student Information</h3>
                        <p>Name: {information.name}</p>
                        <p>Email: {information.email}</p>
                        <p>Faculty: {information.faculty}</p>
                    </>
                )}
                {information && information.message && <p>{information.message}</p>}
            </div>
        </div>
    );
}

export default UpdateStudentFaculty;
