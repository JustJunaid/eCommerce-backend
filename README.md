## Overview

E-Commerce back end application for buyer and seller - Advanced Ecommerce.

Steps to setup the project locally

1. Clone the repository - https://github.com/JustJunaid/eCommerce-backend.git and add `required` variables in `.env` file
2. Execute `npm install` in the root of the project folder to install the module dependencies required for the project.
3. Execute `npm run migrate:dev` to setup the postgres database and migrate the required tables into the database using the prisma migration scripts
4. Execute `npm run seed` to populate the data in the respective tables.
5. Execute `npm run start:dev` to run the project in the watch mode i.e. live reload of the changes.
