import React, { useState } from "react";
import {TextInput, Modal, StyleSheet, Text, Pressable, TouchableOpacity, View } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ActionIcon } from '../ActionIcon';
import { useCheckList } from "./hooks/useCheckList";
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
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
      elevation: 5
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
    iconalign:{
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

const AddModal = ({modalVisible, setModalVisible}) => {
  const [text, onChangeText] = useState("");
  const [checked , setChecked] = useState(false);
  const { displayWeek, postChecklistItem } = useCheckList();
  return (
    <Modal
    animationType = "slide"
    transparent = {true}
    visible = {modalVisible}
    onRequestClose={() => {
      setModalVisible(false);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Pressable
                style={[styles.button,{alignSelf:"flex-end"}]}
                onPress={() => setModalVisible(!modalVisible)}
              >
          <FontAwesome5 name ="times" size={18} color='#f87171' /* gray/200 */ solid />
        </Pressable>
        <View style={styles.taskCardFlex}> 
          <ActionIcon size={20} padding={18} iconName={checked ? 'checkBox-t' : 'checkBox-f'}
                      onPress={(event) => {
                            setChecked(!checked);
                        }
                    } />
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Add a Checklist"
          />
          <Pressable
            style={[styles.button]}
            onPress={() => {
              setModalVisible(false)
              if(text.trim().length != 0)
                postChecklistItem({week: displayWeek, checked: checked, text:text, liked:false})
                onChangeText('')
            }}
          >
            <FontAwesome5 name ="check" size={18} color='#E5E7EB' /* gray/200 */ solid />
          </Pressable>
        </View>
        <View style={styles.iconalign}>
          <TouchableOpacity style={styles.iconContainer}><FontAwesome5 name ="calendar" size={18} color='#F87171' /* red/50 */ solid /></TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}><FontAwesome5 name ="map-marker-alt" size={18} color='#F87171' /* red/50 */ solid /></TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}><FontAwesome5 name ="sync-alt" size={18} color='#F87171' /* red/50 */ solid /></TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}><FontAwesome5 name ="pen" size={18} color='#F87171' /* red/50 */ solid /></TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>)
}

export default AddModal
