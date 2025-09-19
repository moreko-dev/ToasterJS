class ToastConsts {
    static Animation = Object.freeze({ 
        FADE: "fade",
        SLIDE_UP: "slide-up",
        SLIDE_DOWN: "slide-down",
        SLIDE_LEFT: "slide-left",
        SLIDE_RIGHT: "slide-right",
        ZOOM_IN: "zoom-in",
        ZOOM_OUT: "zoom-out",
        BOUNCE: "bounce",
        FLIP: "flip"
    });

    static Direction = Object.freeze({ 
        AUTO: "auto",
        LTR: "ltr",
        RTL: "rtl"
    });

    static Icon = {
        DEFAULT: `<svg class="ti default" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>`,
        SUCCESS: `<svg class="ti default" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>`,
        ERROR: `<svg class="ti default" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
        WARNING: `<svg class="ti default" viewBox="0 0 24 24"><path d="M12 2l10 18H2z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>`,
        INFO: `<svg class="ti default" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>`,
        PENDING: `<svg class="ti default" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-dasharray="31.4" stroke-dashoffset="0"/></svg>`,
        QUESTION: `<svg class="ti default" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v.01"/><path d="M12 8a2 2 0 0 1 2 2c0 2-3 2-3 4"/></svg>`,
        SUCCESS_ACTION: `<svg class="ti default" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/><path d="M12 3v4"/></svg>`,
        CLOSE: `<svg class="ti default" viewBox="0 0 24 24"><path d="M3 21.32L21 3.32001"/><path d="M3 3.32001L21 21.32"/></svg>`
    };

    static Position = Object.freeze({ 
        TOP_LEFT: "top_left",
        TOP_RIGHT: "top_right",
        TOP_CENTER: "top_center",
        BOTTOM_LEFT: "bottom_left",
        BOTTOM_RIGHT: "bottom_right",
        BOTTOM_CENTER: "bottom_center"
    });

    static Theme = Object.freeze({ 
        DARK: "dark",
        LIGHT: "light"
    });

    static Type = Object.freeze({ 
        SUCCESS: "success",
        INFO: "info",
        WARNING: "warning",
        ERROR: "error",
        DEFAULT: "default",
        PENDING: "pending",
        QUESTION: "question",
        SUCCESS_ACTION: "success_action"
    });

    static getStyleByPosition(position) {
        let [ jc, ai ] = position.split("_");
        jc = jc === "bottom" ? "end" : "start";
        ai = ai === "right" ? "end" : ai === "center" ? "center" : "start";
        return { jc, ai };
    }
}

export default ToastConsts;