import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GameRound {
  player1Score: number;
  player2Score: number;
}

interface ScoreCounterState {
  player1Name: string;
  player2Name: string;
  setPlayer1Name: (name: string) => void;
  setPlayer2Name: (name: string) => void;

  player1TempScore: number;
  player2TempScore: number;
  setPlayer1TempScore: (score: number) => void;
  setPlayer2TempScore: (score: number) => void;

  getPlayer1TotalScore: () => number;
  getPlayer2TotalScore: () => number;

  rounds: GameRound[];
  addGameRound: (round: GameRound) => void;
  clearRounds: () => void;
  removeLastRound: () => void;
}

const useScoreCounterStore = create<ScoreCounterState>()(
  devtools(
    persist(
      (set, get) => ({
        player1Name: "Player 1",
        player2Name: "Player 2",
        rounds: [
        ],
        setPlayer1Name: (name: string) => set({ player1Name: name }),
        setPlayer2Name: (name: string) => set({ player2Name: name }),

        player1TempScore: 0,
        player2TempScore: 0,
        setPlayer1TempScore: (score: number) =>
          set({ player1TempScore: score }),
        setPlayer2TempScore: (score: number) =>
          set({ player2TempScore: score }),

        addGameRound: (round: GameRound) =>
          set((state: ScoreCounterState) => ({
            rounds: [...state.rounds, round],
          })),
        clearRounds: () => set({ rounds: [] }),
        removeLastRound: () => set({ rounds: get().rounds.slice(0, -1) }),

        getPlayer1TotalScore: () =>
          get().rounds.reduce((acc, round) => acc + round.player1Score, 0),
        getPlayer2TotalScore: () =>
          get().rounds.reduce((acc, round) => acc + round.player2Score, 0),
      }),
      {
        name: "score-counter",
      }
    )
  )
);

export default useScoreCounterStore;
