import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Toaster from "../../components/Toaster";
import { api } from "../../api.config";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Modals from '../../components/Modals';
import { useSelector } from "react-redux";
import { compose, withProps } from "recompose";
import { MdLibraryAdd } from 'react-icons/md';
import { CgCloseR } from 'react-icons/cg';
import { BsFillTrashFill } from 'react-icons/bs';
import { GoDesktopDownload } from 'react-icons/go';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import AutoComplete from "../../components/AutoComplete";

const Devices = () => {

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal , setShowModal] = useState(false);
  const [showUpdateModal , setShowUpdateModal] = useState(false);
  const [updateDevice, setUpdateDevice] = useState({});
  const [searchCode, setSearchCode] = useState('');
  const currentUser = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();

  const updateDevices = (device,type) => {
    if(type==='u'){
      const d = [...devices];
      const idx = d.findIndex((dvc) => dvc._id===device._id);
      if(idx!==-1){
        d[idx]=device;
      };
      setDevices(d);
    }else{
      const d = devices.filter((dvc) => dvc._id!==device._id);
      setDevices(d);
    }
  }
  
  const init = useCallback(async(srch=searchCode) => {
    setLoading(true);
    try{
      const {data} = await axios({
        method:'GET',
        url:`${api}/device/list?code=${srch}`
      });
      setLoading(false);
      setDevices(data);
    }catch(err){
      toast.error(err);
      setLoading(false);
    }
    //eslint-disable-next-line
  },[])

  useEffect(() => {
    if(!currentUser){
      navigate("/");
    }
  },[currentUser,navigate])
    
  useEffect(() => {
    const tm = setTimeout(() => {
      init(searchCode);
    },300);
    return () => {
      clearTimeout(tm);
    }
  },[searchCode,init]);
  
  return (
    <div>
      <Sidebar activeMenu="Dashboard" />
      {showModal && !showUpdateModal && <ModalView setDevices={setDevices} closeModal={() => setShowModal(false)} />}
      {showUpdateModal && !showModal && <UpdateModalView device={updateDevice} updateDevices={updateDevices} closeModal={() => setShowUpdateModal(false)} />}
      <Toaster/>
      <div style={{ marginLeft: "16rem" }}>
        <Header />
        <div style={{width:'90%', marginLeft:'5%', marginTop:20}}>
          <div className="flex flex-row justify-between">
          <div className="flex flex-row justigy-start items-center" >
            <p className="font-bold text-xl tracking-wide my-2">DEVICES</p>
            <input type="text" value={searchCode} onChange={(e) => setSearchCode(e.target.value)} placeholder="Search Device With Code" className="border-2 border-slate-500 px-4 py-1 ml-5 outline-none rounded" />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 self-center py-2 px-4 text-white font-bold rounded"
          onClick={() => {
            setShowModal(true);
          }}
          >ADD NEW DEVICE</button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {devices.map((device) => (
            <div key={device._id} className="group relative border-neutral-800 cursor-pointer" onClick={()=>{
              setUpdateDevice(device);
              setShowUpdateModal(true)
            }}>
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
                      <span aria-hidden="true" className="absolute inset-0" />
                      {device.code}
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

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyATzOQBhRyutho2AlgGTQnsybhNOkuACzI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `300px` }} />,
    containerElement: <div style={{ height: `300px`, width:`100%`, borderRadius:8, overflow:'hidden' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  
  return (
    <GoogleMap defaultZoom={props.defaultProps.zoom} 
    defaultCenter={props.defaultProps.center}>
        <Marker onDragEnd={(e) => {
          const {latLng:{lat,lng}} = e;
          props.locationChangeHandler(lat(), lng());
        }} draggable position={props.defaultProps.center} />
    </GoogleMap>
  )
}
);

const ModalView = ({closeModal,setDevices}) => {

  const [defaultProps, setDefaultProps] = useState({
    center: {
        lat: 22.600358335659724 ,
        lng: 88.43045042929604
    },
    zoom: 18.88
  });
  const currentUser = useSelector(state => state.user.currentUser);
  const [values, setValues] = useState({
    code:'',
    rate:'',
    location:{
      lat:'',
      lng:''
    },
    owner:''
  })
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [userSearch, setUserSearch] = useState(currentUser?.user?.email);
  const { code, rate, owner} = values;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setDefaultProps(prevProps => ({
        ...prevProps,
        center:{
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }))
      setValues(prevProps => ({
        ...prevProps,
        location:{
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }))
    },(err) => {
      if(err.code === 1) {
        alert("Error: Location Access is denied!");
     } else if( err.code === 2) {
        alert("Error: Position is unavailable!");
     }
    },{
      timeout:60000
    })
  },[])

  const changeHandler = (e) => {
    let name = e.target.name;
    setValues((prevState) => ({
      ...prevState,
      [name]:e.target.value
    }))
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    if(!owner || !userSearch){
      toast.warn("Add an owner Please");
      return ;
    }
    setLoading(true);
    try{
      const { data } = await axios({
        method:'POST',
        url:`${api}/device/create`,
        data:values
      })
      setDevices((prevDevices) => [...prevDevices,data])
      setLoading(false);
      setValues((prevState) => ({
        ...prevState,
        code:'',
        rate:''
      }));
      closeModal();
      toast.success(`Device Created....!`);
    }catch(err){
      toast.error(err?.response?.data?.message);
      setLoading(false);
    }
  }
  const locationChangeHandler = (lat, lng) => {
    setValues((prevState) => ({
      ...prevState,
      location:{
        lat:lat,
        lng:lng
      }
    }))
  };
  useEffect(() => {
    let timer = setTimeout(() => {
      if(userSearch){
        axios({
          method:'GET',
          url:`${api}/user/search/list?email=${userSearch}`
        }).then(({data}) => {
          setSuggestions(data);
          let d = data.find((d) => d.email===userSearch);
          if(d){
            setValues((prevVals) => ({
              ...prevVals,
              owner:d._id
            }))
          }else{
            setValues((prevVals) => ({
              ...prevVals,
              owner:''
            }))
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    },300);
    return() => {
      clearTimeout(timer);
    }
  },[userSearch]);

  const inpstyle= "appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm w-full";
  return (
    <Modals closeModal={closeModal}>
      <div>
        <div className="flex flex-row self-center justify-between">
        <div className="mt-2 mb-2 text-xl font-extrabold text-gray-900">
        ADD NEW DEVICE
        </div>
        <div>
          <CgCloseR onClick={closeModal} size={25} style={{cursor:'pointer'}} />
        </div>
        </div>
        <form className="flex-col" onSubmit={submitHandler}>
          <div className="rounded-md shadow-sm">
          <div className="mb-5 w-full">
            <label htmlFor="code" className="sr-only">
              Enter New Code
            </label>
            <input
              id="code"
              name="code"
              value={code}
              onChange={changeHandler}
              type="text"
              required
              className={inpstyle}
              placeholder="Enter New Code"
            />
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="rate" className="sr-only">
              Enter Charging Price per min
            </label>
            <input
              name="rate"
              value={rate}
              onChange={changeHandler}
              min={0}
              type="number"
              required
              className={inpstyle}
              placeholder="Enter Charging Price per min"
            />
          </div>
          <AutoComplete type="text" placeholder="Add Owner Email Here" value={userSearch} suggestions={suggestions} onChange={(e) => setUserSearch(e.target.value)} />
          <div className="mb-5 w-full">
            <MyMapComponent defaultProps={defaultProps} locationChangeHandler={locationChangeHandler} />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {
                  !loading ?
                <MdLibraryAdd size={25} />
                :
                <svg role="status" class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>}
              </span>
              ADD DEVICE
            </button>
          </div>
          
          </div>
        </form>
      </div>
    </Modals>
  )
}
const Spinner = () => {
  return (
    <svg role="status" class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
  )
}

const UpdateModalView = ({closeModal,device,updateDevices}) => {
//eslint-disable-next-line
  const [defaultProps, setDefaultProps] = useState({
    center: {
        lat: device?.location?.lat,
        lng: device?.location?.lng
    },
    zoom: 18.88
  });

  const [values, setValues] = useState({
    code:device?.code,
    rate:device?.rate,
    location:{
      lat:device?.location?.lat,
      lng:device?.location?.lng
    },
    owner:device?.owner?._id
  });

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] =useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [userSearch, setUserSearch] = useState(device?.owner?.email);
  const { code, rate, owner} = values;

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setDefaultProps(prevProps => ({
  //       ...prevProps,
  //       center:{
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       }
  //     }))
  //     setValues(prevProps => ({
  //       ...prevProps,
  //       location:{
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       }
  //     }))
  //   },(err) => {
  //     if(err.code === 1) {
  //       alert("Error: Location Access is denied!");
  //    } else if( err.code === 2) {
  //       alert("Error: Position is unavailable!");
  //    }
  //   },{
  //     timeout:60000
  //   })
  // },[])

  const changeHandler = (e) => {
    let name = e.target.name;
    setValues((prevState) => ({
      ...prevState,
      [name]:e.target.value
    }))
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    if(!owner || !userSearch){
      toast.warn("Please Add an Owner");
      return;
    }
    setLoading(true);
    try{
      const { data } = await axios({
        method:'PUT',
        url:`${api}/device/update/${device._id}`,
        data:values
      })
      updateDevices(data,'u');
      setLoading(false);
      closeModal();
      toast.success(`Device Updated....!`);
    }catch(err){
      toast.error(err?.response?.data?.message);
      setLoading(false);
    }
  }

  const deleteDevice = async() => {
    setLoading2(true);
    try{
      const { data } = await axios({
        method:'DELETE',
        url:`${api}/device/remove/${device._id}`,
      })
      updateDevices(data,'r');
      setLoading2(false);
      closeModal();
      toast.success(`Device Deleted....!`);
    }catch(err){
      toast.error(err?.response?.data?.message);
      setLoading(false);
    }
  }
  const locationChangeHandler = (lat, lng) => {
    setValues((prevState) => ({
      ...prevState,
      location:{
        lat:lat,
        lng:lng
      }
    }))
  };
  useEffect(() => {
    let timer = setTimeout(() => {
      if(userSearch){
        axios({
          method:'GET',
          url:`${api}/user/search/list?email=${userSearch}`
        }).then(({data}) => {
          setSuggestions(data);
          let d = data.find((d) => d.email===userSearch);
          if(d){
            setValues((prevVals) => ({
              ...prevVals,
              owner:d._id
            }))
          }else{
            setValues((prevVals) => ({
              ...prevVals,
              owner:''
            }))
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    },300);
    return() => {
      clearTimeout(timer);
    }
  },[userSearch]);

  function download(url,filename){
    axios({
        url:url,
        method:'GET',
        responseType: 'blob'
      })
      .then((response) => {
            const url = window.URL
            .createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download',   `${filename}.png`);
                    document.body.appendChild(link);
                    link.click();
      })
    }
  const inpstyle= "appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm w-full";
  return (
    <Modals closeModal={closeModal}>
      <div>
        <div className="flex flex-row self-center justify-between">
        <div className="flex flex-row items-center">
        <div className="mt-2 mb-2 text-xl font-extrabold text-gray-900">
        UPDATE {device?.code}
        </div>
        <div className="cursor-pointer ml-5" onClick={() => {
          download(`${api}/device/qr/image/${device._id}`,device.code);
        }}>
            <GoDesktopDownload size={25} color="#2165f8" />
        </div>
        </div>
        <div>
          <CgCloseR onClick={closeModal} size={25} style={{cursor:'pointer'}} />
        </div>
        </div>
        <form className="flex-col" onSubmit={submitHandler}>
          <div className="rounded-md shadow-sm">
          <div className="mb-5 w-full">
            <label htmlFor="code" className="sr-only">
              Enter New Code
            </label>
            <input
              id="code"
              name="code"
              value={code}
              onChange={changeHandler}
              type="text"
              required
              className={inpstyle}
              placeholder="Enter New Code"
            />
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="rate" className="sr-only">
              Enter Charging Price per min
            </label>
            <input
              name="rate"
              value={rate}
              onChange={changeHandler}
              min={0}
              type="number"
              required
              className={inpstyle}
              placeholder="Enter Charging Price per min"
            />
          </div>
          <AutoComplete type="text" placeholder="Add Owner Email Here" value={userSearch} suggestions={suggestions} onChange={(e) => setUserSearch(e.target.value)} />
          <div className="mb-5 w-full">
            <MyMapComponent defaultProps={defaultProps} locationChangeHandler={locationChangeHandler} />
          </div>

          <div className="flex flex-row justify-between">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 mr-2 p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {
                  !loading ?
                <MdLibraryAdd size={25} />
                :
                <Spinner />
                }
              </span>
              UPDATE DEVICE
            </button>
            <button
              type="button"
             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 ml-2 p-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading2}
              onClick={deleteDevice}
              >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                {
                  !loading2 ?
                  <BsFillTrashFill size={20} color="#fff" />
                  :
                  <Spinner />
                }
              </span>
              DELETE DEVICE
            </button>
          </div>
          
          </div>
        </form>
      </div>
    </Modals>
  )
}

export default Devices;
