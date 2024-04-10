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

function calculateTotalArea(shapes) {
  return shapes.reduce((sum, shape) => {
    return calculateArea(shape) + sum;
  }, 0);
}

const shapes = [new Circle(2), new Square(5)];
console.log(calculateTotalArea(shapes));