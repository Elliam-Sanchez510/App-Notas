import React from "react";
import { StyleSheet, Modal, Text, TouchableOpacity, View } from "react-native";

interface DeleteModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalMessage}>Eliminar Nota</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.botonEliminar} onPress={onConfirm}>
                            <Text style={styles.textoBoton}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botonCancelar} onPress={onCancel}>
                            <Text style={styles.textoBoton}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 20,
        width: "80%",
    },
    modalMessage: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    botonEliminar: {
        backgroundColor: "#FF0000",
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        flex: 1,
        marginRight: 5,
    },
    botonCancelar: {
        backgroundColor: "#2196f3",
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        flex: 1,
        marginLeft: 5,
    },
    textoBoton: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
    },
});

export default DeleteModal;
