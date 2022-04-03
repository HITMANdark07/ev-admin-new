import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";


const Products = () => {

    
  return (
    <div>
      <Sidebar activeMenu="Dashboard" />
      <div style={{ marginLeft: "16rem" }}>
        <Header />
        <div style={{width:'90%', marginLeft:'5%'}}>
          <div className="font-bold text-lg tracking-wide my-2">PRODUCTS</div>
        </div>
      </div>
    </div>
  );
};

export default Products;
