import { reverse } from "lodash";
import TextField from "@mui/material/TextField";
import useScoreCounterStore from "./store";
import Table from "@mui/material/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  TableContainer,
  Grid,
} from "@mui/material";

function isValidTempScore(tempScore: string) {
  return /^-?\d+$/.test(tempScore);
}

function ScoreTable() {
  const player1Name = useScoreCounterStore((state) => state.player1Name);
  const setPlayer1Name = useScoreCounterStore((state) => state.setPlayer1Name);
  const player2Name = useScoreCounterStore((state) => state.player2Name);
  const setPlayer2Name = useScoreCounterStore((state) => state.setPlayer2Name);

  const rounds = useScoreCounterStore((state) => state.rounds);
  const addRound = useScoreCounterStore((state) => state.addGameRound);

  const player1TempScore = useScoreCounterStore(
    (state) => state.player1TempScore
  );
  const setPlayer1TempScore = useScoreCounterStore(
    (state) => state.setPlayer1TempScore
  );
  const player2TempScore = useScoreCounterStore(
    (state) => state.player2TempScore
  );
  const setPlayer2TempScore = useScoreCounterStore(
    (state) => state.setPlayer2TempScore
  );
  const player1TotalScore = useScoreCounterStore((state) =>
    state.getPlayer1TotalScore()
  );
  const player2TotalScore = useScoreCounterStore((state) =>
    state.getPlayer2TotalScore()
  );
  const clearRounds = useScoreCounterStore((state) => state.clearRounds);
  const removeLastRound = useScoreCounterStore(
    (state) => state.removeLastRound
  );

  const reversedRounds = reverse(rounds.slice());

  const isPlayer1TempScoreValid = isValidTempScore(player1TempScore);
  const isPlayer2TempScoreValid = isValidTempScore(player2TempScore);
  const canSubmit = isPlayer1TempScoreValid && isPlayer2TempScoreValid;

  return (
    <div>
      <h1>🃏 Score Table</h1>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4} md={2}>
          <TextField
            variant="standard"
            onChange={(e) => {
              setPlayer1TempScore(e.target.value);
            }}
            value={player1TempScore}
            label={`${player1Name} Score`}
            error={!isPlayer1TempScoreValid}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <TextField
            variant="standard"
            onChange={(e) => {
              setPlayer2TempScore(e.target.value);
            }}
            value={player2TempScore}
            label={`${player2Name} Score`}
            error={!isPlayer2TempScoreValid}
          />
        </Grid>
        <Grid item xs={8} md={2}>
          <Button
            variant="contained"
            disabled={!canSubmit}
            onClick={() => {
              addRound({
                player1Score: parseInt(player1TempScore),
                player2Score: parseInt(player2TempScore),
              });
              setPlayer1TempScore("0");
              setPlayer2TempScore("0");
            }}
          >
            Add
          </Button>
          <Button onClick={() => removeLastRound()}>Undo</Button>
          <Button color="error" onClick={() => clearRounds()}>
            Clear
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 3 }}>
        <Grid item xs={12} sm={8} md={6} sx={{ marginLeft: 3, marginRight: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Round</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {player1Name}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {player2Name}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Total</b>
                  </TableCell>
                  <TableCell>
                    <b>{player1TotalScore.toString()}</b>
                  </TableCell>
                  <TableCell>
                    <b>{player2TotalScore.toString()}</b>
                  </TableCell>
                </TableRow>
                {reversedRounds.map((round, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      {reversedRounds.length - idx}
                    </TableCell>
                    <TableCell>{round.player1Score}</TableCell>
                    <TableCell>{round.player2Score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: 25 }}
      >
        <Grid item xs={4} md={2}>
          <TextField
            variant="standard"
            label="Player 1 Name"
            size="small"
            onChange={(e) => setPlayer1Name(e.target.value)}
            content={player1Name}
            defaultValue={player1Name}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <TextField
            variant="standard"
            label="Player 2 Name"
            size="small"
            onChange={(e) => setPlayer2Name(e.target.value)}
            content={player2Name}
            defaultValue={player2Name}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ScoreTable;
