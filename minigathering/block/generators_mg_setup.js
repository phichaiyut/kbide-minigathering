module.exports = function(Blockly){
  'use strict';

  Blockly.JavaScript['mg_robotsetup'] = function(block) {
    return 'robotsetup();\n';
  };

  Blockly.JavaScript['mg_wait_start'] = function(block) {
    return 'wait_start();\n';
  };
};
