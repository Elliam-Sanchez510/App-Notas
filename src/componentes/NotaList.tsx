import React from "react";
import { StyleSheet, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Note } from "./types";

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
                            style={[styles.boton, { backgroundColor: "#007AFF" }]}
                            onPress={() => onEdit(item)}
                        >
                            <Text style={styles.textoBoton}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.boton, { backgroundColor: "#FF0000" }]}
                            onPress={() => onDelete(item)}
                        >
                            <Text style={styles.textoBoton}>Eliminar</Text>
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
