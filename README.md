# KELOMPOK 9

Desy Nila           (05111640000034)

Rifka Annisa        (05111640000036)

Yasinta Romadhona   (05111640000039)

"secure gate system" dgn ketentuan sebagai berikut:
1. hak akses masuk ke gate adalah berdasarkan nrp dan waktu, nanti bisa diatur apakah nrp tertentu di allow atau ditolak utk masuk ke gate dlm range waktu tertentu
2. sistem dpt menghandle lebih dari 1 gate
3. hak akses dpt berbeda2 antara gate satu dengan lainnya
4. semua yg mencoba masuk akan dilog ke dalam sistem

# API GITHUB

POST /login :
Requirement body : id, role, password (disini tulisannya role tapi masukkan g_id dari gate)

POST /users: membuat user baru
body -> id, username, password, role

GET /users : mendapatkan data semua user
GET /users/:id : Mendapat data satu user dari id
DELETE /users/:id : Menghapus satu user dari id

POST /gates : membuat gate
Requirement body -> G_GATENAME, G_OPEN, G_CLOSE

GET /gates : mendapatkan data semua gate 
GET /gates/:g_id : mendapatkan data satu gate dari g_id
DELETE /gates/:g_id : Menghapus satu gate dari id

POST /hakakses : Membuat hak akses
Requirement body -> role, gate

GET /role : mendapatkan data semua role/grup 

