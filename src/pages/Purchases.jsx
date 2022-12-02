import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { Link } from 'react-router-dom';

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector(state => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])
  return (
    <div>
      <h1>Welcome!</h1>
      <h6>Your purchases are here...</h6>
      <ul className='purchases-container'>
        {
          purchases?.map(purchase => (
            <div key={purchase.id}>
              {purchase.cart.products?.map(product => (
                <li key={product.id} className="purchased-list">
                  <Link to={`/productdetail/${product.id}`} className="purchased-products">
                    <div className='purchases-list'>
                    <p><b>{product.title}</b></p>
                    <p><b>Price: </b>${product.price}</p>
                    <p><b>Purchase Date: </b>{product.createdAt}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </div>
          ))
        }
      </ul>
    </div>
  );
};

export default Purchases;