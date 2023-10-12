import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import Adapter from "../Adapter";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";

function App() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [filterByRating, setFilterByRating] = useState("");

  useEffect(() => {
    try {
          Adapter.getShows().then((shows) => setShows(shows));

    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(shows)
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  function handleSearch(searchTerm) {
    console.log(searchTerm)
    setSearchTerm(searchTerm.toLowerCase());
    filterShows(searchTerm)
  }

 function filterShows(title) {
    const filteredShows = [];

    shows.filter((show) => {
      if (show.name === title) {
        filteredShows.push(show);
      }
      return null; // Returning null to satisfy the ESLint warning
    });

    console.log(filteredShows);
    return filteredShows;
  }
  function handleFilter(e) {
    e.target.value === "No Filter"
      ? setFilterByRating("")
      : setFilterByRating(e.target.value);
  }

  function selectShow(show) {
    Adapter.getShowEpisodes(show.id).then((episodes) => {
      setSelectedShow(show);
      setEpisodes(episodes);
    });
  }

  let displayShows = shows;
  if (filterByRating) {
    displayShows = displayShows.filter((show) => {
      return (
        show.rating.average >= filterByRating
      )
    });
  }

  //   Array.prototype.unique = function () {
  //   const arr = [];
  //   for (let i = 0; i < this.length; i++) {
  //     if (!arr.includes(this[i])) {
  //       arr.push(this[i]);
  //     }
  //   }
  //   return arr;
  // };

  return (
    <div>
      <Nav
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <Grid celled>
        <Grid.Column width={5}>
          {selectedShow ? (
            <SelectedShowContainer
              selectedShow={selectedShow}
              allEpisodes={episodes}
            />
          ) : (
            <div />
          )}
        </Grid.Column>
        <Grid.Column width={11}>
          <TVShowList
            shows={displayShows}
            selectShow={selectShow}
            searchTerm={searchTerm}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
