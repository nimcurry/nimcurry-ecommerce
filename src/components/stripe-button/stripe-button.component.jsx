import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_vrcigwg1D1mB8oBKe6ITCTUn00LETOAdM4';

    const onToken = token => {
        console.log(token);
        alert('payment Successful');
    };

    return(
        <StripeCheckout
            label = 'Pay Now'
            name = 'CRWN clothing ltd.'
            billingAddress
            shippingAddress
            image = 'https://sendeyo.com/en/f3eb2117da'
            description={`your total price value is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />

    );
};

export default StripeCheckoutButton;