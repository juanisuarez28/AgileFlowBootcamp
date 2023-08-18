
export interface Story{
    name: string,
    description: string,
    epic: string,
    sprint: string,
    owner: string,
    assignedTo: string,
    points: number,
    created: Date,
    due: Date,
    started: Date,
    finished:Date,
    status: String,
    icon: String
}