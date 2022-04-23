import React from 'react';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import Toaster from './Toaster';
import { toast } from 'react-toastify';
import { api, googleClientId } from '../api.config';
import { setCurrentUser } from '../redux/user/user.action';

const Google = () => {
    const dispatch = useDispatch();
    const responseGoogle = async(response) => {
        const { profileObj,tokenId } = response;
        console.log(response);
        try{
            const {data} = await axios({
                method:'POST',
                url:`${api}/login`,
                data:{
                    photo:profileObj?.imageUrl,
                    email:profileObj?.email,
                    name: profileObj?.name,
                    idToken:tokenId
                }
            })
            if(data?.user?.role===2){
                dispatch(setCurrentUser(data));
            }else{
                toast.error("NOT AUTHRIZED FOR ADMIN")
            }
        }catch(err){
            console.log(err);
        }
        
    };
    return(
        <div className="pb-3">
            <Toaster />
            <GoogleLogin
                clientId={googleClientId}
                render={renderProps => (
                    <button className="flex justify-center border-4 border-indigo-500/100 items-center font-bold hover:border-indigo-500/75 w-full p-2 rounded" style={{
                        backgroundColor: 'white',
                      }} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                     <FcGoogle size={28} style={{marginRight:10}} /> LOGIN WITH GOOGLE
                    </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Google;