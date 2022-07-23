function hideKeyBoardOnAndroid() {
  // This is a bit experimental. It might show some side effects.
  // https://stackoverflow.com/questions/8335834/how-can-i-hide-the-android-keyboard-using-javascript
  setTimeout(() => {
    // Creating temp field
    const field = document.createElement("input");
    field.setAttribute("type", "text");
    // Hiding temp field from peoples eyes
    // -webkit-user-modify is nessesary for Android 4.x
    field.setAttribute(
      "style",
      `position:absolute;
          top: 0px;
          opacity: 0;
          -webkit-user-modify: read-write-plaintext-only;
          left:0px;`
    );
    document.body.appendChild(field);

    // Adding onfocus event handler for out temp field
    field.onfocus = () => {
      // This timeout of 200ms is nessasary for Android 2.3.x
      setTimeout(() => {
        field.setAttribute("style", "display:none;");
        setTimeout(() => {
          document.body.removeChild(field);
          document.body.focus();
        }, 14);
      }, 200);
    };
    // Focusing it
    field.focus();
  }, 50);
}

function onIphoneClick() {
  // This is necessary for hiding the soft keyboard on iPhone
  // see v-closable="{ handler: 'onClick' }" in v-text-field
  // https://medium.com/@Taha_Shashtari/the-easy-vue-solution-to-dismiss-ios-keyboard-on-outside-click-2bb8be3c3347
  // Needs to be conditional; otherwise, (some) non-iphone devices will cause console errors
  this.$refs?.input?.blur();
}

export const useMobileDevices = () => {
  return {
    hideKeyBoardOnAndroid,
    onIphoneClick,
  };
};
