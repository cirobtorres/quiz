FROM node:latest

WORKDIR /usr/app

COPY . .

RUN npm install --quiet --no-optional --loglevel=error

EXPOSE 3000

CMD ["npm", "run", "dev"]
