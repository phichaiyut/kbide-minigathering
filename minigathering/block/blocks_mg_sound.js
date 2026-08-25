module.exports = function(Blockly){
  'use strict';
  var COLOUR = 45;

  function zeroArgBlock(type, label, tooltip) {
    Blockly.Blocks[type] = {
      init: function() {
        this.appendDummyInput().appendField(label);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLOUR);
        this.setTooltip(tooltip);
        this.setHelpUrl("");
      }
    };
  }

  zeroArgBlock('mg_beep', "beep", "beep() — Buzzer sounds briefly, about 50 ms.");
  zeroArgBlock('mg_buzzer_on', "BZon", "BZon() — Turns the buzzer on and holds it. Must be paired with BZoff.");
  zeroArgBlock('mg_buzzer_off', "BZoff", "BZoff() — Turns off a buzzer left on.");
  zeroArgBlock('mg_fast_beep', "fastBeep", "fastBeep() — Buzzer sounds very briefly, about 15 ms.");
  zeroArgBlock('mg_wait_ok', "WaitOK", "WaitOK() — Waits until the button is pressed, then beeps to confirm.");

  Blockly.Blocks['mg_beep_ms'] = {
    init: function() {
      this.appendValueInput("MS")
          .setCheck("Number")
          .appendField("Beep  de");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("Beep(de) — Buzzer sounds for the given duration (milliseconds).");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_button_pressed'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("OK_PUSH");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(COLOUR);
      this.setTooltip("OK_PUSH() == 1 — Returns true if the button is currently pressed. Checks instantly without blocking the program.");
      this.setHelpUrl("");
    }
  };
};
