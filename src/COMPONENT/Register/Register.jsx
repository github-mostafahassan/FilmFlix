




import React, { useEffect, useRef, useState } from 'react'

import RegisterCss from "./register.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InfinitySpin, RotatingLines } from 'react-loader-spinner';



export function Register() {
                
    


    let refrance = useRef(null)

   let [ isSacces , setIsSacces ]  = useState(false)

   let [ isFeal , setIsFeal ] = useState(false)

   let [ isLoding , setIsLoding ] = useState(false)


   useEffect( ()=>{
    refrance.current.focus()
   }  , [])


   let myNavegeate =  useNavigate()



let myFormik = useFormik( {
    initialValues : {

        name: "",

        email: "",

        phone: "",

        password: "",

        rePassword: "",
    },

    onSubmit : async function (values) {

        setIsLoding(true)


        console.log("values" , values);

        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
        .then( (res)=>{

            console.log("res" , res);
            setIsSacces(true)

            setTimeout( ()=>{
                setIsSacces(false)
                setIsLoding(false)
                myNavegeate("/Login")
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

        let redexName = /^[A-Za-z]{2,18}$/

        let redxPassword = /^[A-Za-z0-9]{6,18}[@#$%^&*]$/

        let redexPhone = /^01[0125][0-9]{8}$/


        if (redexName.test(values.name) !== true) {
            errors.name = "The username must be between 2 and 18 letters and contain only alphabets!"
        }

        if (values.email.includes("@") !== true && values.email.includes(".") !== true ) {
            errors.email = " The email must contain '@' and also include the letter `.` "
        }

        if (redxPassword.test(values.password) !== true) {
            errors.password = "The password must be between 6 and 18 characters long and end with one of the following special characters : @ , # , $ , % , ^ , & , *"
        }

        if (values.password !== values.rePassword) {
            errors.rePassword = "The password must match the re-entered password."
        }

        if (redexPhone.test( values.phone ) !== true) {
            
            errors.phone = "Please make sure to enter your phone number"
        }





        
        

        return errors

        
    }


} )















    return <>
    
          <div className="container my-4 ">


          <h1 className=' py-4 fw-bold text-white'>register</h1>



                    <p className={RegisterCss.directions + ' text-white py-3 alert border'}><span>Password Guidelines</span>

                            <ul >
                                <li>Length: 6 to 18 characters.</li>
                                <li>Use letters (A-Z, a-z) and numbers (0-9).</li>
                                <li>End with one special character: @, #, $, %, ^, &, or *.</li>
                            </ul>
                            
                            Example : password123@ , John456#</p>
                            
                            
                            
                            
                            

                            


             {isSacces ? <div  class="alert d-flex justify-content-center  w-50 m-auto align-items-center bg-info text-white text-center fw-bold">
                Lorem, ipsum dolor sit amet consectetur adipisicing....
             </div> : ""}


             {isFeal ? <div class="alert d-flex justify-content-center  w-50 m-auto align-items-center bg-danger text-white text-center fw-bold">
               {isFeal}
            </div> : ""}




            <div className="row m-auto">
                <form className=' overflow-hidden p-5' onSubmit={myFormik.handleSubmit}>
                    <div className="d-flex flex-wrap justify-content-center col-md-12 ">

                    <div className=" col-lg-5 col-md-12 col-sm-12 ">
                    <div className="innar position-relative m-3 ">
                    <input ref={refrance} onBlur={myFormik.handleBlur} className={RegisterCss.name + " p-1 rounded w-100 " } value={myFormik.values.name} onChange={myFormik.handleChange} type="text" id='name'  />
                    <label className={RegisterCss.label + " px-2"} htmlFor="name">User Name</label>
                    </div>
                    {myFormik.values.name !== false && myFormik.touched.name ? <p className=' text-danger w-75 m-auto '>{myFormik.errors.name}</p> : "" }
                    
                    </div>



                    <div className=" col-lg-5 col-md-12 col-sm-12">
                    <div className="innar position-relative m-3">
                    <input onBlur={myFormik.handleBlur} className={RegisterCss.email + " p-1 rounded w-100 " } value={myFormik.values.email} onChange={myFormik.handleChange} type="email" id='email'  />
                    <label className={RegisterCss.label + " px-2"} htmlFor="email">Email</label>
                    </div>
                    {myFormik.values.email !== false && myFormik.touched.email ? <p className=' text-danger w-75 m-auto '>{myFormik.errors.email}</p> : "" }
                    </div>

                    <div className=" col-lg-5 col-md-12 col-sm-12">
                    <div className="innar position-relative m-3">
                    <input onBlur={myFormik.handleBlur} className={RegisterCss.password + " p-1 rounded w-100  " } value={myFormik.values.password} onChange={myFormik.handleChange} type="password" id='password'  />
                    <label className={RegisterCss.label + " px-2"} htmlFor="password">Password</label>
                    </div>
                    {myFormik.values.password !== false && myFormik.touched.password ? <p className=' text-danger w-75 m-auto '>{myFormik.errors.password}</p> : "" }
                    </div>

                    <div className=" col-lg-5 col-md-12 col-sm-12">
                    <div className="innar position-relative m-3">
                    <input onBlur={myFormik.handleBlur} className={RegisterCss.rePassword + " p-1 rounded w-100  " } value={myFormik.values.rePassword} onChange={myFormik.handleChange} type="password" id='rePassword'  />
                    <label className={RegisterCss.label + " px-2"} htmlFor="rePassword">RePassword</label>
                    </div>
                    {myFormik.values.rePassword !== false && myFormik.touched.rePassword ? <p className=' text-danger w-75 m-auto '>{myFormik.errors.rePassword}</p> : ""  }
                    </div>

                    <div className=" col-lg-10 col-md-12 col-sm-12">
                    <div className="innar position-relative m-3">
                    <input onBlur={myFormik.handleBlur} className={RegisterCss.phone + " p-1 rounded w-100  " } value={myFormik.values.phone} onChange={myFormik.handleChange} type="text" id='phone'  />
                    <label className={RegisterCss.label + " px-2"} htmlFor="phone">phone</label>
                    </div>
                    {myFormik.values.phone !== false && myFormik.touched.phone ? <p className=' text-danger w-75 m-auto '>{myFormik.errors.phone}</p> : ""  }
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
                            /> : "Register"}
                    </button>
                    </div>
                </form>
            </div>
          </div>

    </>
}

export default Register