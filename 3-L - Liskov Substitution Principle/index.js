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