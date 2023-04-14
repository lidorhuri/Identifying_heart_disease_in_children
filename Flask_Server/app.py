import joblib
import json
import numpy as np
import pandas as pd
from flask import Flask,request
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.neural_network import MLPRegressor

from flask_cors import CORS
app = Flask(__name__)
loaded_model = joblib.load('C:\\Users\\לידור\\Desktop\\WIN\\myneuralmodel.joblib')

CORS(app)

#[8,4,7,1,0,0,0,3,1,0,1,0,0,0,0,1,27,1,1]-1
#[1,5,7,1,0,0,0,3,1,0,1,1,0,0,0,0,23,0,1]-0

@app.route('/')
def server_load():
    return "loaded"


@app.route('/predict', methods=['POST'])
def server_predictscore():
    # parameters to run the model on
    data = request.get_json()
    data = list(map(int, data['sendvalues']))
    x_test = np.array(data).reshape(1, -1)

    res = loaded_model.predict(x_test)
    print(res[0])


    ret = ''

    if res[0] == 0:
        ret = '0'
    else:
        ret = '1'
    return ret


if __name__ == '__main__':
    app.run()
