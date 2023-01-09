import React from "react"
import './App.css';

function App(){
  
  const [inOut, setInout] = React.useState({input:"", output:""})
  const [equals, setEquals] = React.useState(false);
  const [formula, setFormula] = React.useState([])
  
  function handleInput(e, value){
    if(!equals){
      let dotArray = []
      if(inOut.output.match(/[.]/g)){
        dotArray = inOut.output.match(/[.]/g)
      }
      if(value !== "." && value !== "0" && Number.parseFloat(inOut.output)){
        setInout(prev=>({ 
            input:prev.input.concat(value),
            output:""+ Number.parseFloat(prev.output.concat(value))
        })) 
      } else if((dotArray.length >=0||value==="0") && Number.parseFloat(inOut.output)) {
        setInout(prev=>({input:prev.input.concat(value), output:prev.output.concat(value)}))
      } else if((dotArray.length >=0||value==="0") && !Number.parseFloat(inOut.output)){
        setInout(prev=>({input:prev.input.concat(value), output:value}))
      }
    }
    console.log(inOut.output, formula)
  }
  
  function handleBack(){
    if(!equals){setInout(prev=>({
      input:[...prev.input].slice(0,-1).join(""),  
      output:[...prev.output].slice(0,-1).join("")}))}
    else {
      handleClear()
    }
  }
  
  function handleSign(e, value){
    if(!/[*/+-]$/.test(inOut.input) && inOut.input){
      if(!equals){setInout(prev=>({input:prev.input.concat(value), output:value}))
        setFormula(prev => [...prev, inOut.output, value])}
      else {
        let prevOut = inOut.output
        setInout(prev=>({input:prevOut + value, output:value}))
        setFormula(prev => [...prev, inOut.output, value])
        setEquals(false)
      }
    }
  }
  
  function handleClear(){
    setInout({input:"", output:"0"}) 
    setEquals(false)
    setFormula([])
  }
  
  function handleCalc(){
    let last = inOut.output
    let form = [...formula, last]
    console.log(form)
    if(!equals){
      while(form.join("").match(/[+-/*]/g)){
      if(form.includes("/")){
        while(form.indexOf("/")>0){
          let ind = form.indexOf("/")
          form.splice(ind-1, 3, (form[ind-1]/form[ind+1])+"")
        } 
      } else if(form.includes("*")){
        while(form.indexOf("*")>0){
          let ind = form.indexOf("*")
          form.splice(ind-1, 3, (form[ind-1]*form[ind+1]+""))
        } 
      } else if(form.includes("+")){
        while(form.indexOf("+")>0){
          let ind = form.indexOf("+") 
          form.splice(ind-1, 3, (form[ind-1]*1+form[ind+1]*1)+"")
        } 
      } else if(form.includes("-")){
        while(form.indexOf("-")>0){
          let ind = form.indexOf("-")
          form.splice(ind-1, 3, (form[ind-1]*1-form[ind+1]*1)+"")
        } 
      }
    console.log(form, "2.5"/"3"*"5"+6)
    }
    setInout(prev=>({input:prev.input.concat("="+form[0]), output:""+form[0]}))
    setEquals(true)
    setFormula([])
    } 
  }
  
  return (
  <div id="container">  
    <div id="calc">
      <div id="display">
        <p className="input">{inOut.input?inOut.input:"0"}</p>
        <p className="output">{inOut.output?inOut.output:"0"}</p>
      </div>
      <div id="clears">
        <p id="back" onClick={handleBack}>&lt;</p>
        <p id="clear" onClick={handleClear}>AC</p>   
      </div>
      <div id="divide" onClick={(event)=>{handleSign(event, "/")}}>/</div>
      <div id="multiply" onClick={(event)=>{handleSign(event, "*")}}>x</div>
      <div id="seven" onClick={(event)=>{handleInput(event, "7")}}>7</div>
      <div id="eight" onClick={(event)=>{handleInput(event, "8")}}>8</div>
      <div id="nine" onClick={(event)=>{handleInput(event, "9")}}>9</div>
      <div id="subtract" onClick={(event)=>{handleSign(event, "-")}}>-</div>
      <div id="four" onClick={(event)=>{handleInput(event, "4")}}>4</div>
      <div id="five" onClick={(event)=>{handleInput(event, "5")}}>5</div>
      <div id="six" onClick={(event)=>{handleInput(event, "6")}}>6</div>
      <div id="add" onClick={(event)=>{handleSign(event, "+")}}>+</div>
      <div id="one" onClick={(event)=>{handleInput(event, "1")}}>1</div>
      <div id="two" onClick={(event)=>{handleInput(event, "2")}}>2</div>
      <div id="three" onClick={(event)=>{handleInput(event, "3")}}>3</div>
      <div id="equals" onClick={(event)=>{handleCalc(event, "=")}}>=</div>
      <div id="zero" onClick={(event)=>{handleInput(event, "0")}}>0</div>
      <div id="decimal" onClick={(event)=>{handleInput(event, ".")}}>.</div>      
    </div>
  </div>
  )
}

export default App;
