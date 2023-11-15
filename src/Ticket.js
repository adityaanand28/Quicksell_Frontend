import React from "react";

const Ticket = ({ item }) => {
  return (
    <div className="ticket" key={item.id}>
      <p>{item.id}</p>
      <p>{item.title}</p>
      <p>{item.tag.join(", ")}</p>
    </div>
  );
};

export default Ticket;
