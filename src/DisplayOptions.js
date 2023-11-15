import React from "react";

const DisplayOptions = ({
  displayOptionsVisible,
  setDisplayOptionsVisible,
  groupBy,
  setGroupBy,
  sortCriteria,
  setSortCriteria,
}) => {
  const [showDisplayOptions, setShowDisplayOptions] = React.useState(false);

  const handleClick = () => {
    setShowDisplayOptions(!showDisplayOptions);
  };

  return (
    <div className="display-options">
      <button className="display-options-button" onClick={handleClick}>
        {/* <span className="display-options-icon">&#xf070;</span> */}
        <i class="fa fa-sliders" aria-hidden="true"></i>
        Display Options
      </button>
      {showDisplayOptions && (
        <div>
          <label>Group by:</label>
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="user">User</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
          <label>Sort by:</label>
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default DisplayOptions;
