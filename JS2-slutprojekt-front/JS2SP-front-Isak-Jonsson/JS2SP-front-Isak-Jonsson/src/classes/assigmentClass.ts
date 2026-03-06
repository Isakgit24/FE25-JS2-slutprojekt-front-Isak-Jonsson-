import { renderAssignments } from "../render/assignmentRender";
import { fetchAssigments, updateStatusToDone, deleteAssignment } from "../api/assigmentApi";

export class Assignment {
    id: string
    title: string
    description: string
    status: string
    assignedto: string | undefined
    timestamp: string
    category: string

    constructor(
        id: string,
        title: string,
        category: string,
        description: string,
        status: string,
        assignedto: string | undefined,
        timestamp: string,

    ) {
        this.title = title;
        this.category = category;
        this.id = id
        this.description = description
        this.status = status
        this.assignedto = assignedto
        this.timestamp = timestamp
    }

    showAssignment(container: HTMLElement) {
        const assignmentDiv = document.createElement('div')
        const assignmentTitleEl = document.createElement('p')
        const assignmentCategoryEl = document.createElement('p')
        const assignmentDescriptionEl = document.createElement('p')
        const assignmentStatusEl = document.createElement('p')
        const assignmentAssignedToEl = document.createElement('p')
        const assignmentTimestampEl = document.createElement('p')



        assignmentDiv.classList.add("assignment");

        if (this.status === 'doing') {
            const doneBtn = document.createElement('button')
            doneBtn.innerText = 'Mark assignment as done'
            assignmentDiv.append(doneBtn);
            container.append(assignmentDiv)
            doneBtn.addEventListener('click', async (e) => {
                e.preventDefault()


                await this.updateStatusDoingToDone()


                await fetchAssigments().then(renderAssignments)

            })
        }


        if (this.status === 'done') {
            const deleteBtn = document.createElement('button')
            deleteBtn.innerText = 'Delete Assignment'

            assignmentDiv.append(deleteBtn);
            container.append(assignmentDiv)
            deleteBtn.addEventListener('click', async (e) => {
                e.preventDefault()
                e.stopPropagation()
                await this.delete()
                const assignments = await fetchAssigments()
                renderAssignments(assignments)
            })
        }

        assignmentTitleEl.innerText = `title: ${this.title}`
        assignmentCategoryEl.innerText = `category: ${this.category}`
        assignmentDescriptionEl.innerText = `description: ${this.description}`
        assignmentStatusEl.innerText = `status: ${this.status}`
        assignmentAssignedToEl.innerText = `assignedto: ${this.assignedto}`
        assignmentTimestampEl.innerText = ` timestamp: ${this.timestamp}`


        assignmentDiv.append(
            assignmentTitleEl,
            assignmentCategoryEl,
            assignmentDescriptionEl,
            assignmentStatusEl,
            assignmentAssignedToEl,
            assignmentTimestampEl);
        container.append(assignmentDiv)

    }
    async updateStatusDoingToDone() {
        console.log("status:", this.status)
        if (this.status === "doing") {
            await updateStatusToDone(this.id)
        } else {
            alert('the status is not doing, so it can not be done')
        }

    }
    async delete() {
        await deleteAssignment(this.id)
    }





}