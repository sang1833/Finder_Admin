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
  const token = localStorage.getItem('user');

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="w-full h-full">
          <Routes>
            <Route path="/dashboard/chat" element={token ? <ChatPage /> : <Navigate to={'/'} />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}
