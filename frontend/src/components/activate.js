import React from 'react';
import './activate.css';
import * as api from '../api/index';
import { useEffect } from 'react';
import getData from '../api/index'

import { useState } from 'react';


const Activate = () => {
    const [user,setUser]=useState();
    const alluser=async()=>{
        const [Data, Error] = await getData();
        setUser(Data.data);
       return Data;
    }
    
      useEffect(()=>{
       alluser();
      },[])
   console.log(user);
    
    
  return (
    <div className='activated'>
      <h1>Success!</h1>
      <h2>Your form has been submitted successfully. </h2>
      <div className='userdata'>
      {user?.map((user)=>(
        
         <div className='usercard'>
         <div><h4>Name: {user.name}</h4></div>
         <div><h4>Email: {user.email}</h4></div>
         </div>
))}
</div>
    </div>
  );
};

export default Activate;
