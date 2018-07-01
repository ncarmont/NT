import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import PublicNavigation from '../PublicNavigation/PublicNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';
import styled from 'styled-components';


const NavigationStyles = styled.div `

#topNavImage {
  width:67px;
  height:67px;
  display: block;
  margin-top:-13px;
  margin-left: 537px;
}

.navSmallLabels1  {
  color:#969696;
  font-size:0.76em;
  letter-spacing:0.03em;
  margin-left:15px;
  float:left;
  cursor:pointer;
  transition:0.2s;
  margin-top:12px;
  text-decoration:none;
  position:absolute;
  }
.navSmallLabels1:hover  {
  color:#757575;
  text-decoration:none;
  }

  .navSmallLabels2  {
    color:#969696;
    font-size:0.76em;
    letter-spacing:0.03em;
    float:left;
    cursor:pointer;
    transition:0.2s;
    margin-top:12px;
    margin-left:85px;
    text-decoration:none;
    position:absolute;
    }
  .navSmallLabels2:hover  {
    color:#757575;
    text-decoration:none;
    }

`;



const Navigation = props => (
  <NavigationStyles>
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
         <Link to="/"><div class="navSmallLabels1">About</div></Link>
         <Link to="/"><div class="navSmallLabels2">Get Involved</div></Link>
        <Link to="/"><img src="favicon.png" id="topNavImage"/></Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {!props.authenticated ? <PublicNavigation /> : <AuthenticatedNavigation {...props} />}
    </Navbar.Collapse>
  </Navbar>
  </NavigationStyles>
);

Navigation.defaultProps = {
  name: '',
};

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  name: PropTypes.string,
};

export default Navigation;
