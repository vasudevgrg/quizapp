import React, { useState } from 'react';
import "../index.css";

const CreateTest = ({setOpen}) => {
    const [openform, setOpenform]= React.useState(false);
    const [testName, setTestName]= React.useState("");
    const [duration, setDuration]= useState();
    const [id, setId]= useState("");

    const [statement, setStatement]= useState("");
    const [option1, setOption1]= useState("");
    const [option2, setOption2]= useState("");
    const [option3, setOption3]= useState("");
    const [option4, setOption4]= useState("");
    const [correctOption, setCorrectOption]= useState("");

    const [value, setValue]= useState("");

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
        }).then(e=>e.json()).then(e=>{console.log(e); setId(e.id)});
        setOpenform(true);
    };

    const addQuestion=()=>{
        fetch("http://localhost:5002/admin/addquestion", {
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                "id":id
            },
            body:JSON.stringify({
                "statement": statement,
                "option1":option1,
                "option2":option2,
                "option3":option3,
                "option4": option4,
                "correctoption":correctOption
            })
        });

        setValue("");
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
    <input onChange={e=>setStatement(e.target.value)} defaultValue={value}/>
    <label>FillOptions</label>
    <label>Option1</label>
    <input onChange={e=>setOption1(e.target.value)} defaultValue={value}/>
    <label>Option2</label>
    <input onChange={e=>setOption2(e.target.value)} defaultValue={value}/>
    <label>Option3</label>
    <input onChange={e=>setOption3(e.target.value)} defaultValue={value}/>
    <label>Option4</label>
    <input onChange={e=>setOption4(e.target.value)} defaultValue={value}/>
    <label>Correct option</label>
    <input onChange={e=>setCorrectOption(e.target.value)} defaultValue={value}/>
    
    <button onClick={addQuestion}>Save Question</button>
    </>
}
</div>
   </>

  )
}

export default CreateTest