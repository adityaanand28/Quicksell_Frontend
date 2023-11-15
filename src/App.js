import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
// import "./DisplayOptions.css";
import DisplayOptions from "./DisplayOptions";
import CategoryList from "./CategoryList";
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const App = () => {
  const [data, setData] = useState(null);
  const [groupedData, setGroupedData] = useState(null);
  const [groupBy, setGroupBy] = useState("status");
  const [sortCriteria, setSortCriteria] = useState("priority");
  const [displayOptionsVisible, setDisplayOptionsVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(API_URL);
        const responseData = response.data;
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const associatedData = associateTicketsWithUsers(data.tickets, data.users);
      const grouped = groupData(associatedData, groupBy);
      setGroupedData(grouped);
    }
  }, [data, groupBy]);

  useEffect(() => {
    if (groupedData) {
      const sorted = sortData(groupedData, sortCriteria);
      setGroupedData(sorted);
    }
  }, [sortCriteria, groupedData]);

  const associateTicketsWithUsers = (tickets, users) => {
    return tickets.map((ticket) => ({
      ...ticket,
      user: users.find((user) => user.id === ticket.userId),
    }));
  };

  const groupData = (data, groupBy) => {
    const grouped = data.reduce((acc, item) => {
      const key = groupBy === "user" ? item.user.name : item[groupBy];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
    return grouped;
  };

  const sortData = (groupedData, criteria) => {
    const sortedData = {};
    for (const key in groupedData) {
      if (groupedData.hasOwnProperty(key)) {
        let group = groupedData[key];
        group = group.sort((a, b) => {
          if (criteria === "priority") {
            return b.priority - a.priority;
          } else if (criteria === "title") {
            return a.title.localeCompare(b.title);
          }
        });
        sortedData[key] = group;
      }
    }
    return sortedData;
  };

  return (
    <div>
      <DisplayOptions
        displayOptionsVisible={displayOptionsVisible}
        setDisplayOptionsVisible={setDisplayOptionsVisible}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
      <CategoryList groupedData={groupedData} />
    </div>
  );
};

export default App;
