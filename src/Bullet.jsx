import React from "react";
import PropTypes from "prop-types";
import { BULLET_SIZE } from "./constants";

const Bullet = props => {
  return (
    <rect
      x={props.bullet.x}
      y={props.bullet.y}
      width={BULLET_SIZE}
      height={BULLET_SIZE}
      stroke="orange"
      fill="yellow"
      strokeWidth={1}
    />
  );
};

Bullet.propTypes = {
  bullet: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    dir: PropTypes.string.isRequired
  }).isRequired
};

export default Bullet;