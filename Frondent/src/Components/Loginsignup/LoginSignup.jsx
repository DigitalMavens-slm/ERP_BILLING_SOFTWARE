import React, { useState } from 'react'
import Axios from "axios"
import "./LoginSignup.css"

const LoginSignup = () => {

const[state,setState]=useState("Login")  
const[user,setUser]=useState(null)

const datas=(e)=>{
const {name,value}=e.target
setUser((prev)=>({...prev,[name]:value}))
}

const Register= async ()=>{
     await Axios.post("http://localhost:4000/api/signup",user,{
    withCredentials: true 
})
     .then(res=>{console.log(res);
     })
     setState("Login")
}


const signin= async()=>{  
        let responseData;
          await Axios.post("http://localhost:4000/api/login",user,
          {withCredentials: true }).then(res=>responseData=res)

        //  console.log("login"+login.data)
        // console.log(responseData.token);
        
        
    if(responseData.statusText==="OK"){
      localStorage.setItem("auth-token",responseData.token)
      // e.preventDefault()
      window.location.replace("/index")
    }
    else{
     alert(responseData.statusText==="Bad Request")
    }

    
}


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign-Up"?<input type='text' name='name' onChange={datas} placeholder='Your Name'/>:<></>}
          <input type='email' name='email' onChange={datas} placeholder=' Email Address'/>
          <input type='password' name='password' onChange={datas} placeholder='Password'/>
        </div>
        <button onClick={()=>{state==="Login"?signin():Register()}}>Continue</button>
       
        {state==="Sign-Up"? <p className='loginsignup-login'>Already have an account? <span onClick={()=>setState("Login")}>Login here</span></p>:
                <p className='loginsignup-login'>Create an account? <span onClick={()=>setState("Sign-Up")}>Click here</span></p>
             
      }

        <div className="loginsignup-agree">
          {state==="Sign-Up"?
          <><input type="checkbox" name=' ' id=''/><p>By continuing, i agree to the privacy policy</p>
          </>:<></>}
          
        </div>
      </div>
    </div>
  )
}

export default LoginSignup