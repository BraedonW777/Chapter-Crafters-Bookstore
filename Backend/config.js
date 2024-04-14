//config.js

import path from 'path';

export const PORT = 3000;

export const DATABASE =  'bookstore.db'; //point to the existing db. This line needs to have the "Backend/" portion.
//otherwise it will create a new file called bookstore.db rather than pointing to our existing database. 