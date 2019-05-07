<!doctype html>
<html>
<head>
	<title>GERBANG</title>
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
	<style>
		body 		{ padding-top:80px; word-wrap:break-word; }
	</style>
</head>
<body>
<div class="container">

	<div class="page-header text-center">
		<h1><span class="fa fa-anchor"></span>Info Gate Page</h1>

<!-- 		${d.rows.reduce((str,row)=>str+'<a href="/users/'+ row.ID +'" class="btn btn-default btn-sm" method= "DELETE"> Delete</a>', '')}
		<a href="/logout" class="btn btn-default btn-sm">Logout</a>
 -->
		<!-- <a href="/users/:id" class="btn btn-default btn-sm">delete user</a> -->
	</div>

		<div class="row">

		<!-- LOCAL INFORMATION -->
		<div class="col-sm-3"></div>
		<div class="col-sm-6">
			<div class="well">
				<h3><span class="fa fa-user"></span>GATE</h3>
					<p>
		${d.rows.reduce((str,row)=> str 
		+ '<strong>'+ 'ID : ' + row.G_ID +'</strong> <br>'
		+ '<strong>'+ 'GATENAME : ' + row.G_GATENAME +'</strong> <br>'
		+ '<strong>'+ 'OPEN : ' + row.G_OPEN +'</strong> <br>'
		+ '<strong>'+ 'CLOSE : ' + row.G_CLOSE +'</strong> <br>'
	, '')}						 
				 	</p>

			</div>
			<!-- href="/users/'+ row.ID +'" -->
			${d.rows.reduce((str,row)=>str+ '<form action="/gates/'+ row.G_ID +'?_method=DELETE" method="POST"><button type="submit">delete</button></form>' , '')}
		</div>

	</div>
</body>
</html>
