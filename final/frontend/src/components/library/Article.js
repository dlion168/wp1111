import { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, ScrollView } from 'react-native';
import { NavBar } from '../NavBar';
import { saveArticle } from './Bookmark';
import { getArtStatus } from './Bookmark';

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFFFFF',
    },
    title: {
        margin: 20,
        display: 'flex',
    },
    summary: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
    },
    tag: {
        padding: 5,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#F87171',
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    tagText: {
        fontSize: 15,
        alignSelf: 'center',
    },
    reviewer: {
        width: "85%",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    reviewerImg: {
        height: 60,
        width: 60,
        margin: 10,
    },
    reviewerSummary: {
        margin: 10,
        display: 'flex',
        width: "85%"
    },
    articleImg: {
        margin: 20,
        height: 300,
        width: 300,
        borderRadius: 10,
        alignSelf: 'center',
    },
    content: {
        fontSize: 16,
        paddingLeft: "15%",
        paddingRight: "15%",
        paddingTop: 25,
        paddingBottom: 25
    }
})



const Article = ({ article, articleClick }) => {
    const [status, setStatus] = useState(false);
    useEffect(() => {
        getArtStatus(article.id, setStatus);
    }, [])
    
    return (
        <>
            <NavBar centerText=''
                leftText='Back' leftIcon='cheveron-left-s' leftIconOnPress={(event) => {articleClick({});}}
                rightText={status ? 'Saved!' : 'Save'} rightIcon={status ? 'bookmark-f' : 'bookmark-t'} rightIconOnPress={(event) => {
                    saveArticle(article.id, !status);
                    setStatus(!status);}}
            />
            <ScrollView style={styles.body}>
                <View style={styles.title}>
                    <Text style={styles.summary}> {article.title} </Text>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}> {article.tag} </Text>
                    </View>
                </View>
                <View style={styles.reviewer}>
                    <Image style={styles.reviewerImg} source={require('../../assets/image/Reviewer/1476719_358210150989956_319087768_n.png')}/>
                    <View style={styles.reviewerSummary}>
                        <Text> Reviewed by </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> EBCOG </Text>
                        <Text> the European Board & College of Obstetrics and Gynaecology </Text>
                    </View>
                </View>
                <Image source={require(`../../assets/image/Topic/${article.pic}`)} style={styles.articleImg} />
                <Text style={styles.content}> {article.content} </Text>
            </ScrollView>
        </>
    )
}

export { Article };