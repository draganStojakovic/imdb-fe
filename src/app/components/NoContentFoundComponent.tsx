import { Typography, Card, CardContent, Box } from '@mui/material';

type Props = {
  message: string;
};

export const NoContentFoundComponent = ({ message }: Props) => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card sx={{ maxWidth: 800 }} style={{ backgroundColor: '#fbfbfb' }}>
        <CardContent>
          <Typography variant="h4" align="center">
            {message}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
