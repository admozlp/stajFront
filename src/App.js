import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import UpdateBook from "./layouts/UpdateBook";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";


function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route exact path="/" Component={Dashboard} />
        <Route exact path="/giris" Component={SignIn} />
        <Route exact path="/kayit" Component={SignUp } />
        <Route exact path="/addbook" Component={AddBook} />
        <Route exact path="/update/:id" Component={UpdateBook} />
      </Routes>
    </div>
  );
}
export default App;
