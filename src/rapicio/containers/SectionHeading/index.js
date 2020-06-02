import React from 'react';
import Heading from 'common/src/components/Heading';
import HGroup from './heading.style';

const SectionHeading = ({ title, slogan, ...props }) => {
  return (
    <HGroup {...props}>
      <Heading as="h1" content={slogan} />
      <Heading as="h1" content={title} />
    </HGroup>
  );
};

export default SectionHeading;
