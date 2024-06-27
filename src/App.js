import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './pages/Form';
import Characters from './pages/Characters';
import CharacterDetails from './pages/CharactersDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/Characters" element={<Characters />} />
                <Route path="/CharacterDetails/:id" element={<CharacterDetails />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
