import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Pet } from "../model/Pet.model";

const initialState: { pets: Pet[] } = {
  pets: [
    { id: "1", name: "dog", num: 1 },
    { id: "2", name: "cat", num: 2 },
    { id: "3", name: "bird", num: 3 },
    { id: "4", name: "rabbit", num: 4 },
  ],
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    addPet: (state, action) => {
      const newPet = new Pet(
        action.payload.id,
        action.payload.name,
        state.pets.length
      );
      state.pets = [newPet, ...state.pets];
    },
    setPetNum: (state, action) => {
      const setNum = (pet: Pet): Pet => {
        if (pet.num === action.payload.columnNum) {
          const newPet = new Pet(
            pet.id,
            pet.name,
            action.payload.prevColumnNum
          );
          return newPet;
        } else if (pet.num === action.payload.prevColumnNum) {
          const newPet = new Pet(pet.id, pet.name, action.payload.columnNum);
          return newPet;
        } else {
          return pet;
        }
      };

      state.pets = state.pets.map((pet) => setNum(pet));
    },
  },
});

// actionをexport
export const { addPet, setPetNum } = petSlice.actions;

// stateをexport
export const pets = (state: RootState) => state.petsState;

// reducerをexport
export default petSlice.reducer;
