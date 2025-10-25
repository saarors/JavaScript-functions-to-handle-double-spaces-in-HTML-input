(function() {
  const stringUtils = {
    _clean(str) {
      return str.trim().replace(/\s+/g, ' ');
    },
    cleanSpaces(str) {
      if (typeof str !== 'string') return '';
      return this._clean(str);
    }
  };

  function setCursorPosition(el, pos) {
    el.setSelectionRange(pos, pos);
  }

  function cleanInputValue(e) {
    const el = e.target;
    const original = el.value;
    const cleaned = stringUtils.cleanSpaces(original);
    if (original !== cleaned) {
      const cursorPos = el.selectionStart;
      const diff = original.length - cleaned.length;
      el.value = cleaned;
      const newPos = Math.max(cursorPos - diff, 0);
      setCursorPosition(el, newPos);
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const el = e.target;
    const pasteData = (e.clipboardData || window.clipboardData).getData('text');
    const cleanedData = stringUtils.cleanSpaces(pasteData);
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const value = el.value;
    const newValue = value.slice(0, start) + cleanedData + value.slice(end);
    el.value = stringUtils.cleanSpaces(newValue);
    setCursorPosition(el, start + cleanedData.length);
  }

  function handleBlur(e) {
    e.target.value = stringUtils.cleanSpaces(e.target.value);
  }

  function initInputCleaner() {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    const buttons = document.querySelectorAll('button.clean-spaces');
    const forms = document.querySelectorAll('form');

    
    inputs.forEach(input => {
      input.addEventListener('input', cleanInputValue);
      input.addEventListener('paste', handlePaste);
      input.addEventListener('blur', handleBlur);
    });

    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        inputs.forEach(input => {
          input.value = stringUtils.cleanSpaces(input.value);
        });
      });
    });

    /
    forms.forEach(form => {
      form.addEventListener('submit', () => {
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
