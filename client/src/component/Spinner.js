import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = () => (
  <div className="spinner">
    <HashLoader color={"#1eaedb"} size={30} margin={"3px"} />
  </div>
);

export default Spinner;
