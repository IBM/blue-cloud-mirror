FROM centos

RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y nodejs
RUN yum install -y git

# setup folder structure in centos
# service (node server)
RUN mkdir usr/app
# webapplication
RUN mkdir usr/app/public 
RUN mkdir usr/app/public/lib

# Bundle app source
COPY ./public /usr/app/public
RUN ls
COPY ./server.js /usr/app
COPY ./.cfignore /usr/app
COPY ./highscore_view.json /usr/app
COPY ./sampledata.json /usr/app
COPY ./score_index.json /usr/app
COPY ./manifest.yml /usr/app
COPY ./.env /usr/app

# create group and user
RUN groupadd installer
RUN useradd -ms /bin/bash bower --group installer
# set user rights to allow the bower user to setup custom lib folder
RUN chown -R bower:installer usr
RUN chown -R bower:installer usr/app
RUN chown -R bower:installer usr/app/public
RUN chmod g+rwX usr/app/public
RUN chmod g+rwX usr/app
RUN chmod g+rwX usr

# Install app npm dependencies
WORKDIR /usr/app
COPY ./package.json /usr/app
RUN npm install

# Create app directory
WORKDIR /usr/app
# install bower
RUN npm install --global bower
# Install app bower dependencies
COPY ./bower.json /usr/app
COPY ./.bowerrc /usr/app
USER bower
RUN bower install

# Server listens on
EXPOSE 3000

CMD [ "npm", "start" ]