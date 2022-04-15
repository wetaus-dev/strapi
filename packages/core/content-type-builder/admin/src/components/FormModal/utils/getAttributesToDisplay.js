const getAttributes = (dataTarget = '', targetUid, nestedComponents, fields) => {
  const defaultAttributes = [
    'text',
    'email',
    'richtext',
    'password',
    'number',
    'enumeration',
    'date',
    'media',
    'boolean',
    'json',
    'relation',
  ];

  const customFieldNames = Object.keys(fields);
  const customAttributes = customFieldNames
    .filter(name => !defaultAttributes.includes(name))
    .map(customField => customField);

  const isPickingAttributeForAContentType = dataTarget === 'contentType';
  const isNestedInAnotherComponent = nestedComponents.includes(targetUid);
  const canAddComponentInAnotherComponent =
    !isPickingAttributeForAContentType && !isNestedInAnotherComponent;

  if (isPickingAttributeForAContentType) {
    return {
      default: [
        [...defaultAttributes, 'uid'],
        ['component', 'dynamiczone'],
      ],
      custom: customAttributes,
    };
  }

  if (canAddComponentInAnotherComponent) {
    return {
      default: [[defaultAttributes, ['component']]],
      custom: customAttributes,
    };
  }

  return {
    default: [
      [...defaultAttributes, 'uid'],
      ['component', 'dynamiczone'],
    ],
    custom: customAttributes,
  };
};

export default getAttributes;
