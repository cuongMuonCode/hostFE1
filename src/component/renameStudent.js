import React, { useState } from 'react';
import axios from 'axios';

function UpdateStudentName() {
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [information, setInformation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === 'studentId') {
            setStudentId(value);
        } else if (id === 'name') {
            setName(value);
        }
    };

    const handleUpdateName = async () => {
        setIsLoading(true);

        try {
            const response = await axios.put(`http://localhost:8080/Admin/updateStudent/rename`, null, {
                params: {
                    studentId: studentId,
                    name: name
                }
            });

            setInformation(response.data);
        } catch (error) {
            console.error("Error updating student name:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setInformation({ message: error.response.data.message });
            } else {
                setInformation({ message: 'Error updating student name. Please try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Update Student Name</h2>
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
                <label htmlFor="name">New Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={handleInputChange} 
                />
            </div>
            <button onClick={handleUpdateName} disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Name'}
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

export default UpdateStudentName;
