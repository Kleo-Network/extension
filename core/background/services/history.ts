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
    
   public async indexKeyword(keywords, times, days){
    let isIdeal = new Array(keywords.length).fill(false);; 
    const stTime = Date.now() - days * 24 * 60 * 60 * 1000;
    const theResultJson = [];
    for(var i=0;i<keywords.length;i++)
    {
        const indexResult =  await this.getSearchHistory(keywords[i], stTime);
        console.log(`in last ${days}`, indexResult);
        if(indexResult.length > times) { isIdeal[i] =true; }
        theResultJson.push({"title": keywords[i], isTrue: isIdeal[i]});
    }
    return theResultJson;
    // check title and url for specific keyword, return true if number of times it appears is times 
    // and days. 
    // can this be replaced by a circuit? (zk proof generation and verification)
    // along with checking if the computation is correct or not
    // thus offering credible information to the organisation. 
   }

}