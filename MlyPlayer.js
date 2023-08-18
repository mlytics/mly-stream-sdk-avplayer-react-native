import React from 'react';
const PropTypes = require('prop-types');

import { requireNativeComponent, View } from 'react-native';

var iface = {
    name: 'MlyPlayer',
    PropTypes: {
        autoplay: PropTypes.bool,
        src: PropTypes.string,
        muted: PropTypes.bool,
        controls: PropTypes.bool,
        ...View.propTypes // include the default view properties
    }
}
var RCTMlyPlayer = requireNativeComponent('RCTMlyPlayer', iface);
class MlyPlayer extends React.Component {
    render() {
        return (
            <RCTMlyPlayer {...this.props} style={{ marginLeft: 5, width: 380, height: 220 }} />
        );
    }
}

export default MlyPlayer;