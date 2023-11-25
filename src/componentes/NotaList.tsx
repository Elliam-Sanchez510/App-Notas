import React from "react";
import { StyleSheet, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Note } from "./types";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

interface NotaListProps {
    notas: Note[];
    onEdit: (nota: Note) => void;
    onDelete: (nota: Note) => void;
}

const NotaList: React.FC<NotaListProps> = ({ notas, onEdit, onDelete }) => {
    return (
        <FlatList
            data={notas}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.nota}>
                    <Text style={styles.tituloNota}>{item.titulo}</Text>
                    <Text style={styles.contenidoNota}>{item.contenido}</Text>
                    <View style={styles.botones}>
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={() => onEdit(item)}
                        >
                            <FontAwesome name="edit" size={28} color="#2196f3" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={() => onDelete(item)}
                        >
                            <AntDesign name="delete" size={28} color="#FF0000" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    nota: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    tituloNota: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    contenidoNota: {
        fontSize: 16,
        color: "#555",
    },
    botones: {
        flexDirection: "row",
        marginTop: 15,
    },
    boton: {
        flex: 1,
        height: 40,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    textoBoton: {
        fontSize: 16,
        color: "#fff",
    },
});

export default NotaList;
