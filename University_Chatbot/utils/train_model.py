import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import TreebankWordTokenizer
import random
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import SGD

# Ensure NLTK dependencies are available
nltk.download('punkt')
nltk.download('wordnet')

# Load and preprocess data
lemmatizer = WordNetLemmatizer()
tokenizer = TreebankWordTokenizer()
with open("data/structured_chatbot_data.json", "r", encoding="utf-8") as f:
    intents = json.load(f)

words = []
classes = []
documents = []
ignore_letters = ['?', '!', '.', ',']

for intent_key, intent_data in intents.items():
    for pair in intent_data.get("pairs", []):
        patterns = pair["keyword"]
        if not isinstance(patterns, list):
            patterns = [patterns]
        for pattern in patterns:
            word_list = tokenizer.tokenize(pattern)
            words.extend(word_list)
            documents.append((word_list, intent_key))
            if intent_key not in classes:
                classes.append(intent_key)

words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_letters]
words = sorted(set(words))
classes = sorted(set(classes))

pickle.dump(words, open('data/words.pkl', 'wb'))
pickle.dump(classes, open('data/classes.pkl', 'wb'))

training = []
output_empty = [0] * len(classes)

for doc in documents:
    bag = []
    pattern_words = [lemmatizer.lemmatize(word.lower()) for word in doc[0]]
    for w in words:
        bag.append(1) if w in pattern_words else bag.append(0)
    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1
    training.append(bag + output_row)

random.shuffle(training)
training = np.array(training)
train_x = training[:, :len(words)]
train_y = training[:, len(words):]

# Define and train model
model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation='softmax'))

sgd = SGD(learning_rate=0.01, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])
model.fit(train_x, train_y, epochs=200, batch_size=5, verbose=1)
model.save('data/chatbot_model.h5')
print("Model training complete and saved!")
