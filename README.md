#Go inside directory
cd simple-react-full-stack

# install dependencies
npm install

# run development server
npm run dev

# build for production
npm run build
 
# about
npm run start

I am using React/Node.js for front-end and Express for the backend. I picked these because they both run using javascript so I felt it would be a smoother transition. I used a very basic boilerplate to help set up react with express and get it running since this is my first time working full-stack. My first approach was seeing whether I could send data from the server to the client and then vice versa. I am storing my data in memory in a file called 'user.json'. I have three api calls, create, getData, and delete. Once I created a form, I submit the data using a POST method that reads my current JSON file and appends the new user Object to the end of it. I am able to display my users by using a GET request to retrieve the contents of the JSON file and display it. After tackling the create User method, I created my delete function which takes the id of the user I'm selecting and sends it to the server wherre I filter the data in my JSON file to retrieve all the users that don't match that id. Since I am using a JSON file to store my data, it can be expensive since I have to read and write to the file so using a database would be my next step in continuing the project. Lastly, I worked on sorting the data by adding a button to the columns of my user table the changes it's state from default, up, and down. It is similar to a boolean but I wanted a default state so it toggles between those three states. Once I access the state I want and the column ID, I sort by using some logic to see which letter or number is bigger/smaller and to return that letter until the full string is sorted. I hosted my site using Heroku. To host it I removed removed my dev and build scripts and only kept the start script.

# References

react-express-boilerplate:
https://github.com/crsandeep/simple-react-full-stack#production-mode

https://stackoverflow.com/questions/51115640/how-to-send-form-data-from-react-to-express

https://stackoverflow.com/questions/45237999/save-html-form-data-in-json-format-in-a-json-file-using-node-and-express-with-j

https://www.youtube.com/watch?v=6iZiqQZBQJY

https://reactjs.org/docs/forms.html

https://stackoverflow.com/questions/40537990/removing-json-object-from-json-file

https://codeburst.io/deploy-your-webpack-apps-to-heroku-in-3-simple-steps-4ae072af93a8

https://www.florin-pop.com/blog/2019/07/sort-table-data-with-react/

https://stackoverflow.com/questions/11686007/font-awesome-input-type-submit
