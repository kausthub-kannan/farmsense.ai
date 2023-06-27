import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link, useNavigate } from 'react-router-dom'
import farm from '../../assets/farm.jpeg'
import farmgf from '../../assets/farmgf.gif'
import mitt from '../../assets/mitt.jpeg'
import mittgf from '../../assets/mittgf.gif'
import chick from '../../assets/chick.jpg'
import chickgf from '../../assets/chickgf.gif'
import egg from '../../assets/egg.gif'
import invasive from '../../assets/invasive.gif'
import feed from '../../assets/feed.gif'
import {auth} from '../../firebase'

const Home = () => {

  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if(!auth.currentUser){
      navigate('/')
    }

  }, [])

  return (
    <div className='container mx-auto px-5 my-10'>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-8 items-center m-16'>
        <div className='mt-8 md:mt-0 lg:order-2'>
          <img src={farmgf} alt='Farm' className='rounded-3xl shadow-emerald-300 shadow-md border-2 mx-auto  ' />
        </div>
        <div className='text-center  md:text-left lg:order-1'>
          <h1 className='mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-black'>Revolutionize your crop and poultry health management.</h1>
          <p className='text-lg lg:text-xl font-normal text-gray-500 dark:text-gray-400'>Harness the power of technology to protect your crop and poultry from disease.</p>
        </div>
      </div>

      {/* PLANT-DETECTION */}

      {/* <div className="w-1/2 h-1 bg-grey-400 shadow-green"></div> */}

      <div className='flex flex-col justify-center items-center'>
      <hr className="border-0 w-1/2 h-1 bg-white shadow" style={{ boxShadow: "0px 0px 5px #14b8a6" }} />
      <h1 className='mb-10 text-3xl md:text-3xl lg:text-4xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-black m-4 mt-10 '>Plant Disease Detection</h1>
      <hr className="border-0 w-1/2 h-1 bg-white shadow" style={{ boxShadow: "0px 0px 5px #14b8a6" }} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16'>
        <div>
          <img src={mittgf} alt='Plant' className='rounded-3xl shadow-emerald-300 shadow-md border-2 mx-auto' />
        </div>
        <div className='flex flex-col justify-center'>
          <p className='text-lg lg:text-xl font-normal text-gray-500 dark:text-gray-400'>With farmsense.ai , farmers can easily detect diseases in their crops and plants at an early stage, allowing for timely intervention and containment.The system is designed to help farmers and researchers in plant sciences by providing them with accurate and reliable plant identification. With FarmSense.ai, farmers can quickly identify plant diseases, pests, and nutrient deficiencies, which can help them take timely and appropriate measures to improve crop yield and quality. </p>
          <div className='mt-4'>
            <div className='card cursor-pointer'>
              <Link to='/plant'><button className='px-6 py-2 text-white bg-[#14b8a6] hover:bg-[#0f766e] rounded-lg hover:text-white lg:inline-block'>Plant Disease Detection</button></Link>
            </div>
          </div>
        </div>
      </div>

      {/* CHICK-DETECTION */}
      <div className='flex flex-col justify-center items-center mt-20'>
      <hr className="border-0 w-1/2 h-1 bg-white shadow" style={{ boxShadow: "0px 0px 5px #14b8a6" }} />
      <h1 className='mb-10 text-3xl md:text-3xl lg:text-4xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-black m-4 mt-10 '>Chicken Disease Detection</h1>
      <hr className="border-0 w-1/2 h-1 bg-white shadow" style={{ boxShadow: "0px 0px 5px #14b8a6" }} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12'>
        <div>
          <img src={chickgf} alt='Chicken' className='rounded-3xl shadow-emerald-300 shadow-md border-2 mx-auto' />
        </div>
        <div className='flex flex-col justify-center'>
          <p className='text-lg lg:text-xl font-normal text-gray-500 dark:text-gray-400'>Chicken disease detection is a technology that uses computer vision and machine learning to identify and diagnose diseases in poultry. By analyzing images of chickens, the system can detect signs of illness and provide early warning to farmers, helping them to take preventative measures and avoid significant losses in their flocks.</p>
          <div className="card cursor-pointer mt-4">
            <Link to='/chicken'><button className='block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4  px-6 py-2  text-white bg-[#14b8a6]  rounded-lg hover:bg-[#0f766e]'>Poultry Disease Detection</button></Link>
          </div>
        </div>
      </div>

      {/* Eggs Incubation */}

      <div className='flex flex-col justify-center items-center mt-20'>
      <hr className="border-0 w-1/2 h-1 bg-white shadow" style={{ boxShadow: "0px 0px 5px #14b8a6" }} />
      <h1 className='mb-10 text-3xl md:text-3xl lg:text-4xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-black m-4 mt-10 '>Egg Incubation</h1>
      <hr className="border-0 w-1/2 h-1 bg-white shadow" style={{ boxShadow: "0px 0px 5px #14b8a6" }} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12'>
        <div>
          <img src={egg} alt='egg' className='rounded-3xl shadow-emerald-300 shadow-md border-2 mx-auto' />
        </div>
        <div className='flex flex-col justify-center'>
          <p className='text-lg lg:text-xl font-normal text-gray-500 dark:text-gray-400'>Using farmSense.ai enables you to easily determine if an egg is fertilized or not, as well as detect any defects in the egg. Whether you're an experienced farmer or a beginner, you can rely on my egg incubation feature to help you optimize your egg hatching process and increase your chances of successful incubation.</p>
          <div className="card cursor-pointer mt-4">
            <Link to='/egg'><button className='block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4  px-6 py-2  text-white bg-[#14b8a6]  rounded-lg hover:bg-[#0f766e]'>Egg Incubation</button></Link>
          </div>
        </div>
      </div>

      {/*Poultry feed*/}

      <div className='flex flex-col justify-center items-center mt-20'>
      <hr className="border-0 w-1/2 h-1 bg-white shadow" style={{ boxShadow: "0px 0px 5px #14b8a6" }} />
      <h1 className='mb-10 text-3xl md:text-3xl lg:text-4xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-black m-4 mt-10 '>Poultry Feed</h1>
      <hr className="border-0 w-1/2 h-1 bg-white shadow" style={{ boxShadow: "0px 0px 5px #14b8a6" }} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12'>
        <div>
          <img src={feed} alt='feed' className='rounded-3xl shadow-emerald-300 shadow-md border-2 mx-auto' />
        </div>
        <div className='flex flex-col justify-center'>
          <p className='text-lg lg:text-xl font-normal text-gray-500 dark:text-gray-400'>Our poultry feed recommendation app helps farmers determine the most appropriate feed for their chicks, taking into account their breed, age, and nutritional needs. The app provides information on the best type of feed to use for optimal growth and development, as well as tips on how to feed and care for the chicks. By using the app, farmers can ensure that their chicks receive the necessary nutrients to thrive and achieve their full potential. This can result in healthier and more productive birds, which can ultimately lead to increased profits for the farmer. Our poultry feed recommendation app is a valuable tool for any farmer looking to optimize their poultry production and maximize their returns.</p>
          <div className="card cursor-pointer mt-4">
            <Link to='/feed'><button className='block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4  px-6 py-2  text-white bg-[#14b8a6]  rounded-lg hover:bg-[#0f766e]'>Poultry Feed</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
