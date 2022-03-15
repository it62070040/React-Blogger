import Home from "./home";
import { Routes, Route} from "react-router-dom";
import Navbar from "./navbar";
import Author from "./page/author";
import {Post} from "./page/post";
import {Detail} from "./page/detail"

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Post" element={<Post/>} />
        <Route path="/Post/:id" element={<Detail/>} />
        <Route path="/Author" element={<Author/>} />
      </Routes>
    </>
  );
}

export default App;
