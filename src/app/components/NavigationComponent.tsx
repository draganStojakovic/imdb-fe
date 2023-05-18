import { AppBarLink } from 'app/utils/static';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseMutateFunction } from 'react-query';

type Props = {
  header: ReadonlyArray<AppBarLink>;
  mutate: UseMutateFunction<unknown, unknown, void, unknown>;
};

const buttonStyle = {
  textDecoration: 'none',
  color: 'black',
};

export const Navigation = ({ header, mutate }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IMDB
          </Typography>
          {header.map((obj, i) => (
            <Button
              color="inherit"
              key={i}
              {...(obj.buttonAction && { onClick: () => mutate() })}
            >
              {obj.link ? (
                <Link to={obj.link} style={buttonStyle}>
                  {obj.title}
                </Link>
              ) : (
                obj.title
              )}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
