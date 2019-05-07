<!doctype html>
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
<div class="container">

<div class="col-sm-6 col-sm-offset-3">

	<h1><span class="fa fa-sign-in"></span>Hak Akses</h1>

	<!-- show any messages that come back with authentication -->
	<!-- <% if (message.length > 0) { %>
		<div class="alert alert-danger"><%= message %></div>
	<% } %> -->

	${ d.message.length > 0? '<div class="alert alert-danger">' + d.message + '</div>': ''}

	<!-- LOGIN FORM -->
	<form action="/hakakses" method="post">
	
        <div class="form-group">
            <label class="m-2">Role</label>
            <select id="status" class="form-control" name="role" required>
            	 
				
				<option value="" disabled selected>Silahkan memilih role</option>

		${d.rows2.reduce((str,row)=> str + '<option value= "'+ row.GR_ID +'">'+ row.GR_ROLE +'</option>', '')}
  <!--               
                <option value="1">Dosen</option>
                <option value="2">Mahasiswa</option> -->

            </select>
        </div>

                <div class="form-group">
            <label class="m-2">Gate</label>
            <select id="status" class="form-control" name="gate" required>
            	 
				
				<option value="" disabled selected>Silahkan memilih gate</option>

		${d.rows.reduce((str,row)=> str + '<option value= "'+ row.G_ID +'">'+ row.G_GATENAME +'</option>', '')}
  <!--               
                <option value="1">Dosen</option>
                <option value="2">Mahasiswa</option> -->

            </select>
        </div>

		<button type="submit" class="btn btn-warning btn-lg">Add Hak Akses</button>
	</form>

	<br>
<!-- 
	<hr>

	<p>Already have an account? <a href="/login">Login</a></p>
	<p>Or go <a href="/">home</a>.</p>
 -->
	<div>

	<hr>
	</div>

</div>

</div>
</body>
</html>
