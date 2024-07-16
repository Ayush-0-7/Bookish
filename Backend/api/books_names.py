import pickle
book_names = pickle.load(open('artifacts/book_names.pkl', 'rb'))
for book in book_names:
    print(book)