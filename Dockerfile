FROM node:8.11.1

# Create a new user to our new container and avoid the root user
RUN useradd --user-group --create-home --shell /bin/false arya && \
    apt-get clean

ENV HOME=/home/arya

COPY package.json npm-shrinkwrap.json $HOME/app/

COPY src/ $HOME/app/src

RUN chown -R arya:arya $HOME/* /usr/local/

WORKDIR $HOME/app
RUN npm cache clean && \
    npm install --silent --progress=false --production

RUN chown -R arya:arya $HOME/*
USER arya

EXPOSE 3000

CMD ["npm", "start"]