import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react'

import Main from './components/Main'
import Login from './components/Login'
import Signup from './components/Signup'
import Student from './components/Student'
import Error from './components/Error'
import Authenticate from './components/Authenticate';

function App() {

  const [secret,setSecret] = React.useState('')

  return (
    <Router>
      <div className="app">
        <br />
        <Routes>
          <Route path = "/" exact element={<Authenticate setSecret={setSecret} />} />
          <Route path = "/main" element={<Main />} />
          <Route path = "/sign-up" element={<Signup secret={secret}/>} />
          <Route path = "/log-in" element={<Login secret={secret}/>} />
          <Route path = "/:username" element={<Student secret={secret}/>} />
          <Route path = '/error' element={<Error />} />
          <Route path = '*' element={<Error />} />
        </Routes>
      </div> 
    </Router>
  );
}

export default App;
