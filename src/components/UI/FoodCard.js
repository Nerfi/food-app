import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function FoodCard(props) {

  //desestructurando los props
  const {
    image,
    title,
    id,
    summary
  } = props;

  return(
    <Card style={{ width: '18rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
      <Card.Img variant="top" src={image} />
      <Card.Body>

      <Link to={`meal/${id}`}>
        <Card.Title> <strong>{title}</strong></Card.Title>
      </Link>
        <Link to={`meal/${id}`}>
         <Button variant="primary">See Recipe</Button>

        </Link>
      </Card.Body>
      </Card>
  )
};

export default FoodCard;
