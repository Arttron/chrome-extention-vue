<template>
  <div class="example">
  </div>
</template>

<script>
import { store, appState } from '../app/store';
import { getValue } from '../app/utyls/storaje';

for (let key in appState) {
  getValue(key).then( r => {
    store.replaceState({
      ...store.state,
      [key]: r[key]
    })
  })
}

export default {
  components: {
  },
  data () {
    return {
      msg: 'Popup'
    }
  },
}
</script>

<style lang="scss">
  @import "../app/assets/reset";
  @import "../app/assets/variables";
  .example {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 600px;
    background-color: $secondaryColor;
    margin-bottom: auto;
  }
  .container{
    padding: 0 20px;
    min-width: 446px;
  }
  .flat-button {
    outline: none;
    border: none;
    background: none;
    font-family: inherit;
    border-radius: 0;
    display: inline-block;
    cursor: pointer;
  }
  .btn {
    outline: none;
    border: none;
    font-family: inherit;
    font-size: 14px;
    cursor: pointer;
    background-color: $buttonBG;
    opacity: 1;
    border-radius: 3px;
    color: $textColor1;
    height: 30px;
    width: 195px;
    line-height: 30px;
    text-align: center;
    &:not(:disabled, .disabled):hover {
      opacity: .9;
    }
  }
  .btn:disabled, .btn.disabled {
    background-color: $buttonDisableBG;
    cursor: default;
    pointer-events: none;
  }
  .section-header {
    color: $textColor2;
    font-size: 16px;
    text-align: center;
    display: block;
    width: 100%;
    margin: 8px 0 0;
    font-weight: 700;
    letter-spacing: 0.3px;
  }
  .section-header-checkbox {
    display: inline-block;
    vertical-align: middle;
    margin-right: 7px;
    margin-bottom: 4px;
  }
</style>
