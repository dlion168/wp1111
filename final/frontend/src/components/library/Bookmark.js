import { StyleSheet, Text, View, Image, Animated, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import axios from '../../api';

const styles = StyleSheet.create({
  subView: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 400,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  title: {
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  blocks: {
    display: 'flex',
    flexDirection: 'row'
  },
  topic: {
    paddingRight: 10,
    paddingLeft: 10,
    display: 'flex'
  },
  imageGradient: {
    height: '100%',
    width: '100%',
    borderRadius: 20
  },
  artTitle: {
    marginLeft: 10,
    marginRight: 10,
    position: 'absolute',
    bottom: 130,
    left: 20,
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    zIndex: 1
  },
  bookmarkBlock: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 5,
    right: 15,
    zIndex: 1,
    alignSelf: 'flex-end'
  },
  bookmark: {
    height: 25,
    width: 15,
    position: 'absolute',
    top: 5,
    left: '30%',
  }
});

const bounceValue = new Animated.Value(400);
const cancelIcon = require('../../assets/icon/primary/x.png');
const bookmark_t = require('../../assets/icon/primary/bookmark.png');
const bookmark_f = require('../../assets/icon/Interactive/bookmark-true.png');

const getBookmark = async (setBookmark, setUpdateBM) => {
  const { data: { message, BM } } = await axios.get('/library/bookmark', {
    params: {}
  });
  console.log(message, BM);
  setBookmark(BM);

  let newUpdateBM = [];
  BM.forEach(bm => {
    newUpdateBM.push({ id: bm.id, status: true });
  });
  setUpdateBM(newUpdateBM);
}

const toggleSubview = async (bookmarkView, setBookmarkView, updateBM,
  setBookmark, setUpdateBM = () => {}) => {
  // pop up animation
  let toValue = 400;
  if (!bookmarkView) {
    toValue = 0;
  }
  Animated.spring(
    bounceValue,
    {
      toValue: toValue,
      tension: 2,
      friction: 5,
      useNativeDriver: true
    }
  ).start();
  setBookmarkView(!bookmarkView);

  // close window: send updated bookmark list to backend
  if (updateBM.length !== 0) {
    console.log('updateBM', updateBM)
    const { data: { message } } = await axios.post('/library/bookmark', {}, {
      params: { updateBM: updateBM }
    });
    console.log(message);
    // refresh bookmark data
    await getBookmark(setBookmark, setUpdateBM)
  }
  /*else {  // open window: refresh bookmark data
    await getBookmark(setBookmark, setUpdateBM);
  }*/
  // return { message: "empty bookmark list", BM: [] }
}

const toggleUpdateBM = (list, setList, id, status, setStatus) => {
  let newList = list;
  let bmID = newList.findIndex(bm => bm.id === id);
  if (bmID > -1)
    newList[bmID].status = !newList[bmID].status;
  else
    newUpdateBM.push({ id: id, status: true })
  setList(newList);
  setStatus(!status);
}

const saveArticle = async (id, status) => {
  const {
    data: { message },
  } = await axios.post('/library/bookmark/article', {}, {
    params: { id: id, status: status }
  });
  console.log(message);
}

const getArtStatus = async (id, setStatus) => {
  const {
    data: { message, artStatus },
  } = await axios.get('/library/bookmark/article/single', {
    params: { id: id }
  });
  console.log(message, '\nartStatus', artStatus);
  setStatus(artStatus);
}

const ArticleSingle = ({ art, updateBM, setUpdateBM, bookmarkView }) => {
  const getImgSrc = (pic) => {
    return pic.split('/').length > 1 ?
      require(`../../assets/image/Topic/${pic.split('/')[3].split('.')[0]}.${pic.split('/')[3].split('.')[2]}`) :
      require(`../../assets/image/Topic/${pic}`)
  }
  const [status, setStatus] = useState(art.bookmark);
  console.log(art.title, art.bookmark, status)
  useEffect(() => {
    setStatus(art.bookmark);
  }, [bookmarkView]);

  return (
    <View style={styles.topic}>
      <View style={styles.bookmarkBlock}>
        <TouchableOpacity style={{ display: 'flex' }} onPress={() => {
          toggleUpdateBM(updateBM, setUpdateBM, art.id, status, setStatus)
        }}>
          <Image source={status ? bookmark_t : bookmark_f} style={styles.bookmark} />
        </TouchableOpacity>
      </View>
      <ImageBackground source={getImgSrc(art.pic)}
        style={{ height: 200, width: 200 }}
        imageStyle={{ borderRadius: 20 }}>
        <LinearGradient colors={['#00000000', '#323333']}
          style={styles.imageGradient} />
      </ImageBackground>
      <Text numberOfLines={2} style={styles.artTitle}>{art.title}</Text>
    </View>
  )
}

const Bookmark = ({ bookmarkView, setBookmarkView, bookmark, setBookmark }) => {
  const [updateBM, setUpdateBM] = useState([]); // [...{ id, status }]

  useEffect(() => {
    getBookmark(setBookmark, setUpdateBM);
  }, [])
  console.log('bookmark', bookmark)
  return (
    <Animated.View style={[styles.subView, { transform: [{ translateY: bounceValue }] }]}>
      <View style={styles.title}>
        <View />
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}> Your Saved </Text>
        <TouchableOpacity onPress={() => {
          toggleSubview(bookmarkView,
                        setBookmarkView,
                        updateBM,
                        setBookmark,
                        setUpdateBM)
        }}>
          <Image source={cancelIcon} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} style={styles.blocks}>
        {bookmark.map((art, idx) => (
          <ArticleSingle key={idx}
            art={art}
            updateBM={updateBM}
            setUpdateBM={setUpdateBM}
            getBookmark={getBookmark}
            bookmarkView={bookmarkView} />
        ))}
      </ScrollView>
    </Animated.View>
  )
}

export { Bookmark, toggleSubview, saveArticle, getArtStatus };