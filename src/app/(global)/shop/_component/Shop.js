import React from 'react';
import ShopProductSection from './ShopProductSection';
import ArchiveHeader from './ArchiveHeader';

const Shop = ({searchParams}) => {
    return (
        <div className='container mx-auto'>
            {/* <ArchiveHeader /> */}
            <ShopProductSection searchParams={searchParams} />
        </div>
    );
};

export default Shop;