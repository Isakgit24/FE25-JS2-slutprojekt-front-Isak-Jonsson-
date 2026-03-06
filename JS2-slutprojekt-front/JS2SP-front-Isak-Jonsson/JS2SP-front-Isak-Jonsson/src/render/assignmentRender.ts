import { Assignment } from "../classes/assigmentClass"
import { fetchAssigments } from "../api/assigmentApi"
import type { Assignments } from "../types"
const newDiv = document.querySelector('.new') as HTMLDivElement
const doingDiv = document.querySelector('.doing') as HTMLDivElement
const doneDiv = document.querySelector('.done') as HTMLDivElement
const assignmentSelect = document.querySelector('#assignmentSelect') as HTMLSelectElement

export const fetchAndRenderAssignments = async () =>{

 const assignments = await fetchAssigments()
  renderAssignments(assignments)

  renderAssignmentsToSelect(assignments)

}

export const renderAssignments = (assignment: Assignments[]) => {

    let assignments = assignment.map((a => new Assignment(
        a.id,
        a.title,
        a.category,
        a.description,
        a.status,
        a.assignedto,
        a.timestamp,
    )))



    console.log(assignments)
    const clone = [...assignments]
    const statusNew = clone.filter((c) => c.status === 'new').reverse()
    console.log(statusNew)


    const statusDoing = clone.filter((c) => c.status === 'doing').reverse()
    console.log(statusDoing)



    const statusDone = clone.filter((c) => c.status === 'done').reverse()
    console.log(statusDone)

    newDiv.innerHTML = ''
    doingDiv.innerHTML = ''
    doneDiv.innerHTML = ''


    newDiv.innerHTML = '<h1>New</h1>'
    doingDiv.innerHTML = '<h1>Doing</h1>'
    doneDiv.innerHTML = '<h1>Done</h1>'

    statusNew.forEach(assignment => assignment.showAssignment(newDiv))
    statusDoing.forEach(assignment => assignment.showAssignment(doingDiv))
    statusDone.forEach(assignment => assignment.showAssignment(doneDiv))


}

export const renderAssignmentsToSelect = async (assignments:Assignments[]) => {

 
    const clone = [...assignments]
    const newAssignments = clone.filter((c) => c.status === 'new').reverse()

    assignmentSelect.innerHTML = ''
    newAssignments.forEach(assignment => {
        const title = assignment.title
        const category = assignment.category
        assignmentSelect.innerHTML += `<option value="${title}">${title} - ${category}</option>`



    })

    renderAssignments(assignments)
};