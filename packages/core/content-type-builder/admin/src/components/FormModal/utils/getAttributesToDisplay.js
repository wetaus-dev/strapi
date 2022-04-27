const getAttributes = (dataTarget = '', targetUid, nestedComponents, customFields) => {
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

  const isPickingAttributeForAContentType = dataTarget === 'contentType';
  const isNestedInAnotherComponent = nestedComponents.includes(targetUid);
  const canAddComponentInAnotherComponent =
    !isPickingAttributeForAContentType && !isNestedInAnotherComponent;
  console.log(Object.values(customFields));

  if (isPickingAttributeForAContentType) {
    return {
      default: [
        [...defaultAttributes, 'uid'],
        ['component', 'dynamiczone'],
      ],
      custom: Object.values(customFields),
    };
  }

  // TODO later
  if (canAddComponentInAnotherComponent) {
    return [defaultAttributes, ['component']];
  }

  return [defaultAttributes];
};

export default getAttributes;
