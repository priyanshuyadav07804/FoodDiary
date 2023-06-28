import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
function App() {
  const [foodName, SetFoodName] = useState("");
  const [days, SetDays] = useState(0);
  const [newFoodName, SetNewFoodName] = useState("")
  const [foodList, SetFoodList] = useState([])

  const [value, setValue] = useState('');

  const addToList = async() => {
    if(foodName !== "" && value !== ""){
      await Axios.post("https://f-backend-ten.vercel.app/insert", {
        foodName: foodName,
        days: days,
      })
      window.location.reload()
    }else{
      alert("enter both values")
    }
  }
  const updateFood = async(id) => {
    if(newFoodName !== ""){
      await Axios.put("https://f-backend-ten.vercel.app/update", {
        id: id,
        newFoodName: newFoodName
      })
      window.location.reload()
    }else{
      alert("enter new Food Name")
    }
    
  }

  const deleteFood = async(id) => {
      await Axios.delete(`https://f-backend-ten.vercel.app/delete/${id}`)
      window.location.reload()
  }

  useEffect(() => {
    Axios.get("https://f-backend-ten.vercel.app/read").then((res) => {
      SetFoodList(res.data)
      console.log(res.data)
    })
  }, [])
  //execute on reload of page

  return (
    <div className="App">
      <h1>Crud App With MEN</h1>

      <label>Food Name</label>
      <input
        type="text"
        onChange={(event) => {
          SetFoodName(event.target.value);
        }}
      />
      <label>Days Since You Ate it</label>
      <input type="number" value={value} onChange={(event) => {
        SetDays(event.target.value); 
        setValue(event.target.value);
      }}
       />
      <button onClick={addToList}>Add To List</button>

      <h1 style={{ color: 'blue' }}>Food List</h1>
      {foodList.map((val, key) => {
        return <div className="data" key={key}>

          <h1>Food : {val.foodName}</h1>
          <h1>Days : {val.daysSinceIAte}</h1>

          <div >
            <input type="text" placeholder="New Food Name" style={{ margin: "20px" }}
              onChange={(event) => {
                SetNewFoodName(event.target.value);
              }} />
            <button onClick={() => updateFood(val._id)}>Update</button>
          </div>
          
          <button onClick={()=>deleteFood(val._id)}>Delete</button>
        </div>
      })}

    </div>
  );
}

export default App;
