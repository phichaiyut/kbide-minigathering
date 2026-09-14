module.exports = function(Blockly){
  'use strict';
  var COLOUR = 45;

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

  zeroArgBlock('mg_beep', "beep", "beep() — Buzzer sounds briefly, about 50 ms.\n\nภาษาไทย: บัซเซอร์ดังสั้น ๆ ประมาณ 50 มิลลิวินาที");
  zeroArgBlock('mg_buzzer_on', "BZon", "BZon() — Turns the buzzer on and holds it. Must be paired with BZoff.\n\nภาษาไทย: เปิดเสียงบัซเซอร์ค้างไว้ ต้องใช้คู่กับ BZoff เสมอ");
  zeroArgBlock('mg_buzzer_off', "BZoff", "BZoff() — Turns off a buzzer left on.\n\nภาษาไทย: ปิดเสียงบัซเซอร์ที่เปิดค้างไว้");
  zeroArgBlock('mg_fast_beep', "fastBeep", "fastBeep() — Buzzer sounds very briefly, about 15 ms.\n\nภาษาไทย: บัซเซอร์ดังสั้นมาก ประมาณ 15 มิลลิวินาที");
  zeroArgBlock('mg_wait_ok', "WaitOK", "WaitOK() — Waits until the button is pressed, then beeps to confirm.\n\nภาษาไทย: หยุดรอจนกว่าจะกดปุ่ม แล้วบี๊บยืนยัน");

  Blockly.Blocks['mg_beep_ms'] = {
    init: function() {
      this.appendValueInput("MS")
          .setCheck("Number")
          .appendField("Beep  de");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("Beep(de) — Buzzer sounds for the given duration (milliseconds).\n\nภาษาไทย: บัซเซอร์ดังตามระยะเวลาที่กำหนด (มิลลิวินาที)");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_button_pressed'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("OK_PUSH");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(COLOUR);
      this.setTooltip("OK_PUSH() == 1 — Returns true if the button is currently pressed. Checks instantly without blocking the program.\n\nภาษาไทย: ตรวจสอบทันทีว่าปุ่มถูกกดอยู่หรือไม่ (คืนค่าจริง/เท็จ) โดยไม่หยุดรอโปรแกรม");
      this.setHelpUrl("");
    }
  };
};
