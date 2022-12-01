import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { motion } from 'framer-motion';
import { createCartThunk } from '../store/slices/cart.slice';
import Cart from '../components/Cart';


const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])



  const productsList = useSelector(state => state.products)
  const productClicked = productsList.find(product => product.id === Number(id))
  const relatedProducts = productsList.filter(product =>
    product.category.id == productClicked.category.id &&
    product.id !== productClicked.id)

  console.log(relatedProducts)

  let [quantity, setQuantity] = useState("");

  const addToCart = () => {
    const products = {
      id: productClicked.id,
      quantity: quantity

    }



    dispatch(createCartThunk(products))
  }


  return (
    <div>
      <h1>{productClicked?.title}</h1>
      <h5>US ${productClicked?.price}</h5>


      <Row className='my-5'>
        <Col lg={8}>

          <motion.div className='img-container' >


            <motion.div className='slider' drag='x'
              dragConstraints={{ right: 95, left: -1200 }}>
              {productClicked?.productImgs.map(img =>

                <motion.div className='img-item' key={img}>

                  <img src={img} className="principal-image " />
                </motion.div>
              )}

            </motion.div>
            <h6 className='swap-icon'>
              Swipe for more images <i className="fa-regular fa-hand"></i>
            </h6>
          </motion.div>



        </Col>

        <Col lg={4} >
          <p className='product-description'>
            {productClicked?.description}
          </p>

          <div className='add-to-cart'>

            <input type="number" value={quantity <= 0 ? quantity = "" : quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Button onClick={addToCart} >
              Add to cart
            </Button>

          </div>

        </Col>


      </Row>



      <Row className="justify-content-md-center my-5">
        <h3 className='related-products'>Related products</h3>


        {relatedProducts.map(product => (

          <Col lg={4} key={product.id} className="underline-container">
            <div className='underline'></div>

            <Card className='my-3 card-item' >
              <Link to={`/productdetail/${product.id}`} className="product-details">

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

    </div>
  );
};

export default ProductDetail;