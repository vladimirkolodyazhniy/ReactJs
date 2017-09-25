# Registration​ ​form​ ​which​ ​consists​ ​from​ ​3​ ​steps

First​ ​step​ has header “Main information” and includes next fields:
● First Name - required
● Second Name - required
● Email - required, valid email
● Password - required
● Confirm Password - required, has to be same as Password.
After successful filling the form user will be navigated to the second step by clicking
“Next” button which should be located on the right bottom corner of form.

Second​ ​step​ has header “Address” and includes next fields
● State - optional
● City - optional
● Postal Code - optional, 5 digits is valid
Postal code field has to have button “apply” which after clicking will use
https://www.zipcodeapi.com/ or some other API to find city and state(assuming USA
postal codes) and fill other fields (state, city). Other way is to type whole info manually.
After clicking “Next” user will be redirected to the third step. Also there should be “Prev”
button which redirects to the first step.

Third​ ​step​ has title “Finish” and has next fields:
● Subscribe checkbox - optional - checked by default
● Agreement with terms and conditions checkbox - unchecked by default
Third step has button “Finish” instead of “Next”. After clicking on Finish combined
information from three steps should be logged to the console and user will see success
message. Also there should be “Prev” button which redirects to the second step.
If on some step user has invalid form - “Next” or “Finish” button has to be disabled and
invalid field should be highlighted somehow. Main page should have top menu which
highlights active step, menu could be non clickable.

example link: https://vladimirkolodyazhniy.github.io/StepWizardForm/
 
Result data is displayed via browser console.
