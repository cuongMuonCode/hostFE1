import React, { useState } from "react";
import StudentDetail from "../../components/studentDetail";
import { useLocation } from "react-router-dom";
import StudentALLGPA from "../../components/studentAllGPA";
import StudentAvgGPA from "../../components/studentGPA";

const StudentInfo = () => {
    const location = useLocation();
    const pathParts = location.pathname.split("/"); 
    const studentId = pathParts[pathParts.length - 1]; 

    const [displayedInfo, setDisplayedInfo] = useState('detail'); // Sử dụng state để lưu trữ thông tin đang hiển thị

    const handleDetailClick = () => {
        setDisplayedInfo('detail');
    };

    const handleAvgGPAClick = () => {
        setDisplayedInfo('avgGPA');
    };

    const handleAllGPAClick = () => {
        setDisplayedInfo('allGPA');
    };
    
    let displayComponent;
    if (displayedInfo === 'detail') {
        displayComponent = <StudentDetail studentId={studentId}/>;
    } else if (displayedInfo === 'avgGPA') {
        displayComponent = <StudentAvgGPA studentId={studentId}/>;
    } else if (displayedInfo === 'allGPA') {
        displayComponent = <StudentALLGPA studentId={studentId}/>;
    }

    return ( 
        <div>
            <button onClick={handleDetailClick}>Show Detail</button>
            <button onClick={handleAvgGPAClick}>Show Avg GPA</button>
            <button onClick={handleAllGPAClick}>Show All GPA</button>
            {displayComponent}
        </div>
    );
}

export default StudentInfo;
