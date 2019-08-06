## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

- Mention two parts of Express that you learned about this week.
*Express lets us write middleware and allows us to implement routing with request handler functions; Also, Express allows for route handler functions that take in request and response objects as parameters*

- Describe Middleware?

*Middleware are functions that have access to the request object, the response object, and a `next()` function in an applications request-response cycle. Middleware can execute code, modify/intercept the request object, and end the request-response cycle. A Middleware function can also call another Middleware function via a call to the `next()` function.* 

- Describe a Resource?
*A resource is any identifiable thing that can be identified with a Uniform Resource Identifier. With a RESTful API, everything can be a resource, and every resource is accesible via unique URI's*

- What can the API return to help clients know if a request was successful?
*The API can return a response with an HTTP status code, e.g. 200 or 201, along with a message in the form of an JS object as well as the response object data to make it clear that the request succeeded.*

- How can we partition our application into sub-applications?
*We can partition our application into sub-applications via the use of routers to make our code easier to read. It's a sort of modularization.*