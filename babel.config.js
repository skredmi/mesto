const presets = [
      [
        "@babel/env",
        {
          "targets": {
            "edge": "17",
            "firefox": "60",
            "chrome": "67",
            "safari": "11.1",
          },
          useBuiltIns: "entry"
        }
      ],
    {
    "plugins": [
        ["transform-class-properties", { "spec": true }]
    ]
    }
];
module.exports = { presets };