import React, { Component } from 'react';

import Color from './Color.jsx';

import styles from './ColorPicker.less';

const COLORS = ['#FD8A81', '#FED085', '#FFFE94', '#CFD8DC', '#84D8FD', '#AAFEEB', '#CDFD95'];

export default class ColorPicker extends Component {
    render() {
        const { selectedColor, onColorChange } = this.props;

        return (
            <div className={styles.palette}>
                {
                    COLORS.map(color =>
                        <Color
                            key={color}
                            color={color}
                            selectedColor={selectedColor}
                            onColorChange={onColorChange}
                        />
                    )
                }
            </div>
        );

    }
}
