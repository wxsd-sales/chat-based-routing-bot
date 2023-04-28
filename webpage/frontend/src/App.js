import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Details from "./components/Details";
import EndPage from "./components/EndPage";
import EditDetails from "./components/EditDetails";
import Demo from "./components/Demo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/details" element={<Details />} />
        <Route path="/endpage" element={<EndPage />} />
        <Route path="/editdetails" element={<EditDetails />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </>
  );
}

export default App;
