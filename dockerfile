FROM node:latest
WORKDIR /home/node/app/Backend
RUN npm install
EXPOSE 3000
CMD ["npm","start"]
