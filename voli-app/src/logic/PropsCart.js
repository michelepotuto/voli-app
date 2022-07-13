import React, { useEffect, useState } from "react";
import Cart from "../components/Cart";

import { useDispatch, useSelector } from "react-redux";
import { counterActions, counterName } from "./counter-store";
import { Link } from "react-router-dom";

const PropsCart = () => {
  const cartItems = useSelector((state) => state.cartArray);
  const dispatch = useDispatch();
  const total = useSelector((store) => store.total);
  const count = useSelector((store) => store.count);

  useEffect(() => {
    dispatch({ type: counterActions.UPDATE });
  }, []);

  // nell' array delle dependancy inserisco le variabili che non sono dichiarate all' interno
  // della funzione si useEffect

  const emptyCart = () => {
    //remove all the item in the cart and set 0 to the count
    sessionStorage.setItem(counterName.COUNT, 0);
    sessionStorage.removeItem(counterName.CART);
    dispatch({ type: counterActions.UPDATE }); //refresh the cart
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
          {cartItems.map((c, key) => (
            <Cart
              key={key}
              id={c.id}
              departure={c.departure}
              arrival={c.arrival}
              date={c.date}
              time={c.time}
              price={c.price}
              quantity={c.quantity}
              cartQuantity={c.cartQuantity}
            />
          ))}

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

export default PropsCart;
