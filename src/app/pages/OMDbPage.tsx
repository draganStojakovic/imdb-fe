import useAuthGuard from 'app/hooks/useAuthGuard';
import { useState, useEffect } from 'react';
import { moviesService } from 'app/services/movies.service';
import { Container, Typography, Grid, Box } from '@mui/material';
import { SearchOMDbComponent } from 'app/components/SearchOMDbComponent';
import { isObjOfType } from 'app/utils/typeCheckers';
import { IOMDb, IMovieOMdb } from 'app/types/IMovies';
import { OMDbMovieDetails } from 'app/components/OMDbMovieDetails';
import useGenres from 'app/hooks/useGenres';
import { IGenre } from 'app/types/IGenre';

function sanitizeOMDbResponse(movie: IOMDb, genresFromDB: IGenre[]) {
  const genreLowerCase = movie.Genre.toLowerCase().split(', ');

  const newGenres = genresFromDB
    .map((genre) => {
      if (genreLowerCase.includes(genre.name)) return genre;
    })
    .filter((data) => data);

  if (isObjOfType<IGenre[]>(newGenres))
    return {
      title: movie.Title,
      description: movie.Plot,
      coverImage: movie.Poster,
      genres: newGenres,
    };
}

async function getOMDbMovie(movieTitle: string) {
  try {
    return await moviesService.GetOMDbMovie(movieTitle);
  } catch (e) {
    console.log(e);
  }
}

export const OMDbPage = () => {
  useAuthGuard(true);
  const { getGenres } = useGenres();
  const [searchTerm, setSearchTerm] = useState('');
  const [omdbMovie, setOmdbMovie] = useState<IMovieOMdb | null>(null);

  const genres = getGenres();

  useEffect(() => {
    if (searchTerm.length !== 0) {
      if (searchTerm.includes(' ')) {
        const newSearch = searchTerm.replace(/ /g, '+');
        setSearchTerm(() => {
          return newSearch;
        });
      }
      const response = getOMDbMovie(searchTerm);
      response.then((data) => {
        if (isObjOfType<IOMDb>(data) && isObjOfType<IGenre[]>(genres)) {
          const omdb = sanitizeOMDbResponse(data, genres);
          if (isObjOfType<IMovieOMdb>(omdb)) setOmdbMovie(() => omdb);
        }
      });
    }
  }, [searchTerm]);

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="h3">OMDb</Typography>
          </Grid>
          <Grid item xs={10}>
            <SearchOMDbComponent setSearchTerm={setSearchTerm} />
          </Grid>
        </Grid>
        {isObjOfType<IMovieOMdb>(omdbMovie) && (
          <OMDbMovieDetails omdbMovie={omdbMovie} />
        )}
      </Box>
    </Container>
  );
};
