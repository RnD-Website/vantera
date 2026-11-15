@echo off
title VANTERA dev server
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies, this takes a minute...
  call npm install
)
echo.
echo Starting VANTERA at http://localhost:5173

call npm run dev -- --open
pause
