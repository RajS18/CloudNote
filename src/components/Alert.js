import React from "react";

export default function Alert(props) {
  const capitalizeFirst = word => {
    return word[0].toUpperCase() + word.slice(1);
  };
  return(
    <div style={{ height: "65px" }}> 
      {props.alert != null ? (
    
      <div style={{ zIndex: "10px", opacity: "0.7" }}>
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show sticky-top`}
          role="alert"
        >
          <strong>{capitalizeFirst(props.alert.type)}</strong>!{" "}
          {props.alert.message}
        </div>
      </div>):null}
  </div>);
}
