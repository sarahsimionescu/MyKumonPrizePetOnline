import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from './components/Main'
import Login from './components/Login'
import Signup from './components/Signup'
import Student from './components/Student'
import Error from './components/Error'

function App() {

  return (
    <Router>
      <div className="app">
        <br />
        <Routes>
          <Route path = "/" exact element={<Main />} />
          <Route path = "/sign-up" element={<Signup/>} />
          <Route path = "/log-in" element={<Login/>} />
          <Route path = "/:username" element={<Student />} />
          <Route path = '/error' element={<Error />} />
          <Route path = '*' element={<Error />} />
        </Routes>
      </div> 
    </Router>
  );
}

export default App;
