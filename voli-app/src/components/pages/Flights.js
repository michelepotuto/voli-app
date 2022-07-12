import { useEffect, useState } from "react";
import useFirebase from "../../logic/use-firebase";
import FlightsCard from "./FlightsCard";

const Flights = () => {
  const [dbFlights, setDbFlights] = useState([]);
  const firebaseURLProduct =
    "https://voli-app-ebe0b-default-rtdb.europe-west1.firebasedatabase.app/flights.json";
  const { readFirebase, isLoading } = useFirebase();

  useEffect(() => {
    updateProductsFetch();
  }, []);

  const updateProductsFetch = async () => {
    const answer = await readFirebase(firebaseURLProduct);
    const risposta = [];
    //put the answer in an array and save it in the state List
    for (const p in answer) {
      risposta.push({
        id: p,
        departure: answer[p].departure,
        arrival: answer[p].arrival,
        date: answer[p].date,
        time: answer[p].time,
        price: answer[p].price,
        quantity: answer[p].quantity,
        cartQuantity: answer[p].cartQuantity,
      });
    }
    setDbFlights(risposta);
  };
  return (
    <>
      {dbFlights.map((ticketsItem, key) => (
        <FlightsCard
          key={key}
          id={ticketsItem.id}
          departure={ticketsItem.departure}
          arrival={ticketsItem.arrival}
          date={ticketsItem.date}
          time={ticketsItem.time}
          price={ticketsItem.price}
          quantity={ticketsItem.quantity}
          cartQuantity={ticketsItem.cartQuantity}
        />
      ))}
    </>
  );
};

export default Flights;
