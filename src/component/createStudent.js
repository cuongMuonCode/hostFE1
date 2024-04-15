import React, { useState } from 'react';
import axios from 'axios';

const CreateStudentForm = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [faculty, setFaculty] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            id: parseInt(id),
            name: name,
            email: email,
            faculty: faculty
        };

        try {
            await axios.post('http://localhost:8080/Admin/createStudent', null, {
                params: requestData
            });
            alert('Student created successfully');
            // Reset form
            setId('');
            setName('');
            setEmail('');
            setFaculty('');
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status outside of the range of 2xx
                alert(`Failed to create student: ${error.response.data.message}`);
            } else if (error.request) {
                // The request was made but no response was received
                alert('Failed to create student: No response received from server');
            } else {
                // Something else happened while setting up the request
                alert('Failed to create student: An error occurred while sending the request');
            }
        }
    };

    return (
        <div>
            <h2>Create Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID:</label>
                    <input 
                        type="number" 
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Faculty:</label>
                    <input 
                        type="text" 
                        value={faculty} 
                        onChange={(e) => setFaculty(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateStudentForm;
