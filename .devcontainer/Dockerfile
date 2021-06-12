FROM node:16-alpine3.13

# install git
RUN apk update
RUN apk add git

#RUN npm install -g prettier

# install nodemon for hot reloading
RUN npm install -g nodemon

# install ngrok for public url tunneling
RUN npm install ngrok -g

# run nodemon for hot reloading with code changes
CMD ["nodemon", "."]

# expose port 3000 to tunnelling from a public url
CMD ["ngrok", "http", "3000"]
