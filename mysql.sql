CREATE DATABASE IF NOT EXISTS db_2 CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS db_2.comments (
	id int(11) NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	email varchar(100) NOT NULL,
	comment text NOT NULL,
	date varchar(10) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=innoDB DEFAULT CHARSET=utf8;

INSERT INTO db_2.comments (id, name, email, comment, date) VALUES
(1, 'Мария', 'maria@email.loc', 'Привет, меня зовут Мария!', '15.02.2020'),
(2, 'Сергей', 'sergey@email.loc', 'Хай, меня зовут Сергей!', '15.02.2020'),
(3, 'Владимир', 'vladimir@email.loc', 'Меня зовут Владимир, рад знакомству.', '16.02.2020'),
(4, 'Елена', 'elena@email.loc', 'Я Елена, давайте знакомиться!', '16.02.2020'),
(5, 'Игорь', 'igor@email.loc', 'Привет, я Игорь! Как дела?', '17.02.2020'),
(6, 'Ольга', 'olga@email.loc', 'Хеллоу, я Ольга!', '17.02.2020'),
(7, 'Светлана', 'svetlana@email.loc', 'Привет, это мой первый комментарий!', '17.02.2020'),
(8, 'Николай', 'nikolay@email.loc', 'Здравствуйте!', '17.02.2020'),
(9, 'Екатерина', 'ekaterina@mail.loc', 'Мне очень понравилось!', '17.02.2020'),
(10, 'Максим', 'maxim@email.loc', 'Привет, меня зовут Максим!', '17.02.2020'),
(11, 'Анастасия', 'anastation@mail.loc', 'Привет, я Анастасия!', '17.02.2020'),
(12, 'Василий', 'vasya@email.loc', 'Я просто Вася!', '17.02.2020'),
(13, 'Виолетта', 'viola@email.loc', 'Привет, я Виолетта!', '17.02.2020'),
(14, 'Григорий', 'gr@email.loc', 'Все здрасте, я Григорий!', '17.02.2020'),
(15, 'Снежана', 'viktory@email.loc', 'Меня зовут Снежана!', '17.02.2020'),
(16, 'Виктория', 'viktory@email.loc', 'Я Виктория!', '17.02.2020'),
(17, 'Владислав', 'vladislav@email.loc', 'Владислав, это я!', '17.02.2020'),
(18, 'Каролина', 'karolina@email.loc', 'Привет, я Каролина!', '17.02.2020'),
(19, 'Евгений', 'evgen@email.loc', 'Меня зовут - Евгений!', '17.02.2020'),
(20, 'Вероника', 'veronika@email.loc', 'Всем привет, я - Вероника!', '17.02.2020'),
(21, 'Анатолий', 'anat@email.loc', 'Всем здрасте, я Анатолий!', '17.02.2020'),
(22, 'Александр', 'alex@email.loc', 'Привет всем, меня зовут Алекс!', '17.02.2020');