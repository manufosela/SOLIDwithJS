# Principios SOLID con JS

## S - Principio de Responsabilidad Única (Single Responsibility Principle)

Este principio afirma que una clase debe tener solo una razón para cambiar, es decir, que debe tener solo una tarea o responsabilidad. La idea es minimizar la interdependencia y aumentar la cohesión.

## O - Principio de Abierto/Cerrado (Open/Closed Principle)

Según este principio, las entidades de software (clases, módulos, funciones, etc.) deben estar abiertas para la extensión, pero cerradas para la modificación. Esto significa que deberías poder agregar nuevas funcionalidades sin cambiar el código existente.

## L - Principio de Sustitución de Liskov (Liskov Substitution Principle)

Este principio establece que los objetos de una clase derivada deben ser capaces de sustituir a los objetos de la clase base sin afectar la corrección del programa. En esencia, las subclases deben ser sustituibles por sus clases base.

## I - Principio de Segregación de la Interfaz (Interface Segregation Principle)

Este principio sostiene que los clientes no deberían ser forzados a depender de interfaces que no utilizan. En lugar de tener una interfaz "gorda" que hace demasiado, es mejor tener muchas interfaces pequeñas, específicamente dirigidas a cada cliente.

## D - Principio de Inversión de Dependencias (Dependency Inversion Principle)

El principio de inversión de dependencias dice que las dependencias dentro del sistema deben ser en dirección de los detalles a las abstracciones, no al revés. Los módulos de alto nivel no deben depender de módulos de bajo nivel, ambos deben depender de abstracciones.

## Ejemplos de cómo aplicar los principios SOLID en JavaScript

### S: Principio de Responsabilidad Única (Single Responsibility Principle)

```javascript
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
```

En este ejemplo, la clase User se enfoca exclusivamente en la lógica relacionada con el usuario, mientras que ActivityLogger maneja el registro de actividades. Esto hace que el código sea más fácil de mantener y extender, ya que cada clase tiene una única responsabilidad. Si en el futuro necesitamos cambiar la forma en que registramos las actividades, solo necesitamos modificar la clase ActivityLogger, sin tocar la clase User.

### O: Principio de Abierto/Cerrado (Open/Closed Principle)

Este ejemplo no sigue el principio O/C:

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
```

Este diseño no sigue el Principio de Abierto/Cerrado porque si quieres agregar una nueva forma, digamos, un rectángulo, tendrías que modificar la función calculateArea para agregar otro if o else if, lo cual es una modificación del código existente.

Para seguir el OCP, puedes definir una estructura que permita a las formas geométricas calcular su propia área. De esta manera, calculateArea puede operar en una abstracción sin conocer los detalles específicos de cada forma:

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
```

Ahora, si necesitas agregar una nueva forma, simplemente extiendes la clase Shape.

```javascript
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

Lo usaremos así:

```javascript
const shapes = [new Circle(2), new Square(5), new Rectangle(4, 3)];
console.log(calculateTotalArea(shapes)); 
```

Para calcular el área total sin necesidad de modificar calculateTotalArea.

En este ejemplo, cada clase de forma extiende una clase abstracta Shape y proporciona su propia implementación del método area. Esto significa que puedes agregar nuevas formas sin necesidad de modificar el código existente en calculateTotalArea, solo necesitas agregar una nueva clase que extienda Shape. Este diseño sigue el Principio de Abierto/Cerrado porque el código existente está cerrado para modificaciones pero abierto para extensiones.

### L: Principio de sustitución de Liskov

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

// Función que espera un objeto de tipo Animal y llama a su método makeSound.
function triggerAnimalSound(animal) {
  animal.makeSound();
}

const animal = new Animal();
const dog = new Dog();
const cat = new Cat();

// Aquí se aplica el Principio de Sustitución de Liskov.
// Podemos pasar una instancia de Animal, Dog, o Cat a triggerAnimalSound
// sin alterar el comportamiento de la función.
triggerAnimalSound(animal); // Outputs: Some generic sound
triggerAnimalSound(dog); // Outputs: Woof! Woof!
triggerAnimalSound(cat); // Outputs: Meow! Meow!
```

En este ejemplo, Dog y Cat son subclases de Animal. Cada una sobrescribe el método makeSound para producir un sonido específico. La función triggerAnimalSound está diseñada para aceptar cualquier objeto Animal y llamar a su método makeSound. Según el principio de Liskov, podemos pasar instancias de Animal, Dog, o Cat a esta función, esperando que el programa funcione correctamente sin necesidad de modificar triggerAnimalSound para acomodar a las subclases. Esto demuestra que Dog y Cat son sustitutos adecuados para Animal.


### I: Principio de Segregación de la Interfaz (Interface Segregation Principle)

El Principio de Segregación de Interfaces sugiere que ningún cliente debería ser forzado a depender de métodos que no utiliza.
Aunque JavaScript no tiene interfaces en el sentido estricto como otros lenguajes de programación como Java o C#, el concepto puede aplicarse.
Se trata de asegurar que los objetos solo expongan a los clientes los métodos y propiedades que realmente necesitan usar, evitando así la dependencia de aspectos del objeto que no son relevantes para ellos.

Sin aplicar el Principio de Segregación de Interfaces
Imagina que tienes una clase MultifunctionPrinter que implementa varias funcionalidades. No todos los usuarios de una impresora necesitarán todas estas funcionalidades, lo que puede llevar a una violación del ISP.

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

// Un usuario que solo necesita imprimir, aún tiene acceso a scan y fax, lo cual es innecesario.
const printer = new MultifunctionPrinter();
printer.print('Document');
```

Para aplicar el ISP, podemos separar estas responsabilidades en módulos o clases más pequeñas, asegurando que los usuarios sólo necesiten conocer y utilizar las partes del sistema que son relevantes para ellos.

```javascript
// Definimos funcionalidades específicas en sus propias clases
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

// Componemos un objeto que necesita múltiples funcionalidades
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

// Creación de instancias específicas para cada funcionalidad
const printer = new Printer();
const scanner = new Scanner();
const fax = new Fax();

// Combinamos las funcionalidades según sea necesario
const multifunctionMachine = new MultifunctionMachine({printer, scanner, fax});

// Solo imprime, aunque el objeto tenga acceso a las otras funcionalidades
multifunctionMachine.print('Document'); 
```

En esta refactorización, cada clase se centra en una sola responsabilidad, y MultifunctionMachine se compone de estas clases más pequeñas para proporcionar múltiples funcionalidades. Esto permite que cada "cliente" (en este caso, otras partes del código que utilizan estas clases) dependa solo de las interfaces (en el sentido de conjunto de métodos disponibles) que realmente necesita, siguiendo el Principio de Segregación de Interfaces.
Queda claro qué funcionalidades se están pasando al instanciar MultifunctionMachine.
Puedes fácilmente añadir o quitar funcionalidades pasando diferentes objetos al constructor, sin necesidad de cambiar el código de MultifunctionMachine.
Al permitir que las funcionalidades específicas sean opcionales, este diseño sigue el Principio de Segregación de Interfaces, ya que los usuarios de MultifunctionMachine no tienen que depender de interfaces que no utilizan.

### D: Principio de Inversión de Dependencias (Dependency Inversion Principle)

El Principio de Inversión de Dependencias (Dependency Inversion Principle, DIP) establece que:
Los módulos de alto nivel no deben depender de los módulos de bajo nivel. Ambos deben depender de abstracciones.
Las abstracciones no deben depender de los detalles. Los detalles deben depender de las abstracciones.

Este principio apunta a reducir el acoplamiento entre los módulos de software, haciendo que el sistema sea más fácil de refactorizar, escalar y mantener. Aunque JavaScript es un lenguaje dinámico y no tiene un sistema de tipos tan estricto como otros lenguajes, se puede aplicar el DIP a través de patrones de diseño que enfatizan la dependencia en abstracciones en lugar de implementaciones concretas.

Ejemplo sin aplicar el DIP:

Supongamos que tienes un módulo de aplicación (AppModule) que depende directamente de un módulo de bajo nivel (DatabaseModule) para almacenar datos.

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

En este diseño, AppModule depende directamente de DatabaseModule, una implementación concreta para el almacenamiento de datos.

Para aplicar el DIP, definimos una abstracción (interfaz) para el almacenamiento de datos y hacemos que tanto el módulo de alto nivel (AppModule) como el módulo de bajo nivel (DatabaseModule) dependan de esta abstracción.

El mismo ejemplo pero aplicando el DIP:

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

En este diseño refactorizado, tanto AppModule como DatabaseModule dependen de la abstracción IStorage. Esto significa que AppModule no está acoplado a una implementación concreta de almacenamiento de datos. Si deseas cambiar el mecanismo de almacenamiento en el futuro (por ejemplo, a un almacenamiento en la nube), puedes hacerlo implementando la interfaz IStorage sin necesidad de modificar AppModule.