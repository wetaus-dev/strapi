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

const AttributeOption = ({ type, renderAs }) => {
  const { formatMessage } = useIntl();

  const { onClickSelectField } = useFormModalNavigation();

  const handleClick = () => {
    const step = type === 'component' ? '1' : null;

    onClickSelectField({
      attributeType: type,
      attributeRenderAs: renderAs,
      step,
    });
  };

  console.log('renderAs', renderAs);

  return (
    <BoxWrapper padding={4} as="button" hasRadius type="button" onClick={handleClick}>
      <Flex>
        <AttributeIcon type={type} />
        <Box paddingLeft={4}>
          <Flex>
            <Typography fontWeight="bold">
              {renderAs ||
                formatMessage({ id: getTrad(`attribute.${type}`), defaultMessage: type })}
            </Typography>
          </Flex>

          <Flex>
            <Typography variant="pi" textColor="neutral600">
              {renderAs
                ? 'The cooler community color picker'
                : formatMessage({ id: getTrad(`attribute.${type}.description`) })}
            </Typography>
          </Flex>
        </Box>
      </Flex>
    </BoxWrapper>
  );
};

AttributeOption.defaultProps = {
  type: 'text',
  renderAs: null,
};

AttributeOption.propTypes = {
  type: PropTypes.string,
  renderAs: PropTypes.string,
};

export default AttributeOption;
