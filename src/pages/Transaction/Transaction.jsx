import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";


const Transaction = () => {

    
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
          role
          </th>
          <th scope="col" className="px-6 py-3">
          verified
          </th>
          <th scope="col" className="px-6 py-3">
          <span className="sr-only">Edit</span>
          </th>
          </tr>
          </thead>
          {/* <tbody>
          {users.map((user) => (
            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {user.name}
            </th>
            <td className="px-6 py-4">
            {user.email}
            </td>
            <td className="px-6 py-4">
            {renderRole(user.role)}
            </td>
            <td className="px-6 py-4">
            {user.verified===1 ? <MdVerified size={30} />: "Not-Verified"}
            </td>
            <td className="px-6 py-4 text-right">
            <Link to="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
            </td>
            </tr>
          ))}
          
          </tbody> */}
          </table>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Transaction;
