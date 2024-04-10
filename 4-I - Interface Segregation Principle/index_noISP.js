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