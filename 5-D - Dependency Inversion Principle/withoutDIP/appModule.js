import { DatabaseModule } from './databaseModule.js';

class AppModule {
  constructor() {
    this.db = new DatabaseModule();
  }

  saveData(data) {
    this.db.save(data);
  }
}

export { AppModule };