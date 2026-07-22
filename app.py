import tensorflow as tf
from tensorflow.keras.applications.resnet50 import preprocess_input
import numpy as np
import pickle
import faiss
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from PIL import Image
import io

app = FastAPI(title="Fashion Recommendation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

filenames = pickle.load(open('artifacts/filenames.pkl', 'rb'))
model = tf.keras.models.load_model('artifacts/feature_extractor.keras')
index = faiss.read_index('artifacts/embeddings.faiss')

app.mount("/images", StaticFiles(directory="images"), name="images")

# Feature extraction for a query image (same pipeline as training) 
def extract_features_from_bytes(img_bytes: bytes, model) -> np.ndarray:
    # Pillow handles JPEG, PNG, BMP, GIF, WebP, TIFF, ICO, etc.
    img = Image.open(io.BytesIO(img_bytes))
    img = img.convert("RGB")  # handles CMYK, palette, RGBA, grayscale, etc.

    img = img.resize((224, 224))
    img_array = np.array(img).astype(np.float32)

    img_array = preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)

    result = model.predict(img_array, verbose=0).flatten()
    return result / np.linalg.norm(result)

@app.post("/recommend")
async def recommend(file: UploadFile = File(...), k: int = 10):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    img_bytes = await file.read()

    try: 
        normalized_result = extract_features_from_bytes(img_bytes, model)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not process image: {e}")
    
    query_vector = normalized_result.reshape(1, -1).astype('float32')
    distances, indices = index.search(query_vector, k=k)

    results = []
    for idx in indices[0]:
        filename = os.path.basename(filenames[idx])
        results.append({
            "image_url": f"/images/{filename}"
        })

    return {"results": results}