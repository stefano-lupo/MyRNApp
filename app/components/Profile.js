/**
 * Created by stefano on 23/07/17.
 */
import React from 'react';
import { List, ListItem, Divider, Text } from 'react-native-elements';
import { Image, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import { Actions } from 'react-native-router-flux';

const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding:10,

  },
  avatarContainer: {
    flex: 1,
    margin: 10,
  },
  avatar: {
    resizeMode: 'cover',
    height: 80,
  },
  nameContainer: {
    flex: 3,
    margin: 5,
  },
  carouselContainer: {
    height: WIDTH,
    width: WIDTH,
    borderWidth: 1,
  },
  carouselImage: {
    borderWidth: 1,
    height: WIDTH,
    width: WIDTH,
    resizeMode: 'cover',
  }
});


export default class Profile extends React.Component {

  reviewSelected(review) {
    Actions.providerReview({review});
  }

  reviewItemSubTitle(review) {
    return(
      <Text>{review.score}, from {review.by}</Text>
    );
  }

  render() {
    const { provider } = this.props;
    return (
      <View>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar} source={{uri: provider.thumbnail}} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={{fontSize: 20}}>{ provider.getName()} </Text>
              <Divider />
              <Text style={{fontStyle: 'italic'}}>{ provider.description }</Text>
            </View>
          </View>
          <Carousel
            delay={3000}
            style={styles.carouselContainer}
            autoplay
            pageInfo
            onAnimateNextPage={(p) => console.log(p)}
          >
            {provider.images.map((image) => {
              console.log(image.url);
              return (
                <Image style={styles.carouselImage} source={{uri: image.url}} />
              );

            })
            }
          </Carousel>
          <Text h2>Reviews</Text>
          <List>
            {
              provider.reviews.map((review) => (
                <ListItem
                  key={review._id}
                  title={<Text style={{fontSize: 20, fontStyle: "italic"}}>"{review.quickReview}"</Text>}
                  subtitle={this.reviewItemSubTitle(review)}
                  onPress={() => this.reviewSelected(review)}
                />
              ))
            }
          </List>
        </ScrollView>
      </View>
    );
  }
}