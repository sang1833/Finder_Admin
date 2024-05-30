import * as React from 'react';
import FakeHeader from './components/FakeHeader';
import FakeSideBar from './components/FakeSideBar';
import ChatPage from './pages/ChatPage';
import './index.css';

export function App() {
  return (
    <div className="h-screen w-screen flex justify-between">
      <FakeSideBar />
      <div className="flex flex-col w-full">
        <FakeHeader />
        <ChatPage />
      </div>
    </div>
  );
}
