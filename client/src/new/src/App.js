import { useState } from "react";

function App(){

  const[inputs,setInputs]=useState({});
  const[x,setX]=useState("Sathish");
  const[y,setY]=useState(25);


  const handleChange = (event) => {
  const name=event.target.name;
  const value=event.target.value;
  setInputs(values => ({...values,[name]:value}))
}

const handlesubmit = (event) => {
  event.preventDefault();
  if(inputs.name===x && inputs.age===y){
    alert(`Name is ${inputs.uname} and the age is ${inputs.age}`);
  }
  else{
    alert("Not");
  }

 // console.log(inputs);
}



return(
  <form onSubmit={handlesubmit}>
    <label> Enter the name : 
    <input type="text" name="uname" value={inputs.uname} onChange={handleChange}></input>  
    </label>

    <label> Enter he age :
    <input type="number" name="age" value={inputs.age} onChange={handleChange}></input>
    </label>
    
    <button type="submit">Click Here</button>
  </form>
)

}


export default App;