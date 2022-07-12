import React from "react";

const NavLogin = () => {
  return (
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
        <div className="title h3"> Benvenuto in TICKET SHOP TEAM A</div>
        <Nav className="justify-content-end" activeKey="/home"></Nav>
      </div>
    </div>
  );
};

export default NavLogin;
