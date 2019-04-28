# RT chat
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


    

   



# smart_solution test

## functional testing
test | expected solution 
--- | ---
click submit ticket without login | user redirect to login page
click submit ticket with login | user redirect /ticket_form/basics
user search with keyword and language type, and click search | user lead to ticket_form/smart_solution page
smart_solution accuracy test | with 4 question related to the common search questions


## system testing 
test | expected solution
--- | ---
user key in search word and search for smart solution | the given answer contains the keyword using is searching
user can create ticket (enter /ticket_form/details page) if user click next button
user click create another ticket button | user give up the existing ticket submission
user click details | user continue the ticket submission with his entering the issue type preserved


## UI testing 
test | expected solution
--- | ---
/ticket_form/basics | correct content is displayed
/ticket_form/basics | progress bar is working
/ticket_form/details/id | the questino and answer is not null for individual questions
/ticket_form/solutions | 5 top solution is provided with their link link to details page

## performace testing 
test | expected solution
--- | ---
query common questions | the answering time is <10 seconds
