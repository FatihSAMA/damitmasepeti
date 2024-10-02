import { useEffect } from "react"
import Input from "../../components/Input"
import Accordion from "../../components/Accordion"
import { sanityClient } from "../../../client"
import { useState } from "react"


const table = {
  0: {
    0: -1,
    0.5: -0.5,
    1: 0,
    1.5: 0.5,
    2: 1,
    2.5: 1.5,
    3: 2,
    3.5: 2.5,
    4: 3,
    4.5: 3.5,
    5: 4,
    5.5: 4.5,
    6: 5,
    6.5: 5.5,
    7: 6,
    7.5: 6.5,
    8: 7,
    8.5: 7.5,
    9: 8,
    9.5: 8.5,
    10: 9,
    10.5: 9.5,
    11: 10,
    11.5: 10.5,
    12: 11,
    12.5: 11.6,
    13: 12.1,
    13.5: 12.5,
    14: 13.1,
    14.5: 13.5,
    15: 14.1,
    15.5: 14.5,
    16: 15.0,
    16.5: 15.5,
    17: 16.1,
    17.5: 16.6,
    18: 17.1,
    18.5: 17.6,
    19: 18.1,
    19.5: 18.6,
    20: 19.1,
    20.5: 19.6,
    21: 20.1,
    21.5: 20.6,
    22: 21.1,
    22.5: 21.6,
    23: 22.1,
    23.5: 22.6,
    24: 23.1,
    24.5: 23.6,
    25: 24.1
  },
  1: {
    0: -1,
    0.5: -0.5,
    1: 0,
    1.5: 0.5,
    2: 1,
    2.5: 1.5,
    3: 2,
    3.5: 2.5,
    4: 3,
    4.5: 3.5,
    5: 4,
    5.5: 4.5,
    6: 5.1,
    6.5: 5.6,
    7: 6.1,
    7.5: 6.6,
    8: 7.1,
    8.5: 7.6,
    9: 8.1,
    9.5: 8.6,
    10: 9.1,
    10.5: 9.6,
    11: 10.1,
    11.5: 10.6,
    12: 11.1,
    12.5: 11.6,
    13: 12.1,
    13.5: 12.6,
    14: 13.1,
    14.5: 13.6,
    15: 14.1,
    15.5: 14.6,
    16: 15.1,
    16.5: 15.6,
    17: 16.1,
    17.5: 16.6,
    18: 17.1,
    18.5: 17.6,
    19: 18.1,
    19.5: 18.6,
    20: 19.1,
    20.5: 19.6,
    21: 20.2,
    21.5: 20.7,
    22: 21.2,
    22.5: 21.7,
    23: 22.2,
    23.5: 22.7,
    24: 23.2,
    24.5: 23.7,
    25: 24.2
  },
  2: {
      0: -0.9,
      0.5: -0.4,
      1: 0.1,
      1.5: 0.6,
      2: 1.1,
      2.5: 1.6,
      3: 2.1,
      3.5: 2.6,
      4: 3.1,
      4.5: 3.6,
      5: 4.1,
      5.5: 4.6,
      6: 5.1,
      6.5: 5.6,
      7: 6.1,
      7.5: 6.6,
      8: 7.1,
      8.5: 7.6,
      9: 8.1,
      9.5: 8.6,
      10: 9.1,
      10.5: 9.6,
      11: 10.1,
      11.5: 10.6,
      12: 11.1,
      12.5: 11.6,
      13: 12.1,
      13.5: 12.7,
      14: 13.2,
      14.5: 13.7,
      15: 14.2,
      15.5: 14.7,
      16: 15.2,
      16.5: 15.7,
      17: 16.2,
      17.5: 16.7,
      18: 17.2,
      18.5: 17.7,
      19: 18.2,
      19.5: 18.7,
      20: 19.2,
      20.5: 19.7,
      21: 20.2,
      21.5: 20.7,
      22: 21.2,
      22.5: 21.7,
      23: 22.2,
      23.5: 22.7,
      24: 23.2,
      24.5: 23.7,
      25: 24.2
    },
  3: {
      0: -0.9,
      0.5: -0.4,
      1: 0.1,
      1.5: 0.6,
      2: 1.1,
      2.5: 1.6,
      3: 2.1,
      3.5: 2.6,
      4: 3.1,
      4.5: 3.6,
      5: 4.1,
      5.5: 4.6,
      6: 5.2,
      6.5: 5.7,
      7: 6.2,
      7.5: 6.7,
      8: 7.2,
      8.5: 7.7,
      9: 8.2,
      9.5: 8.7,
      10: 9.2,
      10.5: 9.7,
      11: 10.2,
      11.5: 10.7,
      12: 11.2,
      12.5: 11.7,
      13: 12.2,
      13.5: 12.7,
      14: 13.2,
      14.5: 13.7,
      15: 14.2,
      15.5: 14.7,
      16: 15.2,
      16.5: 15.7,
      17: 16.2,
      17.5: 16.7,
      18: 17.2,
      18.5: 17.7,
      19: 18.2,
      19.5: 18.7,
      20: 19.2,
      20.5: 19.7,
      21: 20.2,
      21.5: 20.7,
      22: 21.2,
      22.5: 21.7,
      23: 22.3,
      23.5: 22.8,
      24: 23.3,
      24.5: 23.8,
      25: 24.3
    },
  4: {
      0: -0.8,
      0.5: -0.3,
      1: 0.2,
      1.5: 0.7,
      2: 1.2,
      2.5: 1.7,
      3: 2.2,
      3.5: 2.7,
      4: 3.2,
      4.5: 3.7,
      5: 4.2,
      5.5: 4.7,
      6: 5.2,
      6.5: 5.7,
      7: 6.2,
      7.5: 6.7,
      8: 7.2,
      8.5: 7.7,
      9: 8.2,
      9.5: 8.7,
      10: 9.2,
      10.5: 9.7,
      11: 10.2,
      11.5: 10.7,
      12: 11.2,
      12.5: 11.7,
      13: 12.2,
      13.5: 12.7,
      14: 13.3,
      14.5: 13.8,
      15: 14.3,
      15.5: 14.8,
      16: 15.3,
      16.5: 15.8,
      17: 16.3,
      17.5: 16.8,
      18: 17.3,
      18.5: 17.8,
      19: 18.3,
      19.5: 18.8,
      20: 19.3,
      20.5: 19.8,
      21: 20.3,
      21.5: 20.8,
      22: 21.3,
      22.5: 21.8,
      23: 22.3,
      23.5: 22.8,
      24: 23.3,
      24.5: 23.8,
      25: 24.3
    },
  5: {
      0: -0.8,
      0.5: -0.3,
      1: 0.2,
      1.5: 0.7,
      2: 1.2,
      2.5: 1.7,
      3: 2.8,
      3.5: 2.7,
      4: 3.2,
      4.5: 3.7,
      5: 4.2,
      5.5: 4.7,
      6: 5.3,
      6.5: 5.8,
      7: 6.3,
      7.5: 6.8,
      8: 7.3,
      8.5: 7.8,
      9: 8.3,
      9.5: 8.8,
      10: 9.3,
      10.5: 9.8,
      11: 10.3,
      11.5: 10.8,
      12: 11.3,
      12.5: 11.8,
      13: 12.3,
      13.5: 12.8,
      14: 13.3,
      14.5: 13.8,
      15: 14.3,
      15.5: 14.8,
      16: 15.3,
      16.5: 15.8,
      17: 16.3,
      17.5: 16.8,
      18: 17.3,
      18.5: 17.8,
      19: 18.3,
      19.5: 18.8,
      20: 19.3,
      20.5: 19.8,
      21: 20.3,
      21.5: 20.8,
      22: 21.3,
      22.5: 21.8,
      23: 22.3,
      23.5: 22.8,
      24: 23.3,
      24.5: 23.8,
      25: 24.3
    },
  6: {
      0: -0.7,
      0.5: -0.2,
      1: 0.3,
      1.5: 0.8,
      2: 1.3,
      2.5: 1.8,
      3: 2.3,
      3.5: 2.8,
      4: 3.3,
      4.5: 3.8,
      5: 4.3,
      5.5: 4.8,
      6: 5.3,
      6.5: 5.8,
      7: .3,
      7.5: 6.8,
      8: 7.3,
      8.5: 7.8,
      9: 8.3,
      9.5: 8.8,
      10: 9.3,
      10.5: 9.8,
      11: 10.3,
      11.5: 10.8,
      12: 11.3,
      12.5: 11.8,
      13: 12.3,
      13.5: 12.8,
      14: 13.3,
      14.5: 13.8,
      15: 14.3,
      15.5: 14.9,
      16: 15.4,
      16.5: 15.9,
      17: 16.4,
      17.5: 16.9,
      18: 17.4,
      18.5: 17.9,
      19: 18.4,
      19.5: 18.9,
      20: 19.4,
      20.5: 19.9,
      21: 20.4,
      21.5: 20.9,
      22: 21.4,
      22.5: 21.9,
      23: 22.4,
      23.5: 22.9,
      24: 23.4,
      24.5: 23.9,
      25: 24.4
    },
  7: {
      0: -0.7,
      0.5: -0.2,
      1: 0.3,
      1.5: 0.8,
      2: 1.3,
      2.5: 1.8,
      3: 2.3,
      3.5: 2.8,
      4: 3.3,
      4.5: 3.8,
      5: 4.3,
      5.5: 4.8,
      6: 5.4,
      6.5: 5.9,
      7: 6.4,
      7.5: 6.9,
      8: 7.4,
      8.5: 7.9,
      9: 8.4,
      9.5: 8.9,
      10: 9.4,
      10.5: 9.9,
      11: 10.4,
      11.5: 10.9,
      12: 11.4,
      12.5: 11.9,
      13: 12.4,
      13.5: 12.9,
      14: 13.4,
      14.5: 13.9,
      15: 14.4,
      15.5: 14.9,
      16: 15.4,
      16.5: 15.9,
      17: 16.4,
      17.5: 16.9,
      18: 17.4,
      18.5: 17.9,
      19: 18.4,
      19.5: 18.9,
      20: 19.4,
      20.5: 19.9,
      21: 20.4,
      21.5: 20.9,
      22: 21.4,
      22.5: 21.9,
      23: 22.4,
      23.5: 22.9,
      24: 23.4,
      24.5: 23.9,
      25: 24.4
    },
  8: {
      0: -0.6,
      0.5: -0.1,
      1: 0.4,
      1.5: 0.9,
      2: 1.4,
      2.5: 1.9,
      3: 2.4,
      3.5: 2.9,
      4: 3.4,
      4.5: 3.9,
      5: 4.4,
      5.5: 4.9,
      6: 5.4,
      6.5: 5.9,
      7: 6.4,
      7.5: 6.9,
      8: 7.4,
      8.5: 7.9,
      9: 8.4,
      9.5: 8.9,
      10: 9.4,
      10.5: 9.9,
      11: 10.4,
      11.5: 10.9,
      12: 11.4,
      12.5: 11.9,
      13: 12.4,
      13.5: 12.9,
      14: 13.4,
      14.5: 13.9,
      15: 14.4,
      15.5: 14.9,
      16: 15.4,
      16.5: 15.9,
      17: 16.5,
      17.5: 17,
      18: 17.5,
      18.5: 18,
      19: 18.5,
      19.5: 19,
      20: 19.5,
      20.5: 20,
      21: 20.5,
      21.5: 21,
      22: 21.5,
      22.5: 22,
      23: 22.5,
      23.5: 23,
      24: 23.5,
      24.5: 24,
      25: 24.5
    },
  9: {
      0: -0.6,
      0.5: -0.1,
      1: 0.4,
      1.5: 0.9,
      2: 1.4,
      2.5: 1.9,
      3: 2.4,
      3.5: 2.9,
      4: 3.4,
      4.5: 3.9,
      5: 4.4,
      5.5: 4.9,
      6: 5.5,
      6.5: 6,
      7: 6.5,
      7.5: 7,
      8: 7.5,
      8.5: 8,
      9: 8.5,
      9.5: 9,
      10: 9.5,
      10.5: 10,
      11: 10.5,
      11.5: 11,
      12: 11.5,
      12.5: 12,
      13: 12.5,
      13.5: 13,
      14: 13.5,
      14.5: 14,
      15: 14.5,
      15.5: 15,
      16: 15.5,
      16.5: 16,
      17: 16.5,
      17.5: 17,
      18: 17.5,
      18.5: 18,
      19: 18.5,
      19.5: 19,
      20: 19.5,
      20.5: 20,
      21: 20.5,
      21.5: 21,
      22: 21.5,
      22.5: 22,
      23: 22.5,
      23.5: 23,
      24: 23.5,
      24.5: 24,
      25: 24.5
    },
  10: {
      0: -0.5,
      0.5: 0,
      1: 0.5,
      1.5: 1,
      2: 1.5,
      2.5: 2,
      3: 2.5,
      3.5: 3,
      4: 3.5,
      4.5: 4,
      5: 4.5,
      5.5: 5,
      6: 5.5,
      6.5: 6,
      7: 6.5,
      7.5: 7,
      8: 7.5,
      8.5: 8,
      9: 8.5,
      9.5: 9,
      10: 9.5,
      10.5: 10,
      11: 10.5,
      11.5: 11,
      12: 11.5,
      12.5: 12,
      13: 12.5,
      13.5: 13,
      14: 13.5,
      14.5: 14,
      15: 14.5,
      15.5: 15,
      16: 15.5,
      16.5: 16,
      17: 16.5,
      17.5: 17,
      18: 17.5,
      18.5: 18,
      19: 18.5,
      19.5: 19.1,
      20: 19.6,
      20.5: 20.1,
      21: 20.6,
      21.5: 21.1,
      22: 21.6,
      22.5: 22.1,
      23: 22.6,
      23.5: 23.1,
      24: 23.6,
      24.5: 24.1,
      25: 24.6
    },
  11: {
      0: -0.5,
      0.5: 0,
      1: 0.5,
      1.5: 1,
      2: 1.5,
      2.5: 2,
      3: 2.5,
      3.5: 3,
      4: 3.5,
      4.5: 4,
      5: 4.5,
      5.5: 5,
      6: 5.6,
      6.5: 6.1,
      7: 6.6,
      7.5: 7.1,
      8: 7.6,
      8.5: 8.1,
      9: 8.6,
      9.5: 9.1,
      10: 9.6,
      10.5: 10.1,
      11: 10.6,
      11.5: 11.1,
      12: 11.6,
      12.5: 12.1,
      13: 12.6,
      13.5: 13.1,
      14: 13.6,
      14.5: 14.1,
      15: 14.6,
      15.5: 15.1,
      16: 15.6,
      16.5: 16.1,
      17: 16.6,
      17.5: 17.1,
      18: 17.6,
      18.5: 18.1,
      19: 18.6,
      19.5: 19.1,
      20: 19.6,
      20.5: 20.1,
      21: 20.6,
      21.5: 21.1,
      22: 21.6,
      22.5: 22.1,
      23: 22.6,
      23.5: 23.1,
      24: 23.6,
      24.5: 24.1,
      25: 24.6
    },
  12: {
      0: -0.4,
      0.5: 0.1,
      1: 0.6,
      1.5: 0.1,
      2: 1.6,
      2.5: 2.1,
      3: 2.6,
      3.5: 3.1,
      4: 3.6,
      4.5: 4.1,
      5: 4.6,
      5.5: 5.1,
      6: 5.6,
      6.5: 6.1,
      7: 6.6,
      7.5: 7.1,
      8: 7.6,
      8.5: 8.1,
      9: 8.6,
      9.5: 9.1,
      10: 9.6,
      10.5: 10.1,
      11: 10.6,
      11.5: 11.1,
      12: 11.6,
      12.5: 12.1,
      13: 12.6,
      13.5: 13.1,
      14: 13.6,
      14.5: 14.1,
      15: 14.6,
      15.5: 15.1,
      16: 15.6,
      16.5: 16.1,
      17: 16.6,
      17.5: 17.1,
      18: 17.6,
      18.5: 18.1,
      19: 18.6,
      19.5: 19.1,
      20: 19.6,
      20.5: 20.1,
      21: 20.6,
      21.5: 21.1,
      22: 21.6,
      22.5: 22.1,
      23: 22.6,
      23.5: 23.1,
      24: 23.7,
      24.5: 24.2,
      25: 24.7
    },
  13: {
      0: -0.4,
      0.5: 0.1,
      1: 0.6,
      1.5: 1.1,
      2: 1.6,
      2.5: 2.1,
      3: 2.6,
      3.5: 3.1,
      4: 3.6,
      4.5: 4.1,
      5: 4.6,
      5.5: 5.1,
      6: 5.7,
      6.5: 6.2,
      7: 6.7,
      7.5: 7.2,
      8: 7.7,
      8.5: 8.2,
      9: 8.7,
      9.5: 9.2,
      10: 9.7,
      10.5: 10.2,
      11: 10.7,
      11.5: 11.2,
      12: 11.7,
      12.5: 12.2,
      13: 12.7,
      13.5: 13.2,
      14: 13.7,
      14.5: 14.2,
      15: 14.7,
      15.5: 15.2,
      16: 15.7,
      16.5: 16.2,
      17: 16.7,
      17.5: 17.2,
      18: 17.7,
      18.5: 18.2,
      19: 18.7,
      19.5: 19.2,
      20: 19.7,
      20.5: 20.2,
      21: 20.7,
      21.5: 21.2,
      22: 21.7,
      22.5: 22.2,
      23: 22.7,
      23.5: 23.2,
      24: 23.7,
      24.5: 24.2,
      25: 24.7
    },
  14: {
      0: -0.3,
      0.5: 0.2,
      1: 0.7,
      1.5: 1.2,
      2: 1.7,
      2.5: 2.2,
      3: 2.7,
      3.5: 3.2,
      4: 3.7,
      4.5: 4.2,
      5: 4.7,
      5.5: 5.2,
      6: 5.7,
      6.5: 6.2,
      7: 6.7,
      7.5: 7.2,
      8: 7.7,
      8.5: 8.2,
      9: 8.7,
      9.5: 9.2,
      10: 9.7,
      10.5: 10.2,
      11: 10.7,
      11.5: 11.2,
      12: 11.7,
      12.5: 12.2,
      13: 12.7,
      13.5: 13.2,
      14: 13.7,
      14.5: 14.2,
      15: 14.7,
      15.5: 15.2,
      16: 15.7,
      16.5: 16.2,
      17: 16.7,
      17.5: 17.2,
      18: 17.7,
      18.5: 18.2,
      19: 18.7,
      19.5: 19.2,
      20: 19.7,
      20.5: 20.2,
      21: 20.7,
      21.5: 21.2,
      22: 21.7,
      22.5: 22.2,
      23: 22.7,
      23.5: 23.2,
      24: 23.7,
      24.5: 24.2,
      25: 24.7
    },
  15: {
      0: -0.3,
      0.5: -0.2,
      1: 0.7,
      1.5: 1.2,
      2: 1.7,
      2.5: 2.2,
      3: 2.7,
      3.5: 3.2,
      4: 3.7,
      4.5: 4.2,
      5: 4.7,
      5.5: 5.2,
      6: 5.8,
      6.5: 6.3,
      7: 6.8,
      7.5: 7.3,
      8: 7.8,
      8.5: 8.3,
      9: 8.8,
      9.5: 9.3,
      10: 9.8,
      10.5: 10.3,
      11: 10.8,
      11.5: 11.3,
      12: 11.8,
      12.5: 12.3,
      13: 12.8,
      13.5: 13.3,
      14: 13.8,
      14.5: 14.3,
      15: 14.8,
      15.5: 15.3,
      16: 15.8,
      16.5: 16.3,
      17: 16.8,
      17.5: 17.3,
      18: 17.8,
      18.5: 18.3,
      19: 18.8,
      19.5: 19.3,
      20: 19.8,
      20.5: 20.3,
      21: 20.8,
      21.5: 21.3,
      22: 21.8,
      22.5: 22.3,
      23: 22.8,
      23.5: 23.3,
      24: 23.8,
      24.5: 24.3,
      25: 24.8
    },
  16: {
      0: -0.2,
      0.5: 0.3,
      1: 0.8,
      1.5: 1.3,
      2: 1.8,
      2.5: 2.3,
      3: 2.8,
      3.5: 3.3,
      4: 3.8,
      4.5: 4.3,
      5: 4.8,
      5.5: 5.3,
      6: 5.8,
      6.5: 6.3,
      7: 6.8,
      7.5: 7.3,
      8: 7.8,
      8.5: 8.3,
      9: 8.8,
      9.5: 9.3,
      10: 9.8,
      10.5: 10.3,
      11: 10.8,
      11.5: 11.3,
      12: 11.8,
      12.5: 12.3,
      13: 12.8,
      13.5: 13.3,
      14: 13.8,
      14.5: 14.3,
      15: 14.8,
      15.5: 15.3,
      16: 15.8,
      16.5: 16.3,
      17: 16.8,
      17.5: 17.3,
      18: 17.8,
      18.5: 18.3,
      19: 18.8,
      19.5: 19.3,
      20: 19.8,
      20.5: 20.3,
      21: 20.8,
      21.5: 21.3,
      22: 21.8,
      22.5: 22.3,
      23: 22.8,
      23.5: 23.3,
      24: 23.8,
      24.5: 24.3,
      25: 24.8
    },
  17: {
      0: -0.2,
      0.5: 0.3,
      1: 0.8,
      1.5: 1.3,
      2: 1.8,
      2.5: 2.3,
      3: 2.8,
      3.5: 3.3,
      4: 3.8,
      4.5: 4.3,
      5: 4.8,
      5.5: 5.3,
      6: 5.8,
      6.5: 6.4,
      7: 6.9,
      7.5: 7.4,
      8: 7.9,
      8.5: 8.4,
      9: 8.9,
      9.5: 9.4,
      10: 9.9,
      10.5: 10.4,
      11: 10.9,
      11.5: 11.4,
      12: 11.9,
      12.5: 12.4,
      13: 12.9,
      13.5: 13.4,
      14: 13.9,
      14.5: 14.4,
      15: 14.9,
      15.5: 15.4,
      16: 15.9,
      16.5: 16.4,
      17: 16.9,
      17.5: 17.4,
      18: 17.9,
      18.5: 18.4,
      19: 18.9,
      19.5: 19.4,
      20: 19.9,
      20.5: 20.4,
      21: 20.9,
      21.5: 21.4,
      22: 21.9,
      22.5: 22.4,
      23: 22.9,
      23.5: 23.4,
      24: 23.9,
      24.5: 24.4,
      25: 24.9
    },
  18: {
      0: -0.1,
      0.5: 0.4,
      1: 0.9,
      1.5: 1.4,
      2: 1.9,
      2.5: 2.4,
      3: 2.9,
      3.5: 3.4,
      4: 3.9,
      4.5: 4.4,
      5: 4.9,
      5.5: 5.4,
      6: 5.9,
      6.5: 6.4,
      7: 6.9,
      7.5: 7.4,
      8: 7.9,
      8.5: 8.4,
      9: 8.9,
      9.5: 9.4,
      10: 9.9,
      10.5: 10.4,
      11: 10.9,
      11.5: 11.4,
      12: 11.9,
      12.5: 12.4,
      13: 12.9,
      13.5: 13.4,
      14: 13.9,
      14.5: 14.4,
      15: 14.9,
      15.5: 15.4,
      16: 15.9,
      16.5: 16.4,
      17: 16.9,
      17.5: 17.4,
      18: 17.9,
      18.5: 18.4,
      19: 18.9,
      19.5: 19.4,
      20: 19.9,
      20.5: 20.4,
      21: 20.9,
      21.5: 21.4,
      22: 21.9,
      22.5: 22.4,
      23: 22.9,
      23.5: 23.4,
      24: 23.9,
      24.5: 24.4,
      25: 24.9
    },
  19: {
      0: -0.1,
      0.5: 0.4,
      1: 0.9,
      1.5: 1.4,
      2: 1.9,
      2.5: 2.4,
      3: 2.9,
      3.5: 3.4,
      4: 3.9,
      4.5: 4.4,
      5: 4.9,
      5.5: 5.4,
      6: 5.9,
      6.5: 6.4,
      7: 7,
      7.5: 7.5,
      8: 8,
      8.5: 8.5,
      9: 9,
      9.5: 9.5,
      10: 10,
      10.5: 10.5,
      11: 11,
      11.5: 11.5,
      12: 12,
      12.5: 12.5,
      13: 13,
      13.5: 13.5,
      14: 14,
      14.5: 14.5,
      15: 15,
      15.5: 15.5,
      16: 16,
      16.5: 16.5,
      17: 17,
      17.5: 17.5,
      18: 18,
      18.5: 18.5,
      19: 19,
      19.5: 19.5,
      20: 20,
      20.5: 20.5,
      21: 21,
      21.5: 21.5,
      22: 22,
      22.5: 22.5,
      23: 23,
      23.5: 23.5,
      24: 24,
      24.5: 24.5,
      25: 25
    },
  20: {
      0: 0,
      0.5: 0.5,
      1: 1,
      1.5: 1.5,
      2: 2,
      2.5: 2.5,
      3: 3,
      3.5: 3.5,
      4: 4,
      4.5: 4.5,
      5: 5,
      5.5: 5.5,
      6: 6,
      6.5: 6.5,
      7: 7,
      7.5: 7.5,
      8: 8,
      8.5: 8.5,
      9: 9,
      9.5: 9.5,
      10: 10,
      10.5: 10.5,
      11: 11,
      11.5: 11.5,
      12: 12,
      12.5: 12.5,
      13: 13,
      13.5: 13.5,
      14: 14,
      14.5: 14.5,
      15: 15,
      15.5: 15.5,
      16: 16,
      16.5: 16.5,
      17: 17,
      17.5: 17.5,
      18: 18,
      18.5: 18.5,
      19: 19,
      19.5: 19.5,
      20: 20,
      20.5: 20.5,
      21: 21,
      21.5: 21.5,
      22: 22,
      22.5: 22.5,
      23: 23,
      23.5: 23.5,
      24: 24,
      24.5: 24.5,
      25: 25
    },
  21: {
      0: 0,
      0.5: 0.5,
      1: 1,
      1.5: 1.5,
      2: 2,
      2.5: 2.5,
      3: 3,
      3.5: 3.5,
      4: 4,
      4.5: 4.5,
      5: 5,
      5.5: 5.5,
      6: 6,
      6.5: 6.5,
      7: 7,
      7.5: 7.5,
      8: 8,
      8.5: 8.5,
      9: 9,
      9.5: 9.5,
      10: 10,
      10.5: 10.5,
      11: 11,
      11.5: 11.5,
      12: 12,
      12.5: 12.5,
      13: 13,
      13.5: 13.5,
      14: 14,
      14.5: 14.5,
      15: 15,
      15.5: 15.5,
      16: 16,
      16.5: 16.5,
      17: 17,
      17.5: 17.5,
      18: 18,
      18.5: 18.5,
      19: 19,
      19.5: 19.5,
      20: 20,
      20.5: 20.5,
      21: 21,
      21.5: 21.5,
      22: 22,
      22.5: 22.5,
      23: 23,
      23.5: 23.5,
      24: 24,
      24.5: 24.5,
      25: 25
    },
  22: {
      0: 0.1,
      0.5: 0.6,
      1: 1.1,
      1.5: 1.6,
      2: 2.1,
      2.5: 2.6,
      3: 3.1,
      3.5: 3.6,
      4: 4.1,
      4.5: 4.6,
      5: 5.1,
      5.5: 5.6,
      6: 6.1,
      6.5: 6.6,
      7: 7.1,
      7.5: 7.6,
      8: 8.1,
      8.5: 8.6,
      9: 9.1,
      9.5: 9.6,
      10: 10.1,
      10.5: 10.6,
      11: 11.1,
      11.5: 11.6,
      12: 12.1,
      12.5: 12.6,
      13: 13.1,
      13.5: 13.6,
      14: 14.1,
      14.5: 14.6,
      15: 15.1,
      15.5: 15.6,
      16: 16.1,
      16.5: 16.6,
      17: 17.1,
      17.5: 17.6,
      18: 18.1,
      18.5: 18.6,
      19: 19.1,
      19.5: 19.6,
      20: 20.1,
      20.5: 20.6,
      21: 21.1,
      21.5: 21.6,
      22: 22.1,
      22.5: 22.6,
      23: 23.1,
      23.5: 23.6,
      24: 24.1,
      24.5: 24.6,
      25: 25.1
    },
  23: {
      0: 0.2,
      0.5: 0.7,
      1: 1.2,
      1.5: 1.7,
      2: 2.2,
      2.5: 2.6,
      3: 3.1,
      3.5: 3.6,
      4: 4.1,
      4.5: 4.6,
      5: 5.1,
      5.5: 5.6,
      6: 6.1,
      6.5: 6.6,
      7: 7.1,
      7.5: 7.6,
      8: 8.1,
      8.5: 8.6,
      9: 9.1,
      9.5: 9.6,
      10: 10.1,
      10.5: 10.6,
      11: 11.1,
      11.5: 11.6,
      12: 12.1,
      12.5: 12.6,
      13: 13.1,
      13.5: 13.6,
      14: 14.1,
      14.5: 14.6,
      15: 15.1,
      15.5: 15.6,
      16: 16.1,
      16.5: 16.6,
      17: 17.1,
      17.5: 17.6,
      18: 18.1,
      18.5: 18.6,
      19: 19.1,
      19.5: 19.6,
      20: 20.1,
      20.5: 20.6,
      21: 21.1,
      21.5: 21.6,
      22: 22.1,
      22.5: 22.6,
      23: 23.1,
      23.5: 23.6,
      24: 24.1,
      24.5: 24.6,
      25: 25.1
    },
  24: {
      0: 0.2,
      0.5: 0.7,
      1: 1.2,
      1.5: 1.7,
      2: 2.2,
      2.5: 2.7,
      3: 3.2,
      3.5: 3.7,
      4: 4.2,
      4.5: 4.7,
      5: 5.2,
      5.5: 5.7,
      6: 6.2,
      6.5: 6.7,
      7: 7.2,
      7.5: 7.7,
      8: 8.2,
      8.5: 8.7,
      9: 9.2,
      9.5: 9.7,
      10: 10.2,
      10.5: 10.7,
      11: 11.2,
      11.5: 11.7,
      12: 12.2,
      12.5: 12.7,
      13: 13.2,
      13.5: 13.7,
      14: 14.2,
      14.5: 14.7,
      15: 15.2,
      15.5: 15.7,
      16: 16.2,
      16.5: 16.7,
      17: 17.2,
      17.5: 17.7,
      18: 18.2,
      18.5: 18.7,
      19: 19.2,
      19.5: 19.7,
      20: 20.2,
      20.5: 20.7,
      21: 21.2,
      21.5: 21.7,
      22: 22.2,
      22.5: 22.7,
      23: 23.2,
      23.5: 23.7,
      24: 24.2,
      24.5: 24.7,
      25: 25.2
    },
  25: {
      0: 0.3,
      0.5: 0.8,
      1: 1.3,
      1.5: 1.8,
      2: 2.3,
      2.5: 2.8,
      3: 3.3,
      3.5: 3.7,
      4: 4.2,
      4.5: 4.7,
      5: 5.2,
      5.5: 5.7,
      6: 6.2,
      6.5: 6.7,
      7: 7.2,
      7.5: 7.7,
      8: 8.2,
      8.5: 8.7,
      9: 9.2,
      9.5: 9.7,
      10: 10.2,
      10.5: 10.7,
      11: 11.2,
      11.5: 11.7,
      12: 12.2,
      12.5: 12.7,
      13: 13.2,
      13.5: 13.7,
      14: 14.2,
      14.5: 14.7,
      15: 15.2,
      15.5: 15.7,
      16: 16.2,
      16.5: 16.7,
      17: 17.2,
      17.5: 17.7,
      18: 18.2,
      18.5: 18.7,
      19: 19.2,
      19.5: 19.7,
      20: 20.2,
      20.5: 20.7,
      21: 21.2,
      21.5: 21.7,
      22: 22.2,
      22.5: 22.7,
      23: 23.2,
      23.5: 23.7,
      24: 24.2,
      24.5: 24.7,
      25: 25.2
    },
  26: {
      0: 0.3,
      0.5: 0.8,
      1: 1.3,
      1.5: 1.8,
      2: 2.3,
      2.5: 2.8,
      3: 3.3,
      3.5: 3.8,
      4: 4.3,
      4.5: 4.8,
      5: 5.3,
      5.5: 5.8,
      6: 6.3,
      6.5: 6.8,
      7: 7.3,
      7.5: 7.8,
      8: 8.3,
      8.5: 8.8,
      9: 9.3,
      9.5: 9.8,
      10: 10.3,
      10.5: 10.8,
      11: 11.3,
      11.5: 11.8,
      12: 12.3,
      12.5: 12.8,
      13: 13.3,
      13.5: 13.8,
      14: 14.3,
      14.5: 14.8,
      15: 15.3,
      15.5: 15.8,
      16: 16.3,
      16.5: 16.8,
      17: 17.3,
      17.5: 17.8,
      18: 18.3,
      18.5: 18.8,
      19: 19.3,
      19.5: 19.8,
      20: 20.3,
      20.5: 20.8,
      21: 21.3,
      21.5: 21.8,
      22: 22.3,
      22.5: 22.8,
      23: 23.3,
      23.5: 23.8,
      24: 24.3,
      24.5: 24.8,
      25: 25.3
    },
  27: {
      0: 0.4,
      0.5: 0.9,
      1: 1.4,
      1.5: 1.9,
      2: 2.4,
      2.5: 2.9,
      3: 3.4,
      3.5: 3.9,
      4: 4.3,
      4.5: 4.8,
      5: 5.3,
      5.5: 5.8,
      6: 6.3,
      6.5: 6.8,
      7: 7.3,
      7.5: 7.8,
      8: 8.3,
      8.5: 8.8,
      9: 9.3,
      9.5: 9.8,
      10: 10.3,
      10.5: 10.8,
      11: 11.3,
      11.5: 11.8,
      12: 12.3,
      12.5: 12.8,
      13: 13.3,
      13.5: 13.8,
      14: 14.3,
      14.5: 14.8,
      15: 15.3,
      15.5: 15.8,
      16: 16.3,
      16.5: 16.8,
      17: 17.3,
      17.5: 17.8,
      18: 18.3,
      18.5: 18.8,
      19: 19.3,
      19.5: 19.8,
      20: 20.3,
      20.5: 20.8,
      21: 21.3,
      21.5: 21.8,
      22: 22.3,
      22.5: 22.8,
      23: 23.3,
      23.5: 23.8,
      24: 24.3,
      24.5: 24.8,
      25: 25.3
    },
  28: {
      0: 0.4,
      0.5: 0.9,
      1: 1.4,
      1.5: 1.9,
      2: 2.4,
      2.5: 2.9,
      3: 3.4,
      3.5: 3.9,
      4: 4.4,
      4.5: 4.9,
      5: 5.4,
      5.5: 5.9,
      6: 6.4,
      6.5: 6.9,
      7: 7.4,
      7.5: 7.9,
      8: 8.4,
      8.5: 8.9,
      9: 9.4,
      9.5: 9.9,
      10: 10.4,
      10.5: 10.9,
      11: 11.4,
      11.5: 11.9,
      12: 12.4,
      12.5: 12.9,
      13: 13.4,
      13.5: 13.9,
      14: 14.4,
      14.5: 14.9,
      15: 15.4,
      15.5: 15.9,
      16: 16.4,
      16.5: 16.9,
      17: 17.4,
      17.5: 17.9,
      18: 18.4,
      18.5: 18.9,
      19: 19.4,
      19.5: 19.9,
      20: 20.4,
      20.5: 20.9,
      21: 21.4,
      21.5: 21.9,
      22: 22.4,
      22.5: 22.9,
      23: 23.4,
      23.5: 23.8,
      24: 24.3,
      24.5: 24.8,
      25: 25.3
    },
  29: {
      0: 0.5,
      0.5: 1,
      1: 1.5,
      1.5: 2,
      2: 2.5,
      2.5: 3,
      3: 3.5,
      3.5: 4,
      4: 4.5,
      4.5: 4.9,
      5: 5.4,
      5.5: 5.9,
      6: 6.4,
      6.5: 6.9,
      7: 7.4,
      7.5: 7.9,
      8: 8.4,
      8.5: 8.9,
      9: 9.4,
      9.5: 9.9,
      10: 10.4,
      10.5: 10.9,
      11: 11.4,
      11.5: 11.9,
      12: 12.4,
      12.5: 12.9,
      13: 13.4,
      13.5: 13.9,
      14: 14.4,
      14.5: 14.9,
      15: 15.4,
      15.5: 15.9,
      16: 16.4,
      16.5: 16.9,
      17: 17.4,
      17.5: 17.9,
      18: 18.4,
      18.5: 18.9,
      19: 19.4,
      19.5: 19.9,
      20: 20.4,
      20.5: 20.9,
      21: 21.4,
      21.5: 21.9,
      22: 22.4,
      22.5: 22.9,
      23: 23.4,
      23.5: 23.9,
      24: 24.4,
      24.5: 24.9,
      25: 25.4
    },
  30: {
    0: 0.5,
    0.5: 1,
    1: 1.5,
    1.5: 2,
    2: 2.5,
    2.5: 3,
    3: 3.5,
    3.5: 4,
    4: 4.5,
    4.5: 5,
    5: 5.5,
    5.5: 6,
    6: 6.5,
    6.5: 7,
    7: 7.5,
    7.5: 8,
    8: 8.5,
    8.5: 9,
    9: 9.5,
    9.5: 10,
    10: 10.5,
    10.5: 11,
    11: 11.5,
    11.5: 12,
    12: 12.5,
    12.5: 13,
    13: 13.5,
    13.5: 14,
    14: 14.5,
    14.5: 15,
    15: 15.5,
    15.5: 16,
    16: 16.5,
    16.5: 17,
    17: 17.5,
    17.5: 18,
    18: 18.5,
    18.5: 19,
    19: 19.5,
    19.5: 20,
    20: 20.5,
    20.5: 20.9,
    21: 21.4,
    21.5: 21.9,
    22: 22.4,
    22.5: 22.9,
    23: 23.4,
    23.5: 23.9,
    24: 24.4,
    24.5: 24.9,
    25: 25.4
  }
}


export default function AS3() {

  const [temperature, setTemperature] = useState(25)
  const [sugarContent, setSugarContent] = useState(10)
  const [correction, setCorrection] = useState()
  const [error, setError] = useState(false)

  
  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "as3"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])

  useEffect(() => {

    const sugar = parseFloat(sugarContent)
    const temp = parseFloat(temperature)

    if(Math.round(temp) <= 30 && Math.round(temp) >= 0 && sugar >= 0 && sugar <= 25){
      
      const decimal = sugar.toFixed(1)
      const point = decimal.toString().split(".")[1]

      if(parseInt(point) === 5 || parseInt(point) === 0){
        
        const result = table[Math.round(temp)][sugar]
        setCorrection(result)
        setError(false)
      }    
      else{
        setError("Lütfen şeker oranını tam sayı veya .5 ile biten değerler giriniz!")
      }

    }
    else{
      setError("Sıcaklık değeri 0-30, şeker oranı 0-25 aralığında olmalıdır!")
    }

  }, [temperature, sugarContent])

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/areometre.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}  
        </h1>
      </div>
      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Sıcaklık"
            unit="°C"
            value={temperature}
            setter={setTemperature}
          />
          <Input
            title="Şeker Oranı"
            unit="%"
            value={sugarContent}
            setter={setSugarContent}
          /> 
        </div>
        <div className="calc-result">   
            <div className="flex justify-between w-full pt-2">
              {error ? (
                <p className="text-red-500">
                  {error}
                </p>
              ) : (
                <>
                  <span>Gerçek Şeker Oranı :</span>
                  <span><b>{correction}</b> %</span>
                </>
                )
              }
            </div>  
        </div>
      </div>

      <div className="accordions">
        {data?.accordions?.length > 0 && (
          data.accordions.map((accordion, index) => (
            <Accordion title={accordion.title} content={accordion.content} key={index} />
          ))
        )}
      </div>

    </div>
  )
}
