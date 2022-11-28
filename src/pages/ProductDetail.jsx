import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { motion } from 'framer-motion';

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

  return (
    <div>
      <h1>{productClicked?.title}</h1>
      <h5>US ${productClicked?.price}</h5>
      <Row className='my-5'>
        <Col lg={9}>

          <motion.div className='img-container' >
            <motion.div className='slider' drag='x'
              dragConstraints={{ right: 150, left: -1000 }}>
              {productClicked?.productImgs.map(img =>

                <motion.div className='img-item'>
                  <img src={img} className="principal-image " />
                </motion.div>
              )}
            </motion.div>
          </motion.div>



        </Col>

        <Col lg={3} >
          <p className='product-description'>
            {productClicked?.description}
          </p>

        </Col>


      </Row>



      <Row className="justify-content-md-center my-5">
        <h3 className='related-products'>Related products</h3>

        {relatedProducts.map(product => (
          <Col lg={4}>
            <Card className='my-3' key={product.id}>
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