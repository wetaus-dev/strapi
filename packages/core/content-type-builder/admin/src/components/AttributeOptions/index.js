/**
 *
 * AttributeOptions
 *
 */

import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Box } from '@strapi/design-system/Box';
import { Divider } from '@strapi/design-system/Divider';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { KeyboardNavigable } from '@strapi/design-system/KeyboardNavigable';
import { ModalBody } from '@strapi/design-system/ModalLayout';
import { Flex } from '@strapi/design-system/Flex';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { Tabs, Tab, TabGroup, TabPanels, TabPanel } from '@strapi/design-system/Tabs';
import { getTrad } from '../../utils';
import AttributeOption from './AttributeOption';

const AttributeOptions = ({ attributes, forTarget, kind }) => {
  const { formatMessage } = useIntl();

  console.log('attributes', attributes);

  const titleIdSuffix = forTarget.includes('component') ? 'component' : kind;
  const titleId = getTrad(`modalForm.sub-header.chooseAttribute.${titleIdSuffix}`);

  if (attributes.custom.length) {
    return (
      <ModalBody>
        <Flex paddingBottom={4}>
          <Typography variant="beta" as="h2">
            {formatMessage({ id: titleId, defaultMessage: 'Select a field' })}
          </Typography>
        </Flex>
        <Divider />
        <TabGroup label="Some stuff for the label" id="tabs">
          <Tabs>
            <Tab>Default</Tab>
            <Tab>Custom</Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              <Box paddingTop={6} paddingBottom={4}>
                <KeyboardNavigable tagName="button">
                  <Stack spacing={8}>
                    {attributes.default.map((attributeRow, index) => {
                      const key = index;

                      return (
                        <Grid key={key} gap={0}>
                          {attributeRow.map((attribute, index) => {
                            const isOdd = index % 2 === 1;
                            const paddingLeft = isOdd ? 2 : 0;
                            const paddingRight = isOdd ? 0 : 2;

                            return (
                              <GridItem key={attribute} col={6} style={{ height: '100%' }}>
                                <Box
                                  paddingLeft={paddingLeft}
                                  paddingRight={paddingRight}
                                  paddingBottom={1}
                                  style={{ height: '100%' }}
                                >
                                  <AttributeOption type={attribute} />
                                </Box>
                              </GridItem>
                            );
                          })}
                        </Grid>
                      );
                    })}
                  </Stack>
                </KeyboardNavigable>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box paddingTop={6} paddingBottom={4}>
                <KeyboardNavigable tagName="button">
                  <Stack spacing={8}>
                    <Grid gap={0}>
                      {attributes.custom.map((attribute, index) => {
                        const isOdd = index % 2 === 1;
                        const paddingLeft = isOdd ? 2 : 0;
                        const paddingRight = isOdd ? 0 : 2;

                        return (
                          <GridItem key={attribute} col={6} style={{ height: '100%' }}>
                            <Box
                              paddingLeft={paddingLeft}
                              paddingRight={paddingRight}
                              paddingBottom={1}
                              style={{ height: '100%' }}
                            >
                              <AttributeOption
                                type={attribute.type}
                                renderAs={attribute.renderAs}
                              />
                            </Box>
                          </GridItem>
                        );
                      })}
                    </Grid>
                  </Stack>
                </KeyboardNavigable>
              </Box>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </ModalBody>
    );
  }

  return (
    <ModalBody>
      <Flex paddingBottom={4}>
        <Typography variant="beta" as="h2">
          {formatMessage({ id: titleId, defaultMessage: 'Select a field' })}
        </Typography>
      </Flex>
      <Divider />
      <Box paddingTop={6} paddingBottom={4}>
        <KeyboardNavigable tagName="button">
          <Stack spacing={8}>
            {attributes.default.map((attributeRow, index) => {
              const key = index;

              return (
                <Grid key={key} gap={0}>
                  {attributeRow.map((attribute, index) => {
                    const isOdd = index % 2 === 1;
                    const paddingLeft = isOdd ? 2 : 0;
                    const paddingRight = isOdd ? 0 : 2;

                    return (
                      <GridItem key={attribute} col={6} style={{ height: '100%' }}>
                        <Box
                          paddingLeft={paddingLeft}
                          paddingRight={paddingRight}
                          paddingBottom={1}
                          style={{ height: '100%' }}
                        >
                          <AttributeOption type={attribute} />
                        </Box>
                      </GridItem>
                    );
                  })}
                </Grid>
              );
            })}
          </Stack>
        </KeyboardNavigable>
      </Box>
    </ModalBody>
  );
};

AttributeOptions.propTypes = {
  attributes: PropTypes.object.isRequired,
  forTarget: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
};

export default AttributeOptions;
