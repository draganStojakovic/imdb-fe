import {
  Card,
  CardContent,
  Typography,
  Stack,
  ListItem,
  Divider,
} from '@mui/material';
import { IComment } from 'app/types/IComment';

type Props = {
  comment: IComment;
};

export const CommentDetailsComponent = ({ comment }: Props) => {
  return (
    <Card
      sx={{
        marginBottom: 5,
      }}
    >
      <Stack spacing={0}>
        <ListItem>
          <Typography component={'span'} variant={'body1'}>
            {comment.userId.fname} {comment.userId.lname}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography component={'span'} variant={'body2'} align="left">
            <CardContent>{comment.content}</CardContent>
          </Typography>
        </ListItem>
      </Stack>
    </Card>
  );
};
