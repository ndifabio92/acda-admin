import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { cardStyles } from './CardComponent.styles';

interface CardComponentProps {
  name: string;
  path: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ name, path }) => {
  const navigate = useNavigate();

  return (
    <Card sx={cardStyles}>
      <CardActionArea onClick={() => navigate(path)} component="div">
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardMedia sx={{ height: 150 }} image="icons/acda-escudo-icon.png" title="" />
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button variant="contained" color="primary" onClick={() => navigate(path)}>
            Crear
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
