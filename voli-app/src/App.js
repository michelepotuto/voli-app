import "./App.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./logic/auth-context";
import useFirebase from "./logic/use-firebase";
import Home from "./components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Nav } from "react-bootstrap";

function App() {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const [userData, setUserData] = useState({});
  const [input, setInput] = useState("");

  const firebaseURLProduct =
    "https://voli-app-ebe0b-default-rtdb.europe-west1.firebasedatabase.app/users.json";
  const { readFirebase } = useFirebase();

  useEffect(() => {
    databaseFetch();
  }, []);

  const databaseFetch = async () => {
    const answer = await readFirebase(firebaseURLProduct);
    const risposta = [];
    for (const p in answer) {
      risposta.push({
        name: answer[p].name,
        lastName: answer[p].lastName,
        clientCode: answer[p].clientCode,
      });
    }
    setUserData(risposta);
  };

  const usernameChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleSubmit = (event) => {
    const userCredentials = userData.find((p) => p.clientCode === input);
    const obj = { ...userCredentials };

    if (userCredentials) {
      ctx.login(obj);
      navigate("/*");
    } else {
      alert("codice errato");
    }
  };

  return (
    <>
      {!ctx.isLoggedIn ? (
        <div>
          <div className="container1">
            <Nav className="justify-content-flex-start" activeKey="/home">
              <Nav.Item>
                <button>
                  <i className="bi bi-facebook fs-4"></i>
                </button>
              </Nav.Item>
              <Nav.Item>
                <button>
                  <i className="bi bi-instagram fs-4"></i>
                </button>
              </Nav.Item>
              <Nav.Item>
                <button>
                  <i className="bi bi-twitter fs-4"></i>
                </button>
              </Nav.Item>
            </Nav>
            <div className="title h3"> Benvenuto in AIRLINE A SHOP</div>
            <Nav className="justify-content-end" activeKey="/home"></Nav>
          </div>

          <div className="login_container">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label>Codice cliente </label>
                <input
                  onChange={usernameChangeHandler}
                  type="password"
                  name="pass"
                  required
                />
              </div>
              <div className="button-container">
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <Navbar></Navbar>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<App />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
