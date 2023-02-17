import { useEffect, useState } from "react";
import { AntLeft, AntRight, AntDown, AntUp } from "./Ants";
import ant from "../ant.png";

const BOARD_SIZE = 40;
const SQUARE_WIDTH = 23;
const SQUARE_HEIGHT = 23;
const SPEED = 1000;
const START_ROW = 20; //Math.floor(Math.random() * BOARD_SIZE)
const START_COL = 20; //Math.floor(Math.random() * BOARD_SIZE)

const initBoard = () => {
  var TwoDimensionBoard = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill("w"));
  return TwoDimensionBoard;
};

const determineMovement = (
  antRowIndex,
  antColIndex,
  directionDegree,
  tileColour
) => {
  let newDirectionDegree = directionDegree;
  let newAntRowIndex = antRowIndex;
  let newAntColIndex = antColIndex;

  if (!(antRowIndex > BOARD_SIZE || antColIndex > BOARD_SIZE)) {
    if (tileColour == "b") {
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

    if (newDirectionDegree == 360) {
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
    }
  }

  return {
    newDirectionDegree,
    newAntRowIndex,
    newAntColIndex,
  };
};

const Simulation = () => {
  const [board, setBoard] = useState(initBoard);
  const [antRowIndex, setAntRowIndex] = useState(START_ROW);
  const [antColIndex, setAntColIndex] = useState(START_COL);
  const [tileColour, setTitleColour] = useState("w");
  const startingDirectionIndex = Math.floor(Math.random() * 4);
  const direction_dict = { 0: 0, 1: 90, 2: 180, 3: 270 };
  const [directionDegree, setDirectionDegree] = useState(
    direction_dict[startingDirectionIndex]
  );
  useEffect(() => {
    console.log(
      `start - row: ${antRowIndex}, col: ${antColIndex}, degree: ${directionDegree}`
    );
    setTimeout(() => {
      setBoard((prevBoard) => {
        let newBoard = [...prevBoard];
        const nextMovement = determineMovement(
          antRowIndex,
          antColIndex,
          directionDegree,
          tileColour
        );
        if (prevBoard[antRowIndex][antColIndex] == "w") {
          newBoard[antRowIndex][antColIndex] = "b";
        } else {
          newBoard[antRowIndex][antColIndex] = "w";
        }
        setAntRowIndex(nextMovement.newAntRowIndex);
        setAntColIndex(nextMovement.newAntColIndex);
        setDirectionDegree(nextMovement.newDirectionDegree);
        setTitleColour(
          newBoard[nextMovement.newAntRowIndex][nextMovement.newAntColIndex]
        );
        return newBoard;
      });
    }, SPEED);
  }, [board]);

  return (
    <div className="flex flex-col mx-auto">
      {board.map((row, iIndex) => {
        return (
          <div className="flex flex-row justify-center">
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
                      key={`${iIndex}-${jIndex}`}
                    >
                      <img
                        src={ant}
                        width={SQUARE_WIDTH}
                        height={SQUARE_HEIGHT}
                        style={{ rotate: `${directionDegree}deg` }}
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
                      key={`${iIndex}-${jIndex}`}
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
                      key={`${iIndex}-${jIndex}`}
                    >
                      <img
                        src={ant}
                        width={SQUARE_WIDTH}
                        height={SQUARE_HEIGHT}
                        style={{ rotate: `${directionDegree}deg` }}
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
                      key={`${iIndex}-${jIndex}`}
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
