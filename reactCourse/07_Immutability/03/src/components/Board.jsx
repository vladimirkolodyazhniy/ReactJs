import React from 'react';

import Tile from './Tile.jsx';

import styles from './Board.less';

export default props => {
    const { rows, onReveal } = props;

    return (
        <div className={styles.base}>
            {
                rows.map((row, idx) =>
                    <div className={styles.row} key={idx} >
                        {
                            row.map(tile =>
                                <Tile
                                    id={tile.get('id')}
                                    imgSrc={tile.get('imgSrc')}
                                    isRevealed={tile.get('isRevealed')}
                                    key={tile.get('id')}
                                    onReveal={onReveal}
                                />
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};
