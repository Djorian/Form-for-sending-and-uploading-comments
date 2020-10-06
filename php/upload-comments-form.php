<?php

if (isset($_POST['upload-comments-form-input'])) {

    function __autoload($class) {
        include "../Classes/$class.php";
    }

    $commentsLimit = (int) trim(strip_tags(htmlspecialchars($_POST['upload-comments-form-input'])));

    $mysql = new Database();

    $result = $mysql->select('id, name, comment, date', 'comments', '', '', 'id DESC', $commentsLimit);

    echo json_encode($result, JSON_UNESCAPED_UNICODE);

}

?>