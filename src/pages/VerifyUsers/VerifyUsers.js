import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { api } from '../../api.config';
import axios from 'axios';


const VerifyUser = () => {

    const [reqs, setReqs ] = useState([]);
    const [skip, setSkip] = useState(0);
    const [total, setTotal] =  useState(5);
    const [limit, setLimit]= useState(5);
    const [verified, setVerified] = useState(false);
    useEffect(() => {
        axios({
            method:'GET',
            url:`${api}/host/list/${verified ? 'verified':'unverified'}?skip=${skip}&limit=${limit}`
        }).then(({data}) => {
            console.log(data);
            setReqs(data.data);
            setTotal(data.count);
        }).catch((err)=>{
            console.log(err);
        })
    },[skip, limit,verified]);
    return (
        <div>
        <Sidebar activeMenu="Verify-Users" />
        <div style={{ marginLeft: "16rem" }}>
            <Header />
            <div style={{width:'90%', marginLeft:'5%'}}>
            <div className='flex flex-row items-center'>
            <div className="font-bold text-lg tracking-wide my-2">Verify Host Documents</div>
            {/* toggle */}
            <div className="flex items-center justify-center ml-2">
            <label 
                for="toogleA"
                className="flex items-center cursor-pointer"
            >
                <div className="relative">
                <input id="toogleA" type="checkbox" checked={verified} 
                onClick={() => {
                    setVerified((prev) => !prev);
                }} className="sr-only" />
                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                </div> 
                <div className="ml-3 text-gray-700 font-medium">
                {verified ? 'VERIFIED':'UNVERIFIED'}
                </div>
            </label>
            </div>
            {/* toggle */}
            </div>
        </div>
        </div>
        </div>
    )
}

export default VerifyUser;