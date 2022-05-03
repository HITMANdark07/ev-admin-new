import React, { useEffect, useState} from "react";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import { api } from '../../api.config';
import axios from 'axios';


const Withdrawls = () => {

  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(10);
  const [loading, setLoading] = useState(false);
   //eslint-disable-next-line
  const [limit, setLimit] = useState(10);
  const [withdrawl, setWithDrawl] = useState([]);

  const init = (skip, limit) => {
    setLoading(true);
    axios({
      method:'GET',
      url:`${api}/withdrawl/list?limit=${limit}&skip=${skip}`
    }).then(({data}) => {
      setTotal(data.total);
      setWithDrawl(data.withdrawlRequests);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    })
  }
  useEffect(() => {
    init(skip, limit);
  },[skip, limit]);

  const renderType = (bank) => {
    if(bank) return true;
    return false;
  }

  const updateStatus = (id,status) => {
    axios({
      method:'PUT',
      url:`${api}/withdrawl/${id}/status`,
      data:{
        status:status
      }
    }).then(({data}) => {
      console.log(data.status);
      init(skip,limit);
    }).catch((err) => {
      console.log(err?.response?.data);
    })
  }
    
  return (
    <div>
      <Sidebar activeMenu="Dashboard" />
      <div style={{ marginLeft: "16rem" }}>
        <Header />
        <div style={{width:'90%', marginLeft:'5%'}}>
        <div className="font-bold text-lg tracking-wide my-2">Withdrawls</div>
            
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-6 py-3">
          Name
          </th>
          <th scope="col" className="px-6 py-3">
          EMAIL
          </th>
          <th scope="col" className="px-6 py-3">
          STATUS
          </th>
          <th scope="col" className="px-6 py-3">
          WITHDRAWL TYPE
          </th>
          <th scope="col" className="px-6 py-3">
          DETAIL
          </th>
          <th scope="col" className="px-6 py-3">
          AMOUNT
          </th>
          <th scope="col" className="px-6 py-3">
          UPDATE
          </th>
          </tr>
          </thead>
          <tbody>
          {
            loading && 
            [1,2,3,4,5,6,7,8,9,10].map((skel) => (
              <tr key={skel} class="animate-pulse space-x-4">
              <td colSpan={7} class="flex-1  py-1 ">
                  <div class="h-10 bg-slate-700 rounded"></div>
              </td>
              </tr>
            ))
          }
          {withdrawl.map((request) => (
            <tr key={request._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {request?.user?.name}
            </th>
            <td className="px-6 py-4">
            {request?.user?.email}
            </td>
            <td className={`px-6 py-4 ${request?.status==="PENDING" ? "text-yellow-500": request?.status==="FAIL" ? "text-red-600" : "text-lime-500"}`}>
            {request?.status}
            </td>
            <td className="px-6 py-4">
            {renderType(request.accountNumber) ? "BANK ACCOUNT":"UPI_ID"}
            </td>
            <td className="px-6 py-4">
              {renderType(request.accountNumber) ? 
              <div style={{display:'flex', flexDirection:'column'}}>
                <p><b>ACC_NO:</b> {request.accountNumber}</p>
                <p><b>IFSC:</b> {request.ifsc}</p>
              </div>
              :
              request.upiId}
            </td>
            <td className="px-6 py-4">
            {request.amount}
            </td>
            <td className="px-6 py-4 text-right">
            <select className="form-select appearance-none
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
              value={request.status} 
              disabled={request.status!=='PENDING'}
              onChange={(e) => {
                updateStatus(request._id,e.target.value)
              }}
              >
                <option value='PENDING'>PENDING</option>
                <option value='SUCCESS'>SUCCESS</option>
                <option value='FAIL'>REJECTED</option>
            </select>

            </td>
            </tr>
          ))}
          
          </tbody>
          </table>
          <Pagination total={total} skip={skip} limit={limit} setSkip={setSkip} />
          </div>


        </div>
      </div>
    </div>
  );
};

export default Withdrawls;
