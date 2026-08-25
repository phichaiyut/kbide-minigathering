module.exports = function(Blockly){
  'use strict';
  var COLOUR = 170;

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

  zeroArgBlock('mg_servo_setup', "servoSetup",
    "servoSetup() — Attaches servo_gripper (pin 14) and servo_base (pin 12). Call once in setup, before any other Servo block.");
  zeroArgBlock('mg_serial_servo_control', "SerialServoControl",
    "SerialServoControl() — Interactive servo jog over Serial Monitor: type \"1 90\" to move servo_base, \"2 90\" to move servo_gripper, or \"exit\" to return. Blocks (loops forever) until you type exit — useful for finding calibration angles, not for normal runs.");
  zeroArgBlock('mg_servo_up', "servo_up",
    "servo_up() — Raises the arm base to a fixed angle (s_up = 70°).");
  zeroArgBlock('mg_servo_up45', "servo_up45",
    "servo_up45() — Raises the arm base to a fixed angle (s_up45 = 90°).");
  zeroArgBlock('mg_servo_down', "servo_down",
    "servo_down() — Lowers the arm base to a fixed angle (s_down = 150°).");
  zeroArgBlock('mg_servo_open', "servo_open",
    "servo_open() — Opens the gripper to a fixed angle (s_open = 170°).");
  zeroArgBlock('mg_servo_close_small', "servo_close_small",
    "servo_close_small() — Closes the gripper to grip a small object (s_closesmall = 90°).");
  zeroArgBlock('mg_servo_close_big', "servo_close_big",
    "servo_close_big() — Closes the gripper to grip a large object (s_closebig = 120°).");

  Blockly.Blocks['mg_servo'] = {
    init: function() {
      this.appendValueInput("DE1").setCheck("Number").appendField("servo  de1");
      this.appendValueInput("DE2").setCheck("Number").appendField("de2");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("servo(de1, de2) — Sets the arm base angle (de1) and gripper angle (de2) together.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_arm_base'] = {
    init: function() {
      this.appendValueInput("ANGLE").setCheck("Number").appendField("arm_base  angle");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("arm_base(angle) — Sets the arm base (up/down) to a custom angle, 0-180.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_arm_gripper'] = {
    init: function() {
      this.appendValueInput("ANGLE").setCheck("Number").appendField("arm_gripper  angle");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("arm_gripper(angle) — Sets the gripper (open/close) to a custom angle, 0-180.");
      this.setHelpUrl("");
    }
  };

  var PRESET_OPTIONS = [
    ["s_up", "s_up"],
    ["s_up45", "s_up45"],
    ["s_down", "s_down"],
    ["s_ready", "s_ready"],
    ["s_open (อ้า)", "s_open"],
    ["s_closesmall (จับลูกเล็ก)", "s_closesmall"],
    ["s_closebig (จับลูกใหญ่)", "s_closebig"]
  ];

  Blockly.Blocks['mg_set_servo_preset'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Set")
          .appendField(new Blockly.FieldDropdown(PRESET_OPTIONS), "VAR");
      this.appendValueInput("VALUE").setCheck("Number").appendField("to");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("s_up / s_up45 / s_down / s_ready / s_open / s_closesmall / s_closebig — Changes the fixed angle used by servo_up(), servo_up45(), servo_down(), servo_open(), servo_close_small() and servo_close_big(). Set this before those blocks run (e.g. in setup, after servoSetup).");
      this.setHelpUrl("");
    }
  };
};
