import { useParams } from 'react-router-dom';
import useAuthGuard from 'app/hooks/useAuthGuard';
import useMovies from 'app/hooks/useMovies';
import useComments from 'app/hooks/useComments';
import { Container, Box } from '@mui/material';
import { MovieDetailsComponent } from 'app/components/MovieDetailsComponent';
import { CommentDetailsComponent } from 'app/components/CommentDetailsComponent';
import { MessageComponent } from 'app/components/MessageComponent';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from 'app/context/UserContext';
import { MovieParamsContext } from 'app/context/MovieParamsContext';
import { LoadMoreComponent } from 'app/components/LoadMoreComponent';
import { PostCommentComponent } from 'app/components/PostCommentComponent';
import { isObjOfType, isPrimitiveType } from 'app/utils/typeCheckers';
import { IMovie, IMovieStrippedDown } from 'app/types/IMovies';
import { IUser } from 'app/types/IUser';
import { ICommentPaginated } from 'app/types/IComment';
import { EventContext } from 'app/context/EventContext';
import { IPopulatedGenre } from 'app/types/IGenre';
import { moviesService } from 'app/services/movies.service';
import { ListMoviesComponent } from 'app/components/ListMoviesComponent';
import useHighlightCard from 'app/hooks/useHighlightCard';

function formatGenres(movie: IMovie) {
  const { genres } = movie;
  const genresFiltered = (genres as unknown as IPopulatedGenre[]).map(
    (genre) => genre._id
  );
  const movieGenres = genresFiltered.join(',');
  return movieGenres;
}

async function getRelatedMovies(genres: string) {
  try {
    return await moviesService.RelatedMovies(genres);
  } catch (e) {
    console.log(e);
  }
}

async function handleGetRelatedMovies(movie: IMovie, id: string) {
  const formattedGenres = formatGenres(movie);
  const response = await getRelatedMovies(formattedGenres);
  if (isObjOfType<IMovieStrippedDown[]>(response)) {
    const filteredData = response.filter((genre) => genre.id !== id);
    if (filteredData.length !== 0) return filteredData;

    return null;
  }
  return null;
}

export const SingleMoviePage = () => {
  useAuthGuard(true);
  const { id } = useParams();
  const [relatedMovies, setRelatedMovies] = useState<
    IMovieStrippedDown[] | null
  >(null);

  const { getSingleMovie } = useMovies();
  const { getComments } = useComments();

  const {
    reloadCommentsEvent,
    setReloadCommentsEvent,
    loadMoreCommentsEvent: commentLimit,
    setLoadMoreCommentsEvent,
  } = useContext(EventContext);
  const { user } = useContext(UserContext);
  const { search, setSearch, genres, setGenres, setPage } =
    useContext(MovieParamsContext);

  const { data: movie, refetch: reloadSingleMovie } = getSingleMovie(
    id as string
  );
  const { data: commentsPaginated, refetch: refetchComments } = getComments(
    id as string,
    commentLimit
  );

  const {
    mouseOver,
    setMouseOver,
    checkIfMouseIsOnObject,
    mouseOverBool,
    setMouseOverBool,
  } = useHighlightCard();

  useEffect(() => {
    if (search.length > 0) setSearch('');
    if (genres.length > 0) setGenres('');

    return () => {
      setLoadMoreCommentsEvent(5);
      setPage(1);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    reloadSingleMovie();
    refetchComments();
    isPrimitiveType(id, 'string') &&
      relatedMovies?.filter((movie) => id !== movie.id);
  }, [id]);

  useEffect(() => {
    refetchComments();
  }, [commentLimit]);

  useEffect(() => {
    if (reloadCommentsEvent) {
      refetchComments();
      setReloadCommentsEvent(false);
    }
  }, [reloadCommentsEvent]);

  useEffect(() => {
    if (isPrimitiveType(id, 'string') && isObjOfType<IMovie>(movie)) {
      handleGetRelatedMovies(movie, id).then((movies) => {
        isObjOfType<IMovieStrippedDown[]>(movies) &&
          setRelatedMovies(() => movies);
      });
    }
  }, [movie, id]);

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 5,
        }}
      >
        {isObjOfType<IMovieStrippedDown[]>(relatedMovies) && (
          <ListMoviesComponent
            movies={relatedMovies}
            caption="Related movies:"
          />
        )}
        {isObjOfType<IMovie>(movie) && isObjOfType<IUser>(user) && (
          <MovieDetailsComponent
            movieId={movie.id}
            authUser={user}
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
            checkIfMouseIsOverCard={checkIfMouseIsOnObject}
            mouseOver={mouseOver}
            setMouseOver={setMouseOver}
          />
        )}
        {isObjOfType<IUser>(user) && isPrimitiveType(id, 'string') && (
          <PostCommentComponent
            mouseOverBool={mouseOverBool}
            setMouseOverBool={setMouseOverBool}
            userId={user.id}
            movieId={id}
          />
        )}
        {isObjOfType<ICommentPaginated>(commentsPaginated) &&
        commentsPaginated.comments.length > 0 ? (
          commentsPaginated.comments.map(
            (comment) =>
              isObjOfType<IUser>(user) &&
              isObjOfType<IMovie>(movie) && (
                <CommentDetailsComponent
                  key={comment._id}
                  comment={comment}
                  authUserId={user?.id}
                  movieId={movie?.id}
                  checkIfMouseIsOverCard={checkIfMouseIsOnObject}
                  mouseOver={mouseOver}
                  setMouseOver={setMouseOver}
                />
              )
          )
        ) : (
          <MessageComponent message="Be first to comment" />
        )}
        {isObjOfType<ICommentPaginated>(commentsPaginated) &&
          commentsPaginated.remainingComments !== 0 && (
            <LoadMoreComponent
              loadMore={setLoadMoreCommentsEvent}
              commentLimit={commentLimit}
            />
          )}
      </Box>
    </Container>
  );
};
