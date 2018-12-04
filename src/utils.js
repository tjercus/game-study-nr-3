import uuidv4 from "uuid/v4";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  Directions,
  DirectionsArray,
  HERO_SIZE
} from "./constants";

/**
 *
 * @returns {string} random dir, one of four
 */
export const createRandomDir = () => {
  const randomNr = Math.floor(Math.random() * DirectionsArray.length);
  return DirectionsArray[randomNr];
};

/**
 * What is the opposite dir of a dir?
 * @param {string} dir
 * @returns {string} opposite dir
 */
const createOppositeDir = dir => {
  if (dir === Directions.UP) {
    return Directions.DOWN;
  }
  if (dir === Directions.DOWN) {
    return Directions.UP;
  }
  if (dir === Directions.LEFT) {
    return Directions.RIGHT;
  }
  if (dir === Directions.RIGHT) {
    return Directions.LEFT;
  }
};

/**
 * Corrects a units position and direction given the borders of a field
 *  the rule is that there is no pacman/snipes like 'round-going', so a unit
 *  cannot cross the borders. Instead it will 'bounce' or reverse it's direction
 * @param {Unit} unit - the moving subject, can be Snipe or Hero or Bullet
 * @param {number} unitSize - int
 * @param {number} fieldWidth
 * @param {number} fieldHeight
 * @returns {Unit} modified subject
 */
export const correctUnitBeyondBorderPosition = (
  unit,
  unitSize,
  fieldWidth,
  fieldHeight
) => {
  if (unit.x >= fieldWidth - unitSize / 2) {
    unit.x = fieldWidth - (unitSize / 2) * 2;
    unit.dir = createOppositeDir(unit.dir);
  } else if (unit.x <= 0) {
    unit.x = unitSize;
    unit.dir = createOppositeDir(unit.dir);
  }
  if (unit.y >= fieldHeight - unitSize / 2) {
    unit.y = fieldHeight - (unitSize / 2) * 2;
    unit.dir = createOppositeDir(unit.dir);
  } else if (unit.y <= 0) {
    unit.y = unitSize;
    unit.dir = createOppositeDir(unit.dir);
  }
  return unit;
};

/**
 * Starting with prevPoint, create a new point nrOfPixels in dir
 * @param {string} dir
 * @param {Point} prevPoint
 * @param {number} nrOfPixels
 * @returns {Point} a new Point
 */
export const createNextPoint = (dir, prevPoint, nrOfPixels) => {
  const nextPoint = /** @type Point */ { ...prevPoint };
  switch (dir) {
    case Directions.UP:
      nextPoint.y = prevPoint.y - nrOfPixels;
      break;
    case Directions.RIGHT:
      nextPoint.x = prevPoint.x + nrOfPixels;
      break;
    case Directions.DOWN:
      nextPoint.y = prevPoint.y + nrOfPixels;
      break;
    case Directions.LEFT:
      nextPoint.x = prevPoint.x - nrOfPixels;
      break;
    default:
      break;
  }
  return nextPoint;
};

/**
 *
 * @param {Hero} hero
 * @param {Array<Snipe>} snipes
 * @param {Point} prevPoint
 * @param {Point} nextPoint
 * @returns {Hero} updated hero
 */
export const moveHero = (hero, snipes, prevPoint, nextPoint) => {
  const movedHero = /** @type Hero */ { ...hero };
  if (!isCollisions(snipes, nextPoint, HERO_SIZE)) {
    movedHero.x = nextPoint.x;
    movedHero.y = nextPoint.y;
  }
  return /** @type Hero */ correctUnitBeyondBorderPosition(
    movedHero,
    HERO_SIZE,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
};

/**
 * Do two Points share one or more coordinates?
 * @param {Unit} rect1
 * @param {Unit} rect2
 * @param {number} rectSize - the width or height of a rect/Unit
 * @returns {boolean} share?
 */
export const isCollision = (rect1, rect2, rectSize) => {
  if (
    rect1 === null ||
    rect2 === null ||
    typeof rect1 === "undefined" ||
    typeof rect2 === "undefined"
  ) {
    return false;
  }
  const predY1 = rect1.y + rectSize <= rect2.y;
  const predY2 = rect1.y >= rect2.y + rectSize;
  const predX1 = rect1.x + rectSize <= rect2.x;
  const predX2 = rect1.x >= rect2.x + rectSize;
  return !(predY1 || predY2 || predX1 || predX2);
};

/**
 * Do multiple Unit's collide with another Unit?
 * @param {Array<Unit>} subjects
 * @param {Unit} subj
 * @param {number} subjectsSize
 * @returns {boolean}
 */
export const isCollisions = (subjects, subj, subjectsSize) =>
  subjects
    .map(subject => isCollision(subject, subj, subjectsSize))
    .includes(true);

/**
 * Make a bullet seen from a Unit and moving in a certain direction
 * @param {Unit|Hero|snipe} unit of any subtype like snipe
 * @param {number} unitSize
 * @param {string} shootDir
 * @returns {Unit} bullet
 */
export const makeBullet = (unit, unitSize, shootDir) => {
  if (["shootLeft", "left"].includes(shootDir)) {
    return {
      x: unit.x - unitSize * 2,
      y: unit.y,
      dir: Directions.LEFT,
      id: uuidv4()
    };
  }
  if (["shootRight", "right"].includes(shootDir)) {
    return {
      x: unit.x + unitSize * 2,
      y: unit.y,
      dir: Directions.RIGHT,
      id: uuidv4()
    };
  }
  if (["shootUp", "up"].includes(shootDir)) {
    return {
      x: unit.x,
      y: unit.y - unitSize * 2,
      dir: Directions.UP,
      id: uuidv4()
    };
  }
  if (["shootDown", "down"].includes(shootDir)) {
    return {
      x: unit.x,
      y: unit.y + unitSize * 2,
      dir: Directions.DOWN,
      id: uuidv4()
    };
  }
};

/**
 * Calculate distance between two points
 * @param {Point} rect1
 * @param {Point} rect2
 * @returns {number} distance between
 */
export const distance = (rect1, rect2) => {
  const xDiff = rect1.x - rect2.x;
  const yDiff = rect1.y - rect2.y;
  return Math.round(Math.sqrt(xDiff * xDiff + yDiff * yDiff));
};

/**
 * calculate dir where hero is as seen from unit
 * @param {Unit} unit
 * @param {Hero} hero
 * @returns {string|boolean} direction or false
 */
export const getDirBetween = (unit, hero) => {
  if (unit && distance(unit, hero) < 200) {
    if (unit.y > hero.y) {
      return Directions.UP;
    }
    if (unit.y < hero.y) {
      return Directions.DOWN;
    }
    if (unit.x > hero.x) {
      return Directions.LEFT;
    }
    if (unit.x < hero.x) {
      return Directions.RIGHT;
    }
  }
  return false;
};
