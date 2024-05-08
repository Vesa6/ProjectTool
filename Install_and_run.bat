@echo off

echo Installing dependencies in the root folder...
call npm install
echo Installation complete for root folder.
echo.
echo --------------------------------------------
echo.
cd client
echo Installing dependencies in the client folder...
call npm install
echo Installation complete for client folder.
echo.
echo --------------------------------------------
echo.
cd ../server
echo Installing dependencies in the server folder...
call npm install
echo Installation complete for server folder.
echo.
echo --------------------------------------------
echo.
echo All dependencies have been installed.
echo.
echo.

echo "Starting client & server in development mode, please wait..."
cd ../client
START npm run start 
cd ..
cd server
START npm run watch 

pause
