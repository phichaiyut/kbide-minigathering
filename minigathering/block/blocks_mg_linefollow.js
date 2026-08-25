module.exports = function(Blockly){
  'use strict';
  var COLOUR = 15;
  var SELECT_OPTIONS = [
    ["'s' (Stop)", "s"],
    ["'p' (Pause)", "p"],
    ["'l' (Left)", "l"],
    ["'r' (Right)", "r"],
    ["'f' (Forward)", "f"],
    ["'q' (Left until sensor 0)", "q"],
    ["'e' (Right until sensor 5)", "e"]
  ];
  var SENSOR_OPTIONS = [
    ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]
  ];

  // ---- timed-move family: FD/BK/TL/TR/SL/SR — all (Speed, Time) ----
  var TIMED_MOVES = [
    { type: 'mg_forward',        label: "FD",  tooltip: "FD(Speed, Time) — Drives forward at the balanced speed, for the given time." },
    { type: 'mg_backward',       label: "BK",  tooltip: "BK(Speed, Time) — Drives backward at the balanced speed, for the given time." },
    { type: 'mg_pivot_left',     label: "TL",  tooltip: "TL(Speed, Time) — Pivots left by driving only the right wheel, for the given time." },
    { type: 'mg_pivot_right',    label: "TR",  tooltip: "TR(Speed, Time) — Pivots right by driving only the left wheel, for the given time." },
    { type: 'mg_spin_left_time', label: "SL",  tooltip: "SL(Speed, Time) — Spins in place to the left, for the given time." },
    { type: 'mg_spin_right_time',label: "SR",  tooltip: "SR(Speed, Time) — Spins in place to the right, for the given time." }
  ];
  TIMED_MOVES.forEach(function(def) {
    Blockly.Blocks[def.type] = {
      init: function() {
        this.appendValueInput("SPEED").setCheck("Number").appendField(def.label + "  Speed");
        this.appendValueInput("TIME").setCheck("Number").appendField("Time");
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
    { type: 'mg_ff',       label: "FF",      tooltip: "FF(Speed, select) — Follows the line with PID until a wide junction is reached, then performs the chosen action." },
    { type: 'mg_ffc',      label: "FFC",     tooltip: "FFC(Speed, select) — Follows the line with PID until both left and right cross-lines are reached, then performs the chosen action." },
    { type: 'mg_ffc2',     label: "FFC2",    tooltip: "FFC2(Speed, select) — Follows the line with PID until a center cross-line is reached, then performs the chosen action." },
    { type: 'mg_ffr',      label: "FFR",     tooltip: "FFR(Speed, select) — Follows the line with PID until a right junction is reached, then performs the chosen action." },
    { type: 'mg_ffr5',     label: "FFR5",    tooltip: "FFR5(Speed, select) — Follows the line with PID until the rightmost sensor detects the line, then performs the chosen action." },
    { type: 'mg_ffr2',     label: "FFR2",    tooltip: "FFR2(Speed, select) — Follows the line with PID until a wide right junction is reached, then performs the chosen action." },
    { type: 'mg_ffl',      label: "FFL",     tooltip: "FFL(Speed, select) — Follows the line with PID until a left junction is reached, then performs the chosen action." },
    { type: 'mg_ffl0',     label: "FFL0",    tooltip: "FFL0(Speed, select) — Follows the line with PID until the leftmost sensor detects the line, then performs the chosen action." },
    { type: 'mg_ffl2',     label: "FFL2",    tooltip: "FFL2(Speed, select) — Follows the line with PID until a wide left junction is reached, then performs the chosen action." },
    { type: 'mg_ffwhite',  label: "FFWhite", tooltip: "FFWhite(Speed, select) — Follows the line with PID until every sensor loses the line, then performs the chosen action." },
    { type: 'mg_ffblack',  label: "FFBlack", tooltip: "FFBlack(Speed, select) — Drives forward then switches to PID line-following until any single sensor detects the line, then performs the chosen action." }
  ];
  FF_FAMILY.forEach(function(def) {
    Blockly.Blocks[def.type] = {
      init: function() {
        this.appendValueInput("SPEED").setCheck("Number").appendField(def.label + "  Speed");
        this.appendDummyInput()
            .appendField("select")
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
      this.appendValueInput("SPD").setCheck("Number").appendField("TrackSelect  spd");
      this.appendDummyInput()
          .appendField("select")
          .appendField(new Blockly.FieldDropdown(SELECT_OPTIONS), "SELECT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("TrackSelect(spd, select) — Performs a junction action immediately (stop/pause/turn left/turn right/continue/etc.) — the same action every Follow Line block runs when it finishes.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_ff_distanced'] = {
    init: function() {
      this.appendValueInput("SPEED").setCheck("Number").appendField("FF_DISTANCED  Speed");
      this.appendValueInput("DIST").setCheck("Number").appendField("dist");
      this.appendDummyInput()
          .appendField("select")
          .appendField(new Blockly.FieldDropdown(SELECT_OPTIONS), "SELECT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("FF_DISTANCED(Speed, select, dist) — Follows the line with PID until the ultrasonic sensor detects an obstacle within the given distance (cm), then performs the chosen action.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_ff_timer'] = {
    init: function() {
      this.appendValueInput("SPEED").setCheck("Number").appendField("FFTimer  Speed");
      this.appendValueInput("TIME").setCheck("Number").appendField("TotalTime");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("FFTimer(Speed, TotalTime) — Follows the line with PID for the given duration, then stops on its own without performing a follow-up action.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_ff_timer_select'] = {
    init: function() {
      this.appendValueInput("SPEED").setCheck("Number").appendField("FFTimer  Speed");
      this.appendValueInput("TIME").setCheck("Number").appendField("TotalTime");
      this.appendDummyInput()
          .appendField("select")
          .appendField(new Blockly.FieldDropdown(SELECT_OPTIONS), "SELECT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("FFTimer(Speed, TotalTime, select) — Follows the line with PID for the given duration, then performs the chosen action afterwards.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_set_f'] = {
    init: function() {
      this.appendValueInput("NUM").setCheck("Number").appendField("set_f  num");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("set_f(num) — Nudges the robot left/right using the two outer line sensors (F[0]/F[5]) until centered on the line, then settles. Repeats this centering cycle num times — use before crossing a junction so the robot enters it straight.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mg_ffnum'] = {
    init: function() {
      this.appendValueInput("SPEED").setCheck("Number").appendField("FFNUM  Speed");
      this.appendDummyInput()
          .appendField("numm")
          .appendField(new Blockly.FieldDropdown(SENSOR_OPTIONS), "NUMM")
          .appendField("select")
          .appendField(new Blockly.FieldDropdown(SELECT_OPTIONS), "SELECT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLOUR);
      this.setTooltip("FFNUM(Speed, select, numm) — Follows the line with PID until the selected sensor detects the line, then performs the chosen action.");
      this.setHelpUrl("");
    }
  };
};
