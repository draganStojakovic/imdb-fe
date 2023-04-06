import { useParams } from 'react-router-dom';
import useAuthGuard from 'app/hooks/useAuthGuard';
import useMovies from 'app/hooks/useMovies';
import useComments from 'app/hooks/useComments';
import { Container, Box } from '@mui/material';
import { MovieDetailsComponent } from 'app/components/MovieDetailsComponent';
import { CommentDetailsComponent } from 'app/components/CommentDetailsComponent';
import { MessageComponent } from 'app/components/MessageComponent';
import { useEffect, useContext } from 'react';
import { UserContext } from 'app/context/UserContext';
import { MovieParamsContext } from 'app/context/MovieParamsContext';
import { LoadMoreComponent } from 'app/components/LoadMoreComponent';
import { PostCommentComponent } from 'app/components/PostCommentComponent';
import { isObjOfType } from 'app/utils/typeCheckers';
import { IMovie } from 'app/types/IMovies';
import { IUser } from 'app/types/IUser';
import { ICommentPaginated } from 'app/types/IComment';
import { EventContext } from 'app/context/EventContext';

export const SingleMoviePage = () => {
  useAuthGuard(true);

  const { id } = useParams();

  const { getSingleMovie } = useMovies();
  const { getComments } = useComments();

  const {
    reloadCommentsEvent,
    setReloadCommentsEvent,
    loadMoreCommentsEvent: commentLimit,
    setLoadMoreCommentsEvent: loadFiveMoreComments,
  } = useContext(EventContext);
  const { user } = useContext(UserContext);
  const { search, setSearch, genres, setGenres } =
    useContext(MovieParamsContext);

  const { data: movie } = getSingleMovie(id as string);
  const { data: commentsPaginated, refetch: refetchComments } = getComments(
    id as string,
    commentLimit
  );

  useEffect(() => {
    if (search.length > 0) setSearch('');
    if (genres.length > 0) setGenres('');

    return () => {
      loadFiveMoreComments(5);
    };
  }, []);

  useEffect(() => {
    refetchComments();
  }, [commentLimit]);

  useEffect(() => {
    if (reloadCommentsEvent) {
      refetchComments();
      setReloadCommentsEvent(false);
    }
  }, [reloadCommentsEvent]);

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 5,
        }}
      >
        {isObjOfType<IMovie>(movie) && (
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
        <PostCommentComponent />
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
                />
              )
          )
        ) : (
          <MessageComponent message="Be first to comment" />
        )}
        {isObjOfType<ICommentPaginated>(commentsPaginated) &&
          commentsPaginated.remainingComments !== 0 && (
            <LoadMoreComponent
              loadMore={loadFiveMoreComments}
              commentLimit={commentLimit}
            />
          )}
      </Box>
    </Container>
  );
};
