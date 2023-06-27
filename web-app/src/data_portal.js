import axios from 'axios';

const poultry_model_predict = async (data) => {
    try {
        // "http://ip172-18-0-25-cib40imfml8g00a62nm0-80.direct.labs.play-with-docker.com/"
        const response = await fetch("http://ip172-18-0-28-cib40imfml8g00a62nm0-8080.direct.labs.play-with-docker.com/predictions/poultry_diseases", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        const prediction=await response.json()
        console.log(prediction)
        return prediction.prediction
    } catch (error) {
        console.log(error)
    }
}

const plant_model_predict = async (data) => {
    try {
        const response = await fetch("http://ip172-18-0-25-cib40imfml8g00a62nm0-80.direct.labs.play-with-docker.com/predictions/plant_diseases", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        const prediction=await response.json()
        console.log(prediction)
        return prediction.prediction
    } catch (error) {
        console.log(error)
    }
}

const crop_model_predict = async (data) => {
    try {
        const response = await fetch("http://ip172-18-0-28-cib40imfml8g00a62nm0-8080.direct.labs.play-with-docker.com/predictions/crop_yield", {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        const prediction= await response.json()
        return prediction
    } catch (error) {
        console.log(error)
    }
}

const egg_model_predict = async (data) => {
    try {
        console.log(data)
        const response = await axios({
            method: "POST",
            url: "https://detect.roboflow.com/egg-detection-ud1ys/13",
            params: {
                api_key: "RpcN1ZXEN9Zar0vUNnxK"
            },
            data: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        console.log(response)
        const prediction=response.data
        console.log(prediction)
        return {predictions: prediction.predictions, image: prediction.image}
    } catch (error) {
        console.log(error)
    }
}


export {plant_model_predict,poultry_model_predict, crop_model_predict, egg_model_predict}