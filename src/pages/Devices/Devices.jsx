import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Toaster from "../../components/Toaster";
import { api } from "../../api.config";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Modals from '../../components/Modals';
import { useSelector } from "react-redux";

const Devices = () => {

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal , setShowModal] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const init = async() => {
    try{
      const {data} = await axios({
        method:'GET',
        url:`${api}/device/list`
      });
      setLoading(false);
      setDevices(data);
    }catch(err){
      toast.error(err);
      setLoading(false);
    }
  }
  useEffect(() => {
    if(!currentUser){
      navigate("/");
    }
  },[currentUser,navigate])
    
  useEffect(() => {
    init()
  },[]);
  
  
  return (
    <div>
      <Sidebar activeMenu="Dashboard" />
      {showModal && <ModalView closeModal={() => setShowModal(false)} />}
      <Toaster/>
      <div style={{ marginLeft: "16rem" }}>
        <Header />
        <div style={{width:'90%', marginLeft:'5%'}}>
          <div className="flex flex-row justify-between">
          <div className="font-bold text-xl tracking-wide my-2">DEVICES</div>
          <button className="bg-blue-500 hover:bg-blue-700 self-center py-2 px-4 text-white font-bold rounded"
          onClick={() => {
            setShowModal(true);
          }}
          >ADD NEW DEVICE</button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {devices.map((device) => (
            <div key={device._id} className="group relative border-neutral-800">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={`${api}/device/qr/image/${device._id}`}
                  alt={device.code}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-700">
                    <Link to="/">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {device.code}
                    </Link>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">₹{device.rate}/min</p>
              </div>
            </div>
          ))}
          {
            loading && 
            [1,2,3,4,5,6,7,8].map((skel) => (
              <div key={skel} class="animate-pulse flex space-x-4">
              <div class="flex-1  py-1">
                  <div class="h-60 bg-slate-700 rounded"></div>
              </div>
              </div>
            ))
          }
        </div>
        </div>
      </div>
    </div>
  );
};

const ModalView = ({closeModal}) => {
  const submitHandler = (e) => {
    e.prevetDefault();
  }
  const inpstyle= "appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm w-full";
  return (
    <Modals closeModal={closeModal}>
      <div>
        <form className="flex-col" onSubmit={submitHandler}>
          <div className="rounded-md shadow-sm">
          <div className="mb-5 w-full">
            <label htmlFor="code" className="sr-only">
              Enter New Code
            </label>
            <input
              id="code"
              name="code"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              type="text"
              required
              className={inpstyle}
              placeholder="Enter New Code"
            />
          </div>
          </div>
        </form>
      </div>
    </Modals>
  )
}

export default Devices;
