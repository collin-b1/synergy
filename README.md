# Synergy

Synergy is a puzzle game based on the classic "Lunar Landing" puzzle by [Binary Arts](https://en.wikipedia.org/wiki/ThinkFun).

## Game Objective

The goal of the game is to move the player onto the portal tile. The player may only move in the cardinal directions, and must continue to move until he runs into an obstacle. The player may not move off the grid or make any partial movements. Obstacles may also be moved in the same fashion as the player, and follow the same movement rules.

Obstacles may be placed on top of the portal tile, but will not count as completion. Additionally, the player must land directly on top of the portal to trigger a win; moving over the portal is not enough.

## Development

### Getting started

1. Clone the repository

```
$ git clone https://github.com/collin-b1/synergy.git
$ cd synergy
```

2. Install dependencies

```
$ npm install
```

3. Run developer environment

```
$ npm run dev
```

### Adding new levels

To add a new level to the base game, "Export" the level from the editor and add it to the levels array in `src/api/index.ts` (this is subject to change).
