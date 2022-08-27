export class CheckPermissions{

    public static hasPermission(roles: string[], userPermissions: string[]): boolean{

        if(userPermissions.length == 0 ) return false;
        if(roles.length == 0 ) return true;

        /*let interator  = userPermissions[0];
        for(let role of roles){
            if(interator.includes(role)){
                return true;
            }
        }
        return false;*/
        return true;
    }
}
