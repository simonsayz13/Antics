import { determineMovement } from "../components/Simulation";

test("Determines non-overboard movement on white tile for the next step", () => {
  expect(determineMovement(1, 1, 0, "w", 3)).toStrictEqual({
    newDirectionDegree: 270,
    newAntRowIndex: 2,
    newAntColIndex: 1,
    outOfBoard: false,
  });
});

test("Determines non-overboard movement on black tile for the next step", () => {
  expect(determineMovement(1, 1, 0, "b", 3)).toStrictEqual({
    newDirectionDegree: 90,
    newAntRowIndex: 0,
    newAntColIndex: 1,
    outOfBoard: false,
  });
});

test("Determines overboard movement on white tile for the next step", () => {
  expect(determineMovement(1, 2, 270, "w", 3)).toStrictEqual({
    newDirectionDegree: 180,
    newAntRowIndex: 2,
    newAntColIndex: 4,
    outOfBoard: true,
  });
});

test("Determines overboard movement on black tile for the next step", () => {
  expect(determineMovement(2, 2, 180, "b", 3)).toStrictEqual({
    newDirectionDegree: 270,
    newAntRowIndex: 4,
    newAntColIndex: 3,
    outOfBoard: true,
  });
});