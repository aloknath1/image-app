import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/',methods=['GET'])
def index():
    return "API success"

@app.route('/load-images/',methods=['GET'])
def load_images_from_folder():
    images = []
    path = "images"
    dir_list = os.listdir(path)
    print("Files and directories in '", path, "' :")  
    return jsonify(dir_list)
   

if __name__ == '__main__':
   app.run(debug=True ,port=5000,use_reloader=False)
    