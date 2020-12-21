import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';

function FoodCard(props) {

  //desestructurando los props
  const {
    image,
    title,
    id,
    summary
  } = props;

  console.log(props, 'props')


  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>

      <Link to={`meal/${id}`}>
        <Card.Title> <strong>{title}</strong></Card.Title>
      </Link>

        <Card.Text>
        {summary && summary}
        {/*summary && replaceBtag(summary) */}
        </Card.Text>
        <Link to={`meal/${id}`}>
         <Button variant="primary">See Recipe</Button>

        </Link>
      </Card.Body>
      </Card>
  )
};

export default FoodCard;
