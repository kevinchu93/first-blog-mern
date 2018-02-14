FROM node

WORKDIR /opt/first-blog-mern

COPY . . 

RUN npm install

EXPOSE 3000 

CMD ["node", "app.js"]
