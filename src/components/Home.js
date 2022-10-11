import React from "react";

import Notes from "./Notes.js";

const Home = (props) => {
  return (
    <div>
      <div className="conatiner px-5">
        <Notes showAlert={props.showAlert}/>
      </div>
    </div>
  );
};

export default Home;
