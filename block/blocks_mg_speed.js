module.exports = function(Blockly){
  'use strict';
  var COLOUR = 55;
  var SPEED_CH_OPTIONS = [
    ["SPD_10", "SPD_10"],
    ["SPD_20", "SPD_20"],
    ["SPD_30", "SPD_30"],
    ["SPD_40", "SPD_40"],
    ["SPD_50", "SPD_50"],
    ["SPD_60", "SPD_60"],
    ["SPD_70", "SPD_70"],
    ["SPD_80", "SPD_80"],
    ["SPD_90", "SPD_90"],
    ["SPD_100", "SPD_100"]
  ];

  Blockly.Blocks['mg_set_balance_speed'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("setBalanceSpeed  ch")
          .appendField(new Blockly.FieldDropdown(SPEED_CH_OPTIONS), "CH");
      this.appendValueInput("SPDL").setCheck("Number").appendField("spdL");
      this.appendValueInput("SPDR").setCheck("Number").appendField("spdR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("setBalanceSpeed(ch, spdL, spdR) — Reduces each motor's forward speed to fix a robot that drifts, for the selected speed range.\n\nภาษาไทย: ปรับลดความเร็วเดินหน้าของมอเตอร์แต่ละข้าง เพื่อแก้ปัญหาหุ่นยนต์วิ่งเอียง ตั้งแยกตามช่วงความเร็วที่เลือก");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_set_balance_back_speed'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("setBalanceBackSpeed  ch")
          .appendField(new Blockly.FieldDropdown(SPEED_CH_OPTIONS), "CH");
      this.appendValueInput("SPDL").setCheck("Number").appendField("spdL");
      this.appendValueInput("SPDR").setCheck("Number").appendField("spdR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("setBalanceBackSpeed(ch, spdL, spdR) — Reduces each motor's backward speed to fix a robot that drifts, for the selected speed range.\n\nภาษาไทย: ปรับลดความเร็วถอยหลังของมอเตอร์แต่ละข้าง เพื่อแก้ปัญหาหุ่นยนต์วิ่งเอียง ตั้งแยกตามช่วงความเร็วที่เลือก");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_set_kp_kd'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("setKpKd  ch")
          .appendField(new Blockly.FieldDropdown(SPEED_CH_OPTIONS), "CH");
      this.appendValueInput("KP").setCheck("Number").appendField("kp");
      this.appendValueInput("KD").setCheck("Number").appendField("kd");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("setKpKd(ch, kp, kd) — Sets the Kp (response) and Kd (damping) constants of the line-follow PID, for the selected speed range.\n\nภาษาไทย: ตั้งค่าคงที่ Kp (ความไวตอบสนอง) และ Kd (การหน่วง) ของ PID เดินตามเส้น แยกตามช่วงความเร็วที่เลือก");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_mode_spd_pid'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("ModeSpdPID  Mod")
          .appendField(new Blockly.FieldDropdown([
            ["0", "0"],
            ["1", "1"],
            ["2", "2"]
          ]), "MODE");
      this.appendValueInput("MAX").setCheck("Number").appendField("max");
      this.appendValueInput("MIN").setCheck("Number").appendField("min");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("ModeSpdPID(Mod, max, min) — Chooses how each motor's speed is clamped after the PID calculation. Mod 0: clamp 0 to max. Mod 1: clamp min to max. Mod 2: symmetric ± speed (can reverse).\n\nภาษาไทย: เลือกวิธีจำกัดความเร็วมอเตอร์แต่ละข้างหลังคำนวณ PID โหมด 0: จำกัด 0 ถึง max โหมด 1: จำกัด min ถึง max โหมด 2: จำกัดแบบสมมาตร ± ความเร็ว (กลับทิศได้)");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_set_center'] = {
    init: function() {
      this.appendValueInput("X")
          .setCheck("Number")
          .appendField("SetCenter  x");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("SetCenter(x) — Sets the reference value used when moving to the line center before a turn (used together with ToCenter).\n\nภาษาไทย: ตั้งค่าที่ใช้อ้างอิงตอนขยับเข้ากึ่งกลางเส้นก่อนเลี้ยว (ใช้คู่กับ ToCenter)");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_pid'] = {
    init: function() {
      this.appendValueInput("SPEEDL").setCheck("Number").appendField("PID  SpeedL");
      this.appendValueInput("SPEEDR").setCheck("Number").appendField("SpeedR");
      this.appendValueInput("KP").setCheck("Number").appendField("Kp");
      this.appendValueInput("KD").setCheck("Number").appendField("Kd");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("PID(SpeedL, SpeedR, Kp, Kd) — Calculates PID from the line position once, then drives the motors immediately (call repeatedly in a loop to follow a line).\n\nภาษาไทย: คำนวณ PID จากตำแหน่งเส้นหนึ่งครั้ง แล้วสั่งมอเตอร์ทันที (เรียกซ้ำ ๆ ในลูปเพื่อเดินตามเส้นเอง)");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_read_position'] = {
    init: function() {
      this.appendValueInput("TRACK").setCheck("Number").appendField("readPosition  Track");
      this.appendValueInput("NOISE").setCheck("Number").appendField("noise");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(COLOUR);
      this.setTooltip("readPosition(Track, noise) — Calculates the line position relative to the robot (0 = leftmost, 1500 = rightmost). Used internally by the PID block.\n\nภาษาไทย: คำนวณตำแหน่งของเส้นเทียบกับตัวหุ่นยนต์ (0 = ซ้ายสุด, 1500 = ขวาสุด) ใช้ภายในบล็อก PID");
      this.setHelpUrl("");
    }
  };
};
