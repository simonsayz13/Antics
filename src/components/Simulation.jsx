import { useEffect, useState } from "react";
import ant from "../ant.png";

const BOARD_SIZE = 3;
const SQUARE_WIDTH = 50;
const SQUARE_HEIGHT = 50;
const SPEED = 1000;
const START_ROW = 1; //Math.floor(Math.random() * BOARD_SIZE)
const START_COL = 1; //Math.floor(Math.random() * BOARD_SIZE)
const STARTING_DIRECTION_INDEX = 2; //Math.floor(Math.random() * 4);
const DIRECTION_DICT = { 0: 0, 1: 90, 2: 180, 3: 270 };

const initBoard = () => {
  let TwoDimensionBoard = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill("w"));
  return TwoDimensionBoard;
};

const expandBoard = (prevBoard) => {
  const prevBoardDimension = prevBoard[0].length;
  let expandedBoard = new Array(prevBoardDimension + 2)
    .fill(null)
    .map(() => new Array(prevBoardDimension + 2).fill("w"));
  // Copy board
  for (let i = 1; i < prevBoardDimension + 1; i++) {
    for (let j = 1; j < prevBoardDimension + 1; j++) {
      expandedBoard[i][j] = prevBoard[i - 1][j - 1];
    }
  }
  return expandedBoard;
};

export const determineMovement = (
  antRowIndex,
  antColIndex,
  directionDegree,
  tileColour,
  boardSize
) => {
  let newDirectionDegree = directionDegree;
  let newAntRowIndex = antRowIndex;
  let newAntColIndex = antColIndex;
  let outOfBoard = false;

  if (tileColour === "b") {
    newDirectionDegree += 90;
  } else {
    newDirectionDegree -= 90;
  }

  if (newDirectionDegree > 360) {
    newDirectionDegree -= 90;
  }

  if (newDirectionDegree < 0) {
    newDirectionDegree = 270;
  }

  if (newDirectionDegree === 360) {
    newDirectionDegree = 0;
  }

  switch (newDirectionDegree) {
    case 0:
      newAntColIndex -= 1;
      break;
    case 90:
      newAntRowIndex -= 1;
      break;
    case 180:
      newAntColIndex += 1;
      break;
    case 270:
      newAntRowIndex += 1;
      break;
    default:
      break;
  }
  // console.log("new row: ",newAntRowIndex,"new col:",newAntColIndex)

  if (
    newAntRowIndex >= boardSize ||
    newAntRowIndex < 0 ||
    newAntColIndex >= boardSize ||
    newAntColIndex < 0
  ) {
    outOfBoard = true;
    if (newAntColIndex < 0) {
      newAntRowIndex = antRowIndex + 1;
      newAntColIndex = antColIndex;
    } else if (newAntRowIndex < 0) {
      newAntRowIndex = antRowIndex;
      newAntColIndex = antColIndex + 1;
    } else if (newAntColIndex >= boardSize) {
      newAntRowIndex = antRowIndex + 1;
      newAntColIndex = antColIndex + 2;
    } else {
      newAntRowIndex = antRowIndex + 2;
      newAntColIndex = antColIndex + 1;
    }
  }
  // console.log("new row: ",newAntRowIndex,"new col:",newAntColIndex, "new degree:",newDirectionDegree)

  return {
    newDirectionDegree,
    newAntRowIndex,
    newAntColIndex,
    outOfBoard,
  };
};

const Simulation = () => {
  // Initialise variables
  const [board, setBoard] = useState(initBoard);
  const [antRowIndex, setAntRowIndex] = useState(START_ROW);
  const [antColIndex, setAntColIndex] = useState(START_COL);
  const [tileColour, setTitleColour] = useState("w");
  const [directionDegree, setDirectionDegree] = useState(
    DIRECTION_DICT[STARTING_DIRECTION_INDEX]
  );
  const [boardSize, setBoardSize] = useState(BOARD_SIZE);
  // const [step, setStep] = useState(0)

  useEffect(() => {
    // console.log(
    //   `Position - row: ${antRowIndex}, col: ${antColIndex}, degree: ${directionDegree}, tileColour: ${tileColour}`
    // );

    setTimeout(() => {
      setBoard((prevBoard) => {
        let newBoard = [...prevBoard];
        const nextMovement = determineMovement(
          antRowIndex,
          antColIndex,
          directionDegree,
          tileColour,
          boardSize
        );
        if (nextMovement.outOfBoard) {
          newBoard = expandBoard(newBoard);
          setBoardSize(boardSize + 2);
          if (prevBoard[antRowIndex][antColIndex] === "w") {
            newBoard[antRowIndex + 1][antColIndex + 1] = "b";
          } else {
            newBoard[antRowIndex + 1][antColIndex + 1] = "w";
          }
        } else {
          if (prevBoard[antRowIndex][antColIndex] === "w") {
            newBoard[antRowIndex][antColIndex] = "b";
          } else {
            newBoard[antRowIndex][antColIndex] = "w";
          }
        }
        setTitleColour(
          newBoard[nextMovement.newAntRowIndex][nextMovement.newAntColIndex]
        );
        setAntRowIndex(nextMovement.newAntRowIndex);
        setAntColIndex(nextMovement.newAntColIndex);
        setDirectionDegree(nextMovement.newDirectionDegree);
        return newBoard;
      });
      // setStep(step+1)
      // console.log(step)
    }, SPEED);
    // eslint-disable-next-line
  }, [board]);

  return (
    <div className="flex flex-col mx-auto mt-4">
      {board.map((row, iIndex) => {
        return (
          <div className="flex flex-row justify-center" key={`row-${iIndex}`}>
            {row.map((tile, jIndex) => {
              if (tile === "w") {
                if (antRowIndex === iIndex && antColIndex === jIndex) {
                  return (
                    <div
                      className="bg-white border-2"
                      style={{
                        width: `${SQUARE_WIDTH}px`,
                        height: `${SQUARE_HEIGHT}px`,
                      }}
                      key={`tile-${iIndex}:${jIndex}`}
                    >
                      <img
                        src={ant}
                        width={SQUARE_WIDTH}
                        height={SQUARE_HEIGHT}
                        style={{ rotate: `${directionDegree}deg` }}
                        alt={"Ant"}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="bg-white border-2"
                      style={{
                        width: `${SQUARE_WIDTH}px`,
                        height: `${SQUARE_HEIGHT}px`,
                      }}
                      key={`tile-${iIndex}:${jIndex}`}
                    />
                  );
                }
              } else {
                if (antRowIndex === iIndex && antColIndex === jIndex) {
                  return (
                    <div
                      className="bg-black border-2"
                      style={{
                        width: `${SQUARE_WIDTH}px`,
                        height: `${SQUARE_HEIGHT}px`,
                      }}
                      key={`tile-${iIndex}:${jIndex}`}
                    >
                      <img
                        src={ant}
                        width={SQUARE_WIDTH}
                        height={SQUARE_HEIGHT}
                        style={{ rotate: `${directionDegree}deg` }}
                        alt={"Ant"}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="bg-black border-2"
                      style={{
                        width: `${SQUARE_WIDTH}px`,
                        height: `${SQUARE_HEIGHT}px`,
                      }}
                      key={`tile-${iIndex}:${jIndex}`}
                    />
                  );
                }
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Simulation;
