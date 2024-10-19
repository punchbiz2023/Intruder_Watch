from flask import Flask, jsonify, send_from_directory
import pymongo
import os

app = Flask(__name__)

# MongoDB connection details
MONGO_URL = "mongodb://localhost:27017/"
DB_NAME = "intruder_database"
COLLECTION_NAME = "intruders"

@app.route('/intruders', methods=['GET'])
def display_intruder_records():
    client = pymongo.MongoClient(MONGO_URL)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    records = collection.find()

    if collection.count_documents({}) == 0:
        return jsonify([]), 200

    intruder_logs = []
    for record in records:
        intruder_logs.append({
            "track_id": record['track_id'],
            "time": record['time'],
            "frame": record['frame'],
            "image_path": record['image_path']
        })

    return jsonify(intruder_logs), 200

# Serve images from the uploads folder
@app.route('/uploads/<path:filename>', methods=['GET'])
def uploaded_file(filename):
    return send_from_directory(os.path.join(app.root_path, 'uploads'), filename)

if __name__ == "__main__":
    app.run(debug=True, port=8000)
