# Snow Fo Sho - Mission Statement
This is a very, very handy marketplace for connecting snow lovers of all kinds.  


![picture](https://image.ibb.co/nqo2mm/screenshot.png)


# To install
npm install --save snowfosho
# To run, the following must be set up
1.  A database needs to be created.  The database url should be specified in the following environment variables
```process.env.DATABASE_URL=<YOUR DATABSE URL>```
2.  A port to run the application on can also be specified as a global env. variable. Default is 8080
```process.env.DATABASE_PORT=<YOUR APP PORT>```
3.  To support Facebook and Google logins, a secrets file needs to be created in the root directory of the project with global environmental variables in the following format:
```
process.env.GOOGLE_CLIENT_ID = <YOUR GOOGLE CLIENT ID>
process.env.GOOGLE_CLIENT_SECRET = <YOUR GOOGLE CLIENT SECRET>
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
process.env.FB_APP_ID=<YOUR FB APP ID>
process.env.FB_APP_SECRET=<Your FB APP SECRET>
process.env.FB_CALLBACK = '/auth/facebook/callback' 
```

4.  npm start and you're ready to go.  

# Demo can be found on heroku here
https://snow-fo-sho.herokuapp.com

# Our github repo - contributors welcome!
https://github.com/snow-for-sho/grace-shopper-1
