import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux/es/exports";
import { counterActions, counterName } from "../../logic/counter-store";

const FlightsCard = (props) => {
  const { id, departure, arrival, date, time, price, quantity } = props;

  const dispatch = useDispatch();

  const ticket = { ...props };

  const addToCartHandler = () => {
    dispatch({ type: counterActions.INCREMENT });

    if (
      !sessionStorage.getItem(counterName.CART) ||
      parseInt(sessionStorage.getItem(counterName.COUNT)) === 0
    ) {
      ticket.cartQuantity = 1;
      sessionStorage.setItem(counterName.CART, JSON.stringify(props));
    } else {
      const search = JSON.parse(
        "[" + sessionStorage.getItem(counterName.CART) + "]"
      );
      const index = search.findIndex((i) => {
        return i.id === id;
      });

      if (index !== -1) {
        if (search[index].cartQuantity < search[index].quantity) {
          //if there are enough product in store
          //increase quantity
          search[index].cartQuantity++;
          //increment cart count
        } else {
          // can't add more of this product
          alert("Hai raggiunto il limite di quantità per questo prodotto");
        }
        sessionStorage.setItem(
          counterName.CART,
          JSON.stringify(search).replace("[", "").replace("]", "")
        );
      } else {
        const storageCart = [
          sessionStorage.getItem(counterName.CART),
          JSON.stringify(props),
        ];
        sessionStorage.setItem(counterName.CART, storageCart);
      }
    }

    const prev = parseInt(sessionStorage.getItem(counterName.COUNT)) + 1;
    sessionStorage.setItem(counterName.COUNT, prev);

    let count = 0;
    JSON.parse("[" + sessionStorage.getItem(counterName.CART) + "]").map(
      (props) => {
        count += props.price * props.cartQuantity;
      }
    );
    sessionStorage.setItem(counterName.TOTAL, count);
    //update

    dispatch({ type: counterActions.UPDATE });
  };

  return (
    <Card className="container-arrivalscard text-center">
      <Card.Body>
        <Card.Title>{departure}</Card.Title>
        <Card.Text>{arrival}</Card.Text>
        <Card.Text>Data: {date}</Card.Text>
        <Card.Text>Prezzo: {price}€</Card.Text>
        <Card.Text>Ore: {time}</Card.Text>

        <br></br>

        <Card.Footer className="text-muted">
          Posti rimasti: {quantity}
        </Card.Footer>
      </Card.Body>

      <button
        className="rimuovi-cart"
        onClick={() => {
          addToCartHandler();
        }}
      >
        Aggiungi al carrello
      </button>
    </Card>
  );
};

export default FlightsCard;
