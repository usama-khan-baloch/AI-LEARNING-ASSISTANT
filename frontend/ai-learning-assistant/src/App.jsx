import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import DashBoardPage from './pages/DashBoard/DashBoardPage';
import DocumentListPage from './pages/documents/DocumentListPage';
import DocumentsDetailPage from './pages/documents/DocumentsDetailPage';
import FlashCardListPage from './pages/Flashcards/FlashCardListPage';
import FlashCardPage from './pages/Flashcards/FlashCardPage';
import QuizeTakePage from './pages/Quizzes/QuizeTakePage';
import ProfilePage from './pages/Profile/ProfilePage';
import ProtectedRoute from './components/auth/ProtectedRoute';

const App = () => {
  
  const isAuthenticated = false;
  const loading = false;

  if(loading) {
    return( <div className='flex item-center justify-center h-screen'>
      <p>Loading...</p>
    </div>
    )
  }

  return(
    <Router>
      <Routes>
       <Route 
       path="/" 
       element={isAuthenticated ? <Navigate to="/dashboard" replace/> : <Navigate to="/login" replace/>}
       />
       <Route 
       path="/login"
       element={<LoginPage/>}
       />
       <Route
       path="/register"
       element={<RegisterPage/>}
       />

       {/* protected routes */}
       <Route element={<ProtectedRoute/>}>
         <Route path='/dashboard' element={<DashBoardPage/>}/>
         <Route path='/documents' element={<DocumentListPage/>}/>
         <Route path='/documents/:id' element={<DocumentsDetailPage/>}/>
         <Route path='/flashcards' element={<FlashCardListPage/>}/>
         <Route path='/documents/:id/flashcards' element={<FlashCardPage/>}/>
         <Route path='/quizzes/:quizeId' element={<QuizeTakePage/>}/>
         <Route path='/profile' element={<ProfilePage/>}/>
       </Route>
       <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  )
}

export default App