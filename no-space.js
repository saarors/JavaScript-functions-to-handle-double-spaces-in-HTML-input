(function(){
  const stringUtils = {
    _clean: function(str) {
      return str.trim().replace(/\s+/g, ' ');
    },
    cleanSpaces: function(str) {
      if (typeof str !== 'string') return '';
      return this._clean(str);
    }
  };

  function initInputCleaner() {
    
    const inputs = document.querySelectorAll('input[type="text"]');
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        inputs.forEach(input => {
          input.value = stringUtils.cleanSpaces(input.value);
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInputCleaner);
  } else {
    initInputCleaner();
  }
  window.stringUtils = stringUtils;
})();
