export function getDataUri(url, callback) {
  var image = new Image();

  image.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

    canvas.getContext('2d').drawImage(this, 0, 0);

    // Get raw image data
    callback(canvas.toDataURL('image/png'));
  };

  image.src = url;
}

export function getDataURIFile(fileName) {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onloadend = () => {
      resolve({ data: fileReader.result, src: chrome.extension.getURL(fileName) });
    };

    fileReader.onerror = (err) => reject(err);

    fetch(fileName)
      .then((response) => {
        if (response.status !== 200) {
          return reject('Fetch image error');
        }
        return response.blob();
      })
      .then(blob => {
        fileReader.readAsDataURL(blob);
      })
      .catch((err) => reject(err));
  });
}

export function refreshAllGoogleTabs() {
  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; ++i) {
      var tab = tabs[i];
      if (
        tab.url.indexOf( "www.google" ) != -1
        || tab.url.indexOf( "chrome://newtab" ) != -1
        || tab.url.indexOf( "https://custom-logo" ) != -1
      ) {
        chrome.tabs.reload(tab.id);
      }
    }
  });
}
