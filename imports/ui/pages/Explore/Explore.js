import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { lighten, darken } from 'polished';

const StyledExplore = styled.div`
    p {
      font-size: 14px;
      line-height: 22px;
      color:red;
      margin: 0;
    }
`;

const Explore = () => (
<StyledExplore>
  <p>
    This is a div by the way.
  </p>
</StyledExplore>
);

export default Explore;
