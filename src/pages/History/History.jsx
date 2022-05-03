import React, {useEffect, useState} from "react";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import { api } from "../../api.config";
import axios from "axios";
import moment from "moment";

const History = () => {

  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(10);
  const [loading, setLoading] = useState(false);
  //eslint-disable-next-line
  const [limit, setLimit] = useState(10);
  const [charges, setCharges] = useState([]);

  const init = (skip, limit) => {
    setLoading(true);
    axios({
      method:'GET',
      url:`${api}/charge/list?limit=${limit}&skip=${skip}`
    }).then(({data}) => {
      setTotal(data.total);
      setCharges(data.chargings);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    })
  }
  useEffect(() => {
    init(skip, limit);
  },[skip, limit]);
  return (
    <div>
      <Sidebar activeMenu="Dashboard" />
      <div style={{ marginLeft: "16rem" }}>
        <Header />
        <div style={{width:'90%', marginLeft:'5%'}}>
        <div className="font-bold text-lg tracking-wide my-2">History</div>
            
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-6 py-3">
          USER
          </th>
          <th scope="col" className="px-6 py-3">
          EMAIL
          </th>
          <th scope="col" className="px-6 py-3">
          DEVICE CODDE
          </th>
          <th scope="col" className="px-6 py-3">
          STATUS
          </th>
          <th scope="col" className="px-6 py-3">
          AMOUNT
          </th>
          <th scope="col" className="px-6 py-3">
          TIME
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
          {charges.map((charge) => (
            <tr key={charge._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {charge.user.name}
            </th>
            <td className="px-6 py-4">
            {charge.user.email}
            </td>
            <td className="px-6 py-4">
            {charge.device.code}
            </td>
            <td className={`px-6 py-4 ${charge.status==="CHARGING" ? "text-yellow-500": "text-lime-500"}`}>
            {charge.status}
            </td>
            <td className="px-6 py-4">
            {charge.amount}
            </td>
            <td className="px-6 py-4">
            {moment(charge.createdAt).format("DD MMM yy HH:MM A")}
            </td>
            </tr>
          ))}
          
          </tbody>
          </table>
          <Pagination total={total} skip={skip} limit={limit} setSkip={setSkip}  />
          </div>


        </div>
      </div>
    </div>
  );
};

export default History;
