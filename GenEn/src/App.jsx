import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Consumer from "./pages/consumer"

function App() {
  // <Route path="/" element={<Home />}></Route>
  // <Route path="/about" element={<About />}></Route>

  return (
    <Routes>
      <Route path="/solar-calculator" element={<Consumer />}></Route>
      <Route path="*" element={<Home />}></Route>
    </Routes>
  )
}

export default App
