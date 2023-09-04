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
} from "@mui/material";

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

  return (
    <div>
      <h1>Score Table</h1>
      <TextField
        variant="standard"
        onChange={(e) => setPlayer1TempScore(parseInt(e.target.value))}
        value={player1TempScore.toString()}
        label={`${player1Name} Score`}
        type="number"
        style={{ marginRight: 25 }}
      />
      <TextField
        variant="standard"
        onChange={(e) => setPlayer2TempScore(parseInt(e.target.value))}
        value={player2TempScore.toString()}
        label={`${player2Name} Score`}
        type="number"
        style={{ marginRight: 25 }}
      />
      <Button
        variant="contained"
        onClick={() => {
          addRound({
            player1Score: player1TempScore,
            player2Score: player2TempScore,
          });
          setPlayer1TempScore(0);
          setPlayer2TempScore(0);
        }}
      >
        Add
      </Button>
      <Button onClick={() => removeLastRound()}>Undo</Button>
      <Button color="error" onClick={() => clearRounds()}>
        Clear
      </Button>
      <div
        style={{
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 25,
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: 'bold'}}>Round</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>{player1Name}</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>{player2Name}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Total</b>
                </TableCell>
                <TableCell>
                  <b>{player1TotalScore}</b>
                </TableCell>
                <TableCell>
                  <b>{player2TotalScore}</b>
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
      </div>
      <div id="settings" style={{ marginTop: 25 }}>
        <TextField
          variant="standard"
          label="Player 1 Name"
          size="small"
          onChange={(e) => setPlayer1Name(e.target.value)}
          content={player1Name}
          defaultValue={player1Name}
          sx={{ marginRight: 5 }}
        />
        <TextField
          variant="standard"
          label="Player 2 Name"
          size="small"
          onChange={(e) => setPlayer2Name(e.target.value)}
          content={player2Name}
          defaultValue={player2Name}
        />
      </div>
    </div>
  );
}

export default ScoreTable;
