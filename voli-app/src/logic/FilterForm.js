import { useState } from "react";

const courseTypes = [
  "Milano Malpensa",
  "Torino Caselle",
  "Roma Fiumicino",
  "Milano Bergamo",
  "Bari Palese",
  "Napoli",
  "Catania",
];

const FilterForm = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    props.onFilter(filterDeparture, filterArrivals, filterDate);
  };

  const [filterDeparture, setFilterDeparture] = useState("");
  const departureChangeHandler = (event) => {
    setFilterDeparture(event.target.value);
  };

  const [filterArrivals, setFilterArrivals] = useState("");
  const arrivalsChangeHandler = (event) => {
    setFilterArrivals(event.target.value);
  };

  const [filterDate, setFilterDate] = useState("");
  const dateChangeHandler = (event) => {
    setFilterDate(event.target.value);
  };

  return (
    <>
      <form className="menu-form" onSubmit={submitHandler}>
        <div className="form-row">
          <div className="form-block">
            <label htmlFor="course">Partenza</label>
            <select name="course" onChange={departureChangeHandler}>
              <option value="">(Nessuna selezione)</option>
              {courseTypes.map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
          </div>

          <div className="form-block">
            <label htmlFor="course">Arrivo</label>
            <select name="course" onChange={arrivalsChangeHandler}>
              <option value="">(Nessuna selezione)</option>
              {courseTypes.map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
          </div>

          <div className="form-block">
            <label htmlFor="course">Data</label>
            <select name="course" onChange={dateChangeHandler}>
              <option value="">(Nessuna selezione)</option>
              {courseTypes.map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
          </div>

          <div className="form-block">
            <label htmlFor="course">Ora</label>
            <select name="course" onChange={dateChangeHandler}>
              <option value="">(Nessuna selezione)</option>
              {courseTypes.map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
          </div>

          <div className="form-block">
            <button type="submit">Filtra</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FilterForm;
