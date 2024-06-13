import { Notify } from 'quasar';

export const notifySuccess = (message = "Ação concluida com sucesso!") => {
    Notify.create({
        message: message,
        html: true,
        timeout: 8000,
        type: "positive",
        color: "light-blue-8",
        position: "top-right",
    });
};

export const notifyError = (message = "Operação não concluida, algo inesperado aconteceu") => {
    Notify.create({
        message: message,
        html: true,
        position: "top-right",
        color: "red",
        icon: "fas fa-exclamation",
    });
};
