import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import CreateTest from './CreateTest';
import TestCard from './TestCard';
import QuestionsPage from './QuestionsPage';

const LandingPage = () => {
    const [open, setOpen]= useState(false);
    const [totalTest, setTotalTest]= useState([]);
    const [testId, setTestId]= useState("");
    const [showQuestionPage, setShowQuestionPage]= useState(false);

useEffect(()=>{
    fetch("http://localhost:5002/admin/tests").then(e=>e.json()).then(e=>{
        setTotalTest(e.tests);
        console.log(e.tests);
    })
}, [])

  return (
   <>
   <Navbar setOpen={setOpen}/>
   {
   !showQuestionPage && open && <CreateTest setOpen={setOpen}/>
   }
    {
     !showQuestionPage &&   totalTest.map(e=><TestCard testname= {e.testname} duration={e.duration} id={e._id}setShowQuestionPage={setShowQuestionPage}  setTestId={setTestId}/>)
    }
    {
       showQuestionPage && <QuestionsPage  id={testId} />
    }
   </>
  )
}

export default LandingPage