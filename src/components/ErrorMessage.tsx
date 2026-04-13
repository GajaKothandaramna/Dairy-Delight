export function ErrorMessage(prob: {msg:string})
{
return(
<>

<p className="errmsg"> {prob.msg} </p>
</>

)

}