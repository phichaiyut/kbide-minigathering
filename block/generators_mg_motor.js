module.exports = function(Blockly){
  'use strict';
  var ORDER_ATOMIC = Blockly.JavaScript.ORDER_ATOMIC;
  var valueToCode = function(block, name) {
    return Blockly.JavaScript.valueToCode(block, name, ORDER_ATOMIC) || '0';
  };

  Blockly.JavaScript['mg_motor'] = function(block) {
    var L = valueToCode(block, 'L');
    var R = valueToCode(block, 'R');
    return `Motor(${L}, ${R});\n`;
  };

  Blockly.JavaScript['mg_motor_left'] = function(block) {
    var speed = valueToCode(block, 'SPEED');
    return `Motor1(${speed});\n`;
  };

  Blockly.JavaScript['mg_motor_right'] = function(block) {
    var speed = valueToCode(block, 'SPEED');
    return `Motor2(${speed});\n`;
  };

  Blockly.JavaScript['mg_motor_stop'] = function(block) {
    return 'MotorStop();\n';
  };

  Blockly.JavaScript['mg_motor_stop_delay'] = function(block) {
    var ms = valueToCode(block, 'MS');
    return `MotorStop(${ms});\n`;
  };

  Blockly.JavaScript['mg_move'] = function(block) {
    var L = valueToCode(block, 'L');
    var R = valueToCode(block, 'R');
    var ms = valueToCode(block, 'MS');
    return `Move(${L}, ${R}, ${ms});\n`;
  };

  var ONE_SPEED_FUNCS = {
    mg_fd: 'fd',
    mg_bk: 'bk',
    mg_sl: 'sl',
    mg_sr: 'sr',
    mg_tl: 'tl',
    mg_tr: 'tr'
  };
  Object.keys(ONE_SPEED_FUNCS).forEach(function(type) {
    var func = ONE_SPEED_FUNCS[type];
    Blockly.JavaScript[type] = function(block) {
      var speed = valueToCode(block, 'SPEED');
      return `${func}(${speed});\n`;
    };
  });

  var TWO_SPEED_FUNCS = {
    mg_fd2: 'fd2',
    mg_bk2: 'bk2'
  };
  Object.keys(TWO_SPEED_FUNCS).forEach(function(type) {
    var func = TWO_SPEED_FUNCS[type];
    Blockly.JavaScript[type] = function(block) {
      var speedL = valueToCode(block, 'SPEEDL');
      var speedR = valueToCode(block, 'SPEEDR');
      return `${func}(${speedL}, ${speedR});\n`;
    };
  });
};
