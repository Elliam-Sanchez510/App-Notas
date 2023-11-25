import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Note {
  titulo: string;
  contenido: string;
}

const Notas: React.FC = () => {
  const [notas, setNotas] = useState<Note[]>([]);
  const [nuevaNota, setNuevaNota] = useState<Note>({ titulo: "", contenido: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [notaEditando, setNotaEditando] = useState<Note | null>(null);
  const [tituloEditando, setTituloEditando] = useState("");
  const [contenidoEditando, setContenidoEditando] = useState("");

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
    const nuevasNotas = notas.filter((n) => n !== nota);
    setNotas(nuevasNotas);
    guardarNotas(nuevasNotas);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi Block de Notas</Text>
      <FlatList
        style={styles.scrollContainer}
        data={notas}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.nota}>
            <Text style={styles.tituloNota}>{item.titulo}</Text>
            <Text style={styles.contenidoNota}>{item.contenido}</Text>
            <View style={styles.botones}>
              <TouchableOpacity
                style={[styles.boton, { backgroundColor: "#007AFF" }]}
                onPress={() => abrirModalEdicion(item)}
              >
                <Text style={styles.textoBoton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.boton, { backgroundColor: "#FF0000" }]}
                onPress={() => eliminarNota(item)}
              >
                <Text style={styles.textoBoton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cerrarModalEdicion}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Editar Nota</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nuevo Título"
              value={tituloEditando}
              onChangeText={(text) => setTituloEditando(text)}
            />
            <TextInput
              style={[styles.modalInput, styles.modalContenidoInput]}
              placeholder="Nuevo Contenido"
              multiline
              value={contenidoEditando}
              onChangeText={(text) => setContenidoEditando(text)}
            />
            <TouchableOpacity
              style={styles.botonAgregar}
              onPress={guardarEdicionNota}
            >
              <Text style={styles.textoBoton}>Guardar cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botonEliminar}
              onPress={cerrarModalEdicion}
            >
              <Text style={styles.textoBoton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scrollContainer: {
    flex: 1,
  },
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
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  textoBoton: {
    fontSize: 16,
    color: "#fff",
  },
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
});

export default Notas;
