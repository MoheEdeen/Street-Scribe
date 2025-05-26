import os
import boto3
import uuid


def upload_file_to_s3(file):
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=os.getenv("AWS_REGION")
    )
    bucket_name = os.getenv("AWS_S3_BCKET_NAME")
    unique_filename = f"{uuid.uuid4()}{file.filename}"
    s3_client.upload_fileobj(file, bucket_name, unique_filename)

    return f"https://{bucket_name}.s3.{os.getenv('AWS_REGION')}.amazonaws.com/{unique_filename}"
