import React from "react";
import PropTypes from "prop-types";
import { SNIPE_SIZE } from "./constants";

const Snipe = props => {
  return (
    <rect
      x={props.snipe.x}
      y={props.snipe.y}
      width={SNIPE_SIZE}
      height={SNIPE_SIZE}
      stroke="green"
      fill="green"
      strokeWidth={SNIPE_SIZE}
    />
  );
};

Snipe.propTypes = {
  snipe: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    dir: PropTypes.string.isRequired
  }).isRequired
};

export default Snipe;
