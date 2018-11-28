import React from "react";
import PropTypes from "prop-types";
import { HERO_SIZE } from "./constants";

const Hero = props => {
  return (
    <rect
      x={props.hero.x}
      y={props.hero.y}
      width={HERO_SIZE}
      height={HERO_SIZE}
      stroke="blue"
      fill="blue"
      strokeWidth={HERO_SIZE}
    />
  );
};

Hero.propTypes = {
  hero: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};

export default Hero;
