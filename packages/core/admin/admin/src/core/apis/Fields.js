import invariant from 'invariant';

class Fields {
  constructor() {
    this.fields = {};
  }

  add(field) {
    const { type, ...rest } = field;

    invariant(rest.Component, 'A Component must be provided');
    invariant(type, 'A type must be provided');

    const fieldType = rest.pluginId ? `plugin::${rest.pluginId}.${type}` : type;
    this.fields[fieldType] = { type: fieldType, ...rest };
  }
}

export default () => new Fields();
