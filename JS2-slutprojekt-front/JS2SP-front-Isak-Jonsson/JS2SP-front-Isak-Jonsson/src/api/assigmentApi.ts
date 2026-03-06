import type { Assignments,NewAssignment} from "../types"
const url = 'http://www.localhost:3000/assignments'

export const fetchAssigments = async () => {
    
  const response = await fetch(url+'/assignments') 
    const assignments:Assignments[] = await response.json()



    return assignments

}

export const postAssignment = async (assignment:NewAssignment): Promise<Assignments> => {

  const options = {
    method: 'POST',
    body: JSON.stringify(assignment),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }
  const response = await fetch(url + '/assignments', options);
  if (!response.ok) throw new Error(`POST /assignments failed: ${response.status} ${response.statusText}`);
  const assignmentRes = await response.json()
  return assignmentRes
}

export const updateStatusToDone = async (id:string)  => {

  const options = {
    method: 'PATCH',
    body: JSON.stringify({ status: "done" }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }
  const response = await fetch(url + `/assignments/${id}/status`, options);
 if (!response.ok) throw new Error(`PATCH failed: ${response.status} ${response.statusText}`);
  const assignmentRes = await response.json()
  console.log("PATCH RESULT:", assignmentRes)
  return assignmentRes
 
}

 export const deleteAssignment = async (id:string) => {
  const options = {
    method: 'DELETE'
  }
  const response = await fetch(`${url}/assignments/${id}`, options);
 if (!response.ok) throw new Error(`DELETE failed: ${response.status} ${response.statusText}`);
   console.log(response)
     
}

export const updateAssignedto = async ( name:string,id:string)=>{

 const options = {
    method: 'PATCH',
    body: JSON.stringify({ assignedto: name }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }
  const response = await fetch(url + `/assignments/${id}/assignedto`, options);
 if (!response.ok) throw new Error(`PATCH failed: ${response.status} ${response.statusText}`);
  const assignmentRes = await response.json()
  console.log("PATCH RESULT:", assignmentRes)
  return assignmentRes

}