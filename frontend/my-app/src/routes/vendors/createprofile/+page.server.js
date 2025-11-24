export async function load({fetch}){
    console.log("loading vendors...")
    try {
        const result=await fetch("http://localhost:3000/vendortype")
        if(!result.ok){
            throw new Error(`API responded with status ${res.status}`)
        }
        const data=await result.json()
        return {vendorTypes:data,
            error:null
        }
    } catch (err) {
        console.error(err)
        return {
            vendorTypes:[],
            error:"⚠️ Could not load vendor types. Please try again."
        }
    }
}