# Quikpic
___
Project Link:
[View Live Website](https://quikpic.netlify.app/)

## Table of contents
- [Overview](#overview)
- [Project Description](#project-description)
- [Installation](#installation)
- [Built with](#built-with)
- [Screenshots](#screenshots)
- [Challenges and Decisions](#challenges-and-decisions)
- [Continued Development](#continued-development)
- [Resources](#resources)

## Overview
QuikPic is a Full stack Social Media application aimed towards sharing expierences through photographs. QuickPic provides the user with complete control of their posts such as creation, deletion, and editing as well as saving their most favorite pins/posts for later reference.

## Project Description
This app consist of various categories into which each post can be classified under. Depending on which cateogy we are in or search field, the website will render the approriate pins. 

When creating a post a user needs to specify which category the post falls under.
A user can also save posts that will later appear under the user's profile along with pins posted by the user. 

## Installation
- [ ] install react and it's dependencies
- npm install
- [ ] install sanity 
- npm install -g @sanity/cli
- [ ] install tailwindcss
- npm install -D tailwindcss

## Built with
- React.js
- Sanity (Headless CMS)
- Tailwind CSS
- Google OAuth

## Screenshots
### Login Page

<img width="1440" alt="Screen Shot 2023-01-04 at 3 34 20 PM" src="https://user-images.githubusercontent.com/37788922/210646156-a2e51f74-3014-4a89-adfd-6a701ac19eb8.png">

### Landing Page

 <img width="1440" alt="Screen Shot 2023-01-04 at 3 35 39 PM" src="https://user-images.githubusercontent.com/37788922/210646501-125e74fb-36a3-43f0-b1bf-2752f8906cd2.png">


### Categoy Pages

<img width="1440" alt="Screen Shot 2023-01-04 at 3 36 01 PM" src="https://user-images.githubusercontent.com/37788922/210646514-f1953250-7c9b-4668-b25e-270dde76de4b.png">

### User Profile

<img width="1440" alt="Screen Shot 2023-01-04 at 3 36 24 PM" src="https://user-images.githubusercontent.com/37788922/210646543-1c236030-8bb2-440b-84d6-49602c1ca57b.png">

### Create Post

<img width="1440" alt="Screen Shot 2023-01-04 at 3 37 18 PM" src="https://user-images.githubusercontent.com/37788922/210646589-a90dc824-fc51-43fc-bdc4-44a652967ef8.png">

### Pin Details & Comments

<img width="1426" alt="Screen Shot 2023-01-04 at 3 40 51 PM" src="https://user-images.githubusercontent.com/37788922/210646664-82e4b7f7-80a9-4b12-a707-e3a76f7580bb.png">


## Challenges and Decisions
- Experiencing a problem with a delay in the saving feature of the application when using SanityCDN, and the Feed component is rendering pin stats as null even thought the data is still being displayed normally. This may be due to state update not being instantaneous, while the fetch is most likely faster. Whenever the save array state changes, it doesn't trigger a render cycle for the Feed component (which quereies all our pins data from sanity), which sends the pins array as props. Essentially, it seems that the Pin component does not seem to be aware when new data has been fetched, unless I specify to window.location.reload().
 - Considering to implement a mechanism to trigger a re-render of the Feed component when new data is fetched, such as using the "useEffect" hook in a funcitonal component or "componentDidUpdate" in a class component. 
 
- When we access the local storage to get the userInfo/ details we did it in each render. Which can be bad for performace, as it can lead to unnecessary re-renders of the components. Insteaad of accesssing the local storage in each render, I considered using a technique called "lifted state up" to store the user details in a higher-level component and pass them down to the components that need them as props.
- To solve this problem I chose to abstract the retrieveal process into a higher-level component in ./client/data and then passed down as props into a useEffect and saved the userInfo in a state to reduce additional re-renders.


## Continued development
- Fetching the data in a more optimal way using all sanities built-in functionalities
- CORB blocking response
- Checking the code for features and verify that it is functioning as expected. This may involve debugging the code to identify any issues or bottlenecks that could be causing the delay in the application.
- In the createPost component. We are uploading the image directly to Sanity immediately after selecting it but before submitting the form. However, we would need to remove it from Sanity if wew decide to select a different image. Thus, it would be more optimal to defer the upload until we actually save the create/save the pin.

## Resources
- Sanity JSM Subscribers Special - https://www.sanity.io/javascriptmastery
