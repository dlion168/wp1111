import { StyleSheet, ScrollView, Text, Pressable, View } from 'react-native';
import { NavBar } from '../NavBar';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFFFFF'
  },
  title: {
    margin: 5,
    padding:10,
    backgroundColor: "#F9FAFB",
    borderRadius: 5
  }
})

const DoSearch = ({ setDosearch, searchRes, setSearchRes, articleClick }) => {
  return (
    <>
      <NavBar centerText='Library'
              leftText='Back' leftIcon='cheveron-left-s' leftIconOnPress={() => {setDosearch(false);setSearchRes([]);}} />
      <ScrollView style={styles.body}>
        { searchRes.length > 0 ?
          searchRes.map((art, idx) => (
            <Pressable key={idx} style={styles.title} onPress={() => {setDosearch(false);articleClick(art)}}>
              <Text style={{ color: 'black' }}> {art.title} </Text>
            </Pressable>
          )) :
          <View style={styles.title}>
            <Text style={{ color: 'black', alignSelf: 'center' }}> Cannot find articles... </Text>
          </View>
        }
      </ScrollView>
    </>
  )
}

export { DoSearch };