import React, { useState } from 'react';
import axios from 'axios';

function CreateClassroom() {
    const [classId, setClassId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [day, setDay] = useState('');
    const [shift, setShift] = useState('');
    const [information, setInformation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        switch (id) {
            case 'classId':
                setClassId(value);
                break;
            case 'courseId':
                setCourseId(value);
                break;
            case 'day':
                setDay(value);
                break;
            case 'shift':
                setShift(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const response = await axios.post(`http://localhost:8080/Admin/createClass`, null, {
                params: {
                    classId: classId,
                    courseId: courseId,
                    day: parseInt(day),
                    shift: parseInt(shift)
                }
            });

            setInformation(response.data);
        } catch (error) {
            console.error("Error creating classroom:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setInformation({ message: error.response.data.message });
            } else {
                setInformation({ message: 'Error creating classroom. Please try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Classroom</h2>
            <div>
                <label htmlFor="classId">Class ID:</label>
                <input 
                    type="text" 
                    id="classId" 
                    value={classId} 
                    onChange={handleInputChange} 
                />
            </div>
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
                <label htmlFor="day">Day:</label>
                <input 
                    type="number" 
                    id="day" 
                    value={day} 
                    onChange={handleInputChange} 
                />
            </div>
            <div>
                <label htmlFor="shift">Shift:</label>
                <input 
                    type="number" 
                    id="shift" 
                    value={shift} 
                    onChange={handleInputChange} 
                />
            </div>
            <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Classroom'}
            </button>
            <div>
                {information && information.classId && (
                    <>
                        <h3>Created Classroom Information</h3>
                        <p>Class ID: {information.classId}</p>
                        <p>Course ID: {information.courseId}</p>
                        <p>Day: {information.day}</p>
                        <p>Shift: {information.shift}</p>
                    </>
                )}
                {information && information.message && <p>{information.message}</p>}
            </div>
        </div>
    );
}

export default CreateClassroom;
