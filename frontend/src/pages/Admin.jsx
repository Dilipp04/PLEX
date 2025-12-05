import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    Box,
    Divider,
    Pagination,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
    const { token } = useAuth();

    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [newMovie, setNewMovie] = useState({
        imdbID: "",
        title: "",
        year: "",
        rating: "",
        duration: "",
        desc: "",
        poster: "",
    });

    const [updateTrigger, setUpdateTrigger] = useState(false);

    // Pagination
    const [page, setPage] = useState(1);
    const moviesPerPage = 10;
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const paginatedMovies = movies.slice(
        (page - 1) * moviesPerPage,
        page * moviesPerPage
    );

    const getAllMovie = async () => {
        const url = `${import.meta.env.VITE_API}/movies`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        let json = await response.json();
        setMovies(json.reverse());
    };

    const handleEdit = (movie) => {
        setEditingMovie(movie);
        setOpen(true);
    };

    const handleNewMovieChange = (e) => {
        setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = async () => {
        const url = `${import.meta.env.VITE_API}/admin/${editingMovie.imdbID}`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editingMovie),
            });
            let json = await response.json();
            alert(json.message);
        } catch (error) {
            alert("error");
        }
        setOpen(false);
        setUpdateTrigger((prev) => !prev);
    };

    const handleDelete = async (id) => {
        const url = `${import.meta.env.VITE_API}/admin/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        let json = await response.json();
        alert(json.message);
        setUpdateTrigger((prev) => !prev);
    };

    const handleAddMovie = async () => {
        const url = `${import.meta.env.VITE_API}/admin`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newMovie),
            });
            let json = await response.json();
            alert(json.message);
        } catch (error) {
            alert("error");
        }
        setUpdateTrigger((prev) => !prev);

        setNewMovie({
            imdbID: "",
            title: "",
            year: "",
            rating: "",
            duration: "",
            desc: "",
            poster: "",
        });
    };

    useEffect(() => {
        getAllMovie();
    }, [updateTrigger]);

    return (
        <Container
            maxWidth="lg"
            sx={{

                pb: 5,
                background: "black",
                minHeight: "100vh",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    color: "#6fd6ff",
                    textAlign: "center",
                    mb: 4,
                    fontWeight: 700,
                    textShadow: "0 0 8px #009dff",
                }}
            >
                🎬 Admin Panel — Movie Manager
            </Typography>

            {/* Add Movie Section */}
            <Paper
                elevation={6}
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 3,
                    background: "#111",
                    border: "1px solid #222",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        color: "#6fd6ff",
                        fontWeight: 600,
                        textShadow: "0 0 6px #009dff",
                    }}
                >
                    ➕ Add New Movie
                </Typography>

                <Grid container spacing={2}>
                    {Object.keys(newMovie).map((key) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                            <TextField
                                label={key.toUpperCase()}
                                name={key}
                                value={newMovie[key]}
                                fullWidth
                                onChange={handleNewMovieChange}
                                sx={{
                                    input: { color: "#fff" },
                                    label: { color: "#999" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#333" },
                                        "&:hover fieldset": {
                                            borderColor: "#6fd6ff",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#00b7ff",
                                        },
                                    },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box textAlign="center">
                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            px: 5,
                            fontSize: "16px",
                            background: "#00b7ff",
                            "&:hover": { background: "#0090cc" },
                        }}
                        onClick={handleAddMovie}
                    >
                        Add Movie
                    </Button>
                </Box>
            </Paper>

            {/* Movies Table */}
            <TableContainer
                component={Paper}
                elevation={6}
                sx={{
                    borderRadius: 3,
                    background: "#111",
                    border: "1px solid #222",
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            {["ID", "Title", "Year", "Rating", "Actions"].map(
                                (head) => (
                                    <TableCell
                                        key={head}
                                        sx={{
                                            color: "#6fd6ff",
                                            fontWeight: 600,
                                            textShadow:
                                                "0 0 5px rgba(0, 170, 255, 0.7)",
                                        }}
                                    >
                                        {head}
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedMovies.map((movie) => (
                            <TableRow
                                key={movie._id}
                                sx={{
                                    "&:hover": { background: "#1b1b1b" },
                                    transition: "0.2s",
                                }}
                            >
                                <TableCell sx={{ color: "white" }}>
                                    {movie.imdbID}
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    {movie.title}
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    {movie.year}
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    {movie.rating}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(movie)}
                                        sx={{ color: "#00c3ff" }}
                                    >
                                        <Edit />
                                    </IconButton>

                                    <IconButton
                                        onClick={() =>
                                            handleDelete(movie.imdbID)
                                        }
                                        sx={{ color: "#ff4b4b" }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Box mt={3} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "#fff",
                        },
                        "& .Mui-selected": {
                            backgroundColor: "#00b3ff !important",
                            color: "black !important",
                            fontWeight: "bold",
                        },
                    }}
                />
            </Box>

            {/* Edit Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Edit Movie</DialogTitle>
                <Divider />

                <DialogContent sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        {editingMovie &&
                            Object.keys(editingMovie).map(
                                (key) =>
                                    key !== "_id" && (
                                        <Grid item xs={12} key={key}>
                                            <TextField
                                                label={key.toUpperCase()}
                                                fullWidth
                                                value={editingMovie[key]}
                                                onChange={(e) =>
                                                    setEditingMovie({
                                                        ...editingMovie,
                                                        [key]: e.target.value,
                                                    })
                                                }
                                            />
                                        </Grid>
                                    )
                            )}
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveEdit}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Admin;
