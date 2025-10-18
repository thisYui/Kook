import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/*<Route element={<AuthLayout />}>*/}
          {/*    /!*<Route path="/login" element={<LoginPage />} />*!/*/}
          {/*    /!*<Route path="/signup" element={<SignupPage />} />*!/*/}
          {/*    /!*<Route path="/confirm_otp" element={<ConfirmOTPPage />} />*!/*/}
          {/*</Route>*/}

          {/*<Route element={<MainLayout />}>*/}
          {/*    /!*<Route path="/settings" element={<SettingPage />} />*!/*/}
          {/*    /!*<Route path="/post" element={<CreatePostPage />} />// create*!/*/}
          {/*    /!*<Route path="/post/:id" element={<PostPage />} />*!/*/}
          {/*    /!*<Route path="/repost/:id" element={<RepostPage />} />*!/*/}
          {/*    /!*<Route path="/notebook" element={<NotebookPage />} />*!/*/}
          {/*    /!*<Route path="/question" element={QuestionPage />} />*!/*/}
          {/*    /!*<Route path="/search" element={<SearchPage />} />*!/*/}
          {/*    /!*<Route path="/analytics" element={<AnalyticsPage />} />*!/*/}
          {/*    /!*<Route path="/ai" element={<AIPage />} />*!/*/}
          {/*    /!*<Route path="/" element={<IndexPage />} />*!/*/}
          {/*</Route>*/}

          {/*<Route element={<FullLayout />}>*/}
          {/*  /!*<Route path="/cook" element={<CookPage />} /> step by step*!/*/}
          {/*  /!*<Route path="*" element={<NotFoundPage />} />*!/*/}
          {/*</Route>*/}
      </Routes>
    </BrowserRouter>
  )
}

export default App
