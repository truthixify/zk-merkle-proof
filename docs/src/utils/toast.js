import Toastify from 'toastify-js'

export function ToastSuccess(text) {
    Toastify({
        text,
        className: "success",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

export function ToastFailed(text) {
    Toastify({
        text,
        className: "danger",
        style: {
            background: "linear-gradient(to right,rgb(176, 0, 0),rgb(201, 70, 61))",
        }
    }).showToast();
}