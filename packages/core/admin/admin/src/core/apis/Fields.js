import invariant from 'invariant';

class Fields {
  constructor() {
    this.fields = {};
  }

  add(field) {
    const { type, ...rest } = field;

    invariant(rest.Component, 'A Component must be provided');
    invariant(type, 'A type must be provided');

    this.fields[type] = rest
  }
}

export default () => new Fields();
