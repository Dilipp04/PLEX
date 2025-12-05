import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { settokenInLS, isLoggedIn } = useAuth();
    const Navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            Navigate("/");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${import.meta.env.VITE_API}/api/auth/login`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const json = await response.json();
        settokenInLS(json.token);

        if (response.ok) {
            setEmail("");
            setPassword("");
            Navigate("/");
        } else {
            alert(json.msg);
        }
    };

    return (
        <div className="relative min-h-screen bg-[url('/background.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-60">
            <div className="relative z-10">
                <Container
                    maxWidth="xs"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                    }}
                >
                    <Paper
                        elevation={10}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            width: "100%",
                            backdropFilter: "blur(10px)",
                            background: "rgba(255,255,255,0.10)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                        }}
                    >
                        <Typography
                            variant="h4"
                            align="center"
                            gutterBottom
                            sx={{
                                color: "#6fd6ff",
                                fontWeight: 700,
                                letterSpacing: 1,
                            }}
                        >
                            Login
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}
                            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
                        >
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    "& label": { color: "#b5eaff" },
                                    "& fieldset": { borderColor: "#6fd6ff" },
                                    "& .MuiOutlinedInput-root:hover fieldset": {
                                        borderColor: "#9ae6ff",
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                        borderColor: "#6fd6ff",
                                        boxShadow: "0 0 10px #6fd6ff70",
                                    },
                                    input: { color: "white" },
                                }}
                            />

                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    "& label": { color: "#b5eaff" },
                                    "& fieldset": { borderColor: "#6fd6ff" },
                                    "& .MuiOutlinedInput-root:hover fieldset": {
                                        borderColor: "#9ae6ff",
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                        borderColor: "#6fd6ff",
                                        boxShadow: "0 0 10px #6fd6ff70",
                                    },
                                    input: { color: "white" },
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    mt: 1,
                                    py: 1.2,
                                    fontSize: "1.05rem",
                                    fontWeight: 600,
                                    backgroundColor: "#6fd6ff",
                                    color: "#0a0a0a",
                                    "&:hover": {
                                        backgroundColor: "#53c4f0",
                                        boxShadow: "0 0 12px #6fd6ff80",
                                    },
                                }}
                            >
                                Login
                            </Button>

                            <Typography align="center" sx={{ mt: 2, color: "#cdefff" }}>
                                <NavLink
                                    to="/register"
                                    className="hover:text-[#6fd6ff] transition-all"
                                >
                                    Create new account
                                </NavLink>
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            </div>
        </div>
    );
};

export default Login;
