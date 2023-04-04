import { useParams } from 'react-router-dom';
import useAuthGuard from 'app/hooks/useAuthGuard';
import useMovies from 'app/hooks/useMovies';
import { Container, Box } from '@mui/material';
import { MovieDetailsComponent } from 'app/components/MovieDetailsComponent';
import { CommentDetailsComponent } from 'app/components/CommentDetailsComponent';
import { MessageComponent } from 'app/components/MessageComponent';
import { isObjOfType, returnObject } from 'app/utils/typeCheckers';
import { IComment, ICommentPaginated } from 'app/types/IComment';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from 'app/context/UserContext';
import { MovieParamsContext } from 'app/context/MovieParamsContext';
import { useGetCommentsQuery } from 'app/querries/comment.querry';
import { IMovie } from 'app/types/IMovies';
import { LoadMoreComponent } from 'app/components/LoadMoreComponent';
import useCommentParams from 'app/hooks/useCommentParams';
import { LeaveACommentComponent } from 'app/components/LeaveACommentComponent';

export const SingleMoviePage = () => {
  useAuthGuard(true);
  const { id } = useParams();
  const [reloadCommentsEvent, setReloadCommentsEvent] = useState(false);
  const { commentLimit, loadMoreComments } = useCommentParams();
  
  const { getSingleMovie } = useMovies();
  const movie = getSingleMovie(id as string);

  const { search, setSearch, genres, setGenres } =
    useContext(MovieParamsContext);

  const { data: commentsPaginated, refetch: reloadComments } =
    useGetCommentsQuery(id as string, commentLimit);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (search.length > 0) setSearch('');
    if (genres.length > 0) setGenres('');
  }, []);

  useEffect(() => {
    reloadComments();
  }, [commentLimit]);

  useEffect(() => {
    if (reloadCommentsEvent) {
      reloadComments();
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
        {movie && isObjOfType<IMovie>(movie) && (
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
        <LeaveACommentComponent reloadComments={reloadComments} />
        {isObjOfType<ICommentPaginated>(commentsPaginated) &&
        returnObject<ICommentPaginated>(commentsPaginated) &&
        commentsPaginated.comments.length > 0 ? (
          commentsPaginated.comments.map(
            (comment: IComment) =>
              user &&
              movie && (
                <CommentDetailsComponent
                  key={comment._id}
                  comment={comment}
                  authUserId={user?.id}
                  movieId={movie?.id}
                  setReloadCommentsEvent={setReloadCommentsEvent}
                />
              )
          )
        ) : (
          <MessageComponent message="Be first to comment" />
        )}
        {isObjOfType<ICommentPaginated>(commentsPaginated) &&
          returnObject<ICommentPaginated>(commentsPaginated) &&
          commentsPaginated.remainingComments !== 0 && (
            <LoadMoreComponent loadMore={loadMoreComments} />
          )}
      </Box>
    </Container>
  );
};
