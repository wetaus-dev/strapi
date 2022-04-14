const getAttributes = (dataTarget = '', targetUid, nestedComponents) => {
  // const customFields = api.get('custom-fields')
  // (some custom fields service that can return registered custom fields)
  // const customFieldNames = Object.keys(customFields)
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

  // const customFields = api.get('/custom-field-endpoint')
  // return an object
  // {
  //   'custom-field-name': {
  //     ...
  //   }
  // }
  // const customFieldNames = Object.keys(customFields)

  const customAttributes = [
    'plop',
    // ... customFieldName
  ];

  const isPickingAttributeForAContentType = dataTarget === 'contentType';
  const isNestedInAnotherComponent = nestedComponents.includes(targetUid);
  const canAddComponentInAnotherComponent =
    !isPickingAttributeForAContentType && !isNestedInAnotherComponent;

  /**
   * Return an object instead of an array?
   * return {
   *  default: [
   *    [...defaultAttributes, 'uid'],
        ['component', 'dynamiczone']
      ]
      custom: customAttributes
   * }
   */
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
