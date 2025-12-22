/** @type {import('./$types').PageServerLoad} */
export async function load({fetch}){
    try {
        const result=await fetch("http://localhost:3000/vendortype");
        if(!result.ok){
            throw new error("Failed to fetch the vendor types!")
        }
        const vendorTypes=await result.json()
        console.log(vendorTypes)
        return {
      vendorTypes 
    };
    } catch (error) {
        return {
      vendorTypes: [],
      error: "Could not load vendor categories."
    };
    }
}