import { IStorage } from './IStorage.js';

class AppModule {
  constructor(storage) {
    if (!(storage instanceof IStorage)) {
      throw new Error('storage must be an instance of IStorage');
    }
    this.storage = storage;
  }

  saveData(data) {
    this.storage.save(data);
  }
}

export { AppModule };