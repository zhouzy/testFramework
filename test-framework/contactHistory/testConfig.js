if (process.env.NODE_ENV === 'TEST') {
    const mixin = require('@/test-framework/contactHistory/mixin');
    mixin.default.mixin4test();
}