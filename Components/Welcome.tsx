import { Text, View } from "react-native";

type WelcomeProps = {
    name: string,
    age: number,
    gender: boolean,
}
export default function Welcome(props: WelcomeProps){
    return (
        <View>
            <Text>Hello {props.name}!</Text>
            <Text>You are {props.age}.</Text>
            <Text>You are a {props.gender ? "man" : "woman"}.</Text>
        </View>
    )
}