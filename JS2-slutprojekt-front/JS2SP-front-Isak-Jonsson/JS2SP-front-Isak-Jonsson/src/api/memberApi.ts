import type { Members,NewMember} from "../types"

const url = 'http://www.localhost:3000/members'


export const fetchMembers = async (): Promise<Members[]> => {
    
  const response = await fetch(url+'/members') 
    const members:Members[]= await response.json()

    
    return members

}



export const postMember = async (member:NewMember): Promise<Members> => {
  
  const options = {
    method: 'POST',
    body: JSON.stringify(member),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }
  const response = await fetch(url + '/members', options);
 // if (!response.ok) throw new Error(response.status);
  const memberRes = await response.json()
 return memberRes
}





 
