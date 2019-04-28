## functional tests

test | expected outcome
--- | ---
user enter chat try to login with no password | redirect user to enter sign up page
user login first and login chat | redirect user to chat welcome page, the url is working correctly
user click chat button | user is lead to the correct url /chat/room
select specific admin button working | the url can lead to url can be accessed by individual admin, with user id in it.
select chat all admin page | the url can lead to url that can be accessed by all admin
API testing: chat with specific admin email send | the response code is 200
API testing: chat with all admin will send email to all the admin | all the response code is 200
with with general waiting page. and the emails are send to all the admin.
correct admin enter chat via link sent | the specific admin can enter the chat after login using the users url sent by message
wrong admin enter chat via somebody else's url | the admin is redirect to error page
any admin can enter chat with via url sent by all admin | all the admin enter the chat
client leaves chat after talking with admin | admin will be redirected to another page "client .. have left "
admin leaves chat after talking with client | client will be redirected to another page "admin .. have left "
## system testing
individual admin chat | after select chat with individual admin, the client is brought to the correct waiting page with with specific_admin_waiting_page. and the emails are send to specific admin
all admin chat | after select chat with individual admin, the client is brought to the correct waiting page 
admin enter chat | user will receive a notification prompt that admin has entered the chat

## UI testing
test | expected outcome
--- | ---
chat room welcome page | all the button and webelement is correctly enabled
select admin page | all the url is correctly link to the admin url
select page login | all the admin image and name is showed properly from the database
select chat with specific admin page | the waiting messgae have the correct admin name on it
select chat with all admin page | display of general waiting message
no message page for user | after the admin have just entered the chat, the user is shown the correct admin image and name chating with him 
no message page for admin | after admin have just entered the chat, admin can see the no message page with user name
admin send user information | user can receive the correct information send by admin
the time of message sent | the time of each chat's message is correctly showed on the screen.

## Robostness testing
test  | expected outcome
--- | ---
user sending too much image | the chat will still load chat information bit by bit and will not crash the web
user or admin try to enter message with an xss script | the chat filter it out and will not show it on the screen
many admin and user trys to talk at the same time | the web page will prompt that there are two many people talking in the room
a third person try to enter the chat after the chat is established | the room is full messgae is sent


    

   



    