import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { counterActions, counterName } from "../logic/counter-store";

const Cart = (props) => {
  const { id, cartQuantity } = props;

  const search = JSON.parse(
    "[" + sessionStorage.getItem(counterName.CART) + "]"
  );

  const count = useSelector((store) => store.count);
 
  const dispatch = useDispatch();

  useEffect(() => {
    //get the items after rendering the component
    dispatch({ type: counterActions.UPDATE });
  }, []);



  const removeFromCart = () => {
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
    console.log(index);

    if (search[index].cartQuantity > 1) {
      search[index].cartQuantity--;
      sessionStorage.setItem(
        counterName.CART,
        JSON.stringify(search).replace("[", "").replace("]", "")
      );
    } else {
      let newCart = search.filter((s) => s.id !== id);
      console.log(newCart);
      sessionStorage.setItem(
        counterName.CART,
        JSON.stringify(newCart).replace("[", "").replace("]", "")
      );
    }

    let count = 0;
    JSON.parse("[" + sessionStorage.getItem(counterName.CART) + "]").map(
      (props) => {
        count += props.price * cartQuantity;
      }
    );
    sessionStorage.setItem(counterName.TOTAL, count);

    dispatch({ type: counterActions.UPDATE });
  };

  return (
    <>
      
   
        <div>
          <div>
            <Card className="container-card text-center">
              <Card.Body>
                <Card.Title>{props.departure}</Card.Title>
                <Card.Text className="card-text">{props.arrival}</Card.Text>
                <Card.Text>
                  Data: {props.data}
                  <br></br>
                  Price: {props.price}$
                </Card.Text>
                <Card.Footer className="text-muted">{props.id}</Card.Footer>
              </Card.Body>

              <button className="rimuovi-cart" onClick={removeFromCart}>
                Rimuovi
              </button>
            </Card>
            
          </div>
        </div>
      
    </>
  );
};

export default Cart;
