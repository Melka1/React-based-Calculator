import React from "react"
import './App.css';

function App(){
  const [equals, setEquals] = React.useState(false);
  const [formula, setFormula] = React.useState([""])
  const [negative, setNegative] = React.useState(true)
  const [first, setFirst] = React.useState(true)
  
  function handleInput(e, value){
    let lastElement = formula[formula.length - 1];
    let ind = lastElement[0]=="-"?1:0
    let dec = [...lastElement, value].join("").match(/[.]/g)?
                [...lastElement, value].join("").match(/[.]/g).length:0
    console.log(ind, lastElement, first, dec)
    if(!equals){
      if(dec<2){
        if(lastElement[ind]=="0"&&(/[1-9]/).test(value)&&first){//from here
          lastElement = lastElement.replace("0", value)
          let form = formula
          console.log("before ",form)
          form.pop()
          form.push(lastElement)
          console.log("after ",form, first)
          setFormula([...form])
        } else {
          if(lastElement[ind]=="0"&&value=="0"){

          } else {
            let array = formula
            array[array.length-1] += value 
            setFormula([...array])
            setEquals(false)
            console.log(formula)
          }
        }
        setFirst(false)             //upto here
      }  
    } else {
      setFormula([value])
      setEquals(false)
    }
    setNegative(false)
  }
  
  function handleBack(){
    if(!equals){
      
    } else {
      handleClear()
    }
  }
  
  function handleSign(e, value){
    let numB = [""], numF = [""];
    let newArray=[]
    if([...formula, value].join("").match(/\W+$/g)){
      numB = [...formula, value].join("").match(/\W+$/g)
      if(numB[0].length==3){
        let array = [...formula]
        array = array.slice(0, -2)
        console.log(array)
        newArray = array
        numB=[""]
      }
    }
    if([...formula, value].join("").match(/^\W+/g)){
      numF = [...formula, value].join("").match(/^\W+/g)
    }
    console.log(numF, numB, negative?"negative":"minus")
    if(numB[0].length<=2 && numF[0].length<2){
      if(!equals){
        if(!negative){//override shoud happen here  
          let array = newArray.length==1?[...newArray, value, ""]:[...formula, value, ""]
          setFormula([...array])
          console.log(array, formula)
          setNegative(true)
        } else if(negative && value == "-") {
          console.log("negative")
          handleInput(e, "-") 
        } else {
          let array = [...formula]
          array.pop()
          array.pop()
          array = [...array, value, ""]
          setFormula([...array])
          setNegative(true)
        }
        
        setEquals(false)
      } else {
        let last = formula[formula.length-1]
        setFormula([last, value, ""])
        setNegative(true)
        setEquals(false)
      }
      setFirst(true)
    }
  }
  
  function handleClear(){
    setFirst(true)
    setEquals(false)
    setFormula([""])
    setNegative(true)
    console.log(formula, "equals =", equals, "negative=", negative)
  }
  
  function handleCalc(){
    let form = [...formula]
    if(!equals){
      while(form.length>1&&form.join("").match(/[+]|[-]|[/]|[*]/g)){
        console.log("Calculation Statred ", form)
        if(form.includes("/")){
          while(form.indexOf("/")>0){
            let ind = form.indexOf("/")
            form.splice(ind-1, 3, (form[ind-1]/form[ind+1])+"")
          } 
        } else if(form.includes("*")){
          while(form.indexOf("*")>0){
            let ind = form.indexOf("*")
            form.splice(ind-1, 3, (form[ind-1]*form[ind+1])+"")
          } 
        } else if(form.includes("-")){
          while(form.length>1&&form.indexOf("-")!==-1){
            let ind = form.indexOf("-")
            form.splice(ind-1, 3, (form[ind-1]*1-form[ind+1]*1)+"")
          }
        } else if(form.includes("+")){
          while(form.indexOf("+")>0){
            let ind = form.indexOf("+") 
            form.splice(ind-1, 3, (form[ind-1]*1+form[ind+1]*1)+"")
          } 
        }  
      }
      console.log(form)
      console.log(form.includes(/[+]|[-]|[/]|[*]/g))
      if(form[0].length > 12){
        let num = form[0].indexOf(".")
        form[0] = form[0].slice(0, num+9)
      }
      setEquals(true)
      setFormula([...formula, "=", form[0]])
      setNegative(false)
      setFirst(true)
      console.log(formula)
    }
  }  
  let text="0"
  if(formula[formula.length-1] == "" && formula.length>1){
    text = formula[formula.length-2]
  } else {
    text = formula[formula.length-1]
  }

  return (
  <div id="container">  
    <div id="calc">
      <div id="display">
        <p className="input">{[...formula].join("")}</p>
        <p className="output">{formula[0]?text:"0"}</p>
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
