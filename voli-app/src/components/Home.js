import React from "react";
import { useEffect, useState } from "react";
import useFirebase from "../logic/use-firebase";
import FilterForm from "../logic/FilterForm";
import Flights from "../components/pages/Flights";
import { useDispatch } from "react-redux";
import { counterActions } from "../logic/counter-store";

const stringComparer = (s1, s2) => s1.toLowerCase().includes(s2.toLowerCase());

const Home = () => {
  const [dbFlights, setDbFlights] = useState([]);
  const firebaseURLProduct =
    "https://voli-app-ebe0b-default-rtdb.europe-west1.firebasedatabase.app/flights.json";
  const { readFirebase, isLoading } = useFirebase();
  const [showTickets, setShowTickets] = useState(false);
  const [filterMenu, setFilterMenu] = useState([]);
  const dispatch = useDispatch();

  dispatch({ type: counterActions.START });

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
      });
    }
    setDbFlights(risposta);
  };

  const filterHandler = (filterDeparture, filterArrival, filterDate) => {
    setFilterMenu(
      dbFlights.filter(
        (m) =>
          (!filterDeparture || stringComparer(m.departure, filterDeparture)) &&
          (!filterArrival || stringComparer(m.arrival, filterArrival)) &&
          (!filterDate || stringComparer(m.date, filterDate))
      )
    );
    console.log();
    setShowTickets(true);
  };

  return (
    <>
      <FilterForm onFilter={filterHandler} />
      <div text="Menu"></div>
      {!showTickets && <Flights tickets={dbFlights} />}
      {showTickets && <Flights tickets={filterMenu} />}
    </>
  );
};

export default Home;
