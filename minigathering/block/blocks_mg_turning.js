module.exports = function(Blockly){
  'use strict';
  var COLOUR = 120;
  var SENSOR_OPTIONS = [
    ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]
  ];

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

  Blockly.Blocks['mg_turn_speed_left'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("TurnSpeedLeft  Ch")
          .appendField(new Blockly.FieldDropdown(SENSOR_OPTIONS), "CH");
      this.appendValueInput("L").setCheck("Number").appendField("l");
      this.appendValueInput("R").setCheck("Number").appendField("r");
      this.appendValueInput("DE").setCheck("Number").appendField("de");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("TurnSpeedLeft(Ch, l, r, de) — Sets the speed and sensor used to detect the end of a left turn. Must be called before TurnLeft.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_turn_speed_right'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("TurnSpeedRight  Ch")
          .appendField(new Blockly.FieldDropdown(SENSOR_OPTIONS), "CH");
      this.appendValueInput("L").setCheck("Number").appendField("l");
      this.appendValueInput("R").setCheck("Number").appendField("r");
      this.appendValueInput("DE").setCheck("Number").appendField("de");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("TurnSpeedRight(Ch, l, r, de) — Sets the speed and sensor used to detect the end of a right turn. Must be called before TurnRight.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_set_turn_speed'] = {
    init: function() {
      this.appendValueInput("SPD").setCheck("Number").appendField("SetTurnSpeed  tspdv");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("SetTurnSpeed(tspdv) — Sets the speed used by SpinL / SpinL2 / SpinR / SpinR2.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_set_to_center_speed'] = {
    init: function() {
      this.appendValueInput("SPD").setCheck("Number").appendField("SetToCenterSpeed  tctv");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("SetToCenterSpeed(tctv) — Sets the speed used by ToCenter (moving to the line center before a turn).");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_delay_c_f'] = {
    init: function() {
      this.appendValueInput("DE").setCheck("Number").appendField("Delay_c_F  de");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("Delay_c_F(de) — Sets the time divider used to compute how long ToCenter runs.");
      this.setHelpUrl("");
    }
  };

  zeroArgBlock('mg_to_center', "ToCenter", "ToCenter() — Moves the robot toward the line center before turning (set speed/delay first).");
  zeroArgBlock('mg_turn_left', "TurnLeft", "TurnLeft() — Turns left until the configured sensor detects the line (set TurnSpeedLeft first).");
  zeroArgBlock('mg_turn_right', "TurnRight", "TurnRight() — Turns right until the configured sensor detects the line (set TurnSpeedRight first).");
  zeroArgBlock('mg_spin_left', "SpinL", "SpinL() — Spins in place to the left until the line is detected (set spin speed first).");
  zeroArgBlock('mg_spin_left2', "SpinL2", "SpinL2() — Spins in place to the left using a second timing pattern (set spin speed first).");
  zeroArgBlock('mg_spin_right', "SpinR", "SpinR() — Spins in place to the right until the line is detected (set spin speed first).");
  zeroArgBlock('mg_spin_right2', "SpinR2", "SpinR2() — Spins in place to the right using a second timing pattern (set spin speed first).");
};
