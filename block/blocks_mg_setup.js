module.exports = function(Blockly){
  'use strict';

  Blockly.Blocks['mg_robotsetup'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("robotsetup");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip("robotsetup() — Initializes Serial, button, buzzer, and motor pins. Must always be called before any other MiniGathering block (usually the first block in setup).\n\nภาษาไทย: เริ่มต้นระบบของหุ่นยนต์ทั้งหมด (Serial, ปุ่ม, บัซเซอร์, มอเตอร์) ต้องวางเป็นบล็อกแรกสุดเสมอ ก่อนใช้บล็อก MiniGathering อื่นใด");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_wait_start'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("wait_start");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip("wait_start() — Waits until the button is pressed. Holding it for more than 2 seconds starts automatic line-sensor calibration.\n\nภาษาไทย: หยุดรอจนกว่าจะกดปุ่มเริ่ม ถ้ากดค้างเกิน 2 วินาทีจะเข้าสู่โหมดคาลิเบรตเซนเซอร์เส้นให้อัตโนมัติ");
      this.setHelpUrl("");
    }
  };
};
