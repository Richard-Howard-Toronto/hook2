import React from 'react';

function Header() {

    const d = new Date();
    const time = d.toTimeString();

    return (
        <div>
            <div>
                Last Updated Today at: {time}
            </div>
        </div>
    );
}


export default Header