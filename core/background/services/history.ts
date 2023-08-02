import { Runtime } from "lib/runtime";

export class History {
     #importPrevious: boolean; 

    constructor() {
        this.#importPrevious = false;
    }
    // true if all browser history already imported. 
    public async getHistory(){
        if(this.#importPrevious === false)
        {
            chrome.history.search({ text: "", startTime: 0, maxResults: 0 }, 
                    (items) => console.log(items));
            this.#importPrevious = true;
        }
    }
}