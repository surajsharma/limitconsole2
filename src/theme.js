// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    components: {
        Breadcrumb: {
            BreadcrumbItem: {
                // 1. We can update the base styles
                baseStyle: {
                    fontFamily: "Noto Sans KR, sans-serif",
                    fontSize: "10px",
                },
                // 2. We can add a new button size or extend existing
                sizes: {
                    xs: {
                        fontSize: "10px",
                    },
                },
            },
        },
    },
});

export default theme;
