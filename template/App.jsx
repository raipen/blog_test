import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Main from './page/Main';

const App = () => {
    return (
        <div className="App">
            <Link to="/">메인</Link>
            <Link to="/about">소개</Link>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<div>소개</div>} />
            </Routes>
        </div>
    );
}

export default App;