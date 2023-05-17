import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<HomePage/>}/>
        <Route path="/login" element= {<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App