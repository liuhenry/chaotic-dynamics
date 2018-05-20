"use strict";
exports.__esModule = true;
exports.Actions = {
    CHANGE_DAMPING: 'CHANGE_DAMPING'
};
function changeDamping(value) {
    return {
        type: exports.Actions.CHANGE_DAMPING,
        value: value
    };
}
exports.changeDamping = changeDamping;
