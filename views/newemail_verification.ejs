
<?php
    
    session_start();
    
    require_once("../config/setup.php");

    if (isset($_GET['username']) && isset($_GET['verificationcode']) && isset($_GET['email'])) {
        $username = $_GET['username'];
        $code = $_GET['verificationcode'];
        $newemail = $_GET['email'];
        $stmt = $conn->prepare("SELECT * FROM users WHERE username='$username'");
        $stmt->execute();
        $row = $stmt->fetch();
        if ($row['username'] == $username && $row['verificationcode'] == $code) {
            $sql = "UPDATE users SET email = '$newemail', verificationcode = 0 WHERE username = '$username'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            header("Location: ../login/login.php?reset=successfulemailchange");
            exit();
        } else {
            header("Location: ../login/login.php?login=unexpectederror");
            exit();
        }
    } else {
        header("Location: ../index.php?failedemail");
        exit();
    }

?>