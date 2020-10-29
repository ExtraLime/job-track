import React, { Fragment } from "react";

const ActionButton = ({ action, href, color, label }) => {
  console.log(action);

  return (
    <Fragment>
      <div className="direction-left" style={{ display: "flex" }}>
        <a
          className={`waves-effect waves-light btn modal-trigger ${color}`}
          href={action}
        >
          <i className="material-icons">add</i>
        </a>
      </div>
    </Fragment>
  );
};

export default ActionButton;
