'use strict';
var context = global.document.createDocumentFragment();

/**
 * @param {string} name
 * @param {Object} data
 */
function publish(name, data) {
    context.dispatchEvent(new global.CustomEvent(name, {
        'detail': data
    }));
}

/**
 * @param {string} name
 * @param {Function} callback
 * @returns {Function}
 */
function subscribe(name, callback) {
    function onDispatch(event) {
        callback(JSON.parse(JSON.stringify(event.detail)));
    }

    context.addEventListener(name, onDispatch, false);
    return function () {
        context.removeEventListener(name, onDispatch, false);
    };
}

exports.publish = publish;
exports.subscribe = subscribe;

