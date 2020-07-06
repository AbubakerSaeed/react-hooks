import React, { useState, useEffect, useContext, useReducer } from "react";
import "./styles.css";

// context
let Theme = React.createContext({
  theme: "dark"
})

// reducer default states
let reducerDefault = () => ({
  name: '---',
  color: "---"
})

// reducer
function reducerFruit(state, action) {

  switch (action.type) {

    case "Apple":
      return {
        name: "Apple",
        color: "Orange"
      };

    case "Banana":
      return {
        name: "Banana",
        color: "Yellow"
      };

    case "Carrot":
      return {
        name: "Carrot",
        color: "Orange"
      };

    case "Reset":
      return reducerDefault()

    default:
      throw new Error();

  }

}

// effect
function useName(props) {

  let [name, setName] = useState("---")

  useEffect(() => {
    setName("Abubaker");
  }, [name])

  return [name, setName];

}

// app
export default function App() {

  // state
  let [state, setState] = useState(0);
  
  // context
  let {theme: defaultTheme} = useContext(Theme);
  let [theme, setTheme] = useState(defaultTheme);

  // custom hook/effect
  let name = useName();

  // reducer
  let [redState, changeType] = useReducer(reducerFruit, {
    name: "",
    color: ""
  }, reducerDefault);
  
  // return
  return (
    <div className="App" style={
        {
          color: theme === "dark" ? "hsl(0, 0%, 94%)" : "hsl(0, 0%, 10%)", 
          background: theme === "dark" ? "hsl(0, 0%, 10%)" : "hsl(0, 0%, 100%)"
        }
    }>
      <small>Context:</small>
      <br />
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Change Theme</button>
      
      <hr />

      <small>State:</small>
      <h1>{state}</h1>
      <button onClick={() => setState(state+1)}>+1</button>

      <hr />
      
      <small>Effect:</small>
      <br />
      <p>Hello {name[0]}!</p>
      <input type="text" onChange={e => name[1](e.target.value)} /> 

      <hr/>

      <small>Reducer:</small>
   
      <h1>Fruit: {redState.name}</h1>
      <p>Color: {redState.color}</p>

      <button onClick={() => changeType({type: "Apple"})}>Apple</button>
      <button onClick={() => changeType({type: "Banana"})}>Banana</button>
      <button onClick={() => changeType({type: "Carrot"})}>Carrot</button>
      <button onClick={() => changeType({type: "Reset"})}>Reset</button>  

    </div>
  );

}