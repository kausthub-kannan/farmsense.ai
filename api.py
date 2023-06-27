from fastapi import FastAPI, File, UploadFile
import xgboost as xgb
import tensorflow as tf
import tensorflow_hub as hub
from fastapi.middleware.cors import CORSMiddleware
import base64
import numpy as np
from PIL import Image
import io
from pydantic import BaseModel
from starlette.requests import Request

import pandas as pd

poultry_diseases_list = ["Coccidiosis", "Healthy", "New Castle Diseases", "Salmonella"]

__classes = ['apple', 'banana', 'blackgram', 'chickpea', 'coconut', 'coffee',
       'cotton', 'grapes', 'jute', 'kidneybeans', 'lentil', 'maize',
       'mango', 'mothbeans', 'mungbean', 'muskmelon', 'orange', 'papaya',
       'pigeonpeas', 'pomegranate', 'rice', 'watermelon']

def preds(instance) -> np.array:
    data = np.array(instance).reshape(1, -1)
    xgbclf = xgb.XGBClassifier()
    xgbclf.load_model('models/xgbmodel.json')
    y_pred = xgbclf.predict(data)
    return y_pred


def model_predict(encoded_data, model, image_shape=224, channels=3, norm_factor=255.):
    """Base64 to Numpy Decoding"""
    decoded_image = base64.b64decode(encoded_data[23:])
    img = Image.open(io.BytesIO(decoded_image))
    width, height = img.size
    img_array = np.array(img)
    img = np.reshape(img_array, (height, width, 3))

    """Pre-processing for the Model"""
    img = tf.image.resize(img, size=(image_shape, image_shape))
    img = tf.expand_dims(img, axis=0)
    img = img / norm_factor

    '''Diseases Class Prediction'''
    pred = model.predict(img, verbose=0)
    prediction = tf.math.round(pred).numpy()
    prediction = prediction.argmax(axis=1)
    prediction = prediction.item()
    return prediction


app = FastAPI()
hub_model = hub.KerasLayer("https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/feature_vector/5")
tf.keras.utils.register_keras_serializable('KerasLayer')(hub.KerasLayer)

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:5174"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return "API to find plant and poultry diseases using well-built Conventional Neural Network Models"


@app.post("/predictions/plant_diseases")
async def plant_diseases(base64_str: Request):
    try:
        image = await base64_str.json()
        plant_model = tf.keras.models.load_model("models/model.h5")
        return {"prediction": model_predict(image, plant_model)}
    except Exception as e:
        # print(e)
        return {"error": str(e)}


@app.post("/predictions/poultry_diseases")
async def poultry_diseases(base64_str: Request):
    try:
        image = await base64_str.json()
        poultry_model = tf.keras.models.load_model("models/poultry.h5", custom_objects={'KerasLayer': hub.KerasLayer})
        return {"prediction": poultry_diseases_list[model_predict(image, poultry_model)]}
    except Exception as e:
        # print(e)
        return {"error": str(e)}


@app.post("/predictions/invasive_species")
async def invasive_species(base64_str: Request):
    try:
        image = await base64_str.json()
        invasive_model = tf.keras.models.load_model("models/seed.h5")
        return {"prediction": poultry_diseases_list[model_predict(image, invasive_model)]}
    except Exception as e:
        # print(e)
        return {"error": str(e)}


@app.get("/predictions/crop_yield")
async def crop_yield():
    # Replace sample_instance with the fetched row from firebase
    # sample_instance = [104, 18, 30, 23.603016, 60.3, 6.7, 140.91]
    sample_instance = pd.read_parquet('models/predict_data.parquet').sample(1)
    result = preds(sample_instance.values).tolist()[0]
    if result in (2, 3, 9, 10, 11, 13, 14, 18, 20):
        return {'crop': __classes[result]}
    else:
        return {'crop': 'LAND UNFIT TO GROW CROPS FOR POULTRY FEED!'}
