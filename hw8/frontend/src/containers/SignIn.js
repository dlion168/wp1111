import AppTitle from "../components/Title";
import LogIn from "../components/LogIn";
import { useChat } from './hooks/useChat';
const SignIn = ({me}) => {
    const { setMe, setSignedIn, displayStatus } = useChat();
    const handleLogin = (name) => {
        if (!name)
            displayStatus({
                type: "error",
                msg: "Missing user name",
            });
        else setSignedIn(true);
    }
    return (
        <>
            <AppTitle />
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </>
    );
}

export default SignIn;
