import { Typography, Card, CardContent, Box } from '@mui/material';
import useHighlightCard from 'app/hooks/useHighlightCard';

type Props = {
  message: string;
};

export const MessageComponent = ({ message }: Props) => {
  const { mouseOverBool, setMouseOverBool } = useHighlightCard();

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onMouseOver={() => setMouseOverBool(() => true)}
      onMouseLeave={() => setMouseOverBool(() => false)}
    >
      <Card
        style={{ backgroundColor: '#fbfbfb' }}
        sx={{ maxWidth: 800, boxShadow: mouseOverBool ? 12 : 3 }}
      >
        <CardContent>
          <Typography variant="h4" align="center">
            {message}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
