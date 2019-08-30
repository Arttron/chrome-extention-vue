const appEl = document.getElementById('app');
let buttons;
let alert;
let timeout1;
let timeout2;
let areButtonsDisabled = false;

// Set attribute for preventing redirect to the store for add button
if (appEl) {
  appEl.setAttribute('data-extension-installed', '');
  appEl.setAttribute('data-extension-id', chrome.runtime.id);
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.event === 'logos-loaded') {
    addClickListeners();
  } else if (msg.event === 'page-loaded') {
    alert = document.querySelector('.cl-logo-alert__success');
  } else if (msg.event === 'image-added') {
    // Added timeout for smooth button transition
    setTimeout(() => {
      alert = document.querySelector('.cl-logo-alert__success');
      if (alert) {
        alert.classList.add('active');
      }
      timeout1 = removeAlert();
    }, 500);
  } else if (msg.event === 'image-error') {
    // Added timeout for smooth button transition
    setTimeout(() => {
      alert = document.querySelector('.cl-logo-alert__error');
      if (alert) {
        alert.classList.add('active');
      }
      timeout1 = removeAlert();
    }, 500);
  }
});

const alertRemoveTimeout = 3000;
const alertTransitionTimeout = 300;
const removeAlert = () => {
  // Remove disable attribute from all buttons
  areButtonsDisabled = false;
  [].forEach.call(buttons, (button) => {
    button.removeAttribute('disabled');
  });
  return setTimeout(() => {
    if (alert) {
      alert.classList.add('active-remove-transition');
    }
    timeout2 = setTimeout(() => {
      if (alert) {
        alert.classList.remove('active-remove-transition');
        alert.classList.remove('active');
      }
    }, alertTransitionTimeout);
  }, alertRemoveTimeout);
};

const loadImage = (src) => {
  chrome.runtime.sendMessage({
    event: 'save-image',
    // src: 'https://mondrian.mashable.com/wp-content%252Fuploads%252F2013%252F06%252FAladdin.gif%252Ffull-fit-in__1200x2000.gif?signature=u33JKEa7nZzg_CK0hdaMve9QMw8=&source=http%3A%2F%2Fmashable.com',
    src: src,
  });
};

const onClick = (e) => {
  const imageSrc = e.currentTarget.getAttribute('data-image');
  if (!alert) {
    alert = document.querySelector('.cl-logo-alert__success');
  }

  // Add disable attribute from all buttons
  areButtonsDisabled = true;
  [].forEach.call(buttons, (button) => {
    if (button) {
      button.setAttribute('disabled', true);
    }
  });

  if (alert && !alert.classList.contains('active')) {
    loadImage(imageSrc);
  } else {
    clearTimeout(timeout2);
    clearTimeout(timeout1);
    alert.classList.remove('active');
    loadImage(imageSrc);
  }

};

// Add image functionality
const addClickListeners = () => {
  buttons = document.getElementsByClassName('cl-add-image');

  [].forEach.call(buttons,(button) => {
    button.addEventListener('click', onClick, true);
    if (areButtonsDisabled) {
      if (button) {
        button.setAttribute('disabled', true);
      }
    }
  });
};

addClickListeners();
