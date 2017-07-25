import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Root = props => {
    const greeting = `Hello, ${props.name}!`;
    return (
        <h1>{greeting}</h1>
    );
};

Root.propTypes = {
    name: PropTypes.string
};

export default Root;
