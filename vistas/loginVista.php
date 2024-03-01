<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/login.css">
    <title>Healthcare Login</title>
</head>

<body>

    <div class="background"></div>
    <div class="container" id="container">
        <div class="container-imagen"></div>
        <form id="loginForm" method="post">
            <div class="container-formulario">
                <div class="container-formulario-titulo">
                    <h1>Iniciar sesion</h1>
                </div>
                <div class="container-formulario-login">
                    <input type="text" id="username" name="username" placeholder="Usuario">
                    <input type="password" id="password" name="password" placeholder="Contraseña">
                </div>
                <div class="container-formulario-forgotpwd"> <a href="#">Has olvidado la contraseña?</a>
                </div>
                <div class="container-formulario-loginButton">
                    <button>Iniciar sesion</button>
                </div>
            </div>
        </form>
    </div>
    </div>

    <script src="../js/login.js"></script>
</body>

</html>