import json
import os

# Load structured chatbot data
with open("data/structured_chatbot_data.json", "r", encoding="utf-8") as f:
    dataset = json.load(f)

# Load unrecognized inputs
if not os.path.exists("logs/unrecognized_inputs.txt"):
    print("No unrecognized inputs found.")
    exit()

with open("logs/unrecognized_inputs.txt", "r", encoding="utf-8") as f:
    unrecognized_inputs = list(set([line.strip() for line in f if line.strip()]))

print("\nUnrecognized Inputs:")
for i, line in enumerate(unrecognized_inputs):
    print(f"{i+1}. {line}")

choice = input("\nEnter the number of the input you'd like to categorize (or 'q' to quit): ")
if choice.lower() == 'q':
    exit()

try:
    index = int(choice) - 1
    user_input = unrecognized_inputs[index]
except (IndexError, ValueError):
    print("Invalid choice.")
    exit()

intent = input("Enter intent name: ")
response = input("Enter response for this keyword: ")

if intent not in dataset:
    dataset[intent] = {"pairs": []}

if "pairs" not in dataset[intent]:
    dataset[intent]["pairs"] = []

dataset[intent]["pairs"].append({
    "keyword": user_input,
    "response": response
})

# Save the updated dataset
with open("data/structured_chatbot_data.json", "w", encoding="utf-8") as f:
    json.dump(dataset, f, indent=2)

# Remove the handled input from log
unrecognized_inputs.pop(index)
with open("logs/unrecognized_inputs.txt", "w", encoding="utf-8") as f:
    for line in unrecognized_inputs:
        f.write(line + "\n")

print("\n✅ Updated dataset and cleaned log file.")
