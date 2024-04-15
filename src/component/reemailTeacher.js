import React, { useState } from 'react';
import axios from 'axios';

function UpdateTeacherEmail() {
    const [teacherId, setTeacherId] = useState('');
    const [email, setEmail] = useState('');
    const [information, setInformation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === 'teacherId') {
            setTeacherId(value);
        } else if (id === 'email') {
            setEmail(value);
        }
    };

    const handleUpdateEmail = async () => {
        setIsLoading(true);

        try {
            const response = await axios.put(`http://localhost:8080/Admin/updateTeacher/reemail`, null, {
                params: {
                    teacherId: teacherId,
                    email: email
                }
            });

            setInformation(response.data);
        } catch (error) {
            console.error("Error updating teacher email:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setInformation({ message: error.response.data.message });
            } else {
                setInformation({ message: 'Error updating teacher email. Please try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Update Teacher Email</h2>
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
                <label htmlFor="email">New Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={handleInputChange} 
                />
            </div>
            <button onClick={handleUpdateEmail} disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Email'}
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

export default UpdateTeacherEmail;
