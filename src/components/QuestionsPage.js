import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Question from './Question';

const QuestionsPage = ({id}) => {
const [ques, setQues]= useState([]);
const [attempted, setAttempted]= useState([]);
const [correct, setCorrect]= useState([]);
console.log("inside questionpage");
console.log(id.id);
useEffect(()=>{
  fetch("http://localhost:5002/admin/tests").then(e=>e.json()).then(e=>{
    console.log(e.tests);
   
    let test= e.tests.findIndex(e=>e._id===id.id);
  
    setQues(e.tests[test].questions);
})
},[]);
  return (
   <>
<h3>Statistics:</h3>
Total Attempted: {attempted.length}/ {ques.length};
{
  ques.map((e, idx)=><><div>
    <Question id={e.id} idx={idx}  statement={e.statement} option1={e.option1} option2= {e.option2} option3={e.option3} option4= {e.option4} correctOption={e.correctOption} setAttempted={setAttempted}  attempted={attempted} />
    </div></>)
}
   </>
  )
}

export default QuestionsPage