#!/usr/bin/python3

###############################################################################
#
# BRIEF //
#   Your firm is implementing its student management prototype in Python.
#   It's a command-line program, which the registrar's office will use to
#   add students to the database upon enrollment.
#
#   The program should prompt the user for a student's first name; last name;
#   middle initial; physical address; email address; and phone number.
firstname = input('What is your first name? ')

lastname = input('What is your last name?')

middle = input('What is your middle initial?')

address = input('What is your address?')

email = input('What is your Email Address?')

phone = input('What is your phone number?')

print(firstname)
print(lastname)
print(middle)
print(address)
print(email)
print(phone)

correct = input('Enter Y if this information is correct. Enter any other key otherwise')

print('Thank you for your information')


#
#   After each prompt, the program should wait for the user's input. 
#
#   Once the user has entered every piece of information, the program should
#   print it all back to the console, and prompt the user to enter Y if the
#   information is correct, or any other key otherwise.
#
#   For now, you should collect the user's response--i.e., y or otherwise--but
#   don't worry about handling it. We'll get to that shortly.
#
###############################################################################

# What function prints a message to the screen and waits for user input?
# Use it here to collect a student's information--first name, last name, etc.
###############################################################################
#...Your Code Here...

# Once you've gotten all of that, print it all back to the screen. 
###############################################################################
#...Your Code Here...

# Then, use the same function you used to prompt users for information to ask 
# them to confirm whether or not the information is correct. Save their 
# response, but don't worry about doing anything with it yet!
###############################################################################
# ...Your Code Here...
