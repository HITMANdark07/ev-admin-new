import React from "react";
import { ShieldCheckIcon } from "@heroicons/react/solid";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/user/user.action";
import { AiOutlineBank,AiOutlineHistory,AiFillThunderbolt } from 'react-icons/ai';

const Sidebar = ({activeMenu}) => {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <aside
      className="w-64 h-screen fixed bg-gray-50 dark:bg-gray-800"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-4 px-3">
        <Link to="/" className="flex items-center pl-2.5 mb-5">
          <ShieldCheckIcon color="#ffffff" className="h-12 w-auto" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            EV-ADMIN
          </span>
        </Link>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${location.pathname==="/dashboard" && "bg-gray-700" } hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <svg
                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/devices"
              className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${location.pathname==="/devices" && "bg-gray-700" } hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Devices</span>
              <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </Link>
          </li>
          {/* <li>
            <Link
              to="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
              <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                3
              </span>
            </Link>
          </li> */}
          <li>
            <Link
              to="/users"
              className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${location.pathname==="/users" && "bg-gray-700" } hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${location.pathname==="/history" && "bg-gray-700" } hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <AiOutlineHistory color="grey" size={20} />
              <span className="flex-1 ml-3 whitespace-nowrap">Charging History</span>
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${location.pathname==="/transactions" && "bg-gray-700" } hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <AiOutlineBank color="grey" size={20} />
              <span className="flex-1 ml-3 whitespace-nowrap">Transactions</span>
            </Link>
          </li>
          <li>
            <Link
              to="/withdrawls"
              className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${location.pathname==="/withdrawls" && "bg-gray-700" } hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <AiFillThunderbolt color="grey" size={20} />
              <span className="flex-1 ml-3 whitespace-nowrap">Withdrawl Requests</span>
            </Link>
          </li>
          <li>
            <div
              onClick={() => {
                dispatch(setCurrentUser(null));
                navigate("/")
              }}
              className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
            </div>
          </li>
          </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
