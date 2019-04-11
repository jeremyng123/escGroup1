from flask import Flask
import pandas as pd
import re, math
from collections import Counter
import numpy as np


WORD = re.compile(r'\w+')

questions = pd.read_csv('stackoverflow_25000.csv', encoding='latin-1')

# questions = questions.ix[0:10000, 1]
# # questions.to_csv("Questions_100000.csv")
print("sucessfully load the data")

app = Flask(__name__)

@app.route('/smart_solution/<question>')
def smart_solution(question):

    search_word = question.split()
    indexes = []
    for t in questions['Title']:
        c = smart_suggestion(search_word, t)
        indexes.append(c)
        arr = np.array(indexes)
    replace = arr.argsort()[-5:][::-1]

    title_string = '|'.join(questions['Title'][replace])
    questions_string = '|'.join(questions['questions'][replace])
    answers_string = '|'.join(questions['answers'][replace])
    toReturn = 'TITLE\n' + title_string + '\n' + 'QUESTIONS\n' + questions_string + '\n' + 'ANSWERS\n' + answers_string
    return toReturn

def smart_suggestion(list1, string2):
    return len(set(list1)&set(string2.split()))


if __name__ == "__main__" : 
    app.run()


