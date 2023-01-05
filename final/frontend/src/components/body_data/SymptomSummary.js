import { useReducer } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        backgroundColor: '#f0f9ff',
        borderRadius: 10,
        margin: 24,
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft:10,
        paddingRight:10,
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        gap: 10
    },
    text: {
        color: '#6B7280',
    },
    symList: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        paddingBottom: 10
    },
    symItem: {
        alignItems: 'center'
    },
    imgContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    img: {
        borderRadius: 30,
        height: 60,
        width: 60,
        backgroundColor: '#bae6fd',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chosenImg: {
        borderRadius: 30,
        height: 60,
        width: 60,
        backgroundColor: '#6b9ab3',
        alignItems: 'center',
        justifyContent: 'center'
    },
    times: {
        borderRadius: 10,
        height: 20,
        width: 20,
        backgroundColor: '#F87171',
        alignItems: 'center',
    },
    timesText: {
        color: '#FFFFFF',
    },
    image: {
        height: 45,
        width: 45,
    },
})

const initialState = { Cramps: false, Tender_breasts: false, Headache: false, Acne: false };
function reducer(state, action) {
    switch (action.type) {
        case 'Cramps':
            return { ...state, Cramps: !state.Cramps };
        case 'Tender breasts':
            return { ...state, Tender_breasts: !state.Tender_breasts };
        case 'Headache':
            return { ...state, Headache: !state.Headache };
        case 'Acne':
            return { ...state, Acne: !state.Acne };
        default:
            throw new Error();
    }
}

const SymptomSummary = ({ addMode, handleSymptomClick, symptoms }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const imgPath = {
        'Cramps': require('../../assets/image/BodyData/Symptom/Cramps.png'),
        'Tender breasts': require('../../assets/image/BodyData/Symptom/Tender Breasts.png'),
        'Headache': require('../../assets/image/BodyData/Symptom/Headache.png'),
        'Acne': require('../../assets/image/BodyData/Symptom/Acne.png'),
    }

    return (
        <View style={styles.body}>
            <View style={styles.title}>
                <Image
                    source={require('../../assets/image/BodyData/Symptom/Stethoscope.png')}
                    style={{ height: 30, width: 30, }}
                />
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, }} >Symptom</Text>
                    {addMode ? <></> :
                        <Text style={styles.text} >Happened this week</Text>
                    }
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
            <View style={styles.symList}>
                {
                    symptoms.map((obj, idx) => {
                        if (addMode)
                            return (
                                <TouchableOpacity
                                    style={styles.symItem}
                                    key={idx}
                                    onPress={() => {
                                        handleSymptomClick(obj.symptomName)
                                        dispatch({ type: obj.symptomName })
                                    }}
                                >
                                    <View style={state[obj.symptomName.replace(" ", "_")]
                                        ? styles.chosenImg : styles.img} >
                                        <Image
                                            source={imgPath[obj.symptomName]}
                                            style={styles.image}
                                        />
                                    </View>
                                    <Text style={styles.text} >{obj.symptomName}</Text>
                                </TouchableOpacity >);
                        else
                            return (
                                < View style={styles.symItem} key={idx}>
                                    <View style={styles.imgContainer} >
                                        <View style={styles.img}>
                                            <Image
                                                source={imgPath[obj.symptomName]}
                                                style={styles.image}
                                            />
                                        </View>
                                        <View style={styles.times}>
                                            <Text style={styles.timesText} >{obj.times}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.text} >{obj.symptomName}</Text>
                                </View>
                            )
                    })
                }
            </View>
        </View >
    );
}
export default SymptomSummary;