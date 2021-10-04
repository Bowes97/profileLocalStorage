$('.buttonSignUp').click(function () {
    $('.signIn').hide()
    $('.signUp').addClass('flex')
    $('.signUp').show()
})
$('.buttonSignIn').click(function () {
    $('.signIn').show()
    $('.signUp').addClass('flex')
    $('.signUp').hide()
})
class Person {
    constructor(firstname, lastname, email, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password
    }
}
let arrPerson = [];
let f1 = document.forms.f1;
let f2 = document.forms.f2;
f2.addEventListener('submit', function (event) {
    event.preventDefault();
    let firstname = this.firstname.value;
    let lastname = this.lastname.value;
    let email = this.email.value;
    let password = this.password.value;
    let person = new Person(firstname, lastname, email, password)
    this.reset()
    let as;
    arrPerson.forEach(el => {
        if (el.email === email) {
            as = true;
        } else {
            as = false
        }
    });
    if (localStorage.length > 0 && localStorage.getItem('person')) {
        arrPerson = JSON.parse(localStorage.getItem('person'))
    }
    if (as === true) {
        swal("Oops", "This email aleready exist", "error")
    } else {
        arrPerson.push(person)
    }
    localStorage.setItem('person', JSON.stringify(arrPerson))
})
f1.addEventListener('submit', function (event) {
    event.preventDefault();
    let email = $('.email').val();
    let password = $('.password').val();
    if (localStorage.getItem('person') == null) {
        swal("Oops", "LocalStorage is empty!", "error")
    }
    this.reset()
    let account = JSON.parse(localStorage.getItem('person'))
    let found
    for (let i = 0; i < account.length; i++) {
        if (account[i].email === email && account[i].password === password) {
            $('.signIn').hide()
            found = true;
            $('.name').html(`${account[i].firstname}  ${account[i].lastname}`)
            $('.login').html(account[i].email)
            $('.info').addClass('flex')
            $('.info').show()
            break;
        }
    }
    if (!found) {
        swal("Oops", "Incorrect email or password", "error")
    }
})
$('.leave').click(function () {
    $('.info').hide()
    $('.signIn').show()
})