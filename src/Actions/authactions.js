import * as firebase from "firebase";

export const onEmailChange = email => {
    return {
        type: "EMAIL_CHANGE",
        payload: email
    }
}
export const onfnameChange = fname => {
    return {
        type: "FNAME_CHANGE",
        payload: fname
    }
}
export const onlnameChange = lname => {
    return {
        type: "LNAME_CHANGE",
        payload: lname
    }
}

export const onPasswordChange = password => {
    return {
        type: "PASS_CHANGE",
        payload: password
    }
}

export const OfficialLogin = ({ email, password }, props) => {

    return dispatch => {

        dispatch({
            type: "LOGIN_USER",
            email: email
        })

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user, props))
            .catch(() => loginUserFail(dispatch))
    }

}
export const CitizenLogin = ({ email, password }, props) => {

    return dispatch => {

        dispatch({ type: "LOGIN_USER", email: email })

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => CitizenloginUserSuccess(dispatch, user, props))
            .catch(() => loginUserFail(dispatch))
    }

}
export const CitizenRegister = ({ email, password, fname, lname }, props) => {

    return dispatch => {

        dispatch({ type: "LOGIN_USER", email: email })


        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => CitizenloginUserCreate(dispatch, fname, lname, user, props))
            .catch(() => loginUserFail(dispatch))

    }

}

export const logoutUser = (props) => {

    return dispatch => {

        firebase
            .auth()
            .signOut()
            .then(() => {
                props.navigation.navigate('Login')
                dispatch({
                    type: "LOGOUT_USER"
                })

            })
            .catch(() => { alert("LOG-OUT UNSUCCESSFULL") })


    }

}

export const userProfile = (typee, fname, lname, imageUrl, email) => {
    return {
        type: "PROFILE",
        typee: typee,
        fname: fname,
        lname: lname,
        email: email,
        imageUrl: imageUrl
    }
}
export const updateSidebar = route => {
    return {
        type: "UPDATE_SIDEBAR",
        routes: route
    }
}

const loginUserSuccess = (dispatch, user, props) => {

    const { currentUser } = firebase.auth()


    firebase
        .database()
        .ref(`users/admin/${currentUser.uid}`)
        .once('value', snapshot => {
            if (!snapshot.val()) {
                console.log('not admin')
                firebase
                    .database()
                    .ref(`users/official/${currentUser.uid}`)
                    .once('value', snapshot => {
                        if (!snapshot.val()) {
                            console.log('not official')
                            loginUserFail(dispatch);
                            firebase
                                .auth()
                                .signOut()
                        }
                        else {
                            console.log('official')
                            dispatch({
                                type: "OFFICIAL_LOGIN",
                                fname: snapshot.val().fname,
                                lname: snapshot.val().lname,
                                typee: 'official',
                                data: user
                            })
                            props.navigation.navigate("Home")
                        }
                    })
            }
            else {
                console.log('admin')
                dispatch({
                    type: "ADMIN_LOGIN",
                    fname: snapshot.val().fname,
                    lname: snapshot.val().lname,
                    typee: 'admin',
                    data: user
                })
                props.navigation.navigate("Home")
            }

        })
}

const CitizenloginUserSuccess = (dispatch, user, props) => {

    dispatch({
        type: "CITIZEN_LOGIN",
        fname: fname,
        lname: lname,
        typee: 'citizen',
        data: user
    })


    const { currentUser } = firebase.auth()


    firebase
        .database()
        .ref(`users/citizen/${currentUser.uid}`)
        .once('value', snapshot => {
            if (!snapshot.val()) {
                loginUserFail(dispatch)
            } else {

                dispatch({
                    type: "CITIZEN_LOGIN",
                    fname: snapshot.val().fname,
                    lname: snapshot.val().lname,
                    typee: 'citizen',
                    data: user
                })

                props.navigation.navigate("Home")
            }
        }
        )
}
const CitizenloginUserCreate = (dispatch, fname, lname, user, props) => {

    const { currentUser } = firebase.auth()

    dispatch({
        type: "CITIZEN_LOGIN",
        fname: fname,
        lname: lname,
        typee: 'citizen',
        data: user
    })

    firebase
        .database()
        .ref(`users/citizen/${currentUser.uid}`)
        .once('value', snapshot => {
            if (!snapshot.val()) {
                firebase
                    .database()
                    .ref(`users/citizen/${currentUser.uid}`)
                    .set({
                        email: currentUser.email,
                        fname: fname,
                        lname: lname
                    })
                props.navigation.navigate("Home")
            }
        }
        )


}

const loginUserFail = dispatch => {
    dispatch({ type: "LOGIN_USER_FAIL" })
}


