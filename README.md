# Fashion Recommendation System

## 📌 Dataset (44,000+ fashion outfit images)

https://www.kaggle.com/datasets/paramaggarwal/fashion-product-images-dataset


## 🚀 How It Works

- Extract **2048-dimensional feature embeddings** for all dataset images using a pretrained **ResNet50** model, processing images in batches of **128** for efficient preprocessing.
- Generate a feature embedding for the user-uploaded image using the same **ResNet50** model.
- Perform fast similarity search using **FAISS** on normalized embeddings to recommend the most visually similar outfits from the dataset.

## 🛠️ Recommendation Pipeline
                         Fashion Product Dataset
                                  │
                                  ▼
                    Image Preprocessing (224 × 224)
                                  │
                                  ▼
             Pretrained ResNet50 Feature Extractor
                                  │
                                  ▼
                  2048-Dimensional Feature Embeddings
                                  │
                                  ▼
                 Normalize Feature Vectors 
                                  │
                                  ▼
                      Build FAISS Index 

──────────────────────────────────────────────────────────────────

                     User Uploads an Image
                                  │
                                  ▼
                    Image Preprocessing (224 × 224)
                                  │
                                  ▼
             Pretrained ResNet50 Feature Extractor
                                  │
                                  ▼
                  2048-Dimensional Feature Embedding
                                  │
                                  ▼
                 Normalize Feature Vector
                                  │
                                  ▼
                 FAISS Similarity Search
                                  │
                                  ▼
                 Recommendation of most Similar Fashion Items
