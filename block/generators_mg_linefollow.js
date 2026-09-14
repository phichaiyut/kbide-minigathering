module.exports = function(Blockly){
  'use strict';
  var ORDER_ATOMIC = Blockly.JavaScript.ORDER_ATOMIC;
  var valueToCode = function(block, name) {
    return Blockly.JavaScript.valueToCode(block, name, ORDER_ATOMIC) || '0';
  };

  // ---- timed-move family: FD/BK/TL/TR/SL/SR — all (speed, time) ----
  var TIMED_MOVE_FUNCS = {
    mg_forward: 'FD',
    mg_backward: 'BK',
    mg_pivot_left: 'TL',
    mg_pivot_right: 'TR',
    mg_spin_left_time: 'SL',
    mg_spin_right_time: 'SR'
  };
  Object.keys(TIMED_MOVE_FUNCS).forEach(function(type) {
    var func = TIMED_MOVE_FUNCS[type];
    Blockly.JavaScript[type] = function(block) {
      var speed = valueToCode(block, 'SPEED');
      var time = valueToCode(block, 'TIME');
      return `${func}(${speed}, ${time});\n`;
    };
  });

  // ---- FF family: all (speed, select) ----
  var FF_FUNCS = {
    mg_ff: 'FF',
    mg_ffc: 'FFC',
    mg_ffc2: 'FFC2',
    mg_ffr: 'FFR',
    mg_ffr5: 'FFR5',
    mg_ffr2: 'FFR2',
    mg_ffl: 'FFL',
    mg_ffl0: 'FFL0',
    mg_ffl2: 'FFL2',
    mg_ffwhite: 'FFWhite',
    mg_ffblack: 'FFBlack'
  };
  Object.keys(FF_FUNCS).forEach(function(type) {
    var func = FF_FUNCS[type];
    Blockly.JavaScript[type] = function(block) {
      var speed = valueToCode(block, 'SPEED');
      var select = block.getFieldValue('SELECT');
      return `${func}(${speed}, '${select}');\n`;
    };
  });

  Blockly.JavaScript['mg_track_select'] = function(block) {
    var spd = valueToCode(block, 'SPD');
    var select = block.getFieldValue('SELECT');
    return `TrackSelect(${spd}, '${select}');\n`;
  };

  Blockly.JavaScript['mg_ff_distanced'] = function(block) {
    var speed = valueToCode(block, 'SPEED');
    var dist = valueToCode(block, 'DIST');
    var select = block.getFieldValue('SELECT');
    return `FF_DISTANCED(${speed}, '${select}', ${dist});\n`;
  };

  Blockly.JavaScript['mg_ff_timer'] = function(block) {
    var speed = valueToCode(block, 'SPEED');
    var time = valueToCode(block, 'TIME');
    return `FFTimer(${speed}, ${time});\n`;
  };

  Blockly.JavaScript['mg_ff_timer_select'] = function(block) {
    var speed = valueToCode(block, 'SPEED');
    var time = valueToCode(block, 'TIME');
    var select = block.getFieldValue('SELECT');
    return `FFTimer(${speed}, ${time}, '${select}');\n`;
  };

  Blockly.JavaScript['mg_set_f'] = function(block) {
    var num = valueToCode(block, 'NUM');
    return `set_f(${num});\n`;
  };

  Blockly.JavaScript['mg_ffnum'] = function(block) {
    var speed = valueToCode(block, 'SPEED');
    var numm = block.getFieldValue('NUMM');
    var select = block.getFieldValue('SELECT');
    return `FFNUM(${speed}, '${select}', ${numm});\n`;
  };
};
