import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exist" element={<Home />} />
    </Routes>
  );
}

export default App;
