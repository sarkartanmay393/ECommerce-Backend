# Node.js E-commerce API

This project is a RESTful API for e-commerce operations, designed to support product and category listing, cart management, and order processing. Built with Node.js and Express, it utilizes PostgreSQL for data persistence and JWT for user authentication.

## Features

- **User Authentication**: Register and log in users, issuing JWT for subsequent requests.
- **Category & Product Listing**: Browse categories and view products by category.
- **Product Details**: Access detailed information about products.
- **Cart Management**: Users can add products to their cart, update item quantities, and remove items.
- **Order Processing**: Place orders and view past order history and details.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/sarkartanmay393/ECommerce-Backend.git
   ```

2. Install NPM packages:

   ```
   cd ECommerce-Backend
   npm install
   ```

3. Set up your PostgreSQL database and note your credentials.

   ```
   npm run migration-up
   npm run populate-up
   ```

4. Create a `.env` file in the root directory and add your database configuration and JWT secret key:

   ```
   JWT_SECRET=
   ```

5. Run the database migrations (make sure to create your migration files as per your ORM documentation).

6. Start the dev server:
   ```
   npm run dev
   ```

## Usage

Refer to the Swagger documentation for detailed endpoint information. By default, the Swagger UI is accessible at `http://localhost:3000/api-docs`.

<!-- ## Running Tests

To run the automated tests for this system:

```
npm test
``` -->

## Built With

- [Node.js](https://nodejs.org/) - The runtime environment
- [Express](https://expressjs.com/) - The web framework
- [PostgreSQL](https://www.postgresql.org/) - The database
- [Sequelize](https://sequelize.org/) - The ORM used
- [JWT](https://jwt.io/) - Used for user authentication

## Authors

- **Tanmay Sarkar** - _Initial work_ - [sarkartanmay393](https://twitter.com/sarkartanmay393)
