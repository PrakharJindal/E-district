const Initial_State = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    Cloading: false,
    loginloading: false,
    fname: '',
    lname: '',
    number: '',
    imageUrl: 'empty',
    routes: ["Home", "Settings"]
}

export default (state = Initial_State, action) => {
    switch (action.type) {
        case "EMAIL_CHANGE":
            return { ...state, email: action.payload, error: '' }
        case "LNAME_CHANGE":
            return { ...state, lname: action.payload, error: '' }
        case "FNAME_CHANGE":
            return { ...state, fname: action.payload, error: '' }
        case "PASS_CHANGE":
            return { ...state, password: action.payload, error: '' }
        case "UPDATE_SIDEBAR":
            return { ...state, routes: action.routes }
        case "LOGIN":
            console.log('success')
            return {
                ...Initial_State,
                email: action.email,
                user: action.data
            }
        case "LOGIN_USER_FAIL":
            console.log('again')
            return {
                ...state,
                error: "Authentication Failed",
                password: "",
                loading: false
            }
        case "LOGIN_USER":
            return { ...state, loading: true, error: "" }
        case "LOGOUT_USER":
            return { ...Initial_State }
        case "PROFILE":
            return {
                ...state,
                lname: action.lname,
                fname: action.fname,
                number: action.number,
                imageUrl: action.imageUrl,
                typee: action.typee,
                email: action.email,
                loading: false,
                Cloading: false
            }
        case "CITIZEN_LOGIN":
            return {
                ...state,
                lname: action.lname,
                fname: action.fname,
                typee: action.typee,
                user: action.data,
                loading: false,
                Cloading: false

            }
        case "OFFICIAL_LOGIN":
            return {
                ...state,
                lname: action.lname,
                fname: action.fname,
                typee: action.typee,
                user: action.data,
                loading: false,
                Cloading: false

            }
        case "ADMIN_LOGIN":
            return {
                ...state,
                lname: action.lname,
                fname: action.fname,
                typee: action.typee,
                user: action.data,
                loading: false,
                Cloading: false

            }
        default:
            return state
    }

}