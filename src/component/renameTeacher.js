import React, { useState } from 'react';
import axios from 'axios';

function UpdateTeacherName() {
    const [teacherId, setTeacherId] = useState('');
    const [name, setName] = useState('');
    const [information, setInformation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === 'teacherId') {
            setTeacherId(value);
        } else if (id === 'name') {
            setName(value);
        }
    };

    const handleUpdateName = async () => {
        setIsLoading(true);

        try {
            const response = await axios.put(`http://localhost:8080/Admin/updateTeacher/rename`, null, {
                params: {
                    teacherId: teacherId,
                    name: name
                }
            });

            setInformation(response.data);
        } catch (error) {
            console.error("Error updating teacher name:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setInformation({ message: error.response.data.message });
            } else {
                setInformation({ message: 'Error updating teacher name. Please try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Update Teacher Name</h2>
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

export default UpdateTeacherName;
