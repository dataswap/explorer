FROM node:latest

RUN mkdir -p /home/dataswap/explorer

WORKDIR /home/dataswap/explorer

COPY . /home/dataswap/explorer/

RUN npm install
RUN npm run build

CMD ["npm", "start"]