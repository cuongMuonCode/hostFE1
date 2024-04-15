import React from "react";
// Importing Link from react-router-dom to 
// navigate to different end points.
import { Link } from "react-router-dom";
 
const Home = () => {
    return (
        <div>
            <h1>Login as</h1>
            <ul>
                <li>
                    <Link to="/student">Sinh vien</Link>
                </li>
                <li>
                    <Link to="/teacher">Giang vien</Link>
                </li>
                <li>
                    <Link to="/controller">Phong dao tao</Link>
                </li>
            </ul>
        </div>
    );
};
 
export default Home;