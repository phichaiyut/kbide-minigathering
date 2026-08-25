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

  zeroArgGen('mg_servo_setup', 'servoSetup()');
  zeroArgGen('mg_serial_servo_control', 'SerialServoControl()');
  zeroArgGen('mg_servo_up', 'servo_up()');
  zeroArgGen('mg_servo_up45', 'servo_up45()');
  zeroArgGen('mg_servo_down', 'servo_down()');
  zeroArgGen('mg_servo_open', 'servo_open()');
  zeroArgGen('mg_servo_close_small', 'servo_close_small()');
  zeroArgGen('mg_servo_close_big', 'servo_close_big()');

  Blockly.JavaScript['mg_servo'] = function(block) {
    var de1 = valueToCode(block, 'DE1');
    var de2 = valueToCode(block, 'DE2');
    return `servo(${de1}, ${de2});\n`;
  };

  Blockly.JavaScript['mg_arm_base'] = function(block) {
    var angle = valueToCode(block, 'ANGLE');
    return `arm_base(${angle});\n`;
  };

  Blockly.JavaScript['mg_arm_gripper'] = function(block) {
    var angle = valueToCode(block, 'ANGLE');
    return `arm_gripper(${angle});\n`;
  };

  Blockly.JavaScript['mg_set_servo_preset'] = function(block) {
    var varName = block.getFieldValue('VAR');
    var value = valueToCode(block, 'VALUE');
    return `${varName} = ${value};\n`;
  };
};
