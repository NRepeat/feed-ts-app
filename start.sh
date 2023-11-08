#!/bin/bash

# Запуск серверной части
cd ./server
npm install
npm start &
cd ..
# Запуск клиентской части
cd ./client/feed-app
npm install
npm run build
npm start 

