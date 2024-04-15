import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Question from './Question';

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
    <Question  statement={e.statement} option1={e.option1} option2= {e.option2} option3={e.option3} option4= {e.option4} />
    </div></>)
}
   </>
  )
}

export default QuestionsPage