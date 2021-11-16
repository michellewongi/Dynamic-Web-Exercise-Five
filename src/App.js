import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// Pages import
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";

function App() {
  return (
    // fragment bc React only allows you to return a single element
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
