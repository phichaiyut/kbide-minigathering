function num(name, value) {
    return `<value name="${name}"><shadow type="math_number"><field name="NUM">${value}</field></shadow></value>`;
}

module.exports = {
    name: "Sensor",
    index: 14,
    color: "200",
    icon: "/static/icons/icons8_thermometer_automation_96px.png",
    blocks: [
        "mg_read_sensor",
        "mg_read_calibrate",
        { xml: `<block type="mg_line_sensor"></block>` },
        { xml: `<block type="mg_distance_cm"></block>` },
        { xml: `<block type="mg_ref_line_value">${num('X', 500)}</block>` },
        { xml: `<block type="mg_track_line_color"></block>` },
        { xml: `<block type="mg_calibrate_sensor">${num('PAUSE', 20)}${num('SAMPLES', 200)}</block>` },
        "mg_save_calibrate",
        "mg_load_calibrate",
        {
            xml: `<block type="mg_sensor_value_min">${num('F0', 493)}${num('F1', 481)}${num('F2', 701)}${num('F3', 80)}${num('F4', 790)}${num('F5', 1455)}</block>`
        },
        {
            xml: `<block type="mg_sensor_value_max">${num('F0', 3333)}${num('F1', 3280)}${num('F2', 3500)}${num('F3', 3400)}${num('F4', 3700)}${num('F5', 3700)}</block>`
        },
        "mg_serial_sensor",
        "mg_serial_calibrate",
        "mg_serial_distance"
    ]
};
