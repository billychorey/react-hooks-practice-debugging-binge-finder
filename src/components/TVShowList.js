import React from "react";
import { Grid } from "semantic-ui-react";
import TvShow from "./TVShow"

function TVShowList(props) {
  function mapAllShows() {
    if (!!props.searchTerm) {
      props.shows.map((s) => {
        if (s.name.toLowerCase().includes(props.searchTerm)) {
          <TvShow show={s} key={s.id} selectShow={props.selectShow} />;
        }
      });
    }
    return props.shows.map((s) => (
      <TvShow show={s} key={s.id} selectShow={props.selectShow} />
    ));
  }

  return (
    <div className="TVShowList">
      <Grid>{mapAllShows()}</Grid>
    </div>
  );
}

export default TVShowList;
