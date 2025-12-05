import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import {
    FormControl,
    TextField,
    Select,
    MenuItem,
    ToggleButton,
    ToggleButtonGroup,
    Box,
    Typography
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import SortIcon from "@mui/icons-material/Sort";

const Search = () => {
    const { token } = useAuth();
    const [searchedMovie, setSearchedMovie] = useState("");
    const [moviesData, setMoviesData] = useState([]);
    const [sortField, setSortField] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        getAllMovie();
    }, [searchedMovie]);

    useEffect(() => {
        onSortChange();
    }, [sortField, sortOrder]);

    const onSortChange = async () => {
        const url = `${import.meta.env.VITE_API}/movies/sorted?order=${sortOrder}&sortBy=${sortField}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        let json = await response.json();
        setMoviesData(json);
    };

    const getAllMovie = async () => {
        const url = `${import.meta.env.VITE_API}/movies/search?search=${searchedMovie}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        let json = await response.json();
        setMoviesData(json);
    };

    const handleSortFieldChange = (event) => {
        setSortField(event.target.value);
    };

    const handleSortOrderChange = (_, newSortOrder) => {
        if (newSortOrder !== null) {
            setSortOrder(newSortOrder);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "black",
                minHeight: "100vh",
                width: "100%",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    color: "#6fd6ff",
                    mb: 4,
                    fontWeight: 700,
                    textShadow: "0 0 10px #00baff",
                }}
            >
                🔍 Search Movies
            </Typography>

            {/* SEARCH & SORT BAR */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: 3,
                    mb: 4,
                    width: "90%",
                    justifyContent: "center",
                }}
            >
                {/* Search Input */}
                <TextField
                    variant="outlined"
                    placeholder="Search movies..."
                    value={searchedMovie}
                    onChange={(e) => setSearchedMovie(e.target.value)}
                    sx={{
                        width: "100%",
                        maxWidth: 400,
                        bgcolor: "#111",
                        borderRadius: 2,
                        input: { color: "#fff" },
                        label: { color: "#aaa" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#333" },
                            "&:hover fieldset": { borderColor: "#6fd6ff" },
                            "&.Mui-focused fieldset": {
                                borderColor: "#00baff",
                                boxShadow: "0 0 8px #009fff",
                            },
                        },
                    }}
                />

                {/* Sort Dropdown */}
                <FormControl
                    sx={{
                        minWidth: 150,
                        bgcolor: "#111",
                        borderRadius: 2,
                        "& .MuiSelect-select": { color: "#fff" },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#333",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#6fd6ff",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00baff",
                            boxShadow: "0 0 8px #009fff",
                        },
                    }}
                >
                    <Select
                        value={sortField}
                        onChange={handleSortFieldChange}
                        sx={{ color: "white" }}
                    >
                        <MenuItem value="title">Title</MenuItem>
                        <MenuItem value="year">Year</MenuItem>
                        <MenuItem value="duration">Duration</MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                    </Select>
                </FormControl>

                {/* Asc / Desc Toggle */}
                <ToggleButtonGroup
                    value={sortOrder}
                    exclusive
                    onChange={handleSortOrderChange}
                    sx={{
                        bgcolor: "#111",
                        borderRadius: 2,
                        "& .MuiToggleButton-root": {
                            color: "#ccc",
                            border: "1px solid #333",
                            "&.Mui-selected": {
                                backgroundColor: "#00baff",
                                color: "black",
                                fontWeight: "bold",
                                textShadow: "0 0 5px white",
                            },
                        },
                    }}
                >
                    <ToggleButton value="asc">
                        <SortIcon sx={{ mr: 1 }} /> Asc
                    </ToggleButton>
                    <ToggleButton value="desc">
                        <SortIcon sx={{ mr: 1, transform: "rotate(180deg)" }} /> Desc
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Movie List */}
            <MovieList moviesData={moviesData} />
        </Box>
    );
};

export default Search;
