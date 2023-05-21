import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  ListItem,
  Divider,
  Button,
  CardActions,
} from '@mui/material';
import { IComment } from 'app/types/IComment';
import useDeleteComment from 'app/hooks/useDeleteComment';

type Props = {
  comment: IComment;
  authUserId: string;
  movieId: string;
};

export const CommentDetailsComponent = ({
  comment,
  authUserId,
  movieId,
}: Props) => {
  const { onSubmit, handleSubmit } = useDeleteComment(
    comment._id,
    movieId,
    authUserId
  );

  return (
    <Card sx={{ marginBottom: 5 }} style={{ backgroundColor: '#fbfbfb' }}>
      <Stack spacing={0}>
        <ListItem>
          <Typography component={'span'} variant={'body1'}>
            {comment.userId.fname} {comment.userId.lname}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography component={'span'} variant={'body1'} align="left">
            <CardContent>{comment.content}</CardContent>
          </Typography>
        </ListItem>
        {authUserId && authUserId === comment?.userId._id && (
          <>
            <Divider />
            <ListItem>
              <Typography component={'span'}>
                <CardActions>
                  <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type="submit" variant="contained" size="small">
                      Delete
                    </Button>
                  </Box>
                </CardActions>
              </Typography>
            </ListItem>
          </>
        )}
      </Stack>
    </Card>
  );
};
