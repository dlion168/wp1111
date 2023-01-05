import React from "react";
import { Modal, StyleSheet, Text, View, Button } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // backgroundColor: "#000000",
    // opacity: 0.7
  },
  modalView: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  taskCardFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB', // gray/50
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  iconalign: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    margin: 12,
  },
  iconContainer: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
  },
});

const Alert = ({ description, modalVisible, setModalVisible }) => {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>{description}</Text>
          <Button
            onPress={() => setModalVisible(false)}
            title="OK"
            color="#F87171"
            accessibilityLabel="OK"
          />
        </View>
      </View>
    </Modal>)
}

export default Alert
