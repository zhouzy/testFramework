if (process.env.NODE_ENV === 'TEST') {
    const mixin = require('@/test-framework/userTest/mixin');
    mixin.default.mixin4test();
}