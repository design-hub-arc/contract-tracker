# Contributing

## What to install?
* git
* docker
* docker-compose
* make
* nodejs
* npm (usually installed with nodejs)
* IDE or Editor of your choice

^ You may need a linux vm to install and run these programs locally


## Setting up your environment
Clone this repository using **gcloud source repos clone**. See the gcloud docs for more details.
You will need to create 2 files
**.gitignore** and **.gcloudignore**

Also you will need to install **gcloud-utils**


### What to add to .gitignore
Add paths to files that you do not want version controlled in the **.gitignore**
Add an entry for **.gitignore** to avoid sharing this file with other team members

Candidates for files that should not be saved:
* temporary save files from your editor
* personal project notes that you dont want to share :(
* build files and directories such as those in **build/** or **node_modules/** 


### What to add to .gcloudignore
Add paths to files that should not be deployed to app engine inside **.gcloudignore** 

Candidates for files that should not be saved:

* temporary save files from your editor
* src/
* .git/
* .gitignore
* .gcloudignore


### How to install gcloud-utils
See the google cloud platform gcloud documentation. 


## How to build?
Run the following command(s)
```bash
make
```


## How to deploy locally?
### Starting
Run the following command(s)
```bash
make
docker-compose up
```

### Stopping
Type <ctrl-c>


## How to deploy to app engine?
Run the following command(s) once **gcloud init** has been run atleast once. See the gcloud docs for more info. 
```bash
make
gcloud app deploy
```
