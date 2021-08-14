import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import  CollectionsPreview  from '../collections-preview/collection-preview.component'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';

import './collections-overview.style.scss';

const CollectionsOverview = ({ collections }) => (
    <div className='collections-overview'>
                    {
                collections.map(({id, ...otherCollections})=>(
                <CollectionsPreview key={id} {...otherCollections} />
                ))
            }

    </div>
);


const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);