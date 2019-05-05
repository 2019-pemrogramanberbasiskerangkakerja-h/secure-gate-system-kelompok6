<!DOCTYPE html>
<html>
<head>
	<title>CREATE GERBANG</title>
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css"> <!-- load bootstrap css -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"> <!-- load fontawesome -->

	<style>
		body 		{ padding-top:80px; }
	</style>
</head>
<body>
    <div class="container" >
        <div class="col-sm-6 col-sm-offset-3">
            <h1><span class="fa fa-sign-in" ></span>Create Gates</h1>
           <!-- <div class="alert alert-danger"><%= message %></div> -->
            ${ d.message.length > 0? '<div class="alert alert-danger">' + d.message + '</div>': ''}

            <!-- LOGIN FORM -->
            <form action="/gates" method="post" >
                <div class="form-group"> 
                    <label class="m-2">Gate's Name</label>                   
                    <input type="text" class="form-control" placeholder="Gate's Name"  name="G_GATENAME">
                </div>
                <div class="form-group">
                    <label class="m-2">Role</label>
                    <select id="status" class="form-control" name="role" required>
                        <option value="" disabled selected>Silahkan memilih role</option>
                        ${d.rows.reduce((str,row)=> str + '<option value= "'+ row.GR_ID +'">'+ row.GR_ROLE +'</option>', '')}
                    </select>
                </div> 
                <div class="form-group">                    
                    <label for="G_OPEN" class="m-2">Time Open Gate :</label>
                    <input type="time" id="G_OPEN" name="G_OPEN" min="1:00" max="24:00" required>
                </div>
                <div class="form-group">                    
                    <label for="G_CLOSE" class="m-2">Time Close Gate :</label>
                    <input type="time" id="G_CLOSE" name="G_CLOSE" min="1:00" max="24:00" required>
                </div>               
                <button type="submit" class="btn btn-warning btn-lg">Login</button>
            </form>

            <hr>
        </div>
    </div>
</body>
</html>



