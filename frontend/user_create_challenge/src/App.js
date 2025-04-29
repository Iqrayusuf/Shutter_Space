import './App.css';
import ListUser_challenge from './components/ListUser_challenge';
import UserChallenge from './components/user_challenge';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route path='/' element={<UserChallenge />} />
        
        {/* Route for submitting and viewing user/admin challenges */}
        <Route path='/challenge' element={<ListUser_challenge />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
