import React from "react";
import Ticket from "./Ticket";

const CategoryList = ({ groupedData }) => {
  // Check if groupedData is truthy, otherwise use an empty object
  const categories = groupedData ? Object.entries(groupedData) : [];

  return (
    <div className="category-container">
      {categories.map(([key, group]) => (
        <div className={`category ${key}`} key={key}>
          <h2>{key}</h2>
          <ul>
            {group.map((item) => (
              <Ticket key={item.id} item={item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
