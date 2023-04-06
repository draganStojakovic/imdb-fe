import { Grid, Card, CardContent, Box, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EventContext } from 'app/context/EventContext';
import { useMutation } from 'react-query';
import { useContext, useState } from 'react';
import { UserContext } from 'app/context/UserContext';
import { isObjOfType } from 'app/utils/typeCheckers';
import { ICommentDraft, ICommentResponse } from 'app/types/IComment';
import { useLocation } from 'react-router-dom';
import { commentsService } from 'app/services/comments.service';
import { AxiosResponse, AxiosError } from 'axios';
import { IError } from 'app/types/IError';

export const PostCommentComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { setReloadCommentsEvent } = useContext(EventContext);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ICommentDraft>({
    defaultValues: {
      content: '',
      userId: user?.id as string,
      movieId: location.pathname.split('/')[2],
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
          boxShadow: 3,
        }}
        style={{ backgroundColor: '#fbfbfb' }}
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
