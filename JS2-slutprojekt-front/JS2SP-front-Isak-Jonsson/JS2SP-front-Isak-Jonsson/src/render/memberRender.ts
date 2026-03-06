import { Member } from "../classes/memberClass"
import { fetchMembers } from "../api/memberApi"
import type { Members } from "../types"

const memberDiv = document.querySelector('#members') as HTMLDivElement


const memberSelect = document.querySelector('#memberSelect') as HTMLSelectElement


export const fetchAndRenderMembers = async () => {
  const members = await fetchMembers()
  renderMembers(members)
  renderMembersToSelect(members)
}


export const renderMembers = (member: Members[]) => {
    let members = member.map((m => new Member(m.id, m.name, m.category)))

    console.log(members)

    memberDiv.innerHTML = '<h1>Members</h1>'
    members.forEach(member => member.showMember(memberDiv))

}



export const renderMembersToSelect = async (members:Members[]) => {

   
    const memberArr = members.reverse()
    memberSelect.innerHTML = ''
    memberArr.forEach(member => {
        const name = member.name
        const category = member.category
        memberSelect.innerHTML += `<option value="${name}">${name} - ${category}</option>`

    })
    renderMembers(members)
};

