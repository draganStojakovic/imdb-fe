import { Container, Typography, Card, CardContent } from '@mui/material';

type Props = {
  message: string;
};

export const NoContentFoundComponent = ({ message }: Props) => {
  return (
    <Container component="main" maxWidth="xl">
      <Card
        sx={{ minWidth: 275, maxWidth: 500 }}
        style={{ backgroundColor: '#fbfbfb' }}
      >
        <CardContent>
          <Typography variant="h4" align="center">
            {message.toUpperCase()}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
