# ETL: The Joy of Coding
---

## Project Context
In this project we are going to explore the idea of ETL (Extract, Transform, Load), which is the process of taking data from multiple unique sources, modifying them in some way, and then storing them in a centralized database. This is a very common practice when collecting data from systems in order to utilize that data in another system. This data may come in the form of CSV, JSON, XML, API requests with other custom formats, etc - it might even be that you have direct access to several databases with different, but relatable data that you want to be merged into another database in order to gain insight from it in some way.

## Presented Problem
Your local public broadcasting station has an overwhelming amount of requests for information on The Joy of Painting. Their viewers want a website that allows them to filter the 403 episodes based on the following criteria:
* Month of original broadcast 
  * This will be useful for viewers who wish to watch paintings that were done during that same month of the year
* Subject Matter 
  * This will be useful for viewers who wish to watch specific items get painted
* Color Palette 
  * This will be useful for viewers who wish to watch specific colors being used in a painting

Your local broadcasting station has already done some leg work to gather data, however it is spread out across multiple different files and formats, which makes the data unusable in its current form. They’ve also already hired another team to build a front-end to allow their viewers to filter episodes of The Joy of Painting and now they’ve hired you to help them with the process of designing and building a database that will house this collected data in a way that is usable and also build an API to access it.

---

Database diagram can be found in `db/dbDesign.md`

Instructions:
1. Clone Repo.
2. Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) if you dont have them already.
3. Run `docker-compose up -d --build` to start docker images of the app and db.
4. Wait about 20 seconds till you see: 
   * `Container mysqlcontainer    Healthy`
   * `Container nodeappcontainer  Started`
in the terminal, so the containers can fully spin up and connect.
   
Then you're good to go. You can use Postman or your api tester of choice, on port 3000. You can get all episodes with a blank GET at `/episodes//`, and send your queries at `episodes//search/`. You can send you requests in the url, query paramaters or body. 
* Date should be in this format `January 1983`, with the key `date`.
* Colors can be sent as a cs list, like this `Alizarin_Crimson,Black_Gesso` with the key `colors`.
  * If you send more than one, you must include an extra key `colors_andor`, and set it to `or` or `and` to indicate whether you want episodes containing any of the colors, or all of them.
* Subjects can be sent as a cs list, like this `APPLE_FRAME,AURORA_BOREALIS` with the key `subjects`.
  * If you send more than one, you must include an extra key `subjects_andor`, and set it to `or` or `and` to indicate whether you want episodes containing any of the subjects, or all of them.
* If you include both colors and subjects, you must include an extra key `colors_andor_subjects`, and set it to `or` or `and` to indicate whether you want episodes containing either the subjects or colors, or both of them.
* If you GET using url paramaters, they must be in this order `episodes/search/date/colors/colors_andor/subjects/subjects_andor/colors_andor_subjects`