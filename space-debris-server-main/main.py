import json, os
from flask import Flask
from model import *

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']


@app.route("/")
def model_home():
    data = model_func()
    try:
        serialized_data = json.dumps(data)
        return serialized_data, 200
    except:
        return 500


if __name__ == '__main__':
    app.run(debug=True)
