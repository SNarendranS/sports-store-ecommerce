import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme
} from "@mui/material";

const SnakeGame = () => {
    const theme = useTheme();
    const boardSize = 20; // 20x20 grid
    const speed = 140;

    const [snake, setSnake] = useState([[3, 3]]);
    const [direction, setDirection] = useState("RIGHT");
    const [food, setFood] = useState([10, 10]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [paused, setPaused] = useState(false);

    // ------------------------
    // Key Controls
    // ------------------------
    useEffect(() => {
        const keyHandler = (e) => {
            if ((e.key === "w" || e.key === "W" || e.key === "ArrowUp") && direction !== "DOWN") setDirection("UP");
            if ((e.key === "s" || e.key === "S" || e.key === "ArrowDown") && direction !== "UP") setDirection("DOWN");
            if ((e.key === "a" || e.key === "A" || e.key === "ArrowLeft") && direction !== "RIGHT") setDirection("LEFT");
            if ((e.key === "d" || e.key === "D" || e.key === "ArrowRight") && direction !== "LEFT") setDirection("RIGHT");
        };

        window.addEventListener("keydown", keyHandler);
        return () => window.removeEventListener("keydown", keyHandler);
    }, [direction]);

    // ------------------------
    // Game Loop
    // ------------------------
    useEffect(() => {
        if (gameOver || paused) return;

        const interval = setInterval(moveSnake, speed);
        return () => clearInterval(interval);
    });

    const moveSnake = () => {
        const newSnake = [...snake];
        const head = [...newSnake[0]];

        if (direction === "UP") head[1] -= 1;
        if (direction === "DOWN") head[1] += 1;
        if (direction === "LEFT") head[0] -= 1;
        if (direction === "RIGHT") head[0] += 1;

        // Hit walls
        if (
            head[0] < 0 ||
            head[0] >= boardSize ||
            head[1] < 0 ||
            head[1] >= boardSize
        ) {
            setGameOver(true);
            return;
        }

        // Hit itself
        if (snake.some((cell) => cell[0] === head[0] && cell[1] === head[1])) {
            setGameOver(true);
            return;
        }

        newSnake.unshift(head);

        if (head[0] === food[0] && head[1] === food[1]) {
            setScore((s) => s + 1);
            spawnFood(newSnake);
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    const spawnFood = (snakeBody) => {
        let newFood;
        do {
            newFood = [
                Math.floor(Math.random() * boardSize),
                Math.floor(Math.random() * boardSize),
            ];
        } while (snakeBody.some((c) => c[0] === newFood[0] && c[1] === newFood[1]));

        setFood(newFood);
    };

    const restart = () => {
        setSnake([[3, 3]]);
        setDirection("RIGHT");
        setFood([10, 10]);
        setScore(0);
        setGameOver(false);
        setPaused(false);
    };

    return (
        <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                🐍 Snake Game (MUI)
            </Typography>

            {/* Score */}
            <Typography variant="h6" sx={{ mb: 3, color: theme.palette.primary.main }}>
                Score: {score}
            </Typography>

            {/* Game Board */}
            <Paper
                elevation={6}
                sx={{
                    width: 360,
                    height: 360,
                    margin: "auto",
                    display: "grid",
                    borderRadius: 3,
                    overflow: "hidden",
                    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
                    gridTemplateRows: `repeat(${boardSize}, 1fr)`,
                    background:
                        theme.palette.mode === "dark"
                            ? "#0b0b0b"
                            : "#f0f6ff",
                    border: `3px solid ${theme.palette.primary.main}`,
                }}
            >
                {/* Snake */}
                {snake.map((segment, i) => (
                    <Box
                        key={i}
                        sx={{
                            gridColumn: segment[0] + 1,
                            gridRow: segment[1] + 1,
                            bgcolor: i === 0 ? theme.palette.primary.light : theme.palette.primary.main,
                            borderRadius: 0.5,
                            transition: "0.05s",
                        }}
                    />
                ))}

                {/* Food */}
                <Box
                    sx={{
                        gridColumn: food[0] + 1,
                        gridRow: food[1] + 1,
                        bgcolor: theme.palette.error.main,
                        borderRadius: "50%",
                    }}
                />
            </Paper>

            {/* Buttons */}
            <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setPaused((p) => !p)}
                >
                    {paused ? "Resume" : "Pause"}
                </Button>

                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={restart}
                >
                    Restart
                </Button>
            </Stack>

            {/* Game Over Dialog */}
            <Dialog open={gameOver} onClose={restart}>
                <DialogTitle>Game Over 😢</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Your Score: {score}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={restart} variant="contained">
                        Play Again
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SnakeGame;
