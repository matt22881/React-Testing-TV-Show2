import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";
import fetchShow from './api/fetchShow'

import { formatSeasons } from "./utils/formatSeasons";

import Episodes from "./components/Episodes";
import "./styles.css";

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [ selectedSeason, setSelectedSeason ] = useState("");
  const [ isFetchingData, setIsFetchingData ] = useState(false);
  const [error, setError] = useState('')
  const episodes = seasons[selectedSeason] || [];

  useEffect(() => {
    setIsFetchingData(true);
    fetchShow()
      .then(res => {
        setIsFetchingData(false);
        setShow(res.data);
        setSeasons(formatSeasons(res.data._embedded.episodes));
      })
      .catch(err => {
        setIsFetchingData(false);
        setError(err.message);
      })    
}, [])

  const handleSelect = e => {
    setSelectedSeason(e.value);
  };

  if (!show || isFetchingData) {
    return (
      <>
        <h2>Fetching data...</h2>
        {error ? <h3>Error fetching data: {error}</h3> : <p></p>}
      </>
    )
    
  } else return (
    <div className="App">
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
      <Dropdown
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
      />
      <Episodes episodes={episodes} />
    </div>
  );
}
