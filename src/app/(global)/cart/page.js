import { Suspense } from 'react';
import CartPage from './_component/Cart';

const Page =async () => {
    return (
        <>
        <Suspense  fallback={<div>Loading...</div>}>

            <CartPage />
        </Suspense>
        </>
    );
};

export default Page;