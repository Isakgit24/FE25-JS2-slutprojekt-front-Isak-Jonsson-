
export class Member {
    id: string
    name: string
    category: string

    constructor(id: string, name: string, category: string) {
        this.name = name;
        this.category = category;
        this.id = id
    }

    showMember(container: HTMLElement) {
        const memberDiv = document.createElement('div')
        const memberNameEl = document.createElement('p')
        const memberCategoryEl = document.createElement('p')

        memberDiv.classList.add("member");
        memberNameEl.innerText = `Name: ${this.name}`
        memberCategoryEl.innerText = `Category: ${this.category}`
    


        memberDiv.append(memberNameEl, memberCategoryEl );
        container.append(memberDiv)

    }



}
