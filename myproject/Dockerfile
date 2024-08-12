# Step 1: Build stage
FROM python:3.11-slim AS builder


# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir --user -r requirements.txt

# Step 2: Final stage
FROM python:3.11-slim

ENV PATH="/root/.local/bin:$PATH"

# Set work directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=builder /root/.local /root/.local
COPY . /app/

# Expose the port
EXPOSE 8000

# Run database migrations and start the application
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
