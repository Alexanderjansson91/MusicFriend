import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, TextInput, RefreshControl } from 'react-native'
import MainView from '../components/views/CurvedView';
import HeaderView from '../components/views/Header';
import { reload } from '../redux/actions/index'
import { bindActionCreators } from 'redux'


import { SearchBar } from 'react-native-elements';
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

import Cities from '../components/data/LocationsData'



function Feed(props) {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    
    const [refreshing, setRefreshing] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);


    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.caption
                    ? item.caption.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);

        }
    };



    //const { usersPosts, songs } = props;
    //Hook for clean up
    useEffect(() => {
        let posts = [];
        if (props.usersPostLoaded == props.allPosts.length) {
            for (let i = 0; i < props.allPosts.length; i++) {
                const user = props.users.find(el => el.uid === props.allPosts[i]);
                if (user != undefined) {
                    posts = [...posts, ...user.posts]
                }
            }
            posts.sort(function (x, y) {
                return x.creation - y.creation
            })

            setPosts(posts);
            setFilteredDataSource(posts);
            setMasterDataSource(posts);

        }
    }, [props.usersPostLoaded]);


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.reload()
        wait(2000).then(() => setRefreshing(false));
    }, []);
 

    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <HeaderView
                    headerText="Music Buddy"
                    icon="search-outline"
                    click={() => props.navigation.navigate('Settings')}
                />
                <MainView></MainView>
                <SearchBar
                    style={styles.containerInfo}
                    round
                    searchIcon={{ size: 24 }}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Sök stad"
                    value={search}
                />
                <FlatList  
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    numColumns={1}
                    extraData={filteredDataSource}
                    horizontal={false}
                    data={filteredDataSource}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>
                            <Text style={styles.container}>{item.caption}</Text>
                            <Text style={styles.container}>{item.city}</Text>

                            <TouchableOpacity
                                onPress={() => props.navigation.navigate("Profile", { uid: item.user.uid })}
                            >
                                <Text>{item.user.name}</Text>
                            </TouchableOpacity>
                            <Text
                                onPress={() => props.navigation.navigate('Comment',
                                    { postId: item.id, uid: item.user.uid })
                                }>Viewcomments</Text>

                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 10
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})

const mapDispatchProps = (dispatch) => bindActionCreators({ reload,  }, dispatch)

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersPostLoaded: store.usersState.usersPostLoaded,
    allPosts: store.userState.allPosts,
})
export default connect(mapStateToProps,mapDispatchProps, null)(Feed);
