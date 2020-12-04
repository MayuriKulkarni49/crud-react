import './App.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';

// or less ideally
// import { Table } from 'react-bootstrap';
// import Table from 'react-bootstrap-table'

function App() {
  const [movieName,setMovieName]=useState('')
  const [review,setReview]=useState('');
  const [list,setList]=useState([])
  const [oldReview,newReview]=useState([])

  const onSubmit=()=>{
    Axios.post('http://localhost:3001/api/insert',{movieName:movieName,review:review}).then(
      )
     setList([...list,{name:movieName , review:review}])
  }
  const updatDetails=(id,index)=>{
    Axios.put(`http://localhost:3001/api/update/${id}`,{review:oldReview}).then(
      console.log(index,list[index]),
      list[index].review=oldReview,
      setList([...list]),

      // console.log({movieName:movieName,review:review})
    )
  }
 const fetchDetails=()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setList(response.data)

    })
  }

  const deleteMovie=(id,index)=>{
      Axios.delete(`http://localhost:3001/api/delete/${id}`).then(()=>{
        const data=[...list]

        data.splice(index,1)
        setList(data)
      }
        
      )
  }
  useEffect(()=>{
     fetchDetails()
  },[setList])

  return (
    <div className="form">
      <h2>Crud application</h2><br/>
      <span className="mt-4">Enter movie name</span><br/>
      <textarea type="text" className="text mt-1" name="movieName" onChange={(e)=>{
        setMovieName(e.target.value)
      }}></textarea><br/>
      <span className="mt-4">Enter Review</span><br/>
      <textarea type="text"className="text mt-1"name="review" onChange={(e)=>{
        setReview(e.target.value)
      }}></textarea><br/>
      <button className="btn btn-primary" onClick={onSubmit}>Submit</button>

     
      <h2 className="mt-5">Movie results</h2>

        <div className=" ml-5 col-10">
        {list.map((val,index)=>{
        return  <Table className="mt-5 mr-2 ml-4" striped bordered hover>
        {/* <thead>
          <tr>
            <th>#</th>
            <th>Movie Name</th>
            <th>Review</th>
        
          </tr>
        </thead> */}
        
          
        <tbody>
          <tr>
      <td style={{width:'10%'}}>{index + 1}</td>
            <td style={{width:'20%'}}>{val.name}</td>
            <td style={{width:'20%'}}>{val.review}</td>
            <td style={{width:'20%'}}><button className="btn btn-danger" onClick={()=>deleteMovie(val.id,index)}>delete</button></td>
            <td style={{width:'50%'}}><input type="text" placeholder="Update review" onChange={(e)=>{
        newReview(e.target.value)
      }}></input><button className="btn btn-info ml-3" onClick={()=>{updatDetails(val.id,index)}}>update</button></td>

          </tr>
        
          
        </tbody>
        
      </Table>
    })}

      
      </div>
     

    </div>
  );
}

export default App;
