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
  checkIfMouseIsOverCard: (
    mousedOverMovieId: string,
    currentMovieId: string
  ) => boolean;
  mouseOver: string;
  setMouseOver: React.Dispatch<React.SetStateAction<string>>;
};

export const CommentDetailsComponent = ({
  comment,
  authUserId,
  movieId,
  checkIfMouseIsOverCard,
  mouseOver,
  setMouseOver,
}: Props) => {
  const { onSubmit, handleSubmit } = useDeleteComment(
    comment._id,
    movieId,
    authUserId
  );

  const isMoused = checkIfMouseIsOverCard(mouseOver, comment._id);

  return (
    <Card
      sx={{
        marginBottom: 5,
        boxShadow: isMoused ? 12 : 3,
      }}
      style={{ backgroundColor: '#fbfbfb' }}
      onMouseOver={() => setMouseOver(() => comment._id)}
      onMouseLeave={() => setMouseOver(() => '')}
    >
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
