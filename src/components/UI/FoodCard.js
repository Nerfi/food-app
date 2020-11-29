import React from 'react';
import {Card, Button} from 'react-bootstrap';

function FoodCard(props) {

  //desestructurando los props
  const {image, title} = props;

  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title> <strong>{title}</strong></Card.Title>
        <Card.Text>
         aqui deberia ir la descripcion, pero esta API de momento no me da eso, veremos a ver mas
         adelante
        </Card.Text>
        <Button variant="primary">See Recipe</Button>
      </Card.Body>
      </Card>
  )
};

export default FoodCard;
