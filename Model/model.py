import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

# extract data from dataset
df = pd.read_csv('category_dataset.csv')
X = df['message']
y = df['category']


# vectorize(string --> number) the data so model can understand
vectorizer = TfidfVectorizer(
    stop_words='english', 
    ngram_range=(1,2)
)
X_vec = vectorizer.fit_transform(X)


# train the model
model = LogisticRegression()
model.fit(X_vec, y)

# store model
joblib.dump(model, 'model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')