import React, {useState,useEffect} from 'react'
import './Yield.css'
import ChatBot from "/src/components/ChatBot/ChatBot"
import BarChartComponent from '../../components/Charts/BarChart';
import MultiLineChart from '../../components/Charts/MultiChart';
import { Puff } from 'react-loader-spinner';
import { crop_model_predict } from '../../data_portal';

const FeedMainPart = () => {
  const [imageUpload, setImageUpload] = useState(null)
  const [chart, setChart] = useState(false)
  const [crop, setCrop] = useState("...")
  const [data, setData] = useState()
  const [btn, setBtn] = useState("Soil")
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const call = async () => {
      setLoading(true);
      const response = await crop_model_predict()
      console.log(response)
      setData(response)
      setCrop(response.crop)
      setLoading(false);
    }
    call()
  }, [])

  const chart_change = () => {
    setChart(!chart)
    console.log(chart)

    if(chart)
      setBtn("Soil")
    else
      setBtn("Season")
  }
  
  return (
<>
  {/* <NavBar /> */}
  <div className='main flex lg:flex-row flex-col justify-between mt-10 lg:mt-5'>
    <div className="model bg-gray-200 rounded-md flex flex-col p-5 lg:w-[950px] lg:h-[600px] lg:m-3 m-5">
    <h1 className='lg:text-2xl text-1xl mb-6 font-bold'>Crop Analysis</h1>
    <h3 className='lg:text-xl'><button onClick={() => chart_change()} className='w-20 p-1 float-right text-white bg-red-500 rounded-md'>{btn}</button></h3>
    {loading ? (
        <div className="flex justify-center items-center h-full">
          <Puff
            color="rgba(75,192,192)"
            visible={loading}
            ariaLabel="puff-loading"
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      ) : (
        (chart? <BarChartComponent crop={data}/> : <MultiLineChart data={data}/>)
      )}
      
    </div>
    <h1 className="font-bold flex justify-center lg:hidden">
      HelperBot
    </h1>
    <ChatBot/>
  </div>
</>

  )
}

export default FeedMainPart
