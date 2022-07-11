import "./App.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./logic/auth-context";
import useFirebase from "./logic/use-firebase";
import Home from "./components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const [input, setInput] = useState("");
  const [list, setList] = useState({});

  const firebaseURLProduct =
    "https://voli-app-ebe0b-default-rtdb.europe-west1.firebasedatabase.app/users.json";
  const { readFirebase } = useFirebase();

  useEffect(() => {
    updateProductsFetch();
  }, []);

  const updateProductsFetch = async () => {
    const answer = await readFirebase(firebaseURLProduct);
    const risposta = [];
    for (const p in answer) {
      risposta.push({
        name: answer[p].name,
        lastName: answer[p].lastName,
        clientCode: answer[p].clientCode,
      });
    }
    setList(risposta);
  };

  const usernameChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleSubmit = (event) => {
    const userData = list.find((p) => p.clientCode === input);
    const obj = { ...userData };

    if (userData) {
      ctx.login(obj);
      navigate("/*");
    } else {
      alert("codice errato");
    }
  };

  return (
    <>
      {!ctx.isLoggedIn ? (
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
      ) : (
        <div>
          <Navbar></Navbar>
          <Routes>
            <Route path="/*" element={<Home />} />
            {/* <Route path="/prodotti" element={<Prodotti />} />
          <Route path="/dettaglio" element={<ProdottoDettagliato />} />
          <Route path="/carrello" element={<Carrello />} /> */}
            <Route path="*" element={<App />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
