import React, { Suspense } from 'react';
import Checkout from './_component/Checkout';
import BootLoader from "../component/BootLoader";
const Page = ({searchParams}) => {
    return (
        <Suspense  fallback={<BootLoader show={true} logoText="Shop" />}>
            <Checkout />
        </Suspense>
    );
};

export default Page;