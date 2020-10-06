// После события загрузки всего DOMa, выполнить функцию
document.addEventListener("DOMContentLoaded", () => {
    showComments();
    uploadCommentsFormButton.addEventListener('click', (event) => {
        event.preventDefault();
        uploadCommentsFormButton.innerHTML = 'Загрузка... <img src="./img/upload-comments.png" class="img-upload-comments-rotating">';
        setTimeout(() => {
            showComments();
        }, 500);
    });
})

// Регулярные выражения
const regexName = /^[A-zА-я .]{2,50}$/i;
const regexEmail = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
const regexComment = /^[а-яА-Яa-zA-ZЁёЫы0-9 .,!?:'"+_&@#*()-]{10,400}$/iu;

// Получить форму отправки комментариев
const sendCommentForm = document.querySelector('#send-comment-form');

// Получить блок для загрузки комментариев
let commentsContainer = document.querySelector('#comments-container');

// Получить блоки для вывода ошибок
let errorName = document.querySelector('#error-name');
let errorEmail = document.querySelector('#error-email');
let errorComment = document.querySelector('#error-comment');

// Получить кнопку загрузки комментариев
let uploadCommentsFormButton = document.querySelector('#upload-comments-form-button');

// Получить блок сообщений об отправки комментария
let sendCommentFormMessageBlock = document.querySelector('#send-comment-form-message-block');

// Счетчик
let counter = 2;

// Событие проверки полей name, email, comment
sendCommentForm.addEventListener('keyup', () => {

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const comment = document.querySelector('#comment').value.trim();

    // Проверка имени
    if (regexName.test(name)) {
        errorName.textContent = '';
    } else {
        errorName.textContent = 'Имя должно быть от 2 до 50 символов';
    }
    // Проверка email
    if (regexEmail.test(email)) {
        errorEmail.textContent = '';
    } else {
        errorEmail.textContent = 'Пожалуйста введите верный email адрес';
    }
    // Проверка комментария
    if (regexComment.test(comment)) {
        errorComment.textContent = '';
    } else {
        errorComment.textContent = 'Текст комментария должнен быть от 10 до 400 символов';
    }
});

// Событие отправки комментария
sendCommentForm.addEventListener('submit', (event) => {

    event.preventDefault();

    let name = document.querySelector('#name');
    let email = document.querySelector('#email');
    let comment = document.querySelector('#comment');

    // Проверить, если значение из input-ов не проходят проверку по регулярным выражениям, вернуть false - не разрешать отправку формы
    if (!regexName.test(name.value) || !regexEmail.test(email.value) || !regexComment.test(comment.value)) {
        return false;
    }
    else {
        const ajax = async () => {
            const data = await makeRequest('POST', 'php/add-comment.php', new FormData(sendCommentForm));

            switch (data) {
                case '0':
                    message(sendCommentFormMessageBlock, 'Ошибка сервера! Повторите позже!', 'failed-message-sending');
                    break;
                case '1':
                    uploadCommentsFormButton.disabled = false;
                    uploadCommentsFormButton.innerHTML = 'Загрузить ещё';
                    counter = 2;
                    showComments();
                    message(sendCommentFormMessageBlock, 'Комментарий отправлен!', 'successful-message-sending');
                    break;
                case '2':
                    message(sendCommentFormMessageBlock, 'Заполните необходимые поля!', 'failed-message-sending');
                    break;
            }
        };
        ajax()
            .catch(error => message(sendCommentFormMessageBlock, 'Ошибка: ' + error, 'failed-message-sending'));

        // Сбросить значение из input-ов
        name.value = '';
        email.value = '';
        comment.value = '';
    }
});

// Функция загрузки комментариев на страницу
const showComments = () => {

    uploadCommentsFormButton.innerHTML = 'Загрузить ещё';

    counter++;

    document.querySelector('#upload-comments-form-input').value = counter;

    const ajax = async () => {
        const uploadComments = document.querySelector('#upload-comments-form');

        const response = await makeRequest('POST', 'php/upload-comments-form.php', new FormData(uploadComments));

        const data = JSON.parse(response);

        uploadCommentsFormButton.style.display = 'block';

        if (data === 0) {
            commentsContainer.innerHTML = '<h3 class="m-auto mt-2 text-danger">Извините, что-то пошло не так.</h3>';
            uploadCommentsFormButton.style.display = 'none';
            return false;
        }

        if (data.length === 0) {
            commentsContainer.innerHTML = '<h3 class="m-auto mt-2 text-danger">Комментариев пока нет.</h3>';
            uploadCommentsFormButton.style.display = 'none';
            return false;
        }

        else {
            commentsContainer.innerHTML = '';
            for (const value of data) {
                commentsContainer.innerHTML += `<div class="col-lg-12"><div class="card border border-dark p-3 mt-3"><h6 class="card-title text-left">Имя: ${value.name}<time class="float-right font-italic" datetime="${value.date}">Дата: ${value.date}</time></h6><p class="text-left mt-3">${value.comment}</p><div class="dropdown-divider" style="border-bottom: 2px dashed rgba(0,0,0,.5) !important;"></div></div></div>`;
            }
            if (data.length < counter) {
                uploadCommentsFormButton.innerHTML = 'Комментарии закончились!';
                uploadCommentsFormButton.disabled = true;
            }
        }
    };
    ajax()
        .catch(error => commentsContainer.innerHTML = `<h3 class="m-auto mt-2 text-danger">${error}</h3>`);
};

// Функция отображения сообщений об отправки формы
const message = (block, message, addRemoveClass) => {
    block.textContent = message;
    block.style.visibility = 'visible';
    block.classList.add(addRemoveClass);
    setTimeout(() => {
        block.textContent = '';
        block.style.visibility = 'hidden';
        block.classList.remove(addRemoveClass);
    }, 3000);
};

// Функция отправки запроса на сервер
const makeRequest = (method, url, FormData) => {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.response);
            } else {
                reject(`${xhr.status} ${xhr.statusText}`);
            }
        };
        xhr.onerror = () => {
            reject(`${xhr.status} ${xhr.statusText}`);
        };
        xhr.send(FormData);
    });
};