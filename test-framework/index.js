if (process.env.NODE_ENV === 'TEST') {
    import('@/test-framework/main.js').then(testFramework => {
        testFramework.default.start();
    });
}