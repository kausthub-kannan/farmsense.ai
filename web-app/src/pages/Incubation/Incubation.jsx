import React, { useState, useRef } from 'react';
import './Incubation.css';
import ChatBot from '/src/components/ChatBot/ChatBot';
import { auth, db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import uploadImg from '../../assets/upload.jpg';
import { egg_model_predict } from '../../data_portal';
import { ThreeDots } from 'react-loader-spinner';

const EggMainPart = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [base64, setBase64] = useState("");
  const [visible, setVisible] = useState(false)
  const [pred, setPred] = useState();
  const [predictedDisease, setPredictedDisease] = useState('No Species Detected');
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImageUpload(file);

    if (file && file.type.substr(0, 5) === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, photo: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image');
    }
  };

  const user = auth.currentUser;
  const addDisease = async () => {
    try {
      const userdata = await addDoc(collection(db, 'eggquality'), {
        name: predictedDisease,
        time: new Date().toLocaleString(),
        user: user.uid,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePrediction = async (e) => {
    e.preventDefault();
    setVisible(true)

    const reader = new FileReader();
    reader.onloadend = () => { const base64Result = reader.result;
                                setBase64(base64Result);}
    reader.readAsDataURL(imageUpload);

    console.log(base64)

    egg_model_predict(base64)
    .then((prediction) => {
      const pred = prediction.predictions;
      console.log(prediction.image);
      setPred(pred);
      setVisible(false);
      setPredictedDisease('Founded');
    })
    .catch((error) => {
      console.log(error);
    });  
  };

  return (
    <>
      <div className="main flex lg:flex-row flex-col justify-center mt-10 lg:mt-5">
        <div className="model flex flex-col lg:w-[500px] p-5 lg:h-[500px] lg:m-3 m-5 ">
          <form className="flex flex-col justify center bg-gray-100 p-4 rounded-md" onSubmit={handlePrediction}>
            <h1 className="p-2">Egg Incubation Analysis</h1>
            <div className="lg:text-xl text-1xl flex justify-center items-center md:w-[400px] md:h-[400px] border-solid border-2 rounded-[15px]">
              {form.photo ? (
                <div className="relative w-[400px] h-[199px] md:w-[500px] md:h-[299px] border-2 lg:w-[400px] lg:h-[400px] border-solid border-4 rounded:-[5px] md:rounded-[15px]">
                  <img src={form.photo} alt="uploaded" className="rounded-lg w-[400px] h-[400px]" />
                  {predictedDisease !== 'No Species Detected' && (
                    <div className="absolute top-0 left-0">
                      {pred.map((result, index) => (
                        <div
                          key={index}
                          className="absolute -m-20 border-2 border-green-500 text-green-500 font-bold text-sm"
                          style={{
                            left: `${result.x/1.55+55}px`,
                            top: `${result.y/1.5+30}px`,
                            width: `${result.width/1.55}px`,
                            height: `${result.height/1.60}px`,
                          }}
                        >
                          {result.class}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <img src={uploadImg} alt="uploaded" className="opacity-75 w-[400px] h-[199px] md:w-[500px] md:h-[299px] border-2 lg:w-[400px] lg:h-[400px] border-solid border-4 rounded:-[5px] md:rounded-[15px]" />
              )}
            </div>
            <div className="flex">
              <label htmlFor="photo" className="cursor-pointer">
                <div className="mt-3 text-white bg-[#6469ff] hover:text-[#6469ff] hover:bg-blue-200 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                  Upload
                </div>
                <input type="file" accept="image/*" capture="environment" name="photo" id="photo" className="sr-only" onChange={handleUpload} />
              </label>
              <div>
                <button className="m-3 text-white bg-[#6469ff] hover:text-[#6469ff] hover:bg-blue-200 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center" type="submit">
                  Predict
                </button>
              </div>
              {(visible?<ThreeDots 
                            height="55" 
                            width="60" 
                            radius="2"
                            color="black" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={visible}
                            />:<h1 className="lg:text-xl text-1xl font-bold m-5">Upload For Analysis</h1>)}
            </div>
          </form>
        </div>
        <h1 className="font-bold flex justify-center lg:hidden">HelperBot</h1>
        <ChatBot />
      </div>
    </>
  );
};

export default EggMainPart;

