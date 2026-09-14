function num(name, value) {
    return `<value name="${name}"><shadow type="math_number"><field name="NUM">${value}</field></shadow></value>`;
}

module.exports = {
    name: "ความเร็ว/PID (Speed &amp; PID)",
    index: 15,
    color: "55",
    icon: "/static/icons/icons8_process_96px.png",
    blocks: [
        { xml: `<block type="mg_set_balance_speed">${num('SPDL', 0)}${num('SPDR', 0)}</block>` },
        { xml: `<block type="mg_set_balance_back_speed">${num('SPDL', 0)}${num('SPDR', 0)}</block>` },
        { xml: `<block type="mg_set_kp_kd">${num('KP', 0.050)}${num('KD', 0.50)}</block>` },
        { xml: `<block type="mg_mode_spd_pid">${num('MAX', 100)}${num('MIN', -100)}</block>` },
        { xml: `<block type="mg_set_center">${num('X', 50)}</block>` },
        { xml: `<block type="mg_pid">${num('SPEEDL', 50)}${num('SPEEDR', 50)}${num('KP', 0.050)}${num('KD', 0.50)}</block>` },
        { xml: `<block type="mg_read_position">${num('TRACK', 200)}${num('NOISE', 50)}</block>` }
    ]
};
