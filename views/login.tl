<!DOCTYPE html>
<html>
<head>
	<title>GERBANG</title>
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css"> <!-- load bootstrap css -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"> <!-- load fontawesome -->

	<style>
		body 		{ padding-top:80px; }
	</style>
</head>
<body>
    <div class="container" >
        <div class="col-sm-6 col-sm-offset-3">
            <h1><span class="fa fa-sign-in" ></span>Pintu Utama (login)</h1>
           <!-- <div class="alert alert-danger"><%= message %></div> -->
            ${ d.message.length > 0? '<div class="alert alert-danger">' + d.message + '</div>': ''}

            <!-- LOGIN FORM -->
            <form action="/login" method="post" >
                <div class="form-group">
                    
                    <input type="text" class="form-control" placeholder="Username"  name="id">
                </div>
                <div class="form-group">
                    
                    <input type="password" class="form-control" placeholder="Password"  name="password">
                </div>
                <div class="form-group">
                    <label class="m-2">GERBANG</label>
                    <select id="status" class="form-control" name="role" required>
                        <option value="" disabled selected>Silahkan memilih GERBANG</option>
                        <option value="1">Pintu PL1</option>
                        <option value="2">Pintu PL2</option>
                    </select>
                </div>
                
                <button type="submit" class="btn btn-warning btn-lg">Login</button>
            </form>

            <hr>

            <p>New user? <a href="/users">Register</a></p>
        </div>
    </div>
</body>
</html>



