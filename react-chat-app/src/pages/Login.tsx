// src/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Gửi yêu cầu đăng nhập tới server
    try {
      const response = await fetch('http://localhost:5001/api/v1/auths/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.data.accessToken);
        navigate('/chat');
      } else {
        setError(data.message || 'Đăng nhập sai');
      }
    } catch (error) {
      setError('Không thể kết nối đến server');
    }
  };

  return (
    <div className="flex h-full w-full">
      <div className="mx-auto mt-20 bg-slate-300 w-[400px] px-8 py-4 rounded-md">
        <h2 className="font-bold text-center text-[20px] mb-4">Đăng nhập</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div className="flex">
            <p className="w-[80px]">Email:</p>
            <input
              className="outline-none px-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex">
            <p className="w-[80px]">Password:</p>
            <input
              className="outline-none px-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="py-1 mt-3 rounded-sm bg-[#2A477F] text-white">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
