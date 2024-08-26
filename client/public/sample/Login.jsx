import React, { useState } from 'react'

const Login = () => {
  
 const [form,setForm] = useState('')
  return (
    <>
     <form action="">
      <label htmlFor="username">enter the username</label>
      <input type="text" name='username'   placeholder='Enter the Username' onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <label htmlFor="password">Enter the password</label>
      <input type="text" name='password' placeholder='Enter the password' onChange={(e)=>setForm({...form,password:e.target.value})} />
     </form>
     <h1>{form.name}

     </h1>
     <h1>{form.password}</h1>
    </>
  )
}

export default Login
