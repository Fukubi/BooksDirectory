import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { NewBook } from "./pages/NewBook"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new" element={<NewBook />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
