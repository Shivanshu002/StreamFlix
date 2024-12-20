import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const Deetails = () => {

    const navigation = useNavigation();

    const route = useRoute();
    const { data } = route.params;

    console.log('image ', data.image?.medium)

    const removeHtmlTags = (text) => {
        return text.replace(/<[^>]*>/g, '');
    };


    return (

        <>
            <View style={styles.container}>

                <View style={styles.bannerContainer}>
                    <Image
                        source={{ uri: data.image?.original }}
                        style={[styles.bannerImage, { borderColor: 'red', borderWidth: 1 }]}
                    />

                </View>

                <View style={styles.opacityBox}>
                    <View style={styles.headerCon}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Image source={require('../assests/Left.png')} style={styles.slogo} />
                        </TouchableOpacity>
                        <View style={styles.profileAndSearch}>
                            <TouchableOpacity onPress={() => { navigation.navigate('Search') }}>
                                <Image
                                    source={require('../assests/Search.png')}
                                    style={styles.serchTop} />
                            </TouchableOpacity>
                            <Image source={require('../assests/pro.png')} style={styles.serchTop} />
                        </View>
                    </View>

                    <View style={styles.downloadConatiner}>
                        <Image source={require('../assests/Bookmark.png')} style={styles.bookmark} />
                        <Image source={require('../assests/play.png')} style={styles.play} />
                        <Image source={require('../assests/download.png')} style={styles.bookmark} />
                    </View>

                </View>

                <ScrollView
                    style={{ paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.movieDeetailsBox}>
                        <View style={styles.ratingBox}>
                            <Text style={styles.Mname}>{data.name}</Text>
                            <Text style={styles.star}>⭐⭐ {data.rating.average}</Text>
                        </View>

                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={data.genres}
                            renderItem={({ item }) => (
                                <View style={styles.genereBox}>
                                    <Text style={styles.genres}>{item}</Text>
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.summeryBox}>
                        <Text style={styles.summery}>{removeHtmlTags(data.summary)}</Text>
                    </View>

                    <View style={styles.moreDeetails}>
                        <Text style={styles.type}>Type:               <Text style={styles.typesColor}>  {data.type} </Text></Text>
                        <Text style={styles.type}>Language:       <Text style={styles.typesColor}>  {data.language} </Text></Text>
                        <Text style={styles.type}>Status:              <Text style={styles.typesColor}> {data.status} </Text></Text>
                        <Text style={styles.type}>Runtime:           <Text style={styles.typesColor}> {data.runtime} </Text></Text>
                        <Text style={styles.type}>Runtime:           <Text style={styles.typesColor}> {data.runtime} </Text></Text>
                        <Text style={styles.type}>Premiered:       <Text style={styles.typesColor}>  {data.premiered} </Text></Text>
                    </View>
                </ScrollView>
            </View >
        </>

    )
}

export default Deetails

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    bannerContainer: {
        width: '100%',
        height: '60%',
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
    headerCon: {
        margin: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    slogo: {
        width: 30,
        height: 30
    },

    profileAndSearch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30
    },
    serchTop: {
        width: 40,
        height: 40,
        borderRadius: 20
    },

    bookmark: {
        width: 40,
        height: 40
    },
    play: {
        // width: 190,
    },
    downloadConatiner: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0
    },

    movieDeetailsBox: {
        flex: 1,
        margin: 10,
    },
    Mname: {
        color: 'white',
        fontSize: 25,
        fontWeight: '500'
    },

    star: {
        fontSize: 17,
        color: 'white'
    },

    ratingBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 20,
        alignItems: 'center'
    },
    genereBox: {
        marginLeft: 10,
        margin: 5
    },
    genres: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        borderWidth: .5,
        borderColor: 'red',
        padding: 8,
        borderRadius: 10
    },
    summery: {
        color: 'white',
        marginLeft: 10,
        // marginTop: 10,
        letterSpacing: .5,
        fontSize: 16
    },
    summeryBox: {
        margin: 10
    },
    type: {
        color: 'white',
        fontSize: 15
    },
    moreDeetails: {
        marginLeft: 20,
        marginBottom: 20
    },
    typesColor: {
        color: 'red'
    }

})