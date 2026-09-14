module.exports = function(Blockly){
  'use strict';
  var ORDER_ATOMIC = Blockly.JavaScript.ORDER_ATOMIC;
  var valueToCode = function(block, name) {
    return Blockly.JavaScript.valueToCode(block, name, ORDER_ATOMIC) || '0';
  };

  Blockly.JavaScript['mg_set_balance_speed'] = function(block) {
    var ch = block.getFieldValue('CH');
    var spdL = valueToCode(block, 'SPDL');
    var spdR = valueToCode(block, 'SPDR');
    return `setBalanceSpeed(${ch}, ${spdL}, ${spdR});\n`;
  };

  Blockly.JavaScript['mg_set_balance_back_speed'] = function(block) {
    var ch = block.getFieldValue('CH');
    var spdL = valueToCode(block, 'SPDL');
    var spdR = valueToCode(block, 'SPDR');
    return `setBalanceBackSpeed(${ch}, ${spdL}, ${spdR});\n`;
  };

  Blockly.JavaScript['mg_set_kp_kd'] = function(block) {
    var ch = block.getFieldValue('CH');
    var kp = valueToCode(block, 'KP');
    var kd = valueToCode(block, 'KD');
    return `setKpKd(${ch}, ${kp}, ${kd});\n`;
  };

  Blockly.JavaScript['mg_mode_spd_pid'] = function(block) {
    var mode = block.getFieldValue('MODE');
    var max = valueToCode(block, 'MAX');
    var min = valueToCode(block, 'MIN');
    return `ModeSpdPID(${mode}, ${max}, ${min});\n`;
  };

  Blockly.JavaScript['mg_set_center'] = function(block) {
    var x = valueToCode(block, 'X');
    return `SetCenter(${x});\n`;
  };

  Blockly.JavaScript['mg_pid'] = function(block) {
    var speedL = valueToCode(block, 'SPEEDL');
    var speedR = valueToCode(block, 'SPEEDR');
    var kp = valueToCode(block, 'KP');
    var kd = valueToCode(block, 'KD');
    return `PID(${speedL}, ${speedR}, ${kp}, ${kd});\n`;
  };

  Blockly.JavaScript['mg_read_position'] = function(block) {
    var track = valueToCode(block, 'TRACK');
    var noise = valueToCode(block, 'NOISE');
    return [`readPosition(${track}, ${noise})`, ORDER_ATOMIC];
  };
};
