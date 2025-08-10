class ToasterJS {
    static get SUCCESS() { return 0; }
    static get ERROR() { return 1; }
    static get WARNING() { return 2; }
    static get INFO() { return 3; }
    static get FADE() { return 0; }
    static get SLIDE_UP() { return 1; }
    static get SLIDE_DOWN() { return 2; }
    static get SLIDE_LEFT() { return 3; }
    static get SLIDE_RIGHT() { return 4; }
    static get LTR() { return 0; }
    static get RTL() { return 1; }
    static get TOP_LEFT() { return 0; }
    static get TOP_RIGHT() { return 1; }
    static get BOTTOM_LEFT() { return 2; }
    static get BOTTOM_RIGHT() { return 3; }
    static get DARK() { return 0; }
    static get LIGHT() { return 1; }

    #icons = [
        {
            name: "success",
            svg: `<path d="M20 6L9 17l-5-5" />`
        }, 
        {
            name: "error",
            svg: `<circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />`
        },
        {
            name: "warning",
            svg: `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />`
        },
        {
            name: "info",
            svg: `<circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />`
        }
    ];
    #closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="ti close"><path d="M3 21.32L21 3.32001" /><path d="M3 3.32001L21 21.32" /></svg>`;
    #animations = ["fade", "slide-up", "slide-down", "slide-left", "slide-right"];
    #directions = ["ltr", "rtl"];
    #positions = [
        { top: "1rem", left: "1rem"},
        { top: "1rem", right: "1rem" },
        { bottom: "1rem", left: "1rem" },
        { bottom: "1rem", right: "1rem" }
    ];
    #inQueueToasts = [];

    #toasterContainer;
    #toasterContainerLimit;
    #toastAnimation;
    #toastDuration;
    #toastDirection;
    #toastPosition;
    #toastRounded;
    #toastQueueSystem;

    constructor(
        animation = ToasterJS.FADE,
        position = ToasterJS.BOTTOM_LEFT,
        duration = 2000,
        direction = ToasterJS.LTR,
        rounded = false,
        limit = 5,
        queue = false
    ) {
        this.#toasterContainer = document.querySelector(".toasterjs-toasts-container");
        if (!this.#toasterContainer) {
            let element = document.createElement("div");
            element.className = "toasterjs-toasts-container";
            this.#toasterContainer = element;
            document.body.prepend(this.#toasterContainer);
        }
        this.#toastAnimation = this.#getAnimationClassByNumber(animation);
        this.#toastDuration = duration >= 0 ? duration : 2000;
        this.#toastDirection = this.#getDirectionByNumber(direction);
        this.#toastPosition = this.#getPositionByNumber(position);
        this.#toastRounded = rounded;
        this.#toasterContainerLimit = limit;
        this.#toastQueueSystem = queue;

        if ("top" in this.#toastPosition) this.#toasterContainer.style.top = this.#toastPosition.top;
        if ("right" in this.#toastPosition) this.#toasterContainer.style.right = this.#toastPosition.right;
        if ("bottom" in this.#toastPosition) this.#toasterContainer.style.bottom = this.#toastPosition.bottom;
        if ("left" in this.#toastPosition) this.#toasterContainer.style.left = this.#toastPosition.left;
    }   

    toast(message, type) {
        if (!this.#toasterContainer) return;
        const element = this.#generateMyToast(message, type);

        if (element) {
            element.classList.add(this.#toastAnimation, "hide");
            element.style.direction = this.#toastDirection;
            element.style.borderRadius = this.#toastRounded ? "0.75rem" : "0";
            element.querySelector(".toaster-toast-icon.close").addEventListener("click", () => element.remove());
            this.#addToast(element);
        }
    }

    setTheme(theme) {
        switch (theme) {
            case 0: document.body.setAttribute("data-theme", "dark");
                break;
            default: document.body.removeAttribute("data-theme");
                break;
        }
    }

    #addToast(element) {
        if (this.#toasterContainer.children.length === this.#toasterContainerLimit) {
            if (!this.#toastQueueSystem) {
                this.#toasterContainer.firstChild.remove();
                this.#toasterContainer.appendChild(element);
                this.#showToastAnimational(element);
            } else {
                this.#inQueueToasts.push(element);
            }
        } else {
            this.#toasterContainer.appendChild(element);
            this.#showToastAnimational(element);
        }
    }

    #showToastAnimational(element) {
        setTimeout(() => {
            element.classList.remove("hide");
            element.classList.add("show");
        }, 1);
        setTimeout(() => {
            element.classList.remove("show");
            element.classList.add("hide");
            setTimeout(
                () => element.remove(), 
                100 + element.style.transitionDuration
            );

            if (this.#toastQueueSystem && this.#inQueueToasts.length !== 0 && this.#toasterContainer.children.length < this.#toasterContainerLimit) {
                const inQueueElement = this.#inQueueToasts[0];
                this.#toasterContainer.appendChild(inQueueElement);
                this.#showToastAnimational(inQueueElement);
                this.#inQueueToasts.shift();
            }
        }, this.#toastDuration);
    }

    #generateMyToast(message, type) {
        const iconSVG = this.#getIconByNumber(type);

        if (!iconSVG) return null;
        const toastDiv = document.createElement("div");
        toastDiv.classList.add("toaster-toast", this.#getIconNameByNumber(type));

        const toastIcon = document.createElement("i");
        toastIcon.className = "toaster-toast-icon";

        const xmlns = "http://www.w3.org/2000/svg";
        const toastIconSVG = document.createElementNS(xmlns, "svg");
        toastIconSVG.setAttribute("xmlns", xmlns);
        toastIconSVG.setAttribute("viewBox", "0 0 24 24");
        toastIconSVG.classList.add("ti");
        toastIconSVG.innerHTML = iconSVG.svg;

        const toastMessage = document.createElement("span");
        toastMessage.className = "toaster-toast-message";
        toastMessage.textContent = message;

        const closeIcon = document.createElement("i");
        closeIcon.classList.add("toaster-toast-icon", "close");
        closeIcon.innerHTML = this.#closeIcon;

        toastIcon.appendChild(toastIconSVG);
        toastDiv.append(toastIcon, toastMessage, closeIcon);
        return toastDiv;
    }

    #getIconByNumber(number) {
        return this.#icons[number] || null;
    }

    #getIconNameByNumber(number) {
        return this.#icons[number].name || null;
    }

    #getAnimationClassByNumber(number) {        
        return this.#animations[number] || null;
    }

    #getDirectionByNumber(number) {
        return this.#directions[number] || null;
    }

    #getPositionByNumber(number) {
        return this.#positions[number] || null;
    }
}