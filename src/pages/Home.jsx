import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterNameProductThunk, filterProductsThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  const [categoriesList, setCategoriesList] = useState([])
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    dispatch(getProductsThunk())

    axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then(res => setCategoriesList(res.data.data.categories))
  }, [])
  console.log(categoriesList)
  return (
    <div>
      <Row>
        <Col lg={2}>
          <h2>Categories</h2>
          <ListGroup as="ul" >
            {categoriesList.map((category => (
              <ListGroup.Item as="li" active className='list' key={category.id}>
                <Button onClick={() => dispatch(filterProductsThunk(category.id))}>
                  {category.name}
                </Button>
              </ListGroup.Item>
            )))}
          </ListGroup>


        </Col>

        <Col lg={10}>


          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Type your product"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={(e) => setInputSearch((e.target.value))}
            />
            <Button variant="outline-info" id="button-addon2" onClick={() => dispatch(filterNameProductThunk(inputSearch))}>
              Search
            </Button>
          </InputGroup>

          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(product => (
              <Col key={product.id}>
                <Card>
                  <Link to={`/productdetail/${product.id}`} className="product-details" >
                    <Card.Img variant="top"
                      src={product.productImgs?.[0]}
                      alt="" className='product-image'

                    />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>
                        US$ {product.price}

                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>


        </Col>
      </Row>



    </div>
  );

};

export default Home;