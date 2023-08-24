import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GlobalState = {
  setAlert: (alert: boolean) => void;
  setAlertConfirmed: (alertConfirmed: boolean | null) => void;
  alert: boolean;
  alertConfirmed: boolean | null;
};

// const

export const useAppStore = create<GlobalState>()(
  // devtools(
  persist<GlobalState>(
    (set) => ({
      setAlert: (alert: boolean) => {
        set((state) => {
          return {
            ...state,
            alert,
          };
        });

        // return new Promise;
      },
      alert: false,
      setAlertConfirmed: (alertConfirmed: boolean | null) =>
        set((state) => {
          return {
            ...state,
            alertConfirmed,
          };
        }),
      alertConfirmed: null,

      // updateGlobalState: (images, species, fullUpdateFetchedAt, fullUpdate = false) =>
      //   set((state) => {
      //     // Replace state
      //     if (fullUpdate) {
      //       return { images, species, fullUpdateFetchedAt };
      //     }

      //     // Merge state
      //     return {
      //       ...state,
      //       images: mergeArrayOfObjects(state.images, images),
      //       species: mergeArrayOfObjects(state.species, species),
      //     };
      //   }),

      // user: null,
      // setUser: (user) => set(() => ({ user })),

      // images: [],
      // addOrUpdateImage: (image) =>
      //   set((state) => {
      //     // Add
      //     const imageIndex = state.images.findIndex(({ filename }) => image.filename === filename);
      //     if (imageIndex === -1) {
      //       return { ...state, images: [...state.images, image] };
      //     }
      //     // Update
      //     const newImages = [...state.images];
      //     newImages[imageIndex] = { ...newImages[imageIndex], ...image };
      //     return { ...state, images: newImages };
      //   }),
      // deleteImage: (filename) =>
      //   set((state) => ({ ...state, images: state.images.filter((image) => image.filename !== filename) })),

      // species: [],
      // addOrUpdateSpecies: (species) =>
      //   set((state) => {
      //     // Add
      //     const speciesIndex = state.species.findIndex(({ id }) => species.id === id);
      //     if (speciesIndex === -1) {
      //       return { ...state, species: [...state.species, species] };
      //     }
      //     // Update
      //     const newSpecies = [...state.species];
      //     newSpecies[speciesIndex] = { ...newSpecies[speciesIndex], ...species };
      //     return { ...state, species: newSpecies };
      //   }),
      // deleteSpecies: (id) =>
      //   set((state) => ({ ...state, species: state.species.filter((species) => species.id !== id) })),
    }),
    {
      name: "artdatabanken",
      // storage: customStorage,
    },
  ),
  // )
);
