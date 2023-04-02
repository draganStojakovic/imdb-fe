import { useParams } from 'react-router-dom';
import useAuthGuard from 'app/hooks/useAuthGuard';
import useMovies from 'app/hooks/useMovies';
import { Container, Box } from '@mui/material';
import { MovieDetailsComponent } from 'app/components/MovieDetailsComponent';
import { CommentDetailsComponent } from 'app/components/CommentDetailsComponent';
import { MessageComponent } from 'app/components/MessageComponent';
import { isObjOfType } from 'app/utils/typeCheckers';
import { IComment } from 'app/types/IComment';
import { IMovieWithComments } from 'app/types/IMovies';
import { useEffect, useContext } from 'react';
import { MovieParamsContext } from 'app/context/MovieParamsContext';

export const SingleMoviePage = () => {
  useAuthGuard(true);
  const { getSingleMovie } = useMovies();
  const { id } = useParams();
  const movie = getSingleMovie(id as string);
  const { search, setSearch, genres, setGenres } =
    useContext(MovieParamsContext);

  useEffect(() => {
    if (search.length > 0) setSearch('');
    if (genres.length > 0) setGenres('');
  }, []);

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 5,
        }}
      >
        {movie && isObjOfType<IMovieWithComments>(movie) && (
          <MovieDetailsComponent
            movieId={movie.id}
            title={movie.title}
            description={movie.description}
            coverImage={movie.coverImage}
            genres={movie.genres}
            likes={movie.likes}
            dislikes={movie.dislikes}
            views={movie.views}
            multiView={false}
            trunctate={undefined}
            showMovieDesc={undefined}
            checkIfDescShow={undefined}
          />
        )}
        {movie &&
        isObjOfType<IComment[]>(movie?.comments) &&
        movie.comments.length > 0 ? (
          movie.comments.map((comment, i) => (
            <CommentDetailsComponent key={i} comment={comment} />
          ))
        ) : (
          <MessageComponent message="Be first to comment" />
        )}
      </Box>
    </Container>
  );
};
