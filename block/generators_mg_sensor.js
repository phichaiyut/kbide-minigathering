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

  zeroArgGen('mg_read_sensor', 'ReadSensor()');
  zeroArgGen('mg_read_calibrate', 'ReadCalibrate()');
  zeroArgGen('mg_save_calibrate', 'SaveCalibrateToEEPROM()');
  zeroArgGen('mg_load_calibrate', 'LoadCalibrateFromEEPROM()');
  zeroArgGen('mg_serial_sensor', 'SerialSensor()');
  zeroArgGen('mg_serial_calibrate', 'SerialCalibrate()');
  zeroArgGen('mg_serial_distance', 'SerialDistance()');

  Blockly.JavaScript['mg_calibrate_sensor'] = function(block) {
    var pause = valueToCode(block, 'PAUSE');
    var samples = valueToCode(block, 'SAMPLES');
    return `CalibrateSensor(${pause}, ${samples});\n`;
  };

  Blockly.JavaScript['mg_ref_line_value'] = function(block) {
    var x = valueToCode(block, 'X');
    return `RefLineValue(${x});\n`;
  };

  Blockly.JavaScript['mg_track_line_color'] = function(block) {
    var color = block.getFieldValue('COLOR');
    return `TrackLineColor(${color});\n`;
  };

  Blockly.JavaScript['mg_sensor_value_min'] = function(block) {
    var vals = [];
    for (var i = 0; i <= 5; i++) vals.push(valueToCode(block, 'F' + i));
    return `SensorValueMin(${vals.join(', ')});\n`;
  };

  Blockly.JavaScript['mg_sensor_value_max'] = function(block) {
    var vals = [];
    for (var i = 0; i <= 5; i++) vals.push(valueToCode(block, 'F' + i));
    return `SensorValueMax(${vals.join(', ')});\n`;
  };

  Blockly.JavaScript['mg_line_sensor'] = function(block) {
    var index = block.getFieldValue('INDEX');
    return [`F[${index}]`, ORDER_ATOMIC];
  };

  Blockly.JavaScript['mg_distance_cm'] = function(block) {
    return ['sonar.ping_cm()', ORDER_ATOMIC];
  };
};
