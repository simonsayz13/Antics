# Challenge summary
The task is to create a simulation of Langton's Ant. Langton's Ant is a cellular automaton that moves around a two-dimensional grid of black and white cells. The ant can face one of four different directions - north, south, east or west. At each step of the simulation the ant will decide where to move - if the ant is currently on a black cell then it turns 90 degrees to the right and moves forward one cell . Similarly, if the ant is on a white cell then it turns 90 degrees to the left and moves forward one cell. Whenever the ant leaves a cell, it inverts the colour of that cell. You're free to choose the starting size and colour of your grid, as well as the starting direction and position of the ant.

# Solution
The Langton's Ant simulation is re-created as a single-page application using JavaScript and [React](https://reactjs.org/) Framework.

Deployment: https://antics.vercel.app/

# Installation

1) Install all dependencies using the following command while on the project's root directory.
```bash
npm i
```

2) Start development build of the application.
```bash
npm start
```

3) Enter the following URL in any JavaScript enabled web browser applications to access the application: http://localhost:3000/

# Usage

By default, the grid is set as 3 by 3. As the Ant moves out the grid, the grid will expand by 1 in both directions. However, this starting grid size can be changed via changing the constant variable in the [Simulation.jsx](src/components/Simulation.jsx) component

```Javascript
const BOARD_SIZE = 3;
```

The speed of the simulation can be adjusted by changing the following constant variable. This variable can be a float or integer, which determines the wait time between each step in milliseconds.

```Javascript
const SPEED = 500;
```

The starting position of the ant that represented by array index. Another option would be to change the constant variable to a randomly generated integer between 0 and grid size (exclusive)

```Javascript
const START_ROW = 1; //Math.floor(Math.random() * BOARD_SIZE)
const START_COL = 1; //Math.floor(Math.random() * BOARD_SIZE)
```

The starting direction of the ant is represented by index values [0, 1, 2, 3], the index corresponds to the direction in which the ant will face in a dictionary. This index can also be randomly generated.

Direction dictionary:
- 0: 0&deg; = West
- 1: 90&deg; = North
- 2: 180&deg; = East
- 3: 270&deg; = South

```Javascript
const STARTING_DIRECTION_INDEX = 2; //Math.floor(Math.random() * 4);
const DIRECTION_DICT = { 0: 0, 1: 90, 2: 180, 3: 270 };
```

# Testing
I believe the default configuration of the simulation is sufficient to test the correctness of the solution. A suggestion to test the correctness of the simulation is to set the speed of the simulation to 1000 milliseconds, this should give the observer enough time to determine whether the simulation follow Langton's Ant movement logic.

A suite of unit testing was conducted on the function that determines the next steps of the Ant. Please see [simulation.test.js](/src/tests/simulation.test.js)


Another way to confirm the implementation is correct is that after 11000 steps of the simulation, the ant draws a pattern which matches the one described in the [Langton's Ant Wikipedia](https://en.wikipedia.org/wiki/Langton%27s_ant)

![Simulation after 11000 steps](/src/tests/my_simulation_after_11000_steps.png "My simulation")

Direction varies based on the starting position of the ant