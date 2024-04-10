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
const multifunctionMachine1 = new MultifunctionMachine({ printer, scanner, fax });
const multifunctionMachine2 = new MultifunctionMachine({ printer, scanner });

// It only prints, although the object has access to the other functionalities
multifunctionMachine1.print('Document');

// It prints and scans, although the object has access to the fax functionality
multifunctionMachine2.scan('Document');
// multifunctionMachine2.fax('Document'); // This will throw an error
