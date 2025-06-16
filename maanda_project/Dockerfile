# Use official Python image as base
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /code

# Install dependencies
COPY requirements.txt /code/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project files into the container
COPY . /code/

# Expose Django port
EXPOSE 8000

# Start the Django dev server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
