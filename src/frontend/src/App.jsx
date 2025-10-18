import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/*<Route path="/login" element={<LoginPage />} />*/}
        {/*<Route path="/signup" element={<SignupPage />} />*/}
        {/*<Route path="/confirm_otp" element={<ConfirmOTPPage />} />*/}
        {/*<Route path="/settings" element={<SettingPage />} />*/}
        {/*<Route path="/post" element={<CreatePostPage />} />// create*/}
        {/*<Route path="/post/:id" element={<PostPage />} />*/}
        {/*<Route path="/repost/:id" element={<RepostPage />} />*/}
        {/*<Route path="/notebook" element={<NotebookPage />} />*/}
        {/*<Route path="/question" element={QuestionPage />} />*/}
        {/*<Route path="/search" element={<SearchPage />} />*/}
        {/*<Route path="/cook" element={<CookPage />} /> step by step*/}
        {/*<Route path="/analytics" element={<AnalyticsPage />} />*/}
        {/*<Route path="/ai" element={<AIPage />} />*/}
      </Routes>
    </BrowserRouter>
  )
}

export default App
