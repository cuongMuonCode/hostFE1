import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [studentId, setStudentId] = useState('');
  const [passWord, setPassWord] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
    const response = await axios.get(`/login?studentId=${studentId}&passWord=${passWord}`);

      
      if (response.data) {
        // Điều hướng hoặc thực hiện các hành động sau khi đăng nhập thành công
        console.log('Login successful');
      } else {
        console.error('Login failed: Incorrect studentId or passWord');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='container'>   
      <div className='input'>
        <form onSubmit={handleLogin}>
          <input 
            type="number" 
            placeholder='yourId' 
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)} 
          /> <br /> 
          <input 
            type="password" 
            placeholder='password' 
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)} 
          /> <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
