import React, { useState, useEffect } from "react";
import Character from "./Character";
import LoadingMask from "./LoadingMask";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Grid, Typography } from "@mui/material";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
        setIsLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setIsLoading(false);
      });
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  let sortedCharacters = [...characters].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    else return b.name.localeCompare(a.name);
  });

  if (filter) {
    sortedCharacters = sortedCharacters.filter((character) =>
      character.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h2" gutterBottom align="center">
        Rick and Morty
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <TextField
          label="Filter Characters"
          variant="outlined"
          onChange={(e) => setFilter(e.target.value)}
          style={{ marginRight: "20px" }}
        />
        <Button variant="contained" onClick={handleSort}>
          Sort
        </Button>
      </Box>
      {isLoading ? (
        <LoadingMask />
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {sortedCharacters.map((character) => (
            <Grid item key={character.id}>
              <Character {...character} />
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography
          variant="h6"
          component="span"
          sx={{ margin: "0 20px", alignSelf: "center" }}
        >
          Page {currentPage}
        </Typography>
        <Button
          variant="contained"
          onClick={() =>
            setCurrentPage((prev) => (prev < info.pages ? prev + 1 : prev))
          }
          disabled={currentPage === info.pages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default App;
