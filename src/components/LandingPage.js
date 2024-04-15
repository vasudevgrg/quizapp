import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import CreateTest from './CreateTest';
import TestCard from './TestCard';

const LandingPage = () => {
    const [open, setOpen]= useState(false);
    const [totalTest, setTotalTest]= useState([]);

useEffect(()=>{
    fetch("http://localhost:5002/admin/tests").then(e=>e.json()).then(e=>{
        setTotalTest(e.tests);
        console.log(e.tests);
    })
})

  return (
   <>
   <Navbar setOpen={setOpen}/>
   {
    open && <CreateTest setOpen={setOpen}/>
   }
    {
        totalTest.map(e=><TestCard/>)
    }
   </>
  )
}

export default LandingPage