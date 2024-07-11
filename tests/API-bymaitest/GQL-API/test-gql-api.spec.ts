import { expect, test } from "@playwright/test";
import exp from "constants";


//GraphQL: POST countries.trevorblades.com
test('the GraphQL API Works' , async ({request}) => {
    const response = await request.post('https://countries.trevorblades.com/' , {
        data: {
            query: `
            {
                countries {
                  code  
                  name
                  capital
                  currency
                  languages {
                    name
                    code
                  }
                  }
                }
            `,
        },
    })
    const respBody = await response.json();
    console.log(respBody);
    expect(respBody.data.countries).toHaveLength(250)  //เทสว่าสมมุติว่าเรารู้ว่าข้อมูลนี้เป็น array และมีจำนวนข้อมูล 250 รายการ 

        //ทดสอบเรียกและเช็ค (validate resp.) API 2 ครั้งใน 1 เทสเคส
    const germanyResp = await request.post('https://countries.trevorblades.com/' , {
        data: {
            query: `
            {
                countries(filter:{name: {eq:"Germany"}}) {
                  code  
                  name
                  capital
                  currency
                  languages {
                    name
                    code
                  }
                  }
                }
            `,
        },
    })
    const getGermanyData = await germanyResp.json();
    console.log(getGermanyData);
    expect(getGermanyData.data.countries).toHaveLength(1)
    expect(getGermanyData.data.countries[0].name).toBe("Germany")

})


