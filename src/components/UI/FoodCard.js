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

  console.log(typeof summary)//string already

  //can not replace <a> tags
  const replaceBtag = (string) => string.replace(/[<b> </b>  ]/g, ' ');


  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>

      <Link to={`meal/${id}`}>
        <Card.Title> <strong>{title}</strong></Card.Title>
      </Link>

        <Card.Text>
        {summary && summary}

        <p>aqui va la nueva version</p>

        {summary && replaceBtag(summary)}
        </Card.Text>
        <Button variant="primary">See Recipe</Button>
      </Card.Body>
      </Card>
  )
};

export default FoodCard;
