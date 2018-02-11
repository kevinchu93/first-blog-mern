FROM node

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 3000 

CMD ["node", "app.js"]
