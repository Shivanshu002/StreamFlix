import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';


const Search = () => {
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(false);
    const [get, setGet] = useState([]);


    const navigation = useNavigation();

    // console.log(get)

    const removeHtmlTags = (text) => {
        return text.replace(/<[^>]*>/g, '');
    };

    useEffect(() => {
        getMovieData();
    }, [])

    const getMovieData = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(`https://api.tvmaze.com/search/shows?q=${search}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const formattedData = result.map((item) => ({
                    score: item.score,
                    show: { ...item.show },
                }));
                setGet(formattedData);
            })
            .catch((error) => console.error(error));
    };



    return (
        <View style={styles.container}>

            <View style={styles.bannerContainer}>
                <Image
                    source={require('../assests/dr.jpeg')}
                    style={[styles.bannerImage, { borderColor: 'red', borderWidth: 1 }]}
                />

                <View style={styles.opacityBox}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.headerCon}>
                        <Image source={require('../assests/Left.png')} style={styles.slogo} />
                    </TouchableOpacity>


                    <View style={styles.searchBox}>
                        <Image source={require('../assests/Search.png')} style={styles.searchIcon} />
                        <TextInput value={search} onChangeText={setSearch} placeholder='search here....' style={styles.inputText} />
                        {search != "" &&
                            <TouchableOpacity>
                                {/* <Image source={require('../assests/close-window.png')} style={styles.clearIcon} /> */}
                            </TouchableOpacity>
                        }
                    </View>
                    {search != "" &&
                        <TouchableOpacity
                            onPress={() => {
                                getMovieData()
                                setSearch('')
                            }}
                            style={styles.searchBtn}>
                            <Text style={styles.searchTitle}>Search</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>



            <View>

                <View style={styles.movieCardContainer}>

                    <FlatList
                        data={get}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('Details', { data: item.show }) }}
                                style={styles.cardMain}>
                                <Image
                                    source={{ uri: item.show.image?.medium }}
                                    style={styles.imageBox}
                                />
                                <View style={styles.desBox}>
                                    <Text style={styles.score}>{item.show.name}</Text>
                                    <Text style={styles.summary} numberOfLines={2}>{removeHtmlTags(item.show.summary)}</Text>
                                </View>
                                {/* {console.log(item.show.image?.medium)} */}
                            </TouchableOpacity>
                        )}
                        numColumns={2}
                    />

                </View>
            </View>


        </View>
    )
}

export default Search

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    bannerContainer: {
        width: '100%',
        height: '35%',
        top: 0,
        position: 'relative',

    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
    opacityBox: {
        backgroundColor: 'rgba(0,0,0,.5)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0
    },

    searchText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 22,
        margin: 10,

    },

    slogo: {
        width: 30,
        height: 30,
        marginTop: 10,
        marginLeft: 10,
    },

    searchBox: {
        width: '90%',
        height: 50,
        borderWidth: .5,
        marginTop: 50,
        alignSelf: 'center',
        borderColor: '#9e9e9e',
        flexDirection: 'row',
        borderRadius: 8,
    },
    searchIcon: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginLeft: 10,

    },
    inputText: {
        width: '75%',
        marginLeft: 10,
        fontSize: 18,
        color: 'white',

    },
    searchBtn: {
        width: '40%',
        height: 50,
        backgroundColor: '#EB3223',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 8
    },
    searchTitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600'

    },
    cardMain: {
        width: '40%',
        marginTop: 20,
        flex: 1,
        // alignItems: 'center',
        margin: 10
    },
    imageBox: {
        width: '95%',
        height: 200,
        borderRadius: 10

    },
    desBox: {
        marginLeft: 8
    },
    score: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
        marginTop: 6,

    },

    summary: {
        color: 'white',
        fontSize: 13,
        fontWeight: '500'
    },


})