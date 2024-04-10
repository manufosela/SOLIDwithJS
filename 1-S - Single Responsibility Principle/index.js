class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    // Saving user to the database...
    // Lógica para guardar el usuario en la base de datos
    console.log(`User ${this.name} saved!`);
  }
}

class ActivityLogger {
  logActivity(activity) {
    console.log(`[Activity Log] - ${activity} - ${new Date().toISOString()}`);
  }
}

const user = new User('Juan', 'juan@example.com');
user.save();

const logger = new ActivityLogger();
logger.logActivity('User created');