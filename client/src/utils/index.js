export const checkIfAuthenticated = token => {
    if(token){
        return true
    }else{
        return false
    }
}