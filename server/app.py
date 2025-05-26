import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.s3helper import upload_file_to_s3

load_dotenv()


def create_app():
    app = Flask(__name__)
    url = os.getenv("DATABASE_URL")
    connection = psycopg2.connect(url)
    CORS(app)

    @app.route("/api/streetscribe", methods=["GET", "POST"])
    def get_data():
        if request.method == "POST":
            data = request.form
            uploaded_image = request.files["image"]
            uploaded_image_url = upload_file_to_s3(uploaded_image)
            uploaded_description = data["description"]
            uploaded_latitude = data["latitude"]
            uploaded_longitude = data["longitude"]
            uploaded_issue_type = data["issueType"]
            with connection:
                with connection.cursor() as cursor:
                    cursor.execute(os.getenv("INSERT_QUERY"), (uploaded_image_url, uploaded_description,
                                   uploaded_latitude, uploaded_longitude, uploaded_issue_type))
                    inserted_data_id = cursor.fetchone()[0]
            return jsonify({"status": "success", "id": inserted_data_id}), 201
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0")
