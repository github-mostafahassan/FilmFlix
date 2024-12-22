import React, { useContext, useEffect, useRef, useState } from 'react'

import LoginCss from "./Login.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InfinitySpin, RotatingLines } from 'react-loader-spinner';
// import { auseContext } from '../TITLE-COMPONENT/TitleComponent';
import { myContext } from '../CONTEXT/AuseContext';



export function Login() {

   let [ isSacces , setIsSacces ]  = useState(false)

   let [ isFeal , setIsFeal ] = useState(false)

   let [ isLoding , setIsLoding ] = useState(false)

   let { myToken , setToken } =  useContext( myContext )


  



   let myNavegeate =  useNavigate()



let myFormik = useFormik( {
    initialValues : {

        email: "",

        password: "",
    },

    onSubmit : async function (values) {

        setIsLoding(true)


        console.log("values" , values);

        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
        .then( (res)=>{

            console.log("res" , res);
            console.log("token" , res.data.token);

             localStorage.setItem("tkn" , res.data.token)


            

            
            setIsSacces(true)

            setTimeout( ()=>{
                setIsSacces(false)
                setIsLoding(false)
                myNavegeate("/Home")
            } , 3000 )
            


        } ).catch( (error)=>{

            console.log("eror" , error);

            setIsFeal(error.response.data.message)

            setTimeout( ()=>{
                setIsFeal(false)
                setIsLoding(false)
            } , 3000)
            
        } )

            console.log(data);

        
        
        
    },



    validate : function (values) {
        let errors = {}


        let redxPassword = /^[A-Za-z0-9]{6,18}[@#$%^&*]$/




        if (values.email.includes("@") !== true && values.email.includes(".") !== true ) {
            errors.email = " The email must contain '@' and also include the letter `.` "
        }

        if (redxPassword.test(values.password) !== true) {
            errors.password = "Password must contain at least one uppercase letter "
        }




        return errors

        
    }


} )















    return <>
    
          <div className="container my-4 ">

 
          <h1 className=' py-4 fw-bold text-white'>Login</h1>


             {isSacces ? <div class="alert d-flex justify-content-center  w-50 m-auto align-items-center bg-info text-white text-center fw-bold">
                Your login was successful! Welcome back!
             </div> : ""}


             {isFeal ? <div class="alert d-flex justify-content-center  w-50 m-auto align-items-center bg-danger text-white text-center fw-bold">
               {isFeal}
            </div> : ""}




            <div className="row m-auto">
                <form className=' overflow-hidden p-5' onSubmit={myFormik.handleSubmit}>
                    <div className="d-flex flex-wrap justify-content-center col-md-12 ">

                   


                    <div className=" col-lg-5 col-md-12 col-sm-12">
                    <div className="innar position-relative m-3">
                    <input  onBlur={myFormik.handleBlur} className={LoginCss.email + " p-1 rounded w-100 " } value={myFormik.values.email} onChange={myFormik.handleChange} type="email" id='email'  />
                    <label className={LoginCss.label + " px-2"} htmlFor="email">Email</label>
                    </div>
                    {myFormik.values.email !== false && myFormik.touched.email ? <p className=' text-danger w-75 m-auto '>{myFormik.errors.email}</p> : "" }
                    </div>

                    <div className=" col-lg-5 col-md-12 col-sm-12">
                    <div className="innar position-relative m-3">
                    <input onBlur={myFormik.handleBlur} className={LoginCss.password + " p-1 rounded w-100  " } value={myFormik.values.password} onChange={myFormik.handleChange} type="password" id='password'  />
                    <label className={LoginCss.label + " px-2"} htmlFor="password">Password</label>
                    </div>
                    {myFormik.values.password !== false && myFormik.touched.password ? <p className=' text-danger w-75 m-auto '>{myFormik.errors.password}</p> : "" }
                    </div>



                    

                    <button type='Submit' className='btn btn-success col-6'>

                    {isLoding ? <RotatingLines
                            visible={true}
                            height="30"
                            width="30"
                            color="Brown"
                            strokeWidth="5"
                            animationDuration="1"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            /> : "Login"}
                    </button>
                    </div>
                </form>
            </div>
          </div>

    </>
}

export default Login
