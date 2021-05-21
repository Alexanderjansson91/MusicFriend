import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import HeaderView from '../components/views/HeaderFeed';
import moment from "moment";

require('firebase/firestore')
import { connect } from 'react-redux'
import PostsCards from '../components/cards/PostsCard'


function Feed(props, { navigation }) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  //Serach filter how search through Citys
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = (item.city) ? item.city.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  //Connect users with the posts by the uid
  useEffect(() => {
    let posts = [];
    if (props.usersPostLoaded == props.allPosts.length) {
      for (let i = 0; i < props.allPosts.length; i++) {
        const user = props.users.find(el => el.uid === props.allPosts[i]);
        if (user != undefined) {
          posts = [...posts, ...user.posts];
        }
      }
      posts.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(posts);
      setFilteredDataSource(posts);
      setMasterDataSource(posts);
    }
  }, [props.usersPostLoaded]);

  //Refreash flatlist
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <HeaderView
          headerText="Music Buddy"
          icon={"search-outline"}
          search={search}
          searchFunction={(text) => searchFilterFunction(text)}
          clear={(text) => searchFilterFunction('')} />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={1}
          horizontal={false}
          data={filteredDataSource}
          extraData={filteredDataSource}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <PostsCards 
                textButtonProfile={item.user.name}
                clickProfile={() => props.navigation.navigate("Profile", { uid: item.user.uid })}
                iconProfile="person-outline"
                region={item.city}
                infoAboutPost={item.caption}
                clickMessage={() => props.navigation.navigate('Comment',
                { postId: item.id, uid: item.user.uid })}
                iconComment="chatbox-outline"
                postDate={moment(item.dateUpload).format("ll")}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
  },
  containerInfo: {
    margin: 200,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  usersPostLoaded: store.usersState.usersPostLoaded,
  allPosts: store.userState.allPosts,
});
export default connect(mapStateToProps, null)(Feed);
