FROM node

WORKDIR /opt/first-blog-mern

COPY . /opt/first-blog-mern 

RUN npm install

EXPOSE 3000 

CMD ["node", "app.js"]
