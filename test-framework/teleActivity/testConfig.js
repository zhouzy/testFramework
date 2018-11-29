if (process.env.NODE_ENV === 'TEST') {
    const mixin = require('@/test-framework/teleActivity/mixin');
    mixin.default.mixin4test();
}