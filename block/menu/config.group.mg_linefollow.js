function num(name, value) {
    return `<value name="${name}"><shadow type="math_number"><field name="NUM">${value}</field></shadow></value>`;
}

function timedMove(type) {
    return { xml: `<block type="${type}">${num('SPEED', 50)}${num('TIME', 500)}</block>` };
}

function ffBlock(type) {
    return { xml: `<block type="${type}">${num('SPEED', 50)}</block>` };
}

module.exports = {
    name: "Line Follow",
    index: 17,
    color: "15",
    icon: "/static/icons/icons8_workflow_128px.png",
    blocks: [
        { xml: `<sep gap="16"></sep><label text="Timed Moves" web-class="headline"></label>` },
        timedMove('mg_forward'),
        timedMove('mg_backward'),
        timedMove('mg_pivot_left'),
        timedMove('mg_pivot_right'),
        timedMove('mg_spin_left_time'),
        timedMove('mg_spin_right_time'),

        { xml: `<sep gap="16"></sep><label text="Follow Line until Junction" web-class="headline"></label>` },
        ffBlock('mg_ff'),
        ffBlock('mg_ffc'),
        ffBlock('mg_ffc2'),
        ffBlock('mg_ffr'),
        ffBlock('mg_ffr5'),
        ffBlock('mg_ffr2'),
        ffBlock('mg_ffl'),
        ffBlock('mg_ffl0'),
        ffBlock('mg_ffl2'),
        ffBlock('mg_ffwhite'),
        ffBlock('mg_ffblack'),
        { xml: `<block type="mg_ffnum">${num('SPEED', 50)}</block>` },
        { xml: `<block type="mg_ff_distanced">${num('SPEED', 50)}${num('DIST', 10)}</block>` },

        { xml: `<sep gap="16"></sep><label text="Follow Line for Time / Manual Action" web-class="headline"></label>` },
        { xml: `<block type="mg_ff_timer">${num('SPEED', 50)}${num('TIME', 1000)}</block>` },
        { xml: `<block type="mg_ff_timer_select">${num('SPEED', 50)}${num('TIME', 1000)}</block>` },
        { xml: `<block type="mg_track_select">${num('SPD', 50)}</block>` },
        { xml: `<block type="mg_set_f">${num('NUM', 1)}</block>` }
    ]
};
