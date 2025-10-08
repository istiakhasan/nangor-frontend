import React, { Suspense } from 'react';
import Checkout from './_component/Checkout';

const Page = ({searchParams}) => {
    return (
        <Suspense  fallback={<div>Loading...</div>}>
            <Checkout />
        </Suspense>
    );
};

export default Page;