import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotaList from "./NotaList";
import EditModal from "./EditModal";
import { Note } from "./types";
import DeleteModal from "./DeleteModal";

const Notas: React.FC = () => {
    const [notas, setNotas] = useState<Note[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [notaEditando, setNotaEditando] = useState<Note | null>(null);
    const [tituloEditando, setTituloEditando] = useState("");
    const [contenidoEditando, setContenidoEditando] = useState("");
    const [nuevaNota, setNuevaNota] = useState<Note>({ titulo: "", contenido: "" });

    const cargarNotas = async () => {
        try {
            const notasGuardadas = await AsyncStorage.getItem("notas");
            if (notasGuardadas) {
                setNotas(JSON.parse(notasGuardadas));
            }
        } catch (error) {
            console.error("Error cargando notas:", error);
        }
    };

    const guardarNotas = async (nuevasNotas: Note[]) => {
        try {
            await AsyncStorage.setItem("notas", JSON.stringify(nuevasNotas));
        } catch (error) {
            console.error("Error guardando notas:", error);
        }
    };

    useEffect(() => {
        cargarNotas();
    }, []);

    const agregarNota = () => {
        if (nuevaNota.titulo.trim() !== "" || nuevaNota.contenido.trim() !== "") {
            const nuevasNotas = [...notas, nuevaNota];
            setNotas(nuevasNotas);
            guardarNotas(nuevasNotas);
            setNuevaNota({ titulo: "", contenido: "" });
        }
    };

    const abrirModalEdicion = (nota: Note) => {
        setNotaEditando(nota);
        setTituloEditando(nota.titulo);
        setContenidoEditando(nota.contenido);
        setModalVisible(true);
    };

    const cerrarModalEdicion = () => {
        setNotaEditando(null);
        setModalVisible(false);
    };

    const guardarEdicionNota = () => {
        if (notaEditando) {
            const nuevasNotas = notas.map((n) => {
                if (n === notaEditando) {
                    return {
                        ...n,
                        titulo: tituloEditando,
                        contenido: contenidoEditando,
                    };
                }
                return n;
            });

            setNotas(nuevasNotas);
            guardarNotas(nuevasNotas);
            cerrarModalEdicion();
        }
    };

    const eliminarNota = (nota: Note) => {
        setNotaEditando(nota);
        setDeleteModalVisible(true);
    };

    const confirmarEliminar = () => {
        const nuevasNotas = notas.filter((n) => n !== notaEditando);
        setNotas(nuevasNotas);
        guardarNotas(nuevasNotas);
        setDeleteModalVisible(false);
    };

    const cancelarEliminar = () => {
        setDeleteModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Mi Block de Notas</Text>
            <NotaList
                notas={notas}
                onEdit={abrirModalEdicion}
                onDelete={eliminarNota}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Título"
                    value={nuevaNota.titulo}
                    onChangeText={(text) => setNuevaNota({ ...nuevaNota, titulo: text })}
                />
                <TextInput
                    style={[styles.input, styles.contenidoInput]}
                    placeholder="Contenido"
                    multiline
                    value={nuevaNota.contenido}
                    onChangeText={(text) => setNuevaNota({ ...nuevaNota, contenido: text })}
                />
                <TouchableOpacity
                    style={styles.botonAgregar}
                    onPress={agregarNota}
                >
                    <Text style={styles.textoBoton}>Agregar nota</Text>
                </TouchableOpacity>
            </View>
            <EditModal
                visible={modalVisible}
                notaEditando={notaEditando}
                tituloEditando={tituloEditando}
                contenidoEditando={contenidoEditando}
                onSave={guardarEdicionNota}
                onCancel={cerrarModalEdicion}
                onTitleChange={setTituloEditando}
                onContentChange={setContenidoEditando}
            />
            <DeleteModal
                visible={deleteModalVisible}
                onConfirm={confirmarEliminar}
                onCancel={cancelarEliminar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#FFFFFF",
    },
    contenidoInput: {
        height: 80,
    },
    botonAgregar: {
        backgroundColor: "#2196f3",
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    textoBoton: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
    },
});

export default Notas;
