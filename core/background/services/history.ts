import { Runtime } from "lib/runtime";

export interface VisitedItem {
    title: string;
    url: string;
    lastVisitTime: number;
  }

export class History {
     #importPrevious: boolean; 
     #lastEntry: JSON;

    constructor() {
        this.#importPrevious = false;
    }
    toVisitedItem(item: chrome.history.HistoryItem): VisitedItem {
        return {
          title: item.title,
          url: item.url,
          lastVisitTime: item.lastVisitTime,
        };
      }

    getSearchHistory(text: string = '',startTime: number = 0): Promise<VisitedItem[]> {
        return new Promise<VisitedItem[]>(resolve => {
          chrome.history.search({
            text: text,
            maxResults: 0,
            startTime: startTime,
          }, items => resolve(items.map(this.toVisitedItem)));
        });
    }
      
    // true if all browser history already imported. 
    public async getHistory(){
        if(this.#importPrevious === false)
        {
            const something = await this.getSearchHistory('github.com');
            console.log("something", something);
           
            this.#importPrevious = true;
        }
    }
    
   public async indexKeyword(data){
    const result = [];
    for(var j=0;j<data.length;j++){
        let isIdeal = new Array(data[j].subMenu.length).fill(false);
        const sectionResultJson = [];
        for(var i=0;i<data[j].subMenu.length;i++)
        {
            const stTime = Date.now() - data[j].subMenu[i].days * 24 * 60 * 60 * 1000;
            const indexResult =  await this.getSearchHistory(data[j].subMenu[i].index, stTime);
            if(indexResult.length > data[j].subMenu[i].times) { isIdeal[i] =true; }
            sectionResultJson.push({"keyword": data[j].subMenu[i].index, "days": data[j].subMenu[i].days, "times": data[j].subMenu[i].times, "result": isIdeal[i] });

        }
        result.push({"header": data[j].header, sectionResultJson: sectionResultJson });
    }
    return result;
    // check title and url for specific keyword, return true if number of times it appears is times 
    // and days. 
    // can this be replaced by a circuit? (zk proof generation and verification)
    // along with checking if the computation is correct or not
    // thus offering credible information to the organisation. 
   }

}