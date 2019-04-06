import zerorpc
import pandas as pd
import re, math
from collections import Counter
import numpy as np
WORD = re.compile(r'\w+')

questions = pd.read_csv('Questions_100000.csv', encoding='latin-1')

questions = questions.ix[0:10000, 1]
# questions.to_csv("Questions_100000.csv")
print("sucessfully load the data")


class HelloRPC(object):
    '''pass the method a name, it replies "Hello name!"'''
    def smart_solution(self, question):

        search_word = question.split()
        indexes = []
        for t in questions:
            c = self.smart_suggestion(search_word, t)
            indexes.append(c)
            arr = np.array(indexes)
            replace = arr.argsort()[-5:][::-1]
        return list(questions[replace])

    def smart_suggestion(self, list1, string2):
        return len(set(list1)&set(string2.split()))

def main():
    s = zerorpc.Server(HelloRPC())
    s.bind("tcp://*:4242")
    s.run()

if __name__ == "__main__" : main()