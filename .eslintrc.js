module.exports = {
    'plugins': ['jasmine'],
    'env': {
        'browser': true,
        'es2021': true,
        'jasmine': true,
        'jest': true
    },
    'globals': {
        'global': 'writable'
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'no-unused-vars': 'error'
    }
};
