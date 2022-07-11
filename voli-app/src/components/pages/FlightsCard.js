import React from "react";
import { Card } from "react-bootstrap";

const FlightsCard = (props) => {
  const { departure, arrival, date, time, price, quantity } = props;

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
        //   onClick={() => {
        //     addToCartHandler();
        //   }}
      >
        Aggiungi al carrello
      </button>
    </Card>
  );
};

export default FlightsCard;
