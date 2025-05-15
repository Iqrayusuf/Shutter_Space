/*import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import SigninComponent from './components/SigninComponent';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<h1 style={{ color: 'white' }}>404 Not Found</h1>} />
                <Route path="/signin" element={<SigninComponent />} />

            </Routes>
        </Router>
    );
}

export default App;
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import SigninComponent from './components/SigninComponent';
import SocialMediaDashboard from './components/SocialMediaDashboard';
import EditProfileComponent from './components/EditProfileComponent';

function App() {
    return (
        <Router>
            <Routes>
                {/* ✅ Redirect root to /signin */}
                <Route path="/" element={<Navigate to="/signin" />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/signin" element={<SigninComponent />} />
                <Route path="/dashboard" element={<SocialMediaDashboard />} />
                 <Route path="/edit-profile" element={<EditProfileComponent />} />

                <Route path="*" element={<h1 style={{ color: 'white' }}>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
