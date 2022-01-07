import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import MemoryGame from "./components/MemoryGame/MemoryGame";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="play" element={<MemoryGame />} />
      </Routes>
    </div>
  );
}

export default App;
