import { useEffect, useState } from 'react';
import { Menu } from '../components/library/Menu';
import { Topic } from '../components/library/Topic';

const Library = ({ route }) => {
    const [search, setSearch] = useState('');
    const [topic, setTopic] = useState({}); // { pic: , title:, ... }
    const [article, setArticle] = useState({}); // { topic: , title:, ...}
    
    const [bookmarkView, setBookmarkView] = useState(false);
    const [bookmark, setBookmark] = useState([]); // [...article]

    const topicClick = (top) => {
        setTopic(top);
    }

    const articleClick = (article) => {
        setArticle(article);
    }

    useEffect(() => {
        if (route?.params?.topicData)
            setTopic(route.params.topicData);
    }, [route?.params?.topicData])

    // console.log('nav', route.params.topicData)
    return(
        <>
            { Object.keys(topic).length > 0 ? 
                <Topic topic={topic}
                       topicClick={topicClick}
                       article={article}
                       articleClick={articleClick}
                       bookmarkView={bookmarkView}
                       setBookmarkView={setBookmarkView}
                       bookmark={bookmark}
                       setBookmark={setBookmark} /> : 
                <Menu search={search} 
                      setSearch={setSearch}
                      topicClick={topicClick}
                      bookmarkView={bookmarkView}
                      setBookmarkView={setBookmarkView}
                      bookmark={bookmark}
                      setBookmark={setBookmark}
                      article={article}
                      articleClick={articleClick} /> }
        </>
    )
}
export default Library;