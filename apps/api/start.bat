@echo off
cd /d %~dp0
set DATABASE_URL=postgresql://postgres:postgres@localhost:5432/toorvest
set JWT_SECRET=toorvest-super-secret-jwt-key-2024
set CORS_ORIGIN=http://localhost:3000
node dist\src\main.js
