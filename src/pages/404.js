import React from 'react';
import { FaRoute } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className='flex flex-col justify-center'>
            <div className='text-4xl text-center font-medium mt-20 mb-10'>404 Page Not Found</div>
            <FaRoute className='self-center' size={70} />
        </div>
    )
}

export default NotFound;