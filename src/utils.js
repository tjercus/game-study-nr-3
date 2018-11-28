import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  Directions,
  DirectionsArray,
  HERO_SIZE,
  SNIPE_SIZE
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
 *  the rule is that there is no pacman/snipes like 'round-going', so a snipe
 *  cannot cross the borders.
 * @param {Unit} unit - the moving subject, can be Snipe or Hero
 * @param {number} fieldWidth
 * @param {number} fieldHeight
 * @returns {Unit} modified subject
 */
export const correctUnitBeyondBorderPosition = (
  unit,
  fieldWidth,
  fieldHeight
) => {
  if (unit.x >= fieldWidth - SNIPE_SIZE * 2) {
    unit.x = fieldWidth - SNIPE_SIZE * 2;
    unit.dir = createOppositeDir(unit.dir);
  } else if (unit.x <= 0) {
    unit.x = 1;
    unit.dir = createOppositeDir(unit.dir);
  }
  if (unit.y >= fieldHeight - SNIPE_SIZE * 2) {
    unit.y = fieldHeight - SNIPE_SIZE * 2;
    unit.dir = createOppositeDir(unit.dir);
  } else if (unit.y <= 0) {
    unit.y = 1;
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
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
};

/**
 * Do two Points share on or more coordinates?
 * @param {Unit} rect1
 * @param {Unit} rect2
 * @param {number} rectSize - the width or height of a rect/Unit
 * @returns {boolean} share?
 */
export const isCollision = (rect1, rect2, rectSize) => {
  if (rect1 === null || rect2 === null) {
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
