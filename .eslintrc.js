module.exports = {
  'parser': 'babel-eslint',
  'plugins': [
    'react',
    'import',
    'jsx-a11y',
  ],
  'settings': {
    'react': {
      'pragma': 'React',  // Pragma to use, default to "React"
      'version': '15.4.1' // React version, default to the latest React stable release
    },
  },

  'ecmaFeatures': {
    'jsx': true,
    'modules': true,
  },
  'env': {
    'browser': true,
    'amd': true,
    'es6': true,
    'node': true,
    'jquery': true,
  },

  'globals': {
    'React': true,
  },

  'rules': {
    'import/first': ['warn', 'absolute-first'],

    'react/sort-comp': [
      'warn', {
        order: [
          'static-methods',
          'lifecycle',
          '/^handle.+$/',
          '/^on.+$/',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'everything-else',
          '/^render.+$/',
          'render',
        ],
      }],

    // 要求或禁止末尾逗号, 可以自动修复
    'comma-dangle': [
      'warn',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'ignore',
      },
    ],

    // 禁止出现未使用过的变量，无法识别React组件
    'no-unused-vars': [
      'warn',
      {
        'vars': 'all',
        'args': 'after-used',
      },
    ],

    // 识别React组件变量
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',

    // 强制使用一致的反勾号、双引号或单引号，可以自动修复
    'quotes': [
      'warn',
      'single',
    ],

    // 强制在 JSX 属性中一致地使用双引号或单引号，可以自动修复
    'jsx-quotes': [
      'warn',
      'prefer-double',
    ],

    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': 'warn',

    // 要求或禁止使用分号而不是 ASI，可以自动修复
    'semi': ['warn', 'always'],

    // 强制分号之前和之后使用一致的空格，可以自动修复
    'semi-spacing': [
      'warn',
      {
        'before': false,
        'after': true,
      },
    ],

    // 禁止不必要的分号，可以自动修复
    'no-extra-semi': 'warn',

    // 禁用 console
    'no-console': [
      'warn',
      {
        'allow': [
          'warn',
          'error',
        ],
      },
    ],

    // 禁用行尾空格，可以自动修复
    'no-trailing-spaces': [
      'warn',
      {
        'skipBlankLines': true,
      },
    ],

    // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 'error',

    // 禁止出现多行空行，可以自动修复
    'no-multiple-empty-lines': [
      'warn',
      {
        'max': 2,
        'maxEOF': 1,
        'maxBOF': 0,
      },
    ],

    // 要求或禁止文件末尾存在空行，可以自动修复
    'eol-last': [
      'warn',
      'always',
    ],

    /**
     * airbnb 部分
     * */

    /**
     * airbnb 暂时不合适用的规则
     *
     * array-callback-return
     * func-style
     * no-loop-func
     * prefer-rest-params
     * space-before-function-paren
     * no-param-reassign
     * prefer-spread
     * no-confusing-arrow
     * no-undef
     * no-case-declarations
     * indent
     * space-before-blocks
     * keyword-spacing
     * space-infix-ops: "error"
     * newline-per-chained-call
     * padded-blocks
     * space-in-parens
     * array-bracket-spacing
     * object-curly-spacing
     * max-len
     * comma-style
     * comma-dangle
     * semi
     * camelcase
     * no-underscore-dangle
     * */

    //禁止使用var  可以自动修复
    'no-var': 'warn',

    //使用const 可以自动修复
    'prefer-const': 'warn',
    'no-const-assign': 'warn',

    //不使用new Object()
    'no-new-object': 'warn',

    //不能出现 {lukeSkywalker: lukeSkywalker}  可以自动修复
    'object-shorthand': 'warn',

    //对象key只能需要单引号时候才可以使用单引号  可以自动修复
    'quote-props': ['warn', 'as-needed'],

    //禁止 new Array()
    'no-array-constructor': 'warn',

    //使用字符串模板  可以自动修复
    'prefer-template': 'warn',

    'no-eval': 'warn',

    //禁止不必要的转义符
    // 'no-useless-escape': 'warn',

    //机制使用 new Function
    'no-new-func': 'warn',

    //函数表达式中  使用箭头函数
    'prefer-arrow-callback': 'warn',

    //箭头函数 参数是否有括号 可以自动修复
    'arrow-parens': ['warn', 'as-needed'],

    //箭头函数  函数体格式 可以自动修复
    'arrow-body-style': ['warn', 'as-needed'],

    //禁止写无用的 constructor
    'no-useless-constructor': 'warn',

    //禁止类型写重名成员
    'no-dupe-class-members': 'warn',

    //禁止从一个模块import多次
    'no-duplicate-imports': 'warn',

    //获取对象键值时候用合适的方式
    'dot-notation': 'warn',

    //禁止诸如 let a = 10, b = 20方式
    'one-var': ['warn', 'never'],

    //禁止 ++ --
    // 'no-plusplus': 'warn',

    //禁止表达式 诸如var thing = foo ? bar : baz === qux ? quxx : foobar; 写法
    // 'no-nested-ternary': 'warn',

    //禁止表达式 诸如 var a = x ? true : false; 写法  可以自动修复
    'no-unneeded-ternary': 'warn',

    //if else 格式 可以自动修复
    'brace-style': 'warn',

    //空两格 可以自动修复
    // 'indent': ['warn', 2],

    //中括号格式 可自动修复
    'space-before-blocks': 'warn',

    //注释格式  可以自动修复
    'spaced-comment': ['warn', 'always'],

    //块前空一格  可自动修复
    'keyword-spacing': ['warn', { 'before': true }],

    //块内代码paddingTop  可自动修复
    'padded-blocks': ['warn', 'never'],

    //禁止 foo( 'bar' ) 可自动修复
    'space-in-parens': ['warn', 'never'],

    //禁止 var arr = [ 'foo', 'bar' ];
    'array-bracket-spacing': ['warn', 'never'],

    //a + b
    'space-infix-ops': 'warn',

    //var obj = { 'foo': 'bar' };
    'object-curly-spacing': ['warn', 'always'],

    //必须加最后一个逗号
    // 'comma-dangle': ['warn', 'always-multiline'],

    //进制 var num = parseInt("071", 10);  10必填
    'radix': 'warn',

    /*//变量名字最少2字符
    'id-length': 'warn',*/

    // new People()  类名必须大写
    // 'new-cap': ['warn', { 'capIsNew': false }],

  },
};
