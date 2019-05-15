<?php

session_start();

if (!isset($_SESSION['username'])) {
    header("Location: ../index.php");
}

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Trender-Profile</title>
        <link rel="stylesheet" href="../css/mystyles.css">      
    </head>
    <body bgcolor=red>
        <nv>
            <nvli style="float: left;"><a href="../index.php">Home</a></nvli>
            <?php
            if (!isset($_SESSION['id']))
            {
                echo '
                    <nvli><a href="../signup/signup.php">Sign up</a></nvli>
                    <nvli><a href="../login/login.php">Login</a></nvli>';
            }
            else
            {
                echo '
                <nvli><a href="../login/logout.php">Logout</a></nvli>
                <nvli><a href="post.php">Post</a></nvli>
                <nvli><a href="viewposts.php">View Posts</a></nvli>
                <nvli><a class=active href="profile.php">' . $_SESSION['username'] . '</a></nvli>';
            }
            ?>
        </nv>
        <div class="mainbox">
            <div class="subbox">
                    
                <div class="picbox">
                    <div class="formflexbox" style="width:55%; height:600px; background-color: #FFFFFF">
                        <form action="profileinfo.php" method="POST">
                            <hr/>
                            <table class=table>
                                <tr>
                                    <td>new username:</td>
                                    <td><input type="text" name="newusername" required></td>
                                </tr>
                                <tr>
                                    <td>password:</td>
                                    <td><input type="password" name="password" required></td>
                                </tr>
                                <tr>
                                    <td><button type="submit" name="submit">SUBMIT</button></td>
                                </tr>
                            </table>
                        </form>
                        <form action="profileinfo.php" method="POST">
                            <hr/>
                            <table class=table>
                                <tr>
                                    <td>old password:</td>
                                    <td><input type="password" name="oldpassword" required></td>
                                </tr>
                                <tr>
                                    <td>new password:</td>
                                    <td><input type="password" name="newpassword" required></td>
                                </tr>
                                <tr>
                                    <td>new password verification:</td>
                                    <td><input type="password" name="newpassword_vr" required></td>
                                </tr>
                                <tr>
                                    <td><button type="submit" name="submit">SUBMIT</button></td>
                                </tr>
                            </table>
                        </form>
                        <form action="profileinfo.php" method="POST">
                            <hr/>
                            <table class=table>
                                <tr>
                                    <td>new email:</td>
                                    <td><input type="text" name="newemail" required></td>
                                </tr>
                                <tr>
                                    <td>password:</td>
                                    <td><input type="password" name="password" required></td>
                                </tr>
                                <tr>
                                    <td><button type="submit" name="submit">SUBMIT</button></td>
                                </tr>
                            </table>
                        </form>
                        <form action="profileinfo.php" method="POST">
                            <hr/>
                            <table class=table>
                                <tr>
                                    <td>email comment notification:</td>
                                    <td>
                                        <?php
                                            require_once("../config/setup.php");
                                            $username = $_SESSION['username'];
                                            $stmt = $conn->prepare("SELECT * FROM users WHERE username ='$username'");
                                            $stmt->execute();
                                            $row = $stmt->fetch();

                                            echo 'current status: '. $row['comment_notifications'];

                                            if ($row['comment_notifications'] != 'OFF') {
                                                echo '
                                                    <select name="comment_notifications">
                                                        <option value="ON">ON</option>
                                                        <option value="OFF">OFF</option>
                                                    </select>';
                                            } else {
                                                echo '
                                                    <select name="comment_notifications">
                                                        <option value="OFF">OFF</option>
                                                        <option value="ON">ON</option>
                                                    </select>';
                                            }
                                        ?>
                                    </td>
                                </tr>
                                <tr>
                                    <td><button type="submit" name="submit">SUBMIT</button></td>
                                </tr>
                            </table>
                        </form>
                        </div>
                        </div>
                        <?php
                            include '../messages/phpboxmessages.php';
                        ?>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    </body>
</html>