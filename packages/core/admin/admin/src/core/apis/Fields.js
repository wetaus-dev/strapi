import invariant from 'invariant';

class Fields {
  constructor() {
    this.fields = {};
  }

  add(field) {
    const { type, Component, columnType } = field;

    invariant(Component, 'A Component must be provided');
    invariant(type, 'A type must be provided');

    if (columnType) {
      console.log('add custom field', type, 'as', columnType);
      this.fields[type] = { Component, columnType };
      console.log('the fields', this.fields);
    } else {
      this.fields[type] = Component;
    }
  }
}

export default () => new Fields();
