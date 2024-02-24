echo "Starting client & server in watch mode"
cd client
npm install
npm run start &
cd ..
cd server
npm install
npm run watch 
