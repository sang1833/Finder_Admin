import * as React from 'react';
import FakeHeader from './components/FakeHeader';
import FakeSideBar from './components/FakeSideBar';
import ChatPage from './pages/ChatPage';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';

export function App() {
  const token = localStorage.getItem('accessToken');

  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/chat" element={token ? <ChatApp /> : <Navigate to={'/'} />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

const ChatApp = () => {
  return (
    <div className="h-screen w-screen flex justify-between">
      <FakeSideBar />
      <div className="flex flex-col w-full">
        <FakeHeader />
        <ChatPage />
      </div>
    </div>
  );
};

const NotFound = () => {
  return <div className="font-bold text-[20px]"> Sorry, page not found</div>;
};
