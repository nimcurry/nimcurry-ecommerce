import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';

const CheckOutPage = ({cartItems, totalValue})=>(
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem=>
                (<CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
                )
        }
        <div className='total'>
            <span>TOTAL: ${totalValue}</span>
        </div>
        <div className='test-warning'>
            *Please use the following credit card for testing payments
            <br />
            4242424242424242 - expiry: 01/23 cvv: 123
        </div>
        <StripeCheckoutButton price={totalValue}/>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    totalValue: selectCartTotal
});
export default connect(mapStateToProps)(CheckOutPage);