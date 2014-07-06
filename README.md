#*W*here*TOGO*
=====
##About the project
On the 4th of July we were invited to participate trivago hackathon! 
We decided to use at least one new technology that none of us has a knowledge about it which in the end we decided on nodejs.
Coming from the PHP world it was quite challenging to understand how to handle nodejs.
Since we only had a limited time we decided to use some libraries that makes the development faster and easier and at the same time to keep to the code clean
We decided to go with express library which worked out pretty well for us. 
After lots of errors and problem in the end we found the right way to work with nodejs and express.
This project can be used as an example for any API application since every call is in a separate file and completely isolated scope using the amazing Class of @jeresig

##How to install the project
1) Import the file db_data/trv_data_demo.sql into your database

2) Run "npm install" in the project directory

3) Run "node index.js"

4) Open a browser and navigate to localhost:3000/api/top5

5) Enjoy!!!

##What's the most important thing to learn in this project
The way we separated the each API call code is pretty clean and neat.
Basically in app.get method you require the corresponding file which returns you an object(You pass the response to the object so you can send the response from anywhere in the object).
Once you have the object you just call run passing the request and then everything else is a normal object oriented code.
We acknowledge that the code inside of each API is not that clean so we had to struggle with the async problems we had with javascript.
In any case I think you can learn at least 1 or 2 things from this project
