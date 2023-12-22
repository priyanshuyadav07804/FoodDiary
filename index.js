const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const app = express()


const FoodModel = require('./models/Food')

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://priya:1234@blogclustor.9p2emxk.mongodb.net/",{
    useNewUrlParser: true,
}).then(()=>{
    console.log("mongodb connected");
})

//isse bhi static value post kr rhe the
// app.get('/', async (req,res)=>{
//     const food = new FoodModel({foodName:"Apple",daysSinceIAte:3})
//     try{
//         await food.save()
//         res.send("inserted")
//     }catch(err){
//         console.log(err)
//     }
// })
const itemsData = {
    items: [
      {
        "id": 1,
        "img":"https://cdn.pixabay.com/photo/2016/11/23/06/57/isolated-t-shirt-1852114_1280.png",
        "title": "Cotton Shirt",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, odio?",
        "price": 250,
        "amount": 300
      },
      {
        "id": 2,
        "img" : "https://cdn.pixabay.com/photo/2017/01/13/04/56/t-shirt-1976334_1280.png",
        "title": "White Tshirt",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, odio?",
        "price": 550,
        "amount": 600
      },
      {
        "id": 3,
        "img":"https://cdn.pixabay.com/photo/2016/11/23/06/57/isolated-t-shirt-1852113_1280.png",
        "title": "Full Sleeve Tshirt",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, odio?",
        "price": 200,
        "amount": 250
      }
    ]
  };

app.get('/',(req,res)=>{
    res.send("welcome")
})

//Ab "http://localhost:3001/insert" pr object aayega req.body me ,vha se utha lenge
app.post('/insert', async (req,res)=>{
    const foodName = req.body.foodName
    const days = req.body.days
    const food = new FoodModel({foodName: foodName,daysSinceIAte: days})
    try{
        await food.save()
        res.send("inserted")
    }catch(err){
        console.log(err)
    }
})

//update
app.put('/update',async (req,res)=>{
    const id = req.body.id;
    const newFoodName = req.body.newFoodName;
    try{
        const anyRandomObject = await FoodModel.findById(id);
        if(anyRandomObject){
            anyRandomObject.foodName = newFoodName
            await anyRandomObject.save();
            res.send('Food item updated successfully');
            console.log('Food item updated successfully');
        }else{
            res.send("no match found")
            console.log("no match found")
        }
    }catch(err){
        console.log(err)
    }
})

app.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id

    await FoodModel.findByIdAndRemove(id).exec()
    res.send("delete")
    console.log("delete")

})

//read
app.get('/read', async (req, res) => {
    try {
      const result = await FoodModel.find({});
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  });
app.get('/items', async (req, res) => {
    try {
        res.json(itemsData);
    } catch (err) {
      res.send(err);
    }
  });


app.listen(3001,()=>{
    console.log("connected")
})
