function num(name, value) {
    return `<value name="${name}"><shadow type="math_number"><field name="NUM">${value}</field></shadow></value>`;
}

module.exports = {
    name: "เลี้ยว/หมุน (Turning)",
    index: 16,
    color: "120",
    icon: "/static/icons/icons8_repeat_96px.png",
    blocks: [
        { xml: `<block type="mg_turn_speed_left">${num('L', 100)}${num('R', 100)}${num('DE', 40)}</block>` },
        { xml: `<block type="mg_turn_speed_right">${num('L', 100)}${num('R', 100)}${num('DE', 40)}</block>` },
        { xml: `<block type="mg_set_turn_speed">${num('SPD', 60)}</block>` },
        { xml: `<block type="mg_set_to_center_speed">${num('SPD', 60)}</block>` },
        { xml: `<block type="mg_delay_c_f">${num('DE', 300)}</block>` },
        "mg_to_center",
        "mg_turn_left",
        "mg_turn_right",
        "mg_spin_left",
        "mg_spin_left2",
        "mg_spin_right",
        "mg_spin_right2"
    ]
};
