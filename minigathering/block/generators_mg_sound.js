module.exports = function(Blockly){
  'use strict';
  var ORDER_ATOMIC = Blockly.JavaScript.ORDER_ATOMIC;
  var valueToCode = function(block, name) {
    return Blockly.JavaScript.valueToCode(block, name, ORDER_ATOMIC) || '0';
  };

  function zeroArgGen(type, call) {
    Blockly.JavaScript[type] = function(block) {
      return `${call};\n`;
    };
  }

  zeroArgGen('mg_beep', 'beep()');
  zeroArgGen('mg_buzzer_on', 'BZon()');
  zeroArgGen('mg_buzzer_off', 'BZoff()');
  zeroArgGen('mg_fast_beep', 'fastBeep()');
  zeroArgGen('mg_wait_ok', 'WaitOK()');

  Blockly.JavaScript['mg_beep_ms'] = function(block) {
    var ms = valueToCode(block, 'MS');
    return `Beep(${ms});\n`;
  };

  Blockly.JavaScript['mg_button_pressed'] = function(block) {
    return ['(OK_PUSH() == 1)', ORDER_ATOMIC];
  };
};
