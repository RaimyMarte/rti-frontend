import { createSlice } from '@reduxjs/toolkit';

// interface NestedMenu {
//   isOpen: boolean;
// }

interface MainMenu {
  isOpen: boolean;
  [key: string]: any
}

interface InitialState {
  accountsMenu: MainMenu;
  adminMenu: MainMenu;
  lettersMenu: MainMenu;
  maintenanceMenu: MainMenu;
  managmentMenu: MainMenu;
}

const initialState: InitialState = {
  accountsMenu: {
    isOpen: false,
  },
  adminMenu: {
    isOpen: false,
  },
  lettersMenu: {
    isOpen: false,
  },
  maintenanceMenu: {
    isOpen: false,
  },
  managmentMenu: {
    isOpen: false,
    administrationMenu: {
      isOpen: false,
    },
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onToggleMenu: (state, { payload }: { payload: string }) => {
      const menuPath: string[] = payload.split('.');

      // Traverse the state to the specified menu, initializing undefined properties
      let currentMenu: any = state;
      for (const menuKey of menuPath) {
        if (!currentMenu[menuKey]) {
          // Initialize the property if it's undefined
          currentMenu[menuKey] = { isOpen: false };
        }
        currentMenu = currentMenu[menuKey];
      }

      // Toggle the isOpen property of the specified menu
      currentMenu.isOpen = !currentMenu.isOpen;
    },
  },
});


export const { onToggleMenu } = uiSlice.actions;
