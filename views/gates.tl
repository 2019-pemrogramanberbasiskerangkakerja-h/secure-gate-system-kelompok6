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
                    <label for="G_OPEN" class="m-2">Time Open Gate :</label>
                    <input type="time" id="G_OPEN" name="G_OPEN" min="1:00" max="24:00" required>
                </div>
                <div class="form-group">                    
                    <label for="G_CLOSE" class="m-2">Time Close Gate :</label>
                    <input type="time" id="G_CLOSE" name="G_CLOSE" min="1:00" max="24:00" required>
                </div>   

          
                <button type="submit" class="btn btn-warning btn-lg">Add</button>
            </form>

            <hr>
            <table style="width:100%">
                  <tr>
                    <th>Name of Gate</th>
                    <th>Time Open Gate</th>
                    <th>Time Close Gate</th>
                    <th>Action</th> 
                  </tr>
                ${d.rows.reduce((str,row)=> str + '  <tr> ' + '<td>' +row.G_GATENAME +'</td>' + '<td>' +row.G_OPEN +'</td>' + '<td>' +row.G_CLOSE +'</td>' + '<td> <a href="/gates/'+ row.G_ID +'">info</a> </td>' +' </tr>', '')}          
            </table>
        </div>
    </div>
</body>
</html>



