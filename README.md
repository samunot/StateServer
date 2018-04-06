# State Server

I have designed a simple node.js server for finding if a point is in any of the US state.

## Steps:

1. Install node.js if not present: 

`bash install-nodejs.sh`

2. Install npm packages: 

`npm install`

3. Run the server: 

`node state-server.js`

4. Run your command: 

`curl -d "longitude=-78.6965971&latitude=35.7671637" http://localhost:8080/`
