FROM node:18.16.1

WORKDIR /app/linkedin_tools_ui

RUN chown -R node:node /app/linkedin_tools_ui

COPY package*.json ./

RUN npm install -f

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]