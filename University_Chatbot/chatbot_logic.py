import json
import spacy
from difflib import get_close_matches

# Loading NLP model
nlp = spacy.load("en_core_web_sm")

# Loading structured data
with open("data/structured_chatbot_data.json", "r", encoding="utf-8") as f:
    chatbot_data = json.load(f)

# Three Maps to store the dataSet to retreive in constant time
intent_map = {}
keyword_map = {}
keyword_to_response = {}
for intent, data in chatbot_data.items():
    for pair in data.get("pairs", []):
        keywords = pair["keyword"]
        if not isinstance(keywords, list):
            keywords = [keywords]
        for keyword in keywords:
            keyword_lower = keyword.lower()
            keyword_map[keyword_lower] = intent
            keyword_to_response[keyword_lower] = pair["response"]
            intent_map.setdefault(intent, []).append(keyword_lower)

default_responses = chatbot_data.get("default", {}).get("responses", ["Sorry, I didn’t get that."])

def get_response(user_input):
    user_input = user_input.strip().lower()
    doc = nlp(user_input)
    tokens = [token.text for token in doc if not token.is_punct and not token.is_space]

    # Very short input filter (not a known greeting)
    if len(user_input) < 2 and user_input not in ["hi", "ok"]:
        return "Could you please provide more details?"

    #Direct keyword match from the input
    if user_input in keyword_to_response:
        return keyword_to_response[user_input]

    #Partial keyword match in here
    for keyword, response in keyword_to_response.items():
        if f" {keyword} " in f" {user_input} ":
            return response

    #Fuzzy keyword match
    match = get_close_matches(user_input, keyword_to_response.keys(), n=1, cutoff=0.8)
    if match:
        return keyword_to_response[match[0]]

    #Intent scoring
    intent_scores = {}
    token_set = set(tokens)
    for intent, keywords in intent_map.items():
        for kw in keywords:
            kw_tokens = set(kw.split())
            match_score = len(kw_tokens & token_set)
            if match_score:
                intent_scores[intent] = intent_scores.get(intent, 0) + match_score

    if intent_scores:
        top_intent = max(intent_scores, key=intent_scores.get)
        max_score = intent_scores[top_intent]
        if max_score == 1 and list(intent_scores.values()).count(max_score) > 1:
            suggestions = ", ".join(sorted(intent_scores.keys()))
            return f"Do you mean: {suggestions}?"
        if chatbot_data[top_intent]["pairs"]:
            return chatbot_data[top_intent]["pairs"][0]["response"]

    #Fallback — Log unrecognized input
    with open("logs/unrecognized_inputs.txt", "a", encoding="utf-8") as f:
        f.write(user_input + "\n")
    return default_responses[0]
