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
        <div class="container-formularios">
            <!-- <div class="sign-up-container">
                <form action="#">
                    <h1>Crear cuenta</h1>
                    <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Registrarse</button>
                </form>
            </div> -->
            <div class="form-container sign-in-container">
                <form id="loginForm" method="post">
                    <h1>Iniciar sesion</h1>
                    <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div>
                    <span>or use your account</span>
                    <input type="text" id="username" name="username" placeholder="Usuario">
                    <input type="password" id="password" name="password" placeholder="Contraseña">
                    <a href="#">Has olvidado la contraseña?</a>
                    <button>Iniciar sesion</button>
                </form>
            </div>
        </div>
    </div>

    <script src="../js/login.js"></script>
</body>

</html>