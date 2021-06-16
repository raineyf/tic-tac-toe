# tic-tac-toe

This repo is for a tic-tac-toe project, inspired by [Coding Train's Tic-Tac-Toe Coding Challenge](https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_154_Tic_Tac_Toe_Minimax).

This is built with React. To run, simply pull down the repo and run `npm start`.

## On Accessibility:

This game is **not** accessible in its current state. It needs accessible names for most buttons, `aria-live` attributes, and, ideally, an easy way to communicate the board status to users of assistive technologies.

## On gameplay:

This game is unbeatable when the human player plays as "o," as "o" goes second. The computer strategy is purely offensive, so the cpu will, at worst, tie, given the first move. When the human player elects to go first, the cpu is beatable, given the offense-only strategy.
