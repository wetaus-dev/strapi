/**
 *
 * AttributeOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Typography } from '@strapi/design-system/Typography';
import useFormModalNavigation from '../../../hooks/useFormModalNavigation';
import getTrad from '../../../utils/getTrad';
import AttributeIcon from '../../AttributeIcon';
import BoxWrapper from './BoxWrapper';

const AttributeOption = ({ attribute, isCustomField }) => {
  const { formatMessage } = useIntl();
  const { columnType, type, intlName, intlDescription } = attribute;
  const { onClickSelectField } = useFormModalNavigation();

  const handleClick = () => {
    const step = type === 'component' ? '1' : null;
    onClickSelectField({
      attributeType: type,
      step,
      columnType,
    });
  };

  const tradName = intlName || { id: getTrad(`attribute.${type}`), defaultMessage: type };
  const tradDescription = intlDescription || { id: getTrad(`attribute.${type}`), defaultMessage: type };

  return (
    <BoxWrapper padding={4} as="button" hasRadius type="button" onClick={handleClick}>
      <Flex>
        <AttributeIcon type={type} />
        <Box paddingLeft={4}>
          <Flex>
            <Typography fontWeight="bold">{formatMessage(tradName)}</Typography>
          </Flex>

          <Flex>
            <Typography variant="pi" textColor="neutral600">
              {formatMessage(tradDescription)}
            </Typography>
          </Flex>
        </Box>
      </Flex>
    </BoxWrapper>
  );
};

AttributeOption.defaultProps = {
  type: 'text',
  columnType: '',
};

AttributeOption.propTypes = {
  type: PropTypes.string,
  columnType: PropTypes.string,
};

export default AttributeOption;
