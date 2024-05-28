#!/bin/bash

export HTTP_PROXY=http://localhost:8001

http POST :3000/users email=test name=john
http POST :3000/users email=test2 name=jill
http POST :3000/expenses item=milk userId=1 cost=1.99
http POST :3000/payments senderId=1 receiverId=2 amount=1.99
http GET :3000/expenses
http GET :3000/expenses/1
http GET :3000/payments
http GET :3000/payments/1
http GET :3000/users
http GET :3000/users/1
http PUT :3000/expenses/1 item=candy userId=1 cost=1.99
http PUT :3000/users/1 email=newemail name=john
http DELETE :3000/payments/1
http DELETE :3000/expenses/1
http DELETE :3000/users/1
