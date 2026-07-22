import faiss
import numpy as np

feature_list = np.load('embeddings.npy').astype('float32')  # FAISS requires float32
dim = feature_list.shape[1]  # 2048

index = faiss.IndexFlatL2(dim)  # exact euclidean search, matches your NearestNeighbors setup
index.add(feature_list)

print(f"Indexed {index.ntotal} vectors of dimension {dim}")

faiss.write_index(index, 'embeddings.faiss')
print("Saved index to embeddings.faiss")