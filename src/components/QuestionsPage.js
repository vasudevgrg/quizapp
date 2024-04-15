import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const QuestionsPage = ({id}) => {
const [ques, setQues]= useState([]);
console.log("inside questionpage");
console.log(id.id);
useEffect(()=>{
  fetch("http://localhost:5002/admin/tests").then(e=>e.json()).then(e=>{
    console.log(e.tests);
   
    let test= e.tests.findIndex(e=>e._id===id.id);
  
    setQues(e.tests[test].questions);
})
});
  return (
   <>

{
  ques.map((e)=><><div>
    <h3>{e.statement}</h3>
    a. {e.option1} <br/>
    b. {e.option2}<br/>
    c. {e.option3}<br/>
    d. {e.option4}
    </div></>)
}
   </>
  )
}

export default QuestionsPage