/**
  https://leetcode.com/problems/minimum-path-sum/

Given a m x n grid filled with non-negative numbers, find a path from top left 
to bottom right, which minimizes the sum of all numbers along its path.
Note: You can only move either down or right at any point in time.
Input: grid = [
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

Example 2:
Input: grid = [
  [1,2,3],
  [4,5,6]
]
Output: 12
Explanation: Because the path 1 → 2 → 3 → 4 → 5 → 6 minimizes the sum.
**/

function minPathSum(grid) {
  // set row and column variables
  let row = grid.length;
  let col = grid[0].length;

  // build 2D memo table and fill with starting element value
  let memoTable = [];

  for (let i = 0; i < row; i++) {
    memoTable[i] = [];
    for (let j = 0; j < col; j++) {
      memoTable[i][j] = grid[0][0];
    }
  }

  // for each row from 1 to the end
  for (let i = 1; i < row; i++) {
    // set the value in memo table as the sum of the previous value in the
    // memo table plus the value of the current grid item.
    memoTable[i][0] = memoTable[i - 1][0] + grid[i][0];
  }

  // do the same thing with the columns
  for (let j = 1; j < col; j++) {
    memoTable[0][j] = memoTable[0][j - 1] + grid[0][j];
  }

  //  iterate through the entire grid
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      // the recurrence/decision at each cell is to take the
      // minimum of either the row above or column to the right
      // PLUS the cost of the mirroring spot on the original grid
      // since we need to ADD that cost to our path as we traverse the grid
      memoTable[i][j] = Math.min(
        memoTable[i - 1][j],
        memoTable[i][j - 1] + grid[i][j]
      );
    }
  }
  console.log(memoTable);
  // return the last/bottom most element in the memo table
  // this is our minimum path
  return memoTable[row - 1][col - 1];
}

const grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];

console.log(minPathSum(grid));

/**
 https://leetcode.com/problems/unique-paths/

A robot is located at the top-left corner of a m x n grid. (Marked S in grid)
The robot can only move either down or right at any point in time. 
The robot is trying to reach the bottom-right corner of the grid (Marked F in grid).
How many possible unique paths are there?

input: m = 3, n = 7
grid = [
  [S, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, F]
]
output: 28

input: m = 3, n = 2
grid = [
  [S, 0],
  [0, 0],
  [0, F]
]
output: 3
explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
**/

function uniquePaths(m, n) {
  // create 2D memo table that is m x n ; set default val to 1 since it is unknown
  let T = [];
  for (let i = 0; i < m; i++) {
    T[i] = [];
    for (let j = 0; j < n; j++) {
      T[i][j] = 1;
    }
  }

  // traverse grid rows starting at row 1
  for (let i = 1; i < m; i++) {
    // traverse grid columns starting at col 1
    for (let j = 1; j < n; j++) {
      // set the corresponding cell value in DP to the
      // costs of the cells values one row above plus
      // one column to the left
      T[i][j] = T[i - 1][j] + T[i][j - 1];
    }
  }

  // return the last/bottom most element in the table
  return T[m - 1][n - 1];
}

console.log(uniquePaths(3, 2));

/**
 https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a 
different day in the future to sell that stock.
Return the maximum profit you can achieve from this transaction. 
If you cannot achieve any profit, return 0.

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
**/

/**
 https://leetcode.com/problems/min-cost-climbing-stairs/

On a staircase, the i-th step has some non-negative cost cost[i] assigned (0 indexed).
Once you pay the cost, you can either climb one or two steps. You need to find minimum 
cost to reach the top of the floor, and you can either start from the step with index 0, 
or the step with index 1. 

input cost = [10, 15, 20]
output: 15
Explanation: Cheapest is start on cost[1], pay that cost and go to the top.

Input: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
Output: 6
Explanation: Cheapest is start on cost[0], and only step on 1s, skipping cost[3].
 */

function minCostStairs(cost) {
  // create 1D memo table
  let T = [];
  for (let i = 0; i < cost.length; i++) {
    T[i] = 0;
  }
  // set the 0th and 1st values equal to the 0th and 1st vals in cost array
  T[0] = cost[0];
  T[1] = cost[1];
  // starting at element 2, iterate through length of cost array
  for (let i = 2; i < cost.length; i++) {
    T[i] = cost[i] + Math.min(cost[i - 1], cost[i - 2]);
  }
  // # set the value for the ith cost to be
  // # the cost at position i, plus the minimum of
  // # the 1st previous element or 2nd prev element
  // # return the smallest of the last element or second to last element
  return min(T[cost.length - 1], T[cost.length - 2]);
}

/**
 https://leetcode.com/problems/coin-change/description/

 You are given an integer array coins representing coins of different denominations
 and an integer amount representing a total amount of money.

 Return the fewest number of coins that you need to make up that amount. 
 If that amount of money cannot be made up by any combination of the coins, return -1.

 You may assume that you have an infinite number of each kind of coin.

 Example 1:
 Input: coins = [1,2,5], amount = 11
 Output: 3
 Explanation: 11 = 5 + 5 + 1

 Example 2:
 Input: coins = [2], amount = 3
 Output: -1
 Example 3:

 Input: coins = [1], amount = 0
 Output: 0
*/

function coinChange(coins, amount) {
  // if amount is 0, return 0
  if (amount === 0) {
    return 0;
  }

  // declare var to store number of ways to make change
  // plus 1. Number of ways will always be the amount,
  // because we're able to use pennies...
  let numWays = amount + 1;

  // declare 1D memo table
  let T = [];
  for (let i = 0; i < numWays; i++) {
    // fill 0th element with 0, the remaining as Infinity

    if (i === 0) {
      T[i] = 0;
    } else {
      T[i] = Infinity;
    }
  }

  // iterate over the coins array
  for (let i = 0; i < coins.length; i++) {
    // while iterating over our number of ways array
    for (let j = 0; j < numWays; j++) {
      // pull out current coin value in it's own variable

      let coin = coins[i];

      // if the current index is greater than or equal
      // to the current coin value
      if (j >= coin) {
        // and if the current value of our memo table is greater than
        // 1 + the current value of our memo table minus the current coin value
        if (T[j] > 1 + T[j - coin]) {
          // then set the current value of our memo table
          // to 1 + the current value of our memo table minus the current coin value
          T[j] = 1 + T[j - coin];
        }
      }
    }
  }

  // if the last element in the memo table is Infinity
  // return -1
  // else return the last element in the memo table

  return T[numWays - 1] === Infinity ? -1 : T[numWays - 1];
}

/**
 https://leetcode.com/problems/house-robber/

 You are a professional robber planning to rob houses along a street. 
 Each house has a certain amount of money stashed, the only constraint 
 stopping you from robbing each of them is that adjacent houses have 
 security systems connected and it will automatically contact the police 
 if two adjacent houses were broken into on the same night.

 Given an integer array nums representing the amount of money of each house, 
 return the maximum amount of money you can rob tonight without alerting the police.


 Example 1:
 Input: nums = [1,2,3,1]
 Output: 4
 Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 Total amount you can rob = 1 + 3 = 4.

 Example 2:
 Input: nums = [2,7,9,3,1]
 Output: 12
 Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
 Total amount you can rob = 2 + 9 + 1 = 12.
 */

function rob(houses) {
  // zero houses check
  if (houses.length === 0) {
    return 0;
  }

  // create 1D memo table, filling with 0's
  let T = [];
  for (let i = 0; i < houses.length; i++) {
    T[i] = 0;
  }

  // set T(1) base case as first house
  T[1] = houses[0];

  // iterate over houses and pull out individual rob value
  // we start at 1 because we want to look at the second house
  // T[1] already has the rob value of the first house
  for (let i = 1; i < houses.length; i++) {
    let val = houses[i];
    // we are trying to set the value for our memo table
    // based on the previous home's rob value
    // so we take the max of the previous house + current house,
    // or the previous house if that value was greater
    // we do this b/c we can't rob two adjacent houses
    T[i + 1] = Math.max(T[i - 1] + val, T[i]);
  }

  return T[houses.length];
}

console.log(rob([2, 7, 9, 3, 1]));
