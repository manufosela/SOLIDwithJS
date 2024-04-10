# SOLID with JavaScript examples

## S - Single Responsibility Principle

This principle states that a class should have only one reason to change, meaning it should have only one task or responsibility. The idea is to minimize interdependence and increase cohesion.

## O - Open/Closed Principle

According to this principle, software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. This means you should be able to add new functionalities without changing existing code.

## L - Liskov Substitution Principle

This principle establishes that objects of a derived class must be able to substitute objects of the base class without affecting the correctness of the program. Essentially, subclasses should be substitutable for their base classes.

## I - Interface Segregation Principle

This principle maintains that clients should not be forced to depend on interfaces they do not use. Instead of having one "fat" interface that does too much, it's better to have many small interfaces, specifically targeted to each client.

## D - Dependency Inversion Principle

The dependency inversion principle states that dependencies within the system should be in the direction of details to abstractions, not the other way around. High-level modules should not depend on low-level modules; both should depend on abstractions.

## Examples

### S: Single Responsibility Principle

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    // Saving user to the database...
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
```

In this example, the User class focuses exclusively on logic related to the user, while ActivityLogger handles activity logging. This makes the code easier to maintain and extend, as each class has a single responsibility. If in the future we need to change the way we log activities, we only need to modify the ActivityLogger class, without touching the User class.

### O: Open/Closed Principle

First, this example does not follow the O/C principle:

```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
}

class Square {
  constructor(length) {
    this.length = length;
  }
}

function calculateArea(shape) {
  if (shape instanceof Circle) {
    return Math.PI * shape.radius ** 2;
  } else if (shape instanceof Square) {
    return shape.length ** 2;
  }
}

const circle = new Circle(2);
const square = new Square(5);
console.log(calculateArea(circle));
console.log(calculateArea(square));
```

This design does not follow the Open/Closed Principle because if you want to add a new shape, say, a rectangle, you would have to modify the calculateArea function to add another if or else if, which is a modification of the existing code.

To follow the OCP, you can define a structure that allows geometric shapes to calculate their own area. In this way, calculateArea can operate on an abstraction without knowing the specific details of each shape:

```javascript
class Shape {
  area() {
    throw new Error('This method should be implemented by subclasses');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(length) {
    super();
    this.length = length;
  }

  area() {
    return this.length ** 2;
  }
}

// Now, if you need to add a new shape, simply extend the Shape class.
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

function calculateTotalArea(shapes) {
  return shapes.reduce((sum, shape) => sum + shape.area(), 0);
}
```

Use it like this:

```javascript
const shapes = [new Circle(2), new Square(5), new Rectangle(4, 3)];
console.log(calculateTotalArea(shapes)); 
```

To calculate the total area without the need to modify calculateTotalArea.

In this example, each shape class extends an abstract Shape class and provides its own implementation of the area method. This means you can add new shapes without needing to modify the existing code in calculateTotalArea, you just need to add a new class that extends Shape. This design follows the Open/Closed Principle because the existing code is closed to modifications but open to extensions.

### L: Liskov Substitution Principle

```javascript
class Animal {
  makeSound() {
    console.log('Some generic sound');
  }
}

class Dog extends Animal {
  makeSound() {
    console.log('Woof! Woof!');
  }
}

class Cat extends Animal {
  makeSound() {
    console.log('Meow! Meow!');
  }
}

// Function that expects an Animal type object and calls its makeSound method.
function triggerAnimalSound(animal) {
  animal.makeSound();
}

const animal = new Animal();
const dog = new Dog();
const cat = new Cat();

// Here the Liskov Substitution Principle is applied.
// We can pass an instance of Animal, Dog, or Cat to triggerAnimalSound
// without altering the behavior of the function.
triggerAnimalSound(animal); // Outputs: Some generic sound
triggerAnimalSound(dog); // Outputs: Woof! Woof!
triggerAnimalSound(cat); // Outputs: Meow! Meow!
```

In this example, Dog and Cat are subclasses of Animal. Each one overrides the makeSound method to produce a specific sound. The triggerAnimalSound function is designed to accept any Animal object and call its makeSound method. According to the Liskov principle, we can pass instances of Animal, Dog, or Cat to this function, expecting the program to work correctly without needing to modify triggerAnimalSound to accommodate the subclasses. This demonstrates that Dog and Cat are suitable substitutes for Animal.

### I: Interface Segregation Principle

The Interface Segregation Principle suggests that no client should be forced to depend on methods it does not use. Although JavaScript does not have interfaces in the strict sense like other programming languages such as Java or C#, the concept can be applied. It's about ensuring that objects only expose to the clients the methods and properties they really need to use, thus avoiding the dependency on aspects of the object that are not relevant to them.

Not applying the Interface Segregation Principle:
Imagine you have a MultifunctionPrinter class that implements various functionalities. Not all users of a printer will need all these functionalities, which can lead to a violation of the ISP.

```javascript
class MultifunctionPrinter {
  print(document) {
    console.log('Printing document...');
  }

  scan(document) {
    console.log('Scanning document...');
  }

  fax(document) {
    console.log('Sending fax...');
  }
}

// A user who only needs to print still has access to scan and fax, which is unnecessary.
const printer = new MultifunctionPrinter();
printer.print('Document');
```

To apply the ISP, we can separate these responsibilities into smaller modules or classes, ensuring that users only need to know and use the parts of the system that are relevant to them.

```javascript
// We define specific functionalities in their own classes
class Printer {
  print(document) {
    console.log('Printing document...');
  }
}

class Scanner {
  scan(document) {
    console.log('Scanning document...');
  }
}

class Fax {
  fax(document) {
    console.log('Sending fax...');
  }
}

// We compose an object that needs multiple functionalities
class MultifunctionMachine {
  constructor(features) {
    this.printer = features.printer;
    this.scanner = features.scanner;
    this.fax = features.fax;
  }

  print(document) {
    this.printer.print(document);
  }

  scan(document) {
    this.scanner.scan(document);
  }

  fax(document) {
    this.fax.fax(document);
  }
}

// Creating specific instances for each functionality
const printer = new Printer();
const scanner = new Scanner();
const fax = new Fax();

// We combine the functionalities as needed
const multifunctionMachine = new MultifunctionMachine({printer, scanner, fax});

// It only prints, although the object has access to the other functionalities
multifunctionMachine.print('Document');
```

In this refactorization, each class focuses on a single responsibility, and MultifunctionMachine is composed of these smaller classes to provide multiple functionalities. This allows each "client" (in this case, other parts of the code that use these classes) to depend only on the interfaces (in the sense of the set of available methods) they really need, following the Interface Segregation Principle.
It's clear which functionalities are being passed when instantiating MultifunctionMachine.
You can easily add or remove functionalities by passing different objects to the constructor, without the need to change the MultifunctionMachine code.
By allowing specific functionalities to be optional, this design follows the Interface Segregation Principle, as users of MultifunctionMachine do not have to depend on interfaces they do not use.

### D: Dependency Inversion Principle

The Dependency Inversion Principle (DIP) establishes that:
High-level modules should not depend on low-level modules. Both should depend on abstractions.
Abstractions should not depend on details. Details should depend on abstractions.

This principle aims to reduce the coupling between software modules, making the system easier to refactor, scale, and maintain. Although JavaScript is a dynamic language and does not have a strict type system like other languages, DIP can be applied through design patterns that emphasize dependency on abstractions rather than concrete implementations.

Example without applying DIP:

Suppose you have an application module (AppModule) that directly depends on a low-level module (DatabaseModule) for data storage.

```javascript
// databaseModule.js
class DatabaseModule {
  save(data) {
    console.log(`Saving data to the database: ${data}`);
  }
}

// appModule.js
class AppModule {
  constructor() {
    this.db = new DatabaseModule();
  }

  saveData(data) {
    this.db.save(data);
  }
}

const myApp = new AppModule();
myApp.saveData('Hello, world!');
```

In this design, AppModule directly depends on DatabaseModule, a concrete implementation for data storage.

To apply DIP, we define an abstraction (interface) for data storage and make both the high-level module (AppModule) and the low-level module (DatabaseModule) depend on this abstraction.

The same example but applying DIP:

```javascript
// iStorage.js
class IStorage {
  save(data) {
    throw new Error('Method save() must be implemented');
  }
}

// databaseModule.js
class DatabaseModule extends IStorage {
  save(data) {
    console.log(`Saving data to the database: ${data}`);
  }
}

// appModule.js
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

// Usage
const storage = new DatabaseModule();
const myApp = new AppModule(storage);
myApp.saveData('Hello, DIP!');
```

In this refactored design, both AppModule and DatabaseModule depend on the abstraction IStorage. This means that AppModule is not coupled to a concrete data storage implementation. If you want to change the storage mechanism in the future (e.g., to cloud storage), you can do so by implementing the IStorage interface without the need to modify AppModule.