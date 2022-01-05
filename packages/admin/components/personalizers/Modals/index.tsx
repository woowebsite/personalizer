import React from 'react';
import Loadable from 'react-loadable';

const modalsProvider = {
    ['CREATE_ALBUM']: (props) => {
        const Component = Loadable({
            loader: () => import('features/CreateAlbumModal'),
            loading: () => <p>Loading...</p>,
        })
        return <Component {...props} />
    },
}
export default modalsProvider