/* eslint-disable @next/next/no-img-element */
'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

const MenuBar = () => {
    const active=true
    const router=useRouter()
    return (
        <div className='md:flex gap-[50px] items-center  px-4 py-4'>
            {/* <div>
                <button className='text-[18px] font-semibold text-white bg-[#4d321d] px-8 py-3 rounded-[4px]'>Browse All Categories</button>
            </div> */}
            <div>
                <ul className='flex'>
                    <li onClick={()=>router.push('/')} className={`${active?'text-[#4d321d]':'text-[#253D4E]'} hover:text-[#4d321d] hover:cursor-pointer text-[16px] font-[700] mr-[30px]`}>Home</li>
                    <li onClick={()=>router.push('/about')} className={`${false?'text-[#4d321d]':'text-[#253D4E]'} hover:text-[#4d321d] hover:cursor-pointer text-[16px] font-[700] mr-[30px]`}>About</li>
                    <li onClick={()=>router.push('/shop')} className={`${false?'text-[#4d321d]':'text-[#253D4E]'} hover:text-[#4d321d] hover:cursor-pointer text-[16px] font-[700] mr-[30px]`}>Shop</li>
                    <li onClick={()=>router.push('/contact')} className={`${false?'text-[#4d321d]':'text-[#253D4E]'} hover:text-[#4d321d] hover:cursor-pointer text-[16px] font-[700] mr-[30px]`}>Contact</li>
                </ul>
            </div>
            <div className='ml-auto md:flex hidden items-center gap-2'>
                 <div>
                    <img className='h-[36] w-[36]' src="https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/icon-headphone.svg" alt="" />
                 </div>
                <div>
                    <p className='text-[#4d321d] text-[26px] font-bold'>1900-888</p>
                    <p className='text-[#7E7E7E] font-[12px]'>24/7 Support Center</p>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;