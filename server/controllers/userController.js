

export const userSignUp = (request, respose) => {
    try{
        const user = request.body;
        console.log("accepted" , user);
    }
    catch(error){
        console.log(error);
    }
}