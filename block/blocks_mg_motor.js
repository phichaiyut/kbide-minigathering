module.exports = function(Blockly){
  'use strict';
  var COLOUR = 290;

  Blockly.Blocks['mg_motor'] = {
    init: function() {
      this.appendValueInput("L")
          .setCheck("Number")
          .appendField("Motor  L");
      this.appendValueInput("R")
          .setCheck("Number")
          .appendField("R");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("Motor(spdL, spdR) — Drives both motors at once. Speed -100 (full reverse) to 100 (full forward).\n\nภาษาไทย: สั่งมอเตอร์ซ้าย-ขวาพร้อมกัน ความเร็ว -100 (ถอยหลังสุด) ถึง 100 (เดินหน้าสุด)");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_motor_left'] = {
    init: function() {
      this.appendValueInput("SPEED")
          .setCheck("Number")
          .appendField("Motor1  spd");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("Motor1(spdL) — Drives the left motor only. Speed -100 to 100.\n\nภาษาไทย: สั่งมอเตอร์ซ้ายข้างเดียว ความเร็ว -100 ถึง 100");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_motor_right'] = {
    init: function() {
      this.appendValueInput("SPEED")
          .setCheck("Number")
          .appendField("Motor2  spd");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("Motor2(spdR) — Drives the right motor only. Speed -100 to 100.\n\nภาษาไทย: สั่งมอเตอร์ขวาข้างเดียว ความเร็ว -100 ถึง 100");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_motor_stop'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("MotorStop");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("MotorStop() — Stops both motors immediately.\n\nภาษาไทย: หยุดมอเตอร์ทั้งสองข้างทันที");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_motor_stop_delay'] = {
    init: function() {
      this.appendValueInput("MS")
          .setCheck("Number")
          .appendField("MotorStop  de");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("MotorStop(de) — Stops both motors, then waits for the given duration (milliseconds).\n\nภาษาไทย: หยุดมอเตอร์ทั้งสองข้าง แล้วหน่วงเวลาตามที่กำหนด (มิลลิวินาที)");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_move'] = {
    init: function() {
      this.appendValueInput("L")
          .setCheck("Number")
          .appendField("Move  l");
      this.appendValueInput("R")
          .setCheck("Number")
          .appendField("r");
      this.appendValueInput("MS")
          .setCheck("Number")
          .appendField("de");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("Move(l, r, de) — Drives the left/right motors, then waits for the given duration, in one block.\n\nภาษาไทย: สั่งมอเตอร์ซ้าย-ขวา แล้วหน่วงเวลาตามที่กำหนด รวมในบล็อกเดียว");
      this.setHelpUrl("");
    }
  };

  // ---- one-speed continuous-drive family: fd/bk/sl/sr/tl/tr — no delay, keeps driving until changed ----
  var ONE_SPEED = [
    { type: 'mg_fd', label: "fd",  tooltip: "fd(speed) — Drives forward at speed on both wheels. Returns immediately (no delay) — keeps driving until the next motor block.\n\nภาษาไทย: เดินหน้าด้วยความเร็วที่กำหนดทั้งสองล้อ คืนค่าทันที (ไม่หน่วงเวลา) วิ่งต่อไปจนกว่าจะมีบล็อกมอเตอร์ถัดไป" },
    { type: 'mg_bk', label: "bk",  tooltip: "bk(speed) — Drives backward at speed on both wheels. Returns immediately (no delay).\n\nภาษาไทย: ถอยหลังด้วยความเร็วที่กำหนดทั้งสองล้อ คืนค่าทันที (ไม่หน่วงเวลา)" },
    { type: 'mg_sl', label: "sl",  tooltip: "sl(speed) — Spins in place to the left (left wheel back, right wheel forward). Returns immediately (no delay).\n\nภาษาไทย: หมุนอยู่กับที่ไปทางซ้าย (ล้อซ้ายถอย ล้อขวาเดินหน้า) คืนค่าทันที (ไม่หน่วงเวลา)" },
    { type: 'mg_sr', label: "sr",  tooltip: "sr(speed) — Spins in place to the right (left wheel forward, right wheel back). Returns immediately (no delay).\n\nภาษาไทย: หมุนอยู่กับที่ไปทางขวา (ล้อซ้ายเดินหน้า ล้อขวาถอย) คืนค่าทันที (ไม่หน่วงเวลา)" },
    { type: 'mg_tl', label: "tl",  tooltip: "tl(speed) — Pivots left by driving only the right wheel. Returns immediately (no delay).\n\nภาษาไทย: เลี้ยวซ้ายโดยขับเฉพาะล้อขวา คืนค่าทันที (ไม่หน่วงเวลา)" },
    { type: 'mg_tr', label: "tr",  tooltip: "tr(speed) — Pivots right by driving only the left wheel. Returns immediately (no delay).\n\nภาษาไทย: เลี้ยวขวาโดยขับเฉพาะล้อซ้าย คืนค่าทันที (ไม่หน่วงเวลา)" }
  ];
  ONE_SPEED.forEach(function(def) {
    Blockly.Blocks[def.type] = {
      init: function() {
        this.appendValueInput("SPEED").setCheck("Number").appendField(def.label + "  speed");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLOUR);
        this.setTooltip(def.tooltip);
        this.setHelpUrl("");
      }
    };
  });

  // ---- two-speed continuous-drive family: fd2/bk2 — independent left/right speed, no delay ----
  var TWO_SPEED = [
    { type: 'mg_fd2', label: "fd2", tooltip: "fd2(speedL, speedR) — Drives forward with independent left/right speeds (same as Motor). Returns immediately (no delay).\n\nภาษาไทย: เดินหน้าโดยกำหนดความเร็วซ้าย-ขวาแยกกันเอง (เหมือน Motor) คืนค่าทันที (ไม่หน่วงเวลา)" },
    { type: 'mg_bk2', label: "bk2", tooltip: "bk2(speedL, speedR) — Drives backward with independent left/right speeds. Returns immediately (no delay).\n\nภาษาไทย: ถอยหลังโดยกำหนดความเร็วซ้าย-ขวาแยกกันเอง คืนค่าทันที (ไม่หน่วงเวลา)" }
  ];
  TWO_SPEED.forEach(function(def) {
    Blockly.Blocks[def.type] = {
      init: function() {
        this.appendValueInput("SPEEDL").setCheck("Number").appendField(def.label + "  speedL");
        this.appendValueInput("SPEEDR").setCheck("Number").appendField("speedR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLOUR);
        this.setTooltip(def.tooltip);
        this.setHelpUrl("");
      }
    };
  });
};
