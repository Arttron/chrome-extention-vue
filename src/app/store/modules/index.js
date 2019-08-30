import {
  SAVE_CUSTOM_LOGO,
  SAVE_CUSTOM_TEXT,
  SAVE_USER_IMAGE_TO_COLLECTION,
  GET_IMAGES_COLLECTIONS
} from '../actions_type';
import {
  SET_CUSTOM_LOGO,
  SET_CUSTOM_TEXT,
  ACTIVATE_CUSTOM_LOGO,
  ACTIVATE_CUSTOM_TEXT,
  SET_IMAGES_COLLECTIONS,
} from '../mutations_type';
import { getValue, saveValue, removeValue } from '../../utyls/storaje';

const IMAGE_STORAGE_KEYS = 'userImagesKeys';

export const mutations = {
  [ACTIVATE_CUSTOM_TEXT](state, val) {
    if (val === 'disable') {
      state.isDisabledCustomText = true;
    } else {
      state.isDisabledCustomText = !state.isDisabledCustomText;
    }

    saveValue({ isDisabledCustomText: state.isDisabledCustomText });
  },

  [SET_CUSTOM_TEXT](state, text = '') {
    state.customText = text;
  },

  [ACTIVATE_CUSTOM_LOGO](state, val) {
    if (val === 'disable') {
      state.isDisabledCustomLogo = true;
    } else {
      state.isDisabledCustomLogo = !state.isDisabledCustomLogo;
    }

    saveValue({ isDisabledCustomLogo: state.isDisabledCustomLogo });
  },

  [SET_CUSTOM_LOGO](state, logo = '') {
    state.customLogo = logo;
  },

  [SET_IMAGES_COLLECTIONS](state, images = []) {
    state.imagesAnimationCollection.userCollection.images = [];
    state.imagesStaticCollection.userCollection.images = [];
    images.forEach(item => {
      if (item.indexOf('data:image/gif') !== -1) {
        state.imagesAnimationCollection.userCollection.images.unshift(item);
        state.imagesAnimationCollection.userCollection.isLoaded = true;
      } else {
        state.imagesStaticCollection.userCollection.images.unshift(item);
        state.imagesStaticCollection.userCollection.isLoaded = true;
      }
    });
  },
};

export const actions = {
  [SAVE_CUSTOM_TEXT](state, text = '') {
    if (state.customText) {
      return false;
    }

    saveValue({ customText: text });
    state.commit('setCustomText', text);
  },

  [SAVE_CUSTOM_LOGO](state, logo = '') {
    if (state.isDisabledCustomLogo) {
      return false;
    }

    if (typeof logo.src !== 'undefined' && logo.src !== '') {
      saveValue({ customLogo: logo.src });
      state.commit('setCustomLogo', logo.src);
    } else {
      saveValue({ customLogo: logo.data }).catch(err => console.error(err));
      state.commit('setCustomLogo', logo.data);
    }
  },

  [SAVE_USER_IMAGE_TO_COLLECTION](state, image) {
    if (!image) {
      return;
    }

    getValue(IMAGE_STORAGE_KEYS).then(async (res) => {
      const previousKey = res[IMAGE_STORAGE_KEYS][0];
      let nextIndex;

      if (previousKey) {
        nextIndex = parseInt(previousKey.slice(4), 10) + 1;
      }

      const keyName = nextIndex ? `key_${nextIndex}` : 'key_1';
      let currentKeys = res[IMAGE_STORAGE_KEYS];
      if (nextIndex > 10) {
        removeValue(`key_${nextIndex - 10}`);
        currentKeys = currentKeys.slice(0, 9);
      }
      const newKeys = [keyName, ...currentKeys];

      await saveValue({ userImagesKeys: newKeys });
      await saveValue({ [keyName]: image });

      getValue(newKeys).then((res) => {
        const indexes = [];
        Object.keys(res).forEach((key) => {
          indexes.push(parseInt(key.slice(4)))
        });
        indexes.sort(function(a, b){return a-b});

        const imagesList = [];
        indexes.forEach((index) => {
          imagesList.push(res[`key_${index}`]);
        });

        state.commit(SET_IMAGES_COLLECTIONS, imagesList);
      });
    });
  },

  [GET_IMAGES_COLLECTIONS](state) {
    getValue(IMAGE_STORAGE_KEYS).then((res) => {
      const keys = res[IMAGE_STORAGE_KEYS];
      getValue(keys).then((res) => {
        const indexes = [];
        Object.keys(res).forEach((key) => {
          indexes.push(parseInt(key.slice(4)))
        });
        indexes.sort(function(a, b){return a-b});

        const imagesList = [];
        indexes.forEach((index) => {
          imagesList.push(res[`key_${index}`]);
        });

        state.commit(SET_IMAGES_COLLECTIONS, imagesList);
      });
    });
  },
};
