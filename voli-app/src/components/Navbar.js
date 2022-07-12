import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../logic/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../logic/counter-store";

const Navbar = () => {
  const ctx = useContext(AuthContext);
  const count = useSelector((store) => store.count);

  const dispatch = useDispatch();
  // const count = useSelector((store) => store.count);

  useEffect(() => {dispatch({ type: counterActions.UPDATE })}, []);

  return (
    <div>
      <>
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
          <div className="title h3"> PRENOTA IL TUO BIGLIETTO!</div>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
              <Nav.Link as={Link} onClick={ctx.logout} to="/login">
                Logout
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/home">
                Biglietti
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/cart" className="nav-cart">
                CARRELLO ({count})
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </>
    </div>
  );
};

export default Navbar;
