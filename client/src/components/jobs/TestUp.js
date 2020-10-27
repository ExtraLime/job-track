import React from 'react'

const TestUp = (props) => {
    const [state] = React.useState('this is a test')

    const handleClick = () => props.onClick &&props.onClick(state)
    return (
        <button onClick={handleClick}>pass state</button>
    )
}

export default TestUp
