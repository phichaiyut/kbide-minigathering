function num(name, value) {
    return `<value name="${name}"><shadow type="math_number"><field name="NUM">${value}</field></shadow></value>`;
}

module.exports = {
    name: "มอเตอร์ (Motor)",
    index: 12,
    color: "290",
    icon: "/static/icons/icons8_exercise_96px.png",
    blocks: [
        { xml: `<block type="mg_motor">${num('L', 50)}${num('R', 50)}</block>` },
        { xml: `<block type="mg_motor_left">${num('SPEED', 50)}</block>` },
        { xml: `<block type="mg_motor_right">${num('SPEED', 50)}</block>` },
        "mg_motor_stop",
        { xml: `<block type="mg_motor_stop_delay">${num('MS', 100)}</block>` },
        { xml: `<block type="mg_move">${num('L', 50)}${num('R', 50)}${num('MS', 500)}</block>` },
        { xml: `<sep gap="16"></sep><label text="ขับเคลื่อนต่อเนื่อง (ไม่หน่วงเวลา)" web-class="headline"></label>` },
        { xml: `<block type="mg_fd">${num('SPEED', 50)}</block>` },
        { xml: `<block type="mg_bk">${num('SPEED', 50)}</block>` },
        { xml: `<block type="mg_sl">${num('SPEED', 50)}</block>` },
        { xml: `<block type="mg_sr">${num('SPEED', 50)}</block>` },
        { xml: `<block type="mg_tl">${num('SPEED', 50)}</block>` },
        { xml: `<block type="mg_tr">${num('SPEED', 50)}</block>` },
        { xml: `<block type="mg_fd2">${num('SPEEDL', 50)}${num('SPEEDR', 50)}</block>` },
        { xml: `<block type="mg_bk2">${num('SPEEDL', 50)}${num('SPEEDR', 50)}</block>` }
    ]
};
