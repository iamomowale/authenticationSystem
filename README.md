# authenticationSystem

#Register
We start the authentication system by register the user (we may assign higher role, but the default role is user)
All details must be provided for successful registration and Password must be at least 6 characters long, Then the password is hash by bcrypt before storing in user collections 
![Screenshot (16)](https://user-images.githubusercontent.com/21952628/183289044-20444e18-522d-4461-abda-abeb513e7de6.png)
![Screenshot (17)](https://user-images.githubusercontent.com/21952628/183289050-b6ddc385-b985-4ef3-b82b-2603be9065a8.png)
![Screenshot (18)](https://user-images.githubusercontent.com/21952628/183289059-a5d0537f-1e89-43c7-aaa3-2dc39386dbe6.png)

#Login
User can only login by providing correct email and password, else the system returns invalid credentials. upon successful login, a token is generated for the user and store in token collections 
![Screenshot (19)](https://user-images.githubusercontent.com/21952628/183289017-1dbb4de6-d856-42c6-9ba8-dfd0e0a1cd30.png)
![Screenshot (20)](https://user-images.githubusercontent.com/21952628/183289019-3f28a188-830f-446f-acd9-f72c2542d9ad.png)

#Roles.
We can get the user roles from their token 
![Screenshot (21)](https://user-images.githubusercontent.com/21952628/183289152-1f941765-ff12-41c1-99b0-858a895ec324.png)

#JWT
Each user token is protected and signed by json web token 

#Password recovery
A user is asked to provide their email, a password reset link is sent to that email if its a registered email. 
![Screenshot (22)](https://user-images.githubusercontent.com/21952628/183289359-cf912e97-c910-48ba-bda1-6bc37335bdc9.png)
![Screenshot (23)](https://user-images.githubusercontent.com/21952628/183289364-15164065-43af-443b-80d2-5ff362957dc4.png)

The email is send using the nodeMailer, then user can reset the password by clicking the link and provide an acceptable new password (the old password is shown in Pic below)
![Screenshot (24)](https://user-images.githubusercontent.com/21952628/183289411-0aaee15e-1017-42f9-86e9-3d1deaf1b638.png)
![Screenshot (25)](https://user-images.githubusercontent.com/21952628/183289414-fdb6528f-e7c7-42d8-a4c7-b1e8927780f1.png)


Which must also be at least 6 characters long. 
![Screenshot (26)](https://user-images.githubusercontent.com/21952628/183289477-c9e2616b-29b1-481c-bb17-f44a5e9be965.png)
![Screenshot (27)](https://user-images.githubusercontent.com/21952628/183289479-f7066ff9-b7c9-4fce-9f66-9ec6f3c96e92.png)

Then this password is hashed and sent to the user collections to replace the old password
![Screenshot (28)](https://user-images.githubusercontent.com/21952628/183289492-2ffcc968-3f20-4563-a638-66f91465703c.png)
