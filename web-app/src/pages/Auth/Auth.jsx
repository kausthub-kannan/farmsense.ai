import React, { useState,useEffect } from 'react'
import {useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword,onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth'
import "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import {db} from '../../firebase'
import {auth} from '../../firebase'

const Auth = (params) => {


  const navigate = useNavigate();
  const [data, setData] = useState({ 
    email: "",
    password: "",
    name: "",
    state: "",
    city: "",
});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            navigate('/home')
        }
    })
}, [])
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const handleSignIn = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth,data.email, data.password).then(()=>{
        navigate('/home')
    }).catch((error) => {
        alert(error.message)
    })
}

   const addUser = async(e) => {
    try{
      const userdata= await addDoc(collection(db, "user"), {
        name: data.name,
        email: data.email,
        state: data.state,
        city: data.city
       });
        alert("User added to database")
    }catch{
      ((error) => {
        alert(error.message)
    })
  }}


  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

      // await firebase.firestore().collection("users").doc(user.uid).set({
      //   name:data.name,
      //   city:data.city,
      //   state:data.state,
      //   email:data.email,
      // });
      addUser()
      navigate('/')
    } catch (error) {
      console.error(error);
    }


}

  return (
    <div>
      <form onSubmit={handleRegister}>
        {params.title == "SignUp" ? (
          <>
            <div className="flex items-center justify-center min-h-screen bg-gray-300 m-auto w-full">
              <div className="px-8 py-6 mx-4 mt-4 text-left bg-gray-100 rounded-xl shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                <h3 className="text-2xl font-bold text-center text-[#115e59]">Sign Up</h3>
                <div>
                  <div className="mt-4">
                    <div>
                      <label className="block text-lg text-[#0f766e]">
                        Name
                        <label>
                          <input
                            type="text"
                            placeholder="Name"
                            onChange={(e) => handleChange(e)}
                            value={data.name}
                            name="name"
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </label>
                      </label>
                    </div>
                    <div className="mt-4">
                      <label className="block text-lg text-[#0f766e]">
                        Email
                        <label>
                          <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => handleChange(e)}
                            value={data.email}
                            name="email"
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </label>
                      </label>
                    </div>
                    <div className="mt-4">
                      <label className="block text-lg text-[#0f766e]">
                        Password
                        <label>
                          <input
                            onChange={(e) => handleChange(e)}
                            value={data.password}
                            name="password"
                            type="Password"
                            required
                            placeholder="Password"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </label>
                      </label>
                    </div>
                    <div className="mt-4">
                      <label className="block text-lg text-[#0f766e]">
                        State
                        <label>
                          <input
                            onChange={(e) => handleChange(e)}
                            value={data.state}
                            name="state"
                            type="text"
                            required
                            placeholder="State"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </label>
                      </label>
                    </div>
                    <div className="mt-4">
                      <label className="block text-lg text-[#0f766e]">
                        City
                        <label>
                          <input
                            onChange={(e) => handleChange(e)}
                            value={data.city}
                            name="city"
                            type="text"
                            required
                            placeholder="City"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </label>
                      </label>
                    </div>
                    <div className="flex">
                      
                        <button type="submit"
                          // onClick={handleRegister}
                          className="w-full px-6 py-2 mt-4 text-white bg-[#14b8a6] rounded-lg hover:bg-[#0f766e]"
                        >
                          Create Account
                        </button>
                      
                    </div>
                    <div className="mt-6 text-grey-dark">
                      Already have an account?
                      <a
                        className="text-[#14b8a6] hover:underline"
                        href="/"
                      >
                        Log In
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
            <div className="flex items-center justify-center min-h-screen bg-gray-300 m-auto w-full">
            <div className="px-8 py-6 mx-4 mt-4 text-left bg-gray-100 rounded-xl shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
              <h3 className="text-2xl font-bold text-[#115e59] text-center">Log In</h3>
              <div>
                <div className="mt-4">
                  
                  <div className="mt-4">
                    <label className="block text-lg text-[#0f766e]">
                      Email
                      <label>
                        <input
                          type="email"
                          placeholder="Email"
                          onChange={(e) => handleChange(e)}
                          value={data.email}
                          name="email"
                          required
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </label>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block text-lg text-[#0f766e]">
                      Password
                      <label>
                        <input
                          onChange={(e) => handleChange(e)}
                          value={data.password}
                          name="password"
                          type="Password"
                          required
                          placeholder="Password"
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </label>
                    </label>
                    </div>

                  <div className="flex">
                    
                      <button
                        onClick={handleSignIn}
                        className="w-full px-6 py-2 mt-4 text-white bg-[#14b8a6] rounded-lg hover:bg-[#0f766e]"
                      >
                        Log In
                      </button>
                    
                  </div>
                  <div className="mt-6 text-grey-dark">
                    Don't have an account?
                    <a
                      className="text-[#14b8a6] hover:underline"
                      href="/signup"
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Auth;