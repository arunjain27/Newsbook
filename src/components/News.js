import React, { useState } from 'react'
import { useEffect } from 'react'
import Item from './Item'
import PropTypes from 'prop-types'
import "./app.css"
const News=(props)=>{
 
   const[articles,setarticles]=useState([]);
   const[loading,setloading]=useState(true);
   const[page,setpage]=useState(1);

   const[totalresults,settotalresults]=useState(0);


const updatenews = async ()=>
{
     
    props.setprogress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d5891c5b3a5b4a4d87afc7a0d00465fd&page=${page}&pageSize=${props.pageSize}`
    
    props.setprogress(30);
    setloading(true);
    let data = await fetch(url);
    props.setprogress(50);
    let parsedata= await data.json();
    props.setprogress(70);
    setarticles(parsedata.articles);
   
    settotalresults(parsedata.totalresults);
    setloading(false);
    props.setprogress(100);
    

}

useEffect(()=>{
  updatenews();

},[])

 
const handleprevclick = async ()=>{
// console.log("prev");
setpage(page-1);
updatenews();
 
}
const handlenextclick = async ()=>{
    // console.log("next");

        setpage(page+1)
       updatenews();
      }
  
 
        return (
            <>
  <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' ,color:"#1f456e" }}>{props.category}</h1>
            


           {loading &&  <div>
            
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq3sWjCt0zs5sZ554c2_14J3przOA-llIp_Q&usqp=CAU" alt="" srcset="" />
            </div>}

                    <div className="container">
                 

                   <div className="row">
                       {
                        articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Item title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                 
                   <div className='btn'>
    

                     <button  className='buttonprev' disabled={page<=1} type="button"onClick={handleprevclick} >prev</button>
                     <button   className='buttonprev' disabled={page+1>Math.ceil(totalresults/20)} onClick={handlenextclick}>next</button>

                   </div>

                 
                    </div> 
                         

            </>
        )
    
}



News.defaultProps = {  
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News  
