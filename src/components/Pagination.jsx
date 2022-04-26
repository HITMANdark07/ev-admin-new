import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const getArr = (nPages, startPage) => {
    let temp = startPage+5;
    let start = startPage;
    let arr = [];
    while (temp--) {
      arr.push(start++);
      if(temp==startPage || start>nPages) break;
    }
    return arr;
};
const Pagination = ({ total, skip, limit, setSkip }) => {
  let numberofPages = Math.ceil(total / limit);
  
  let [activePage, setActivePage] = useState(1);
  let [pages, setPages] = useState(getArr(numberofPages, activePage));

  useEffect(() => {
      if(activePage!==1){
        setSkip(limit*(activePage-1));
        setPages(getArr(numberofPages,activePage))
      }else{
          setPages(getArr(numberofPages,activePage))
          setSkip(0);
      }
  },[activePage]);

  const handleActivePage = (page) => {
      setActivePage(page)
  }
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <div className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </div>
        <div className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next
        </div>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{skip+1}</span> to{" "}
            <span className="font-medium">{skip + limit <=total ? skip+limit : total}</span> of{" "}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <div 
            onClick={() => {
                if(activePage!==1){
                    setActivePage((page) => page-1)
                }
            }}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <AiOutlineLeft className="h-5 w-5 cursor-pointer" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {/* <div
              aria-current="page"
              className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              1
            </div> */}
            {pages.map((page) => (
                <div
                onClick={() => handleActivePage(page)}
                aria-current="page"
                className={`${activePage===page ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600" :"bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer`}
                >
                    {page}
                </div>
            ))}
            <div
             onClick={() => {
                if(activePage!==numberofPages){
                    setActivePage((page) => page+1)
                }
             }}
             className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <AiOutlineRight className="h-5 w-5 cursor-pointer" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
