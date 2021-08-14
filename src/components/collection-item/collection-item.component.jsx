import React from 'react';
import {connect} from 'react-redux';

import ButtonCustom from '../custom-button/custom-button.component';
import {addItem}   from '../../redux/cart/cart.actions';

import './collection-item.style.scss';

const CollectionItem = ({item, addItem}) => {
    const { name, price, imageUrl} = item;
    return (
    <div className='collection-item'>
        <div className='image'
            style={{
                backgroundImage: `url(${imageUrl})`
            }}>

        </div>
        <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <ButtonCustom onClick={()=> addItem(item)}>Add to Cart</ButtonCustom>
    </div>
)};


const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})
export default connect(null,mapDispatchToProps )(CollectionItem);