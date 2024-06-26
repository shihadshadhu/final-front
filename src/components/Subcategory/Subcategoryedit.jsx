import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import Topbar from '../Adminpanel/Topbar'
import Sidebar from '../Adminpanel/Sidebar'
import './Subcategory.css'



const Subcategoryedit = (props) => {
    var[ca,setCa]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:4005/categoryview")
      .then(response=>{
        console.log(response.data)
        setCa(response.data)

      })
      .catch(err=>console.log(err))
    },[])


    var[inputs,setInputs]=useState(props.data)
    const inputHandler=(event)=>
    {

        const { name, value } =event.target
        setInputs((inputs) => ({ ...inputs,[name]: value }))
        console.log(inputs)
    }
    const addHandler=()=>{
        if(props.method==='put'){

            axios.put("http://localhost:4005/edits/"+inputs._id,inputs)
            .then(response=>{
                console.log("post data"+response.data)
                alert("Success")
                window.location.reload(false)
            })
            .catch(err=>console.log(err))
        }
    }
  return (
    <div className='tt'>
      <Topbar/>
      <Sidebar/>
    <h2>Subcategory</h2>
  <TextField label="Subcategory Name" name="Sname" variant="filled" value={inputs.Sname}onChange={inputHandler}/><br /><br />
  
  <FormControl sx={{ m: 1, minWidth: 120 }}>
<InputLabel id="demo-simple-select-label">Category</InputLabel>
<Select
 labelId="demo-simple-select-label"
  name='Category'value={inputs.Category} onChange={inputHandler}>
  {
    ca.map((value,index)=>{
      return(
        <MenuItem key={index}
        value={value.Cname} >{value.Cname}</MenuItem>
      )
    })
  }
</Select>
</FormControl><br/><br/>
  <div className='ss'><Button variant="contained" onClick={addHandler} >Update</Button>
  </div></div>
    
  )
}

export default Subcategoryedit
