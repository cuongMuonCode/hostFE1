import React, { useState } from 'react';
import axios from 'axios';

function GetClassroom() {
    const [classId, setClassId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [classRoom, setClassRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        switch (id) {
            case 'classId':
                setClassId(value);
                break;
            case 'courseId':
                setCourseId(value);
                break;
            default:
                break;
        }
    };

    const handleGetClassRoom = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get(`http://localhost:8080/Admin/getClassRoom`, {
                params: {
                    courseId: courseId,
                    classId: classId
                }
            });

            setClassRoom(response.data);
        } catch (error) {
            console.error("Error fetching class room:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Error fetching class room. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Get Class Room</h2>
            <div>
                <label htmlFor="courseId">Course ID:</label>
                <input 
                    type="text" 
                    id="courseId" 
                    value={courseId} 
                    onChange={handleInputChange} 
                />
            </div>
            <div>
                <label htmlFor="classId">Class ID:</label>
                <input 
                    type="text" 
                    id="classId" 
                    value={classId} 
                    onChange={handleInputChange} 
                />
            </div>
            <button onClick={handleGetClassRoom} disabled={isLoading}>
                {isLoading ? 'Fetching...' : 'Get Class Room'}
            </button>
            <div>
                {classRoom && (
                    <>
                        <h3>Class Room Information</h3>
                        <p>Class ID: {classRoom.classId}</p>
                        <p>Course ID: {classRoom.courseId}</p>
                        <p>Day: {classRoom.day}</p>
                        <p>Shift: {classRoom.shift}</p>
                    </>
                )}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default GetClassroom;
