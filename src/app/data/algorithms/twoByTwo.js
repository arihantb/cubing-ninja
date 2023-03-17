const cllAlgorithms = [
  {
    name: 'Anti Sune 1',
    scrambles: [
      "L' U2 L U L' U L y2",
      "R U R' U R U2 R' y'",
      "R' U2 R U R' U R",
      "L' U2 L U L' U L U2",
    ],
    solutions: [
      "y2 L' U' L U' L' U2 L",
      "y R U2 R' U' R U' R'",
      "R' U' R U' R' U2 R",
      "U2 L' U' L U' L' U2 L",
    ],
  },
  {
    name: 'Anti Sune 2',
    scrambles: [
      "R U R' U R' F R F' R U2 R'",
      "R' U R U' R' F R' F' R2 U R' U' R y2",
      "L' U2 L F' L F L' U L' U L",
      "R U R' F' R U R' U R U2 R' F R U' R'",
    ],
    solutions: [
      "R U2 R' F R' F' R U' R U' R'",
      "y2 R' U R U' R2 F R F' R U R' U' R",
      "L' U' L U' L F' L' F L' U2 L",
      "R U R' F' R U2 R' U' R U' R' F R U' R'",
    ],
  },
  {
    name: 'Anti Sune 3',
    scrambles: [
      "L' U2 L U2 L F' L' F y2",
      "R' F2 R U2 R U' R' F y2",
      "R' U2 R U2 L U' R' U x",
      "R' U2 R U2 R B' R' B",
    ],
    solutions: [
      "y2 F' L F L' U2 L' U2 L",
      "y2 F' R U R' U2 R' F2 R",
      "x' U' R U L' U2 R' U2 R",
      "B' R B R' U2 R' U2 R",
    ],
  },
  {
    name: 'Anti Sune 4',
    scrambles: [
      "R U' R' F R' F' R y2",
      "L U' R' U L' U' R",
      "R U' R' F L' U' L y2",
      "R U' R' U R' F' R x",
    ],
    solutions: [
      "y2 R' F R F' R U R'",
      "R' U L U' R U L'",
      "y2 L' U L F' R U R'",
      "x' R' F R U' R U R'",
    ],
  },
  {
    name: 'Anti Sune 5',
    scrambles: [
      "F R' F' R U2 R U2 R' y2",
      "U L' U' L x U2 L U2 L'",
      "U R' U' L U2 R U2 R' y2",
      "F R F' R' U R U F R2 F' y'",
    ],
    solutions: [
      "y2 R U2 R' U2 R' F R F'",
      "L U2 L' U2 x' L' U L U'",
      "y2 R U2 R' U2 L' U R U'",
      "y F R2 F' U' R' U' R F R' F'",
    ],
  },
  {
    name: 'Anti Sune 6',
    scrambles: [
      "L' U2 L U L' U L F' L F L' U' L' U L y2",
      "R' F' R2 U R' F' R' F R2 U' R' y'",
      "F R' U2 R F' R' F U2 F' R y2",
      "F R' F' R U R' F2 R F R' F2 R y2",
    ],
    solutions: [
      "y2 L' U' L U L F' L' F L' U' L U' L' U2 L",
      "y R U R2 F' R F R U' R2 F R",
      "y2 R' F U2 F' R F R' U2 R F'",
      "y2 R' F2 R F' R' F2 R U' R' F R F'",
    ],
  },
  {
    name: 'H 1',
    scrambles: [
      "F R2 U' R2 U R2 U R2 F'",
      "F R2 U' R2 U R2 U R2 F'",
      "F R' F' R U2 F R' F' R2 U2 R'",
      "F R' F' R U2 F R' F' R2 U2 R'",
    ],
    solutions: [
      "F R2 U' R2 U' R2 U R2 F'",
      "F R2 U' R2' U' R2 U R2' F'",
      "R U2 R2' F R F' U2 R' F R F'",
      "R U2' R2' F R F' U2 R' F R F'",
    ],
  },
  {
    name: 'H 2',
    scrambles: [
      "R' F R F' R U' R' U' R U' R'",
      "L' U R U' L U' R' U' R U' R'",
      "R' U R U' R2 F R2 U R' U' F' R y'",
      "R U' R2 D' R U R' D R2 U R' y",
    ],
    solutions: [
      "R U R' U R U R' F R' F' R",
      "R U R' U R U L' U R' U' L",
      "y R' F U R U' R2 F' R2 U R' U' R",
      "y' R U' R2' D' R U' R' D R2 U R'",
    ],
  },
  {
    name: 'H 3',
    scrambles: [
      "F U R U' R' U R U' R' U R U' R' F' y'",
      "x' U2 R' F2 R2 U2 R' U2 x y'",
      'R2 F R2 F2 U2 F R2',
      "R' F R F' R U R2 F R F' R U R'",
    ],
    solutions: [
      "y F R U R' U' R U R' U' R U R' U' F'",
      "y x' U2 R U2 R2 F2 R U2 x",
      "R2 F' U2 F2 R2 F' R2",
      "R U' R' F R' F' R2 U' R' F R' F' R",
    ],
  },
  {
    name: 'H 4',
    scrambles: [
      "R2 U2 R U2 R2 y'",
      "R2 U2 R' U2 R2 y'",
      "R2 U2 R U2 R2 y'",
      "R2 U2 R U2 R2 y'",
    ],
    solutions: [
      "y R2 U2 R' U2 R2",
      'y R2 U2 R U2 R2',
      "y R2' U2 R' U2' R2",
      "y R2 U2' R' U2 R2",
    ],
  },
  {
    name: 'L 1',
    scrambles: [
      "R' F2 R U' R U2 R' F R U2 R' y'",
      "R' U R' F R F' R U2 R' U R y'",
      "R' U2 R U R2 F' R U R U' R' F R",
      "F R' F' U R' U R U2 R' U R y'",
    ],
    solutions: [
      "y R U2 R' F' R U2 R' U R' F2 R",
      "y R' U' R U2 R' F R' F' R U' R",
      "R' F' R U R' U' R' F R2 U' R' U2 R",
      "y R' U' R U2 R' U' R U' F R F'",
    ],
  },
  {
    name: 'L 2',
    scrambles: [
      "F R' F2 R U' R' F2 R2 U2 R' y2",
      "R' U R U F R2 F' R U R U' R' y'",
      "R U' R2 F R F' R U R' U' R U R'",
      "F R' F2 R U' R U2 R2 F2 R y2",
    ],
    solutions: [
      "y2 R U2 R2' F2 R U R' F2 R F'",
      "y R U R' U' R' F R2 F' U' R' U' R",
      "R U' R' U R U' R' F R' F' R2 U R'",
      "y2 R' F2 R2 U2' R' U R' F2 R F'",
    ],
  },
  {
    name: 'L 3',
    scrambles: [
      "R2 U R' U' R U R' U2 R U' R y2",
      "R2 U R' U2 R U2 R' U R2 y2",
      "R U' R U' R U2 R' U R' U R' y'",
      "R2 U2 R U' R U' R2 U2 R U R' y",
    ],
    solutions: [
      "y2 R' U R' U2 R U' R' U R U' R2",
      "y2 R2 U' R U2 R' U2 R U' R2",
      "y R U' R U' R U2 R' U R' U R'",
      "y' R U' R' U2 R2 U R' U R' U2 R2",
    ],
  },
  {
    name: 'L 4',
    scrambles: [
      "R U2 R' F R' F' R2 U2 R' y'",
      "R U2 R' F R' F' R2 U2 R' y'",
      "R' F2 R2 U' R' F R' F2 R y",
      "R U R2 F2 R F R' F2 R y",
    ],
    solutions: [
      "y R U2 R2 F R F' R U2 R'",
      "y R U2' R2' F R F' R U2' R'",
      "y' R' F2 R F' R U R2 F2 R",
      "y' R' F2 R F' R' F2 R2 U' R'",
    ],
  },
  {
    name: 'L 5',
    scrambles: [
      "R U R' U' R' F R F' y'",
      "R' U' R U F R F' y'",
      "R U R' U' L' U R U' x' y'",
      "F' L' F R' F' L F R y",
    ],
    solutions: [
      "y F R' F' R U R U' R'",
      "y F R' F' U' R' U R",
      "y x U R' U' L U R U' R'",
      "y' R' F' L' F R F' L F",
    ],
  },
  {
    name: 'L 6',
    scrambles: [
      "R' F' R U R U' R' F y2",
      "F R U' R' U R U R' F' y'",
      "F U F' U' R' F' R U'",
      "x D' R' U R D R' U' R x' U'",
    ],
    solutions: [
      "y2 F' R U R' U' R' F R",
      "y F R U' R' U' R U R' F'",
      "U R' F R U F U' F'",
      "U x R' U R D' R' U' R D x'",
    ],
  },
  {
    name: 'Pi 1',
    scrambles: [
      "R U2 R' U' R U R' U2 R' F R F' y'",
      "F' U R U R' U2 F R' F2 R",
      "F' L F L' U2 L' U L U' L' U2 L y2",
      "R U R' U F2 R U2 R' U2 R' F2 R",
    ],
    solutions: [
      "y F R' F' R U2 R U' R' U R U2 R'",
      "R' F2 R F' U2 R U' R' U' F",
      "y2 L' U2 L U L' U' L U2 L F' L' F",
      "R' F2 R U2 R U2 R' F2 U' R U' R'",
    ],
  },
  {
    name: 'Pi 2',
    scrambles: [
      "F R' F' R U2 R U' R' U R U2 R'",
      "F U' R' F' R U2 F' R U2 R' y2",
      "F U R U' R2 F' R U2 R U2 R'",
      "F' R2 F U2 R2 F' U R U R2",
    ],
    solutions: [
      "R U2 R' U' R U R' U2 R' F R F'",
      "y2 R U2 R' F U2 R' F R U F'",
      "R U2 R' U2 R' F R2 U R' U' F'",
      "R2 U' R' U' F R2 U2 F' R2 F",
    ],
  },
  {
    name: 'Pi 3',
    scrambles: [
      "F R2 U' R2 U' R2 U R2 F' y'",
      "F U R U' R' U F' U' R' F' R U",
      "F R2 U' R2 U' R2 U R2 F' y'",
      "F R2 F' R U' R U R' U R' y",
    ],
    solutions: [
      "y F R2 U' R2 U R2 U R2 F'",
      "U' R' F R U F U' R U R' U' F'",
      "y F R2 U' R2' U R2 U R2' F'",
      "y' R U' R U' R' U R' F R2 F'",
    ],
  },
  {
    name: 'Pi 4',
    scrambles: [
      "R U R' U R U R' F R' F' R y2",
      "R' F' R U' R' F' R F' R U R'",
      "R U' R2 D' R U' R' D R2 U R' y",
      "L' U' L U' L' U' R U' L U R'",
    ],
    solutions: [
      "y2 R' F R F' R U' R' U' R U' R'",
      "R U' R' F R' F R U R' F R",
      "y' R U' R2' D' R U R' D R2 U R'",
      "R U' L' U R' U L U L' U L",
    ],
  },
  {
    name: 'Pi 5',
    scrambles: [
      "R' U2 R U R' F R' F' R U R y",
      "R' U2 R U R' F R' F' R U R U",
      "R2 U2 R U2 R2 F U R U' R' F' y2",
      "R' U' R U' R' U F' U F R",
    ],
    solutions: [
      "y' R' U' R' F R F' R U' R' U2 R",
      "U' R' U' R' F R F' R U' R' U2 R",
      "y2 F R U R' U' F' R2 U2 R' U2 R2",
      "R' F' U' F U' R U R' U R",
    ],
  },
  {
    name: 'Pi 6',
    scrambles: [
      "R' U R2 U' R2 U' R2 U R'",
      "F U R U' R' U R U' R' F'",
      "R' U R2 U' R2 U' R2 U R'",
      "R U' R2 U R2 U R2 U' R",
    ],
    solutions: [
      "R U' R2 U R2 U R2 U' R",
      "F R U R' U' R U R' U' F'",
      "R U' R2' U R2 U R2' U' R",
      "R' U R2 U' R2 U' R2 U R'",
    ],
  },
  {
    name: 'Sune 1',
    scrambles: [
      "F' L F L' U2 L' U2 L",
      "F' R U R' U2 R' F2 R",
      "F' R U R' U2 L' U2 L",
      "B' R B R' U2 R' U2 R y2",
    ],
    solutions: [
      "L' U2 L U2 L F' L' F",
      "R' F2 R U2 R U' R' F",
      "L' U2 L U2 R U' R' F",
      "y2 R' U2 R U2 R B' R' B",
    ],
  },
  {
    name: 'Sune 2',
    scrambles: [
      "R U2 R' U' R U' R' F R' F' R U R U' R'",
      "F' R U R' U' R U2 R' F' R U2 R'",
      "R U2 R' U' R U' R' F R' F' R U R U' R'",
      "R2 F' U' R2 F' R2 U F R2",
    ],
    solutions: [
      "R U R' U' R' F R F' R U R' U R U2 R'",
      "R U2 R' F R U2 R' U R U' R' F",
      "R U R' U' R' F R F' R U R' U R U2' R'",
      "R2 F' U' R2 F R2 U F R2",
    ],
  },
  {
    name: 'Sune 3',
    scrambles: [
      "L' U L F' R U R'",
      "R' F R F' R U R'",
      "L' U L F' L F L'",
      "L' U R U' L U R'",
    ],
    solutions: [
      "R U' R' F L' U' L",
      "R U' R' F R' F' R",
      "L F' L' F L' U' L",
      "R U' L' U R' U' L",
    ],
  },
  {
    name: 'Sune 4',
    scrambles: ["R U2 R' U2 R' F R F'", "R U2 R' U2 R' F R F'"],
    solutions: ["F R' F' R U2 R U2 R'", "F R' F' R U2 R U2' R'"],
  },
  {
    name: 'Sune 5',
    scrambles: [
      "R' F R F' R U R' F R' F' R U R U' R'",
      "R U' R2 U R U F R2 F' R y",
      "R U2 R' F R' F' R U' R U' R' y2",
      "F R' F' R U R U' R' F R U' R' U R U R' F' R U2 R' U' R U' R'",
    ],
    solutions: [
      "R U R' U' R' F R F' R U' R' F R' F' R",
      "y' R' F R2 F' U' R' U' R2 U R'",
      "y2 R U R' U R' F R F' R U2 R'",
      "R U R' U R U2' R' F R U' R' U' R U R' F' R U R' U' R' F R F'",
    ],
  },
  {
    name: 'Sune 6',
    scrambles: [
      "R U2 R' U' R U' R'",
      "R' U' R U' R' U2 R y",
      "R' U' R2 U R2 U' R'",
      "L' U' L U' L' U2 L y'",
    ],
    solutions: [
      "R U R' U R U2 R'",
      "y' R' U2 R U R' U R",
      "R U R2' U' R2 U R",
      "y L' U2 L U L' U L",
    ],
  },
  {
    name: 'T 1',
    scrambles: [
      "F R' F' R U R U' R' y",
      "F R' F' U' R' U R y2",
      "x U R' U' L U R U' L' x' U",
    ],
    solutions: [
      "y' R U R' U' R' F R F'",
      "y2 R' U' R U F R F'",
      "U' x L U R' U' L' U R U' x'",
    ],
  },
  {
    name: 'T 2',
    scrambles: [
      "F' L F L' U' L' U L y'",
      "R U R U' R' F R' F' y",
      "F' R U R' U' L' U L y'",
      "F' R U R' U' R' F R y'",
    ],
    solutions: [
      "y L' U' L U L F' L' F",
      "y' F R F' R U R' U' R'",
      "y L' U' L U R U' R' F",
      "y R' F' R U R U' R' F",
    ],
  },
  {
    name: 'T 3',
    scrambles: [
      "R U2 R' U' R U R' F R' F' R2 U2 R' y'",
      "R U' R' F2 U R U2 R' U F'",
      "R U2 R' U' R U R' F R' F' R2 U2 R' y'",
      "R2 U R' F R' F' R U' R U R y'",
    ],
    solutions: [
      "y R U2 R2 F R F' R U' R' U R U2 R'",
      "F U' R U2 R' U' F2 R U R'",
      "y R U2' R2' F R F' R U' R' U R U2' R'",
      "y R3 U' R' U R' F R F' R U' R2",
    ],
  },
  {
    name: 'T 4',
    scrambles: [
      "R2 F2 R U R' F R2 U2 R' U' R",
      "R' F2 R U R' F R2 U2 R' U' R U' R' y",
      "R U' R U' R U' R' U R' U R'",
      "R U R2 U' R U2 R' U2 R U' R y2",
    ],
    solutions: [
      "R' U R U2' R2' F' R U' R' F2 R2",
      "y' R U R' U R U2 R2' F' R U' R' F2 R",
      "R U' R U' R U R' U R' U R'",
      "y2 R' U R' U2 R U2 R' U R2 U' R'",
    ],
  },
  {
    name: 'T 5',
    scrambles: [
      "F R U' R' U R U R' U R U' R' F' y2",
      "F R' F' R U' R U' R' U2 R U' R' y'",
      "F R' F' R U' R U2 R' U' R U2 R'",
      "R U' R' F' U F R U R' U R U' R' y",
    ],
    solutions: [
      "y2 F R U R' U' R U' R' U' R U R' F'",
      "y R U R' U2 R U R' U R' F R F'",
      "R U2 R' U R U2 R' U R' F R F'",
      "y' R U R' U' R U' R' F' U' F R U R'",
    ],
  },
  {
    name: 'T 6',
    scrambles: [
      "R' F R' F' R2 U2 R' U' R",
      "R' F R' F' R2 U2 R' U' R",
      "R' U R' F' R2 U2 R' F' R y2",
      "R' F R' F' R2 U2 R' U' R",
    ],
    solutions: [
      "R' U R U2 R2 F R F' R",
      "R' U R U2 R2' F R F' R",
      "y2 R' F R U2 R2 F R U' R",
      "R' U R U2' R2' F R F' R",
    ],
  },
  {
    name: 'U 1',
    scrambles: [
      "F U R U' R' F' y",
      "F R U R' U' F' y'",
      "F' U' L' U L F y'",
      "R' U' F R' F' R U R y'",
    ],
    solutions: [
      "y' F R U R' U' F'",
      "y F U R U' R' F'",
      "y F' L' U' L U F",
      "y R' U' R' F R F' U R",
    ],
  },
  {
    name: 'U 2',
    scrambles: [
      "R' U R U2 R2 F' R U' R' F2 R2 y",
      "R' U R' U2 R U2 R' U R2 U' R' y2",
      "R2 U' R' U F' R U' R' F2 R2 y2",
      "R U' R U2 R' U2 R U' R2 U R",
    ],
    solutions: [
      "y' R2 F2 R U R' F R2 U2 R' U' R",
      "y2 R U R2' U' R U2 R' U2' R U' R",
      "y2 R2 F2 R U R' F U' R U R2",
      "R' U' R2 U R' U2 R U2 R' U R'",
    ],
  },
  {
    name: 'U 3',
    scrambles: [
      "F' R U R' F U2 R U' R' F' y2",
      "F' U F2 R F' R U R' U2 R' y",
      "R' F2 U' R U' R' U F2 U R y",
      "R U' R' F R' F2 R F R U R' F' y",
    ],
    solutions: [
      "y2 F R U R' U2 F' R U' R' F",
      "y' R U2 R U' R' F R' F2 U' F",
      "y' R' U' F2 U' R U R' U F2 R",
      "y' F R U' R' F' R' F2 R F' R U R'",
    ],
  },
  {
    name: 'U 4',
    scrambles: [
      "R U R' U2 R U R' U R' F R F' y",
      "R2 F' R U' R' F2 R F R' F' R2",
      "R' F R U' R U R' U R' x'",
      "F R U R' U' R U' R' U' R U R' F'",
    ],
    solutions: [
      "y' F R' F' R U' R U' R' U2 R U' R'",
      "R2 F R F' R' F2 R U R' F R2",
      "x R U' R U' R' U R' F' R",
      "F R U' R' U R U R' U R U' R' F'",
    ],
  },
  {
    name: 'U 5',
    scrambles: [
      "R' F2 R F R' F2 R U' R U2 R' y2",
      "R U' R' U R U' R' F R' F' R2 U R'",
      "R U' R' U R U' R' F R' F' R2 U R'",
      "R' U2 R' U' F R2 F' U R2",
    ],
    solutions: [
      "y2 R U2 R' U R' F2 R F' R' F2 R",
      "R U' R2 F R F' R U R' U' R U R'",
      "R U' R2' F R F' R U R' U' R U R'",
      "R2 U' F R2 F' U R U2 R",
    ],
  },
  {
    name: 'U 6',
    scrambles: [
      "R' U' R U2 R' F R' F' R U' R",
      "x R F2 R U R' F2 R F' R2 x' y2",
      "R' F R U' R' F R F' R U R2 F' R",
      "R U F R2 F' R U R U' R2 y2",
    ],
    solutions: [
      "R' U R' F R F' R U2 R' U R",
      "y2 x R2 F R' F2 R U' R' F2 R' x'",
      "R' F R2 U' R' F R' F' R U R' F' R",
      "y2 R2 U R' U' R' F R2 F' U' R'",
    ],
  },
];

const eg1Algorithms = [
  {
    name: 'Anti Sune 1',
    scrambles: ["R U R' U F R U' R2 F' R y'", "F' U F2 R2 U B' U2 y'"],
    solutions: ["y R' F R2 U R' F' U' R U' R'", "y U2 B U' R2' F2 U' F"],
  },
  {
    name: 'Anti Sune 2',
    scrambles: [
      "R U R' F2 U F R U R' U'",
      "F' U R' U2 R' F2 U R'",
      "B' U R' U2 R' F2 U R'",
    ],
    solutions: [
      "U R U' R' F' U' F2 R U' R'",
      "R U' F2 R U2 R U' F",
      "R U' F2 R U2 R U' B",
    ],
  },
  {
    name: 'Anti Sune 3',
    scrambles: ["L' U L R U' R' U L F' L' F", "R' F R2 U' R' U R U' R' F"],
    solutions: ["F' L F L' U' R U R' L' U' L", "F' R U R' U' R U R2 F' R"],
  },
  {
    name: 'Anti Sune 4',
    scrambles: [
      "F' U R U' R' U F R U R'",
      "R' F' R F' R' F R U2 R U' R' U",
      "F' R' F R2 U R' U' F R' F' R U",
      "R U' R' F U' R' F R2 U R' F' U'",
    ],
    solutions: [
      "R U' R' F' U' R U R' U' F",
      "U' R U R' U2 R' F' R F R' F R",
      "U' R' F R F' U R U' R2' F' R F",
      "U F R U' R2' F' R U F' R U R'",
    ],
  },
  {
    name: 'Anti Sune 5',
    scrambles: ["R U' R' U R U' R' U F R U' R' y"],
    solutions: ["y' R U R' F' U' R U R' U' R U R'"],
  },
  {
    name: 'Anti Sune 6',
    scrambles: ["F R' F' R U R' F' R2 U R' y2"],
    solutions: ["y2 R U' R2 F R U' R' F R F'"],
  },
  {
    name: 'H 1',
    scrambles: [
      "F R U' R' F' R U R2 F' R U",
      "R' U' F' U R2 U R2 F' R U",
      "U' R U' R F' R' F R2 F",
      "F R2 F U' F' R F' R U",
    ],
    solutions: [
      "U' R' F R2 U' R' F R U R' F'",
      "U' R' F R2 U' R2 U' F U R",
      "F' R2 F' R F R' U R' U",
      "U' R' F R' F U F' R2 F'",
    ],
  },
  {
    name: 'H 2',
    scrambles: [
      "F' U R' F2 R2 U R' U' F U",
      "R' U' F2 U F' R2 U R' F'",
      "R2 U R' U R U' R U R' U R2 y",
      "F' U R' F2 R2 U R' U' F U'",
    ],
    solutions: [
      "U' F' U R U' R2 F2 R U' F",
      "F R U' R2 F U' F2 U R",
      "y' R2 U' R U' R' U R' U' R U' R2",
      "U F' U R U' R2 F2 R U' F",
    ],
  },
  {
    name: 'H 3',
    scrambles: [
      "F' R U2 R' F' U2 F R' F' R U'",
      "F R' F U' F2 R U R",
      "U R' U2 R U x' U2 F' R U R' U'",
      "F R' F2 R F2 R U R' U2 F' U",
    ],
    solutions: [
      "U R' F R F' U2 F R U2 R' F",
      "R' U' R' F2 U F' R F'",
      "U R U' R' F U2 x U' R' U2 R U'",
      "U' F U2 R U' R' F2 R' F2 R F'",
    ],
  },
  {
    name: 'H 4',
    scrambles: [
      "U R U' R' U R U' R' F R U' R' U",
      "F2 U' F R' F' R U' F",
      "R U' R' U R U' R' F R U' R' U",
      "R' F R' F' U R' U2 R' y",
    ],
    solutions: [
      "U' R U R' F' R U R' U' R U R' U'",
      "F' U R' F R F' U F2",
      "U' R U R' F' R U R' U' R U R'",
      "y' R U2 R U' F R F' R",
    ],
  },
  {
    name: 'L 1',
    scrambles: ["F' R' F R2 U R' U' R U R' y'"],
    solutions: ["y R U' R' U R U' R2 F' R F"],
  },
  {
    name: 'L 2',
    scrambles: ["R U2 R' U' R' F' R F R' F' R y"],
    solutions: ["y' R' F R F' R' F R U R U2 R'"],
  },
  {
    name: 'L 3',
    scrambles: ["R U R2 F' U R2 U R2 U' R y'"],
    solutions: ["y R' U R2 U' R2 U' F R2 U' R'"],
  },
  {
    name: 'L 4',
    scrambles: ["R U2 R' F R U' R2 F' R y'"],
    solutions: ["y R' F R2 U R' F' R U2 R'"],
  },
  {
    name: 'L 5',
    scrambles: [
      "R' F R F' U R U' R' F R U' R' y2",
      "R2 U R' U2 R' y L' U' L y2",
    ],
    solutions: [
      "y2 R U R' F' R U R' U' F R' F' R",
      "y2 L' U L y' R U2 R U' R2",
    ],
  },
  {
    name: 'L 6',
    scrambles: ["F' R2 U R' U2 R' F' U2 R y2"],
    solutions: ["y2 R' U2 F R U2 R U' R2 F"],
  },
  {
    name: 'Pi 1',
    scrambles: [
      "F' U R U' R' U2 R U' R' F2 y2",
      "R U' R' F2 U R' F' R U F' U y2",
      "R2 U R' U2 R' U R U' R B2 R2 y2",
    ],
    solutions: [
      "y2 F2 R U R' U2 R U R' U' F",
      "y2 U' F U' R' F R U' F2 R U R'",
      "y2 R2 B2 R' U R' U' R U2 R U' R2",
    ],
  },
  {
    name: 'Pi 2',
    scrambles: [
      "R' F' R2 U R2 F' R y",
      "R U' R2 F R2 U' R' y",
      "R U R2 F' R2 U R' y",
      "R' F R2 U' R2 F R y",
    ],
    solutions: [
      "y' R' F R2 U' R2 F R",
      "y' R U R2 F' R2 U R'",
      "y' R U' R2 F R2 U' R'",
      "y' R' F' R2 U R2 F' R",
    ],
  },
  {
    name: 'Pi 3',
    scrambles: ["R' U' R' F2 U F' R F' y"],
    solutions: ["y' F R' F U' F2 R U R"],
  },
  {
    name: 'Pi 4',
    scrambles: ["R U R' F' R U R' U' R U R' y"],
    solutions: ["y' R U' R' U R U' R' F R U' R'"],
  },
  {
    name: 'Pi 5',
    scrambles: [
      "F R' F' R U R U R' U' R' F' R2 U R'",
      "R' F2 U2 R' U F2 R U R",
      "F R U' R' F R U2 R' U F' U'",
    ],
    solutions: [
      "R U' R2 F R U R U' R' U' R' F R F'",
      "R' U' R' F2 U' R U2 F2 R",
      "U F U' R U2 R' F' R U R' F'",
    ],
  },
  {
    name: 'Pi 6',
    scrambles: ["F U' R U2 R' F' R U R' F'"],
    solutions: ["F R U' R' F R U2 R' U F'"],
  },
  {
    name: 'Sune 1',
    scrambles: ["R' F R2 U R' F' U' R U' R' y2", "x U R' F2 U2 L' F U' y2"],
    solutions: ["y2 R U R' U F R U' R2 F' R", "y2 U F' L U2 F2 R U' x'"],
  },
  {
    name: 'Sune 2',
    scrambles: ["R U' R' F' U' F2 R U' R'", "R' F R U' R U R' F' R' F R F' U'"],
    solutions: ["R U R' F2 U F R U R'", "U F R' F' R F R U' R' U R' F' R"],
  },
  {
    name: 'Sune 3',
    scrambles: ["R U' R2 F R U' R' F R F' y2"],
    solutions: ["y2 F R' F' R U R' F' R2 U R'"],
  },
  {
    name: 'Sune 4',
    scrambles: ["R U' R' F' U' R U R' U' F"],
    solutions: ["F' U R U' R' U F R U R'"],
  },
  {
    name: 'Sune 5',
    scrambles: ["R U R' F' U' R U R' U' R U R' y'"],
    solutions: ["y R U' R' U R U' R' U F R U' R'"],
  },
  {
    name: 'Sune 6',
    scrambles: ["F' R U R' U' R U R2 F' R", "F' L F L' U' R U R2 F' R"],
    solutions: ["R' F R2 U' R' U R U' R' F", "R' F R2 U' R' U L F' L' F"],
  },
  {
    name: 'T 1',
    scrambles: ["R' F R U' R' F R2 U R' F'"],
    solutions: ["F R U' R2 F' R U R' F' R"],
  },
  {
    name: 'T 2',
    scrambles: [
      "R U' R' U R U' R2 F' R F",
      "F R U' R' F' R U R' F' R U R' U2",
      "R U' R' F R U R' F' R U2 R' U2",
    ],
    solutions: [
      "F' R' F R2 U R' U' R U R'",
      "U2 R U' R' F R U' R' F R U R' F'",
      "U2 R U2 R' F R U' R' F' R U R'",
    ],
  },
  {
    name: 'T 3',
    scrambles: ["R U2 R' U' R' F' R2 U R' y'", "R' F2 R U R U R2 F' R U2 y'"],
    solutions: ["y R U' R2 F R U R U2 R'", "y U2 R' F R2 U' R' U' R' F2 R"],
  },
  {
    name: 'T 4',
    scrambles: ["R U' R U R' U R U B2 R2 y", "R' U F' U R2 U R2 F' U' R U y"],
    solutions: [
      "y' R2 B2 U' R' U' R U' R' U R'",
      "y' U' R' U F R2 U' R2 U' F U' R",
    ],
  },
  {
    name: 'T 5',
    scrambles: ["R U' R' F R U' R2 F R y"],
    solutions: ["y' R' F' R2 U R' F' R U R'"],
  },
  {
    name: 'T 6',
    scrambles: [
      "R U R' U F' R U' R' F' R U' R' y",
      "F' R U2 R' F' U2 R U R' U y",
    ],
    solutions: [
      "y' R U R' F R U R' F U' R U' R'",
      "y' U' R U' R' U2 F R U2 R' F",
    ],
  },
  {
    name: 'U 1',
    scrambles: [
      "R2 U' R' U2 R' U2 R'",
      "R U R2 F' R2 U' R' U' R U' R' U2 y'",
      "R U R' U R U' R2 F' R2 U R' U2 y'",
    ],
    solutions: [
      'R U2 R U2 R U R2',
      "y U2 R U R' U R U R2 F R2 U' R'",
      "y U2 R U' R2 F R2 U R' U' R U' R'",
    ],
  },
  {
    name: 'U 2',
    scrambles: [
      "R' F R F U F' R U R' F' U",
      "R2 F2 U' F' R2 B' R2 F' U",
      "R2 F2 U F R2 F R2 F U'",
      "R2 F2 U R U R' U R U' R y' U2",
    ],
    solutions: [
      "U' F R U' R' F U' F' R' F' R",
      "U' F R2 B R2' F U F2 R2",
      "U F' R2 F' R2 F' U' F2 R2",
      "U2 y R' U R' U' R U' R' U' F2 R2",
    ],
  },
  {
    name: 'U 3',
    scrambles: [
      "F' U2 R U2 R' U2 F",
      "R U R' F R2 F' R U' R' y U'",
      "R' F2 R2 U' R' U R U' R' F U' R U' R'",
      "R U R2 F2 R U R U' R' F U' R U' R'",
    ],
    solutions: [
      "F' U2 R U2 R' U2 F",
      "U y' R U R' F R2 F' R U' R'",
      "R U R' U F' R U R' U' R U R2 F2 R",
      "R U R' U F' R U R' U' R' F2 R2 U' R'",
    ],
  },
  {
    name: 'U 4',
    scrambles: ["R U R2 F' R F R' F' R y'", "R' F' R2 U R' F' R U R' U2 y'"],
    solutions: ["y R' F R F' R' F R2 U' R'", "y U2 R U' R' F R U' R2 F R"],
  },
  {
    name: 'U 5',
    scrambles: [
      "R U R' F' U R U R' U' R U R' U2",
      "R U R' F' R U R' U' F R' F' R U'",
      "F U2 F2 U R U2 R' F2",
    ],
    solutions: [
      "U2 R U' R' U R U' R' U' F R U' R'",
      "U R' F R F' U R U' R' F R U' R'",
      "F2 R U2 R' U' F2 U2 F'",
    ],
  },
  {
    name: 'U 6',
    scrambles: ["R U' R' y U' R U R2 F' R y2"],
    solutions: ["y2 R' F R2 U' R' U y' R U R'"],
  },
];

const eg2Algorithms = [
  {
    name: 'Anti Sune 1',
    scrambles: [
      "F U' R2 U' R' U2 R U' R2 F'",
      "x U' R U2 R U' F R2 F' R2 U x'",
      "R2 F' R' F' R U' R U R2 U2 R U2",
      "F U R' U2 R U' R U2 R2 F' U2",
    ],
    solutions: [
      "F R2 U R' U2 R U R2 U F'",
      "x U' R2 F R2 F' U R' U2 R' U x'",
      "U2 R' U2 R2 U' R' U R' F R F R2",
      "U2 F R2 U2 R' U R' U2 R U' F'",
    ],
  },
  {
    name: 'Anti Sune 2',
    scrambles: [
      "y2 x2 R2 F2 L U2 L U L' U L y2",
      "R2 F2 R U2 R U R' U R",
      "R2 B2 R' U R' U R U2 R' y'",
    ],
    solutions: [
      "y2 L' U' L U' L' U2 L' F2 R2",
      "R' U' R U' R' U2 R' F2 R2",
      "y R U2 R' U' R U' R B2 R2",
    ],
  },
  {
    name: 'Anti Sune 3',
    scrambles: ["y2 R2 B2 R' U' R' F L' U' L y2"],
    solutions: ["y2 L' U L F' R U R B2 R2"],
  },
  {
    name: 'Anti Sune 4',
    scrambles: ["y2 F R2 F' R2 F' R U' R y"],
    solutions: ["y' R' U R' F R2 F R2 F'"],
  },
  {
    name: 'Anti Sune 5',
    scrambles: ["y2 R' F R' F2 R U R U R' U R"],
    solutions: ["R' U' R U' R' U' R' F2 R F' R"],
  },
  {
    name: 'Anti Sune 6',
    scrambles: ["R U' R' F R' F' R' F2 R2 y2", "L U' R' U L' U' R' F2 R2"],
    solutions: ["y2 R2 F2 R F R F' R U R'", "R2 F2 R U L U' R U L'"],
  },
  {
    name: 'H 1',
    scrambles: ["y R2 F R2 F2 U2 F' R2", "F2 R F2 R2 U2 R' F2 y'"],
    solutions: ["R2 F U2 F2 R2 F' R2", "y F2 R U2 R2 F2 R' F2"],
  },
  {
    name: 'H 2',
    scrambles: [
      "R2 U2 R U2 B2 R2 y'",
      "R2 B2 U2 R' U2 R2 y'",
      "R2 U2 R' U2 F2 R2 y'",
      "R2 F2 U2 R U2 R2 y'",
    ],
    solutions: [
      "y R2 B2 U2 R' U2 R2",
      'y R2 U2 R U2 B2 R2',
      'y R2 F2 U2 R U2 R2',
      "y R2 U2 R' U2 F2 R2",
    ],
  },
  {
    name: 'H 3',
    scrambles: ["y' R' F' U R' F R2 U2 R' U R", "R' F' R2 U F' U F' U R2 U R'"],
    solutions: ["R' U' R U2 R2 F' R U' F R", "R U' R2 U' F U' F U' R2 F R"],
  },
  {
    name: 'H 4',
    scrambles: [
      "y' R B' U R' U' R B2 U2 R' y",
      "R' F R' F R2 U2 F' R U R' y'",
      "x U F' U R' U' R B2 U2 R' y",
    ],
    solutions: [
      "y' R U2 B2 R' U R U' B R'",
      "y R U' R' F U2 R2 F' R F' R",
      "y' R U2 B2 R' U R U' F U' x'",
    ],
  },
  {
    name: 'L 1',
    scrambles: [
      "R' F' R U R' U R' F R U R y'",
      "R U R' U' R' F R F' R2 B2 R2 y'",
    ],
    solutions: [
      "y R' U' R' F' R U' R U' R' F R",
      "y R2 B2 R2 F R' F' R U R U' R'",
    ],
  },
  {
    name: 'L 2',
    scrambles: ["R' F' R U R U' R' F' R2 F2 y2"],
    solutions: ["y2 F2 R2 F R U R' U' R' F R"],
  },
  {
    name: 'L 3',
    scrambles: [
      "R2 F2 U R' U2 R U2 R' U R2 y2",
      "R2 U R' U' R U R' U2 R U' R' F2 R2 y2",
    ],
    solutions: [
      "y2 R2 U' R U2 R' U2 R U' F2 R2",
      "y2 R2 F2 R U R' U2 R U' R' U R U' R2",
    ],
  },
  {
    name: 'L 4',
    scrambles: ["x2 F U R U R' F' R U2 L U' R y"],
    solutions: ["y' R' U L' U2 R' F R U' R' U' F' x2"],
  },
  {
    name: 'L 5',
    scrambles: ["R2 B2 R' U R' U' R' F R F' y'"],
    solutions: ["y F R' F' R U R U' R B2 R2"],
  },
  {
    name: 'L 6',
    scrambles: ["R2 F2 R F' R U R U' R' F y2"],
    solutions: ["y2 F' R U R' U' R' F R' F2 R2"],
  },
  {
    name: 'Pi 1',
    scrambles: ["F R U' R U R' U2 R' U F'", "R2 U F2 R' U2 R' F2 U F2 y"],
    solutions: ["F U' R U2 R U' R' U R' F'", "y' F2 U' F2 R U2 R F2 U' R2"],
  },
  {
    name: 'Pi 2',
    scrambles: ['F R2 F2 R U R2 U2 R', "R2 F2 R U R2 U' R2 U' R2 U R'"],
    solutions: ["R' U2 R2 U' R' F2 R2 F'", "R U' R2 U R2 U R2 U' R' F2 R2"],
  },
  {
    name: 'Pi 3',
    scrambles: ["R' U' R U2 R2 F' R U' F R y2"],
    solutions: ["y2 R' F' U R' F R2 U2' R' U R"],
  },
  {
    name: 'Pi 4',
    scrambles: ["R' U2 F2 R U' R' U F' R y'", "R U2 F2 R' F U F' U R' y'"],
    solutions: ["y R' F U' R U R' F2 U2 R", "y R U' F U' F' R F2 U2 R'"],
  },
  {
    name: 'Pi 5',
    scrambles: [
      "R' U2 R U' R2 F2 R F R y",
      "R' F2 R U' R2 F2 R U R y'",
      "R U R' U R2 F2 R' U2 R' y",
    ],
    solutions: [
      "y' R' F' R' F2 R2 U R' U2 R",
      "y R' U' R' F2 R2 U R' F2 R",
      "y' R U2 R F2 R2 U' R U' R'",
    ],
  },
  {
    name: 'Pi 6',
    scrambles: ["R' F' R' F2 R2 U R' U2 R y'", "R U2 R' U R2 F2 R' U' R' y"],
    solutions: ["y R' U2 R U' R2 F2 R F R", "y' R U R F2 R2 U' R U2 R'"],
  },
  {
    name: 'Sune 1',
    scrambles: ["F R2 U R' U2 R U R2 U F' y", "R2 F2 U R U2 R' F R2 F' R y"],
    solutions: [
      "y' F U' R2 U' R' U2 R U' R2 F'",
      "y' R' F R2 F' R U2 R' U' F2 R2",
    ],
  },
  {
    name: 'Sune 2',
    scrambles: ["R2 B2 R' U2 R' U' R U' R'"],
    solutions: ["R U R' U R U2 R B2 R2"],
  },
  {
    name: 'Sune 3',
    scrambles: ["R2 F2 R F R F' R U R'", "L' U L F R2 F2 R U R'"],
    solutions: ["R U' R' F R' F' R' F2 R2", "R U' R' F2 R2 F' L' U' L"],
  },
  {
    name: 'Sune 4',
    scrambles: ["R' U R' F R2 F R2 F' y'"],
    solutions: ["y F R2 F' R2 F' R U' R"],
  },
  {
    name: 'Sune 5',
    scrambles: ["R' U' R U' R' U' R' F2 R F' R y2", "R U R' D R2 F' R U' R"],
    solutions: ["y2 R' F R' F2 R U R U R' U R", "R' U R' F R2 D' R U' R'"],
  },
  {
    name: 'Sune 6',
    scrambles: ["L' U R U' L U R B2 R2"],
    solutions: ["R2 B2 R' U' L' U R' U' L"],
  },
  {
    name: 'T 1',
    scrambles: ["F2 R2 F R U R' U' R' F R y'", "R2 B2 R' U R U' R' F R' F' y"],
    solutions: ["y R' F' R U R U' R' F' R2 F2", "y' F R F' R U R' U' R B2 R2"],
  },
  {
    name: 'T 2',
    scrambles: ["F U2 R' U R U2 R F' y'"],
    solutions: ["y F R' U2 R' U' R U2 F'"],
  },
  {
    name: 'T 3',
    scrambles: ["R2 U' R' U F' R U' R y'"],
    solutions: ["y R' U R' F U' R U R2"],
  },
  {
    name: 'T 4',
    scrambles: [
      "F' R' F' R U F' R2 F2",
      "F U R U' R' F' R2 B2 R2 y2",
      "F U R U' R' F R2 F2",
      "U' L' F' L' F U L' F2 L2 U'",
    ],
    solutions: [
      "F2 R2 F U' R' F R F",
      "y2 R2 B2 R2 F R U R' U' F'",
      "F2 R2 F' R U R' U' F'",
      "U L2 F2 L U' F' L F L U",
    ],
  },
  {
    name: 'T 5',
    scrambles: ["R' U R' F' R U' R U R' F2 R y'"],
    solutions: ["y R' F2 R U' R' U R' F R U' R"],
  },
  {
    name: 'T 6',
    scrambles: ["R' F2 R' F2 R U2 R y'", "z' R2 U' R2 U' R2 U R2 U z y'"],
    solutions: ["y R' U2 R' F2 R F2 R", "y z' U' R2 U' R2 U R2 U R2 z"],
  },
  {
    name: 'U 1',
    scrambles: ["F U R U2 R U R' U2 R' U F' y", "R2 U2 R U R' U F' R U' R y"],
    solutions: [
      "y' F U' R U2 R U' R' U2 R' U' F'",
      "y' R' U R' F U' R U' R' U2 R2",
    ],
  },
  {
    name: 'U 2',
    scrambles: [
      "B2 R2 F' U R U' R' F' y",
      "F2 R2 F' R U R' U' F' y'",
      "F2 R2 F' U R U' R' F' y",
    ],
    solutions: [
      "y' F R U R' U' F R2 B2",
      "y F U R U' R' F R2 F2",
      "y' F R U R' U' F R2 F2",
    ],
  },
  {
    name: 'U 3',
    scrambles: [
      "R' U' R U R' F2 R U' R' U R y2",
      "R' F' U' R U2 R' U F R",
      "R U R' U' R B2 R' U R U' R'",
    ],
    solutions: [
      "y2 R' U' R U R' F2 R U' R' U R",
      "R' F' U' R U2 R' U F R",
      "R U R' U' R B2 R' U R U' R'",
    ],
  },
  {
    name: 'U 4',
    scrambles: [
      "L' U R' U2 L U2 F' U F R",
      "R' F R' F' R2 U2 R' U' R' F2 R2 y",
    ],
    solutions: ["R' F' U' F U2 L' U2 R U' L", "y' R2 F2 R U R U2 R2 F R F' R"],
  },
  {
    name: 'U 5',
    scrambles: ["F R' F' R U R U' R B2 R2 y2"],
    solutions: ["y2 R2 B2 R' U R' U' R' F R F'"],
  },
  {
    name: 'U 6',
    scrambles: [
      "F' L F L' U' R' F R' F2 R2 y2",
      "R U R U' R' F R' F' R2 B2 R2 y2",
    ],
    solutions: [
      "y2 R2 F2 R F' R U L F' L' F",
      "y2 R2 B2 R2 F R F' R U R' U' R'",
    ],
  },
];

const ollAlgorithms = [
  {
    name: 'Sune',
    scrambles: [
      "R U2 R' U' R U' R'",
      "R' U' R2 U R2 U' R'",
      "R' U' R U' R' U2 R y",
      "R' F' R U' R' F2 R y'",
    ],
    solutions: [
      "R U R' U R U2 R'",
      "R U R2' U' R2 U R",
      "y' R' U2 R U R' U R",
      "y R' F2 R U R' F R",
    ],
  },
  {
    name: 'Anti Sune',
    scrambles: [
      "R U R' U R U2 R'",
      "L' U2 L U L' U L y'",
      "R' U2 R U R' U R y",
      "R U' R' F R' F' R",
    ],
    solutions: [
      "R U2 R' U' R U' R'",
      "y L' U' L U' L' U2 L",
      "y' R' U' R U' R' U2 R",
      "R' F R F' R U R'",
    ],
  },
  {
    name: 'Pi',
    scrambles: [
      "F U R U' R' U R U' R' F'",
      "R' U R2 U' R2 U' R2 U R'",
      "R' U2 R2 U R2 U R2 U2 R'",
      "F R U R' U' R U R' U' F' y2",
    ],
    solutions: [
      "F R U R' U' R U R' U' F'",
      "R U' R2' U R2 U R2' U' R",
      "R U2 R2 U' R2 U' R2 U2 R",
      "y2 F U R U' R' U R U' R' F'",
    ],
  },
  {
    name: 'P',
    scrambles: [
      "F U R U' R' F'",
      "F R U R' U' F' y2",
      "F R' F' R U R U' R'",
      "F' L F L' U' L' U L y2",
    ],
    solutions: [
      "F R U R' U' F'",
      "y2 F U R U' R' F'",
      "R U R' U' R' F R F'",
      "y2 L' U' L U L F' L' F",
    ],
  },
  {
    name: 'L',
    scrambles: [
      "R' F' R U R U' R' F y'",
      "F R U' R' U R U R' F'",
      "R U R' U' R' F R F'",
      "R' F' R U R U' R' F",
    ],
    solutions: [
      "y F' R U R' U' R' F R",
      "F R U' R' U' R U R' F'",
      "F R' F' R U R U' R'",
      "F' R U R' U' R' F R",
    ],
  },
  {
    name: 'T',
    scrambles: [
      "F R' F' R U R U' R'",
      "F' L F L' U' L' U L y2",
      "F' R U R' U' R' F R",
      "F' R U R' U' R' F R y2",
    ],
    solutions: [
      "R U R' U' R' F R F'",
      "y2 L' U' L U L F' L' F",
      "R' F' R U R U' R' F",
      "y2 R' F' R U R U' R' F",
    ],
  },
  {
    name: 'H',
    scrambles: [
      'R2 U2 R U2 R2',
      "R2 U2 R' U2 R2",
      "F U R U' R' U R U' R' U R U' R' F'",
      "R U R' U R U' R' U R U2 R'",
    ],
    solutions: [
      "R2 U2 R' U2 R2",
      'R2 U2 R U2 R2',
      "F R U R' U' R U R' U' R U R' U' F'",
      "R U2 R' U' R U R' U' R U' R'",
    ],
  },
];

const pblAlgorithms = [
  {
    id: 1,
    mask: 'pll',
    name: 'Adj',
    scrambles: [
      "R U R2 F' R U R U' R' F R U' R' y'",
      "R U2 R' U' R U2 R' F R' F' R y'",
      "R2 F2 R U R' F2 R F' R y2",
      "F R U' R' U R U R2 F' R U R U' R' y'",
    ],
    solutions: [
      "y R U R' F' R U R' U' R' F R2 U' R'",
      "y R' F R F' R U2 R' U R U2 R'",
      "y2 R' F R' F2 R U' R' F2 R2",
      "y R U R' U' R' F R2 U' R' U' R U R' F'",
    ],
  },
  {
    id: 2,
    mask: 'pll',
    name: 'Opp',
    scrambles: [
      "F2 U' R U' R' U F2 U R U R'",
      "F R' F' R U R U' R' F R U' R' U R U R' F'",
      "R2 D' R U' R' U F2 U R U R'",
      "R2 F2 D' R U' R' U F2 U R U R' x2",
    ],
    solutions: [
      "R U' R' U' F2 U' R U R' U F2",
      "F R U' R' U' R U R' F' R U R' U' R' F R F'",
      "R U' R' U' F2 U' R U R' D R2",
      "x2 R U' R' U' F2 U' R U R' D F2 R2",
    ],
  },
  {
    id: 3,
    mask: 'pll',
    name: 'Opp Opp',
    scrambles: ['R2 F2 R2', 'R2 B2 R2', "R2 U2 R2 x'", 'R2 F2 R2'],
    solutions: ['R2 F2 R2', 'R2 B2 R2', 'x R2 U2 R2', "R2' F2 R2"],
  },
  {
    id: 4,
    mask: 'pll',
    name: 'Adj Adj',
    scrambles: [
      'R2 U R2 U2 B2 U R2',
      'R2 U F2 U2 R2 U R2 y2',
      'B2 U R2 U2 F2 U R2',
      'R2 F2 U R2 U2 B2 U R2 y2',
    ],
    solutions: [
      "R2 U' B2 U2 R2 U' R2",
      "y2 R2 U' R2 U2 F2 U' R2",
      "R2' U' F2 U2' R2 U' B2",
      "y2 R2 U' B2 U2 R2 U' F2 R2",
    ],
  },
  {
    id: 5,
    mask: 'pll',
    name: 'Adj Opp',
    scrambles: [
      "R U' R F2 R' U R'",
      "R' U R' F2 R F' R",
      "R' F R' F2 R U' R y2",
      "L' U R' U2 L U' R y2",
    ],
    solutions: [
      "R U' R F2 R' U R'",
      "R' F R' F2 R U' R",
      "y2 R' U R' F2 R F' R",
      "y2 R' U L' U2 R U' L",
    ],
  },
  {
    id: 6,
    mask: 'pll',
    name: 'Opp Adj',
    scrambles: [
      "R2 U R2 U' R2 U R2 U' R2 y'",
      "R2 U' R2 U R2 U' R2 U R2 y'",
      "R' D R' F2 R D' R",
      "R' U' R' U F2 R U R U R' y2",
    ],
    solutions: [
      "y R2 U R2 U' R2 U R2 U' R2",
      "y R2 U' R2 U R2 U' R2 U R2",
      "R' D R' F2 R D' R",
      "y2 R U' R' U' R' F2 U' R U R",
    ],
  },
];

export const cll = {
  algorithms: cllAlgorithms,
  sections: [
    {title: 'Anti Sune', data: cllAlgorithms.slice(0, 6)},
    {title: 'H', data: cllAlgorithms.slice(6, 10)},
    {title: 'L', data: cllAlgorithms.slice(10, 16)},
    {title: 'Pi', data: cllAlgorithms.slice(16, 22)},
    {title: 'Sune', data: cllAlgorithms.slice(22, 28)},
    {title: 'T', data: cllAlgorithms.slice(28, 34)},
    {title: 'U', data: cllAlgorithms.slice(34, 40)},
  ],
};

export const eg1 = {
  algorithms: eg1Algorithms,
  sections: [
    {title: 'Anti Sune', data: eg1Algorithms.slice(0, 6)},
    {title: 'H', data: eg1Algorithms.slice(6, 10)},
    {title: 'L', data: eg1Algorithms.slice(10, 16)},
    {title: 'Pi', data: eg1Algorithms.slice(16, 22)},
    {title: 'Sune', data: eg1Algorithms.slice(22, 28)},
    {title: 'T', data: eg1Algorithms.slice(28, 34)},
    {title: 'U', data: eg1Algorithms.slice(34, 40)},
  ],
};

export const eg2 = {
  algorithms: eg2Algorithms,
  sections: [
    {title: 'Anti Sune', data: eg2Algorithms.slice(0, 6)},
    {title: 'H', data: eg2Algorithms.slice(6, 10)},
    {title: 'L', data: eg2Algorithms.slice(10, 16)},
    {title: 'Pi', data: eg2Algorithms.slice(16, 22)},
    {title: 'Sune', data: eg2Algorithms.slice(22, 28)},
    {title: 'T', data: eg2Algorithms.slice(28, 34)},
    {title: 'U', data: eg2Algorithms.slice(34, 40)},
  ],
};

export const oll = {
  algorithms: ollAlgorithms,
  sections: [{title: 'OLL', data: ollAlgorithms}],
};

export const pbl = {
  algorithms: pblAlgorithms,
  sections: [{title: 'PBL', data: pblAlgorithms}],
};
