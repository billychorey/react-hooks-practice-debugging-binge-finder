import React from "react";
import { Input } from "semantic-ui-react";

function Search(props) {
  function passSearchTerm(e) {
    props.handleSearch(e.target.value);
  }

  return (
    <div>
      <Input
        type="text"
        placeholder="Search"
        onChange={passSearchTerm}
        value={props.search}
      />
    </div>
  );
}

export default Search;