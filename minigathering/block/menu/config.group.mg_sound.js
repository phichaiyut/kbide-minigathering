function num(name, value) {
    return `<value name="${name}"><shadow type="math_number"><field name="NUM">${value}</field></shadow></value>`;
}

module.exports = {
    name: "Sound &amp; Button",
    index: 13,
    color: "45",
    icon: "/static/icons/buzzer.png",
    blocks: [
        "mg_beep",
        { xml: `<block type="mg_beep_ms">${num('MS', 100)}</block>` },
        "mg_buzzer_on",
        "mg_buzzer_off",
        "mg_fast_beep",
        "mg_wait_ok",
        "mg_button_pressed"
    ]
};
