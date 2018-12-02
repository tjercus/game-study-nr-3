/**
 * TODO perhaps name 'Movable'
 * @interface Unit
 * @augments Point
 * @property {string} dir - direction
 */

/**
 * @interface Snipe
 * @augments Unit
 */

/**
 * @interface Hero
 * @augments Unit
 */

/**
 * @interface Point
 * @property {number} x - cartesian coord, left-right axis
 * @property {number} y - cartesian coord, up-down axis
 */

/**
 * @interface Action
 * @property {string} type
 * @property {Object} payload
 */

/**
 *
 * @type {{UP: string, RIGHT: string, DOWN: string, LEFT: string}}
 */
export const Directions = {
  UP: "up",
  RIGHT: "right",
  DOWN: "down",
  LEFT: "left"
};

export const DirectionsArray = [
  Directions.UP,
  Directions.RIGHT,
  Directions.DOWN,
  Directions.LEFT
];

/**
 * Map browser keydown keyCode nr's to movement stuff
 */
export const keyMap = {
  39: "right",
  37: "left",
  38: "up",
  40: "down",
  65: "shootLeft",
  68: "shootRight",
  87: "shootUp",
  83: "shootDown"
};

export const CANVAS_WIDTH = 800;

export const CANVAS_HEIGHT = 800;

export const DIRECTION_LIMIT = 20;

export const INTERVAL_BETWEEN_MOVES_MS = 100;

export const PX_PER_MOVE = 10;

export const SNIPE_SIZE = 5;
export const HERO_SIZE = 10;
export const BULLET_SIZE = 3;

export const MOVE_SNIPES_CMD = "MOVE_SNIPES_CMD";
export const MOVE_HERO_CMD = "MOVE_HERO_CMD";
export const HERO_SHOOT_CMD = "HERO_SHOOT_CMD";
export const MOVE_BULLETS_CMD = "MOVE_BULLETS_CMD";