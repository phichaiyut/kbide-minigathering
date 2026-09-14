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

  zeroArgBlock('mg_read_sensor', "อ่านเซนเซอร์ (ReadSensor)", "ReadSensor() — Reads raw analog values from all 6 line sensors and stores them internally.\n\nภาษาไทย: อ่านค่าดิบ (analog) จากเซนเซอร์เส้นทั้ง 6 ตัว เก็บไว้ใช้ภายใน");
  zeroArgBlock('mg_read_calibrate', "อ่านค่าคาลิเบรต (ReadCalibrate)", "ReadCalibrate() — Reads the line sensors and converts them to a 0-1000 scale based on the calibration.\n\nภาษาไทย: อ่านค่าเซนเซอร์เส้นแล้วแปลงเป็นสเกล 0-1000 ตามค่าที่คาลิเบรตไว้");
  zeroArgBlock('mg_save_calibrate', "บันทึกค่าคาลิเบรต (SaveCalibrateToEEPROM)", "SaveCalibrateToEEPROM() — Saves the calibrated Min/Max sensor values to permanent memory (EEPROM).\n\nภาษาไทย: บันทึกค่า Min/Max ของเซนเซอร์เส้นที่คาลิเบรตไว้ ลงหน่วยความจำถาวร (EEPROM)");
  zeroArgBlock('mg_load_calibrate', "โหลดค่าคาลิเบรต (LoadCalibrateFromEEPROM)", "LoadCalibrateFromEEPROM() — Loads previously saved Min/Max sensor values back.\n\nภาษาไทย: โหลดค่า Min/Max ของเซนเซอร์เส้นที่เคยบันทึกไว้กลับมาใช้");
  zeroArgBlock('mg_serial_sensor', "แสดงค่าเซนเซอร์ (SerialSensor)", "SerialSensor() — Continuously prints raw line-sensor values to the Serial Monitor until the button is pressed.\n\nภาษาไทย: แสดงค่าดิบของเซนเซอร์เส้นทาง Serial Monitor ต่อเนื่องจนกว่าจะกดปุ่ม");
  zeroArgBlock('mg_serial_calibrate', "แสดงค่าคาลิเบรต (SerialCalibrate)", "SerialCalibrate() — Continuously prints calibrated line-sensor values (0-1000) to the Serial Monitor until the button is pressed.\n\nภาษาไทย: แสดงค่าเซนเซอร์เส้นหลังคาลิเบรต (0-1000) ทาง Serial Monitor ต่อเนื่องจนกว่าจะกดปุ่ม");
  zeroArgBlock('mg_serial_distance', "แสดงระยะทาง (SerialDistance)", "SerialDistance() — Continuously prints the measured ultrasonic distance to the Serial Monitor. Never returns.\n\nภาษาไทย: แสดงระยะทางจากเซนเซอร์อัลตราโซนิกทาง Serial Monitor ต่อเนื่อง ไม่มีการคืนค่ากลับ");

  Blockly.Blocks['mg_calibrate_sensor'] = {
    init: function() {
      this.appendValueInput("PAUSE")
          .setCheck("Number")
          .appendField("คาลิเบรตเซนเซอร์ (CalibrateSensor)  เวลาหยุด");
      this.appendValueInput("SAMPLES")
          .setCheck("Number")
          .appendField("จำนวนตัวอย่าง");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("CalibrateSensor(pauseTime, samples) — Sweep the robot across the line while calibrating; the Min/Max values are then saved to EEPROM automatically.\n\nภาษาไทย: แกว่งหุ่นยนต์ผ่านเส้นระหว่างคาลิเบรต แล้วบันทึกค่า Min/Max ลง EEPROM ให้อัตโนมัติ");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_ref_line_value'] = {
    init: function() {
      this.appendValueInput("X")
          .setCheck("Number")
          .appendField("ขีดแบ่งเส้น (RefLineValue)  ค่า");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("RefLineValue(x) — Sets the threshold (0-1000) between \"line detected\" and \"no line\". Used by the line-following functions.\n\nภาษาไทย: ตั้งค่าขีดแบ่ง (0-1000) ระหว่าง \"เจอเส้น\" กับ \"ไม่เจอเส้น\" ใช้กับฟังก์ชันเดินตามเส้นทั้งหมด");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_track_line_color'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("สีเส้น (TrackLineColor)")
          .appendField(new Blockly.FieldDropdown([
            ["0 (พื้นดำ เส้นขาว)", "0"],
            ["1 (พื้นขาว เส้นดำ)", "1"]
          ]), "COLOR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("TrackLineColor(x) — Tells the library the surface/line colour combination so sensor readings are inverted correctly.\n\nภาษาไทย: บอกไลบรารีว่าสนามเป็นพื้นดำเส้นขาว หรือพื้นขาวเส้นดำ เพื่อกลับค่าการอ่านให้ถูกต้อง");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_sensor_value_min'] = {
    init: function() {
      this.appendDummyInput().appendField("ค่า Min เซนเซอร์ (SensorValueMin)");
      for (var i = 0; i <= 5; i++) {
        this.appendValueInput("F" + i).setCheck("Number").appendField("minF" + i);
      }
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("SensorValueMin(minF0..minF5) — Manually sets the Min value of all 6 line sensors, instead of running automatic calibration.\n\nภาษาไทย: ตั้งค่า Min ของเซนเซอร์เส้นทั้ง 6 ตัวด้วยตัวเอง แทนการคาลิเบรตอัตโนมัติ");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_sensor_value_max'] = {
    init: function() {
      this.appendDummyInput().appendField("ค่า Max เซนเซอร์ (SensorValueMax)");
      for (var i = 0; i <= 5; i++) {
        this.appendValueInput("F" + i).setCheck("Number").appendField("maxF" + i);
      }
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("SensorValueMax(maxF0..maxF5) — Manually sets the Max value of all 6 line sensors, instead of running automatic calibration.\n\nภาษาไทย: ตั้งค่า Max ของเซนเซอร์เส้นทั้ง 6 ตัวด้วยตัวเอง แทนการคาลิเบรตอัตโนมัติ");
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
      this.setTooltip("F[i] — Reads the value of the selected line sensor (a sensor-read block must have run before this). 0-1000, higher means more line detected.\n\nภาษาไทย: อ่านค่าของเซนเซอร์เส้นตัวที่เลือก (ต้องอ่านค่าเซนเซอร์ก่อนหน้านี้แล้ว) ค่า 0-1000 ยิ่งมากยิ่งเจอเส้นชัดเจน");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_distance_cm'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("ระยะโซนาร์ (sonar.ping_cm())");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(COLOUR);
      this.setTooltip("sonar.ping_cm() — Reads the distance from the front ultrasonic sensor, in centimeters.\n\nภาษาไทย: อ่านระยะทางจากเซนเซอร์อัลตราโซนิกด้านหน้า หน่วยเซนติเมตร");
      this.setHelpUrl("");
    }
  };
};
