import React from 'react';

const getAttributes = (dataTarget = '', targetUid, nestedComponents) => {
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

  if (isPickingAttributeForAContentType) {
    return {
      default: [
        [...defaultAttributes, 'uid'],
        ['component', 'dynamiczone'],
      ],
      custom: [
        {
          type: 'text',
          renderAs: 'colorpicker',
          Component: () => <p>My cool color picker</p>,
        },
      ],
    };
  }

  // TODO later
  if (canAddComponentInAnotherComponent) {
    return [defaultAttributes, ['component']];
  }

  return [defaultAttributes];
};

export default getAttributes;
