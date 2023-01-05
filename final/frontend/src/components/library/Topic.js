import { StyleSheet, Text, Image, View, ScrollView, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Article } from './Article';
import { NavBar } from '../NavBar';
import { Bookmark, toggleSubview } from './Bookmark';
import axios from '../../api';

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFFFFF',
    },
    block: {
        margin: 20
    },
    topImg: {
        marginTop: 20,
        marginEnd: 20,
        height: 245, 
        width: 327,
        borderRadius: 20,
        alignSelf: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    article: {
        margin: 10,
        padding: 10,
        backgroundColor: "#F9FAFB",
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    artDescribe: {
        width: "60%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    artImg: {
        height: 75, 
        width: 75,
        borderRadius: 20,
    },
    cheveron: {
        height: 50,
        width: 50,
        alignSelf: 'center',
    },
})

const TopicMenu = ({ articleData, topic, topicClick, articleClick, bookmarkView, setBookmarkView, bookmark, setBookmark }) => {
    const cheveronRight = require('../../assets/icon/primary/cheveron-right.png');

    const getImgSrc = (pic) => {
        return pic.split('/').length > 1 ? 
            require(`../../assets/image/Topic/${pic.split('/')[3].split('.')[0]}.${pic.split('/')[3].split('.')[2]}`) :
            require(`../../assets/image/Topic/${pic}`)
    }
    // return (<></>)
    return (
        <>
            <NavBar centerText=''
                leftText='Back' leftIcon='cheveron-left-s' leftIconOnPress={(event) => {topicClick('')}}
                rightText='Saved Articles' rightIcon='bookmark-s' rightIconOnPress={(event) => 
                    bookmarkView ? {} : toggleSubview(bookmarkView, setBookmarkView, [], setBookmark)}
            />
            <ScrollView style={styles.body}>
                <Image source={getImgSrc(topic.pic)} style={styles.topImg} />
                <View style={styles.block}>
                    <Text style={styles.title}> {topic.title} </Text>
                </View>
                { articleData.map((art, idx) => (
                    <Pressable key={idx} style={styles.article} onPress={() => {articleClick(art)}}>
                        <Image source={getImgSrc(art.pic)} style={styles.artImg} />
                        <View style={styles.artDescribe}>
                            <Text style={{ color: 'red' }}> {art.tag} </Text>
                            <Text numberOfLines={2} > {art.title} </Text>
                        </View>
                        <Image source={cheveronRight} style={styles.cheveron} />
                    </Pressable>
                ))}
            </ScrollView>
            <Bookmark bookmarkView={bookmarkView}
                      setBookmarkView={setBookmarkView}
                      bookmark={bookmark}
                      setBookmark={setBookmark} />
        </>
    )
}

const Topic = ({ topic, topicClick, article, articleClick, bookmarkView, setBookmarkView, bookmark, setBookmark }) => {
    const [articleData, setArticleData] = useState([]);
    
    const getArticleData = async () => {
        const {
            data: { message, ArticleData },
        } = await axios.get('/library/topic', {
            params: { topicName: topic.title }
        });
        console.log(message, ArticleData);
        setArticleData(ArticleData);
    }

    useEffect(() => {
        getArticleData();
    }, [topic])
    // console.log('topic', topic)
    // console.log('article', article)
    // console.log('articleData', articleData)
    return (
        <>
            { Object.keys(article).length > 0 ? 
                <Article article={article}
                         articleClick={articleClick} /> : 
                articleData.length === 0 ?
                    <>
                        <NavBar centerText=''
                                leftText='Back' leftIcon='cheveron-left-s' leftIconOnPress={(event) => {topicClick('')}}
                                rightText='Saved Articles' rightIcon='bookmark-s' rightIconOnPress={(event) => {}} />
                        <View>
                            <Text style={{ padding: 50, fontSize: 20, alignSelf: 'center' }}> Loading... </Text>
                        </View>
                    </> :
                    <TopicMenu articleData={articleData}
                               topic={topic}
                               topicClick={topicClick}
                               articleClick={articleClick}
                               bookmarkView={bookmarkView}
                               setBookmarkView={setBookmarkView}
                               bookmark={bookmark}
                               setBookmark={setBookmark} />
            }
        </>
    )
}

export { Topic };