#!/bin/sh

while ! nc -z mysql 3306; do
  echo "Waiting for MySQL to start..."
  sleep 1
done

echo "MySQL is available. Starting the application..."

npm run dev

