import React, { useState } from 'react';
import axios from 'axios';

function UpdateTeacherFaculty() {
    const [teacherId, setTeacherId] = useState('');
    const [faculty, setFaculty] = useState('');
    const [information, setInformation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === 'teacherId') {
            setTeacherId(value);
        } else if (id === 'faculty') {
            setFaculty(value);
        }
    };

    const handleUpdateFaculty = async () => {
        setIsLoading(true);

        try {
            const response = await axios.put(`http://localhost:8080/Admin/updateTeacher/refalcuty`, null, {
                params: {
                    teacherId: teacherId,
                    faculty: faculty
                }
            });

            setInformation(response.data);
        } catch (error) {
            console.error("Error updating teacher faculty:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setInformation({ message: error.response.data.message });
            } else {
                setInformation({ message: 'Error updating teacher faculty. Please try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Update Teacher Faculty</h2>
            <div>
                <label htmlFor="teacherId">Teacher ID:</label>
                <input 
                    type="number" 
                    id="teacherId" 
                    value={teacherId} 
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
                        <h3>Updated Teacher Information</h3>
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

export default UpdateTeacherFaculty;
