import Cards from "./component/Cards";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import AddMovie from "./component/AddMovie";
import Detail from "./component/Detail";
import { createContext, useState } from "react";
import Login from "./component/Login";
import Signup from "./component/Signup";
const AppState = createContext()
function App() {
  const [login, setLogin] = useState(false)
  const [userName, setUserName] = useState("")


  return (
    <div>
      <AppState.Provider value={{ login, userName, setLogin, setUserName }}>
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AppState.Provider>

    </div>
  );
}

export default App;
export { AppState };
