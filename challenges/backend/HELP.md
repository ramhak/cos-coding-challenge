# How run the application
1. ### Development environment
   on the root of the project run the following command:
   ```console
   foo@bar:~$ cat <<EOF >> .env
   BASE_URL=https://api-core-dev.caronsale.de/api/v1
   USER_EMAIL=[your email]
   PASSWORD=[your password]
   NODE_ENV=development
   EOF
   ```
   then run these commands:
   ```console
   foo@bar:~$ npm install
   foo@bar:~$ npm run start
   ```
2. ### Production environment
   on the root of the project, run these commands
   ```console
   foo@bar:~$ docker build . -t ramhak/cos-challenge-backend
   foo@bar:~$ docker run --rm -it ramhak/cos-challenge-backend
   ```
   you will see a prompt
   ```console
   Enter User Email :
   ```
   after entering your email, the following prompt appears
   ```console
   Enter Password :
   ```
   enter your passoword and after some second, you should see the running auctions and if there are any errors, the app is quitted with exit code -1

 # Run tests
   in the terminal run this command
   ```console
   foo@bar:~$ npm test
   ```
   it runs the tests in the `CarOnSaleClient.spec.ts` file.

# Code structure
* ### Configs
 
   all configs of the project stay in the configs folder.  
 **`AxiosConfig.ts`** makes axios available as an injectable dependency.  
**`InversifyConfig.ts`** defines all other dependencies. The new dependencies will be going to this file.  
**`Types.ts`** the identifier of injectable entities, goes here.  
**`Urls.ts`** the URLs of the  API go here.  

* ### Services
   in this folder, there are the actual program codes.  
**`CarOnSaleApi`** is a [remote proxy](https://en.wikipedia.org/wiki/Proxy_pattern#Remote_proxy) for connecting to the main CarOnSale API and calling its services.  
**`CarOnSaleClient`** is an  [Anti-corruption](https://docs.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer) Layer between our app and the CarOnSale API.  
**`AuctionMonitorApp.ts`** is the place that we call CarOnSaleClient and show the result on the screen.  
**`main.ts`** is the app [Composition Root](https://freecontent.manning.com/dependency-injection-in-net-2nd-edition-understanding-the-composition-root/).

# npm packages
  * [axios](https://www.axios.com/): a promise-based HTTP Client for node.js and the browser  
  * [propmtly](https://www.npmjs.com/package/promptly): Simple command line prompting utility  
  * [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from .env file  
  * [inversify](https://inversify.io/): a lightweight inversion of control (IoC) container for TypeScript and JavaScript apps

# Some Possible improvements:
  * it's better to show the auction name to the user.
The current version of the API only returns the UUID of the auction.
Enumerating the auctions for getting their name is not a good solution and causes the  [N+1 problem](https://restfulapi.net/rest-api-n-1-problem/).
so it is better to add the auction name to the output of `auction/salesman/${userId}/_all/bidding-data`
service.

  * If the specified user has access to the "create and remove an auction" service, it is possible to write an end-to-end test for the "get all auctions" service. 













