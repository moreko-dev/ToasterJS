// How to import to your JS?
{
    // The main Toast class and the Toast constants class (This class has static objects!)
    import ToasterJS from "./path/to/files";
    import ToastConsts from "./path/to/files";

    // The most simple and default way to create your toaster object!
    // The toast(message) method shows a toast with default configurations.
    const toaster = new ToasterJS();                
    toaster.toast("Message to show!");
}

// How to config the ToasterJS?
{
    // You can config the ToasterJS class when construct it and when call toast(message) method! How?
    const toaster = new ToasterJS({ animation, direction, position, duration, roundedValue, limit, queue });
    // These are the configs that you can use:
    /*
        - animation: Specifies the toast animation on entry and exit. You can use the 
            `ToastConsts.Animation` object to handle this! `Default: ToastConsts.Animation.FADE`
        - direction: Specifies the toasts direction! You can use the `ToastConsts.Direction` 
            object to handle this! `Default: ToastConsts.Direction.AUTO`
        - position: Specifies the position of toasts in the page! You can use the 
            `ToastConsts.Position` to handle this! `Default: ToastConsts.Position.BOTTOM_LEFT`
        - duration: Specifies the duration of toasts in miliseconds! You can use any 
            number greater than 0! `Default: 2000`
        - roundedValue: Specifies the rounded value (Border radius in CSS) of toasts. 
            You can use the number and the unit as a string like: "30px" or "0.5rem"! `Default: "0"`
        - limit: Specifies the maximum number of toasts to display on the page. 
            You can use any number greater that 0. `Default: 5`
        - queue: When enabled(set to `true`), new toasts will wait in a queue if the 
            maximum number of visible toasts is reached. Once a visible toast is removed, 
            the next toast in the queue is displayed automatically. Without the queue, 
            older toasts are removed immediately to make room for new ones. `Default: false`
    */
    // Now with this configs all toasts have same configs! (If some configs does not set, It will set to default)
    // Examples:
    ex1: {
        const toaster = new ToasterJS({
            animation: ToastConsts.Animation.FLIP,
            direction: ToastConsts.Direction.RTL,
            position: ToastConsts.Position.BOTTOM_CENTER,
            duration: 5000,
            roundedValue: "0.5rem",
            limit: 10,
            queue: true
        });
    }
    ex2: {
        const toaster = new ToasterJS({
            animation: ToastConsts.Animation.FLIP,
            duration: 5000,
            roundedValue: "0.5rem",
            queue: true
        });
    }
}

// How to config a toast individually?
{
    // You can config your toast individually on the toast(message) method!
    toaster.toast("YOUR_MESSAGE", { type, duration, animation, roundedValue });
    // These are the configs that you can use:
    /*
        - type: Specifies the toast type(Succes, Error, ...). You can use the 
            `ToastConsts.Type` object to handle this! `Default: ToastConsts.Type.DEFAULT`
        // We explained other props in the previous section!
    */
    // Now you can toast any toasts with different configs! (If one of the configs does not set, It will inherits from the constructor value)
    // Example:
    ex3: {
        toaster.toast("Heeeeeeeeeelo🎉🎉", {
            type: ToastConsts.Type.INFO,
            duration: 8000,
            animation: ToastConsts.Animation.SLIDE_UP,
            roundedValue: "0.25rem"
        });
    }
    ex4: {
        toaster.toast("Welcome to ToasterJS", {
            type: ToastConsts.Type.SUCCESS,
            animation: ToastConsts.Animation.FADE
        });
    }
    // Even you can pass a `title` param to have a title in your toast! like this
    ex5: {
        toaster.toast("message", { /* configs */ }, "Your title");
    }
}

// But what is the change of ToasterJS 2.0.0?????
// We add two most useful options! Pending toast and Action toast!
// What is it?
/*
Pending toast:
- A toast that remains visible while a time-consuming operation (such as an async task) is in progress.
    It automatically stays on the page until the associated action resolves or rejects, and can trigger 
    `onSuccess` or `onError` callbacks when the operation completes.
Action toast: 
- A toast that performs a specific action when triggered. It can execute a given function or 
callback and optionally display success or error feedback based on the outcome of that action. 
Unlike a standard toast, it’s tied to an interactive operation rather than just showing a message.
*/

// How to use pending toast?
{
    // Remember that pending toast, will work only in functions and callback that return promise! otherwise, it won't be what you expect!
    // You can use it like this: `toaster.toastPending("YOUR_MESSAGE", CALLBACKS);`
    // Check the example below:
    ex6: {
        toaster.toastPending("YOUR_MESSAGE", {
            action: () => new Promise(resolve => setTimeout(resolve, 5000)),
            onSuccess: () => console.log("Succeed"),
            onError: () => console.log("Errored")
        });
    }
    // The default type of this toast in `PENDING` and the default color in `INFO` color palette and it can't be changed.
    // For the action function you can pass any function that returns promise and the good point is 
    // that the toastPending function will return a promise with the result of the given function to resume your action!

    // The options that you can pass to toastPending():
    {
        toaster.toastPending("YOUR_MESSAGE", {
            /* action, onSuccess, onError fns */
        }, "YOUR_TITLE", { animation, roundedValue });
    }
    // You can even pass a title to have titled pending toast or pass `null` for non title toast!

    // Example:
    ex7: {
        toaster.toastPending(
            "Fetching data from sever...",
            {
                action: () => fetch("url"),
                onSuccess: () => toaster.toast("Data fetched!", { type: ToastConsts.Type.SUCCESS }),
                onError: () => toaster.toast("Data not fetch!", { type: ToastConsts.Type.ERROR })
            },
            "Title: Data fetch",
            {
                animation: ToastConsts.Animation.BOUNCE,
                roundedValue: "50px"
            }
        );
    }
}

// How to use action toast?
{
    // You can use it like this: `toaster.toastAction("YOUR_MESSAGE", ACTIONS);`
    // Check the example below:
    ex8: {
        toaster.toastAction("YOUR_MESSAGE", [
            {
                name: "Save",
                action: () => console.log("Saved!"),
                closeOnClick: true
            },
            {
                name: "Retry",
                action: () => console.log("Retrying..."),
                closeOnClick: false
            },
        ]);
    }
    // What is the above code for?
    // the `toastAction` gets an actions array! Each index of that array is an object of action. 
    // Each action object has three props that should set!
    // Action object props:
    /*
        - name: The action name or the button name
        - action: The action that if the button clicked what to do!
        - closeOnClick: On default is true that means on click of the button close the toast. 
            But if you set to `false`, It would not close the toast!
    */
    // You can define actions as much as you can.
    // Example: 
    ex9: {
        toaster.toastAction(
            "Want to close the tab without saving?", 
            [
                {
                    name: "Save", 
                    action: () => saveProject()
                }, 
                {
                    name: "Don't save", 
                    action: () => closeTabAndExitProject()
                }, 
                {
                    name: "cancel", 
                    action: () => {}
                }
            ],
            "Title: YOUR_TITLE", 
            {
                type: ToastConsts.Type.WARNING, 
                animation: ToastConsts.Animation.SLIDE_LEFT, 
                roundedValue: "0"
            }
        )
    }
    ex10: {
        toaster.toastAction(
            "Cannot save the project...", 
            [
                {
                    name: "Retry", 
                    action: () => forceSaveProject(), 
                    closeOnClick: false
                }, 
                {
                    name: "Cancel", 
                    action: () => cancelSave()
                }
            ],
            "Saving problem", 
            {
                type: ToastConsts.Type.WARNING, 
            }
        )
    }

    // You can set the title to toast a titled toast and set it to null to toast regular toast!
}

// This is how easy you can use this lightweight library!
// ENJOY //