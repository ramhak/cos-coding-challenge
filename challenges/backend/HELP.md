Run Application
1. in the development environment
   on the root of the project run the following  command
   cat <<EOF >> .env
   BASE_URL=https://api-core-dev.caronsale.de/api/v1
   USER_EMAIL=[your email]
   PASSWORD=[your password]
   NODE_ENV=development
   EOF
   then run   these commands
   npm install
   npm run start
2. in the production environment
   on the root of the project, run these commands
   docker build . -t ramhak/cos-challenge-backend
   docker run --rm -it ramhak/cos-challenge-backend
   then you see a prompt
   Enter User Email :
   after entering your email, this prompt appears
   Enter Password :
   after some second, you should see the running auctions, and if there are any errors, the app is quitted with exit code -1

2. Running tests
   in the terminal run this command
   npm test
   it runs the tests in the CarOnSaleClient.spec.ts file.

About Code structure,
Configs
all configs of the project stay in the configs folder.
AxiosConfig makes axios available as an injectable dependency.
InversifyConfig defines all other dependencies. The new dependencies will be going to this file.
Types.ts, the identifier of injectable entities, goes here.
Urls.ts the URLs of the  API go here.
Services
in this folder, there are the actual program codes.
CarOnSaleApi is a proxy for connecting to the main CarOnSale API and calling its services.
CarOnSaleClient is an  Anti-corruption Layer between our app and the CarOnSale API.
AuctionMonitorApp.ts is the place that we call CarOnSaleClient and show the result on the screen.
main.ts is the app Composition Root.

Used npm packages
axios: a promise-based HTTP Client for node.js and the browser
propmtly: Simple command line prompting utility
dotenv: Loads environment variables from .env file

Some Possible improvements:
it's better to show the auction name to the user.
The current version of the API only returns the UUID of the auction.
Enumerating the auctions for getting their name is not a good solution and causes the  N+1 problem.
so it is better to add the auction name to the output of auction/salesman/${userId}/_all/bidding-data
service.

If the specified user has access to the "create an auction" service, it is possible to write an end-to-end test for the "get all auctions" service. 













