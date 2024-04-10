class IStorage {
  save(data) {
    throw new Error('Method save() must be implemented');
  }
}

export { IStorage };