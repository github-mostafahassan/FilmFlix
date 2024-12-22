




import React, { useEffect, useState } from 'react'

import SearchCss from "./search.module.css"
import axios from 'axios'
import { move } from 'formik';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css";

export function Search() {


    
    const [query, setQuery] = useState(''); // لحفظ الكلمة المفتاحية التي يبحث عنها المستخدم
    const [keywords, setKeywords] = useState([]); // لحفظ نتائج البحث


   
    useEffect( ()=>{


            let  getNameMoviesSearch = async ()=> {


                try{

                let response = await axios.get( `https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44` , {
                      params: {
                          query : query,
                          language: 'ar' 
                        }
            
                        
                  })

                  setKeywords(response.data.results)

           
                }


                catch(err){
                    console.log(err);
                    
                }
        }

        getNameMoviesSearch()
        console.log(keywords);


        
            Aos.init( {duration : 3000} )
        
        

    } , [query])

        



    return <>
    
    <div  data-aos="flip-up" className="container my-5">
    <div className={SearchCss.searchContainer }>
    <input  value={query} onChange={ (e)=>  setQuery(e.target.value)  } type="text" className={SearchCss.searchInput} placeholder="ابحث عن فيلم..." />
    </div>



    <div className="row">

            {keywords.map( (move , idx)=>{

                console.log("move" , move);
                
                return <div key={idx} className=" col-lg-3 col-md-6 g-4">
               
                <Link to={`/Detailse/${move.id}`}>
                <div data-aos="zoom-in-up" className={SearchCss.innar + "  rounded-4"}>
                    <figure className='position-relative h-100'>
                        <img
                            className='w-100 rounded-5 h-100'
                            src={"https://image.tmdb.org/t/p/original" +  move.poster_path }
                            alt={move.title}
                        />
                        <figcaption className='position-absolute p-3 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center flex-column rounded-4 text-white'>
                            <h3 className='text-danger'>{move.title}</h3>
                            <p>{move.overview.split(" ").slice(0, 15).join(" ") + " ...."}</p>
                        </figcaption>
                        <div className={SearchCss.favorite + " position-absolute"}>


                                    <Link to={`/NowPlaying/${move.id}/${move.name  ? move.name : move.title}`}>
                                        <i class="fa-brands fa-youtube ms-2" style={{"color": "#ff0505"}}></i>
                                    </Link>
                        </div>
                        <div className={SearchCss.rating + " position-absolute"}>
                            <h6 className=' d-flex align-items-center text-white'>{move.vote_average}</h6>
                        </div>

                    </figure>
                </div>
                </Link>
               

            </div>
            } )}

            

            </div>

    </div>






    </>



     }

