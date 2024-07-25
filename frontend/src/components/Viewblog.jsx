import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Viewblog = () => {
  const [data,setData] =useState([])
  
  useEffect(() =>{
    const fetchData = async () =>{

      const response = await axios.get('http://localhost:3040/viewbg')
      .then((response) => {
        console.log("Starting data fetch...");
          console.log("Response received:", response);
          console.log("Response data:", response.data);
          setData(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      }
      fetchData()
    },[])
    const truncate=(str,n)=>{
      return (str.length>n)?str.substr(0,n-1)+'...':str;
    }
  return (
    <div style={{backgroundColor:'#f1f2e1'}}>
      <Typography style={{textAlign:'center',fontSize: '32px',
          color: '#00796b',
          padding: '20px',fontFamily:'"Helvetica Neue", Arial, sans-serif',fontWeight:'bold'}} variant='h2'>Popular Posts</Typography>
      <Grid style={{marginLeft:'2%'}}container spacing={2}>
        {data.map((val,i)=>{
          return(
            <Grid item xs={12} md={4}>  
      <Link to={`/blogs/${val._id}`} style={{textDecoration:'none'}} state={{ val: val }}>
      <Card sx={{ maxWidth: 350 }} key={i}>
      <CardMedia
        sx={{ height: 150 }}
        component="img"
        image={val.Image}
        title="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" >
         {val.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
          {truncate(val.content,50)}
        </Typography>
      </CardContent>
      <CardActions>
       
        
      </CardActions>
    </Card>
    </Link>
    </Grid>
    )
  })}
    </Grid>
    </div>
  )
}

export default Viewblog
