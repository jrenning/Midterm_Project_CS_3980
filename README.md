# Project

This project is a simple recommendation list application that contains data about the name and type. It also optionally contains a description and link.

This project contains two main sections those being the frontend and the backend.

## Backend 

The backend for this project is an api built using the FastAPI framework. It supports the following operations at the givens paths 

GET /recs 
- get all recommendations 

DELETE /recs
- delete all recommendations from the list

POST /recs
- add recommendation item to the list

GET /recs/{id}
- get the recommendation with id = {id}

DELETE /recs/{id}
- delete the recommendation item with id = {id}

PUT /recs/{id}
- update the recommendation item with id = {id}


## Frontend 

The frontend of this project is a React app. It calls the endpoints provided by the backend server to perform actions and display the current recommendations.

### Example of Frontend

![This is an example of the frontend](/images/frontend_example.png)



## Running the Application

There's a simple shell script called start.sh which just starts both the Python backend and node frontend. 

*Note that this assumes that your env is already active or uvicorn is installed in your local environment. Additionly, this does not show output for the backend on the shell so don't use it for debugging*

### Sources

#### Favicon

https://www.iconfinder.com/icons3189551food_recommendation_list_store_supermarket_icon
