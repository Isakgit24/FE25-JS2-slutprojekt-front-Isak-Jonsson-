type Base = {
    id: string,
    category: string
}


export type Members = Base & {
    name: string,
}

export type NewMember = {
    name: string,
    category: string
}

export type Assignments = Base & {
    title: string,
    description: string,
    status: string,
    assignedto: string ,
    timestamp: string

}

export type NewAssignment = {
    title: string,
    description: string,
    category: string,
    timestamp: string
}



export type Board = {
    members: Members[],
    assignments: Assignments[]
}

export const  checkIfString = (value:FormDataEntryValue | null):string =>{
    if(typeof value !== 'string'){
        throw new Error('input is not a string')
    }
    return value
}