import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types'

export const LANDSCAPE = "LANDSCAPE"
export const PORTRAIT = "PORTRAIT"

export default class Orientation extends Component {
    constructor(props) {
        super(props);
        this.getInitialOrientation = this.getInitialOrientation.bind(this);
        this._orientationDidChange = this._orientationDidChange.bind(this);
    }

    getInitialOrientation() {
       var dim = Dimensions.get('screen');
       if(dim.height >= dim.width) {
            this.props.getInitialOrientation({'orientation' : PORTRAIT});
       } else {
            this.props.getInitialOrientation({'orientation' : LANDSCAPE});
       }
    }

    _orientationDidChange(dimension) {
        var dim = dimension.screen;
        if(dim.height >= dim.width) {
            this.props.onOrientationChange({'orientation' : PORTRAIT});
        } else {
            this.props.onOrientationChange({'orientation' : LANDSCAPE});
        }
    }

    render() {
        return (
            <View hidden={true}/>
        );
    }

    componentWillMount() {
        this.getInitialOrientation();
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this._orientationDidChange)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change');
    }
}

Orientation.propTypes = {
    onOrientationChange : PropTypes.func.isRequired,
    getInitialOrientation : PropTypes.func.isRequired,
}