import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';

const Home = () => {


  const navigation = useNavigation();


  const [movieData, setMovieData] = useState([]);

  // console.log(movieData.image)

  useEffect(() => {
    getMovieData();
  }, [])

  const getMovieData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://api.tvmaze.com/search/shows?q=all", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const formattedData = result.map((item) => ({
          score: item.score,
          show: { ...item.show },
        }));
        setMovieData(formattedData);
      })
      .catch((error) => console.error(error));
  };



  const removeHtmlTags = (text) => {
    return text.replace(/<[^>]*>/g, '');
  };

  const movieGenres = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Historical',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Sport',
    'Thriller',
    'War',
    'Western'
  ];



  return (
    <SafeAreaView style={styles.container}>

      <ScrollView >

        <View style={styles.bannerContainer}>
          <Image source={require('../assests/dr.jpeg')} style={styles.bannerImage} />
          <View style={styles.opacityBox}>
            <Animatable.View animation={'fadeInUp'} style={styles.headerCon}>
              <Image source={require('../assests/slogo.png')} style={styles.slogo} />
              <View style={styles.profileAndSearch}>
                <TouchableOpacity onPress={() => { navigation.navigate('Search') }}>
                  <Image source={require('../assests/Search.png')} style={styles.serchTop} />
                </TouchableOpacity>

                <Image source={require('../assests/pro.png')} style={styles.serchTop} />
              </View>
            </Animatable.View>

            <Animatable.View animation={'fadeInRight'}>
              <FlatList

                horizontal showsHorizontalScrollIndicator={false}
                data={movieGenres}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.movieGenres}>
                      <Text style={styles.categoris}>{item}</Text>
                    </View>
                  )
                }}
              />
            </Animatable.View>


            <Animatable.View animation={'fadeInUp'} style={styles.downloadConatiner}>
              <Image source={require('../assests/Bookmark.png')} style={styles.bookmark} />
              <Image source={require('../assests/play.png')} style={styles.play} />
              <Image source={require('../assests/download.png')} style={styles.bookmark} />
            </Animatable.View>



          </View>
        </View>

        <View>
          <Text style={styles.trendingText}>Trending Now</Text>

          <View style={styles.movieCardContainer}>

            <FlatList
            contentContainerStyle={{marginBottom:250}}
              data={movieData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => { navigation.navigate('Details', { data: item.show }) }}
                  style={styles.cardMain}>
                  <Animatable.Image animation={'fadeInUp'}
                    source={{ uri: item.show.image?.medium }}
                    style={styles.imageBox}
                  />
                  <Animatable.View animation={'fadeInUp'} style={styles.desBox}>
                    <Text style={styles.score}>{item.show.name}</Text>
                    <Text style={styles.summary} numberOfLines={2}>{removeHtmlTags(item.show.summary)}</Text>
                  </Animatable.View>
                  {/* {console.log(item.show.image?.medium)} */}
                </TouchableOpacity>
              )}
              numColumns={2}
            />

          </View>

        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'black',
  },

  bannerContainer: {
    width: '100%',
    height: '25%',
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
  trendingText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '800',
    paddingLeft: 20,
    marginTop: 10
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

  movieCardContainer: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems:'center',
    // alignContent:'center',
    // alignSelf:'center'
    marginBottom: 300

  },

  desBox: {
    marginLeft: 8
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
    width: 50,
    height: 50
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
  categoris: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500'
  },
  movieGenres: {
    textAlign: 'center',
    borderWidth: .5,
    borderColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  downloadConatiner: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 200
  },

  bookmark: {
    width: 40,
    height: 40
  },
  play: {
    // width: 190,
  }

})