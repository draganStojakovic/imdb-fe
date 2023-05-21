import { Typography, Card, CardContent } from '@mui/material';

type Props = {
  message: string;
};

export const MessageComponent = ({ message }: Props) => {
  return (
    <Card style={{ backgroundColor: '#fbfbfb' }} sx={{ maxWidth: 800 }}>
      <CardContent>
        <Typography variant="h4" align="center">
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};
