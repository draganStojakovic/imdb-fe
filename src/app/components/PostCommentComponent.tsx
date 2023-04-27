import { Grid, Card, CardContent, Box, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EventContext } from 'app/context/EventContext';
import { useMutation } from 'react-query';
import { useContext, useEffect, useState } from 'react';
import { isObjOfType } from 'app/utils/typeCheckers';
import { ICommentDraft, ICommentResponse } from 'app/types/IComment';
import { commentsService } from 'app/services/comments.service';
import { AxiosResponse, AxiosError } from 'axios';
import { IError } from 'app/types/IError';
import { useLocation } from 'react-router-dom';
import { IUser } from 'app/types/IUser';

type Props = {
  mouseOverBool: boolean;
  setMouseOverBool: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
};

export const PostCommentComponent = ({
  mouseOverBool,
  setMouseOverBool,
  user,
}: Props) => {
  const location = useLocation();
  const [movieIdFromPathname, setMovieIdFromPathname] = useState(
    location.pathname.split('/')[2]
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { setReloadCommentsEvent } = useContext(EventContext);

  useEffect(() => {
    setMovieIdFromPathname(() => location.pathname.split('/')[2]);
  }, [location.key]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ICommentDraft>({
    defaultValues: {
      content: '',
      userId: user.id,
      movieId: movieIdFromPathname,
    },
  });

  const { mutate } = useMutation(commentsService.postComment, {
    onSuccess: (data: AxiosResponse<ICommentResponse>) => {
      if (isObjOfType<ICommentResponse>(data)) {
        reset();
        setReloadCommentsEvent(true);
      }
      setLoading(false);
    },
    onError: (error: AxiosError<IError>) => {
      error?.response?.data?.errors?.forEach((error) => {
        setError('content', { message: error.msg });
      });
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<ICommentDraft> = async (data) => {
    setLoading(true);
    mutate(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          marginTop: 5,
          marginBottom: 5,
          boxShadow: mouseOverBool ? 12 : 3,
        }}
        style={{ backgroundColor: '#fbfbfb' }}
        onMouseOver={() => setMouseOverBool(() => true)}
        onMouseLeave={() => setMouseOverBool(() => false)}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                multiline
                label="Leave a comment..."
                inputProps={{ maxLength: 500, spellCheck: 'false' }}
                {...register('content', {
                  required: 'Comment cannot be empty',
                  maxLength: 500,
                })}
                helperText={errors.content ? errors.content.message : ''}
                error={errors.content ? true : false}
              />
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{ marginTop: 1 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button type="submit" disabled={loading} variant="contained">
                  Comment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
