import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Note } from "./types";

interface SingleNoteProps {
    nota: Note;
    onEdit: () => void;
    onDelete: () => void;
}

const SingleNote: React.FC<SingleNoteProps> = ({ nota, onEdit, onDelete }) => {
    return (
        <View style={styles.nota}>
            <Text style={styles.tituloNota}>{nota.titulo}</Text>
            <Text style={styles.contenidoNota}>{nota.contenido}</Text>
            <View style={styles.botones}>
                <TouchableOpacity
                    style={[styles.boton, { backgroundColor: "#007AFF" }]}
                    onPress={onEdit}
                >
                    <Text style={styles.textoBoton}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.boton, { backgroundColor: "#FF0000" }]}
                    onPress={onDelete}
                >
                    <Text style={styles.textoBoton}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
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

export default SingleNote;
