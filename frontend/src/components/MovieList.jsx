import { useState } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Pagination,
    Container,
    Box,
    Grid,
} from "@mui/material";

const MovieList = ({ moviesData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 20;

    const pageCount = Math.ceil(moviesData.length / moviesPerPage);
    const startIndex = (currentPage - 1) * moviesPerPage;
    const currentMovies = moviesData.slice(startIndex, startIndex + moviesPerPage);

    const handlePageChange = (_, value) => {
        setCurrentPage(value);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>

            {/* Movie Grid */}
            <Grid container spacing={4} justifyContent="center">
                {currentMovies.map((movie) => (
                    <Grid
                        key={movie.imdbID}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        display="flex"
                        justifyContent="center"
                    >
                        <Card
                            sx={{
                                width: "100%",
                                maxWidth: 290,
                                bgcolor: "#0D0D0D",
                                borderRadius: 4,
                                overflow: "hidden",
                                color: "white",
                                border: "1px solid rgba(111,214,255,0.2)",
                                transition: "0.35s ease",
                                cursor: "pointer",
                                position: "relative",

                                ":hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0px 0px 20px rgba(111,214,255,0.4)",
                                    border: "1px solid #6FD6FF",
                                },
                            }}
                        >
                            {/* Poster */}
                            <CardMedia
                                component="img"
                                image={movie.poster}
                                alt={movie.title}
                                sx={{
                                    height: 380,
                                    objectFit: "cover",
                                }}
                            />

                            {/* Content */}
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 1.2,
                                    p: 2,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        width: "100%",
                                        textAlign: "center",
                                        color: "#6FD6FF",
                                    }}
                                >
                                    {movie.title}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        color: "#cfcfcf",
                                        fontSize: "14px",
                                    }}
                                >
                                    <Typography>{movie.year}</Typography>
                                    <Typography>{movie.duration}m</Typography>
                                    <Typography sx={{ color: "#6FD6FF" }}>
                                        ⭐ {movie.rating}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={5}>
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "white",
                            borderRadius: "8px",
                            border: "1px solid rgba(111,214,255,0.3)",
                        },
                        "& .Mui-selected": {
                            backgroundColor: "#6FD6FF !important",
                            color: "#0D0D0D",
                            fontWeight: "bold",
                            boxShadow: "0px 0px 10px rgba(111,214,255,0.6)",
                        },
                    }}
                />
            </Box>

        </Container>
    );
};

export default MovieList;
