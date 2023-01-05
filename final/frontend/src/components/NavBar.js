import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ActionIcon } from "./ActionIcon"
import { useCheckList } from './checkList/hooks/useCheckList';

const styles = StyleSheet.create({
    topSpace: {
        backgroundColor: '#F87171',
        height: 44,
    },
    body: {
        backgroundColor: '#F87171',
        height: 60,
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 8,
        paddingBottom: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
    },
    auxText: {
        fontSize: 16,
        color: '#FFFFFF',
        opacity: 0.6,
    },
})

const NavBar = ({
    leftIcon = 'empty', leftIconOnPress = () => { }, leftText = '',
    rightIcon = 'empty', rightIconOnPress = () => { }, rightText = '',
    centerText = 'w0', weekOnChange = (week) => { },
}) => {
    const { displayWeek, setDisplayWeek, curWeek, storeData } = useCheckList();
    let centerBox;
    if (centerText.startsWith('w') && !isNaN(centerText.slice(1))) {
        // const [week, setWeek] = useState(curWeek);
        weekOnChange(displayWeek);
        centerText = (displayWeek === 0) ? 'TTC' : 'Week ' + displayWeek;
        centerBox = <View style={styles.box}>
            <ActionIcon iconName={'cheveron-left-s'} onPress={() => {
                if (displayWeek === 0) return;
                setDisplayWeek(displayWeek - 1);
            }} size={24} padding={10} opacity={0.6} />
            <Text style={styles.title}>{centerText}</Text>
            <ActionIcon iconName={'cheveron-right-s'} onPress={() => {
                if (displayWeek === 40) return;
                setDisplayWeek(displayWeek + 1);
            }} size={24} padding={10} opacity={0.6} />
        </View>;
        leftIcon = displayWeek === curWeek ? 'empty' : 'reply-s';
        leftIconOnPress = () => { setDisplayWeek(curWeek) };
    } else {
        centerBox = <View style={styles.box}>
            <Text style={styles.title}>{centerText}</Text>
        </View>;
    }
    return (
        <View>
            {/* <View style={styles.topSpace} /> */}
            <View style={styles.body}>
                <View style={styles.box}>
                    <ActionIcon iconName={leftIcon} onPress={leftIconOnPress} size={24} padding={10} opacity={0.6} />
                    <Text style={styles.auxText}>{leftText}</Text>
                </View>
                {centerBox}
                <View style={styles.box}>
                    <Text style={styles.auxText}>{rightText}</Text>
                    <ActionIcon iconName={rightIcon} onPress={rightIconOnPress} size={24} padding={10} opacity={0.6} />
                    <Pressable
                        onPress={() => {
                            storeData("")
                        }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            Log Out
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export { NavBar }