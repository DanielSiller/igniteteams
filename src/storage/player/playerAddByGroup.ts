import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";

import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playerGetByGroup } from "./playerGetByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storagePlayers = await playerGetByGroup(group);

    const playerAlreadyExists = storagePlayers.filter(player => player.name === newPlayer.name);

    if(playerAlreadyExists.length) {
      throw new AppError('Já existe uma pessoa cadastrado com esse nome no grupo.')
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer])
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}