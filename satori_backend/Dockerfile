# Use a Python 3.9 image as the base
FROM python:3.10-slim-buster
ENV PYTHON_VERSION=3.10.12

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the application runs on
EXPOSE 8000

# Command to run the application
CMD ["python", "main.py"]