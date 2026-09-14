module.exports = function(Blockly){
  'use strict';
  var COLOUR = 15;
  var SELECT_OPTIONS = [
    ["'s' (หยุด)", "s"],
    ["'p' (เดินข้ามแยก)", "p"],
    ["'l' (เลี้ยวซ้าย)", "l"],
    ["'r' (เลี้ยวขวา)", "r"],
    ["'f' (เดินหน้าต่อ)", "f"],
    ["'q' (เลี้ยวซ้ายจนเจอเซนเซอร์ 0)", "q"],
    ["'e' (เลี้ยวขวาจนเจอเซนเซอร์ 5)", "e"]
  ];
  var SENSOR_OPTIONS = [
    ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]
  ];

  // ---- timed-move family: FD/BK/TL/TR/SL/SR — all (Speed, Time) ----
  var TIMED_MOVES = [
    { type: 'mg_forward',        label: "เดินหน้าตามเวลา (FD)",  tooltip: "FD(Speed, Time) — Drives forward at the balanced speed, for the given time.\n\nภาษาไทย: เดินหน้าด้วยความเร็วที่ปรับสมดุลแล้ว ตามเวลาที่กำหนด" },
    { type: 'mg_backward',       label: "ถอยหลังตามเวลา (BK)",  tooltip: "BK(Speed, Time) — Drives backward at the balanced speed, for the given time.\n\nภาษาไทย: ถอยหลังด้วยความเร็วที่ปรับสมดุลแล้ว ตามเวลาที่กำหนด" },
    { type: 'mg_pivot_left',     label: "เลี้ยวซ้ายตามเวลา (TL)",  tooltip: "TL(Speed, Time) — Pivots left by driving only the right wheel, for the given time.\n\nภาษาไทย: เลี้ยวซ้ายโดยขับเฉพาะล้อขวา ตามเวลาที่กำหนด" },
    { type: 'mg_pivot_right',    label: "เลี้ยวขวาตามเวลา (TR)",  tooltip: "TR(Speed, Time) — Pivots right by driving only the left wheel, for the given time.\n\nภาษาไทย: เลี้ยวขวาโดยขับเฉพาะล้อซ้าย ตามเวลาที่กำหนด" },
    { type: 'mg_spin_left_time', label: "หมุนซ้ายตามเวลา (SL)",  tooltip: "SL(Speed, Time) — Spins in place to the left, for the given time.\n\nภาษาไทย: หมุนอยู่กับที่ไปทางซ้าย ตามเวลาที่กำหนด" },
    { type: 'mg_spin_right_time',label: "หมุนขวาตามเวลา (SR)",  tooltip: "SR(Speed, Time) — Spins in place to the right, for the given time.\n\nภาษาไทย: หมุนอยู่กับที่ไปทางขวา ตามเวลาที่กำหนด" }
  ];
  TIMED_MOVES.forEach(function(def) {
    Blockly.Blocks[def.type] = {
      init: function() {
        this.appendValueInput("SPEED").setCheck("Number").appendField(def.label + "  ความเร็ว");
        this.appendValueInput("TIME").setCheck("Number").appendField("เวลา");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLOUR);
        this.setTooltip(def.tooltip);
        this.setHelpUrl("");
      }
    };
  });

  // ---- FF family (line-follow until a sensor pattern is met, then react): (Speed, select) ----
  var FF_FAMILY = [
    { type: 'mg_ff',       label: "เดินตามเส้นถึงทางแยกกว้าง (FF)",      tooltip: "FF(Speed, select) — Follows the line with PID until a wide junction is reached, then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนเจอทางแยกกว้าง แล้วทำคำสั่งที่เลือกไว้ทันที" },
    { type: 'mg_ffc',      label: "เดินตามเส้นถึงเส้นตัด (FFC)",     tooltip: "FFC(Speed, select) — Follows the line with PID until both left and right cross-lines are reached, then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนเจอเส้นตัดทั้งซ้ายและขวาพร้อมกัน แล้วทำคำสั่งที่เลือกไว้ทันที" },
    { type: 'mg_ffc2',     label: "เดินตามเส้นถึงเส้นตัดกลาง (FFC2)",    tooltip: "FFC2(Speed, select) — Follows the line with PID until a center cross-line is reached, then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนเจอเส้นตัดกึ่งกลาง แล้วทำคำสั่งที่เลือกไว้ทันที" },
    { type: 'mg_ffr',      label: "เดินตามเส้นถึงทางแยกขวา (FFR)",     tooltip: "FFR(Speed, select) — Follows the line with PID until a right junction is reached, then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนเจอทางแยกขวา แล้วทำคำสั่งที่เลือกไว้ทันที" },
    { type: 'mg_ffr5',     label: "เดินตามเส้นถึงเซนเซอร์ขวาสุด (FFR5)",    tooltip: "FFR5(Speed, select) — Follows the line with PID until the rightmost sensor detects the line, then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนเซนเซอร์ขวาสุดเจอเส้น แล้วทำคำสั่งที่เลือกไว้ทันที" },
    { type: 'mg_ffr2',     label: "เดินตามเส้นถึงทางแยกขวากว้าง (FFR2)",    tooltip: "FFR2(Speed, select) — Follows the line with PID until a wide right junction is reached, then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนเจอทางแยกขวาแบบกว้าง แล้วทำคำสั่งที่เลือกไว้ทันที" },
    { type: 'mg_ffl',      label: "เดินตามเส้นถึงทางแยกซ้าย (FFL)",     tooltip: "FFL(Speed, select) — Follows the line with PID until a left junction is reached, then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนเจอทางแยกซ้าย แล้วทำคำสั่งที่เลือกไว้ทันที" },
    { type: 'mg_ffl0',     label: "เดินตามเส้นถึงเซนเซอร์ซ้ายสุด (FFL0)",    tooltip: "FFL0(Speed, select) — Follows the line with PID until the leftmost sensor detects the line, then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนเซนเซอร์ซ้ายสุดเจอเส้น แล้วทำคำสั่งที่เลือกไว้ทันที" },
    { type: 'mg_ffl2',     label: "เดินตามเส้นถึงทางแยกซ้ายกว้าง (FFL2)",    tooltip: "FFL2(Speed, select) — Follows the line with PID until a wide left junction is reached, then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนเจอทางแยกซ้ายแบบกว้าง แล้วทำคำสั่งที่เลือกไว้ทันที" },
    { type: 'mg_ffwhite',  label: "เดินตามเส้นถึงหลุดเส้น (FFWhite)", tooltip: "FFWhite(Speed, select) — Follows the line with PID until every sensor loses the line, then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนทุกเซนเซอร์หลุดจากเส้น แล้วทำคำสั่งที่เลือกไว้ทันที" },
    { type: 'mg_ffblack',  label: "เดินตามเส้นถึงเจอเส้น (FFBlack)", tooltip: "FFBlack(Speed, select) — Drives forward then switches to PID line-following until any single sensor detects the line, then performs the chosen action.\n\nภาษาไทย: ขับตรงไปก่อน แล้วสลับเป็นเดินตามเส้นด้วย PID จนมีเซนเซอร์ตัวใดตัวหนึ่งเจอเส้น แล้วทำคำสั่งที่เลือกไว้ทันที" }
  ];
  FF_FAMILY.forEach(function(def) {
    Blockly.Blocks[def.type] = {
      init: function() {
        this.appendValueInput("SPEED").setCheck("Number").appendField(def.label + "  ความเร็ว");
        this.appendDummyInput()
            .appendField("เลือกคำสั่ง")
            .appendField(new Blockly.FieldDropdown(SELECT_OPTIONS), "SELECT");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLOUR);
        this.setTooltip(def.tooltip);
        this.setHelpUrl("");
      }
    };
  });

  Blockly.Blocks['mg_track_select'] = {
    init: function() {
      this.appendValueInput("SPD").setCheck("Number").appendField("ทำคำสั่งทางแยก (TrackSelect)  ความเร็ว");
      this.appendDummyInput()
          .appendField("เลือกคำสั่ง")
          .appendField(new Blockly.FieldDropdown(SELECT_OPTIONS), "SELECT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("TrackSelect(spd, select) — Performs a junction action immediately (stop/drive across/turn left/turn right/continue/etc.) — the same action every Follow Line block runs when it finishes.\n\nภาษาไทย: ทำคำสั่งที่ทางแยกทันที (หยุด/เดินข้ามแยก/เลี้ยวซ้าย/เลี้ยวขวา/วิ่งต่อ ฯลฯ) เป็นคำสั่งเดียวกับที่บล็อกเดินตามเส้นด้านบนเรียกใช้ตอนจบ");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_ff_distanced'] = {
    init: function() {
      this.appendValueInput("SPEED").setCheck("Number").appendField("เดินตามเส้นจนเจอสิ่งกีดขวาง (FF_DISTANCED)  ความเร็ว");
      this.appendValueInput("DIST").setCheck("Number").appendField("ระยะ");
      this.appendDummyInput()
          .appendField("เลือกคำสั่ง")
          .appendField(new Blockly.FieldDropdown(SELECT_OPTIONS), "SELECT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("FF_DISTANCED(Speed, select, dist) — Follows the line with PID until the ultrasonic sensor detects an obstacle within the given distance (cm), then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนกว่าเซนเซอร์อัลตราโซนิกจะเจอสิ่งกีดขวางในระยะที่กำหนด (ซม.) แล้วทำคำสั่งที่เลือกไว้ทันที");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_ff_timer'] = {
    init: function() {
      this.appendValueInput("SPEED").setCheck("Number").appendField("เดินตามเส้นตามเวลา (FFTimer)  ความเร็ว");
      this.appendValueInput("TIME").setCheck("Number").appendField("เวลารวม");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("FFTimer(Speed, TotalTime) — Follows the line with PID for the given duration, then stops on its own without performing a follow-up action.\n\nภาษาไทย: เดินตามเส้นด้วย PID ตามระยะเวลาที่กำหนด แล้วหยุดเองโดยไม่ทำคำสั่งต่อ");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_ff_timer_select'] = {
    init: function() {
      this.appendValueInput("SPEED").setCheck("Number").appendField("เดินตามเส้นตามเวลา (FFTimer)  ความเร็ว");
      this.appendValueInput("TIME").setCheck("Number").appendField("เวลารวม");
      this.appendDummyInput()
          .appendField("เลือกคำสั่ง")
          .appendField(new Blockly.FieldDropdown(SELECT_OPTIONS), "SELECT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("FFTimer(Speed, TotalTime, select) — Follows the line with PID for the given duration, then performs the chosen action afterwards.\n\nภาษาไทย: เดินตามเส้นด้วย PID ตามระยะเวลาที่กำหนด แล้วทำคำสั่งที่เลือกไว้ต่อท้าย");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_set_f'] = {
    init: function() {
      this.appendValueInput("NUM").setCheck("Number").appendField("จัดกึ่งกลางเส้น (set_f)  จำนวนครั้ง");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("set_f(num) — Nudges the robot left/right using the two outer line sensors (F[0]/F[5]) until centered on the line, then settles. Repeats this centering cycle num times — use before crossing a junction so the robot enters it straight.\n\nภาษาไทย: ขยับหุ่นยนต์ซ้าย-ขวาโดยใช้เซนเซอร์ริมสองตัว (F[0]/F[5]) จนอยู่กึ่งกลางเส้น แล้วหยุดนิ่ง ทำซ้ำวงจรนี้ตามจำนวนที่กำหนด ใช้ก่อนข้ามทางแยกเพื่อให้หุ่นยนต์เข้าทางแยกตรง ๆ");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_ffnum'] = {
    init: function() {
      this.appendValueInput("SPEED").setCheck("Number").appendField("เดินตามเส้นถึงเซนเซอร์ที่เลือก (FFNUM)  ความเร็ว");
      this.appendDummyInput()
          .appendField("หมายเลขเซนเซอร์")
          .appendField(new Blockly.FieldDropdown(SENSOR_OPTIONS), "NUMM")
          .appendField("เลือกคำสั่ง")
          .appendField(new Blockly.FieldDropdown(SELECT_OPTIONS), "SELECT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("FFNUM(Speed, select, numm) — Follows the line with PID until the selected sensor detects the line, then performs the chosen action.\n\nภาษาไทย: เดินตามเส้นด้วย PID จนกว่าเซนเซอร์ตัวที่เลือกจะเจอเส้น แล้วทำคำสั่งที่เลือกไว้ทันที");
      this.setHelpUrl("");
    }
  };
};
