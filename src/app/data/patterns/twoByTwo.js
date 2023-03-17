export const patterns = [
  {
    category: 'Simple Patterns',
    name: '3 Parallel Stripes',
    algorithms: ['R2 U F2 U2 R2 U R2'],
  },
  {
    category: 'Simple Patterns',
    name: '4 Serial Stripes (Order 2)',
    algorithms: ['D2'],
  },
  {
    category: 'Simple Patterns',
    name: '4 Serial Stripes (Order 2)',
    algorithms: ['U2'],
  },
  {
    category: 'Simple Patterns',
    name: '4 Serial Stripes (Order 4)',
    algorithms: ['D'],
  },
  {
    category: 'Simple Patterns',
    name: '4 Serial Stripes (Order 4)',
    algorithms: ["U'"],
  },
  {
    category: 'Simple Patterns',
    name: '4 Parallel Stripes',
    algorithms: ['F2 R2 F2', 'R2 F2 R2'],
  },
  {
    category: 'Simple Patterns',
    name: '4 Parallel Stripes',
    algorithms: ['F2 L2 F2', 'L2 F2 L2'],
  },
  {
    category: 'Simple Patterns',
    name: '5 Stripes',
    algorithms: ["R2 F' R2 F2 U2 F' R2", 'R2 F U2 F2 R2 F R2'],
  },
  {
    category: 'Simple Patterns',
    name: '5 Stripes',
    algorithms: ["F2 R' U2 R2 F2 R' F2 U'", 'F2 R U2 R2 F2 R F2 U'],
  },
  {
    category: 'Simple Patterns',
    name: '6 Stripes',
    algorithms: ['B2 L2'],
    id: 10,
  },
  {
    category: 'Simple Patterns',
    name: '6 Stripes',
    algorithms: ['L2 D B2 D2 L2 D', 'R2 U F2 U2 R2 D'],
  },
  {
    category: 'Simple Patterns',
    name: '6 Orthogonal Stripes',
    algorithms: [
      'U2 F2 R2 U2',
      'F2 R2 U2 F2',
      'R2 U2 F2 R2',
      'D2 B2 L2 D2',
      'D2 F2 L2 U2',
    ],
  },
  {
    category: 'Simple Patterns',
    name: '6 Orthogonal Stripes',
    algorithms: [
      'D2 L2 B2 D2',
      'B2 D2 L2 B2',
      'L2 B2 D2 L2',
      'U2 R2 F2 U2',
      'D2 R2 B2 U2',
    ],
  },
  {
    category: 'Simple Patterns',
    name: '6 Stripes (Antipode)',
    algorithms: [
      "R2 U R F R' U R2 U' F U' F' U'",
      "U' R2 U F2 U2 R2 U F2 U'",
      "R' F2 R U2 R2- F2 R U2 R'",
      "F' U2 F R2 F2 U2 F R2 F'",
      "(D' B2)2 D2 (L2 D')2",
      "(U' R2)2 U2 (F2 U')2",
    ],
  },
  {
    category: 'Simple Patterns',
    name: '6 Stripes (Antipode)',
    algorithms: [
      "L2 D' L' B' L D' L2 D B' D B D",
      "B D2 B' L2 B2 D2 B' L2 B",
      '(U F2)2 U2 (R2 U)2',
      '(D L2)2 D2 (B2 D)2',
    ],
  },
  {
    category: 'Simple Patterns',
    name: '4 Chessboards',
    algorithms: ['U2 F2 L2 F2', 'U2 L2 F2 L2', 'F2 L2 F2 U2', 'L2 F2 L2 U2'],
  },
  {
    category: 'Simple Patterns',
    name: '4 Chessboards',
    algorithms: ['U2 F2 R2 F2', 'U2 R2 F2 R2', 'F2 R2 F2 U2', 'R2 F2 R2 U2'],
  },
  {
    category: 'Simple Patterns (2 Types)',
    name: '4 Stripes parallel2 Chessboards',
    algorithms: ['U R2 U2 F2 U', "U' F2 U2 R2 U'"],
  },
  {
    category: 'Simple Patterns (2 Types)',
    name: '4 Stripes parallel2 Chessboards',
    algorithms: ['U R2 D2 B2 U', "U' F2 D2 L2 U'"],
  },
  {
    category: 'Simple Patterns (2 Types)',
    name: '4 Stripes parallel2 Chessboards',
    algorithms: ['U F2 U2 R2 U'],
  },
  {
    category: 'Simple Patterns (2 Types)',
    name: '4 Stripes parallel2 Chessboards',
    algorithms: ['U B2 U2 R2 U'],
  },
  {
    category: 'Simple Patterns (2 Types)',
    name: '4 Orthogonal Stripes2 Chessboards',
    algorithms: ['L2 D2 B2'],
  },
  {
    category: 'Simple Patterns (2 Types)',
    name: '4 Orthogonal Stripes2 Chessboards',
    algorithms: ['B2 D2 L2'],
  },
  {
    category: 'Simple Patterns (2 Types)',
    name: '5 Stripes1 Chessboard',
    algorithms: ["R' F2 R (F' R2)2 F' R'", "F R (F2 R)2 F' R2 F'"],
  },
  {
    category: 'Simple Patterns (2 Types)',
    name: '5 Stripes1 Chessboard',
    algorithms: ["R F (R2 F)2 R' F2 R", "F R2 F (R' F2)2 R' F'"],
  },
  {
    category: 'Simple Patterns (2 Types)',
    name: "4 Orthogonal L's2 Chessboards",
    algorithms: ["L U B' L' B L2 F U R F", "(U' R2 U2 B2)2 U'"],
  },
  {
    category: 'Simple Patterns (2 Types)',
    name: "4 Orthogonal L's2 Chessboards",
    algorithms: ["L D F' L' F L2 B D R B", "(D' R2 D2 F2)2 D'"],
  },
  {
    category: 'Multi Color Patterns',
    name: '4 Colorwheels',
    algorithms: ['U F2 L2 F2', 'U L2 F2 L2', "F2 L2 F2 U'", "L2 F2 L2 U'"],
  },
  {
    category: 'Multi Color Patterns',
    name: '4 Colorwheels',
    algorithms: ['U F2 R2 F2', 'U R2 F2 R2', "F2 R2 F2 U'", "R2 F2 R2 U'"],
  },
  {
    category: 'Various Patterns',
    name: '2 Cubes in a Cube (Order 2)',
    algorithms: ["R F' R U R' D2 L' U' B' U B2"],
  },
  {
    category: 'Various Patterns',
    name: '2 Cubes in a Cube (Order 2)',
    algorithms: [
      "F' U F U R2 U F' U' F U' R2",
      "R U' R2 U' F' R' U F2 R U' F",
      "R F' R U R' U2 R' U' F' U F2",
      "F2 D' F D' L' D L2 D R U R'",
    ],
  },
  {
    category: 'Various Patterns',
    name: '1 Brick',
    algorithms: [
      '(B L)7 B',
      "L B2 L B L (B') L B L B2 L",
      "U R U' R2 U' R' F' D L2 F R'",
      "F U F U' R2 F' U F' D' L B2",
    ],
  },
  {
    category: 'Various Patterns',
    name: '1 Brick',
    algorithms: ["U R U' R2 U' R' F' U F2 R F'", "F U F U' R2 F' U F' U' F R2"],
  },
  {
    category: 'Various Patterns',
    name: '4 Bricks',
    algorithms: ['(D2 L2)2 D', "L2 D'"],
  },
  {
    category: 'Various Patterns',
    name: '4 Bricks',
    algorithms: ['(D2 B2)2 D', "B2 D'"],
  },
  {
    category: 'Various Patterns',
    name: 'Corner Twist (+urf) (-ubr)',
    algorithms: ["(U' R)3 (U R')3", "(U R')3 (U' R)3"],
  },
  {
    category: 'Various Patterns',
    name: 'Corner Twist (-urf) (+ubr)',
    algorithms: ["(R U')3 (R' U)3", "(R' U)3 (R U')3"],
  },
  {
    category: 'Various Patterns',
    name: 'Corner Twist (-ufl) (+ulb)',
    algorithms: ["U R (U' R)2 (U R')3 U2", "U' R' (U R')2 (U' R)3 U2"],
  },
  {
    category: 'Various Patterns',
    name: 'Corner Twist (+ufl) (-ulb)',
    algorithms: ["U2 (R U')3 (R' U)2 R' U'", "U2 (R' U)3 (R U')2 R U"],
  },
  {
    category: 'Various Patterns',
    name: 'Corner Twist (+urf) (+ubr) (+ulb)',
    algorithms: ["R U R2 U' R2 U R U'", "R U R' U R U2 R' U2"],
  },
  {
    category: 'Various Patterns',
    name: 'Corner Twist (-urf) (-ubr) (-ulb)',
    algorithms: ["U R' U' R2 U R2 U' R'", "U2 R U2 R' U' R U' R'"],
  },
  {
    category: 'Various Patterns',
    name: 'Corner Twist (+urf) (-ubr) (-ufl) (+ulb)',
    algorithms: ["R2 U2 R' U2 R2 U'", 'R2 U2 R U2 R2 U'],
  },
  {
    category: 'Various Patterns',
    name: 'Corner Twist (-urf) (+ubr) (+ufl) (-ulb)',
    algorithms: ['U R2 U2 R U2 R2', "U' R2 U2 R' U2 R2"],
  },
  {
    category: 'Various Patterns',
    name: 'Corner Twist (+urf) (-ubr) (+ufl) (-ulb)',
    algorithms: ["R' U R2 (U' R2)2 U R' U2", "R U' R2 (U R2)2 U' R U2"],
  },
  {
    category: 'Various Patterns',
    name: 'Corner Twist (-urf) (+ubr) (-ufl) (+ulb)',
    algorithms: ["U2 R U' (R2 U)2 R2 U' R", "U2 R' U (R2 U')2 R2 U R'"],
  },
  {
    category: 'Various Patterns',
    name: 'Corner Swap (ufl,dfr) (ulb,drb)',
    algorithms: ['U2 R2 U2', 'R2 U2 R2'],
  },
  {
    category: 'Various Patterns',
    name: 'U-Twist With 3 Generators',
    algorithms: ['L2 R2 (D) R2 L2', "L R' (F) R L'"],
  },
  {
    category: 'Various Patterns',
    name: 'U-Twist With 2 Generators',
    algorithms: [
      "(F' U') (F' U') (F' U') (L' B' R') (L' B' R') (U F) (L' B' R') (F' U') (F' U') (F' U') (R B L) (R B L) (U F) (U F) (R B L) (R B L) (F' U') (L' B' R') (F' U') (R B L) (R B L) (F' U') (F' U') (F' U') (R B L) (U F) (U F) (U F) (U F) (U F) (U F) (R B L) (F' U') (R B L) (U F) (L' B' R') (U F) (L' B' R') (F' U') (F' U')",
    ],
  },
  {
    category: 'Various Patterns',
    name: 'U2-Twist With 3 Generators',
    algorithms: ['L2 R2 (D2) R2 L2', "L R' (F2) R L'"],
  },
  {
    category: 'Various Patterns',
    name: 'Antipode in FTM and QTM',
    algorithms: [
      "D R D2 F' D F D R' F' R D R' F",
      "L U2 L' D' L B2 D' R' B D' R2",
      "L F2 L' D' L U2 B' D' R D' R2",
    ],
  },
  {
    category: 'Various Patterns',
    name: 'Antipode in FTM and QTM',
    algorithms: ["B2 U B2 U' B L' B D' B D B2", "R B R2 U2 B R' B U' R2 U L'"],
  },
  {
    category: 'Various Patterns',
    name: 'Antipode in FTM and QTM',
    algorithms: ["B2 R F' D R2 B' R D B' L B2"],
  },
  {
    category: 'Various Patterns',
    name: 'Antipode in FTM and QTM',
    algorithms: ["L2 U B2 L' U' L B' L B' U2 B"],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Cubes in a Cube (Order 2)',
    algorithms: [
      "F U R' U2 R U' F U R2 F2",
      "F' R' U F2 U' R F' U' R2 F2",
      "F2 R2 U F R' U F2 U' R F",
      "F2 R2 U' F' U R' U2 R U' F'",
      "R F U' R2 U F' R U F2 R2",
      "R' U' F U2 F' U R' U' F2 R2",
      "R2 F2 U R U' F U2 F' U R",
      "R2 F2 U' R' F U' R2 U F' R'",
    ],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Cubes in a Cube (Order 2)',
    algorithms: [
      "R' D' R F2 L' U L' U' L2 F2",
      "F D F' R2 B U' B U B2 R2",
      "F' R' D R2 U' B R' U' F2 L2",
    ],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Cubes in a Cube (Order 2)',
    algorithms: ["U R F' U2 F R' U F R2 U2"],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Cubes in a Cube (Order 2)',
    algorithms: ["R B R' U2 L F' L F L2 U2"],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Cubes in a Cube (Order 2)',
    algorithms: ["F U R' F2 R U' F R U2 F2"],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Cubes in a Cube (Order 2)',
    algorithms: ["U L U' F2 D R' D R D2 F2"],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Cubes in a Cube (Order 3)',
    algorithms: [
      "U F' R U F2 R2 U' F' R F'",
      "R' F R' U' F2 R2 U F R' U",
      "U2 F R U' F R' F R' U' F2",
    ],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Cubes in a Cube (Order 3)',
    algorithms: ["F R' F U R2 F2 D' B' U R'", "F' U L' D' R2 F2 U R F' R"],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Corner Triangles',
    algorithms: [
      "F R U R' F U2 F' R U' R' F",
      "(U R2)2 U2 F2 U R2 U' F2",
      "R2 U' F2 U R2 U2 (F2 U)2",
      "(F U2)2 F2 R2 F U2 F' R2",
    ],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Corner Triangles',
    algorithms: [
      "F' R U R' F U2 F' R U' R' F'",
      "F2 U R2 U' F2 U2 (R2 U')2",
      "(U' F2)2 U2 R2 U' F2 U R2",
      "R2 F U2 F' R2 F2 (U2 F')2",
    ],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Corner Triangles',
    algorithms: [
      "B' L' D' L B' D2 B L' D L B'",
      "(D' L2)2 D2 B2 D' L2 D B2",
      "L2 D B2 D' L2 D2 (B2 D')2",
      "(B' D2)2 B2 L2 B' D2 B L2",
    ],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Corner Triangles',
    algorithms: [
      "B L' D' L B' D2 B L' D L B",
      "B2 D' L2 D B2 D2 (L2 D)2",
      "(D B2)2 D2 L2 D B2 D' L2",
      "L2 B' D2 B L2 B2 (D2 B)2",
    ],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Corner Triangles',
    algorithms: ["F' L F R' D F2 D' L U' B' L'", "F2 D F2 D' L2 D2 (B2 D')2"],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Corner Triangles',
    algorithms: ["F R D F' U L2 U' B L' F' L", "(U R2)2 U2 F2 U L2 U' L2"],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Corner Triangles',
    algorithms: [
      "U R' F2 R F U' R2 U F' U'",
      "R F' U F' R' U' F2 R U F2",
      "F U' R U' F' R' U2 F R U2",
    ],
  },
  {
    category: 'Corner Axis (2 Colors)',
    name: '2 Corner Triangles',
    algorithms: ["(U R F2)2 R U F' R", "(F U R2)2 U F R' U"],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: 'Two-One-One',
    algorithms: [
      "U F R' F R U R' U2 F2",
      "U' R' U F' R' U' R U2 F2",
      "R U F' U F R F' R2 U2",
      "R' F' R U' F' R' F R2 U2",
      "F R U' R U F U' F2 R2",
      "F' U' F R' U' F' U F2 R2",
    ],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: 'Two-One-One',
    algorithms: [
      "D L B' L B D B' D2 L2",
      "D' B' D L' B' D' B D2 L2",
      "B D L' D L B L' B2 D2",
      "B' L' B D' L' B' L B2 D2",
      "L B D' B D L D' L2 B2",
      "L' D' L B' D' L' D L2 B2",
    ],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: '3 Orthogonal Bricks (Order 2)',
    algorithms: [
      "U' R2 F2 R' F2 U2 R2 U",
      "U' R2 F2 R U2 R2 F2 U'",
      "F' U2 R2 U F2 U2 R2 F'",
    ],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: '3 Orthogonal Bricks (Order 2)',
    algorithms: [
      "U F2 R2 F R2 U2 F2 U'",
      "U F2 R2 F' U2 F2 R2 U",
      "R U2 F2 U' R2 U2 F2 R",
    ],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: '3 Orthogonal Bricks (Order 3)',
    algorithms: ["U' F2 U F' R2 F"],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: '3 Orthogonal Bricks (Order 3)',
    algorithms: ["B L2 B' D B2 D'"],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: '3 Orthogonal Bricks (Order 6)',
    algorithms: ["F R' F U R2 U F2 U' R"],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: '3 Orthogonal Bricks (Order 6)',
    algorithms: ["R' F R' U' F2 U' R2 U F'"],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: '6 Carneval Masks',
    algorithms: [
      "U2 F2 R F' R' U' F R' F'",
      "U2 F2 R' F R U R' U F",
      "R2 U2 F U' F' R' U F' U'",
      "R2 U2 F' U F R F' R U",
      "F2 R2 U R' U' F' R U' R'",
      "F2 R2 U' R U F U' F R",
    ],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: '6 Carneval Masks',
    algorithms: [
      "U2 R2 F R' F' U' F U' R'",
      "U2 R2 F' R F U R' F R",
      "R2 F2 U F' U' R' U R' F'",
      "R2 F2 U' F U R F' U F",
      "F2 U2 R U' R' F' R F' U'",
      "F2 U2 R' U R F U' R U",
    ],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: '2 Corner Triangles',
    algorithms: ["F' U F' R' U R U' F' R F'", "U' R2 F2 R' U2 F' R2 F2 U'"],
  },
  {
    category: 'Corner Axis (3 Colors)',
    name: '2 Corner Triangles',
    algorithms: ["F R' F U R' U' R F U' F", 'U F2 R2 F U2 R F2 R2 U'],
  },
  {
    category: 'Corner Axis (4 Colors)',
    name: '2 Color Framed Cubes (Order 2)',
    algorithms: [
      'U F U R F U F',
      'U F R F U F R',
      'F R U R F R U',
      'F R F U R F R',
      'R U F U R U F',
      'R U R F U R U',
    ],
  },
  {
    category: 'Corner Axis (4 Colors)',
    name: '2 Color Framed Cubes (Order 6)',
    algorithms: ["U F' R U F' R U' R2 U F'"],
  },
  {
    category: 'Corner Axis (4 Colors)',
    name: '2 Color Framed Cubes (Order 6)',
    algorithms: ["F U' R2 U R' F U' R' F U'"],
  },
  {
    category: 'Corner Axis (4 Colors)',
    name: '2 Color Framed Cubes (Order 2)',
    algorithms: ['U F R U F U R', 'R F U (R U)2', 'R F R (U R)2'],
  },
  {
    category: 'Asymmetric Rotations',
    name: 'Corner Triangle (Antipode)Two-One-One',
    algorithms: ["B' D B' D' L B' D L' (D' B2)2", "L D2 L2 B' L D B' D2 L2 D"],
  },
  {
    category: 'Asymmetric Rotations',
    name: 'Corner Triangle (Backside, Antipode)Two-One-One',
    algorithms: ["R' U R' U' F R' U F' (U' R2)2", "F U2 F2 R' F U R' U2 F2 U"],
  },
  {
    category: 'Asymmetric Rotations',
    name: 'Corner Triangle (Antipode)Two-One-One',
    algorithms: ["(B2 D)2 L D' B L' D B D' B", "D' L2 D2 B D' L' B L2 D2 L'"],
  },
  {
    category: 'Asymmetric Rotations',
    name: 'Corner Triangle (Backside, Antipode)Two-One-One',
    algorithms: ["(R2 U)2 F U' R F' U R U' R", "U' F2 U2 R U' F' R F2 U2 F'"],
  },
  {
    category: 'Snakes',
    name: '2 Mambas',
    algorithms: ["U' F2 U", "D' L2 D"],
  },
  {
    category: 'Snakes',
    name: '2 Mambas',
    algorithms: ["D B2 D'", "U R2 U'"],
  },
  {
    category: 'Snakes',
    name: '2 Mambas',
    algorithms: ["U' B2 U", "D' R2 D"],
  },
  {
    category: 'Snakes',
    name: '2 Mambas',
    algorithms: ["D F2 D'", "U L2 U'"],
  },
  {
    category: 'Twists',
    name: '3 Corner Twists',
    algorithms: ["F' U2 F' U F' U' F U' F2 U'"],
  },
  {
    category: 'Twists',
    name: '3 Corner Twists',
    algorithms: ["U F2 U F' U F U' F U2 F"],
  },
  {
    category: 'Twists',
    name: '4 Corner Twists',
    algorithms: [
      "F U' R' U R U' R' U R F'",
      "R F' U' R U F' U' R U R'",
      "F' R U F' U' R U F' U' F",
      "R' U F U' F' U F U' F' R",
    ],
  },
  {
    category: 'Twists',
    name: '4 Corner Twists',
    algorithms: ["U F2 L F2 R2 B R2 U'"],
  },
  {
    category: 'Twists',
    name: '6 Corner Twists2 Color Framed Cubes',
    algorithms: [
      "U F' (U R')3 F U'",
      "U' R (F' U)3 R' U",
      "R U' (R F')3 U R'",
      "R' F (U' R)3 F' R",
      "F R' (F U')3 R F'",
      "F' U (R' F)3 U' F",
    ],
  },
  {
    category: 'Twists',
    name: '6 Corner Twists2 Color Framed Cubes',
    algorithms: ["(F R')2 U' F R F' U' F"],
  },
  {
    category: 'Twists',
    name: '6 Corner Twists2 Color Framed Cubes',
    algorithms: ["F' U F R' F' U (R F')2"],
  },
  {
    category: 'Twists',
    name: '8 Corner Inversions4 Parallel Stripes',
    algorithms: ['U (F2 R2 B2) U', 'F2 R2 B2 y'],
  },
  {
    category: 'Twists',
    name: 'Corner Swap (urf,ubr)',
    algorithms: [
      "B U' B L2 F' D F L2 B2 U",
      "F R' F R2 F' U F R2 F2 U",
      "F R' F U R2 F2 R U F' R2",
      "R2 U F U' R F2 R' F R F2",
    ],
  },
  {
    category: 'Twists',
    name: 'Corner Swap (ufl,ubr)',
    algorithms: [
      "R' U R U B2 U R' U' R U' B2",
      "F U' F2 U' L' F' U L2 F U' L",
      "F L' F U F' U2 F' U' L' U L2",
      "R2 D' R D' F' D F2 D B U B'",
    ],
  },
  {
    category: 'Invisible Patterns',
    name: 'Self-Solving Algorithms',
    algorithms: [
      "(U R U' R') F U",
      "(R U R') U' F2",
      "(U R U') R' F2",
      "(R U R') U' F2",
      '(U R U F U)',
      '(U R)2 U',
    ],
  },
  {
    category: 'Impossible Patterns',
    name: '2 Peaks',
    algorithms: [
      "U R' F2 R F U' R2 U F' U'",
      "R F' U F' R' U' F2 R U F2",
      "F U' R U' F' R' U2 F R U2",
    ],
  },
  {
    category: 'Impossible Patterns',
    name: '6 Chessboards',
    algorithms: ["U R F2 U R F2 R U F' R", "F U R2 F U R2 U F R' U"],
  },
];

export const sections = [
  {
    title: 'Simple Patterns',
    data: patterns.slice(0, 17),
  },
  {
    title: 'Simple Patterns (2 Types)',
    data: patterns.slice(17, 27),
  },
  {
    title: 'Multi Color Patterns',
    data: patterns.slice(27, 29),
  },
  {
    title: 'Various Patterns',
    data: patterns.slice(29, 53),
  },
  {
    title: 'Corner Axis (2 Colors)',
    data: patterns.slice(53, 69),
  },
  {
    title: 'Corner Axis (3 Colors)',
    data: patterns.slice(69, 81),
  },
  {
    title: 'Corner Axis (4 Colors)',
    data: patterns.slice(81, 85),
  },
  {
    title: 'Asymmetric Rotations',
    data: patterns.slice(85, 89),
  },
  {
    title: 'Snakes',
    data: patterns.slice(89, 93),
  },
  {
    title: 'Twists',
    data: patterns.slice(93, 103),
  },
  {
    title: 'Invisible Patterns',
    data: patterns.slice(103, 104),
  },
  {
    title: 'Impossible Patterns',
    data: patterns.slice(104, 106),
  },
];
