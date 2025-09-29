"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./globals.css");
exports.metadata = {
    title: "Byte Back",
    authors: [
        {
            name: "Waffen Sultan",
            url: "https://github.com/waffensultan",
        },
        {
            name: "Simonee Ezekiel",
            url: "https://github.com/",
        },
        {
            name: "Ostline Casao",
            url: "https://github.com/owostline",
        },
        {
            name: "John Yumul",
            url: "https://github.com/",
        },
    ],
};
function RootLayout({ children, }) {
    return ((0, jsx_runtime_1.jsx)("html", { lang: "en", children: (0, jsx_runtime_1.jsx)("body", { children: children }) }));
}
//# sourceMappingURL=layout.js.map