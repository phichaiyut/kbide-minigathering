module.exports = function(Blockly){
  'use strict';
  var COLOUR = 200;
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

  zeroArgBlock('mg_read_sensor', "ReadSensor", "ReadSensor() — Reads raw analog values from all 6 line sensors and stores them internally.");
  zeroArgBlock('mg_read_calibrate', "ReadCalibrate", "ReadCalibrate() — Reads the line sensors and converts them to a 0-1000 scale based on the calibration.");
  zeroArgBlock('mg_save_calibrate', "SaveCalibrateToEEPROM", "SaveCalibrateToEEPROM() — Saves the calibrated Min/Max sensor values to permanent memory (EEPROM).");
  zeroArgBlock('mg_load_calibrate', "LoadCalibrateFromEEPROM", "LoadCalibrateFromEEPROM() — Loads previously saved Min/Max sensor values back.");
  zeroArgBlock('mg_serial_sensor', "SerialSensor", "SerialSensor() — Continuously prints raw line-sensor values to the Serial Monitor until the button is pressed.");
  zeroArgBlock('mg_serial_calibrate', "SerialCalibrate", "SerialCalibrate() — Continuously prints calibrated line-sensor values (0-1000) to the Serial Monitor until the button is pressed.");
  zeroArgBlock('mg_serial_distance', "SerialDistance", "SerialDistance() — Continuously prints the measured ultrasonic distance to the Serial Monitor. Never returns.");

  Blockly.Blocks['mg_calibrate_sensor'] = {
    init: function() {
      this.appendValueInput("PAUSE")
          .setCheck("Number")
          .appendField("CalibrateSensor  pauseTime");
      this.appendValueInput("SAMPLES")
          .setCheck("Number")
          .appendField("samples");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("CalibrateSensor(pauseTime, samples) — Sweep the robot across the line while calibrating; the Min/Max values are then saved to EEPROM automatically.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_ref_line_value'] = {
    init: function() {
      this.appendValueInput("X")
          .setCheck("Number")
          .appendField("RefLineValue  x");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("RefLineValue(x) — Sets the threshold (0-1000) between \"line detected\" and \"no line\". Used by the line-following functions.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_track_line_color'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("TrackLineColor")
          .appendField(new Blockly.FieldDropdown([
            ["0 (black surface, white line)", "0"],
            ["1 (white surface, black line)", "1"]
          ]), "COLOR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("TrackLineColor(x) — Tells the library the surface/line colour combination so sensor readings are inverted correctly.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_sensor_value_min'] = {
    init: function() {
      this.appendDummyInput().appendField("SensorValueMin");
      for (var i = 0; i <= 5; i++) {
        this.appendValueInput("F" + i).setCheck("Number").appendField("minF" + i);
      }
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("SensorValueMin(minF0..minF5) — Manually sets the Min value of all 6 line sensors, instead of running automatic calibration.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_sensor_value_max'] = {
    init: function() {
      this.appendDummyInput().appendField("SensorValueMax");
      for (var i = 0; i <= 5; i++) {
        this.appendValueInput("F" + i).setCheck("Number").appendField("maxF" + i);
      }
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("SensorValueMax(maxF0..maxF5) — Manually sets the Max value of all 6 line sensors, instead of running automatic calibration.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_line_sensor'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("F[")
          .appendField(new Blockly.FieldDropdown(SENSOR_OPTIONS), "INDEX")
          .appendField("]");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(COLOUR);
      this.setTooltip("F[i] — Reads the value of the selected line sensor (a sensor-read block must have run before this). 0-1000, higher means more line detected.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_distance_cm'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("sonar.ping_cm()");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(COLOUR);
      this.setTooltip("sonar.ping_cm() — Reads the distance from the front ultrasonic sensor, in centimeters.");
      this.setHelpUrl("");
    }
  };
};
