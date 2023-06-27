import React, {useState,useEffect} from 'react'
import './Detection.css'
import ChatBot from "/src/components/ChatBot/ChatBot"
import {auth,db} from '../../firebase'
import { collection, addDoc } from "firebase/firestore"; 
import { plant_model_predict, poultry_model_predict } from '../../data_portal';
import uploadImg from '../../assets/upload.jpg'
import { ThreeDots } from 'react-loader-spinner';


const Detection = (prop) => {
  const [imageUpload, setImageUpload] = useState(null)
  const [base64, setBase64] = useState(null)
  const [visible, setVisible] = useState(false)
  const [form,setForm]=useState({
      name:'',
      prompt:'',
      photo:'',
  })
  const [predictedDisease,setPredictedDisease]=useState("Upload For Detection")

  console.log(imageUpload)
  const handleUpload = (e) => {
    const file=e.target.files[0]
    setImageUpload(file);

    if(file && file.type.substr(0,5)==='image'){
        const reader=new FileReader()
        reader.onloadend=()=>{
            setForm({...form,photo:reader.result})
        }
        reader.readAsDataURL(file)
    }
    else{
        alert('Please upload animage')
    }
    }

  //Most Important Function
  // const user=auth.currentUser
  // const addDisease = async(e) => {
  //   try{
  //     const userdata= await addDoc(collection(db, prop.type.toLowerCase()+"_disease"), {
  //       name:predictedDisease,
  //       time:new Date().toLocaleString(),
  //       user:user.uid
  //      });
  //   }catch{
  //     ((error) => {
  //       alert(error.message)
  //   })
  // }}

  const handlPrediction= async(e)=>{
    e.preventDefault()
    setVisible(true)
    const reader = new FileReader();
    reader.readAsDataURL(imageUpload);
    reader.onloadend = () => setBase64(reader.result);
    let prediction
    if(prop.type=='Plant'){
      prediction = await plant_model_predict(base64)
    }else{
      prediction = await poultry_model_predict(base64)
    }
    console.log(prediction)
    setVisible(false)
    setPredictedDisease(prediction)
     try {
       addDisease()
     } catch (error) {
        console.log(error)
     }
    
  }
  
  return (
    <>
      <div className='main flex lg:flex-row flex-col justify-center mt-10 lg:mt-5'>
       <div className="model flex flex-col lg:w-[500px] p-5 lg:h-[500px] lg:m-3 m-5 ">
         <form className='flex flex-col justify-center bg-gray-100 p-4 rounded-md' onSubmit={handlPrediction}>

          <h1 className="p-2">{prop.type} Disease Detection</h1>

          <div className='lg:text-xl text-1xl flex justify-center items-center md:w-[400px] md:h-[400px] border-solid border-2 rounded-[15px]'>
            {form.photo ? <div className="relative w-[400px] h-[199px] md:w-[500px] md:h-[299px] border-2 lg:w-[400px] lg:h-[400px] border-solid border-4 rounded:-[5px] md:rounded-[15px]">
                  <img src={form.photo} alt="uploaded" className="rounded-lg w-[400px] h-[400px]" /></div> : 
            <img src={uploadImg} alt="uploaded" className="opacity-75 w-[400px] h-[199px] md:w-[500px] md:h-[299px] border-2 lg:w-[400px] lg:h-[400px] border-solid border-4 rounded:-[5px] md:rounded-[15px]" />}
          </div>

          <div className='flex'>
                <label htmlFor="photo" className="cursor-pointer">
                    <div className='mt-3 text-white bg-[#6469ff] hover:text-[#6469ff] hover:bg-blue-200 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Upload</div>
                    <input type="file" accept="image/*" capture='environment' name="photo" id="photo" className="sr-only" onChange={handleUpload} />
                </label>

                <div>
                  <button className='m-3 text-white bg-[#6469ff] hover:text-[#6469ff] hover:bg-blue-200 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' type='submit'>Predict</button>
                </div>

                {(visible?<ThreeDots 
                            height="80" 
                            width="80" 
                            radius="2"
                            color="black" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={visible}
                            />:<h1 className='lg:text-xl text-1xl font-bold  m-3 mt-5'>{predictedDisease}</h1>)}

                
          </div>
          
        </form>
      </div>

       <h1 className="font-bold flex justify-center lg:hidden">
          HelperBot
       </h1>
       <ChatBot msg={predictedDisease}/>
    </div>
    </>
  )
}

export default Detection
