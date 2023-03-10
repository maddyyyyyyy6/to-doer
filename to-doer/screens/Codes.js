import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Code from "../components/Code";
export default function Codes({ navigation }) {
    const [codes, setCodes] = useState([]);
    const [languages, setLanguages] = useState([
        "Python",
        "Javascript",
        "C++",
        "Swift",
        "Scala",
        "Rust",
        "Bash",
    ]);
    const isFocused = useIsFocused();

    // get list from async storage

    const getData = async () => {
        try {
            const datalist = await AsyncStorage.getItem("@codes");
            const data = JSON.parse(datalist) || [];
            const codeslist = data;
            setCodes(codeslist);
        } catch (e) {
            //
        }
    };

    const handleCodeInput = () => {
        navigation.navigate("CodeInput");
    };

    // console.log(list);
    useEffect(() => {
        if (isFocused) {
            // Fetch data or trigger any function here
            getData();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.CodesContainer}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchText}
                            placeholder="Search Codes"
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.chipsContainer}>
                    <ScrollView
                        bouncesZoom={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {/* <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.chipItem}
                        >
                            <MaterialCommunityIcons
                                name="pin"
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[styles.chipItem, styles.chipSelecteds]}
                        >
                            <AntDesign
                                name="star"
                                size={20}
                                color="black"
                                style={{ alignSelf: "center" }}
                            />
                        </TouchableOpacity> */}

                        {/* some chips for languages */}
                        {languages.map((language) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.chipItem, styles.chipSelecteds]}
                            >
                                <Text style={styles.chipText}>{language}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <ScrollView
                    style={styles.notoContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {codes.map((item) => (
                        <Code
                            key={item.id}
                            title={item.title}
                            code={item.code}
                            navigation={navigation}
                            language={item.language}
                        />
                    ))}
                </ScrollView>
                <View>
                    <TouchableOpacity
                        style={styles.newCodesBar}
                        onPress={handleCodeInput}
                    >
                        <Text style={styles.newCodeText}>New Code?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBFCFD",
        alignItems: "center",
        justifyContent: "center",
    },
    CodesContainer: {
        flex: 1,
        backgroundColor: "#FBFCFD",
        width: "100%",
        padding: 15,
        paddingTop: 10,
    },
    searchContainer: {
        // width: "100%",
        // height: 20,
    },
    searchBar: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: "#DFE3E6",
    },
    searchText: {
        fontSize: 20,
        color: "#DFE3E6",
        color: "#687076",
        fontWeight: "semibold",
        fontFamily: "Inter_400Regular",
    },
    headerContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        height: 50,
    },
    headerText: {
        fontFamily: "Inter_500Medium",
        fontSize: 21,
        flex: 1,
    },
    headerIcons: {
        marginLeft: 5,
    },
    chipsContainer: {
        flexDirection: "row",
        marginVertical: 9,
    },
    chipItem: {
        backgroundColor: "#DFE3E6",
        marginRight: 15,
        borderRadius: 11,
        // padding: 5,
        paddingVertical: 6,
        paddingHorizontal: 9,
    },
    chipText: {
        color: "#687076",
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "Inter_500Medium",
    },
    notoContainer: {
        flex: 1,
        width: "100%",
    },
    newCodesBar: {
        width: "100%",
        backgroundColor: "#DFE3E6",
        padding: 10,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: "#DFE3E6",
        marginTop: 9,
    },
    newCodeText: {
        fontSize: 20,
        color: "#687076",
        fontWeight: "medium",
        fontFamily: "Inter_400Regular",
    },
});
