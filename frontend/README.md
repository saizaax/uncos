## Frontend — React.js SPA

[![ReactJS](https://img.shields.io/badge/React.js-282C34?logo=react)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![Docker](https://img.shields.io/badge/Docker-%230db7ed.svg?logo=docker&logoColor=white)](https://www.docker.com/)

### Run develop build

* Download [Node.js](https://nodejs.org/en/download/)

* Clone this repository
    ```bash
    git clone https://github.com/xaazias/news-agency-coursework
    ```

* Open terminal and navigate to repository directory
    ```bash
    cd news-agency-coursework/frontend
    ```

* Install the packages required for the project
    ```bash
    npm i
    ```

* Start the project with npm
    ```bash
    npm run start
    ```

* Open in web-browser
    ```bash
    http://localhost:3000/
    ```

<br>

### Build

* Open terminal and navigate to repository directory
    ```bash
    cd news-agency-coursework/frontend
    ```

* Make production build with npm
    ```bash
    npm run build
    ```

<br>

### Run in Docker container

* Download & Install [Docker / Docker Desktop](https://www.docker.com/products/docker-desktop)

* Open terminal and navigate to repository directory
    ```bash
    cd news-agency-coursework/frontend
    ```

* Build Docker image
    ```bash
    docker build -f Dockerfile.dev -t news-agency-frontend .
    ```

* Run Docker container
    ```bash
    docker run -d -p 80:80 --name news-agency-frontend news-agency-frontend
    ```

* Open in web-browser
    ```bash
    http://localhost:80/
    ```
