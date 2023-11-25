import React from "react";
import { StyleSheet, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Note } from "./types";

interface EditModalProps {
  visible: boolean;
  notaEditando: Note | null;
  tituloEditando: string;
  contenidoEditando: string;
  onSave: () => void;
  onCancel: () => void;
  onTitleChange: (text: string) => void;
  onContentChange: (text: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  notaEditando,
  tituloEditando,
  contenidoEditando,
  onSave,
  onCancel,
  onTitleChange,
  onContentChange,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitulo}>Editar Nota</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Nuevo Título"
            value={tituloEditando}
            onChangeText={onTitleChange}
          />
          <TextInput
            style={[styles.modalInput, styles.modalContenidoInput]}
            placeholder="Nuevo Contenido"
            multiline
            value={contenidoEditando}
            onChangeText={onContentChange}
          />
          <TouchableOpacity
            style={styles.botonAgregar}
            onPress={onSave}
          >
            <Text style={styles.textoBoton}>Guardar cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonEliminar}
            onPress={onCancel}
          >
            <Text style={styles.textoBoton}>Cancelar</Text>
          </TouchableOpacity>
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
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  modalContenidoInput: {
    height: 80,
  },
  botonEliminar: {
    backgroundColor: "#FF0000",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  botonAgregar: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  textoBoton: {
    fontSize: 16,
    color: "#fff",
  },
});

export default EditModal;
