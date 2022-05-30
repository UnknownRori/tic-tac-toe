const createTile = (size: number, parent: HTMLElement, id: string, data: string) => {
    let index = 0;
    for (let y = 0; y < size; y++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('flex');
        newDiv.classList.add('flex-row');
        newDiv.classList.add('mx-auto');
        for (let x = 0; x < size; x++) {
            const newButton = document.createElement('button');
            newButton.classList.add('tile');
            newButton.setAttribute(`data-${data}`, index.toString());
            newButton.id = id;
            index++;
            newDiv.appendChild(newButton);
        }
        parent.appendChild(newDiv);
    }
};

export default createTile;