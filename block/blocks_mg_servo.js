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

  zeroArgBlock('mg_servo_setup', "ตั้งค่าเซอร์โว (servoSetup)",
    "servoSetup() — Attaches servo_gripper (pin 14) and servo_base (pin 12). Call once in setup, before any other Servo block.\n\nภาษาไทย: ต่อเซอร์โวมือจับ (ขา 14) และแขนกล (ขา 12) เข้ากับขาสัญญาณ เรียกครั้งเดียวใน setup ก่อนบล็อกเซอร์โวอื่นเสมอ");
  zeroArgBlock('mg_serial_servo_control', "ควบคุมเซอร์โวผ่าน Serial (SerialServoControl)",
    "SerialServoControl() — Interactive servo jog over Serial Monitor: type \"1 90\" to move servo_base, \"2 90\" to move servo_gripper, or \"exit\" to return. Blocks (loops forever) until you type exit — useful for finding calibration angles, not for normal runs.\n\nภาษาไทย: ปรับมุมเซอร์โวแบบโต้ตอบผ่าน Serial Monitor พิมพ์ \"1 90\" เพื่อขยับแขนกล, \"2 90\" เพื่อขยับมือจับ หรือพิมพ์ \"exit\" เพื่อออก บล็อกโปรแกรมไว้ (วนลูปค้าง) จนกว่าจะพิมพ์ exit ใช้หาค่ามุมตอนคาลิเบรต ไม่เหมาะใช้งานจริง");
  zeroArgBlock('mg_servo_up', "ยกแขนสุด (servo_up)",
    "servo_up() — Raises the arm base to a fixed angle (s_up = 70°).\n\nภาษาไทย: ยกแขนกลขึ้นที่มุมคงที่ (s_up = 70°)");
  zeroArgBlock('mg_servo_up45', "ยกแขนครึ่งหนึ่ง (servo_up45)",
    "servo_up45() — Raises the arm base to a fixed angle (s_up45 = 90°).\n\nภาษาไทย: ยกแขนกลขึ้นครึ่งหนึ่งที่มุมคงที่ (s_up45 = 90°)");
  zeroArgBlock('mg_servo_down', "วางแขนลง (servo_down)",
    "servo_down() — Lowers the arm base to a fixed angle (s_down = 150°).\n\nภาษาไทย: วางแขนกลลงที่มุมคงที่ (s_down = 150°)");
  zeroArgBlock('mg_servo_open', "อ้ามือจับ (servo_open)",
    "servo_open() — Opens the gripper to a fixed angle (s_open = 170°).\n\nภาษาไทย: อ้ามือจับที่มุมคงที่ (s_open = 170°)");
  zeroArgBlock('mg_servo_close_small', "หุบจับชิ้นเล็ก (servo_close_small)",
    "servo_close_small() — Closes the gripper to grip a small object (s_closesmall = 90°).\n\nภาษาไทย: หุบมือจับเพื่อจับวัตถุชิ้นเล็กที่มุมคงที่ (s_closesmall = 90°)");
  zeroArgBlock('mg_servo_close_big', "หุบจับชิ้นใหญ่ (servo_close_big)",
    "servo_close_big() — Closes the gripper to grip a large object (s_closebig = 120°).\n\nภาษาไทย: หุบมือจับเพื่อจับวัตถุชิ้นใหญ่ที่มุมคงที่ (s_closebig = 120°)");

  Blockly.Blocks['mg_servo'] = {
    init: function() {
      this.appendValueInput("DE1").setCheck("Number").appendField("เซอร์โว (servo)  มุมแขน");
      this.appendValueInput("DE2").setCheck("Number").appendField("มุมมือจับ");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("servo(de1, de2) — Sets the arm base angle (de1) and gripper angle (de2) together.\n\nภาษาไทย: ตั้งมุมแขนกล (de1) และมือจับ (de2) พร้อมกันในบล็อกเดียว");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_arm_base'] = {
    init: function() {
      this.appendValueInput("ANGLE").setCheck("Number").appendField("มุมแขน (arm_base)  มุม");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("arm_base(angle) — Sets the arm base (up/down) to a custom angle, 0-180.\n\nภาษาไทย: ตั้งมุมแขนกล (ขึ้น/ลง) เองตามต้องการ 0-180 องศา");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_arm_gripper'] = {
    init: function() {
      this.appendValueInput("ANGLE").setCheck("Number").appendField("มุมมือจับ (arm_gripper)  มุม");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("arm_gripper(angle) — Sets the gripper (open/close) to a custom angle, 0-180.\n\nภาษาไทย: ตั้งมุมมือจับ (อ้า/หุบ) เองตามต้องการ 0-180 องศา");
      this.setHelpUrl("");
    }
  };

  var PRESET_OPTIONS = [
    ["s_up (ยกสุด)", "s_up"],
    ["s_up45 (ยกครึ่งหนึ่ง)", "s_up45"],
    ["s_down (วางลง)", "s_down"],
    ["s_ready (ท่าพร้อม)", "s_ready"],
    ["s_open (อ้า)", "s_open"],
    ["s_closesmall (จับลูกเล็ก)", "s_closesmall"],
    ["s_closebig (จับลูกใหญ่)", "s_closebig"]
  ];

  Blockly.Blocks['mg_set_servo_preset'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("ตั้งค่า (Set)")
          .appendField(new Blockly.FieldDropdown(PRESET_OPTIONS), "VAR");
      this.appendValueInput("VALUE").setCheck("Number").appendField("เท่ากับ");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("s_up / s_up45 / s_down / s_ready / s_open / s_closesmall / s_closebig — Changes the fixed angle used by servo_up(), servo_up45(), servo_down(), servo_open(), servo_close_small() and servo_close_big(). Set this before those blocks run (e.g. in setup, after servoSetup).\n\nภาษาไทย: ปรับค่าองศาของแต่ละท่าสำเร็จรูปที่ใช้กับ servo_up(), servo_up45(), servo_down(), servo_open(), servo_close_small() และ servo_close_big() ควรตั้งค่านี้ก่อนเรียกใช้บล็อกท่าสำเร็จรูปเหล่านั้น (เช่น ใน setup หลัง servoSetup)");
      this.setHelpUrl("");
    }
  };
};
