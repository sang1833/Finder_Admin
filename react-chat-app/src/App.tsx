import * as React from 'react';
import FakeHeader from './components/FakeHeader';
import FakeSideBar from './components/FakeSideBar';
import ChatPage from './pages/ChatPage';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { ApolloProvider } from '@apollo/client';
import { client } from './configs/graphql';

export function App() {
  // const token = localStorage.getItem('accessToken');
  const token = localStorage.getItem('user');

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="">
          <Routes>
            <Route path="/dashboard/chat" element={token ? <ChatApp /> : <Navigate to={'/'} />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={token ? <ChatApp /> : <Navigate to={'/'} />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

const ChatApp = () => {
  return (
    <div className="h-screen w-screen flex justify-between">
      {/* <FakeSideBar /> */}
      <div className="flex flex-col w-full">
        {/* <FakeHeader /> */}
        <ChatPage />
      </div>
    </div>
  );
};

const NotFound = () => {
  return <div className="font-bold text-[20px]"> Sorry, page not found</div>;
};
