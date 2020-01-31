$(document).ready(function () {

    // Al hacer submit empezar proceso de login
    $('#submit').click(function () {
        // Recoger datos
        let user = $('#usuario').val();
        let pass = $('#password').val();
        console.log(user);

        if(user !== "" || pass !== ""){
            $.ajax({
                url: 'login.php',
                type: 'POST',
                data: {
                    user: user,
                    pass: pass
                },
                beforeSend: function () {
                    console.log('Enviando datos al servidor...')
                },
                success: function (data, status) {
                    console.log(data)
                }
            });
        }else{
            console.log('Rellena los campos para hacer el login');
        }
    })
});