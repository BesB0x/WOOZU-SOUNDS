# SEI Project 1: WOOZU-SOUNDS

## Overview
For our third project of the General Assembly SEI course, we were given the task of working in groups of three to create a full stack application. On the back end, we had to create a MongoDB database with full CRUD capability, and on the front end we were tasked to make a React app that would consume this database and present it. This would test all the knowledge we’d accrued over the previous 8 weeks. We came up with a website that would be used for a music festival, which includes the stages and food area

## Brief

* Work in a team, using git to code collaboratively
* Build a full-stack application by building your own back-end and front-end
* Use an Express API to serve data from a Mongo database
* Consume the API with a separate front-end using React
* Be a complete product that has CRUD functionality implemented and a few models that have relationships

## Deployment
<a href='https://woozu.herokuapp.com/' > Take a Look !</a>

## Timeframe

Timeframe : One Week and a Half
 
Working Team: A group of 3



## Technologies used:

### Back-end
Express
Mongoose
MongoDB
Dotenv
Bcrypt
JSONWebToken

### Front-end
React
JavaScript
HTML
SCSS
CSS
Bootstrap
Axios
React-router-dom
React-modal-video



## Installation

* Fork code from this GitHub repository
* In root folder, ```run npm install```
* In root folder, ```run npm run seed```
* In root folder, ```run npm run serve```
* In client folder, ```run npm run start```

## Planning

The three of us - me , <a href='https://github.com/spacejey' > Eunyeong Jeong </a>, and <a href='https://github.com/suhholee' > Suhho Lee</a> -  came up with an idea to make a React app which ticket holders to a music festival would use to see what’s on at a festival. They would be able to go to individual pages for all the stages and the food area, say that they are at any given stage, and write comments on the stage pages saying how good the music is or that they’re going to leave that area and go elsewhere, or just post a fun comment! The idea came from us chatting about what we were interested in and eventually chatting a lot about music and the festivals that were happening this year, so it felt like a very natural decision.
 
The crazy part about festivals is that when you’re in one, you’re in another world! We wanted to tap into this, and so decided to structure the website so that it could be a journey into a world of its own, where you buy a ticket and enter into something exciting and different. We also thought we might as well lean into this and make the stages planets!
 
 
For the back-end we decided on the below schemas:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856018/Project%203%20readme/image-1_eabhcu.png)

supported  by the following controllers:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856019/Project%203%20readme/image-6_mrqfmy.png)

We turned to Figma to create a wireframe.

### Title Page

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856018/Project%203%20readme/image-2_zbtjgf.png)

 
This will be the first page the user sees. If you already have a ticket (if you’ve already registered and given an email, username, and password) then you click to login. If you need a ticket, you click on the tickets button and are redirected to a register page.
 
### Map Page

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856018/Project%203%20readme/image-3_r0tj2e.png)
![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856018/Project%203%20readme/image-4_rd0kuj.png)

Once the user’s logged in or registered, they’ll be directed to our interactive map, which will show the three stages, and food and drinks stalls. Each area will have it’s own graphic and can be clicked on. Once clicked on you’ll be directed to their individual page.

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856018/Project%203%20readme/image-5_t5aj0i.png)

For the individual stage pages, there’ll be the line-up, followed by a comments section.
 
Users will be able to add, edit, delete , and like comments.
 
 
### Food and Drink

![]()

The food and drinks pages will be set out in the same way as the stages, except for the MVP we didn’t want to create a schema for the food items.
The comments section was also treated as the same. A stretch goal of ours was to make a schema for the menu, and a schema for a reviews section, where users can write a review and leave a rating on food stalls.

## Build Process

Having planned the visual elements and the back end as comprehensively as we could, we decided to begin building our server side. As if willed by the gods, we had three schemas and three people in our team! So each team member built a schema and the corresponding routes and controllers. There was some cross over between our workload, for example I was coding the secure route (to authenticate the logged in user), and within that there was a line which created a key-value pair within the req which held the details of the logged in user. This was required to complete some parts of the controllers Suhho was building for the comments section, for example. We therefore had to balance our work pace and keep good communication so that we could all work as efficiently as possible, which was a really interesting and satisfying process to go through!
 
For the server-side, I took on the User schema. This meant that I was responsible for the controllers for login, register, and the secure route.
 
### User Schema
The User Schema required three fields username, email, and password, a virtual schema for password confirmation, hooks for the password confirmation and hashing the password, and the creation of a method to validate the password come the secure route.
 
#### Password confirmation hook
 
This used a .pre hook listening for when any document is validated against its schema. It says that if the password field is modified and the password does not equal the value for the password confirmation field, invalidate the password confirmation field and return ‘passwords do not match’. Else move to the next stage:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856019/Project%203%20readme/image-7_qnt2hw.png)

One thing to note is that ‘this._passwordConfirmation’ is not actually the original place for the user’s password confirmation, but it was set to this value to ensure the password confirmation schema does not fall into a loop.
 
#### Hashing the Password
 
I used the bcrypt package for this, setting the salt to 12. I used a .pre hook to listen for when the document is saved, and within that wrote a conditional to check if the password has been modified, so that the user can update their details without the password being unnecessarily re-hashed.

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856019/Project%203%20readme/image-8_y9fdqp.png)

#### Validating The Password
 
This used bcrypt again. I created a new key within the userSchema.methods called ‘validate password’, which is a function taking a plain text password. This value is then compared to the hashed password created by bcrypt using bcrypt.compare.

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856019/Project%203%20readme/image-9_zbhrnq.png)

Finally used I export default to create the model

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856019/Project%203%20readme/image-10_xaweag.png)

 
All in all, creating the schema was a really great exercise. We had learnt how to do it the week before the project started so it was fresh in my head and it was a really great opportunity to work through the logic and steps on my own. I love how so few lines of code are necessary to perform a pretty complex output, it feels as though each line packs a punch!
 
 
I then moved on to the controllers and routes. The first thing I did was create shells of the controllers and the routes in our routers file and used the console log to tell me when the route has been reached:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856019/Project%203%20readme/image-11_yioaxc.png)

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856019/Project%203%20readme/image12_riysaj.png)

### Login
 
I started by destructuring the req.body to access just the email and password of the user. Then, using the .findOne method, I queried the database to check if the email matches any registered users. If it does, I created a created a variable to create a token for the user, using the jsonwebtoken package. I then returned in the res a welcome message and the users unique token:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856020/Project%203%20readme/image13_n0sv3g.png)

### Register
 
The register controller simply required using the .create method to make a new instance of the User model, taking the whole req.body as input:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856020/Project%203%20readme/image14_i50jb0.png)

By the end of day 1 we had completed about 80% of the back end, and we were rightly proud of ourselves! It was done with relatively little difficulty, a big reason being that we figured out the dynamic of team-work and individual work pretty much from the get-go, which is a major win in my opinion.
 
The last thing we did was to merge everything in Git. We’d never done this so it definitely took longer than we would’ve liked, but we remained calm and helped each other through the process. Bring on day 2 !!
 
 
### Secure Route
 
This required manipulation of the user’s token, and then using jwt to validate it. I first accessed the token from the headers of the req, and removed the ‘Bearer ‘ from the start of the header. Then, using jwt.verify, I checked whether the token was valid, setting this to a variable called payload, because if the token is successfully verified this command returns the payload section. I then made a variable to store the logged in user and used .findById(payload.sub) to find that user. Finally, I created a new key-value pair within the req to store the logged in user, to be used in other controllers. Throughout this controller there were a couple of lines for error handling: one at the start checking if the req.header was populated, and one to check if the .findById command found a registered user or not. We created custom errors for instances like these: one to display when something is not found, and one for if the current user is not authorised. We also made a function to be run in every catch we implemented.
 
### Like Button
 
This was the first major challenge that we encountered. The first thing to be decided was how we were going to implement this feature, either with front end code that would first check if the user had already liked a post, show a different graphic according to whether they had or not, and attaching a function to the onClick event of the like button to send a post or a delete request accordingly. The post would add the user’s id to the array that was stored in the likes field, and delete would remove it.  Or, we could implement it in the back-end, by using a put method and checking whether the user’s id was in the likes array, removing it if it was and adding it if it wasn’t. We decided to go for the back-end method. We located the user Id and the likes array with the following code:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856020/Project%203%20readme/image15_pvbsap.png)

Now came the hard bit! How to make a conditional to check the array for the id and remove/add it where necessary. We experimented with mapping at first, but ended up confusing ourselves. We then thought of using the filter method to say if likeToUpdate.filter( id => id === loggedInUser).length === 0 , then add loggedInUser to the array, else remove it. There are two pretty big problems here. One, that id and loggedInUser will always be different because of their references, and two that this was totally unnecessary if you just use the .includes method! It took us a lot of pain and experimentation to realise this, but we eventually did. After that we simply said if the likes array doesn’t include loggedInUser, push it in, else splice likestoUpdate at the index of the loggedInUser for a length of 1, and finally save the stage document (the main document), and return the comment which the like is attached to:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856020/Project%203%20readme/image16_dwiz1l.png)

This was a tough one to get through, another lesson in keeping things as simply as possible and knowing the basics before trying to do more complicated code! I’m glad we worked through it how we did. We were a strong and supportive team, open to everyone’s input, and we remained calm and determined throughout. Absolute credit to Suhho for finally figuring out that we could simply use .includes !
 
Having completed the back-end in the first two days of the project, we were ahead of schedule, which was a great feeling! Turning then to building our React app , we decided to start at the beginning of the user’s journey and go from there. For the weekend we therefore split building the functionality of the login page, register page, and the map and splash between them. I opted for the register page .
 
### Register
I started by creating a simple form from bootstrap. I then made some state called formFields that would hold all the inputted data. Its initial state was therefore an object with key-value pairs for email, username, password, and password confirmation , where the values were set to an empty string.  For the functionality there were two functions; one to handle changes in the input, and one to handle submitting the form. To handle changes , I set the value of each input field to the relevant part of the formFields state and assigned the same handleChange function to the onChange of each input. In that function, which took e as a parameter, whatever value formFields previously was ,was spread into formFields, and then a new key-value pair was spread it where the key was e.target.name (the name of the input) and the value was e.target.value.
 
The handleSubmit function sent a post request to our API , the sent data being formFields, and then using useNavigate(), the function sends the user to the login page.
 
There was also state set for error handling, set to the error in the relevant catch areas, and displayed on the form only if there was a value in the error state.
 
 
### Comments
The first thing needed for the comments section was to access and print any comments that already existed. This was done with a get request to access the individual stage data (isolated by using the individual stage ID which was put into the URL route and found using useParams), and then mapping through the comments key. Within this map I also destructured the comments key so that each field – likes, text, owner, id – could be easily accessed. Later, we re-factored the initial get request using the useCallback function defined in our StageSingle.js file.
In a similar way to the register, the comments section required a form, handleChange, and handleSubmit. The next thing to do was allow for users to edit and delete post that they had made. The functions were naturally very similar to the handSubmit, but used put and delete methods instead.
 
For these last two requests, some authentication was required to ensure that the user was the owner of the comment in question. This required digging into the logged in user’s token and ensuring that the associated id matched the id of the comment owner. In our helpers file we created the below function to check for ownership:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856020/Project%203%20readme/image17_a6monw.png)

Since this returned a Boolean, I could simply make a ternary dependent upon the output of this function to decide whether the user can edit and delete the comment.
 
The final part for base functionality was for an input box to appear when the user clicked edit, and to set the handleSubmit of that form to send a put request to the API. I used some state, initially set to false, to deal with toggling the new input. Every time the user clicks the edit button, this new state is changed to the opposite of its current value, and then when on the handleSubmit function, the state is changed back to false.
At this point, there was a logical error in that if the user was the owner of multiple comments and clicked the edit button on one comment, a new input was created on every comment they owned. We got round this problem by componentizing the comments section, so that there was state set for each individual comments box.
 
Profile page
 
Populating the profile page was the most satisfying part of the functionality of our app. It required pulling together data from almost all places in our database. Initially, I thought of splitting the data up in the back-end so that all that was need in the front-end was to send off an API request, but the data needed was on every level of the data tree, so it made most sense to just get everything in the front-end and split it up from there.
The data I needed was:
1. 	Stage names
2. 	Comments
3. 	User’s username and email
We also added in attendance data towards the end of our project. An example of the stage data tree is below:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856020/Project%203%20readme/image18_l72pq0.png)

Having sent a get request for all the data on the database, split into an array of the three stages, I set this to state and then mapped through the array to get back just the comments data from each stage, as well as sorting the data .  I then combined a map and filter function to isolate the comments where the owner had the same id as the logged in user’s id, where the user’s id was accessed with useParams, and set this to state. The function looks like this:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856021/Project%203%20readme/image19_lhmxaa.png)

I had initially implemented a second API request to get the data on the logged in user, however we later switched this out for a useCallback that we located in the app.js file and passed the data down as a prop.
 
In the return section, I first displayed the username and email of the user. Then for the comments, I displayed the names of each stage, and then below each one mapped through the userComments state to display the right comments made by the user for each given stage. If the user hadn’t commented, then ‘No Comment’ would appear under the stage title:  

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856021/Project%203%20readme/image20_bmwg34.png)

## Challenges

For our biggest issues we all came together to try to solve the problem. I think this worked really well. We were able to work through each difficulty calmly, spreading the load across more people’s shoulders so that it wasn’t overwhelming. That being said, this way of doing this did slow us down as other work had to stop. Our thinking was that since this is as much a learning task as a project, it made more sense to come together.
 
Git
This was the first time we had worked in groups with Git, creating our own branches and merging it with a development branch when the work was complete. We definitely didn’t anticipate how long it would take to get used to this process! There were many times where we’d have to spend the last hour of the day working through merge conflicts and mistakes we’d made in Git. It was a tough learning curve but a good experience nonetheless!
 
### Interceptors

This one took a while! I first noticed whilst testing our database on Insomnia that when you re-seeded the database, you couldn’t login with the user that is brought in with the seed data until you register a separate user. I flagged this up , but we were in the middle of dealing with building the comments section so we decided to deal with it after. Then, whilst testing out our comments section, my teammate Suhho noticed that when we re-seeded our database, the first time you try to put in a new comment it failed. Then , if you logged in as another user and posted a comment, the owner of that comment would be the user previously signed in. This continued until you refreshed the page. This stumped us completely. Because everything was in effect a step behind where it should be, we thought that it would be a problem with state and not using a useEffect somewhere, but this got us nowhere. I then used the console.log to isolate where  in the code the error was coming from and saw that it was being thrown in the back-end on our secure route, so it had to be something to do with how the token was being validated. I double checked internal storage to see if the token was being updated there and sure enough it was! It was such a bizarre problem for us, there were seemingly so many paths we could follow; at separate points we were completely convinced that the error was in the back-end, and then in the front-end! We eventually asked our instructor for help and he explained that it was a problem with our auth file where we had a function using axios.create to put a header on any API request that went through our secure route. The problem was that because of how React works in that we don’t reload the page, this function was only being set once, not continuously updated every time it was used, and so would be using an older token whenever the token is change, but because the expiry date of our token was set to a week away, the older token still worked. This was fine until seeding, when the ids of any owner is removed. What we needed then was a way of the function checking for whether there was a new token it could apply to the header every time the function was called. Enter interceptors, who listen for when the function is called and does just that before the function Is used.
 
 
### Modal Video Problems
 
This was ultimately a scope problem. Eunyeong had found a package called React Modal Video, which controls how the YouTube videos we found for each artist was displayed. In our initial function we mapped through all the artist data and set the video code of each video to state and set that state to the relevant part of the modal-video code. However, what happened was that the function just assigned the last artist’s video of each page to every video. It was therefore a problem with how we were setting the state. We eventually realised that we were just setting the same state each time and therefore every time the map method occurred, it would just replace code with the next datapoint in the list. We therefore needed to componentize our function so that different state was being set for each different code. We created a component called Video to handle this:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856021/Project%203%20readme/image21_abgt2x.png)

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684856021/Project%203%20readme/image22_x7m5zj.png)

## Wins

### UI
 
I think our UI concept was really strong. Modelling on the real-life experience of entering a festival and following the logic of that was both fun and effective. I think the power lay in its simplicity; making the user immediately login or register meant that there is a level of commitment needed from the user to engage and be a part of the website, and then making the home page the festival map instead of the first page the user sees creates a sense of progress, of moving through a barrier and being inside an entity.  
 
I was also in charge of making each stage page unique, which I did by first giving each stage their own description where I made up a sort of mythology for each one, and then using very simple CSS to change the colours of the parts of each page that attract the eye most.
 
Then, the implementation of our profile page ties everything together. Having a page where the user’s interactions with the site is shown in one place was such a good way of materialising their presence within the environment. On the last day we were able to implement the ability for the user to add a profile picture which is then present on the navbar and profile page. This was another great touch!
 
### Auth file
I think our auth file, where all our front-end authentication was handled, is so pretty. Each function is concise and many were made to specifically fit out needs, instead of just being functions we’d been taught and plugged them into our system.
 
### Team-work
This was by far the biggest task we’d done at this point of the course; I am so proud of how we worked as a team to make it manageable and enjoyable. We made really good use of Trello to mark and track what we had done, were doing, and needed to do next. As previously mentioned, we did a lot of error-handling as a team, and I think we worked really well together there. Everyone was listened to and we were all pulling in the same direction.
 


## Key Learnings

### Data digging
As I mentioned in the build process section, digging into the data for the profile section was a really great exercise! It was fascinating to go through the process of deciding how to send the data to the client side, and then using a selection of array methods at different points in the front end.
 
### Git
It took us a bit to get to grips with it but I am now really comfortable with the process of creating branches and merging in git, and I can very easily see the great benefits of this.
 
### useCallback
This project was the first time I came across useCallback functions, and I very quickly saw how useful they can be. Especially when there are separate components that you want to use it, so you can just put the useCallback in the App.js file and pass it down as prop. So slick!
 
### Trello
This is the first project where I’ve used Trello as an organisational tool. I usually write things in my notebook, which I also did, but it was really great to visually break down what we needed to do in a space where all of us could contribute! Trello’s design is also just fab.
 

## Bugs

We have yet to find any bugs.

## Future Improvements

* Adding in a food section with review functionality.


## Final Project

### Landing Page

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684859892/Project%203%20readme/Screenshot_2023-05-23_at_17.31.13_jgtihu.png)

### Map Page

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684859886/Project%203%20readme/Screenshot_2023-05-23_at_17.31.49_f7jy8r.png)

### One of the Stages

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684859894/Project%203%20readme/Screenshot_2023-05-23_at_17.32.00_wrnwyg.png)

### Comments Section

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684859887/Project%203%20readme/Screenshot_2023-05-23_at_17.32.13_zmnanc.png)

### Profile Page

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684859889/Project%203%20readme/Screenshot_2023-05-23_at_17.33.50_asvndm.png)












