import React, {useEffect} from 'react';
import { siteName } from '../lib/const';

const Guidelines = () => {

    useEffect(() => {
        document.title = `${siteName} Guidelines`;
    });

    return (
        <div>
            <h1>Guidelines</h1>
        </div>
    )
}

export default Guidelines;