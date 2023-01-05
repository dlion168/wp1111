import ChecklistByTrimester from '../components/checkList/ChecklistByTrimester';
import ChecklistPerWeek from '../components/checkList/ChecklistPerWeek';
import { useCheckList } from '../components/checkList/hooks/useCheckList';
import { useState } from 'react';

const Checklist = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [trimester, setTrimester] = useState(1);
    const [viewMonth, setViewMonth] = useState(true);
    const { setDisplayWeek } = useCheckList()
    return (
        <>
            { viewMonth ? 
            <ChecklistByTrimester 
                search={search} 
                setSearch={setSearch}
                trimester={trimester}
                setTrimester={setTrimester}
                navigation = {navigation}
                setViewWeek = {setDisplayWeek}
                setViewMonth = {setViewMonth}>
            </ChecklistByTrimester>:
            <ChecklistPerWeek setViewMonth={setViewMonth}>
            </ChecklistPerWeek>
            }
        </>
    )
    }
export default Checklist;