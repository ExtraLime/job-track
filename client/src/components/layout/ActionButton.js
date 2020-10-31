import React, { Fragment } from "react";

const ActionButton = ({ action, side, color, icon }) => {

  return (
    <Fragment>
      <div className="direction-left" style={{ alignSelf: `${side}` }}>
        <a
          className={`waves-effect waves-light btn ${side} modal-trigger ${color}`}
          href={action}
        >
          <i className="material-icons">{icon}</i>
        </a>
      </div>
    </Fragment>
  );
};

export default ActionButton;
