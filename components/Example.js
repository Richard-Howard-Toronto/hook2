import React, { useState, useEffect } from 'react';

function Example(initialCount) {
    const [count, setCount] = useState(0);
    console.log(count)

    return (
        <>
            Count!: {count}
            <button onClick={() => setCount(initialCount=0)}>Reset</button>
            <button onClick={() => setCount(initialCount => initialCount - 1)}>down 1</button>
            <button onClick={() => setCount(initialCount => initialCount + 1)}>up 1</button>
            <button onClick={() => setCount(initialCount => initialCount )}>will DOM render again?</button>
            <button onClick={() => console.clear()}>Clear</button>

        </>
    );
}

export default Example
