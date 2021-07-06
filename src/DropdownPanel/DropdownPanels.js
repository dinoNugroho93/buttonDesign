import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions, FlatList,
    Modal,
    Text, TouchableOpacity,
    TouchableWithoutFeedback,
    View, StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons'


const DropdownPanels = (props) => {
    //const orientation = useDeviceOrientation();
    const {
        onChange,
        style,
        containerStyle,
        placeholderStyle,
        data,
        labelField,
        valueField,
        value,
        activeColor,
        fontFamily,
        placeholder,
        maxHeight = 340,
        disable = false,
        renderRightIcon,
        renderItem
    } = props;

    const ref = useRef(null);
    const refList = useRef(null);
    const [visible, setVisible] = useState(false);
    const [currentValue, setCurrentValue] = useState(null);
    const [listData, setListData] = useState(data);
    const [position, setPosition] = useState();
    const { width: W, height: H } = Dimensions.get('window');


    const font = () => {
        if (fontFamily) {
            return {
                fontFamily: fontFamily
            }
        } else {
            return {}
        }
    }

    useEffect(() => {
        getValue();
    }, []);

    const getValue = () => {
        const getItem = data.filter(e => value === e[valueField]);
        if (getItem.length > 0) {
            setCurrentValue((e: any) => e = getItem[0]);
        }
    }
    const showOrClose = () => {
        if (!disable) {
            _measure();
            setVisible(!visible);
            setListData(data);
        }
    }

    const onSelect = (item: any) => {
        //onSearch('');
        setCurrentValue((e: any) => e = item);
        onChange(item);
        setVisible(false);
    }

    const _renderDropdown = () => {
        return (
            <TouchableWithoutFeedback onPress={showOrClose}>
                <View style={styles.dropdown}>
                    {/* {renderLeftIcon?.()} */}
                    <Text style={[styles.textItem, placeholderStyle, font()]}>
                        {currentValue && currentValue[labelField] || placeholder}
                    </Text>
                    {renderRightIcon ? renderRightIcon() : <Icon name={visible?'chevron-down-outline' : 'chevron-forward-outline'} size={20} style={[styles.icon]} />}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const _renderItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <TouchableOpacity key={index} onPress={() => onSelect(item)} style={[item[valueField] === (currentValue && currentValue[valueField]) && { backgroundColor: 'transparent' }]}>
                {renderItem ? renderItem(item) : <View style={styles.item}>
                    <Text style={[styles.textItem, placeholderStyle, font()]}>{item[labelField]}</Text>
                </View>}
            </TouchableOpacity>
        );
    };

    const _renderListTop = () => {
        return <View style={{ flex: 1 }}>
            <FlatList
                ref={refList}
                data={listData}
                inverted
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={true}
            />
        </View>
    }

    const _renderListBottom = () => {
        return <View style={{ flex: 1 }}>
            <FlatList
                ref={refList}
                data={listData}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={true}
            />
        </View>
    }

    const _renderModal = () => {
        if (visible && position) {
            const {
                //isFull,
                w,
                top,
                bottom
            } = position
            return <Modal transparent visible={visible} supportedOrientations={['portrait']}>
                <TouchableWithoutFeedback onPress={showOrClose}>
                    <View style={[{ width: W, height: H, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }]}>
                        <View style={{ height: top, width: w, justifyContent: 'flex-end' }}>
                            {bottom < maxHeight && <View style={[{ width: w }, styles.container, containerStyle, { maxHeight: maxHeight }]}>
                                {_renderListTop()}
                            </View>}
                        </View>
                        <View style={{ height: bottom, width: w }}>
                            {bottom > maxHeight && <View style={[{ width: w }, styles.container, containerStyle, { maxHeight: maxHeight }]}>
                                {_renderListBottom()}
                            </View>}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        }
        return null
    }

    const _measure = () => {
        if (ref) {
            ref.current.measure((width, height, px, py, fx, fy) => {
                const w = px;
                const top = py + fy + 2;
                const bottom = H - top;

                setPosition({
                    w,
                    top,
                    bottom
                });
            })
        }
    }


    return (
        <View >
            <View style={[style]} ref={ref} onLayout={_measure}>
                {_renderDropdown()}
                {_renderModal()}
            </View>
        </View>
    )
}

DropdownPanels.propTypes = {
    style: PropTypes.object,
    containerStyle: PropTypes.object,
    placeholderStyle: PropTypes.object,
    maxHeight: PropTypes.number,
    fontFamily: PropTypes.string,
    iconColor: PropTypes.string,
    activeColor: PropTypes.string,
    data: PropTypes.array.isRequired,
    value: PropTypes.any.isRequired,
    placeholder: PropTypes.string,
    labelField: PropTypes.string,
    valueField: PropTypes.string,
    disable: PropTypes.bool,
    renderRightIcon: PropTypes.element,
    renderItem: PropTypes.element

}

DropdownPanels.defaultProps = {
    placeholder: 'Select item',
    activeColor: 'black',
    data: [],
    style: {},
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        backgroundColor: '#EFF0F6',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius:10,
        paddingHorizontal:15
    },
    dropdown: {
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        backgroundColor: '#EFF0F6'
    },
    title: {
        marginVertical: 5,
        fontSize: 16
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16
    },
    icon: {
        width: 20,
        height: 20,
    },
    textError: {
        color: 'red',
        fontSize: 14,
        marginTop: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        paddingHorizontal: 8,
        marginBottom: 8,
        margin: 6
    },
});

export default DropdownPanels;