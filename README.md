# Installation

1. Install postgres and Node.js
2. `npm install`
3. `createuser -s mbtawesome`
4. `createdb -U mbtawesome mbtawesome`
5. `npm run migrate`
6. `node db/seed-db.js` to populate the routes and stops tables from the API
