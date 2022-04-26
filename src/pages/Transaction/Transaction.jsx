import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Pagination from '../../components/Pagination';
import axios from 'axios';
import { api } from '../../api.config';
import moment from 'moment'

const Transaction = () => {

  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(49);
  //eslint-disable-next-line
  const [limit, setLimit] = useState(10);
  const [transactions, setTransactions] = useState([]);

  const init = (skip, limit) => {
    axios({
      method:'GET',
      url:`${api}/transactions/list?limit=${limit}&skip=${skip}`
    }).then(({data}) => {
      setTotal(data.total);
      setTransactions(data.transactions);
    }).catch((err) => {
      console.log(err);
    })
  }
  console.log(skip)
  useEffect(() => {
    init(skip, limit);
  },[skip, limit]);
    
  return (
    <div>
      <Sidebar activeMenu="Dashboard" />
      <div style={{ marginLeft: "16rem" }}>
        <Header />
        <div style={{width:'90%', marginLeft:'5%'}}>
        <div className="font-bold text-lg tracking-wide my-2">Transactions</div>
            
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-6 py-3">
          Name
          </th>
          <th scope="col" className="px-6 py-3">
          email
          </th>
          <th scope="col" className="px-6 py-3">
          status
          </th>
          <th scope="col" className="px-6 py-3">
          amount
          </th>
          <th scope="col" className="px-6 py-3">
          time
          </th>
          </tr>
          </thead>
          <tbody>
          {transactions.map(({status,user, amount, createdAt}) => (
            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {user.name}
            </th>
            <td className="px-6 py-4">
            {user.email}
            </td>
            <td className={`px-6 py-4 ${status==="PENDING" ? "text-yellow-500": status==="FAIL" ? "text-red-600" : "text-lime-500"}`}>
            {status}
            </td>
            <td className="px-6 py-4">
            ₹{amount.toFixed(2)}/-
            </td>
            <td className="px-6 py-4 ">
            {moment(createdAt).format("DD MMM yy HH:MM A")}
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

export default Transaction;
