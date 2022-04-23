import React, { useState } from 'react';

const AutoComplete = ({placeholder="Search Here",type="text", value, onChange, suggestions=[]}) => {
    const [show, setShow] = useState(false);
    return(
        <div className='flex flex-col relative flex-1 mb-4'>
            <input 
            autoComplete={false}
            onFocus={() => setShow(true)}
            // onBlur={() => setShow(false)}
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm w-full"
            type={type} placeholder={placeholder} value={value} onChange={onChange}  />
            { show && 
            <div className='flex flex-col absolute mt-10 bg-white max-h-48 overflow-y-scroll z-10 w-full rounded'>
            {suggestions.map((data) => (
                <div key={data}  className="px-4 py-1 font-medium bg-slate-200 my-0.5 cursor-pointer hover:bg-slate-400 hover:text-white rounded"
                onClick={(e) => {
                    setShow(false);
                    e.target.value = data.email;
                    onChange(e);
                }}
                >
                    {data.email}
                </div>
            ))}
            </div>}
        </div>
    )
};

export default AutoComplete;