import React, { memo, useState, useEffect } from "react";
import { Text, View, Modal, StyleSheet } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import {
  insertFavNumMutation,
  updateFavNumMutation,
  insertFavNumHistoryMutation,
  getFavNumber,
} from "../../graphql";
import { Button, Background, TextInput } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../core/theme";

const HomeScreen = () => {
  const [insertFavNumM] = useMutation(insertFavNumMutation);
  const [insertFavNumHistory] = useMutation(insertFavNumHistoryMutation);
  const [updateFavNum] = useMutation(updateFavNumMutation);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [favNumber, setFavNumber] = useState({ value: "", error: "" });
  const [uid, setUid] = useState<any>("");

  useEffect(() => {
    getUid();
    checkFavNumber();
    (async () => {
      const storeData = await AsyncStorage.getItem("favNum");
      if (storeData) {
        setFavNumber({ value: storeData, error: "" });
        console.log(storeData);
      } else {
        setIsEdit(false);
        setModalVisible(true);
        
      }
    })();
  }, []);

  const updateHistory = async (id: any) => {
    await insertFavNumHistory({
      variables: { number: favNumber.value, user_id: uid, fav_num_id: id },
    })
      .then(() => {
        setModalVisible(!modalVisible);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const storeFavNumber = async (value: string) => {
    try {
      await AsyncStorage.setItem("favNum", value);
    } catch (e) {
      // saving error 
    }
  };

  const checkFavNumber = async () => {
    try {
      const val = await AsyncStorage.getItem("favNum");
      if (val != null) {
        setIsEdit(true);
        setFavNumber({ value: val, error: "" });
        setModalVisible(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUid = async () => {
    try {
      await AsyncStorage.getItem("uid").then((data) => {
        setUid(data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const _addFavNumber = async () => {
    await insertFavNumM({
      variables: { number: favNumber.value, user_id: uid },
    })
      .then((val) => {
        let data = val.data.insert_fav_num.returning[0];
        updateHistory(data.id);
        storeFavNumber(data.number);
        setIsEdit(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const _editFavNumber = async () => {
    const data = await updateFavNum({
      variables: { number: favNumber.value, user_id: uid },
    });
    let obj = data.data.update_fav_num.returning[0];
    updateHistory(obj.id);
    storeFavNumber(obj.number);
  };

  const setUpdate = () => {
    const { loading, error, data } = useQuery(getFavNumber, {
      variables: { user_id: uid },
    });
    if (loading) return null;
    if (error) return `Error! ${error.message}`;
    if(data.fav_num.length != 0){
      storeFavNumber(data.fav_num[0].number)
    }
    return data.fav_num.length != 0 ? <></> : null;
  };

  return (
    <Background>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.modalText}>
            {`My favorite number is ${favNumber.value}`}
          </Text>
          <Text style={styles.modalText}></Text>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {(isEdit ? "Edit" : "Add") + " your favorite number"}
              </Text>
              <TextInput
                label="Favorite Number"
                returnKeyType="done"
                value={favNumber.value}
                onChangeText={(text) =>
                  setFavNumber({ value: text, error: "" })
                }
                error={!!favNumber.error}
                errorText={favNumber.error}
              />
              <Button
                mode="contained"
                onPress={() => {
                  isEdit ? _editFavNumber() : _addFavNumber();
                }}
              >
                Enter
              </Button>
            </View>
          </View>
        </Modal>
        {setUpdate()}
        <Button mode="contained" onPress={_editFavNumber}>
          Update
        </Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 18,
    color: theme.colors.primary,
    textAlign: "center",
  },
});
export default memo(HomeScreen);
