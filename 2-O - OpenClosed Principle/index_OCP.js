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

const shapes = [new Circle(2), new Square(5)];
console.log(calculateTotalArea(shapes));

const shapes2 = [new Circle(2), new Square(5), new Rectangle(4, 3)];
console.log(calculateTotalArea(shapes2)); 