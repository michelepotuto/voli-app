import React from "react";
import { useEffect, useState } from "react";
import useFirebase from "../logic/use-firebase";
import FilterForm from "../logic/FilterForm";
import Flights from "../components/pages/Flights";

const stringComparer = (s1, s2) => s1.toLowerCase().includes(s2.toLowerCase());

const Home = () => {
  const [dbFlights, setDbFlights] = useState([]);
  const firebaseURLProduct =
    "https://voli-app-ebe0b-default-rtdb.europe-west1.firebasedatabase.app/flights.json";
  const { readFirebase, isLoading } = useFirebase();
  const [showTickets, setShowTickets] = useState(false);
  const [filterMenu, setFilterMenu] = useState([]);

  useEffect(() => {
    updateProductsFetch();
  }, []);

  const updateProductsFetch = async () => {
    const answer = await readFirebase(firebaseURLProduct);
    const risposta = [];
    //put the answer in an array and save it in the state List
    for (const p in answer) {
      risposta.push({
        departure: answer[p].departure,
        arrival: answer[p].arrival,
        date: answer[p].date,
        time: answer[p].time,
      });
    }
    setDbFlights(risposta);
  };

  console.log(dbFlights);

  const filterHandler = (filterDeparture, filterArrivals, filterDate) => {
    setFilterMenu(
      dbFlights.filter(
        (m) =>
          (!filterDeparture || stringComparer(m.departure, filterDeparture)) &&
          (!filterArrivals || stringComparer(m.arrival, filterArrivals)) &&
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
