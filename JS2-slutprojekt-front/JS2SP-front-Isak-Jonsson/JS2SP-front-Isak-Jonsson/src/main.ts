
import { renderMembers , renderMembersToSelect ,fetchAndRenderMembers} from "./render/memberRender"
import { renderAssignments, renderAssignmentsToSelect,fetchAndRenderAssignments } from "./render/assignmentRender"
import { fetchMembers, postMember } from "./api/memberApi"
import { fetchAssigments, postAssignment, updateAssignedto } from "./api/assigmentApi"
import type { NewMember, NewAssignment } from "./types"
import { checkIfString } from "./types"

const assignmentForm = document.querySelector('#assignmentForm') as HTMLFormElement

const memberForm = document.querySelector('#memberForm') as HTMLFormElement
const assignForm = document.querySelector('#assignForm') as HTMLFormElement



async function init() {
  const members = await fetchMembers()
  renderMembers(members)
  renderMembersToSelect(members)

  const assignments = await fetchAssigments()
  renderAssignments(assignments)
  renderAssignmentsToSelect(assignments)
}

init()








assignForm?.addEventListener('submit', async e => {
  e.preventDefault()

  try {
    const formData = new FormData(assignForm)

    const name = checkIfString(formData.get('name'))

    const title = checkIfString(formData.get('title'))



    const assignments = await fetchAssigments()
    const members = await fetchMembers()
    const assignment = assignments.find(a => a.title === title)
    const member = members.find(m => m.name === name)

    if (!assignment) return alert("Assignment not found")
    if (!member) return alert("member not found")

    if (member.category !== assignment.category) {
      alert(`${name}s Category doesnt match with ${title} is category`)
      return
    }


    await updateAssignedto(name, assignment.id)


 fetchAndRenderAssignments()
    assignForm.reset()
  }
  catch (error) {
    console.error('Error in assignSelect submit:', error)
  }
})


memberForm?.addEventListener('submit', async e => {
  e.preventDefault()

  const formData = new FormData(memberForm)

  const name = checkIfString(formData.get('name'))

  const category = checkIfString(formData.get('category'))


  const formObj: NewMember = {
    name,
    category,

  }

  console.log(formObj)
  await postMember(formObj)

  fetchAndRenderMembers()

  memberForm.reset()
})



assignmentForm?.addEventListener('submit', async e => {
  e.preventDefault()

  const formData = new FormData(assignmentForm)

  const title = checkIfString(formData.get('title'))

  const category = checkIfString(formData.get('category'))

  const description = checkIfString(formData.get('description'))

  const timestamp = new Date().toLocaleDateString('sv-SE', {
    day: '2-digit',
    month: '2-digit'
  })

  console.log(formData)

  const formObj: NewAssignment = {
    title,
    category,
    description,
    timestamp,

  }

  console.log(formObj)
  await postAssignment(formObj)
fetchAndRenderAssignments()

  assignmentForm.reset()
})
