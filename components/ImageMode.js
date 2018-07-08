import React from 'react'
import {Text, View, TouchableOpacity, Image, ImageEditor, StyleSheet} from 'react-native';
import {ImagePicker, Permissions} from 'expo';
import {purple, white} from "../utils/colors";

export default class ImageMode extends React.Component {

    state= {
        image: null
    };

    pickImage = () => {

        Permissions.askAsync(Permissions.CAMERA_ROLL)
            .then(({status}) => {
                if(status ==='granted') {
                    ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        aspect: [1,1]
                    })
                        .then((result) => {
                            if (result.canceled) {
                                return
                            }

                            ImageEditor.cropImage(
                                result.uri,
                                {
                                    offset: {x: 0, y: 0},
                                    size: {width: result.width, height: result.height},
                                    displaySize: {width: 400, height: 400},
                                    resizeMode: 'contain'
                                },
                                (uri) => { this.setState({image: uri})},
                                () =>  console.log('Error Image')
                            )
                        })
                }
        })
    };

    render() {

        const {image} = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.pickImage}>
                    <Text style={styles.btnText}>
                        Add Image
                    </Text>
                </TouchableOpacity>

                {image && <Image style={styles.img} source={{uri: image}}/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        backgroundColor: 'black'
    },
    btnText:{
        textAlign: 'center',
        fontSize: 22,
        color: white
    },
    button: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    }
});