# ToasterJS

A lightweight, customizable, and easy-to-use JavaScript library for showing toasts (notifications) on your web page.
Supports animations, directions, positions, queue system, **pending toasts** (async tasks), and **action toasts** (interactive toasts).

![ToasterJS](./assets/toasts.png)

---

## 🚀 Installation

Simply include the library in your project:

```js
import ToasterJS from "./path/to/files";     // The main Toast class
import ToastConsts from "./path/to/files";   // The constants class (contains static objects)
```

---

## 🔥 Quick Start

```js
const toaster = new ToasterJS();                
toaster.toast("Message to show!");  // Simple toast with default configs
```

---

## ⚙️ Configuration

You can configure **globally** (when creating the toaster instance) or **individually** (when calling `toast`).

### Global Config (constructor)

```js
const toaster = new ToasterJS({
  animation: ToastConsts.Animation.FLIP,
  direction: ToastConsts.Direction.RTL,
  position: ToastConsts.Position.BOTTOM_CENTER,
  duration: 5000,
  roundedValue: "0.5rem",
  limit: 10,
  queue: true
});
```

**Available options:**
- **animation** → entry & exit animation (`ToastConsts.Animation.FADE` by default)  
- **direction** → toast direction (`ToastConsts.Direction.AUTO` by default)  
- **position** → page position (`ToastConsts.Position.BOTTOM_LEFT` by default)  
- **duration** → lifespan in ms (default `2000`)  
- **roundedValue** → border radius (`"0"`)  
- **limit** → max visible toasts (default `5`)  
- **queue** → when `true`, new toasts wait instead of replacing old ones (default `false`)  

---

### Individual Toast Config

```js
toaster.toast("Hello 🎉", {
  type: ToastConsts.Type.INFO,
  duration: 8000,
  animation: ToastConsts.Animation.SLIDE_UP,
  roundedValue: "0.25rem"
}, "Optional Title");
```

- **type** → toast type (`ToastConsts.Type.SUCCESS`, `ERROR`, `INFO`, …)  
- All other props (`duration`, `animation`, etc.) also work here and override global defaults.  

---

## ✨ New in ToasterJS 2.0.0

- **Pending Toasts** → stay visible until an async operation finishes, then trigger `onSuccess` / `onError`.  
- **Action Toasts** → interactive toasts with buttons to trigger callbacks.  

---

## ⏳ Pending Toast

A **pending toast** remains visible while a time-consuming operation (e.g. async task) is running.  
It automatically resolves when the action finishes.  

```js
toaster.toastPending("Fetching data...", {
  action: () => fetch("/api/data"),
  onSuccess: () => toaster.toast("Data fetched!", { type: ToastConsts.Type.SUCCESS }),
  onError: () => toaster.toast("Failed to fetch data!", { type: ToastConsts.Type.ERROR })
}, "Loading", {
  animation: ToastConsts.Animation.BOUNCE,
  roundedValue: "0.5rem"
});
```

✅ `action` must return a **Promise**  
✅ Returns a promise with the result of the action  

---

## ⚡ Action Toast

An **action toast** shows one or more buttons to trigger specific callbacks.  

```js
toaster.toastAction("Want to close without saving?", [
  { name: "Save", action: () => saveProject(), closeOnClick: true },
  { name: "Don't Save", action: () => closeTab(), closeOnClick: true },
  { name: "Cancel", action: () => {}, closeOnClick: false }
], "Confirm", {
  type: ToastConsts.Type.WARNING,
  animation: ToastConsts.Animation.SLIDE_LEFT
});
```

**Action object properties:**
- **name** → button text  
- **action** → callback function  
- **closeOnClick** → auto close after click (`true` by default)  

---

## 📖 Examples

```js
// Simple info toast
toaster.toast("Welcome to ToasterJS!", { type: ToastConsts.Type.SUCCESS });

// Pending toast with fake async task
toaster.toastPending("Processing...", {
  action: () => new Promise(resolve => setTimeout(resolve, 3000)),
  onSuccess: () => console.log("Done!"),
  onError: () => console.log("Error!")
});

// Action toast with multiple buttons
toaster.toastAction("Save changes?", [
  { name: "Save", action: () => saveData() },
  { name: "Cancel", action: () => {} }
]);
```

---

## 📝 License
MIT License – free to use, modify, and share.

