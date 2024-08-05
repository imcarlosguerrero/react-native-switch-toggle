import { Animated, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
function SwitchToggle(_a) {
    var testID = _a.testID, switchOn = _a.switchOn, onPress = _a.onPress, _b = _a.containerStyle, containerStyle = _b === void 0 ? {
        marginTop: 16,
        width: 80,
        height: 40,
        borderRadius: 25,
        padding: 5,
    } : _b, _c = _a.circleStyle, circleStyle = _c === void 0 ? {
        width: 32,
        height: 32,
        borderRadius: 16,
    } : _c, _d = _a.backgroundColorOn, backgroundColorOn = _d === void 0 ? 'black' : _d, _e = _a.backgroundColorOff, backgroundColorOff = _e === void 0 ? '#C4C4C4' : _e, _f = _a.circleColorOn, circleColorOn = _f === void 0 ? 'white' : _f, _g = _a.circleColorOff, circleColorOff = _g === void 0 ? '#6D6D6D' : _g, _h = _a.duration, duration = _h === void 0 ? 300 : _h, backgroundImageOn = _a.backgroundImageOn, backgroundImageOff = _a.backgroundImageOff, type = _a.type, buttonText = _a.buttonText, backTextRight = _a.backTextRight, backTextLeft = _a.backTextLeft, buttonTextStyle = _a.buttonTextStyle, textRightStyle = _a.textRightStyle, textLeftStyle = _a.textLeftStyle, buttonStyle = _a.buttonStyle, buttonContainerStyle = _a.buttonContainerStyle, rightContainerStyle = _a.rightContainerStyle, leftContainerStyle = _a.leftContainerStyle, RTL = _a.RTL;
    var animXValue = useState(new Animated.Value(switchOn ? 1 : 0))[0];
    var getStart = function () {
        return type === undefined
            ? 0
            : type === 0
                ? 0
                : containerStyle && containerStyle.padding
                    ? containerStyle.padding * 2
                    : {};
    };
    var runAnimation = function () {
        var animValue = {
            fromValue: switchOn ? 0 : 1,
            toValue: switchOn ? 1 : 0,
            duration: duration,
            useNativeDriver: false,
        };
        Animated.timing(animXValue, animValue).start();
    };
    var endPos = containerStyle && circleStyle
        ? containerStyle.width -
            (circleStyle.width +
                (containerStyle.padding || 0) * 2)
        : 0;
    var circlePosXEnd = RTL ? -endPos : endPos;
    var circlePosXStart = useState(getStart())[0];
    var prevSwitchOnRef = useRef();
    var prevSwitchOn = !!prevSwitchOnRef.current;
    useEffect(function () {
        prevSwitchOnRef.current = switchOn;
        if (prevSwitchOn !== switchOn)
            runAnimation();
    }, [prevSwitchOn, switchOn, runAnimation]);
    var generateRightText = function () {
        return (<Animated.View style={rightContainerStyle}>
        <Text style={textRightStyle}>{backTextRight}</Text>
      </Animated.View>);
    };
    var generateLeftText = function () {
        return (<Animated.View style={leftContainerStyle}>
        <Text style={textLeftStyle}>{backTextLeft}</Text>
      </Animated.View>);
    };
    var generateLeftIcon = function () {
        return (<View style={{ position: 'absolute', left: 5 }}>{backgroundImageOn}</View>);
    };
    var generateRightIcon = function () {
        return (<View style={{ position: 'absolute', right: 5 }}>{backgroundImageOff}</View>);
    };
    return (<TouchableOpacity testID={testID} onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={[
            styles.container,
            containerStyle,
            {
                backgroundColor: animXValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                        backgroundColorOff,
                        backgroundColorOn,
                    ],
                }),
            },
        ]}>
        {generateLeftText()}
        {switchOn && generateLeftIcon()}
        <Animated.View style={[
            circleStyle,
            {
                backgroundColor: animXValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                        circleColorOff,
                        circleColorOn,
                    ],
                }),
            },
            {
                transform: [
                    {
                        translateX: animXValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                                circlePosXStart,
                                circlePosXEnd,
                            ],
                        }),
                    },
                ],
            },
            buttonStyle,
        ]}>
          <Animated.View style={buttonContainerStyle}>
            <Text style={buttonTextStyle}>{buttonText}</Text>
          </Animated.View>
        </Animated.View>
        {generateRightText()}
        {!switchOn && generateRightIcon()}
      </Animated.View>
    </TouchableOpacity>);
}
export default SwitchToggle;
//# sourceMappingURL=index.js.map