import { Image, TouchableOpacity } from 'react-native';

// Ashu: I know this looks stupid but it's a limitation of React Native
// https://reactnative.dev/docs/images#static-image-resources
const icons = {
    'empty': require('../assets/icon/empty.png'),
    'heart-t': require('../assets/icon/Interactive/heart-true.png'),
    'heart-f': require('../assets/icon/Interactive/heart-false.png'),
    'checkBox-t': require('../assets/icon/Interactive/checkBox-true.png'),
    'checkBox-f': require('../assets/icon/Interactive/checkBox-false.png'),
    'bookmark-t': require('../assets/icon/Interactive/bookmark-true.png'),
    'bookmark-f': require('../assets/icon/Interactive/bookmark-false.png'),
    'archive-s': require('../assets/icon/secondary/archive.png'),
    'trash-s': require('../assets/icon/secondary/trash.png'),
    'bell-s': require('../assets/icon/secondary/bell.png'),
    'cheveron-left-s': require('../assets/icon/secondary/cheveron-left.png'),
    'cheveron-right-s': require('../assets/icon/secondary/cheveron-right.png'),
    'cheveron-up-s': require('../assets/icon/secondary/cheveron-up.png'),
    'cheveron-down-s': require('../assets/icon/secondary/cheveron-down.png'),
    'reply-s': require('../assets/icon/secondary/reply.png'),
    'bookmark-s': require('../assets/icon/secondary/bookmark.png'),
    'dots-horizontal-s': require('../assets/icon/secondary/dots-horizontal.png'),
    'check-s': require('../assets/icon/secondary/check.png'),
    'cog-s': require('../assets/icon/secondary/cog.png'),
    'trash-s': require('../assets/icon/secondary/trash.png'),
    'x-s': require('../assets/icon/secondary/x.png'),
    'pencil-s': require('../assets/icon/secondary/pencil.png'),
    'pencil-p': require('../assets/icon/primary/pencil.png'),
    'save-s': require('../assets/icon/secondary/save.png'),
};

const ActionIcon = ({ iconName, onPress, size=20, padding=6, opacity=1.0 }) => {
    return (
        <TouchableOpacity style={{padding: padding}} onPress={onPress} >
            <Image source={icons[iconName]} style={{height: size, width: size, opacity: opacity}} />
        </TouchableOpacity>
    );
};

export { ActionIcon };
