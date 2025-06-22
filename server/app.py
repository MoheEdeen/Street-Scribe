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

    def register_routes(app, connection):
        @app.route("/api/streetscribe", methods=["GET", "POST"])
        def get_data():
            # print("Received request")
            if request.method == "GET":
                device_id = request.args.get("device_id")
                with connection:
                    with connection.cursor() as cursor:
                        cursor.execute(
                            os.getenv("SELECT_REPORTS_QUERY"), (device_id,))
                        column_names = [desc[0] for desc in cursor.description]
                        rows = [dict(zip(column_names, row))
                                for row in cursor.fetchall()]
                return jsonify({"status": "success", "rows": rows}), 200
            elif request.method == "POST":
                # print("Received POST request")
                data = request.form
                # print(data)
                uploaded_image = request.files["image"]
                uploaded_image_url = upload_file_to_s3(uploaded_image)
                uploaded_description = data["description"]
                uploaded_location = data["location"]
                uploaded_issue_type = data["issueType"]
                # print(f"Image URL: {uploaded_image_url}")
                # print(f"Description: {uploaded_description}")
                # print(f"Location: {uploaded_location}")
                # print(f"Issue Type: {uploaded_issue_type}")
                with connection:
                    with connection.cursor() as cursor:
                        cursor.execute(os.getenv("INSERT_QUERY"), (uploaded_image_url, uploaded_description,
                                                                   uploaded_location, uploaded_issue_type))
                        inserted_data_id = cursor.fetchone()[0]
                return jsonify({"status": "success", "id": inserted_data_id}), 201

        @app.route("/toggle-upvote", methods=["POST"])
        def toggle_upvote():
            if request.method == "POST":
                print("🔥 toggle-upvote hit with JSON:", request.get_json())
                data = request.get_json()
                print("Received data:", data)
                report_id = data["reportId"]
                device_id = data["deviceId"]
                with connection:
                    with connection.cursor() as cursor:
                        cursor.execute(
                            os.getenv("UPVOTE_PRESENT"), (report_id, device_id))
                        is_present = cursor.fetchone()
                        if is_present:
                            cursor.execute(os.getenv("DELETE_UPVOTE"),
                                           (report_id, device_id))
                        else:
                            cursor.execute(os.getenv("ADD_UPVOTE"),
                                           (report_id, device_id))
                        connection.commit()
                        cursor.execute(os.getenv("COUNT_UPVOTES"), (report_id,))
                        upvote_count = cursor.fetchone()[0]
                return jsonify({"status": "success", "upvoteCount": upvote_count}), 201

    register_routes(app, connection)
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0")
