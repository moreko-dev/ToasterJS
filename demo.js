import ToastConsts from "./Toasterjs/ToastConsts.min.js";
import ToasterJS from "./Toasterjs/Toaster.min.js";

let toaster = new ToasterJS({ 
    animation: ToastConsts.Animation.ZOOM_IN, 
    position: ToastConsts.Position.TOP_CENTER
});

document.getElementById("show-toast").addEventListener("click", () => {
    toaster.toast("This is a message from ToasterJS 😃 Welcome!", {
        type: ToastConsts.Type.INFO,
        duration: 3000
    }, "Welcome!");
});

document.getElementById("simple-show-toast").addEventListener("click", () => {
    toaster = new ToasterJS({ 
        animation: ToastConsts.Animation.FADE, 
        position: ToastConsts.Position.BOTTOM_LEFT
    });
    toaster.toast("This is a message from ToasterJS 😃");
});

document.getElementById("multiple-show-toast").addEventListener("click", () => {
    toaster = new ToasterJS({ 
        animation: ToastConsts.Animation.FADE, 
        position: ToastConsts.Position.BOTTOM_LEFT
    });
    toaster.toast("This is a message from ToasterJS 😃");
    toaster.toast("I'm using toaster for the second time!");
    toaster.toast("This is awesome! 😃");
});

document.getElementById("config-class-show-toast").addEventListener("click", () => {
    toaster = new ToasterJS({
        animation: ToastConsts.Animation.FLIP,
        direction: ToastConsts.Direction.LTR,
        position: ToastConsts.Position.BOTTOM_CENTER,
        duration: 5000,
        roundedValue: "0.5rem",
        limit: 10,
        queue: true
    });
    toaster.toast("This is a message with Class configs!");
});

document.querySelectorAll(".animation-show-toast").forEach(btn => {
    btn.addEventListener("click", () => {
        toaster.toast("This is a message with animation!", { 
            type: ToastConsts.Type.INFO, 
            duration: 1000, 
            animation: ToastConsts.Animation[btn.className.split(" ")[1]]
        });
    });
});

document.querySelectorAll(".position-show-toast").forEach(btn => {
    btn.addEventListener("click", () => {
        toaster = new ToasterJS({ 
            position: ToastConsts.Position[btn.className.split(" ")[1]]
        });
        toaster.toast("This is a message with position!", { 
            type: ToastConsts.Type.INFO, 
            duration: 1000, 
            animation: ToastConsts.Animation.FADE
        });
    });
});

document.querySelectorAll(".dir-show-toast").forEach(btn => {
    btn.addEventListener("click", () => {

        toaster = new ToasterJS({ 
            direction: ToastConsts.Direction[btn.className.split(" ")[1]],
        });
        toaster.toast("This is a message with direction!", { 
            type: ToastConsts.Type.INFO, 
            duration: 1000, 
            animation: ToastConsts.Animation.FADE
        });
    });
});

document.getElementById("toast-config-show-toast").addEventListener("click", () => {
    toaster.toast("This is a diffrent message!", {
        type: ToastConsts.Type.INFO,
        duration: 3000,
        animation: ToastConsts.Animation.SLIDE_UP,
        roundedValue: "0.25rem"
}, "Title");
});

document.querySelectorAll(".type-show-toast").forEach(btn => {
    btn.addEventListener("click", () => {
        toaster.toast("This is a message with different type!", { 
            type: ToastConsts.Type[btn.className.split(" ")[1]], 
            duration: 3000, 
            animation: ToastConsts.Animation.FADE
        });
    });
});

document.getElementById("pending-show-toast").addEventListener("click", () => {
    toaster.toastPending(
        "Loading...", {
            action: () => new Promise(resolve => setTimeout(resolve, 3000)), 
            onSuccess: () => toaster.toast("Loaded!", { type: ToastConsts.Type.SUCCESS }), 
            onError: () => toaster.toast("Failed to load!", { type: ToastConsts.Type.ERROR })
        }
    );
});

document.getElementById("action-show-toast").addEventListener("click", () => {
    toaster.toastAction("Want to close without saving?", [
            { name: "Save", action: () => {} },
            { name: "Don't Save", action: () => {} },
            { name: "Cancel", action: () => {}, closeOnClick: false }
        ], "Confirm", {
            type: ToastConsts.Type.WARNING,
            animation: ToastConsts.Animation.SLIDE_LEFT
    });
});