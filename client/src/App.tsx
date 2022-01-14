import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './styles/layout.css';

import Chat from './views/Chat';
import EnterName from "./views/EnterName";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterName />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
