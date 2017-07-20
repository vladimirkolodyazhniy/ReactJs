import React, { PropTypes } from 'react';

import styles from './Button.less';

const Button = ({ customClass, text, onButtonClick }) => (
    <span
        className={styles[customClass]}
        data-qa="button"
        onClick={onButtonClick}
    >
        {text}
    </span>
);

Button.propTypes = {
    customClass: PropTypes.string,
    text: PropTypes.string,
    onButtonClick: PropTypes.func
};

export default Button;
