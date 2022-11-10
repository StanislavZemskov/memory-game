import React from 'react';

const Card = (props) => {

    const style = {
        border: 'solid 1px black',
        fontSize: '35px',
        fontWeight: '400',
        cursor: 'pointer',
        textAlign: 'center',
        padding: '50px'
    }

    return (
        <button style={style}
                onClick={() => props.openCard(props.card.id)}>
            {props.card.isOpen ? props.card.name : 'X'}
        </button>
    );
};

export default Card;