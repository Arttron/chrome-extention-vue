import {getValue} from './utyls/storaje';
import {store} from './store';
import MainLogo from './components/mainPageLogo.vue';
import SearchLogo from './components/searchPageLogo.vue';
import {Component, Vue} from 'vue-property-decorator';
import { getDataURIFile } from './utyls';


const isSearch = /\/search?/.test(document.URL);
const APP_CONTAINER = isSearch ? 'div.logo a' : '#lga';
const APP_NEWS_AND_VIDEOS_CONTAINER = '#logocont a';
const LOGO_CONTAINER = isSearch ? 'div.logo img' : '#hplogo';
const LOGO_NEWS_AND_VIDEOS_CONTAINER = '#logocont img';

@Component({
  render: h => h(isSearch ? SearchLogo : MainLogo)
})
class App extends Vue {
  constructor() {
    super();
    this.$options.el = '#App';
  }
  beforeCreate() {
    for (let key in store.state) {
      getValue(key).then( r => {
        store.replaceState({
          ...store.state,
          [key]: r[key]
        })
      })
    }
  }
  updated() {
    const searchLogoDefault = document.querySelector('div.logo');
    const searchLogoVideoANdNews = document.querySelector('#logocont h1');
    const searchLogo = searchLogoDefault ? searchLogoDefault : searchLogoVideoANdNews;
    const logoContainerDefault = document.querySelector(LOGO_CONTAINER);
    const logoContainerVideoAndNews = document.querySelector(LOGO_NEWS_AND_VIDEOS_CONTAINER);
    const logoContainer = logoContainerDefault ? logoContainerDefault : logoContainerVideoAndNews;
    if((!store.state.isDisabledCustomText && store.state.customText.paintText ) || (!store.state.isDisabledCustomLogo && store.state.customLogo)) {
      logoContainer.style.display = 'none';
      if (searchLogo && searchLogoDefault) {
        searchLogo.style.padding = '4px 28px 0 30px';
      } else if (searchLogo && searchLogoVideoANdNews) {
        searchLogo.style.padding = '4px 28px 0 0';
        searchLogo.style.marginLeft = '-30px';
      }
    } else {
      logoContainer.style.display = '';
      if (searchLogo) {
        searchLogo.style.padding = '';
      }
    }
  }
  mounted() {
    store.watch(() => {
      if((!store.state.isDisabledCustomText ) || (!store.state.isDisabledCustomLogo && store.state.customLogo)) {
        this.$forceUpdate();
      }
    });
  }
}

const appMasterContainerDefault = document.querySelector(APP_CONTAINER);
const appMasterContainerVideoAndNews = document.querySelector(APP_NEWS_AND_VIDEOS_CONTAINER);
const appMasterContainer = appMasterContainerDefault ? appMasterContainerDefault : appMasterContainerVideoAndNews;

if (appMasterContainer) {
  const appContainer = document.createElement('div');
  appContainer.id = 'App';
  appMasterContainer.style.overflow = 'initial';
  appMasterContainer.appendChild(appContainer);
  const vm = new App();

  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (var key in changes) {
      var storageChange = changes[key];
      store.replaceState({
        ...store.state,
        [key]: storageChange.newValue
      });
    }
    vm.$forceUpdate();
  });
}
