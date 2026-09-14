function num(name, value) {
    return `<value name="${name}"><shadow type="math_number"><field name="NUM">${value}</field></shadow></value>`;
}

module.exports = {
    name: "เซอร์โว (Servo)",
    index: 18,
    color: "170",
    icon: "/static/icons/icons8_disconnected_96px.png",
    blocks: [
        "mg_servo_setup",
        { xml: `<block type="mg_servo">${num('DE1', 50)}${num('DE2', 40)}</block>` },
        { xml: `<block type="mg_arm_base">${num('ANGLE', 90)}</block>` },
        { xml: `<block type="mg_arm_gripper">${num('ANGLE', 90)}</block>` },
        "mg_servo_up",
        "mg_servo_up45",
        "mg_servo_down",
        "mg_servo_open",
        "mg_servo_close_small",
        "mg_servo_close_big",
        { xml: `<sep gap="16"></sep><label text="ท่าสำเร็จรูป" web-class="headline"></label>` },
        { xml: `<block type="mg_set_servo_preset">${num('VALUE', 90)}</block>` },
        { xml: `<sep gap="16"></sep><label text="คาลิเบรต" web-class="headline"></label>` },
        "mg_serial_servo_control"
    ]
};
