import pickle
import numpy as np
import pandas
import sklearn
import sys
model = pickle.load(open('artifacts/model.pkl', 'rb'))
book_names = pickle.load(open('artifacts/book_names.pkl', 'rb'))
book_pivot = pickle.load(open('artifacts/book_pivot.pkl', 'rb'))
final_rating = pickle.load(open('artifacts/final_rating.pkl', 'rb'))
book_name = sys.argv[1]

def recommend_books(book_name):
    book_id = np.where(book_pivot.index == book_name )
    distance,suggestion = model.kneighbors(book_pivot.iloc[book_id[0][0],:].values.reshape(1,-1),n_neighbors=7)
    for i in range (len(suggestion)):
        book_names = book_pivot.index[suggestion[i]]
        
        for j in book_names :
            index = np.where(final_rating['title']==j)
            img = final_rating.iloc[index[0][0],5]
            author = final_rating.iloc[index[0][0],2]
            yop = final_rating.iloc[index[0][0],3]

            obj={
                "bookName":j,
                "img":img,
                "author":author,
                "yop":yop
            }
            print(obj)
recommend_books(book_name)