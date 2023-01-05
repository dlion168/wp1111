import { Router } from "express";
import Theme from "../models/Theme";
import Article from '../models/Article';
import db from '../db';
import themeData from '../../themeData.json';
import articleData from '../../articleData.json';

db.connect();

const getThemeData = async () => {
  try {
    if (process.env.MODE === 'Reset') {
      console.log('Reset themeData');
      await Theme.deleteMany({});
      await Theme.insertMany(themeData);
    }

    const ext = await Theme.find({});
    if (ext === undefined || ext.length === 0)
      return { message: 'Cannot find themeData', themeData: [] }
    return { message: 'Get themeData successfully', 
             themeData: ext }
  } catch(err) {throw new Error("Get or Reset themeData error: " + err);}
}

const getArticleData = async (topicName) => {
  try {
    if (process.env.MODE === 'Reset') {
      console.log('Reset articleData');
      await Article.deleteMany({});
      await Article.insertMany(articleData);
    }

    const ext = await Article.find({ topic: topicName });
    if (ext === undefined || ext.length === 0)
      return { message: 'Cannot find target articleData', ArticleData: [] }
    return { message: 'Get articleData successfully', 
             ArticleData: ext }
  } catch(err) {throw new Error("Get or Reset articleData error: " + err);}
}

const getBookmark = async () => {
  try {
    const bookmark = await Article.find({ bookmark: true });
    if (bookmark === undefined || bookmark.length === 0)
      return { message: 'Cannot find the bookmark list', BM: [] }
    return { message: 'Get the bookmark list successfully', 
             BM: bookmark }
  } catch(err) {throw new Error("Get bookmarks error: " + err);}
}

const postBookmark = async (updateBM) => {
  try {
    updateBM.forEach(bm => {
      Article.findOne({ id: bm.id }, (err, doc) => {
        if (err)
          throw new Error("find articles error when postBookmark: " + err);
        if (doc) {
          doc.bookmark = bm.status;
          doc.save();
        }
      });
    });
    return { message: 'Post the bookmark list successfully' };
  } catch(err) {throw new Error("Post bookmarks error: " + err);}
}

const postArtBM = async (id, status) => {
  try {
    Article.findOne({ id: id }, (err, doc) => {
      if (err) 
        throw new Error("find articles error when postArtBM: " + err);
      if (doc) {
        doc.bookmark = status;
        doc.save();
      }
    });
    return { message: 'Post article bookmark successfully' };
  } catch(err) {throw new Error("Post article bookmark error: " + err);}
}

const getArtStatus = async (id) => {
  try {
    const data = await Article.findOne({ id: id });
    if (data)
      return { message: 'Get article Status successfully', artStatus: data.bookmark }
    else
      return { message: 'Cannot find the article', artStatus: false }
  } catch(err) {throw new Error("Get article Status error: " + err);}
}

const getSearch = async (search) => {
  try {
    const data = await Article.find({});
    let art = [];
    data.forEach(data => {
      if (data.title.includes(search)) {
        art.push(data);
      }
    })
    if (Object.keys(art).length > 0)
      return { message: 'Get search result successfully', artData: art }
    else
      return { message: 'Cannot find the result of search', artData: [] }
  } catch(err) {throw new Error("Get search error: " + err);}
}

const router = Router();
router.get('/', async (req, res) => {
  let result = await getThemeData();
  res.status(200).send(result);
})
router.get('/search', async (req, res) => {
  let result = await getSearch(req.query.search);
  res.status(200).send(result);
})
router.get('/topic', async (req, res) => {
  let result = await getArticleData(req.query.topicName);
  res.status(200).send(result);
})
router.get('/bookmark', async (req, res) => {
  let result = await getBookmark();
  res.status(200).send(result);
})
router.post('/bookmark', async (req, res) => {
  console.log('updateBM', req.query.updateBM)
  let result = await postBookmark(req.query.updateBM);
  res.status(200).send(result);
})
router.post('/bookmark/article', async (req, res) => {
  let result = await postArtBM(req.query.id, req.query.status);
  res.status(200).send(result);
})
router.get('/bookmark/article/single', async (req, res) => {
  let result = await getArtStatus(req.query.id);
  console.log('result', result)
  res.status(200).send(result);
})

export default router;