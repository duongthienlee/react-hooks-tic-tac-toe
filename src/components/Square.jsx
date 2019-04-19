import React, { useEffect, useState } from 'react';
const mqlTablet = window.matchMedia(`(max-width: 991px)`);

export default ({ value, onClick, className }) => {
    const [mqlTabletState, setmqlTabletState] = useState(mqlTablet);
    useEffect(() => {
        mqlTablet.addListener(mediaQueryChanged());
        return () => {
            mqlTablet.removeEventListener(mediaQueryChanged())
        }
    }, [])
    const mediaQueryChanged = () => {
        setmqlTabletState(mqlTablet.matches)
    }

    let size = mqlTabletState ? 60 : 90;
    return (
        <button
            style={{
                fontSize: `${size / 2}px`,
                lineHeight: `${size}px`,
                height: `${size}px`,
                width: `${size}px`,
            }}
            data-pro={value} className={className} onClick={onClick}>
            {value}
        </button>
    )
}