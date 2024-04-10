import { IStorage } from './IStorage.js';

class DatabaseModule extends IStorage {
  save(data) {
    console.log(`Saving data to the database: ${data}`);
  }
}

export { DatabaseModule };