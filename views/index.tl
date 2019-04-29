<!doctype html>
<html>
<head>
	<title>Node Authentication</title>
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
	<style>
		body 		{ padding-top:80px; word-wrap:break-word; }
	</style>
</head>
<body>
<div class="container">

	<div class="page-header text-center">
		<h1><span class="fa fa-anchor"></span> Profile Page</h1>
		<a href="/logout" class="btn btn-default btn-sm">Logout</a>
	</div>

	<div class="row">

		<!-- LOCAL INFORMATION -->
		<div class="col-sm-3"></div>
		<div class="col-sm-6">
			<div class="well">
				<h3><span class="fa fa-user"></span> Local</h3>
					<p>
						<!-- <% rows.forEach(function(rows) { %>
							<strong>NRP</strong>: <%=rows.id%><br>  
							<strong>Nama</strong> : <%=rows.username%><br>  
							<strong>Role</strong> : <%=rows.role%>  
					 	<% }); %> -->

					 	

					<!-- 	<script type="text/javascript">
							function appendUsers(strings, rows) {
							    return function(d) {
							        let temp = strings.slice();
							        rows.forEach((row, i) => {
							            temp[i] = temp[i] + data[row];
							        });
							        return temp.join('');
							    }
							};

						</script> -->

 						<strong>NRP :</strong> ${ d.rows.id }<br>  
						<strong>Nama:</strong> ${ d.rows.username }<br>  
						<strong>Role:</strong> ${ d.rows.role }  

				 	</p>

			</div>
		</div>

	</div>

</div>
</body>
</html>
