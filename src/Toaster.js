import ToastConsts from "./ToastConsts.js";

class ToasterJS {
    #inQueueToasts = [];
    #animation;
    #direction;
    #position;
    #duration;
    #roundedValue;
    #limit;
    #queue;
    #container;

    constructor(options = {}) {
        this.#animation = options.animation || ToastConsts.Animation.FADE;
        this.#direction = options.direction || ToastConsts.Direction.AUTO;
        this.#position = options.position || ToastConsts.Position.BOTTOM_LEFT;
        this.#duration = options.duration || 2000;
        this.#roundedValue = options.roundedValue || "0";
        this.#limit = options.limit || 5;
        this.#queue = options.queue || false;
        this.#init();
    }

    #init() {
        this.#container = document.querySelector(".toasterjs-toasts-container");
        if (!this.#container) {
            const container = document.createElement("div");
            container.className = "toasterjs-toasts-container";
            this.#container = container;
            document.body.insertAdjacentElement("beforeend", container);
        }
        const position = ToastConsts.getStyleByPosition(this.#position);
        this.#container.style.justifyContent = position.jc;
        this.#container.style.alignItems = position.ai;
        this.#container.style.direction = this.#direction;
        this.#container.style.height = `${window.innerHeight - 16}px`;
        document.addEventListener("click", (e) => {
            const el = e.target.closest(".toasterjs-toast > .close > .close-button");
            if (el) el.parentElement.parentElement.remove();
        });
        window.addEventListener("resize", () => {
            this.#container.style.height = `${window.innerHeight - 16}px`;
        });
    }

    toast(message, options = {}, title = null) {
        if (!this.#container) return;

        const type = options.type || ToastConsts.Type.DEFAULT;
        const duration = options.duration || this.#duration;
        const animation = options.animation || this.#animation;
        const roundedValue = options.roundedValue || this.#roundedValue;

        const element = this.#createToast(message, type, title);
        element.classList.add(animation, "hide");
        element.style.borderRadius = roundedValue;

        this.#handleToasting(element, this.#animateToast.bind(this), element, { duration });
    }

    toastPending(message, fns, title = null, options = {}) {
        if (!this.#container) return;

        const animation = options.animation || this.#animation;
        const roundedValue = options.roundedValue || this.#roundedValue;

        const element = this.#createToast(message, ToastConsts.Type.PENDING, title);
        element.classList.add(animation, "hide");
        element.style.borderRadius = roundedValue;

        this.#handleToasting(element, this.#animateToastPending.bind(this), 
            element, { action: fns.action, onSuccess: fns.onSuccess, onError: fns.onError }
        );
    }

    toastAction(message, actions, title = null, options = {}) {
        if (!this.#container) return;

        const type = options.type || ToastConsts.Type.QUESTION;
        const animation = options.animation || this.#animation;
        const roundedValue = options.roundedValue || this.#roundedValue;

        const element = this.#createActionToast(message, type, actions, title);
        element.classList.add(animation, "hide");
        element.style.borderRadius = roundedValue;

        this.#handleToasting(element, this.#showToastElement.bind(this), element);
    }

    #animateToast(element, options = {}) {
        const duration = options.duration || this.#duration;
        this.#showToastElement(element);
        setTimeout(() => {
            this.#hideToastElement(element);
            this.#handleQueue();
        }, duration);
    }

    #animateToastPending(element, options = {}) {
        this.#showToastElement(element);

        return new Promise(async (resolve, reject) => {
            try {
                const result = await options.action();
                this.#hideToastElement(element);
                options.onSuccess();
                resolve(result);
            } catch (err) {
                this.#hideToastElement(element);
                options.onError();
                reject(err);
            }
            this.#handleQueue();
        });
    }

    #createToast(message, type, title = null) {
        const div = document.createElement("div");
        div.classList.add("toasterjs-toast", type);
        div.innerHTML = `
            <div class="icon">${ToastConsts.Icon[type.toUpperCase()]}</div>
            <div class="content">
                <span class="toasterjs-toast__title">${title ?? ""}</span>
                <span class="toasterjs-toast__message">${message}</span>
            </div>
            <div class="close">
                <button class="close-button ti">${ToastConsts.Icon.CLOSE}</button>
            </div>
        `;
        return div;
    }

    #createActionToast(message, type, actions, title = null) {
        const newActions = [];
        for (let i = 0; i < actions.length; i++) {
            const element = actions[i];
            newActions.push({
                id: i + 1,
                uName: "action" + (i + 1),
                name: element.name,
                action: element.action,
                closeOnClick: element.closeOnClick ?? true
            });
        }

        let buttonsHtml = "";
        for (const element of newActions) {
            if (element !== null)
                buttonsHtml += `<button class="${element.uName}" data-index="${element.id}">${element.name}</button>`;
        }

        const div = document.createElement("div");
        div.classList.add("toasterjs-toast", "action-toast", type);
        div.innerHTML = `
            <div class="icon">${ToastConsts.Icon[type.toUpperCase()]}</div>
            <div class="content">
                <span class="toasterjs-toast__title">${title ?? ""}</span>
                <span class="toasterjs-toast__message">${message}</span>
            </div>
            <div class="actions">${buttonsHtml}</div>
        `;

        for (const element of newActions) {
            div.querySelector(`.${element.uName}[data-index="${element.id}"]`)
                .addEventListener("click", () => {
                    if (element.closeOnClick) this.#hideToastElement(div);
                    this.#handleQueue();
                    element.action();
                });
        }
        return div;
    }

    #handleToasting(element, animationFunction, ...animationFunctionArgs) {
        if (this.#container.children.length === this.#limit) {
            if (!this.#queue) {
                this.#container.firstChild.remove();
                this.#container.appendChild(element);
            } else {
                this.#inQueueToasts.push({element, animationFunction, animationFunctionArgs});
                return;
            }
        } else {
            this.#container.appendChild(element);
        }
        animationFunction(...animationFunctionArgs);
    }

    #showToastElement(element) {
        setTimeout(() => {
            element.classList.remove("hide");
            element.classList.add("show");
        }, 1);
    }

    #hideToastElement(element) {
        element.classList.remove("show");
        element.classList.add("hide");
        element.addEventListener("transitionend", () => element.remove(), { once: true });
    }

    #handleQueue() {
        if (
            this.#queue && 
            this.#inQueueToasts.length !== 0 && 
            this.#container.children.length < this.#limit
        ) {
            const inQueueElement = this.#inQueueToasts[0];
            this.#container.appendChild(inQueueElement.element);
            inQueueElement.animationFunction(...inQueueElement.animationFunctionArgs);
            this.#inQueueToasts.shift();
        }
    }
}

export default ToasterJS;