import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { counterActions, counterName } from "../logic/counter-store";

const Cart = (props) => {
  const search = JSON.parse(
    "[" + sessionStorage.getItem(counterName.CART) + "]"
  );

  const count = useSelector((store) => store.count);
  const total = useSelector((store) => store.total);
  const dispatch = useDispatch();

  useEffect(() => {
    //get the items after rendering the component
    dispatch({ type: counterActions.UPDATE });
  }, []);

  const emptyCart = () => {
    //remove all the item in the cart and set 0 to the count
    sessionStorage.setItem(counterName.COUNT, 0);
    sessionStorage.removeItem(counterName.CART);
    dispatch({ type: counterActions.UPDATE }); //refresh the cart
    console.log("reset cart");
  };

  const removeFromCart = () => {
    const { id, cartQuantity } = props;
    const ticket = { ...props };

    const newCount = parseInt(sessionStorage.getItem(counterName.COUNT));

    if (newCount === 0) {
      sessionStorage.removeItem(counterName.COUNT);
      sessionStorage.removeItem(counterName.CART);
      sessionStorage.removeItem(counterName.TOTAL);
    } else {
      sessionStorage.setItem(counterName.COUNT, newCount - 1);
    }
    const search = JSON.parse(
      "[" + sessionStorage.getItem(counterName.CART) + "]"
    );
    const index = search.findIndex(function (item) {
      return item.id === id;
    });
    if (search[index].cartQuantity > 1) {
      search[index].cartQuantity--;
      sessionStorage.setItem(
        counterName.CART,
        JSON.stringify(search).replace("[", "").replace("]", "")
      );
    } else {
      let newCart = search.filter((s) => s.id !== id);
      sessionStorage.setItem(
        counterName.CART,
        JSON.stringify(newCart).replace("[", "").replace("]", "")
      );
    }

    let count = 0;
    JSON.parse("[" + sessionStorage.getItem(counterName.CART) + "]").map(
      (props) => {
        count += props.price * props.cartQuantity;
      }
    );
    sessionStorage.setItem(counterName.TOTAL, count);

    dispatch({ type: counterActions.UPDATE });
  };

  return (
    <>
      {count === 0 ? (
        <div>
          <h1 className="text-center">Empty cart</h1>
          <div className="row align-items-center">
            <div className="col">
              <h2 className="text-center">
                <button className="inizia_spesa border border-1" to="/prodotti">
                  <Link to="/home">Prenota un biglietto</Link>
                </button>
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {search.map((p) => {
            return (
              <Card className="container-card text-center">
                <Card.Body>
                  <Card.Title>{p.departure}</Card.Title>
                  <Card.Text className="card-text">{p.arrival}</Card.Text>
                  <Card.Text>
                    Data: {p.data}
                    <br></br>
                    Price: {p.price}$
                  </Card.Text>
                  <Card.Footer className="text-muted">{p.id}</Card.Footer>
                </Card.Body>

                <button className="rimuovi-cart" onClick={removeFromCart}>
                  Rimuovi
                </button>
              </Card>
            );
          })}

          <div className="container_emptypay">
            <p className="m-4">TOTALE: {total}€</p>
            <p type="button" className="btn btn-info m-3" onClick={emptyCart}>
              SVUOTA CARRELLO
            </p>
            <p type="button" className="btn btn-info m-3">
              PAGAMENTO
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
