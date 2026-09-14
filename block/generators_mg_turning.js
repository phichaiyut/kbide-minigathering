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

  Blockly.JavaScript['mg_turn_speed_left'] = function(block) {
    var ch = block.getFieldValue('CH');
    var L = valueToCode(block, 'L');
    var R = valueToCode(block, 'R');
    var de = valueToCode(block, 'DE');
    return `TurnSpeedLeft(${ch}, ${L}, ${R}, ${de});\n`;
  };

  Blockly.JavaScript['mg_turn_speed_right'] = function(block) {
    var ch = block.getFieldValue('CH');
    var L = valueToCode(block, 'L');
    var R = valueToCode(block, 'R');
    var de = valueToCode(block, 'DE');
    return `TurnSpeedRight(${ch}, ${L}, ${R}, ${de});\n`;
  };

  Blockly.JavaScript['mg_set_turn_speed'] = function(block) {
    var spd = valueToCode(block, 'SPD');
    return `SetTurnSpeed(${spd});\n`;
  };

  Blockly.JavaScript['mg_set_to_center_speed'] = function(block) {
    var spd = valueToCode(block, 'SPD');
    return `SetToCenterSpeed(${spd});\n`;
  };

  Blockly.JavaScript['mg_delay_c_f'] = function(block) {
    var de = valueToCode(block, 'DE');
    return `Delay_c_F(${de});\n`;
  };

  zeroArgGen('mg_to_center', 'ToCenter()');
  zeroArgGen('mg_turn_left', 'TurnLeft()');
  zeroArgGen('mg_turn_right', 'TurnRight()');
  zeroArgGen('mg_spin_left', 'SpinL()');
  zeroArgGen('mg_spin_left2', 'SpinL2()');
  zeroArgGen('mg_spin_right', 'SpinR()');
  zeroArgGen('mg_spin_right2', 'SpinR2()');
};
