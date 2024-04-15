import React, { useState } from 'react';
import "../index.css";

const CreateTest = ({setOpen}) => {
    const [openform, setOpenform]= React.useState(false);
    const [testName, setTestName]= React.useState("");
    const [duration, setDuration]= useState();
    const [id, setId]= useState("");

    const handleQuestions=()=>{
        fetch("http://localhost:5002/admin/createtest", {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "token": localStorage.getItem("token")
            },
            body:JSON.stringify({
                "testname": testName,
                "duration": duration,
                "questions": []
            })
        }).then(e=>e.josn()).then(e=>console.log(e));
        setOpenform(true);
    };

    const addQuestion=()=>{
        
    }
  return (
   <>
   <div className="wrapper" onClick={()=>setOpen(false)}></div>

<div className="container" style={{display:"flex", flexDirection:"column", margin:"10px"}}>
  {!openform && <><label> Name of test</label>
   <input onChange={(e)=>setTestName(e.target.value)}/>
   <label>Duration</label>
   <input onChange={e=>setDuration(e.target.value)}/>
   <button onClick={handleQuestions}>Save Name of Test</button></>}

{
    openform && <>
    <label>Type Question Name</label>
    <input/>
    <label>FillOptions</label>
    <label>Option1</label>
    <input/>
    <label>Option2</label>
    <input/>
    <label>Option3</label>
    <input/>
    <label>Option4</label>
    <input/>
    
    <button onClick={addQuestion}>Save Question</button>
    </>
}
</div>
   </>

  )
}

export default CreateTest