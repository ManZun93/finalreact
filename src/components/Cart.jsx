import React, { useEffect } from 'react';
import { Button, Col, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cartThunk, checkoutCart } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose, }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  useEffect(() => {
    dispatch(cartThunk())
  }, [])


  return (
    <>
      {['end'].map((placement, idx) => (
        <Offcanvas show={show} onHide={handleClose}
          key={idx} placement={placement} name={placement}
        >

          <Offcanvas.Header closeButton>
            <Offcanvas.Title > <h3 >Cart purchases</h3> </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Col className='cart-products-container' >
              <div className='underline '></div>
              {cart.map(product => (
                <div key={product.id} className="product-in-cart my-4">

                  <p>{product.title}</p>

                  <p>Quantity: {product.productsInCart.quantity}</p>
                  <p>Price: $ {Number(product.price)} </p>
                  <p>Subtotal: $ {(Number(product.price) * product.productsInCart.quantity).toFixed(2)}</p>
                  <Button variant="outline-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                  </Button>
                </div>

              ))}

            </Col>
            <div className='underline my-4'></div>

            <div>
              <p>TOTAL : $ {cart.map(product => Number(product.price) * (product.productsInCart.quantity)).reduce((prev, curr) => prev + curr, 0)
              }
              </p>

            </div>

            <Button onClick={() => dispatch(checkoutCart())}> Checkout</Button>
          </Offcanvas.Body>

        </Offcanvas>
      ))}
    </>

  );
};

export default Cart;