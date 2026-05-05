import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Protected: React.FC = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
      } catch (error: any) {
        setMessage(error.response?.data?.detail || 'Access denied');
        navigate('/login');
      }
    };

    fetchProtectedData();
  }, [navigate]);

  return (
    <div className="protected">
      <h1>Protected Route</h1>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Protected;