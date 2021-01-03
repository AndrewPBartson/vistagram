# Vista-gram

## Status of Project

January 3, 2021

URL - https://nameless-basin-33885.herokuapp.com

Git repo - https://github.com/cloudobserver/vistagram

Development mode (localhost)

- Server and backend APIs work fine
- Photos can be uploaded to Mongo
- UI is mostly working but not everything. There are bugs

Production mode (Heroku)

- App is broken
- According to Heroku, app was built successfully
- Only the simple components work properly - Landing, Login, Register
- Components that send requests to the backend don't work

Example response for GET request -

GET https://nameless-basin-33885.herokuapp.com/api/posts 404 (Not Found)

Example response for POST request -

POST https://nameless-basin-33885.herokuapp.com/api/users/login 503 (Service Unavailable)
