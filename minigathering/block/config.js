let mg_setup = require("./menu/config.group.mg_setup");
let mg_motor = require("./menu/config.group.mg_motor");
let mg_sound = require("./menu/config.group.mg_sound");
let mg_sensor = require("./menu/config.group.mg_sensor");
let mg_speed = require("./menu/config.group.mg_speed");
let mg_turning = require("./menu/config.group.mg_turning");
let mg_linefollow = require("./menu/config.group.mg_linefollow");
let mg_servo = require("./menu/config.group.mg_servo");

module.exports = {
  blocks: [
    mg_setup,
    mg_motor,
    mg_sound,
    mg_sensor,
    mg_speed,
    mg_turning,
    mg_linefollow,
    mg_servo
  ],
};
