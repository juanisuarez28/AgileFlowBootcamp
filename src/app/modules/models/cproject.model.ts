export class Project{
    private members:string[];
    private _id: number;
    private name: string;
    private description: string;
    private owner: string;
    private icon: string;
    private __v: number;

    constructor(members : string[], _id: number, name: string, description: string, owner: string,icon: string, __v: number ){
        this.members=members;
        this._id=_id;
        this.name=name;
        this.description=description;
        this.owner=owner;
        this.icon=icon;
        this.__v=__v;
    }

    getName():string {
        return this.name;
    }

    getMembers():string[]{
        return this.members;
    }

    getDescription():string{
        return this.description;
    }
    
    getId():number{
        return this._id;
    }

}