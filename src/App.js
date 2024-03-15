/*eslint-disable*/
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FindId from "./pages/find/FindId";
import FindPW from "./pages/find/FindPW";
import Login from "./pages/login/Login";

//회사 선택

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/user/FindID" element={<FindId />}></Route>
          <Route path="/user/FindPW" element={<FindPW />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
