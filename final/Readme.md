# Prenada

## 在 localhost 安裝與測試之詳細步驟
### 安裝指令
```
cd prenada
yarn install:all
```
安裝完後請在 /prenada/backend目錄下放入.env檔

然後在 /prenada 目錄下開啟前後端進行測試：
```
yarn start
yarn server
```
### 資料庫串接
同hack2新增.env檔案，檔案內需包含：
```
MONGO_URL=
MODE=
```

### 資料匯入方式
.env檔案設定為`MODE=Reset`會初始化checkList及Library
**!! 請助教第一次使用時要 reset !!**

### 瀏覽方式
本服務最佳的瀏覽方式是用**手機**觀看，主要以Web App的UI/UX原則進行設計，但若在電腦上點開服務的頁面使用也可以。

### 登入之帳密
帳號：testuser
密碼：testpwd


## 重點測試
### Home Page
![](https://i.imgur.com/Ehzcpu8.png)![](https://i.imgur.com/bOV29tF.png)

* Checklist 
    * 最上面的部分顯示checklist的內容
    * 將Checklist 的項目向左滑，可以顯示刪除按鈕，點擊可刪除該項checklist
    * 點擊"Create your own Checklist"後會跳出新增Checklist的modal，並disable其他按鈕。點擊modal右側的灰色勾勾可以儲存新的Checklist到資料庫，點擊右上角的x會關閉Modal並不儲存。
* Body Data 有當周的簡單統計，點選"See All"可以轉導至Body Data頁籤
* Tips to you 顯示孕婦相關知識文章，可以從捷徑點選文章主題

### Checklist
![](https://i.imgur.com/w7g4U6Z.png)![](https://i.imgur.com/TCKsm0Q.png)![](https://i.imgur.com/i8HPxSX.png)![](https://i.imgur.com/1ncYCLn.png)


* 點選某一周進入，右下角的"+"可以新增Checklist
* 點擊Checklist的項目，會進入細節檢視頁面。點擊細節檢視頁面的右上角，可進入編輯模式修改細節，再點擊save可儲存修改；點擊discard可以放棄修改。
* 點擊打勾可確認checklist已完成
* 點擊愛心代表"喜歡這個項目"，有愛心的項目會排序在較上方。


### Library
![](https://i.imgur.com/gCLiwvb.png)
* 最上方可以輸入關鍵字搜尋文章，文章的標題有含該關鍵字的都會被列出，搜尋到的文章可點選進入文章頁面
* 點選右上角的書籤圖示可以檢視目前的書籤頁內容
* 點選下面的block可以進入該分類，並列出該類別的所有文章
* 點選文章標題可閱讀內容、也可在文章頁面把

![](https://i.imgur.com/hQZOx7e.png)
* 在分類頁面，下方列出該分頁所包含的文章，點選後進入文章頁面
* 同上一張圖，點選右上角的書籤圖示可以檢視目前的書籤頁內容
* 在書籤頁可以將文章從書籤頁中刪除

![](https://i.imgur.com/La17nPJ.png)
* 在文章的頁面，點選右上角的書籤圖示可以新增或刪除文章到書籤頁

### Body Data
![](https://i.imgur.com/Dtjy3Fi.png)
![](https://i.imgur.com/qBidDer.png)
![](https://i.imgur.com/Enzfzlb.png)
* 上方有四個頁籤可以切換
* Overview提供water, sleep, symptom的summary，右下角的"+"可以新增資料
* 資料輸入完成點選"UPDATE YOUR DAY"可以將資料存到資料庫
* 重新整理後，Water, Sleep, Symptom頁籤可以檢視該週的輸入資料


## 工作分配
|修課同學|貢獻|
| -------- | -------- |
|電機四 b07401024 林羿成|BottomTab、Checklist、前期發想、UI/UX設計、訪談執行、系統說明文件|
|電機三 b09901078 葉軒易|Library, deployment|
|資管碩二 r10725045 蔡祐琳|Body Data、資料庫建置、影片製作|

|外掛組員||
| -------- | -------- |
|心理四 歐陽妍如|前期發想、訪談執行|
|資工博二 游子緒|前期發想、訪談執行、NavBar、Homepage、ActionIcon|
|電信碩一 林柏詠|前期發想、訪談執行、UI/UX設計|



### 有外掛的原因
組長林羿成同學同時有修「人機互動與介面」課程，在該門課程中需要把他們在 Figma 上已經設計好約 70% 的 medium-fi prototype 實際做成 App，但「人機介面與設計」課程的同組同學對於網頁和 App 設計並沒有相關經驗，加上web這門課需要做一個 Final project 但還沒有主題，因此兩門課的同學決定一起合作，將這個 Web App 完整設計出來。
