class UserService{
    static instance;
    static getInstance(){
        if(!UserService.instance){
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    
}