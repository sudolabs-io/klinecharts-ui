import { OverlayTemplate, LineAttrs, OverlayFigure, Coordinate, Bounding } from "klinecharts";
import { getDistance, getLinearYFromCoordinates, getRayLine } from "./utils";

/**
 * Returns a point that lies at a 90° angle from a given line,
 * starting at `coordinate`, at a given distance.
 *
 * @param line Two points defining the line direction.
 * @param coordinate The point from which to draw the perpendicular.
 * @param clockwise Whether the perpendicular is clockwise or counterclockwise (default: true).
 * @param distance The distance from the coordinate to the new point (default: 1).
 */
function perpendicularPointFromLine(
  line: [Coordinate, Coordinate],
  coordinate: Coordinate,
  clockwise: boolean = true,
  distance: number = 1
): Coordinate {
  const [p1, p2] = line;

  // direction vector of the line
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  // normalize direction vector
  const length = Math.sqrt(dx * dx + dy * dy);
  if (length === 0) throw new Error("Invalid line: both points are identical.");

  const ux = dx / length;
  const uy = dy / length;

  // rotate direction 90° clockwise or counterclockwise
  const perp = clockwise
    ? { x: uy, y: -ux }   // rotate (ux, uy) 90° clockwise
    : { x: -uy, y: ux };  // rotate 90° counterclockwise

  // scale by distance and offset from the coordinate
  return {
    x: coordinate.x + perp.x * distance,
    y: coordinate.y + perp.y * distance,
  };
}

function getBoundingCoordinate(coordinateOne: Coordinate, coordinateTwo: Coordinate, bounding: Bounding): Coordinate {
  let coordinate = { x: 0, y: 0 }
  if (coordinateOne.x === coordinateTwo.x && coordinateOne.y !== coordinateOne.y) {
    if (coordinateOne.y < coordinateTwo.y) {
      coordinate = {
        x: coordinateOne.x,
        y: bounding.height
      }
    } else {
      coordinate = {
        x: coordinateOne.x,
        y: 0
      }
    }
  } else if (coordinateOne.x > coordinateTwo.x) {
    coordinate = {
      x: 0,
      y: getLinearYFromCoordinates(coordinateOne, coordinateTwo, { x: 0, y: coordinateOne.y })
    }
  } else {
    coordinate = {
      x: bounding.width,
      y: getLinearYFromCoordinates(coordinateOne, coordinateTwo, { x: bounding.width, y: coordinateOne.y })
    }
  }
  return coordinate
}

function getMiddleCoordinate(coordinateOne: Coordinate, coordinateTwo: Coordinate): Coordinate {
  const middleX = (coordinateOne.x + coordinateTwo.x) / 2
  const middleY = (coordinateOne.y + coordinateTwo.y) / 2
  return { x: middleX, y: middleY }
}

const pitchFork: OverlayTemplate = {
  name: 'pitchFork',
  totalStep: 4,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => {
   const returnValue: OverlayFigure[] = []
    
    if (coordinates.length > 1) {
      const coordinate = getBoundingCoordinate(coordinates[0], coordinates[1], bounding)

      returnValue.push({
        type: 'line',
        attrs: { coordinates: [coordinates[0], coordinate] },
      })   
     }

    if (coordinates.length > 2) {    
      const fullMiddleCoordinate = getMiddleCoordinate(coordinates[1], coordinates[2])

      const topMiddleCoordinate = getMiddleCoordinate(coordinates[1], fullMiddleCoordinate)
      const bottomMiddleCoordinate = getMiddleCoordinate(fullMiddleCoordinate, coordinates[2])

      const horizontalLine = {
        type: 'line',
        attrs: {coordinates: [coordinates[0], fullMiddleCoordinate]},
      }

      const verticalLine = {
        type: 'line',
        attrs: { coordinates: [coordinates[1], coordinates[2]] },
      }

      const shouldBeCounterClockwise = coordinates[0].x > coordinates[1].x

      const horizontalGuideRay = {
        type: 'line',
        attrs: getRayLine([fullMiddleCoordinate, perpendicularPointFromLine([coordinates[1], coordinates[2]], fullMiddleCoordinate, shouldBeCounterClockwise)], bounding),
      }

      const boundingRayOne = {
        type: 'line',
        attrs: getRayLine([coordinates[1], perpendicularPointFromLine([coordinates[1], coordinates[2]], coordinates[1], shouldBeCounterClockwise)], bounding),
      }

      const boundingRayTwo = {
        type: 'line',
        attrs: getRayLine([coordinates[2], perpendicularPointFromLine([coordinates[1], coordinates[2]], coordinates[2], shouldBeCounterClockwise)], bounding),
      }

      const middleBoundingRayOne = {
        type: 'line',
        attrs: getRayLine([topMiddleCoordinate, perpendicularPointFromLine([coordinates[1], coordinates[2]], topMiddleCoordinate, shouldBeCounterClockwise)], bounding),
      }
      const middleBoundingRayTwo = {
        type: 'line',
        attrs: getRayLine([bottomMiddleCoordinate, perpendicularPointFromLine([coordinates[1], coordinates[2]], bottomMiddleCoordinate, shouldBeCounterClockwise)], bounding),
      }

      return [
        horizontalLine,
        horizontalGuideRay,
        verticalLine,
        boundingRayOne,
        boundingRayTwo,
        middleBoundingRayOne,
        middleBoundingRayTwo,
      ]
    }

    if (coordinates.length > 2) {
      return returnValue
    }

    return []
  }
}

export default pitchFork
