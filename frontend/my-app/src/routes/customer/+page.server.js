import { redirect } from "@sveltejs/kit";
export async function load({locals}){
    const {user,supabase} = locals;
    if(!user){
        return {}
    }
    const {data:userProfile,error}=await supabase
        .from('users')
        .select('*')
        .eq('id',user.id)
        .single();
        if(error){
            console.error('Error fetching user profile:', error);
        }
        if(!userProfile){
            throw redirect(302,'/customer/createprofile');
        }
        else{
            throw redirect(302,'/customer/dashboard');
        }
}   