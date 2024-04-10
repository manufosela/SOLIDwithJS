import { DatabaseModule } from './databaseModule.js';
import { AppModule } from './appModule.js';

const storage = new DatabaseModule();
const myApp = new AppModule(storage);
myApp.saveData('Hello, DIP!');